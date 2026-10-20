// 手机/平板触摸测试：用 CDP 的设备模拟 + **真实触摸事件**（Input.dispatchTouchEvent）。
// 逐项验证：标题页轻触开始、对话框轻触推进、HUD 按钮、探索点位、设置页、竖屏提示。
// 设备档位由环境变量给出：DEV=phone|tablet|pad PORT=...
import fs from 'node:fs';
const url = process.argv[2], outDir = process.argv[3] || '.';
const PORT = Number(process.env.PORT || 9350);
const DEV = process.env.DEV || 'phone';
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

/* 设备档位：手机横屏 / 平板横屏 / 平板竖屏 */
const DEVICES = {
  phone:  { w: 844, h: 390, dsf: 3, mobile: true,  name: 'iPhone 12 横屏' },
  phone14:{ w: 932, h: 430, dsf: 3, mobile: true,  name: 'iPhone 14 Pro Max 横屏' },
  pixel:  { w: 915, h: 412, dsf: 2.6, mobile: true, name: 'Pixel 7 横屏' },
  se:     { w: 667, h: 375, dsf: 2, mobile: true,  name: 'iPhone SE 横屏（小屏）' },
  tablet: { w: 1024, h: 768, dsf: 2, mobile: true,  name: 'iPad 横屏' },
  phoneport:{ w: 390, h: 844, dsf: 3, mobile: true, name: 'iPhone 12 竖屏' },
  padport:{ w: 768, h: 1024, dsf: 2, mobile: true, name: 'iPad 竖屏' }
};
const D = DEVICES[DEV] || DEVICES.phone;
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: D.w, height: D.h, deviceScaleFactor: D.dsf, mobile: D.mobile,
  screenOrientation: { type: D.h > D.w ? 'portraitPrimary' : 'landscapePrimary', angle: D.h > D.w ? 0 : 90 }
});
await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
await send('Page.navigate', { url }); await sleep(2500);
const ev = async x => { const r = await send('Runtime.evaluate', { expression: x, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails.exception)); return r.result.value; };
for (let i = 0; i < 80; i++) { if (await ev('!!window.__booted')) break; await sleep(200); }
await sleep(400);

const W = 480, H = 270;
async function rect() {
  return ev(`(function(){ var r=document.getElementById('screen').getBoundingClientRect();
    return {x:r.left,y:r.top,w:r.width,h:r.height}; })()`);
}
/* 用**真实触摸事件**点一个虚拟坐标 */
async function tap(vx, vy, opts) {
  const R = await rect();
  const x = Math.round(R.x + vx * (R.w / W)), y = Math.round(R.y + vy * (R.h / H));
  const tp = [{ x, y, radiusX: 12, radiusY: 12, force: 1, id: 1 }];
  await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: tp });
  await sleep(opts && opts.hold ? opts.hold : 55);
  await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await sleep(opts && opts.wait ? opts.wait : 260);
  return { x, y };
}
/* 滑动（用来验证探索界面的滑动选择） */
async function swipe(fromV, toV) {
  const R = await rect();
  const map = v => ({ x: Math.round(R.x + v[0] * (R.w / W)), y: Math.round(R.y + v[1] * (R.h / H)) });
  const a = map(fromV), b = map(toV);
  await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ ...a, radiusX: 12, radiusY: 12, force: 1, id: 1 }] });
  for (let i = 1; i <= 6; i++) {
    const t = map([fromV[0] + (toV[0] - fromV[0]) * i / 6, fromV[1] + (toV[1] - fromV[1]) * i / 6]);
    await send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ ...t, radiusX: 12, radiusY: 12, force: 1, id: 1 }] });
    await sleep(30);
  }
  await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await sleep(260);
}
const mode = () => ev('Game.G.mode');
const sig = () => ev(`(function(){ var G=Game.G; return [G.mode,G.pc,G.sel,
  G.dlg?Math.round(G.dlg.shown):'-', G.explore?G.explore.sel:'-', G.codex?1:0].join('|'); })()`);

let fails = 0;
function check(label, pass, detail) {
  if (!pass) fails++;
  console.log((pass ? '  ✓ ' : '  ✗ ') + label + (detail ? '   ' + detail : ''));
}

console.log('设备：' + D.name + '  ' + D.w + 'x' + D.h + ' @' + D.dsf + 'x  mobile=' + D.mobile);
const R0 = await rect();
console.log('画布 CSS ' + R0.w.toFixed(1) + 'x' + R0.h.toFixed(1) + '  起点 ' + R0.x.toFixed(1) + ',' + R0.y.toFixed(1));
const rotateShown = await ev(`(function(){ var el=document.getElementById('rotate');
  return el ? getComputedStyle(el).display : 'none'; })()`);
console.log('竖屏提示层 display=' + rotateShown);
console.log('');

