// 全画布点击覆盖扫描：把每个界面的画布按 16x12 网格铺满，
// 每一格都点一次，记录"这一格到底有没有引起任何变化"（模式/对话/pc/选中项）。
// 目的：找出任何"看起来能点、点了完全没反应"的死区。
import fs from 'node:fs';
const url = process.argv[2], outDir = process.argv[3] || '.', intScale = process.argv[4] !== '0';
const PORT = Number(process.env.PORT || 9335);
const sleep = ms => new Promise(r => setTimeout(r, ms));
let id = 0; const pending = new Map();
const target = await (async () => {
  for (let i = 0; i < 40; i++) {
    try { const l = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const p = l.find(t => t.type === 'page' && t.webSocketDebuggerUrl); if (p) return p; } catch (e) {}
    await sleep(250);
  } throw new Error('no target');
})();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.addEventListener('open', res); ws.addEventListener('error', rej); });
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
const send = (method, params) => new Promise((res, rej) => { const i = ++id;
  pending.set(i, m => m.error ? rej(new Error(method + ' ' + JSON.stringify(m.error))) : res(m.result));
  ws.send(JSON.stringify({ id: i, method, params: params || {} })); });
await send('Page.enable'); await send('Runtime.enable');
const VW = +(process.env.VW || 1280), VH = +(process.env.VH || 720);
await send('Emulation.setDeviceMetricsOverride', { width: VW, height: VH, deviceScaleFactor: +(process.env.DSF || 1), mobile: false });
await send('Page.navigate', { url }); await sleep(2200);
const ev = async x => { const r = await send('Runtime.evaluate', { expression: x, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails.exception)); return r.result.value; };
for (let i = 0; i < 60; i++) { if (await ev('!!window.__booted')) break; await sleep(200); }
await ev(`(function(){ Game.newGame(); Game.settings.integerScale=${intScale}; dispatchEvent(new Event('resize'));
  for(var i=0;i<200;i++) Game.__step(1/60); return 1; })()`);
await sleep(250);
const R = await ev(`(function(){ var r=document.getElementById('screen').getBoundingClientRect();
  return {x:r.left,y:r.top,w:r.width,h:r.height}; })()`);

async function clickV(vx, vy) {
  const x = R.x + vx * (R.w / 480), y = R.y + vy * (R.h / 270);
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, button: 'none' });
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
  await sleep(10);
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
  await sleep(45);
}
const sig = () => ev(`(function(){ var G=Game.G; return [G.mode, G.pc, G.sel, G.menuIndex,
  G.dlg?Math.round(G.dlg.shown):'-', G.choice?G.choice.sel:'-', G.explore?G.explore.sel:'-',
  G.codex?G.codex.sel:'-', G.scroll||0].join('|'); })()`);

/* 只点"右侧三分之一"：这是玩家报问题的地方。
   左右两块各 8 列 → 右块列号 10..15（虚拟 x 300..480）。 */
const FAST = process.env.FAST === '1';
const COLS = FAST ? [[10, 11, 12, 13, 14, 15], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]] : null;

/* 把游戏切到指定界面 */
async function goMode(m) {
  await ev(`(function(){ var G=Game.G;
    function key(k){ dispatchEvent(new KeyboardEvent('keydown',{key:k,bubbles:true,cancelable:true})); }
    if (${JSON.stringify(m)} === 'scene') {
      if (G.mode!=='scene'){ G.mode='scene'; }
      for (var n=0;n<400 && !(G.mode==='scene'&&G.dlg);n++){ if(G.dlg){G.dlg.shown=G.dlg.text.length;} Game.__step(1/60); }
      if (G.dlg) G.dlg.shown = G.dlg.text.length;
      Game.__step(1/60);
    } else if (${JSON.stringify(m)} === 'explore') {
      for (var n=0;n<900 && G.mode!=='explore';n++){ if(G.dlg){G.dlg.shown=G.dlg.text.length;key('Enter');} else if(G.mode==='page')key('Enter'); Game.__step(1/60); }
      if (G.mode==='explore'){ var need=G.explore.def.need||G.explore.spots.length; for(var s=0;s<need;s++) G.explore.seen[G.explore.spots[s].id]=1; }
      Game.__step(1/60);
    } else if (${JSON.stringify(m)} === 'choice') {
      for (var n=0;n<900 && G.mode!=='choice';n++){ if(G.dlg){G.dlg.shown=G.dlg.text.length;key('Enter');} else if(G.mode==='page')key('Enter'); Game.__step(1/60); }
    } else if (${JSON.stringify(m)} === 'codex') { G.mode='codex'; G.scroll=0; G.sel=0; Game.__step(1/60); }
    else if (${JSON.stringify(m)} === 'title') { G.mode='title'; G.menuIndex=0; Game.__step(1/60); }
    else if (${JSON.stringify(m)} === 'map') { G.mode='map'; G.menuIndex=0; Game.__step(1/60); }
    return G.mode; })()`);
}

const MODES = ['scene', 'explore', 'title', 'codex', 'map'];
console.log('画布 CSS ' + R.w.toFixed(1) + 'x' + R.h.toFixed(1) + '   整数缩放=' + intScale);
console.log('网格 16x12 格 = 每格约 30x22.5 虚拟像素' + (FAST ? '（快速模式）' : '') + '\n');
/* 右侧三分之一（虚拟 x >= 300）单独统计 —— 玩家的报障区域 */
let rightLive = 0, rightDead = 0;
for (const m of MODES) {
  await goMode(m);
  const start = await ev('Game.G.mode');
  const rows = [];
  let dead = 0, live = 0;
  for (let gy = 0; gy < 12; gy++) {
    let line = '';
    for (let gx = 0; gx < 16; gx++) {
      const vx = Math.round((gx + 0.5) * 480 / 16), vy = Math.round((gy + 0.5) * 270 / 12);
      await goMode(m);                       // 每格前先复位，保证起点一致
      const before = await sig();
      await clickV(vx, vy);
      const after = await sig();
      const changed = before !== after;
      if (changed) live++; else dead++;
      if (vx >= 300) { if (changed) rightLive++; else rightDead++; }
      line += changed ? '#' : '.';
    }
    rows.push(line);
  }
  console.log('【' + m + '】起始 mode=' + start + '   有反应 ' + live + ' 格 / 无反应 ' + dead + ' 格');
  rows.forEach(r => console.log('  ' + r));
  console.log('');
}
console.log('右侧三分之一（虚拟 x≥300）：有反应 ' + rightLive + ' 格 / 无反应 ' + rightDead + ' 格');
ws.close();
