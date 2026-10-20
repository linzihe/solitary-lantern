// 用 CDP（DevTools 协议）驱动**真实鼠标事件**点击，并截图定位按钮的屏幕位置。
// 合成 MouseEvent 与真人点击的差别就在这一层：合成事件不经过浏览器命中测试/布局取整。
// 用法：node cdp-click.mjs <url> <outDir> [integerScale]
import fs from 'node:fs';
import path from 'node:path';

const url = process.argv[2];
const outDir = process.argv[3] || '.';
const intScale = process.argv[4] !== '0';
const PORT = 9333;

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function cdp(ws) {
  let id = 0;
  const pending = new Map();
  ws.addEventListener('message', ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  });
  const send = (method, params) => new Promise((res, rej) => {
    const myId = ++id;
    pending.set(myId, m => m.error ? rej(new Error(method + ': ' + JSON.stringify(m.error))) : res(m.result));
    ws.send(JSON.stringify({ id: myId, method, params: params || {} }));
  });
  return send;
}

const target = await (async () => {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const list = await r.json();
      const page = list.find(t => t.type === 'page' && t.webSocketDebuggerUrl);
      if (page) return page;
    } catch (e) {}
    await sleep(250);
  }
  throw new Error('拿不到 CDP 目标页');
})();

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.addEventListener('open', res); ws.addEventListener('error', rej); });
const send = await cdp(ws);
await send('Page.enable');
await send('Runtime.enable');
/* 无头下 --window-size 会被压成很小的视口，必须用 deviceMetrics 覆盖，
   否则测不到"画布被放大到 2.x 倍"这种真实场景。 */
const VW = +(process.env.VW || 1280), VH = +(process.env.VH || 720);
await send('Emulation.setDeviceMetricsOverride', {
  width: VW, height: VH, deviceScaleFactor: +(process.env.DSF || 1), mobile: false
});
await send('Page.navigate', { url });
await sleep(2500);

const evalJs = async (expr) => {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails.exception));
  return r.result.value;
};

// 等启动
for (let i = 0; i < 60; i++) { if (await evalJs('!!window.__booted')) break; await sleep(200); }

// 设缩放开关
await evalJs(`(function(){ Game.G; Game.newGame(); for (var i=0;i<240;i++) Game.__step(1/60);
  Game.settings.integerScale = ${intScale}; window.dispatchEvent(new Event('resize'));
  for (var i=0;i<60;i++) Game.__step(1/60); return 1; })()`);
await sleep(400);

// 走到探索界面并读满 need 个点
const st = await evalJs(`(function(){
  var G = Game.G;
  function key(k){ window.dispatchEvent(new KeyboardEvent('keydown',{key:k,bubbles:true,cancelable:true})); }
  for (var n=0;n<900 && G.mode!=='explore';n++){
    if (G.dlg){ G.dlg.shown=G.dlg.text.length; key('Enter'); } else if (G.mode==='page') key('Enter');
    Game.__step(1/60);
  }
  if (G.mode!=='explore') return {ok:false,mode:G.mode};
  var need=G.explore.def.need||G.explore.spots.length;
  for (var s=0;s<need;s++) G.explore.seen[G.explore.spots[s].id]=1;
  Game.__step(1/60);
  var c=document.getElementById('screen'), r=c.getBoundingClientRect();
  return {ok:true, mode:G.mode, need:need, seen:Object.keys(G.explore.seen).length,
    rect:{x:r.left,y:r.top,w:r.width,h:r.height}, dpr:window.devicePixelRatio,
    intScale:Game.settings.integerScale, styleW:c.style.width, inner:[window.innerWidth,window.innerHeight]};
})()`);
console.log('状态：', JSON.stringify(st));

if (!st.ok) { ws.close(); process.exit(2); }

// 计算按钮中心的**屏幕坐标**（与真人看到的同一个坐标系）
const target2 = await evalJs(`(function(){
  var W=480,H=270,c=document.getElementById('screen'),r=c.getBoundingClientRect();
  var ex={x:W-132,y:H-32,w:124,h:22};
  var vx=ex.x+ex.w/2, vy=ex.y+ex.h/2;
  return { x: r.left + vx*(r.width/W), y: r.top + vy*(r.height/H) };
})()`);
console.log('准备用真实鼠标点击屏幕坐标：', JSON.stringify(target2));

await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: target2.x, y: target2.y, button: 'none' });
await sleep(120);
await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: target2.x, y: target2.y, button: 'left', clickCount: 1 });
await sleep(60);
await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: target2.x, y: target2.y, button: 'left', clickCount: 1 });
await sleep(500);

const after = await evalJs(`(function(){ var G=Game.G; var c=document.getElementById('screen'),r=c.getBoundingClientRect();
  return { mode:G.mode, pc:G.pc, exitHot: G.explore?G.explore.exitHot:null,
    rect:{x:+r.left.toFixed(2),y:+r.top.toFixed(2),w:+r.width.toFixed(2),h:+r.height.toFixed(2)},
    dpr:window.devicePixelRatio }; })()`);
console.log('真实点击后：', JSON.stringify(after));
console.log(after.mode !== 'explore' ? '结论：真实鼠标点击 ✓ 命中' : '结论：真实鼠标点击 ✗ 没命中（复现！）');

// 截图留证
const shot = await send('Page.captureScreenshot', { format: 'png' });
const png = path.join(outDir, `realclick_int${intScale ? 1 : 0}.png`);
fs.writeFileSync(png, Buffer.from(shot.data, 'base64'));
console.log('截图：', png);
ws.close();
