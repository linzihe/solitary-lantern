// 一键回归：跑完所有无头台架 + 真实鼠标事件（CDP）测试，汇总成一份报告。
// 用法：node tools/run-all-tests.mjs [项目目录]   默认取本脚本所在项目
import fs from 'node:fs';
import path from 'node:path';
import { spawn, execFileSync } from 'node:child_process';

const root = process.argv[2] || path.resolve(import.meta.dirname, '..');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const TMP = path.join(process.env.TEMP || '.', 'pixel-wicca-test');
fs.mkdirSync(TMP, { recursive: true });
const fileUrl = 'file:///' + root.replace(/\\/g, '/').replace(/^([A-Za-z]):/, '$1:')
  .split('/').map((s, i) => i === 0 ? s : encodeURIComponent(s)).join('/') + '/index.html';

const results = [];
function ok(name, pass, detail) { results.push({ name, pass, detail }); }

function runHeadless(harness, budgetMs) {
  const txt = path.join(TMP, harness.replace(/[^\w]/g, '_') + '.txt');
  execFileSync(EDGE, [
    '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--hide-scrollbars',
    '--user-data-dir=' + path.join(TMP, 'udd'),
    '--window-size=1280,760', '--virtual-time-budget=' + budgetMs,
    '--allow-file-access-from-files', '--dump-dom',
    'file:///' + root.replace(/\\/g, '/').split('/').map((s, i) => i === 0 ? s : encodeURIComponent(s)).join('/') + '/tools/' + harness
  ], { stdio: ['ignore', fs.openSync(txt, 'w'), 'ignore'], timeout: 600000 });
  const raw = fs.readFileSync(txt, 'utf8');
  const m = /<pre id="log">([\s\S]*?)<\/pre>/.exec(raw);
  if (!m) return { text: '(没抓到日志)', pass: false };
  const text = m[1].replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  return { text, pass: /===== 通过 =====/.test(text) && !/===== 失败/.test(text) };
}
function lines(text, re, n) {
  return text.split('\n').filter(l => re.test(l)).slice(0, n).map(l => l.trim()).filter(Boolean);
}

console.log('项目：' + root);
console.log('产物：' + (fs.existsSync(path.join(root, 'index.html')) ? Math.round(fs.statSync(path.join(root, 'index.html')).size / 1024) + ' KB' : '缺失'));
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const stamp = (/var __BUILD__ = "([^"]+)"/.exec(html) || [])[1] || '(无)';
console.log('构建标记：' + stamp);
console.log('外部引用检查：' + (/<script src=|<link[^>]+href="(?!data:)|<img[^>]+src="(?!data:)/.test(html) ? '✗ 存在外部引用' : '✓ 零外部引用'));
console.log('');

const HARNESSES = [
  ['自动通关（全剧本走两遍）', 'autoplay.html', 1800000, /pass |window\.onerror|末态|=====/, true],
  ['打字机逐字渲染', 'text-pixel-check.html', 300000, /中段|末态|=====/, true],
  ['音频波形（10 曲 + 16 音效）', 'audio-check.html', 120000, /解析出|全部|基准|=====/, true],
  ['性能（每帧新建 canvas / 帧耗时）', 'perf-check.html', 600000, /每帧新建|慢状态|=====/, true],
  ['存档写入 / 读取 / 逐项一致', 'save-check.html', 900000, /写档|读档|逐项|=====/, true],
  ['探索流程（读够点位 → 点继续）', 'explore-flow.html', 1500, /①|②|③|=====/, true],
  /* 命中区台架本身就故意包含"框外应当点不中"的用例，所以它没有 通过/失败 字样，
     只要没抛异常、且框内点全部命中就算通过。 */
  ['探索按钮命中区（框内必中 / 框外必不中）', 'explore-hit.html', 3000, /点 \(|汇总|=====/, true],
  ['字号字形高度实测（供排版核对）', 'glyph-metrics.html', 3000, /^ ?[0-9]+  \||实测字形高/, false]
];
for (const [label, file, budget, re, needPass] of HARNESSES) {
  const r = runHeadless(file, budget);
  const pass = needPass ? r.pass : !/✗|Exception|ReferenceError/.test(r.text) && r.text.trim().length > 20;
  ok(label, pass, lines(r.text, re, 4));
  console.log((pass ? '✓ ' : '✗ ') + label);
  lines(r.text, re, 4).forEach(l => console.log('    ' + l));
  console.log('');
}

/* 真实鼠标事件测试 */
async function cdpTest(label, script, port, extraEnv) {
  const udd = path.join(TMP, 'udd' + port);
  const proc = spawn(EDGE, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--remote-debugging-port=' + port, '--user-data-dir=' + udd, '--allow-file-access-from-files',
    '--autoplay-policy=no-user-gesture-required', 'about:blank'], { stdio: 'ignore', detached: false });
  await new Promise(r => setTimeout(r, 3000));
  const out = await new Promise(res => {
    const p = spawn(process.execPath, [path.join(root, 'tools', script), fileUrl, TMP, '0'],
      { env: { ...process.env, PORT: String(port), VW: '1280', VH: '720', DSF: '1', FAST: '1', ...(extraEnv || {}) } });
    let s = '';
    p.stdout.on('data', d => s += d);
    p.stderr.on('data', d => s += d);
    p.on('close', () => res(s));
  });
  try { proc.kill(); } catch (e) {}
  /* 判定用**明确标记**：
     - 覆盖扫描里"无反应"的格子是正常的（点空白处本来就不该有反应）。
     - 命中区台架故意包含"框外应当点不中"的用例，那些 ✗ 是正确的；
       只有"框内点却 ✗ 没反应"才是真失败（台架用 → ✗ 没反应 这串表示）。 */
  const realFail = /→\s*✗ 没反应/.test(out) || /Exception|ReferenceError/.test(out);
  const pass = out.trim().length > 0 && !realFail &&
    (script !== 'cdp-scene-click.mjs' || /✓ 有变化/.test(out)) &&
    (script !== 'cdp-mobile.mjs' || /===== 通过 =====/.test(out));
  ok(label, pass, out.trim().split('\n').slice(0, 16));
  console.log((pass ? '✓ ' : '✗ ') + label);
  out.trim().split('\n').slice(0, 16).forEach(l => console.log('    ' + l));
  console.log('');
}
await cdpTest('真实鼠标：对话框右侧空白点击（进阶 3 次）', 'cdp-scene-click.mjs', 9401);
await cdpTest('真实鼠标：全画布点击覆盖扫描', 'cdp-coverage.mjs', 9402);

/* 手机 / 平板：设备模拟 + 真实触摸事件（Input.dispatchTouchEvent） */
for (const [dev, label] of [
  ['phone', '触摸：手机横屏（iPhone 12 844×390）'],
  ['se', '触摸：小屏手机横屏（iPhone SE 667×375）'],
  ['tablet', '触摸：平板横屏（iPad 1024×768）'],
  ['phoneport', '触摸：手机竖屏应提示转横屏'],
]) {
  await cdpTest(label, 'cdp-mobile.mjs', 9410 + ['phone', 'se', 'tablet', 'phoneport'].indexOf(dev), { DEV: dev });
}

console.log('════════════════ 汇总 ════════════════');
for (const r of results) console.log((r.pass ? '  通过  ' : '  失败  ') + r.name);
const failed = results.filter(r => !r.pass);
console.log('');
console.log(failed.length ? ('总计 ' + results.length + ' 项，失败 ' + failed.length + ' 项：' + failed.map(f => f.name).join('、'))
  : ('总计 ' + results.length + ' 项，全部通过'));

