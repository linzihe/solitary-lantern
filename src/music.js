/* =========================================================================
 *  music.js —— 外部配乐层（可选）
 *
 *  作用：music/ 文件夹里若存在与场景音乐同名的文件（title.mp3 等），就播真实音乐；
 *        不存在则整层退出，游戏继续用内置合成曲 —— "单文件双击可玩"不受影响。
 *
 *  三条设计决定（都是踩过坑之后定的）：
 *
 *  1) **探测用 <audio>，不用 XHR HEAD**。
 *     file:// 页面下 XHR 对本地文件的 HEAD 在部分浏览器会被拒，会出现
 *     "文件明明在、探测却报没有"，于是游戏回落成合成曲 —— 也就是"放了 MP3 还是不响"。
 *
 *  2) **不把 <audio> 接进 WebAudio**（不用 createMediaElementSource）。
 *     接进图要求音频时钟真的在跑；在无音频设备的环境里会卡成
 *     readyState=0 / currentTime=0 —— "看着在播、其实永远不出声"。直接播 + 调 el.volume 到处都能响。
 *
 *  3) **绝不让两套音乐同时响**。浏览器自动播放策略会挡住没有用户手势的 play()，
 *     这段时间如果合成曲还在响，玩家听到的是合成曲，就会以为"外部音乐没生效"。
 *     所以：探测到文件 → 立刻把合成曲压到静音 → 等第一个手势把 MP3 放起来；
 *     只有"真的播不了"（元素报错 / 12 秒内既没播成也没手势）才把合成曲放回来。
 *
 *  首尾闭环：曲子放到还剩 FADE 秒时，新起一份从 0 音量淡入、老的淡出。
 *  文件命名 = 场景音乐 id：title / forest / cottage / moon / dawn /
 *  trance / wheel / trial / ending / vision，扩展名 mp3|m4a|ogg|wav。
 * ========================================================================= */
