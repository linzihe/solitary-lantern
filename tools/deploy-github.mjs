// 用 GitHub REST API 把整个项目部署成仓库 + 开启 GitHub Pages。
// 不需要安装 git，只需要一个带 repo 权限的 Personal Access Token。
//
// 用法：
//   $env:GITHUB_TOKEN = "ghp_xxx"
//   node tools/deploy-github.mjs                 # 真正部署
//   node tools/deploy-github.mjs --dry           # 只列出会上传的文件，不联网
//   $env:REPO_NAME = "别的名字"; node tools/deploy-github.mjs
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const TOKEN = process.env.GITHUB_TOKEN || '';
const REPO_NAME = process.env.REPO_NAME || 'solitary-lantern';
const BRANCH = process.env.BRANCH || 'main';
const API = 'https://api.github.com';
const DRY = process.argv.includes('--dry');

/* 不上传的东西：依赖、git 内部、临时文件、压缩包 */
const SKIP_DIRS = new Set(['node_modules', '.git', '.github']);
const SKIP_FILE = /(^_scratch|\.zip$|\.log$|\.tmp$|^Thumbs\.db$|^\.DS_Store$|^deploy-log\.txt$)/i;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walk(full, out);
    } else if (!SKIP_FILE.test(e.name)) {
      out.push(full);
    }
  }
  return out;
}

const files = walk(ROOT).sort();
const rel = f => path.relative(ROOT, f).split(path.sep).join('/');
const totalBytes = files.reduce((s, f) => s + fs.statSync(f).size, 0);

console.log('项目目录：' + ROOT);
console.log('待上传：' + files.length + ' 个文件，' + (totalBytes / 1024 / 1024).toFixed(1) + ' MB');
const byDir = {};
for (const f of files) {
  const d = path.dirname(rel(f)) || '.';
  byDir[d] = (byDir[d] || 0) + 1;
}
for (const d of Object.keys(byDir).sort()) console.log('  ' + d.padEnd(16) + byDir[d] + ' 个');
if (DRY) { console.log('\n（--dry 模式，到此为止）'); process.exit(0); }

if (!TOKEN) { console.error('\n缺少环境变量 GITHUB_TOKEN'); process.exit(1); }

