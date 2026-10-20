// 精确验证 scene 模式：点一下对话，到底发生了什么？
// 把 dlg.shown / dlg.text / pc / mode 全打出来，不用"签名是否变化"这种粗办法。
import fs from 'node:fs';
const url = process.argv[2], outDir = process.argv[3] || '.', intScale = process.argv[4] !== '0';
const PORT = Number(process.env.PORT || 9336);
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
await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 720, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url }); await sleep(2200);
const ev = async x => { const r = await send('Runtime.evaluate', { expression: x, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails.exception)); return r.result.value; };
for (let i = 0; i < 60; i++) { if (await ev('!!window.__booted')) break; await sleep(200); }
await ev(`(function(){ Game.newGame(); Game.settings.integerScale=${intScale}; dispatchEvent(new Event('resize'));
  for(var i=0;i<200;i++) Game.__step(1/60); return 1; })()`);
await sleep(250);
const R = await ev(`(function(){ var r=document.getElementById('screen').getBoundingClientRect();
  return {x:r.left,y:r.top,w:r.width,h:r.height}; })()`);

/* 把游戏推进到"停在一句对白上"，并把打字机停在半途（这样点一下应该先显示完整） */
async function park() {
  return ev(`(function(){ var G=Game.G;
    function key(k){ dispatchEvent(new KeyboardEvent('keydown',{key:k,bubbles:true,cancelable:true})); }
    for (var n=0;n<600;n++){
      if (G.mode==='scene' && G.dlg) break;
      if (G.mode==='page') key('Enter'); else if (G.dlg) G.dlg.shown=G.dlg.text.length;
      Game.__step(1/60);
    }
    if (!G.dlg) return 'no-dlg mode='+G.mode;
    G.dlg.shown = Math.max(1, Math.floor(G.dlg.text.length/2));  // 停在半途
    Game.__step(1/60);
    return 'parked mode='+G.mode+' kind='+G.dlg.kind+' shown='+Math.round(G.dlg.shown)+' len='+G.dlg.text.length+' pc='+G.pc;
  })()`);
}
const st = () => ev(`(function(){ var G=Game.G; return 'mode='+G.mode+' pc='+G.pc+' shown='+(G.dlg?Math.round(G.dlg.shown):'-')+
  ' len='+(G.dlg?G.dlg.text.length:'-')+' kind='+(G.dlg?G.dlg.kind:'-')+' sel='+G.sel; })()`);
async function clickV(vx, vy) {
  const x = R.x + vx * (R.w / 480), y = R.y + vy * (R.h / 270);
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, button: 'none' });
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
  await sleep(25);
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
  await sleep(200);
}
console.log('画布 CSS ' + R.w.toFixed(1) + 'x' + R.h.toFixed(1));
console.log('\n【A】点在对话框右侧空白（虚拟 420, 210），连点三次，每步都记录：');
for (let i = 1; i <= 3; i++) {
  const p = await park();
  const before = await st();
  await clickV(420, 210);
  const after = await st();
  console.log('  第' + i + '次  ' + p);
  console.log('        点击前 ' + before);
  console.log('        点击后 ' + after + '   ' + (before !== after ? '✓ 有变化' : '✗ 完全没变'));
}
console.log('\n【B】同一句，改点左下角（虚拟 60, 250）：');
{
  await park();
  const before = await st(); await clickV(60, 250); const after = await st();
  console.log('  ' + before + '  →  ' + after + '   ' + (before !== after ? '✓' : '✗'));
}
console.log('\n【C】点右上角按钮区（虚拟 440, 15）—— 应该切换模式：');
{
  await park();
  const before = await st(); await clickV(440, 15); const after = await st();
  console.log('  ' + before + '  →  ' + after + '   ' + (before !== after ? '✓' : '✗'));
  await ev('Game.G.mode="scene"; 1');
}
console.log('\n【D】"两次点击才推进"验证：同一句连点两次，看第一次是不是只把字显示完：');
{
  await park();
  const s0 = await st();
  await clickV(250, 210);
  const s1 = await st();
  await clickV(250, 210);
  const s2 = await st();
  console.log('  初始   ' + s0);
  console.log('  点一次 ' + s1);
  console.log('  点二次 ' + s2);
  console.log('  → ' + (s1 !== s0 && s2 !== s1 ? '两次点击分别产生变化（第一次补全文字、第二次推进下一句）'
    : '（行为不同，见上）'));
}
ws.close();