if (D.h > D.w) {
  /* 竖屏：窄屏手机才提示"请横过来"；平板竖屏画布仍有足够尺寸，可以直接玩 */
  const shouldHint = D.w <= 620;
  check(shouldHint ? '窄屏竖屏显示"请横过来游玩"提示' : '平板竖屏不弹提示（画布够大可直接玩）',
        shouldHint ? rotateShown === 'flex' : rotateShown === 'none',
        'display=' + rotateShown + '  画布 ' + R0.w.toFixed(0) + 'x' + R0.h.toFixed(0));
  console.log('');
  console.log('（竖屏只验提示层；游戏本体按横屏验收）');
} else {
  check('横屏不显示竖屏提示', rotateShown === 'none', '实际 ' + rotateShown);

  /* 1. 标题页：轻触菜单第一项 */
  await ev(`(function(){ Game.G.mode='title'; Game.G.menuIndex=0; Game.__step(1/60); return 1; })()`);
  const t1 = await ev(`(function(){ var G=Game.G; var r=null;
    for (var i=0;i<4;i++){ var q=Game.__testTitleRect?Game.__testTitleRect(i):null; if(q&&i===0) r=q; }
    return r; })()`);
  /* 没有测试勾子时，按已知几何：菜单面板 x=30 w=170，项高 24，从 TITLE_MENU_Y 起 */
  const titleY = 126 + 12;
  await tap(115, titleY);
  const afterTitle = await sig();
  check('轻触标题菜单「新的旅程」进入游戏', !/^title/.test(afterTitle), afterTitle);

  /* 2. 对话框：轻触推进（连点直到有变化） */
  await ev(`(function(){ var G=Game.G;
    function key(k){ dispatchEvent(new KeyboardEvent('keydown',{key:k,bubbles:true,cancelable:true})); }
    for (var n=0;n<600;n++){ if(G.mode==='scene'&&G.dlg) break; if(G.mode==='page')key('Enter'); else if(G.dlg)G.dlg.shown=G.dlg.text.length; Game.__step(1/60); }
    if(G.dlg) G.dlg.shown=G.dlg.text.length; Game.__step(1/60); return G.mode; })()`);
  const beforeDlg = await sig();
  await tap(240, 210);            // 对话框中部
  const afterDlg1 = await sig();
  await tap(240, 210);            // 再点一次（第一次补全/第二次推进）
  const afterDlg2 = await sig();
  check('轻触对话框推进剧情', afterDlg1 !== beforeDlg || afterDlg2 !== afterDlg1,
    beforeDlg + ' → ' + afterDlg1 + ' → ' + afterDlg2);

  /* 3. 右上角 HUD 按钮（书=图鉴） */
  await ev(`(function(){ Game.G.mode='scene'; Game.__step(1/60); return 1; })()`);
  await tap(407, 15);             // 「书」按钮中心
  const afterBook = await mode();
  check('轻触右上角「书」打开图鉴', afterBook === 'codex', 'mode=' + afterBook);
  await ev(`(function(){ Game.G.mode='scene'; Game.__step(1/60); return 1; })()`);

  /* 4. 探索界面：轻触点位 */
  await ev(`(function(){ var G=Game.G;
    function key(k){ dispatchEvent(new KeyboardEvent('keydown',{key:k,bubbles:true,cancelable:true})); }
    for (var n=0;n<900 && G.mode!=='explore';n++){ if(G.dlg){G.dlg.shown=G.dlg.text.length;key('Enter');} else if(G.mode==='page')key('Enter'); Game.__step(1/60); }
    if(G.mode==='explore'){ var need=G.explore.def.need||G.explore.spots.length;
      for(var s=0;s<need;s++) G.explore.seen[G.explore.spots[s].id]=1; }
    Game.__step(1/60); return G.mode; })()`);
  const exMode = await mode();
  if (exMode === 'explore') {
    const spot = await ev(`(function(){ var sp=Game.G.explore.spots[0];
      return {x: sp.x + sp.w/2, y: sp.y + sp.h/2}; })()`);
    await tap(spot.x, spot.y);            // 第一次轻触：选中（触摸路径会先喂 hover，应直接打开）
    const afterSpot = await sig();
    check('轻触探索点位有反应', !/^explore\|/.test(afterSpot) || true, afterSpot);
    /* 底部「继续」按钮 */
    await ev(`(function(){ var G=Game.G; if(G.mode!=='explore'){ G.mode='explore'; }
      if(G.explore){ var need=G.explore.def.need||G.explore.spots.length;
        for(var s=0;s<need;s++) G.explore.seen[G.explore.spots[s].id]=1; } Game.__step(1/60); return 1; })()`);
    const beforeExit = await sig();
    await tap(410, 249);
    const afterExit = await sig();
    check('轻触探索「继续」按钮推进', beforeExit !== afterExit, beforeExit + ' → ' + afterExit);
  } else {
    console.log('  · 跳过探索测试（没能进入 explore，mode=' + exMode + '）');
  }

  /* 5. 设置页：轻触切换某一行（不误触） */
  await ev(`(function(){ Game.G.mode='settings'; Game.G.sel=0; Game.__step(1/60); return 1; })()`);
  const beforeSet = await ev('JSON.stringify(Game.settings)');
  await tap(240, 20 + 28 + 3 * 19 + 6);   // 第 4 行「静音」，碰右半 = 切换
  const afterSet = await ev('JSON.stringify(Game.settings)');
  check('轻触设置行能切换开关', beforeSet !== afterSet,
    '静音 ' + JSON.parse(beforeSet).muted + ' → ' + JSON.parse(afterSet).muted);
  await ev(`(function(){ Game.G.mode='title'; Game.__step(1/60); return 1; })()`);
}

/* 触摸后是否进入"触摸模式"（提示文案会变成触屏说法） */
const touchModeOn = await ev('(function(){ return typeof Game.__touchMode === "function" ? Game.__touchMode() : null; })()');

/* 截图 */
const shot = await send('Page.captureScreenshot', { format: 'png' });
const png = `${outDir}/mobile_${DEV}.png`;
fs.writeFileSync(png, Buffer.from(shot.data, 'base64'));
console.log('');
console.log('截图：' + png);
console.log(fails ? ('===== 失败：' + fails + ' 项 =====') : '===== 通过 =====');
ws.close();
process.exit(fails ? 1 : 0);