async function api(method, url, body, opts = {}) {
  const res = await fetch(API + url, {
    method,
    headers: {
      Authorization: 'token ' + TOKEN,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'solitary-lantern-deploy',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(body ? { 'Content-Type': 'application/json' } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch (e) { data = { raw: text }; }
  if (!res.ok && !opts.allow) {
    const msg = (data && (data.message || data.raw)) || res.statusText;
    throw new Error(method + ' ' + url + ' → ' + res.status + ' ' + msg);
  }
  return { status: res.status, data };
}

/* 0. 令牌与身份 */
const me = await api('GET', '/user');
const OWNER = me.data.login;
console.log('\n账号：' + OWNER + '（' + (me.data.name || '') + '）');

/* 1. 建仓库（已存在就复用） */
let repoUrl = '';
const existing = await api('GET', '/repos/' + OWNER + '/' + REPO_NAME, null, { allow: true });
if (existing.status === 200) {
  repoUrl = existing.data.html_url;
  console.log('仓库已存在，复用：' + repoUrl);
} else if (existing.status === 404) {
  const created = await api('POST', '/user/repos', {
    name: REPO_NAME,
    description: '《独修者的灯》2.0 · 单文件像素风对话游戏（改编自 Cunningham《Wicca: A Guide for the Solitary Practitioner》）',
    homepage: '',
    private: false,
    has_issues: true,
    has_wiki: false,
    has_projects: false,
    auto_init: false
  });
  repoUrl = created.data.html_url;
  console.log('已创建公开仓库：' + repoUrl);
} else {
  throw new Error('查询仓库失败：' + existing.status);
}
const OWNER_NAME = repoUrl.replace(/^https?:\/\/github\.com\//, '');

/* 1.5 空仓库不能直接用 Git Data API（会报 409 "Git Repository is empty"），
   所以先用 Contents API 放一个初始提交，之后才能建 blob / tree / commit。 */
let parentSha = null;
const refBefore = await api('GET', '/repos/' + OWNER_NAME + '/git/ref/heads/' + BRANCH, null, { allow: true });
if (refBefore.status === 200) {
  parentSha = refBefore.data.object.sha;
  console.log('仓库已有 ' + BRANCH + ' 分支，本次提交会叠加在上面');
} else {
  const seedPath = '.gitignore';
  const seedContent = fs.existsSync(path.join(ROOT, seedPath))
    ? fs.readFileSync(path.join(ROOT, seedPath))
    : Buffer.from('node_modules/\n');
  const seed = await api('PUT', '/repos/' + OWNER_NAME + '/contents/' + seedPath, {
    message: '初始化仓库',
    content: seedContent.toString('base64'),
    branch: BRANCH
  }, { allow: true });
  if (seed.status >= 400) {
    throw new Error('初始提交失败：' + seed.status + ' ' + ((seed.data && seed.data.message) || ''));
  }
  parentSha = seed.data.commit.sha;
  console.log('已创建初始提交（空仓库需要先有一个 commit）');
}

/* 2. 逐个上传文件为 blob（并发 5 个，避免打爆连接） */
console.log('\n上传文件…');
const blobs = [];
let done = 0;
const queue = files.slice();
async function worker() {
  while (queue.length) {
    const f = queue.shift();
    const content = fs.readFileSync(f).toString('base64');
    const r = await api('POST', '/repos/' + OWNER_NAME + '/git/blobs', { content, encoding: 'base64' });
    blobs.push({ path: rel(f), mode: '100644', type: 'blob', sha: r.data.sha });
    done++;
    if (done % 10 === 0 || done === files.length) process.stdout.write('  ' + done + '/' + files.length + '\r');
  }
}
await Promise.all([worker(), worker(), worker(), worker(), worker()]);
process.stdout.write('  已上传 ' + blobs.length + ' 个 blob\n');

/* 3. 建 tree */
const tree = await api('POST', '/repos/' + OWNER_NAME + '/git/trees', {
  tree: blobs.sort((a, b) => (a.path < b.path ? -1 : 1))
});
console.log('已创建 tree：' + tree.data.sha.slice(0, 10));

/* 4. 建 commit */
const commit = await api('POST', '/repos/' + OWNER_NAME + '/git/commits', {
  message: '《独修者的灯》2.0 · 完整游戏与构建工具\n\n' +
    '- 单文件 index.html（双击即玩，零外部引用）\n' +
    '- 十二章 47 场景 / 45 试炼 / 147 图鉴\n' +
    '- 手机 / 平板触摸适配\n' +
    '- 全流程无头浏览器台架（14 项）',
  tree: tree.data.sha,
  parents: parentSha ? [parentSha] : []
});
console.log('已创建 commit：' + commit.data.sha.slice(0, 10));

/* 5. 更新分支 ref（初始提交已建 main，这里直接指向新 commit） */
await api('PATCH', '/repos/' + OWNER_NAME + '/git/refs/heads/' + BRANCH, {
  sha: commit.data.sha, force: true
});
console.log('已更新分支 ' + BRANCH);

/* 6. 开启 GitHub Pages（分支根目录部署） */
console.log('\n开启 GitHub Pages…');
const pagesGet = await api('GET', '/repos/' + OWNER_NAME + '/pages', null, { allow: true });
if (pagesGet.status === 200) {
  console.log('Pages 已开启：' + pagesGet.data.html_url);
} else {
  const pages = await api('POST', '/repos/' + OWNER_NAME + '/pages', {
    source: { branch: BRANCH, path: '/' },
    build_type: 'legacy'
  }, { allow: true });
  if (pages.status >= 400) {
    console.log('  Pages 自动开启失败（' + pages.status + '）：' +
      ((pages.data && pages.data.message) || ''));
    console.log('  可以稍后在仓库 Settings → Pages 里手动选 ' + BRANCH + ' 分支根目录。');
  } else {
    console.log('已提交 Pages 构建：' + (pages.data.html_url || ''));
  }
}

/* 7. 等 Pages 真正可访问 */
const siteUrl = 'https://' + OWNER.toLowerCase() + '.github.io/' + REPO_NAME + '/';
console.log('\n等待页面发布：' + siteUrl);
let ok = false;
for (let i = 0; i < 40; i++) {
  await new Promise(r => setTimeout(r, 5000));
  try {
    const res = await fetch(siteUrl + '?t=' + Date.now(), { redirect: 'follow' });
    if (res.ok) {
      const html = await res.text();
      if (html.indexOf('独修者的') >= 0 || html.indexOf('screen') >= 0) { ok = true; break; }
    }
    process.stdout.write('  第 ' + (i + 1) + ' 次检查：HTTP ' + res.status + '\r');
  } catch (e) { process.stdout.write('  第 ' + (i + 1) + ' 次检查：还没起来\r'); }
}

console.log('\n════════════════ 完成 ════════════════');
console.log('仓库：' + repoUrl);
console.log('线上：' + siteUrl + (ok ? '   ✓ 已可访问' : '   （首次发布通常要 1~3 分钟，稍后刷新试试）'));
console.log('手机：直接用浏览器打开上面这个网址，横屏即可游玩');
