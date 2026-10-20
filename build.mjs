// 构建：node build.mjs
//  1. art/*.png → src/art-data.js（base64 内联，避免 file:// 下画布被污染）
//  2. 收集全部脚本里出现的字符，把 Fusion Pixel 10px / 12px 裁成子集 → src/font-data.js
//  3. 把模板里的 <script src> 全部内联，生成单文件 index.html 与 dist/index.html
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import subsetFont from 'subset-font';

const root = path.dirname(fileURLToPath(import.meta.url));
const rd = p => fs.readFileSync(path.join(root, p), 'utf8');

// ---------- 1. 图片 ----------
const artDir = path.join(root, 'art');
const pngs = fs.readdirSync(artDir).filter(n => n.endsWith('.png') && !n.startsWith('_')).sort();
let art = '/* 自动生成：art/*.png 的 base64 内联。请勿手改，改图后重跑 build.mjs */\nvar ART_DATA = {\n';
art += pngs.map(n => `  '${n.slice(0, -4)}': 'data:image/png;base64,${fs.readFileSync(path.join(artDir, n)).toString('base64')}'`).join(',\n');
art += '\n};\n';
fs.writeFileSync(path.join(root, 'src', 'art-data.js'), art);

// ---------- 2. 模板与脚本顺序 ----------
let html = rd('game.template.html');
const storyFiles = ['story/base.js', ...fs.readdirSync(path.join(root, 'src', 'story'))
  .filter(f => /^ch\d+\.js$/.test(f)).sort().map(f => 'story/' + f)];
html = html.replace('<!--STORY-->', storyFiles.map(f => `<script src="src/${f}"></script>`).join('\n'));
const scripts = [...html.matchAll(/<script src="src\/([^"]+)"><\/script>/g)].map(m => m[1]);

// ---------- 3. 字体子集 ----------
const chars = new Set();
const ascii = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
for (const c of ascii) chars.add(c);
for (const c of '…—–·•“”‘’「」『』《》（）【】、，。；：？！～×↑↓←→↕▶✦★☆○●◆◇✓✔') chars.add(c);
for (const f of scripts) {
  if (f === 'art-data.js' || f === 'font-data.js') continue;
  for (const c of rd('src/' + f)) if (c.codePointAt(0) > 0x7f) chars.add(c);
}
const text = [...chars].join('');
const fonts = {};
/* 正文字体：乐米像素体（fonts/LemiPixel.ttf，免费商用）。
   它自带抗锯齿，游戏里**不做二值化**（art.js 的 THRESHOLD = 0），
   按 12px 原样渲染，需要更大就整数倍放大。
   西文与数字仍用 Fusion Pixel（SIL OFL 1.1）：乐米的西文偏窄，标签数字用 Fusion 更清楚。 */
{
  const src = fs.readFileSync(path.join(root, 'fonts', 'LemiPixel.ttf'));
  const sub = await subsetFont(src, text, { targetFormat: 'woff2' });
  fonts.lem = 'data:font/woff2;base64,' + sub.toString('base64');
  console.log(`[字体] 乐米像素体 子集 ${(sub.length / 1024).toFixed(1)} KB（${chars.size} 字，源 ${(src.length / 1024).toFixed(0)} KB）`);
}
for (const px of [10, 12]) {
  const src = fs.readFileSync(path.join(root, 'fonts', `fusion-pixel-${px}px-proportional-zh_hans.otf.woff2`));
  const sub = await subsetFont(src, text, { targetFormat: 'woff2' });
  fonts['f' + px] = 'data:font/woff2;base64,' + sub.toString('base64');
  console.log(`[字体] ${px}px 子集 ${(sub.length / 1024).toFixed(1)} KB（${chars.size} 字）`);
}
fs.writeFileSync(path.join(root, 'src', 'font-data.js'),
  '/* 自动生成：乐米像素体（免费商用）+ Fusion Pixel（SIL OFL 1.1）子集。请勿手改。 */\n' +
  'var FONT_DATA = ' + JSON.stringify(fonts) + ';\n');

// ---------- 4. 内联 ----------
/* 构建标记：内嵌一个时间戳，标题页底部会显示。
   为什么需要它：用户报"改了还是有同样的问题"时，第一步要能排除
   "打开的还是旧文件 / 被缓存"。看到标记就能确认。 */
const buildStamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
for (const f of scripts) {
  let code = rd('src/' + f).replace(/<\/script>/gi, '<\\/script>');
  if (f === 'engine.js') code = 'var __BUILD__ = ' + JSON.stringify(buildStamp) + ';\n' + code;
  html = html.replace(`<script src="src/${f}"></script>`, () => `<script>\n/* ==== ${f} ==== */\n${code}\n</script>`);
}
if (/<script src=/.test(html)) throw new Error('仍有未内联的脚本');
fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist', 'index.html'), html);
fs.writeFileSync(path.join(root, 'index.html'), html);
console.log(`[完成] index.html ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB，${scripts.length} 个脚本，${pngs.length} 张图`);
