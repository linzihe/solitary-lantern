// 统计全项目实际用到的字号，决定 art.js 的分档表怎么改
import fs from 'node:fs';
const root = process.argv[2];
const files = ['src/art.js', 'src/ui.js', 'src/engine.js'];
const counts = {};
function bump(k) { counts[k] = (counts[k] || 0) + 1; }
for (const f of files) {
  const s = fs.readFileSync(root + '/' + f, 'utf8');
  for (const m of s.matchAll(/PF\.draw\([^)]*?,\s*(\d+)\s*,/g)) bump(+m[1]);
  for (const m of s.matchAll(/PixelFont\.draw\([^)]*?,\s*(\d+)\s*,/g)) bump(+m[1]);
  for (const m of s.matchAll(/PF\.wrap\([^,]+,\s*(\d+)\s*,/g)) bump('wrap:' + m[1]);
  for (const m of s.matchAll(/PF\.width\([^,]+,\s*(\d+)\s*[,)]/g)) bump('width:' + m[1]);
}
const keys = Object.keys(counts).sort((a, b) => (parseInt(a.replace(/\D/g, '')) || 0) - (parseInt(b.replace(/\D/g, '')) || 0));
for (const k of keys) console.log('  ' + k + ' : ' + counts[k] + ' 处');