var Music = (function () {
  'use strict';
  var DIR = 'music/';
  var EXTS = ['mp3', 'm4a', 'ogg', 'wav'];
  var FADE = 2.0;          // 交叉叠化时长（秒）
  var SYNTH_BGM_VOL = 0.34;
  var GIVE_UP_MS = 12000;  // 这么久还播不出来，就把合成曲放回来

  var avail = null;
  var probePromise = null;
  var cur = null;
  var spare = null;
  var pending = null;
  var silencedSynth = false;   // 是否正在压住合成曲
  var giveUpTimer = null;

  function at(p) { try { return new URL(p, location.href).href; } catch (e) { return p; } }
  function clamp(v) { v = Number(v); return isFinite(v) ? Math.max(0, Math.min(1, v)) : 0; }

  /* ---------------- 合成曲的压制与恢复 ---------------- */
  function silenceSynth() {
    silencedSynth = true;
    try { if (typeof Sound !== 'undefined' && Sound.setBgmVolume) Sound.setBgmVolume(0); } catch (e) {}
    if (giveUpTimer) clearTimeout(giveUpTimer);
    giveUpTimer = setTimeout(function () {
      if (cur && !cur.el.paused) return;          // 已经播起来了，保持静音
      releaseSynth();
    }, GIVE_UP_MS);
  }
  function releaseSynth() {
    if (giveUpTimer) { clearTimeout(giveUpTimer); giveUpTimer = null; }
    if (!silencedSynth) return;
    silencedSynth = false;
    try { if (typeof Sound !== 'undefined' && Sound.setBgmVolume) Sound.setBgmVolume(SYNTH_BGM_VOL); } catch (e) {}
  }

  /* ---------------- 探测：让 <audio> 自己去加载 ---------------- */
  function probeOne(name, ext, cb) {
    var a = new Audio();
    var done = false;
    a.preload = 'metadata';
    function finish(ok) {
      if (done) return;
      done = true;
      clearTimeout(timer);
      a.onloadedmetadata = a.oncanplay = a.onerror = null;
      try { a.removeAttribute('src'); a.load(); } catch (e) {}
      cb(ok);
    }
    var timer = setTimeout(function () { finish(false); }, 12000);
    a.onloadedmetadata = function () { finish(true); };
    a.oncanplay = function () { finish(true); };
    a.onerror = function () { finish(false); };
    try { a.src = at(DIR + name + '.' + ext); } catch (e) { finish(false); return; }
    try { a.load(); } catch (e) { finish(false); }
  }
  function probe(name, cb) {
    var i = 0;
    (function step() {
      if (i >= EXTS.length) { cb(null); return; }
      var ext = EXTS[i++];
      probeOne(name, ext, function (ok) { if (ok) cb(ext); else step(); });
    })();
  }
  function detect() {
    if (avail) return Promise.resolve(avail);
    if (probePromise) return probePromise;
    var names = (typeof Sound !== 'undefined' && Sound.listBgm) ? Sound.listBgm() : [];
    probePromise = new Promise(function (resolve) {
      var out = {}, left = names.length;
      if (!left) { avail = out; resolve(out); return; }
      names.forEach(function (nm) {
        probe(nm, function (ext) {
          if (ext) out[nm] = ext;
          if (--left === 0) { avail = out; resolve(out); }
        });
      });
    });
    return probePromise;
  }

  /* ---------------- 槽位 ---------------- */
  function makeSlot() {
    var el = new Audio();
    el.preload = 'auto';
    el.loop = false;                 // 循环由交叉叠化负责
    el.volume = 0;
    return { el: el, name: null, vol: 0, timer: null, loopTimer: null };
  }
  function acquireSlot() { if (spare) { var s = spare; spare = null; return s; } return makeSlot(); }
  function releaseSlot(s) {
    if (!s) return;
    if (s.timer) { clearInterval(s.timer); s.timer = null; }
    if (s.loopTimer) { clearInterval(s.loopTimer); s.loopTimer = null; }
    try { s.el.pause(); } catch (e) {}
    try { s.el.removeAttribute('src'); s.el.load(); } catch (e) {}
    s.name = null; s.vol = 0;
    spare = s;
  }
  function applyVol(s) { try { s.el.volume = clamp(s.vol * baseVol); } catch (e) {} }
  var baseVol = 0.9;

  function ramp(s, target, sec) {
    if (s.timer) { clearInterval(s.timer); s.timer = null; }
    var steps = Math.max(1, Math.round(sec / 0.05));
    var from = s.vol, i = 0;
    s.timer = setInterval(function () {
      i++;
      s.vol = from + (target - from) * (i / steps);
      applyVol(s);
      if (i >= steps) { clearInterval(s.timer); s.timer = null; s.vol = target; applyVol(s); }
    }, 50);
  }

  function startSlot(s, name, fadeIn, keep) {
    s.name = name;
    s.el.src = at(DIR + name + '.' + avail[name]);
    try { s.el.currentTime = 0; } catch (e) {}
    s.vol = 0; applyVol(s);
    if (!s.el.__hooked) {
      s.el.__hooked = 1;
      s.el.addEventListener('playing', function () {
        pending = null;
        /* 真出声了：先把合成曲音量归零再停掉（双保险，免得任何路径上它还响） */
        try {
          if (typeof Sound !== 'undefined') {
            if (Sound.setBgmVolume) Sound.setBgmVolume(0);
            if (Sound.stopBgm) Sound.stopBgm();
          }
        } catch (e) {}
      });
      s.el.addEventListener('error', function () {
        /* 文件坏了：放回合成曲 */
        releaseSynth();
        pending = null;
      });
    }
    var p = s.el.play();
    if (p && p.catch) p.catch(function () { pending = name; });
    ramp(s, 1, fadeIn === undefined ? 1.2 : fadeIn);
    if (!keep) cur = s;
    return s;
  }

  /* 到尾巴交叉叠化，接成不露缝的循环 */
  function armLoop(s, name) {
    var stalled = 0;
    if (s.loopTimer) clearInterval(s.loopTimer);
    s.loopTimer = setInterval(function () {
      if (cur !== s) { clearInterval(s.loopTimer); s.loopTimer = null; return; }
      var el = s.el;
      if (el.currentTime > 0.2) stalled = 0; else stalled++;
      if (stalled > 40 && el.paused) { pending = name; return; }   // 一直没播起来，挂着等手势
      if (!isFinite(el.duration) || el.duration <= 0) return;
      if (el.currentTime < el.duration - FADE) return;
      clearInterval(s.loopTimer); s.loopTimer = null;
      var overlap = Math.min(FADE, el.duration * 0.3);
      var nx = acquireSlot();
      startSlot(nx, name, overlap, true);
      ramp(s, 0, overlap);
      setTimeout(function () { if (cur !== s) releaseSlot(s); }, overlap * 1000 + 300);
    }, 50);
  }

  return {
    setVolume: function (v) {
      baseVol = clamp(v);
      if (cur) applyVol(cur);
      if (spare) applyVol(spare);
    },
    getVolume: function () { return baseVol; },
    detect: detect,
    available: function () { return avail || {}; },
    has: function (name) { return !!(avail && avail[name]); },
    /* 每次用户手势都调它：被策略挡住的 play() 在这里补上 */
    unlock: function () {
      if (pending) {
        var p = pending; pending = null;
        if (this.has(p)) { this.play(p); return; }
      }
      if (cur && cur.el.paused) {
        var pp = cur.el.play();
        if (pp && pp.catch) pp.catch(function () { pending = cur ? cur.name : null; });
      }
    },
    play: function (name) {
      if (!avail || !avail[name]) return false;
      if (cur && cur.name === name) {
        if (cur.el.paused) {
          var pp = cur.el.play();
          if (pp && pp.catch) pp.catch(function () { pending = name; });
          silenceSynth();
        }
        return true;
      }
      if (cur) { var old = cur; cur = null; ramp(old, 0, 0.6); setTimeout(function () { releaseSlot(old); }, 900); }
      var s = startSlot(acquireSlot(), name, 1.2, false);
      armLoop(s, name);
      if (s.el.paused) silenceSynth();
      return true;
    },
    stop: function () {
      pending = null;
      if (cur) { var o = cur; cur = null; ramp(o, 0, 0.5); setTimeout(function () { releaseSlot(o); }, 800); }
    },
    stopAll: function () { this.stop(); },
    current: function () { return cur ? cur.name : null; },
    currentTime: function () { return cur ? cur.el.currentTime : 0; },
    duration: function () { return cur && isFinite(cur.el.duration) ? cur.el.duration : 0; },
    /* 测试面：外部看不到不挂 DOM 的 <audio> */
    debug: function () {
      function d(s) {
        return s ? {
          name: s.name, vol: +s.vol.toFixed(3), elVol: +s.el.volume.toFixed(3),
          readyState: s.el.readyState, networkState: s.el.networkState,
          paused: s.el.paused, currentTime: +s.el.currentTime.toFixed(2),
          duration: isFinite(s.el.duration) ? +s.el.duration.toFixed(1) : String(s.el.duration),
          src: s.el.src ? s.el.src.slice(-26) : ''
        } : null;
      }
      return {
        avail: avail ? Object.keys(avail) : null, baseVol: baseVol,
        cur: d(cur), spare: d(spare), pending: pending, synthSilenced: silencedSynth
      };
    }
  };
})();
