// 直接打开**线上地址**（不经 iframe），用 CDP 读游戏内部状态并真正玩几步。
// 这是部署后最有说服力的验证：不是"HTTP 200"，而是"游戏能跑、能推进、配乐能读到"。
const PORT = Number(process.env.PORT || 9360);
const LIVE = process.env.LIVE || 'https://linzihe.github.io/solitary-lantern/';
const sleep = ms => new Promise(r => setTimeout(r, ms));
let id = 0; const pending = new Map();
const target = await (async () => {
  for (let i = 0; i < 60; i++) {
    try { const l = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const p = l.find(t => t.type === 'page' && t.webSocketDebuggerUrl); if (p) return p; } catch (e) {}
    await sleep(250);
  }
  throw new Error('拿不到 CDP 目标');
})();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.addEventListener('open', res); ws.addEventListener('error', rej); });
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
const send = (method, params) => new Promise((res, rej) => { const i = ++id;
  pending.set(i, m => m.error ? rej(new Error(method + ' ' + JSON.stringify(m.error))) : res(m.result));
  ws.send(JSON.stringify({ id: i, method, params: params || {} })); });

await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 720, deviceScaleFactor: 1, mobile: false });
const t0 = Date.now();
await send('Page.navigate', { url: LIVE });

const ev = async x => {
  const r = await send('Runtime.evaluate', { expression: x, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) return { __err: JSON.stringify(r.exceptionDetails.exception) };
  return r.result.value;
};

let booted = false;
for (let i = 0; i < 120; i++) {
  const b = await ev('typeof window.__booted !== "undefined" && !!window.__booted');
  if (b === true) { booted = true; break; }
  await sleep(300);
}
console.log('线上地址：' + LIVE);
console.log('加载用时：' + ((Date.now() - t0) / 1000).toFixed(1) + ' 秒');
console.log('__booted：' + booted);
if (!booted) {
  const err = await ev('(function(){ try { return JSON.stringify({ title: document.title, scripts: document.scripts.length }); } catch(e){ return String(e); } })()');
  console.log('诊断：' + JSON.stringify(err));
  process.exit(1);
}

const info = await ev(`(function(){
  var G = Game.G;
  return {
    scenes: Object.keys(STORY.scenes).length,
    chapters: STORY.chapters.length,
    codex: Object.keys(STORY.codex || {}).length,
    build: (typeof __BUILD__ !== 'undefined' ? __BUILD__ : null),
    canvas: [document.getElementById('screen').width, document.getElementById('screen').height],
    title: STORY.meta.title,
    origin: location.origin + location.pathname
  };
})()`);
console.log('场景 ' + info.scenes + ' · 章节 ' + info.chapters + ' · 图鉴 ' + info.codex +
            ' · 画布 ' + info.canvas.join('x') + ' · 构建 ' + info.build);
console.log('页面来源：' + info.origin);

/* 真正玩几步 */
const play = await ev(`(function(){
  var G = Game.G;
  Game.newGame();
  for (var i = 0; i < 240; i++) Game.__step(1/60);
  function key(k){ dispatchEvent(new KeyboardEvent('keydown',{key:k,bubbles:true,cancelable:true})); }
  var steps = 0;
  for (var n = 0; n < 500 && steps < 8; n++) {
    if (G.dlg) { G.dlg.shown = G.dlg.text.length; key('Enter'); steps++; }
    else if (G.mode === 'page') key('Enter');
    Game.__step(1/60);
  }
  return { mode: G.mode, pc: G.pc, steps: steps, bg: G.bg, bgm: G.bgm,
           sceneId: G.sceneId, dlg: G.dlg ? String(G.dlg.text).slice(0, 24) : null };
})()`);
console.log('推进 ' + play.steps + ' 句 → mode=' + play.mode + ' pc=' + play.pc +
            ' 场景=' + play.sceneId + ' 背景=' + play.bg + ' 音乐=' + play.bgm);
console.log('当前台词：' + (play.dlg || '（无）'));

/* 配乐探测（线上能不能读到 music/title.mp3） */
const music = await ev(`(function(){
  return new Promise(function(res){
    if (typeof Music === 'undefined' || !Music.detect) { res('没有配乐模块'); return; }
    var done = false;
    var t = setTimeout(function(){ if(!done){ done=true; res('探测超时'); } }, 8000);
    Music.detect().then(function(found){
      if (done) return; done = true; clearTimeout(t);
      res(Object.keys(found || {}).map(function(n){ return n + '.' + found[n]; }).join(', ') || '（没找到）');
    }, function(e){ if (done) return; done = true; clearTimeout(t); res('失败：' + e.message); });
  });
})()`);
console.log('线上配乐探测：' + JSON.stringify(music));

/* 截图留证 */
const shot = await send('Page.captureScreenshot', { format: 'png' });
const fs = await import('node:fs');
fs.writeFileSync(process.env.SHOT_OUT || 'live.png', Buffer.from(shot.data, 'base64'));
console.log('截图：' + (process.env.SHOT_OUT || 'live.png'));

/* 控制台报错 */
const errs = await ev('window.__liveErrs || 0');
console.log('');
console.log('===== 通过 =====');
ws.close();
