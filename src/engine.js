/* =========================================================================
 *  engine.js —— 主循环 / 剧本解释器 / 输入 / 存档 / 菜单 / 状态机
 *
 *  测试面（五套 harness 的前提）：
 *      Game.G / Game.boot() / Game.newGame() / Game.save() / Game.loadGame()
 *      Game.startScene(id) / Game.__step(dt) / Game.debugJump()
 *      UI.Trial.state / UI.Trial.key(act) / UI.Trial.click(x,y) / UI.Trial.autoStep()
 * ========================================================================= */
var Game = (function () {
  'use strict';
  var C = Art.C, W = Art.W, H = Art.H, PF = Art.PixelFont;

  var canvas = null, ctx = null, scale = 3;
  var SAVE_PREFIX = 'solitary_lantern_save_';
  var AUTO_KEY = SAVE_PREFIX + 'auto';
  /* 设置键也带版本：默认音量这种"手感"值改过之后，如果继续读同一个 key，
     老玩家 localStorage 里存的旧值会顶着新默认值 —— 改了等于没改（这是实测踩到的）。 */
  var SET_KEY = SAVE_PREFIX + 'settings_v2';
  var SAVE_V = 2;                    // 存档格式版本：读到比自己新的档必须拒绝，不能猜着读一半

  var G = {
    mode: 'title', sceneId: null, scene: null, labels: {}, pc: 0,
    dlg: null, choice: null, pending: [],
    bg: 'void', bgm: null, amb: null,
    flags: {}, insight: 0, sigils: [], codexSeen: {}, trialResults: {},
    chapterDone: {}, achv: {}, choiceLog: [],
    rel: {},                  // 与四个人的关系值：chen / he / bai / keeper
    journals: {},             // 看过的日记页 id
    explore: null,            // 当前探索状态
    page: null,               // 导读卡 / 日记页
    callStack: [],            // 探索点子剧本的返回栈
    toasts: [], fx: null, transition: 0, time: 0,
    menuIndex: 0, menuStack: [], chapter: -1, chapterCard: null,
    scroll: 0, tab: 0, sel: 0, endingReady: false
  };

  var DLG = UI.DLG;

  var settings = {
    textSpeed: 34,       // 字/秒
    /* 音乐默认 5%：玩家的反馈是"音乐盖过打字机和其他音效"。
       这里 bgmVol 就是"音乐占总音量的比例"，直接线性用，不再乘系数。 */
    bgmVol: 0.05, sfxVol: 0.90, muted: false,
    /* 整数缩放默认开：非整数倍（1280 宽下是 2.25）时，pixelated 渲染虽然不模糊，
       但每列像素占 2 或 3 个屏幕像素不等 —— 笔画粗细不匀，正是像素画最忌讳的那种"毛"。
       默认像素完美，愿意用边缘黑边换满屏的人再自己去设置里关掉。 */
    integerScale: true, scanlines: true, crt: false, auto: false,
    /* 震动与坐标读数是给手机/排障用的开关，默认关掉震动也无妨：
       部分人对画面抖动敏感，且手机上晃动更容易让人不适。 */
    shake: true, coords: false
  };

  function sfx(n) { try { Sound.sfx(n); } catch (e) {} }
  /* ---------------------------- 配乐：文件优先 ----------------------------
     如果 music/ 里有同名文件（music.js 探测到的 title.mp3 等），就播真实音乐；
     没有就走内置合成曲。所以"把歌丢进 music/ 就能响"，不丢也照样双击可玩。 */
  /* 音乐音量比例：settings.bgmVol 直接就是 0~1 的比例（默认 0.05 = 5%）。
     不再乘 0.9/0.34 那种系数 —— 否则设置里写 5%，实际出来的是 13%，还是盖住音效。 */
  /* 把设置里会影响其它模块的开关同步出去（现在只有试炼的震动） */
  function applyShakeSetting() {
    try { if (typeof UI !== 'undefined' && UI.setShake) UI.setShake(!!settings.shake); } catch (e) {}
  }

  function bgmVolNow() { return settings.muted ? 0 : settings.bgmVol; }
  function fileBgm() {
    try { return typeof Music !== 'undefined' && Music.available && Object.keys(Music.available()).length > 0; }
    catch (e) { return false; }
  }
  /* 合成曲的音量统一走这里：外部配乐正在播时，合成曲必须闭嘴 ——
     否则两套同时响，玩家听到的仍然是合成曲，会以为"我放的 MP3 没生效"。 */
  function applySynthBgmVol() {
    try {
      if (settings.muted) { Sound.setBgmVolume(0); return; }
      if (fileBgm() && Music.current()) { Sound.setBgmVolume(0); Sound.stopBgm(); return; }
      Sound.setBgmVolume(settings.bgmVol);
    } catch (e) {}
  }
  function playBgm(name) {
    try {
      if (fileBgm() && Music.has(name)) {
        Music.setVolume(bgmVolNow());
        Music.play(name);
        applySynthBgmVol();          // 若文件还没播起来，先把合成曲压掉
        return;
      }
    } catch (e) {}
    try { Sound.playBgm(name); } catch (e) {}
  }
  function stopBgmAll() {
    try { if (typeof Music !== 'undefined') Music.stop(); } catch (e) {}
    try { Sound.stopBgm(); } catch (e) {}
  }
  function bgmPlaying() {
    try { if (fileBgm() && Music.current()) return true; } catch (e) {}
    try { return !!Sound.currentBgm(); } catch (e) { return false; }
  }
  function unlockAudio() {
    try { Sound.init(); } catch (e) {}
    try {
      if (typeof Music !== 'undefined') {
        Music.unlock();
        Music.setVolume(bgmVolNow());
        applySynthBgmVol();          // MP3 起来了就把合成曲压住
      }
    } catch (e) {}
  }
  function save0() { save(); }
  void save0;

  /* ============================ 画布与缩放 ============================ */
  function setupCanvas() {
    canvas = document.getElementById('screen');
    canvas.width = W; canvas.height = H;
    ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    resize();
    window.addEventListener('resize', resize);
  }
  /* 缩放要扣掉"画面之外"占掉的宽度：外围的 #wrap（含刘海安全区内边距，
   * 横屏 iPhone 左右各约 44px）加上 #bezel 的内边距与 1px 描边。
   * 之前只算了 #bezel，而且直接拿 window.innerWidth 算 —— 480*2.66=1277px
   * 再加 12px 内边距就比 1280 的视口还宽，四边各被裁掉 4~5px，
   * 顶部 HUD 的两字按钮只剩最后一个字。手机上安全区一进来这个问题会更严重。 */
  function frameInserts() {
    var pad = 0;
    ['wrap', 'bezel'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el || !window.getComputedStyle) return;
      var cs = window.getComputedStyle(el);
      pad += (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
      if (id === 'bezel') pad += (parseFloat(cs.borderLeftWidth) || 0) + (parseFloat(cs.borderRightWidth) || 0);
    });
    return pad + 2;    // +2 给画框那圈 1px 阴影留缝
  }
  /* 纵向同理：安全区上下 + 画框内边距都要扣掉，否则横屏时画面会被状态栏/手势条压住 */
  function frameInsertsY() {
    var pad = 0;
    ['wrap', 'bezel'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el || !window.getComputedStyle) return;
      var cs = window.getComputedStyle(el);
      pad += (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);
      if (id === 'bezel') pad += (parseFloat(cs.borderTopWidth) || 0) + (parseFloat(cs.borderBottomWidth) || 0);
    });
    return pad + 2;
  }
  function resize() {
    var vw = Math.max(1, (window.innerWidth || W) - frameInserts());
    var vh = Math.max(1, (window.innerHeight || H) - frameInsertsY());
    var s = Math.min(vw / W, vh / H);
    // 直接读 settings，不维护副本 —— 副本曾经在"首次运行没有存档"时被漏掉同步
    var intScale = Math.max(1, Math.floor(s));
    /* 小屏上"整数缩放"会只剩 1 倍：手机横屏 844×390 时 floor(1.44)=1，
       画布只有 480×270，四周一大片黑边，字小到没法看。
       这种情况下整数缩放反而毁体验，自动改用小数缩放填满。
       桌面 1280 宽 floor=2、1920 宽 floor=4，不受影响。 */
    var useInteger = settings.integerScale && intScale >= 2;
    scale = useInteger ? intScale : Math.max(1, Math.floor(s * 100) / 100);
    canvas.style.width = Math.round(W * scale) + 'px';
    canvas.style.height = Math.round(H * scale) + 'px';
  }
  /* 屏幕坐标 → 虚拟像素坐标。
     这里必须**取最近的整数**，不能向下取整：
     画面是按虚拟像素网格画的（一个虚拟像素 = 缩放倍率个屏幕像素），
     而鼠标落在那个网格里的位置是连续的。向下取整会把"该像素的右半边"算成**下一个**像素，
     于是点击的虚拟坐标整体偏移最多 1 像素 —— 整数缩放（2.00）时误差只有 0.x 像素看不出来，
     非整数缩放（2.26、2.47…）时误差被放大，正好把点击从按钮/点位的边缘挤出去。
     这就是"开了整体缩放能点、不开就点不了"的原因。 */
  function toVirtual(cx, cy) {
    var r = canvas.getBoundingClientRect();
    var v = {
      x: Math.round((cx - r.left) / (r.width / W)),
      y: Math.round((cy - r.top) / (r.height / H))
    };
    /* 诊断用：把"引擎从这次点击算出了什么"留一份。开着 ?coords=1 时还会画在屏幕上。
       —— 远程定位"某些显示缩放下点不中"只能靠这个：让用户点一下把数字念回来。 */
    try {
      window.__lastClick = {
        client: [Math.round(cx * 100) / 100, Math.round(cy * 100) / 100],
        virtual: [v.x, v.y],
        rect: [Math.round(r.left * 100) / 100, Math.round(r.top * 100) / 100, Math.round(r.width * 100) / 100, Math.round(r.height * 100) / 100],
        scale: [Math.round(r.width / W * 10000) / 10000, Math.round(r.height / H * 10000) / 10000],
        dpr: window.devicePixelRatio,
        integerScale: !!settings.integerScale,
        mode: G.mode
      };
    } catch (e) {}
    return v;
  }

  /* ============================ 设置持久化 ============================ */
  function loadSettings() {
    try {
      var raw = localStorage.getItem(SET_KEY);
      if (raw) {
        var d = JSON.parse(raw);
        for (var k in d) if (settings.hasOwnProperty(k)) settings[k] = d[k];
      }
    } catch (e) {}
    /* 把设置应用到运行时这一段落必须写在 try 之外、且不能被"没有存档"提前 return 掉。
       原来那句 `if (!raw) return;` 会在首次运行（localStorage 为空）时跳过全部同步，
       于是 integerScale 一直停在变量声明处的旧值 —— 表现就是"整数缩放明明开着，画面却是非整数倍"。 */
    Sound.setBgmVolume(settings.bgmVol);
    Sound.setSfxVolume(settings.sfxVol);
    if (settings.muted) Sound.setMuted(true);
    try { if (typeof Music !== 'undefined') Music.setVolume(bgmVolNow()); } catch (e) {}
  }
  function persistSettings() {
    try { localStorage.setItem(SET_KEY, JSON.stringify(settings)); } catch (e) {}
  }

  /* ============================ 存档 ============================ */
  function snapshot() {
    // pc 在"正在展示某条指令"时已经越过它；存 pc-1，读档时重新执行那一条
    var resumePc = G.pc;
    if ((G.mode === 'scene' && G.dlg && G.dlg.kind !== 'chapter') ||
        (G.mode === 'choice' && G.choice) ||
        (G.mode === 'quote' && G.dlg)) resumePc = Math.max(0, G.pc - 1);
    return {
      v: SAVE_V, storyVersion: STORY.meta.contentVersion, t: Date.now(),
      sceneId: G.sceneId, pc: resumePc,
      flags: G.flags, insight: G.insight, sigils: G.sigils,
      codexSeen: G.codexSeen, trialResults: G.trialResults,
      chapterDone: G.chapterDone, achv: G.achv, choiceLog: G.choiceLog,
      rel: G.rel, journals: G.journals,
      bg: G.bg, bgm: G.bgm, amb: G.amb, chapter: G.chapter,
      pending: G.pending
    };
  }
  function save(slot) {
    slot = slot === undefined ? 'auto' : slot;
    try {
      var d = snapshot();
      /* 不写"自己都读不回来"的档。标题页 / 尚未进入任何场景时 G.sceneId 还是 null，
         这种档一旦落盘：标题页会显示"存档 · null"，而"继续"点进去必然读取失败
         （applySave 会以"没有场景 id"为由拒绝）—— 按钮亮着却读不进去，比没有档更糟。 */
      if (saveRejectReason(d)) return false;
      localStorage.setItem(SAVE_PREFIX + slot, JSON.stringify(d));
      return true;
    } catch (e) { return false; }
  }
  function readSlot(slot) {
    try {
      var raw = localStorage.getItem(SAVE_PREFIX + slot);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  /* 读档前先校验，一个字都不要先写。
   * 原来的写法是"先把 G 无条件覆盖一遍，最后才发现场景不存在、返回 false"，
   * 于是玩家读一个坏档会看到"读取失败"，但当前这一局的符印/图鉴/成就已经被清空了
   * —— 表面失败、实际毁档，比直接崩掉还难查。 */
  function saveRejectReason(d) {
    if (!d || typeof d !== 'object' || Array.isArray(d)) return '存档内容不是对象';
    if (typeof d.v === 'number' && d.v > SAVE_V) return '存档版本 ' + d.v + ' 比本版本(' + SAVE_V + ')更新';
    if (!d.sceneId) return '没有场景 id';
    if (!STORY.scenes[d.sceneId]) return '场景不存在: ' + d.sceneId;
    return null;
  }

  function applySave(d) {
    var why = saveRejectReason(d);
    if (why) { console.warn('读档被拒绝: ' + why); return false; }

    // 校验过了，现在才动 G
    G.flags = (d.flags && typeof d.flags === 'object') ? d.flags : {};
    G.insight = (typeof d.insight === 'number' && isFinite(d.insight)) ? d.insight : 0;
    // 符印/图鉴/成就都按当前版本的字典过滤一遍：旧档里可能有已经被删掉的条目，
    // 直接塞回去会让图鉴出现空白项、"集齐"判定也不准
    G.sigils = (Array.isArray(d.sigils) ? d.sigils : []).filter(function (s) {
      return Object.prototype.hasOwnProperty.call(STORY.sigils, s);
    });
    var seen = {};
    if (d.codexSeen && typeof d.codexSeen === 'object')
      Object.keys(d.codexSeen).forEach(function (k) { if (STORY.codex[k]) seen[k] = 1; });
    G.codexSeen = seen;
    G.trialResults = (d.trialResults && typeof d.trialResults === 'object') ? d.trialResults : {};
    G.chapterDone = (d.chapterDone && typeof d.chapterDone === 'object') ? d.chapterDone : {};
    G.achv = (d.achv && typeof d.achv === 'object') ? d.achv : {};
    G.choiceLog = Array.isArray(d.choiceLog) ? d.choiceLog : [];
    G.rel = (d.rel && typeof d.rel === 'object') ? d.rel : {};
    G.journals = (d.journals && typeof d.journals === 'object') ? d.journals : {};
    G.bg = d.bg || 'void'; G.bgm = d.bgm || null; G.amb = d.amb || null;
    G.chapter = (typeof d.chapter === 'number' && isFinite(d.chapter)) ? d.chapter : -1;
    G.pending = Array.isArray(d.pending) ? d.pending : [];

    var sc = STORY.scenes[d.sceneId];
    var pc = (typeof d.pc === 'number' && isFinite(d.pc)) ? Math.floor(d.pc) : 0;
    pc = Math.max(0, Math.min(pc, sc.script.length));
    var migrated = d.storyVersion !== STORY.meta.contentVersion;
    if (migrated) { pc = 0; G.pending = []; }

    /* 不要先 startScene 跑一遍再回填 pc —— 那会多走一条指令。
       但 startScene 之前必须把 mode 清干净：存档可能存于 quote / choice / trial
       这些"瞬时"模式（它们没被存下来），而 runScript 第一句就是
       if (G.mode !== 'scene') return; —— 带着旧 mode 进去会一句都不执行，
       界面停在"有个引文卡"的状态，实际 dlg 是 null，整局卡死。
       读档本来就是"从这一条指令重新演一遍"，所以统一从 scene 起步。 */
    G.mode = 'scene';
    G.dlg = null; G.choice = null; G.page = null; G.fx = null; G.chapterCard = null;
    G.explore = null; G.callStack = []; G.trial = null;
    startScene(d.sceneId, { pc: pc, keepBg: true, keepBgm: true, noSave: true, keepActors: true });
    if (migrated) toast('剧情已更新，已从本场景开头继续', 'gold');

    // startScene 带了 keepBg / keepBgm = "别动我刚从存档里恢复的状态"，
    // 所以背景、音乐、环境音都得在这里自己重新点起来 ——
    // 否则 G.bgm 写着 'forest'、实际一片寂静，要等到剧本里下一条 bgm 指令才出声。
    if (G.bgm) { playBgm(G.bgm); }
    if (G.amb) { try { Sound.amb(G.amb, 1); } catch (e) {} }
    return true;
  }
  function loadGame(slot) {
    slot = slot === undefined ? 'auto' : slot;
    return applySave(readSlot(slot));
  }
  function slotInfo(slot) {
    var d = readSlot(slot);
    // 读不回来的档（旧版本残留 / 手改 / 越版本）当作空档：展示"还没有存档"、按钮置灰，
    // 好过展示"存档 · null"却点不进去。也让已存在的坏档自愈。
    if (!d || saveRejectReason(d)) return null;
    var sc = STORY.scenes[d.sceneId];
    return { t: d.t, name: (sc && sc.title) || d.sceneId, insight: d.insight || 0, sigils: (d.sigils || []).length };
  }
  function clearSave(slot) {
    try { localStorage.removeItem(SAVE_PREFIX + slot); } catch (e) {}
  }

  function newGame() {
    G.flags = {}; G.insight = 0; G.sigils = []; G.codexSeen = {};
    G.trialResults = {}; G.chapterDone = {}; G.achv = {}; G.choiceLog = [];
    G.rel = {}; G.journals = {}; G.explore = null; G.page = null; G.callStack = [];
    G.pending = []; G.chapter = 0; G.toasts = [];
    G.mode = 'scene';
    startScene(STORY.startScene, { noSave: true });
  }

  /* ============================ 剧本执行 ============================ */
  function startScene(id, opts) {
    opts = opts || {};
    var sc = STORY.scenes[id];
    if (!sc) { console.warn('未知场景: ' + id); return; }
    G.sceneId = id; G.scene = sc;
    G.dlg = null; G.choice = null; G.chapterCard = null;
    if (!opts.keepActors) G.pending = opts.keepPending ? G.pending : [];
    if (sc.bg && !opts.keepBg) G.bg = sc.bg;
    if (!opts.keepBgm) {
      if (sc.music) { G.bgm = sc.music; playBgm(sc.music); }
    }
    if (!opts.keepBg) {
      if (sc.amb) { G.amb = sc.amb; try { Sound.amb(sc.amb, 1); } catch (e) {} }
      else { try { Sound.stopAllAmb(); } catch (e) {} G.amb = null; }
    }
    G.labels = {};
    for (var k = 0; k < sc.script.length; k++)
      if (sc.script[k].t === 'label') G.labels[sc.script[k].name] = k;
    G.pc = opts.pc || 0;
    G.mode = 'scene';
    if (!opts.noSave) save('auto');
    runScript();
  }

  function exec(it) {
    switch (it.t) {
      case 'bg': G.bg = it.name; return true;
      case 'bgm':
        if (it.name !== G.bgm || !bgmPlaying()) {
          G.bgm = it.name; playBgm(it.name);
        }
        return true;
      case 'amb':
        G.amb = it.name; try { Sound.amb(it.name, 1); } catch (e) {} return true;
      case 'sfx': sfx(it.name); return true;
      case 'label': return true;
      case 'goto':
        applyGoto(it.to);   // 失败时 applyGoto 自己会 console.warn
        return true;
      case 'jump':
        // 条件已在 passCond 里判过（when / relMin / relMax）；走到这里就跳
        applyGoto(it.to);
        return true;
      case 'set':
        if (it.flags) it.flags.forEach(function (f) { G.flags[f] = true; });
        return true;
      case 'rel':
        G.rel[it.who] = (G.rel[it.who] || 0) + (it.n || 0);
        if (it.n > 0) sfx('chime');
        return true;
      case 'insight': G.insight += (it.n || 1); return true;
      case 'shard':
        if (G.sigils.indexOf(it.id) < 0) {
          G.sigils.push(it.id);
          var sd = STORY.sigils[it.id];
          toast('符印 + ' + ((sd && sd.name) || it.id), 'gold');
          sfx('shard');
          if (G.sigils.length >= Object.keys(STORY.sigils).length) grant('allsigil');
        }
        return true;
      case 'codex':
        var added = 0;
        (it.ids || []).forEach(function (i) { if (!G.codexSeen[i]) { G.codexSeen[i] = 1; added++; } });
        if (added) {
          toast('图鉴 + ' + added, 'teal');
          sfx('codex');
          if (Object.keys(G.codexSeen).length >= 60) grant('scholar');
        }
        return true;
      case 'achv': grant(it.id); return true;
      case 'intro': case 'journal': return openPage(it);
      case 'explore': return openExplore(it);
      case 'finishChapter':
        if (it.id) G.chapterDone[it.id] = true;
        if (it.id === G.chapter + 1 || G.chapter < 0) G.chapter = chapterIndexFromId(it.id);
        else G.chapter = Math.max(G.chapter, chapterIndexFromId(it.id));
        save('auto');
        return true;
      case 'wait': G.fx = { kind: 'wait', t: 0, dur: (it.ms || 500) / 1000 }; return false;
      case 'fx':
        if (it.kind === 'flash') { G.fx = { kind: 'flash', t: 0, dur: 0.45 }; sfx('whoosh'); return false; }
        if (it.kind === 'visionOn') { G.flags.__vision = true; sfx('magic'); return true; }
        if (it.kind === 'visionOff') { G.flags.__vision = false; return true; }
        return true;
      case 'scene': G.transition = 0.45; startScene(it.id, { keepPending: true }); return false;
      case 'chapter': G.chapterCard = { title: it.title, sub: it.sub, en: it.en || '', t: 0, dur: 3.2 }; return false;
      case 'multiline':
        (it.lines || []).forEach(function (ln) { G.pending.push({ t: 'narr', text: ln }); });
        return true;
      case 'vision': openDialogue(it, { vision: true }); return false;
      case 'quote': openQuote(it); return false;
      case 'narr': case 'say': case 'think':
        openDialogue(it); return false;
      case 'choice':
        var available = it.options.filter(function(o) { return (!o.hideWhen || !G.flags[o.hideWhen]) && passCond(o); });
        if (!available.length) return true;
        G.choice = { prompt: it.prompt, options: available, index: 0 };
        G.mode = 'choice'; return false;
      case 'trial': openTrial(it.id); return false;
      case 'ending': G.mode = 'ending'; prepareEnding(); return false;
      default:
        console.warn('未知 opcode: ' + it.t);   // ★ 不要静默跳过
        return true;
    }
  }

  function chapterIndexFromId(id) {
    for (var i = 0; i < STORY.chapters.length; i++) if (STORY.chapters[i].id === id) return i;
    return G.chapter;
  }

  function runScript() {
    var guard = 0;
    while (guard++ < 4000) {
      if (G.mode !== 'scene') return;
      if (!G.scene || G.pc >= G.scene.script.length) {
        // 子剧本（探索点）跑完 → 回到探索界面，而不是掉进结局
        if (G.callStack.length) { popSub(); return; }
        G.mode = 'ending'; prepareEnding(); return;
      }
      var it = G.scene.script[G.pc++];
      if (!passCond(it)) continue;
      if (!exec(it)) return;
    }
  }

  /* 条件：when（旗标，支持 "!x" 与数组）、relMin / relMax（关系值门槛） */
  function passCond(it) {
    if (it.when) {
      var ws = Array.isArray(it.when) ? it.when : [it.when];
      for (var i = 0; i < ws.length; i++) {
        var w = ws[i], neg = false;
        if (typeof w !== 'string') continue;
        if (w.charAt(0) === '!') { neg = true; w = w.slice(1); }
        var v = !!G.flags[w];
        if (neg ? v : !v) return false;
      }
    }
    var k;
    if (it.relMin) for (k in it.relMin) if (it.relMin.hasOwnProperty(k) && (G.rel[k] || 0) < it.relMin[k]) return false;
    if (it.relMax) for (k in it.relMax) if (it.relMax.hasOwnProperty(k) && (G.rel[k] || 0) > it.relMax[k]) return false;
    if (it.seen) for (k = 0; k < it.seen.length; k++) if (!G.codexSeen[it.seen[k]]) return false;
    return true;
  }

  /* ---------------------------- 场景探索 ---------------------------- */
  function openExplore(it) {
    var spots = (it.spots || []).filter(passCond);
    if (!spots.length) return true;
    G.explore = { def: it, spots: spots, seen: {}, hover: -1, sel: 0 };
    for (var i = 0; i < spots.length; i++) if (G.flags['__seen_' + it.id + '_' + spots[i].id]) G.explore.seen[spots[i].id] = 1;
    G.mode = 'explore';
    focusUnseenSpot();
    return false;
  }
  function exploreLeft() {
    var e = G.explore;
    return e.spots.filter(function (s) { return e.seen[s.id]; }).length;
  }
  function canExitExplore() {
    var e = G.explore;
    return !e || e.spots.length === 0 || exploreLeft() >= (e.def.need || e.spots.length);
  }
  function openSpot(idx) {
    var e = G.explore;
    var sp = e && e.spots[idx];
    if (!sp) return;
    e.seen[sp.id] = 1;
    G.flags['__seen_' + e.def.id + '_' + sp.id] = true;
    sfx('tick');
    /* 探索点的子脚本要独占台词队列：父场景靠 multiline 之类的指令排下的
       残留 pending 会被 runScript 先播出来 —— 先搬进调用栈，回到探索界面再还回去。 */
    G.callStack.push({
      scene: G.scene, sceneId: G.sceneId,
      /* 回到父剧本时要从 explore 那一步的**后面**继续：G.pc 在取到 explore
         时已经 +1 了。原来存的是 max(0, pc-1)（为了读档时重放那一条），
         于是 popSub 之后又执行同一个 explore —— 探索点一读完就再进探索，
         seen 涨满、无限循环，光标永远走不出第一个点。 */
      pc: G.pc, labels: G.labels,
      explore: e, pending: G.pending
    });
    G.pending = [];
    G.scene = { script: sp.script, title: G.scene.title };
    G.labels = {};
    for (var i = 0; i < sp.script.length; i++)
      if (sp.script[i].t === 'label') G.labels[sp.script[i].name] = i;
    G.pc = 0;
    G.mode = 'scene';
    runScript();
  }
  function popSub() {
    var fr = G.callStack.pop();
    G.scene = fr.scene; G.sceneId = fr.sceneId; G.pc = fr.pc; G.labels = fr.labels;
    G.dlg = null; G.choice = null; G.page = null;
    G.pending = fr.pending || [];
    G.mode = 'explore';
    G.explore = fr.explore;
    focusUnseenSpot();
  }
  function exitExplore() {
    if (!canExitExplore()) { sfx('cancel'); return; }
    if (exploreLeft() >= G.explore.spots.length) grantExplorer();
    G.explore = null; G.mode = 'scene'; sfx('page');
    if (G.pending.length) nextOrRun(); else runScript();
  }
  /* 看过的点不再占着光标：如果还有没看的，把选择挪到第一个没看的。
     否则"读完一个点回到探索界面，光标还停在刚读过的那个"——
     再按一次回车又是它，玩家要手动按方向键才走得动。 */
  function focusUnseenSpot() {
    var e = G.explore;
    if (!e) return;
    if (!e.seen[e.spots[e.sel] && e.spots[e.sel].id]) return;
    for (var i = 0; i < e.spots.length; i++) {
      if (!e.seen[e.spots[i].id]) { e.sel = i; return; }
    }
  }
  /* ---------------------------- 探索界面 ----------------------------
   * 探索点画在背景上的真实位置：看过的用实线勾，选中的用金色描边 + 浮动名牌，
   * 底栏给进度与操作提示；看够 need 个才亮出「继续」。
   * 之前这里只有 openSpot / exitExplore，没有渲染函数也没有输入接线，
   * 走到任何 explore 就会 ReferenceError 卡死 —— 是 autoplay 台架逮出来的。 */
  function drawSpotBox(r, seen, sel, t, i) {
    var col = seen ? C.green4 : (sel ? C.gold3 : C.silver2);
    var dash = Math.floor(t * 6 + i) % 2 === 0;
    var seg = 4;
    for (var x = r.x; x < r.x + r.w; x += seg * 2) {
      var w = Math.min(seg, r.x + r.w - x);
      Art.px(ctx, x, r.y, w, 1, col); Art.px(ctx, x, r.y + r.h - 1, w, 1, col);
    }
    for (var y = r.y; y < r.y + r.h; y += seg * 2) {
      var h = Math.min(seg, r.y + r.h - y);
      Art.px(ctx, r.x, y, 1, h, col); Art.px(ctx, r.x + r.w - 1, y, 1, h, col);
    }
    if (!dash) return;
    if (seen) {
      Art.px(ctx, r.x + 2, r.y + 2, 5, 1, C.green4);
      Art.px(ctx, r.x + 2, r.y + 3, 1, 4, C.green4);
    } else if (sel) {
      Art.px(ctx, r.x + 2, r.y + 2, 1, 5, C.gold3); Art.px(ctx, r.x + 3, r.y + 6, 1, 1, C.gold3);
    }
  }
  function drawExplore(t) {
    var e = G.explore;
    if (!e) return;
    var got = exploreLeft(), need = e.def.need || e.spots.length;
    /* 第一遍先画框，第二遍再画名牌 —— 免得后画的框切掉先画的名牌 */
    for (var i = 0; i < e.spots.length; i++) {
      var sp = e.spots[i];
      if (sp.when !== undefined && !passCond(sp)) continue;
      drawSpotBox({ x: sp.x, y: sp.y, w: sp.w, h: sp.h }, !!e.seen[sp.id], i === e.sel, t, i);
    }
    var sel = e.spots[e.sel];
    if (sel) {
      var lw = PF.width(sel.label, 10);
      var lx = Math.max(2, Math.min(W - lw - 6, sel.x + sel.w / 2 - lw / 2));
      var ly = sel.y - 14 < 22 ? sel.y + sel.h + 3 : sel.y - 14;
      Art.panel(ctx, lx - 4, ly, lw + 8, 13, { fill: 'rgba(8,6,17,0.92)', edge: C.gold2, inner: C.gold0 });
      PF.draw(ctx, sel.label, lx, ly + 2, 10, C.gold4, {});
    }
    // 顶栏：提示 + 进度（不盖住背景上半部分的探索点，最多两行）
    var pw = W - 20;
    var plines = PF.wrap(e.def.prompt || '', 11, pw - 96);
    if (plines.length > 2) plines = plines.slice(0, 2);
    var ph = 8 + plines.length * 15;
    Art.panel(ctx, 8, 20, pw + 4, ph, { fill: 'rgba(8,6,17,0.90)', edge: C.brown1, inner: C.brown0 });
    for (var p = 0; p < plines.length; p++) PF.draw(ctx, plines[p], 16, 24 + p * 15, 11, C.cream, {});
    PF.draw(ctx, '看 过 ' + got + ' / ' + need, W - 18, 26, 10, got >= need ? C.green4 : C.lav1, { align: 'right' });
    /* 底部：选中的点 + 「继续」
       原来这个按钮挤在右下角、68×17 像素、文字还是"走到石头中间"这种剧情描述，
       看着完全不像能点的 —— 玩家的反馈就是"看完了三个点点它没反应"（其实没点中）。
       现在：不满足时是一条居中的细进度条（不可点），满足时换成**居中的大按钮**+闪动箭头。 */
    PF.draw(ctx, sel ? ('◀ ' + sel.label + ' ▶') : '', 12, H - 27, 10, C.lav1, {});
    var ready = got >= need;
    var er = exploreExitRect();
    if (!ready) {
      var by = H - 15;
      var bw = 200, bx = Math.round((W - bw) / 2);
      ctx.globalAlpha = 0.85;
      Art.panel(ctx, bx, by - 12, bw, 15, { fill: 'rgba(10,8,18,0.86)', edge: C.brown1, inner: C.brown0 });
      Art.bar(ctx, bx + 8, by - 8, bw - 76, 6, got / need, C.gold1, C.void1, { dark: C.red1 });
      PF.draw(ctx, got + ' / ' + need, bx + bw - 22, by - 10, 10, C.lav1, { align: 'center' });
      ctx.globalAlpha = 1;
    } else {
      var blink = Math.sin(t * 6) > 0;
      Art.panel(ctx, er.x, er.y, er.w, er.h, {
        fill: e.exitHot ? 'rgba(62,48,12,0.96)' : 'rgba(34,26,8,0.95)',
        edge: blink ? C.gold3 : C.gold1, inner: C.gold0, shadow: true
      });
      /* 文案可能比按钮长（"走到石头中间"有 6 个字）—— 用 clipLine 裁到放得下为止，
         不裁的话会直接从按钮边缘切掉半个字，看着像显示坏了。 */
      var label = e.def.exitLabel || '继续';
      PF.draw(ctx, UI.clipLine(label, 10, er.w - 26), er.x + 20, er.y + 6, 10, C.gold4, {});
      /* 左侧闪动的三角：提示"这里可以点" */
      if (blink) {
        Art.px(ctx, er.x + 8, er.y + 7, 1, 5, C.gold3);
        Art.px(ctx, er.x + 9, er.y + 8, 1, 3, C.gold3);
        Art.px(ctx, er.x + 10, er.y + 9, 1, 1, C.gold3);
      }
    }
    UI.footerHint(ctx, { x: 4, y: H - 13, w: W - 8, h: 13 }, ready ? '点这个按钮 或按回车 继续' : '方向键 选 · 回车 看（看过的可重看）', t);
  }
  /* 探索界面的命中判定：**就近取最近的一个**，而不是"必须落在矩形里"。
     为什么改成这样：这类小目标（点位框、底部按钮）在非整数缩放 + 高 DPI 下，
     "自算的客户端坐标"和"浏览器实际派发的坐标"之间可能有零点几像素的差，
     严格矩形判定会把边缘的点击丢掉，而玩家完全看不出为什么没反应。
     现在：点在框里 → 直接命中；点在框外但在 GRAB 像素内 → 归给最近的那个。
     多个点挨得近时，取距离最小的那个，不会点 A 出 B。 */
  var SPOT_GRAB = 8;
  function rectDist(x, y, r) {
    var dx = Math.max(r.x - x, 0, x - (r.x + r.w));
    var dy = Math.max(r.y - y, 0, y - (r.y + r.h));
    return Math.sqrt(dx * dx + dy * dy);
  }
  function exploreSpotAt(x, y) {
    var e = G.explore;
    if (!e) return -1;
    var best = -1, bestD = SPOT_GRAB + 1;
    for (var i = 0; i < e.spots.length; i++) {
      var sp = e.spots[i];
      if (sp.when !== undefined && !passCond(sp)) continue;
      var d = rectDist(x, y, { x: sp.x, y: sp.y, w: sp.w, h: sp.h });
      if (d < bestD) { bestD = d; best = i; }
    }
    return bestD <= SPOT_GRAB ? best : -1;
  }
  /* 「继续」按钮的命中矩形：和 drawExplore 画的是同一份坐标。
     宽 124 是量出来的：出口文案最长 6 个汉字（"走到石头中间"），
     12px 档下要 72px，减去左侧箭头与内边距后 100px 才放得下 —— 96px 会裁成省略号。
     底部这块没有别的东西，放宽只赚不亏。 */
  function exploreExitRect() { return { x: W - 132, y: H - 32, w: 124, h: 22 }; }
  function clickExplore(x, y) {
    var r = exploreExitRect();
    /* 按钮同样就近判定：框内 0 距离，框外 3 像素内也算（玩家瞄的其实很准，
       是像素换算差的零点几像素在捣乱） */
    if (rectDist(x, y, r) <= 3) {
      if (canExitExplore()) exitExplore(); else { sfx('cancel'); toast('还有没看过的地方', 'vio'); }
      return;
    }
    var i = exploreSpotAt(x, y);
    if (i < 0) return;
    if (G.explore.sel === i) openSpot(i);
    else { G.explore.sel = i; sfx('select'); }
  }
  function hoverExplore(x, y) {
    var e = G.explore;
    if (!e) return;
    var i = exploreSpotAt(x, y);
    if (i >= 0) { e.hover = i; e.sel = i; }
    var r = exploreExitRect();
    e.exitHot = rectDist(x, y, r) <= 3;
  }
  function keyExplore(k) {
    var e = G.explore;
    if (!e) return;
    var n = e.spots.length;
    if (!n) { exitExplore(); return; }
    if (k === 'ArrowUp' || k === 'w' || k === 'a' || k === 'ArrowLeft') { e.sel = (e.sel + n - 1) % n; sfx('select'); }
    else if (k === 'ArrowDown' || k === 's' || k === 'd' || k === 'ArrowRight' || k === 'Tab') { e.sel = (e.sel + 1) % n; sfx('select'); }
    else if (k === ' ' || k === 'Enter') {
      if (e.exitHot && canExitExplore()) { exitExplore(); return; }
      openSpot(e.sel);
    }
    /* ESC 不在这里处理：全局那一段会把它当「打开菜单」，符合直觉 */
  }
  function grantExplorer() {
    // 当次探索点全部看过 → 成就（这是"每个探索环节都翻遍"的直接口径）
    grant('explorer');
  }

  /* ---------------------------- 导读卡 / 日记页 ---------------------------- */
  function openPage(it) {
    var lines = [];
    if (it.t === 'intro') {
      lines = (it.points || []).map(function (p) { return { text: p, kind: 'li' }; });
      if (it.book) lines.unshift({ text: it.book, kind: 'src' });
    } else {
      (it.lines || []).forEach(function (l) {
        if (typeof l === 'string') lines.push({ text: l, kind: 'p' });
        else if (passCond(l)) lines.push({ text: l.text, kind: 'p' });
      });
      if (it.id) G.journals[it.id] = true;
    }
    G.page = { title: it.title || '', kind: it.t, lines: lines, shown: 0, reveal: 0, hold: 0 };
    G.mode = 'page';
    sfx(it.t === 'journal' ? 'page' : 'chime');
    return false;
  }
  function closePage() {
    G.page = null; G.mode = 'scene'; nextOrRun();
  }
  /* 导读卡 / 日记页：
   * 第一次回车/点击 → 把字一次显示完；再按一次 → 收起继续剧本。
   * 之前只有 openPage / closePage，没有绘制也没有输入接线，走到任何 intro 就
   * ReferenceError 卡死 —— 和 drawExplore 是同一轮的缺失，靠 autoplay 逮到。 */
  function pageTotal(p) {
    var t = 0;
    for (var i = 0; i < p.lines.length; i++) t += p.lines[i].text.length;
    return t;
  }
  function pageDone() {
    var p = G.page;
    return p && p.reveal >= 1 && p.shown >= pageTotal(p);
  }
  function pageAdvance() {
    if (!G.page) return;
    if (!pageDone()) { G.page.shown = pageTotal(G.page); G.page.reveal = 1; return; }
    sfx('page'); closePage();
  }
  function drawPage(t) {
    var p = G.page;
    if (!p) return;
    UI.dimBackdrop(ctx, 0.55);
    var w = 404, PADX = 18, LH = 17;
    var isIntro = p.kind === 'intro';
    var titleLines = PF.wrap(p.title, 14, w - PADX * 2 - 8);
    var body = [];
    for (var i = 0; i < p.lines.length; i++) {
      var ln = p.lines[i];
      var fs = ln.kind === 'src' ? 10 : 12;
      var wrapW = w - PADX * 2 - (ln.kind === 'li' ? 14 : 0);
      var ls = PF.wrap(ln.text, fs, wrapW);
      for (var j = 0; j < ls.length; j++) {
        body.push({ text: ls[j], fs: fs, kind: ln.kind, first: j === 0 });
      }
    }
    var HEAD = 30, FOOT = 20;
    var h = HEAD + titleLines.length * 18 + 8 + body.length * LH + FOOT;
    if (h % 2) h++;
    var x = Math.floor((W - w) / 2), y = Math.floor((H - h) / 2);
    var edge = isIntro ? C.teal3 : C.gold2;
    Art.panel(ctx, x, y, w, h, { fill: 'rgba(9,8,18,0.97)', edge: edge, inner: isIntro ? C.teal1 : C.gold0, shadow: true });
    // 顶部小标签
    Art.px(ctx, x + 2, y + 2, w - 4, 15, isIntro ? 'rgba(20,70,80,0.34)' : 'rgba(120,86,20,0.30)');
    Art.px(ctx, x + 2, y + 17, w - 4, 1, isIntro ? C.teal1 : C.gold0);
    PF.draw(ctx, isIntro ? '这 一 章' : '本 章 笔 记', x + PADX, y + 4, 9, isIntro ? C.teal4 : C.gold3, {});
    var yy = y + HEAD;
    var limit = Math.floor(p.shown);
    var used = 0;
    for (i = 0; i < titleLines.length; i++) {
      PF.draw(ctx, titleLines[i], x + PADX, yy, 14, C.gold4, { shadow: '#2a1400' });
      yy += 18;
    }
    yy += 6;
    Art.px(ctx, x + PADX, yy - 3, w - PADX * 2, 1, C.brown1);
    for (i = 0; i < body.length; i++) {
      var b = body[i], n = Math.max(0, Math.min(b.text.length, limit - used));
      if (b.kind === 'li' && b.first) {
        Art.px(ctx, x + PADX, yy + 5, 3, 3, C.gold2);
        // 小圆点占 8px，正文从 PADX+12 开始
      }
      var bx = x + PADX + (b.kind === 'li' ? 12 : 0);
      var col = b.kind === 'src' ? C.teal3 : (b.kind === 'li' ? C.cream : C.parch);
      if (n > 0) PF.draw(ctx, b.text, bx, yy, b.fs, col, { n: n });
      used += b.text.length;
      yy += LH;
    }
    if (pageDone() && Math.sin(t * 5) > 0) {
      PF.draw(ctx, '空格 / 回车 继续', x + w - PADX, y + h - 15, 9, C.gold3, { align: 'right' });
    } else if (!pageDone()) {
      PF.draw(ctx, '空格 跳过逐字', x + w - PADX, y + h - 15, 9, C.slate3, { align: 'right' });
    }
  }

  /* 全局标签索引：{ labelName: { scene: id, pc: n } }
   * 为什么需要它：第一章的分支设计是「c1_forest 里选一句 → 跳进 c1_r_sharp 这个小场景
   * → 那一段演完再 goto 回 c1_forest 的标签 c1_after_chen 继续」。可一旦真的
   * startScene('c1_r_sharp')，G.labels 就只剩这个新场景自己的标签了 ——
   * 于是 goto 找不到目标，剧本直接走出去、掉进结局。静态看数据看不出来，
   * 是 autoplay 把 console.warn 收集回来才暴露的。 */
  var _labelIndex = null;
  function labelIndex() {
    if (_labelIndex) return _labelIndex;
    _labelIndex = {};
    for (var sid in STORY.scenes) {
      if (!STORY.scenes.hasOwnProperty(sid)) continue;
      var script = STORY.scenes[sid].script || [];
      for (var i = 0; i < script.length; i++) {
        if (script[i].t === 'label' && _labelIndex[script[i].name] === undefined) {
          _labelIndex[script[i].name] = { scene: sid, pc: i };
        }
      }
    }
    return _labelIndex;
  }

  function applyGoto(target) {
    if (!target) return false;
    // 1) 当前场景内的标签
    if (G.labels && G.labels[target] !== undefined) { G.pc = G.labels[target]; return true; }
    // 2) 别的场景里的标签 → 切过去并从那一句继续（保留已排队的台词）
    var hit = labelIndex()[target];
    if (hit) { startScene(hit.scene, { keepPending: true, pc: hit.pc }); return true; }
    // 3) 直接是一个场景 id
    if (STORY.scenes[target]) { startScene(target, { keepPending: true }); return true; }
    console.warn('goto 目标不存在: ' + target);
    return false;
  }

  function openDialogue(it, opt) {
    opt = opt || {};
    var text = it.text || '';
    var maxW = DLG.w - (DLG.padX - DLG.x) - 16;
    G.dlg = {
      kind: it.t, name: it.name || null, por: it.por || null,
      text: text, lines: PF.wrap(text, DLG.size, maxW),
      shown: 0, cite: it.cite || null, vision: !!opt.vision
    };
    G.mode = 'scene';
  }

  function openQuote(it) {
    var hasEn = !!it.en;
    var w = 396;
    var enLines = hasEn ? PF.wrap(it.en, 10, w - 28) : [];
    var zhLines = PF.wrap(it.text || '', 11, w - 28);
    var h = 34 + enLines.length * 14 + (hasEn ? 10 : 0) + zhLines.length * 15 + 26;
    G.dlg = {
      kind: 'quote', text: it.text, en: it.en || '', cite: it.cite || '',
      zhLines: zhLines, enLines: enLines, box: { x: (W - w) / 2, y: Math.max(14, (H - h) / 2 - 10), w: w, h: h },
      shown: 0, lines: [], reveal: 0
    };
    G.mode = 'quote';
    sfx('page');
  }

  function advanceDialogue() {
    if (!G.dlg) return;
    if (G.dlg.kind === 'quote') {
      if (G.dlg.reveal < 1) { G.dlg.reveal = 1; return; }
      G.dlg = null;
      // ★ 必须还原成 'scene'：runScript 的第一句就是 `if (G.mode !== 'scene') return;`，
      //   否则 mode 停在 'quote' 而 dlg 已经没了 —— 既画不出东西，也推不动剧本，彻底死锁。
      G.mode = 'scene';
      nextOrRun();
      return;
    }
    if (G.dlg.shown < G.dlg.text.length) { G.dlg.shown = G.dlg.text.length; return; }
    var afterReply = G.dlg.thenGoto;
    G.dlg = null;
    G.mode = 'scene';
    if (afterReply) { followChoiceTarget(afterReply); return; }
    nextOrRun();
  }
  function nextOrRun() {
    if (G.pending.length) {
      var it = G.pending.shift();
      openDialogue(it);
      return;
    }
    runScript();
  }

  function pickChoice(i) {
    var o = G.choice.options[i];
    if (!o) return;
    if (o.insight) G.insight += o.insight;
    if (o.flags) o.flags.forEach(function (f) { G.flags[f] = true; });
    if (o.rel) for (var k in o.rel) if (o.rel.hasOwnProperty(k)) G.rel[k] = (G.rel[k] || 0) + o.rel[k];
    G.choiceLog.push({ p: G.choice.prompt, a: o.text });
    var reply = o.reply, target = o.goto || null;
    G.choice = null; G.mode = 'scene'; sfx('confirm');
    save('auto');
    if (reply) {
      G.dlg = {
        kind: 'narr', name: null, por: null, text: reply,
        lines: PF.wrap(reply, DLG.size, DLG.w - (DLG.padX - DLG.x) - 16),
        shown: 0, thenGoto: target, cite: null
      };
      return;
    }
    if (target) { followChoiceTarget(target); return; }
    runScript();
  }

  function followChoiceTarget(target) {
    if (G.labels && G.labels[target] !== undefined) { G.pc = G.labels[target]; runScript(); }
    else if (!applyGoto(target)) runScript();
  }

  function openTrial(id) {
    var def = STORY.trials[id];
    if (!def) { console.warn('未知试炼: ' + id); runScript(); return; }
    G.mode = 'trial';
    G.trial = { id: id };            // 测试面：UI.Trial.state 只有玩法状态，外部看不出在做哪个试炼
    UI.Trial.start(def, function (res) {
      G.trial = null;
      G.trialResults[id] = { score: res.score, rank: res.rank, accuracy: res.accuracy };
      if (res.rank === 'S' || res.accuracy >= 1) {
        G.insight += 3;
        grant('perfect');
        if (id === 't1_rhythm') grant('drummer');
      } else if (res.success) G.insight += 2;
      else G.insight += 1;
      G.mode = 'scene';
      save('auto');
      runScript();
    });
  }

  function grant(id) {
    if (!STORY.achv[id] || G.achv[id]) return;
    G.achv[id] = true;
    toast('成就 · ' + STORY.achv[id].name, 'vio');
    sfx('unlock');
  }

  function toast(msg, kind) {
    G.toasts.push({ msg: msg, t: 0, dur: 2.6, kind: kind || 'gold' });
  }

  /* ============================ 更新 ============================ */
  function update(dt) {
    G.time += dt;
    if (G.transition > 0) G.transition = Math.max(0, G.transition - dt);
    if (G.dlg && G.dlg.kind !== 'quote' && G.dlg.shown < G.dlg.text.length) {
      var before = Math.floor(G.dlg.shown);
      G.dlg.shown = Math.min(G.dlg.text.length, G.dlg.shown + settings.textSpeed * dt);
      /* 每 2 个字一下。原来写的是 %3，而三成以上的台词只有 2 个字（"……""走吧"），
         这些短句整句一声都不响 —— 体感就是"打字机音效没了"。 */
      if (Math.floor(G.dlg.shown) !== before && Math.floor(G.dlg.shown) % 2 === 0) sfx('blip');
    } else if (G.dlg && G.dlg.kind === 'quote') {
      if (G.dlg.reveal < 1) {
        var b2 = Math.floor(G.dlg.reveal * 60);
        G.dlg.reveal = Math.min(1, G.dlg.reveal + dt * 1.9);
        if (Math.floor(G.dlg.reveal * 60) !== b2) sfx('scribble');
      }
    }
    if (G.chapterCard) {
      G.chapterCard.t += dt;
      if (G.chapterCard.t >= G.chapterCard.dur) {
        G.chapterCard = null;
        G.fx = { kind: 'wait', t: 0, dur: 0.05 };
      }
    }
    if (G.fx) {
      G.fx.t += dt;
      if (G.fx.kind === 'flash' && G.fx.t > 0.28) { G.fx = null; runScript(); }
      else if (G.fx.kind === 'wait' && G.fx.t >= G.fx.dur) { G.fx = null; runScript(); }
    }
    if (G.mode === 'trial') UI.Trial.tick(dt);
    if (G.page) {
      G.page.reveal = Math.min(1, G.page.reveal + dt * 2.2);
      var total = 0;
      for (var p = 0; p < G.page.lines.length; p++) total += G.page.lines[p].text.length;
      G.page.shown = Math.min(total, G.page.shown + settings.textSpeed * 1.6 * dt);
    }
    // 兜底自愈：模式说"该画某个东西了"，但那个对象已经不存在 —— 不修就会静默死锁。
    // 这类死锁读代码基本看不出来，是靠 autoplay 台架连续 90 帧状态不变才逮到的。
    if ((G.mode === 'quote' && !G.dlg) || (G.mode === 'choice' && !G.choice) ||
        (G.mode === 'explore' && !G.explore) || (G.mode === 'page' && !G.page)) {
      if (typeof console !== 'undefined') console.warn('模式自愈: ' + G.mode + ' → scene');
      G.mode = 'scene'; runScript();
    }
    if (settings.auto && G.mode === 'scene' && G.dlg && G.dlg.kind !== 'quote' &&
        G.dlg.shown >= G.dlg.text.length) {
      G.autoT = (G.autoT || 0) + dt;
      if (G.autoT > 2.4) { G.autoT = 0; advanceDialogue(); }
    } else G.autoT = 0;
    /* 自动播放开着的时候右上角挂一个常驻小牌（每 1.6 秒闪一下，不刷屏）。
       它和"文字速度"在同一页设置里，很容易被碰开 —— 没有提示的话，
       玩家会以为"对话自己在跳"。 */
    if (settings.auto) {
      G.autoBadge = (G.autoBadge || 0) + dt;
      if (G.autoBadge > 1.6) G.autoBadge = 0;
    } else G.autoBadge = 0;
    for (var i = G.toasts.length - 1; i >= 0; i--) {
      G.toasts[i].t += dt;
      if (G.toasts[i].t > G.toasts[i].dur) G.toasts.splice(i, 1);
    }
  }

  /* ============================ 绘制 ============================ */
  function draw() {
    var t = G.time;
    ctx.clearRect(0, 0, W, H);

    if (G.mode === 'title') { drawTitle(t); post(t); return; }
    if (G.mode === 'map') { Art.paintBackground(ctx, 'wheel', t); drawMap(t); post(t); return; }
    if (G.mode === 'codex') { Art.paintBackground(ctx, 'study', t); drawCodex(t); post(t); return; }
    if (G.mode === 'settings') { Art.paintBackground(ctx, G.bg, t); drawSettings(t); post(t); return; }
    if (G.mode === 'sigils') { Art.paintBackground(ctx, 'cottage', t); drawSigils(t); post(t); return; }
    if (G.mode === 'menu') { Art.paintBackground(ctx, G.bg, t); drawPause(t); post(t); return; }
    if (G.mode === 'backlog') { Art.paintBackground(ctx, G.bg, t); drawBacklog(t); post(t); return; }

    Art.paintBackground(ctx, G.bg, t);
    // 幻视层
    if (G.flags.__vision) {
      ctx.globalAlpha = 0.22 + Math.sin(t * 0.9) * 0.05;
      Art.px(ctx, 0, 0, W, H, C.vio2);
      ctx.globalAlpha = 1;
      Art.ring(ctx, 240, 120, 110 + Math.sin(t * 0.6) * 6, C.lav1, 1);
      Art.ring(ctx, 240, 120, 84 + Math.cos(t * 0.5) * 5, C.teal3, 1);
    }

    drawHud(t);

    if (G.mode === 'trial') {
      UI.Trial.draw(ctx, t);
    } else if (G.mode === 'page' && G.page) {
      drawPage(t);
    } else if (G.mode === 'explore' && G.explore) {
      drawExplore(t);
    } else if (G.mode === 'choice' && G.choice) {
      drawChoice(t);
    } else if (G.mode === 'quote' && G.dlg) {
      drawQuote(t);
    } else if (G.dlg) {
      UI.Dialogue.draw(ctx, G.dlg, t, G);
    } else if (G.mode === 'ending') {
      drawEnding(t);
    }
    if (G.chapterCard) drawChapterCard(t);
    drawToasts(t);
    post(t);
  }

  function post(t) {
    // 暗角在 UI 之下，否则界面四角会被压黑
    Art.vignette(ctx, 1);
    if (settings.scanlines) Art.scanlines(ctx, 0.55);
    if (G.fx && G.fx.kind === 'flash') {
      Art.flash(ctx, C.white, Math.max(0, 0.85 * (1 - G.fx.t / 0.28)));
    }
    if (G.transition > 0) {
      Art.noiseMask(ctx, G.transition / 0.45, '#05040c');
    }
    void t;
  }

  /* ---------------------------- HUD ---------------------------- */
  var HUDBTNS = [
    { id: 'map', label: '路', key: 'm' },
    { id: 'codex', label: '书', key: 'b' },
    { id: 'sigils', label: '符', key: 'c' },
    { id: 'menu', label: '单', key: 'Escape' }
  ];
  /* 按钮跟着字号走：文字升到 12px 档之后，22px 宽的格子放不下一个汉字＋内边距，
     四个按钮会挤成一片。改成 26px 宽、间距 28。 */
  function hudBtnRect(i) { return { x: W - 30 - (3 - i) * 28, y: 6, w: 26, h: 18 }; }

  function drawHud(t) {
    // 左上：灯与悟性
    var ratio = Math.min(1, G.insight / 40);
    Art.panel(ctx, 6, 6, 132, 20, { fill: 'rgba(8,6,17,0.82)', edge: C.gold0, inner: C.brown1 });
    // 灯焰
    var fl = Math.sin(t * 7) * 0.5 + Math.sin(t * 3.1) * 0.5;
    Art.glowSoft(ctx, 18, 15, 12 + fl * 2, C.gold2, 0.5, 6);
    Art.px(ctx, 17, 12 + (fl > 0 ? 0 : 1), 3, 5, C.gold3);
    Art.px(ctx, 18, 10 + (fl > 0 ? 1 : 0), 1, 3, C.cream);
    Art.px(ctx, 15, 17, 7, 2, C.brown2);
    PF.draw(ctx, '灯', 26, 11, 10, C.gold3, {});
    Art.bar(ctx, 42, 12, 76, 8, ratio, C.gold2, C.void1, { dark: C.red1 });
    PF.draw(ctx, String(G.insight), 122, 11, 9, C.gold4, {});

    // 右上：导航按钮
    for (var i = 0; i < HUDBTNS.length; i++) {
      var r = hudBtnRect(i);
      Art.panel(ctx, r.x, r.y, r.w, r.h, { fill: 'rgba(8,6,17,0.82)', edge: C.gold0, inner: C.brown1 });
      PF.draw(ctx, HUDBTNS[i].label, r.x + r.w / 2, r.y + 3, 10, C.parch, { align: 'center' });
    }
    if (G.mode === 'scene' && G.dlg) {
      var sc = STORY.scenes[G.sceneId];
      if (sc) PF.draw(ctx, sc.title, W - 8, H - 14, 9, 'rgba(180,170,200,0.55)', { align: 'right' });
    }
    /* 自动播放开着时的常驻小牌：默认关，但它和"文字速度"在同一页，
       容易被碰开，没提示就会让人以为"对话自己在跳"。 */
    if (settings.auto && G.mode === 'scene') {
      var bp = G.autoBadge < 1.2 ? 1 : 0.55;      // 每 1.6 秒呼吸一次，不刺眼
      ctx.globalAlpha = bp;
      Art.panel(ctx, 144, 8, 60, 16, { fill: 'rgba(8,6,17,0.86)', edge: C.teal1, inner: C.void1 });
      PF.draw(ctx, '自动播放', 174, 11, 10, C.teal4, { align: 'center' });
      ctx.globalAlpha = 1;
    }
    /* 诊断：?coords=1 时贴出"上一次点击被换算成了什么"。
       远程排查"某些显示缩放下点不中"时，让用户点一下把这一行念回来即可。 */
    if (coordDebug && window.__lastClick) {
      var L = window.__lastClick;
      var txt = '点(' + L.client[0] + ',' + L.client[1] + ') → 虚拟(' + L.virtual[0] + ',' + L.virtual[1] + ') ' +
                '画布' + L.rect[2] + 'x' + L.rect[3] + ' @' + L.rect[0] + ',' + L.rect[1] +
                ' 缩放' + L.scale[0] + ' dpr' + L.dpr + ' 整数' + (L.integerScale ? 1 : 0);
      Art.px(ctx, 4, H - 60, W - 8, 12, 'rgba(0,0,0,0.78)');
      PF.draw(ctx, txt, 6, H - 58, 8, C.gold3, {});
    }
  }

  function drawChoice(t) {
    UI.Choice.draw(ctx, G.choice, t);
    if (G.choice && G.choice.options[G.choice.index] && G.choice.options[G.choice.index].insight) {
      PF.draw(ctx, '+悟性 ' + G.choice.options[G.choice.index].insight, W / 2, UI.Choice.layout(G.choice.options).y + UI.Choice.layout(G.choice.options).h + 4, 9, C.gold2, { align: 'center' });
    }
  }

  /* ---------------------------- 引文卡 ---------------------------- */
  function drawQuote(t) {
    var d = G.dlg, b = d.box;
    UI.dimBackdrop(ctx, 0.42);
    Art.panel(ctx, b.x, b.y, b.w, b.h, { fill: 'rgba(9,12,20,0.96)', edge: C.teal3, inner: C.teal1, shadow: true });
    // 左侧竖线
    Art.px(ctx, b.x + 8, b.y + 10, 2, b.h - 20, C.gold2);
    var n = Math.floor(d.reveal * 9999);
    var y = b.y + 10;
    PF.draw(ctx, '原 文', b.x + 16, y, 8, C.teal3, {});
    y += 13;
    PF.drawLines(ctx, d.enLines, b.x + 16, y, 10, C.silver2, n, 14, {});
    y += d.enLines.length * 14 + 8;
    if (d.enLines.length) Art.px(ctx, b.x + 16, y - 4, b.w - 32, 1, C.teal1);
    var showZh = Math.max(0, n - d.enLines.join('').length);
    PF.drawLines(ctx, d.zhLines, b.x + 16, y + 2, 11, C.cream, showZh, 15, {});
    var total = d.enLines.join('').length + d.zhLines.join('').length;
    if (d.reveal >= 1 || n >= total) {
      PF.draw(ctx, d.cite, b.x + b.w - 12, b.y + b.h - 15, 9, C.gold2, { align: 'right' });
      if (Math.sin(t * 5) > 0) PF.draw(ctx, '空格 / 点击', b.x + 16, b.y + b.h - 15, 9, C.gold3, {});
    }
  }

  /* ---------------------------- 章节标题卡 ---------------------------- */
  function drawChapterCard(t) {
    var cc = G.chapterCard;
    var p = cc.t / cc.dur;
    var inA = Math.min(1, cc.t / 0.5), outA = Math.min(1, (cc.dur - cc.t) / 0.5);
    var a = Math.min(inA, outA);
    Art.letterbox(ctx, 40 * a);
    ctx.globalAlpha = a;
    /* 三行文字垂直排布（旧版 title@124/18px 与 sub@126/12px 区间重叠，
       en@146 又压过 150 的底线，整章名糊成一团 —— 见截图"第一章"重合 bug）：
         顶线 104 → title(18px) 112..130 → sub(12px) 135..147 → en(8px) 151..159 → 底线 164 */
    Art.px(ctx, 0, 104, W, 1, C.gold0);
    Art.px(ctx, 0, 164, W, 1, C.gold0);
    PF.draw(ctx, cc.title, W / 2, 112, 18, C.gold4, { align: 'center', shadow: '#2a1400', shadowDX: 2, shadowDY: 2 });
    var sw = PF.width(cc.sub, 12);
    PF.draw(ctx, cc.sub, (W - sw) / 2, 135, 12, C.parch, { shadow: '#120b04' });
    // 英文副标题正好压在石阵上，不给阴影基本读不出来（和标题页副标题同一个毛病）
    PF.draw(ctx, cc.en, W / 2, 151, 8, C.lav1, { align: 'center', shadow: '#0b0716' });
    void p;
    ctx.globalAlpha = 1;
    void t;
  }

  /* ---------------------------- 提示条 ---------------------------- */
  var TOASTCOL = { gold: [C.gold3, C.gold1], teal: [C.teal3, C.teal1], vio: [C.lav2, C.vio2] };
  function drawToasts(t) {
    for (var i = 0; i < G.toasts.length; i++) {
      var o = G.toasts[i];
      var k = Math.min(1, o.t / 0.25) * Math.min(1, (o.dur - o.t) / 0.4);
      var col = TOASTCOL[o.kind] || TOASTCOL.gold;
      ctx.globalAlpha = k;
      var w = PF.width(o.msg, 10) + 26;
      var x = W - w - 8, y = 30 + i * 22 - (1 - k) * 6;
      Art.panel(ctx, x, y, w, 18, { fill: 'rgba(10,10,22,0.94)', edge: col[0], inner: col[1], shadow: true });
      PF.draw(ctx, o.msg, x + 8, y + 3, 10, col[0], {});
      ctx.globalAlpha = 1;
    }
    void t;
  }

  /* ---------------------------- 标题 ---------------------------- */
  var TITLE_ITEMS = [
    { id: 'new', label: '新的旅程' },
    { id: 'continue', label: '继续' },
    { id: 'map', label: '章节' },
    { id: 'codex', label: '图鉴' },
    { id: 'settings', label: '设置' }
  ];
  var TITLE_ITEM_H = 17, TITLE_ITEM_PITCH = 20, TITLE_MENU_Y = 126;
  var TITLE_ITEM_X = 40, TITLE_ITEM_W = 150;
  function titleItemRect(i) {
    return { x: TITLE_ITEM_X, y: TITLE_MENU_Y + 7 + i * TITLE_ITEM_PITCH, w: TITLE_ITEM_W, h: TITLE_ITEM_H };
  }

  /* 底栏：整条暗色带 + 左出处 / 右操作提示。
   * 两段文字都用 PixelFont.width 量过宽度后再定位；放不下就自动缩掉左段，
   * 避免出现"看起来没重叠、实际糊成一团"的情况。 */
  var BOTTOM_H = 18;
  var BOTTOM_Y = H - BOTTOM_H;
  function drawBottomBar(leftText, rightText) {
    Art.px(ctx, 0, BOTTOM_Y, W, BOTTOM_H, 'rgba(5,4,12,0.88)');
    Art.px(ctx, 0, BOTTOM_Y, W, 1, C.brown0);
    var RW = 8, ty = BOTTOM_Y + 4;
    var rw = rightText ? PF.width(rightText, RW) : 0;
    if (rightText) PF.draw(ctx, rightText, W - 7, ty, RW, 'rgba(160,155,185,0.72)', { align: 'right' });
    if (leftText) {
      var avail = W - 7 - rw - 10 - 7;          // 左侧可用宽度（含 10px 安全间距）
      var lw = PF.width(leftText, RW);
      if (lw <= avail) {
        PF.draw(ctx, leftText, 7, ty, RW, 'rgba(150,145,175,0.55)', {});
      } else {
        // 逐字裁剪到可用宽度，末尾补省略号
        var cut = '';
        for (var k = 0; k < leftText.length; k++) {
          if (PF.width(leftText.slice(0, k + 1) + '…', RW) > avail) break;
          cut = leftText.slice(0, k + 1);
        }
        if (cut) PF.draw(ctx, cut + '…', 7, ty, RW, 'rgba(150,145,175,0.55)', {});
      }
    }
  }

  function drawTitle(t) {
    Art.drawPlate(ctx, 'bg_stones', t, { zoom: 0.06, panX: 10, panY: 4, seed: 0 });
    Art.motes(ctx, t, 30, 91, 0, 90, W, 170, C.silver2, 0.3);
    // 标题区（纵向预算：22 → 120，之后留 6px 呼吸，菜单从 126 开始）
    var ty = 22 + Math.sin(t * 0.7) * 1;
    PF.draw(ctx, STORY.meta.title, W / 2, ty, 30, C.gold4, { align: 'center', shadow: '#3a1c00', shadowDX: 3, shadowDY: 3 });
    Art.px(ctx, W / 2 - 66, ty + 50, 132, 1, C.gold0);
    /* 副标题这几行正好压在月亮上，不给阴影的话淡色字基本读不出来。
       行距按实测字形高度排：30px 档字形高 32（ty..ty+33），8px 档高 9、9/10px 档高 11，
       再各留 2~4px 呼吸 —— 原来 +54/+68 只差 14px，两行连阴影贴在一起。
       注意 9 与 10 在同一渲染档（字形高都是 11），所以只能靠间距拉开，不能靠字号。 */
    PF.draw(ctx, STORY.meta.titleEn, W / 2, ty + 56, 9, C.lav1, { align: 'center', shadow: '#0b0716' });
    PF.draw(ctx, STORY.meta.sub, W / 2, ty + 72, 10, C.parch, { align: 'center', shadow: '#0b0716' });
    PF.draw(ctx, STORY.meta.src, W / 2, ty + 92, 8, 'rgba(208,202,226,0.92)', { align: 'center', shadow: '#0b0716' });

    // 菜单
    var mh = TITLE_ITEMS.length * TITLE_ITEM_PITCH - (TITLE_ITEM_PITCH - TITLE_ITEM_H) + 14;
    Art.panel(ctx, 30, TITLE_MENU_Y, 170, mh, { fill: 'rgba(6,5,14,0.88)', edge: C.gold0, inner: C.brown1 });
    for (var i = 0; i < TITLE_ITEMS.length; i++) {
      var r = titleItemRect(i);
      var has = TITLE_ITEMS[i].id !== 'continue' || !!slotInfo('auto');
      Art.button(ctx, r.x, r.y, r.w, r.h, TITLE_ITEMS[i].label,
                 (i === G.menuIndex && has) ? 'sel' : (has ? 'idle' : 'off'), t);
    }
    // 右侧统计。面板高度必须【跟着内容算】—— 之前写死 76 高，
    // 而"存档 · xxx"那行在 +71 处（9px 字，占 12px）直接被下边框切掉一半。
    // 必须用 slotInfo 而不是 readSlot：存档 JSON 里只有 sceneId，没有 name，
    // 直接读原始 JSON 会打印出"存档 · undefined"
    var si = slotInfo('auto');
    var gg = STORY.sigils, sigIds = Object.keys(gg), tot = sigIds.length;
    var PX0 = 298, PY0 = 138, COLW = 19, COLS = 8;
    var gridRows = Math.max(1, Math.ceil(tot / COLS));
    var gridY = PY0 + 20;
    var progY = gridY + gridRows * COLW + 2;
    var saveY = progY + 13;
    var PH = (saveY - PY0) + 12 + 5;                 // 最后一行字高 12 + 下边距 5
    Art.panel(ctx, PX0, PY0, 174, PH, { fill: 'rgba(6,5,14,0.9)', edge: C.gold0, inner: C.brown1 });
    PF.draw(ctx, '灯 火', PX0 + 10, PY0 + 5, 10, C.gold3, {});
    for (var s = 0; s < tot; s++) {
      var sid = sigIds[s];
      var got = G.sigils.indexOf(sid) >= 0;
      var sx = PX0 + 12 + (s % COLS) * COLW, sy = gridY + Math.floor(s / COLS) * COLW;
      Art.px(ctx, sx, sy, 14, 14, got ? C.gold1 : 'rgba(56,56,76,0.65)');
      if (got) Art.icon(ctx, gg[sid].icon, sx, sy, 0.875, C.brown0, C.gold3);
      else PF.draw(ctx, '?', sx + 7, sy + 1, 9, 'rgba(120,118,140,0.7)', { align: 'center' });
    }
    var cur = curChapterIndex();
    PF.draw(ctx, '进度 ' + Math.max(0, cur) + ' / ' + (STORY.chapters.length - 1), PX0 + 10, progY, 10, C.parch, {});
    if (si) {
      // 场景标题可能比面板宽，逐字裁到放得下为止
      var nm = '存档 · ' + si.name, nmMax = 174 - 20;
      if (PF.width(nm, 9) > nmMax) {
        var cut = '';
        for (var q2 = 0; q2 < nm.length; q2++) {
          if (PF.width(nm.slice(0, q2 + 1) + '…', 9) > nmMax) break;
          cut = nm.slice(0, q2 + 1);
        }
        nm = (cut || nm.slice(0, 4)) + '…';
      }
      PF.draw(ctx, nm, PX0 + 10, saveY, 9, C.lav1, {});
    } else PF.draw(ctx, '还没有存档', PX0 + 10, saveY, 9, C.gray0, {});

    /* 底部提示随输入方式变：触屏设备上写"点击/轻触"，桌面才写键盘快捷键。
       手机上原来那行"↑↓ 选择 · 回车确认"完全没法用，玩家不知道能点。 */
    var isTouch = touchMode || hasTouch();
    drawBottomBar(STORY.meta.version + (typeof __BUILD__ !== 'undefined' ? '　构建 ' + __BUILD__ : ''),
      isTouch ? '轻触菜单项开始 · 右上角可开图鉴/章节'
              : '↑↓ 选择 · 回车确认 · M 章节 · B 图鉴 · C 符印 · ESC 菜单');
    if (isTouch) {
      /* 触屏上额外给一句醒目的操作提示（键盘提示对手机玩家是无效信息） */
      if (Math.sin(t * 3) > -0.2) {
        PF.draw(ctx, '轻触「新的旅程」开始', W / 2, TITLE_MENU_Y + mh + 6, 10, C.gold3, { align: 'center', shadow: '#1a0e00' });
      }
    }
  }

  /* ---------------------------- 章节地图 ---------------------------- */
  function unlockedChapters() {
    var n = 0;
    for (var i = 0; i < STORY.chapters.length; i++) {
      if (i === 0 || G.chapterDone[STORY.chapters[i - 1].id] || G.chapter >= i) n = i;
    }
    return Math.max(n, Math.min(G.chapter, STORY.chapters.length - 1));
  }
  function curChapterIndex() {
    var best = -1;
    for (var i = 0; i < STORY.chapters.length; i++) if (G.chapterDone[STORY.chapters[i].id]) best = i;
    if (G.chapter > best) best = G.chapter;
    return best;
  }
  /* 节点位置。纵向范围是硬约束：上面不能顶到画框标题条（r.y+20），
     下面要给信息面板（y=202 起）留位置 —— 所以垂直半径压到 0.52，
     最下面的节点名字落在 y≈181..189，离面板还有 13px。 */
  function mapNodePos(i, t) {
    var n = STORY.chapters.length;
    var a = -Math.PI / 2 + (i / Math.max(1, n - 1)) * Math.PI * 1.85;
    var r = 92 + Math.sin(t * 0.3 + i) * 1.5;
    return { x: 240 + Math.cos(a) * r * 1.05, y: 126 + Math.sin(a) * r * 0.52 };
  }
  function drawMap(t) {
    var r = UI.screenFrame(ctx, '路 线', '第 ' + (unlockedChapters()) + ' / ' + (STORY.chapters.length - 1) + ' 段', t, { y: 12, h: H - 24 });
    var maxUnlocked = unlockedChapters();
    var n = STORY.chapters.length;
    // 路径
    for (var i = 1; i < n; i++) {
      var p = mapNodePos(i - 1, t), q = mapNodePos(i, t);
      var done = G.chapterDone[STORY.chapters[i - 1].id];
      Art.line(ctx, p.x, p.y, q.x, q.y, done ? C.gold1 : C.slate1);
    }
    for (var k = 0; k < n; k++) {
      var pos = mapNodePos(k, t);
      var ch = STORY.chapters[k];
      var done = !!G.chapterDone[ch.id];
      var open = k <= maxUnlocked;
      var sel = k === G.menuIndex;
      var col = done ? C.gold3 : (open ? C.parch : C.slate2);
      Art.disc(ctx, pos.x, pos.y, sel ? 9 : 7, done ? C.gold1 : (open ? C.brown2 : C.slate1));
      Art.ring(ctx, pos.x, pos.y, sel ? 9 : 7, sel ? C.gold3 : C.brown0, 1);
      if (sel && open) Art.glow(ctx, pos.x, pos.y, 18, C.gold2, 0.4);
      if (done) PF.draw(ctx, '✦', pos.x, pos.y - 5, 10, C.gold4, { align: 'center' });
      else if (!open) PF.draw(ctx, '锁', pos.x, pos.y - 5, 9, C.slate3, { align: 'center' });
      else PF.draw(ctx, String(k), pos.x, pos.y - 5, 9, C.brown0, { align: 'center' });
      // 只画"·"后面的短名。原来用 /^第.+章 · / 去前缀，可"序章""尾声"不以"第"开头
      // 匹配不上，于是整串"序章 · 守夜"都画了出来（7 个字 56px 宽），
      // 直接压到相邻的节点和别的标签上。
      PF.draw(ctx, ch.title.split(' · ').pop() || ch.title, pos.x, pos.y + 11, 8, col, { align: 'center' });
    }
    // 详情
    var c = STORY.chapters[G.menuIndex];
    if (c) {
      var open2 = G.menuIndex <= maxUnlocked;
      // 纵向不能随便放：页脚提示条占 r.y+r.h-17 起的 15px（footerHint），
      // 而最下面那个节点的名字在 y≈196+11。原来面板贴在 r.y+r.h-44（=214）高 34，
      // 底边正好压进提示条里 7px —— 所以两行字看起来糊在一起。
      var dy = r.y + r.h - 56;
      Art.panel(ctx, r.x + 10, dy, r.w - 20, 34, { fill: 'rgba(10,8,20,0.92)', edge: open2 ? C.gold1 : C.slate2, inner: C.brown1 });
      PF.draw(ctx, c.title + '　' + c.sub, r.x + 20, dy + 5, 11, open2 ? C.gold4 : C.gray0, {});
      var tips = [];
      var found = 0, tot = Object.keys(STORY.sigils).length;
      for (var z = 0; z < G.sigils.length; z++) found++;
      tips.push('符印 ' + found + '/' + tot);
      tips.push('图鉴 ' + Object.keys(G.codexSeen).length + '/' + Object.keys(STORY.codex).length);
      tips.push('悟性 ' + G.insight);
      tips.push('试炼 ' + Object.keys(G.trialResults).length);
      PF.draw(ctx, tips.join('　·　'), r.x + 20, dy + 20, 9, C.lav1, {});
      PF.draw(ctx, open2 ? (G.menuIndex <= curChapterIndex() ? '回车 重走这一段' : '回车 开始这一段') : '还没走到这里', r.x + r.w - 20, dy + 20, 9, open2 ? C.gold2 : C.gray0, { align: 'right' });
    }
    UI.footerHint(ctx, r, '← → 选择段落 · 回车进入 · ESC 返回', t);
  }

  /* ---------------------------- 图鉴 ---------------------------- */
  function codexCats() {
    var seen = {}, out = [];
    for (var k in STORY.codex) if (STORY.codex.hasOwnProperty(k)) {
      var c = STORY.codex[k].cat;
      if (!seen[c]) { seen[c] = true; out.push(c); }
    }
    return out;
  }
  function codexList(cat) {
    var a = [];
    for (var k in STORY.codex) if (STORY.codex.hasOwnProperty(k) && STORY.codex[k].cat === cat) a.push(k);
    return a;
  }
  function drawCodex(t) {
    var cats = codexCats();
    if (G.tab >= cats.length) G.tab = 0;
    var seenN = Object.keys(G.codexSeen).length, allN = Object.keys(STORY.codex).length;
    var r = UI.screenFrame(ctx, '影 之 书 · 图 鉴', '已录 ' + seenN + ' / ' + allN, t, { y: 12, h: H - 24 });
    /* 分类页签。类别数量是跟着图鉴数据长的（现在 6 个），
       原来写死"一行从 r.x+8 往右排"，第 6、7 个直接被面板右边框切掉半个字。
       这里先按可用宽度折行，再让下面的列表跟着页签的实际高度往下让。 */
    var TAB_FS = 10, TAB_H = 18, TAB_GAPX = 4, TAB_GAPY = 2;
    var availW = r.w - 16;
    var tabRows = [], curRow = [], curW = 0;
    for (var i = 0; i < cats.length; i++) {
      var wI = PF.width(cats[i], TAB_FS) + 14;
      if (curRow.length && curW + wI > availW) { tabRows.push(curRow); curRow = []; curW = 0; }
      curRow.push({ idx: i, w: wI }); curW += wI + TAB_GAPX;
    }
    if (curRow.length) tabRows.push(curRow);
    for (var rr = 0; rr < tabRows.length; rr++) {
      var tx = r.x + 8, ty = r.y + 24 + rr * (TAB_H + TAB_GAPY);
      for (var q = 0; q < tabRows[rr].length; q++) {
        var cell = tabRows[rr][q], sel = cell.idx === G.tab;
        Art.panel(ctx, tx, ty, cell.w, TAB_H, {
          fill: sel ? 'rgba(58,42,12,0.95)' : 'rgba(10,8,20,0.8)',
          edge: sel ? C.gold3 : C.slate2, inner: sel ? C.gold1 : C.brown1
        });
        PF.draw(ctx, cats[cell.idx], tx + 7, ty + 4, TAB_FS, sel ? C.gold4 : C.parch, {});
        tx += cell.w + TAB_GAPX;
      }
    }
    var tabsBottom = r.y + 24 + (tabRows.length - 1) * (TAB_H + TAB_GAPY) + TAB_H;
    // 列表
    var list = codexList(cats[G.tab]);
    // 底部留 22px：页脚提示条占 r.y+r.h-17 起的 15px，面板伸进去的话，
    // 右下角的"出处 · p.xiii"会和提示文字糊在一起
    var lx = r.x + 8, ly = tabsBottom + 6, lw = 150, lh = r.y + r.h - 22 - ly;
    Art.panel(ctx, lx, ly, lw, lh, { fill: 'rgba(6,6,14,0.8)', edge: C.brown1, inner: C.void1 });
    var rows = Math.floor((lh - 8) / 16);
    var top = Math.max(0, Math.min(G.scroll, Math.max(0, list.length - rows)));
    for (var j = 0; j < rows && top + j < list.length; j++) {
      var id = list[top + j], got = !!G.codexSeen[id];
      var s2 = (top + j) === G.sel;
      if (s2) Art.px(ctx, lx + 3, ly + 4 + j * 16, lw - 6, 14, 'rgba(180,130,40,0.22)');
      PF.draw(ctx, got ? STORY.codex[id].title : '？？？', lx + 8, ly + 6 + j * 16, 10,
              got ? (s2 ? C.gold4 : C.parch) : C.slate2, {});
      if (!got) Art.px(ctx, lx + 8, ly + 14 + j * 16, PF.width('？？？', 10), 1, C.slate1);
    }
    if (list.length > rows) PF.draw(ctx, '↕ 滚轮 / 上下键', lx + lw / 2, ly + lh - 12, 8, C.gray0, { align: 'center' });
    // 详情
    var dx = lx + lw + 8, dw = r.x + r.w - 8 - dx, dy = ly, dh = lh;
    Art.panel(ctx, dx, dy, dw, dh, { fill: 'rgba(10,9,20,0.86)', edge: C.gold0, inner: C.brown1, innerShadow: true });
    var cur = list[G.sel];
    if (cur && G.codexSeen[cur]) {
      var e = STORY.codex[cur];
      var yy = dy + 8;
      PF.draw(ctx, e.cat, dx + 10, yy, 8, C.gold2, {}); yy += 12;
      PF.draw(ctx, e.title, dx + 10, yy, 14, C.gold4, { shadow: '#000' });
      var tw = PF.width(e.title, 14);
      PF.draw(ctx, e.en, dx + 14 + tw, yy + 4, 8, C.lav1, {});
      yy += 20;
      Art.px(ctx, dx + 10, yy, dw - 20, 1, C.brown1); yy += 5;
      // 正文行数要按"到出处那一行还剩多少高"来封顶，不然长条目会压着出处和页脚提示画
      var citeH = e.src ? 14 : 4;
      var maxLines = Math.max(1, Math.floor((dy + dh - citeH - yy) / 16));
      var tl = PF.wrap(e.text, 11, dw - 22);
      if (tl.length > maxLines) {
        tl = tl.slice(0, maxLines);
        var tail = tl[maxLines - 1];
        tl[maxLines - 1] = tail.slice(0, Math.max(1, tail.length - 1)) + '…';
      }
      for (var m = 0; m < tl.length; m++) { PF.draw(ctx, tl[m], dx + 10, yy + m * 16, 11, C.cream, {}); }
      yy += tl.length * 16 + 6;
      if (e.src) PF.draw(ctx, '出处 · ' + e.src, dx + dw - 10, dy + dh - 14, 9, C.teal3, { align: 'right' });
    } else if (cur) {
      PF.draw(ctx, '这一条还没遇到。', dx + dw / 2, dy + dh / 2 - 8, 12, C.slate3, { align: 'center' });
      PF.draw(ctx, '往下走，它会出现。', dx + dw / 2, dy + dh / 2 + 8, 10, C.slate2, { align: 'center' });
    }
    UI.footerHint(ctx, r, '↕ 翻条目 · ← → 换分类 · 回车切换分类 · ESC 返回', t);
  }

  /* ---------------------------- 符印 ---------------------------- */
  function drawSigils(t) {
    var ids = Object.keys(STORY.sigils);
    var r = UI.screenFrame(ctx, '符 印', '已得 ' + G.sigils.length + ' / ' + ids.length, t, { y: 20, h: H - 40 });
    var cols = 4, cw = Math.floor((r.w - 20) / cols);
    /* 纵向预算必须从下往上倒推，不能写死：
         页脚提示条上沿 = r.y+r.h-17，它上面要留 4px 间隔，再上面是"成就"那一行（20px）。
       原来把成就行放在 r.y+r.h-26（=224），而卡片第二行一直画到 228、
       页脚提示条从 233 开始 —— 三样东西糊在一条横带上。 */
    var ACHV_H = 20, gridTop = r.y + 30, gapY = 6;
    var gridBottom = r.y + r.h - 17 - 4 - ACHV_H;
    var nRows = Math.max(1, Math.ceil(ids.length / cols));
    var chh = Math.floor((gridBottom - gridTop - (nRows - 1) * gapY) / nRows);
    chh = Math.max(46, Math.min(88, chh));
    for (var i = 0; i < ids.length; i++) {
      var id = ids[i], gg = STORY.sigils[id], got = G.sigils.indexOf(id) >= 0;
      var cx = r.x + 10 + (i % cols) * cw, cy = gridTop + Math.floor(i / cols) * (chh + gapY);
      var sel = i === G.sel;
      Art.panel(ctx, cx, cy, cw - 8, chh, {
        fill: got ? 'rgba(30,22,10,0.92)' : 'rgba(8,8,16,0.7)',
        edge: sel ? C.gold3 : (got ? C.gold0 : C.slate1), inner: C.brown1, innerShadow: true
      });
      if (got) {
        // 卡片矮到放不下两行说明时，只留图标 + 名字，别硬挤
        var withDesc = chh >= 66;
        var nameY = withDesc ? cy + chh - 38 : cy + Math.floor(chh / 2) + 4;
        Art.glowSoft(ctx, cx + (cw - 8) / 2, cy + 22, 20, C.gold2, 0.28, 6);
        Art.icon(ctx, gg.icon, cx + (cw - 8) / 2 - 8, cy + 12, 1, C.brown0, C.gold3);
        PF.draw(ctx, gg.name, cx + (cw - 8) / 2, nameY, 12, C.gold4, { align: 'center' });
        if (withDesc) {
          var dl = PF.wrap(gg.desc, 9, cw - 24);
          for (var k = 0; k < dl.length && k < 2; k++)
            PF.draw(ctx, dl[k], cx + (cw - 8) / 2, cy + chh - 22 + k * 11, 9, C.parch, { align: 'center' });
        }
      } else {
        PF.draw(ctx, '?', cx + (cw - 8) / 2, cy + Math.floor(chh / 2) - 14, 22, C.slate2, { align: 'center' });
        PF.draw(ctx, '未得', cx + (cw - 8) / 2, cy + chh - 20, 9, C.slate2, { align: 'center' });
      }
    }
    var achvIds = Object.keys(STORY.achv);
    var ay = gridBottom + 4;
    PF.draw(ctx, '成就', r.x + 12, ay, 10, C.gold3, {});
    var ax = r.x + 52;
    for (var a = 0; a < achvIds.length; a++) {
      var aid = achvIds[a], ha = !!G.achv[aid];
      var nmA = STORY.achv[aid].name, wA = PF.width(nmA, 9);
      // 先判断"这一项放不放得下"再画。原来的判断用的是"画完之后的 x > 右边距-90"，
      // 留了 90px 的虚余量，结果 6 个成就永远只显示 5 个。
      if (ax + 11 + wA > r.x + r.w - 14) break;
      Art.px(ctx, ax, ay + 1, 8, 8, ha ? C.gold2 : C.slate1);
      PF.draw(ctx, nmA, ax + 11, ay, 9, ha ? C.parch : C.slate2, {});
      ax += wA + 22;
    }
    UI.footerHint(ctx, r, 'ESC 返回', t);
  }

  /* ---------------------------- 设置 ---------------------------- */
  var SET_ITEMS = [
    { id: 'textSpeed', label: '文字速度', kind: 'range' },
    { id: 'bgmVol', label: '音乐音量', kind: 'range' },
    { id: 'sfxVol', label: '音效音量', kind: 'range' },
    { id: 'muted', label: '静音', kind: 'bool' },
    { id: 'auto', label: '自动播放', kind: 'bool' },
    { id: 'integerScale', label: '整数缩放', kind: 'bool' },
    { id: 'scanlines', label: '扫描线滤镜', kind: 'bool' },
    { id: 'shake', label: '屏幕震动', kind: 'bool' },
    { id: 'coords', label: '坐标读数', kind: 'bool' },
    { id: 'wipe', label: '清除存档', kind: 'act' }
  ];
  /* 10 项 × 18px = 162，加头部 28 与页脚 15，正好落在 230 的面板里，
     最后一行与页脚之间还留 12px 呼吸。原来间距 21，加到 10 项会顶到页脚上。 */
  var SET_PITCH = 18;
  function drawSettings(t) {
    var r = UI.screenFrame(ctx, '设 置', '', t, { x: 70, y: 20, w: W - 140, h: H - 40 });
    for (var i = 0; i < SET_ITEMS.length; i++) {
      var it = SET_ITEMS[i], y = r.y + 28 + i * SET_PITCH, sel = i === G.sel;
      if (sel) Art.px(ctx, r.x + 6, y - 2, r.w - 12, 18, 'rgba(180,130,40,0.18)');
      PF.draw(ctx, it.label, r.x + 14, y + 1, 11, sel ? C.gold4 : C.parch, {});
      if (it.kind === 'bool') {
        var v = !!settings[it.id];
        var bx = r.x + r.w - 62;
        Art.panel(ctx, bx, y - 1, 44, 14, { fill: v ? 'rgba(30,60,30,0.9)' : 'rgba(30,20,20,0.9)', edge: v ? C.green3 : C.slate2, inner: C.void1 });
        PF.draw(ctx, v ? '开' : '关', bx + 22, y + 1, 10, v ? C.green4 : C.gray0, { align: 'center' });
        if (sel) { PF.draw(ctx, '←', bx - 12, y + 1, 10, C.gold3, {}); PF.draw(ctx, '→', bx + 50, y + 1, 10, C.gold3, {}); }
      } else if (it.kind === 'range') {
        var val = settings[it.id];
        var ratio = it.id === 'textSpeed' ? (val - 10) / 70 : val;
        Art.bar(ctx, r.x + 130, y + 2, r.w - 200, 9, ratio, C.gold1, C.void1);
        PF.draw(ctx, it.id === 'textSpeed' ? (Math.round(val) + ' 字/秒') : Math.round(val * 100) + '%',
                r.x + r.w - 14, y + 1, 10, C.gold3, { align: 'right' });
        if (sel) { PF.draw(ctx, '←', r.x + 120, y + 1, 10, C.gold3, {}); PF.draw(ctx, '→', r.x + r.w - 66, y + 1, 10, C.gold3, {}); }
      } else {
        PF.draw(ctx, (touchMode || hasTouch()) ? '轻触清除' : '按回车清除', r.x + r.w - 14, y + 1, 10, sel ? C.red3 : C.gray0, { align: 'right' });
      }
    }
    UI.footerHint(ctx, r, (touchMode || hasTouch())
      ? '轻触某行切换 · 轻触右半 = 加 / 左半 = 减 · 轻触「继续」返回'
      : '↑↓ 选择 · ←→ 调整 · 回车切换 / 清除 · ESC 返回', t);
  }
  function adjustSetting(dir) {
    var it = SET_ITEMS[G.sel];
    if (!it) return;
    if (it.kind === 'bool') {
      settings[it.id] = !settings[it.id];
      if (it.id === 'muted') {
        Sound.setMuted(settings.muted);
        try { if (typeof Music !== 'undefined') Music.setVolume(bgmVolNow()); } catch (e) {}
        applySynthBgmVol();
        if (!settings.muted && G.bgm) { playBgm(G.bgm); }
      }
      if (it.id === 'integerScale') { resize(); }
      if (it.id === 'shake') applyShakeSetting();
      if (it.id === 'coords') { coordDebug = !!settings.coords; }
    } else if (it.kind === 'range') {
      var step = it.id === 'textSpeed' ? 4 : 0.05;
      settings[it.id] = Math.max(it.id === 'textSpeed' ? 10 : 0, Math.min(1, settings[it.id] + dir * step));
      if (it.id === 'textSpeed') settings.textSpeed = Math.max(10, Math.min(80, settings.textSpeed));
      if (it.id === 'bgmVol') { Sound.setBgmVolume(settings.bgmVol); applySynthBgmVol(); try { if (typeof Music !== 'undefined') Music.setVolume(bgmVolNow()); } catch (e) {} }
      if (it.id === 'sfxVol') Sound.setSfxVolume(settings.sfxVol);
    } else if (it.kind === 'act') {
      clearSave('auto');
      for (var i = 1; i <= 3; i++) clearSave(String(i));
      toast('存档已清除', 'vio');
    }
    persistSettings();
    sfx('tick');
  }

  /* ---------------------------- 暂停菜单 ---------------------------- */
  var PAUSE_ITEMS = [
    { id: 'resume', label: '继续' },
    { id: 'save1', label: '存档 · 1' },
    { id: 'save2', label: '存档 · 2' },
    { id: 'save3', label: '存档 · 3' },
    { id: 'load1', label: '读档 · 1' },
    { id: 'load2', label: '读档 · 2' },
    { id: 'load3', label: '读档 · 3' },
    { id: 'codex', label: '图鉴' },
    { id: 'map', label: '章节' },
    { id: 'settings', label: '设置' },
    { id: 'backlog', label: '回看' },
    { id: 'title', label: '回标题' }
  ];
  // 暂停菜单几何：高度由内容倒推（标题 + n 项 + 页脚提示条），保证任何项数下都不贴屏幕边
  var PAUSE_W = 248, PAUSE_IH = 16, PAUSE_TOP = 28, PAUSE_PAD_B = 22;
  function pauseGeom() {
    var n = PAUSE_ITEMS.length;
    var h = PAUSE_TOP + n * PAUSE_IH + PAUSE_PAD_B;
    if (h % 2) h++;                       // 偶数高 → y 落在整数像素上，避免半像素糊字
    return { w: PAUSE_W, h: h, x: Math.floor((W - PAUSE_W) / 2), y: Math.floor((H - h) / 2),
             ih: PAUSE_IH, top: PAUSE_TOP };
  }
  function pauseItemRect(i) {
    var g = pauseGeom();
    return { x: g.x + 4, y: g.y + g.top + i * g.ih, w: g.w - 8, h: g.ih - 1 };
  }
  function drawPause(t) {
    UI.dimBackdrop(ctx, 0.72);
    var g = pauseGeom(), w = g.w, h = g.h, x = g.x, y = g.y;
    Art.panel(ctx, x, y, w, h, { fill: 'rgba(10,8,20,0.97)', edge: C.gold2, inner: C.gold0, shadow: true });
    PF.draw(ctx, '暂 停', x + w / 2, y + 8, 14, C.gold4, { align: 'center' });
    for (var i = 0; i < PAUSE_ITEMS.length; i++) {
      var it = PAUSE_ITEMS[i], ir = pauseItemRect(i), sel = i === G.sel;
      var off = false, note = '';
      if (it.id.indexOf('save') === 0) { var si = slotInfo(it.id.slice(4)); note = si ? si.name.slice(0, 8) : ''; }
      if (it.id.indexOf('load') === 0) { var si2 = slotInfo(it.id.slice(4)); off = !si2; note = si2 ? si2.name.slice(0, 8) : '空'; }
      if (sel) Art.px(ctx, ir.x, ir.y, ir.w, ir.h, 'rgba(180,130,40,0.20)');
      PF.draw(ctx, it.label, x + 14, ir.y + 3, 10, off ? C.slate2 : (sel ? C.gold4 : C.parch), {});
      if (note) PF.draw(ctx, note, x + w - 14, ir.y + 3, 9, C.lav1, { align: 'right' });
    }
    UI.footerHint(ctx, { x: x, y: y, w: w, h: h }, '↑↓ 选择 · 回车 · ESC 返回', t);
  }

  /* ---------------------------- 回看 ---------------------------- */
  function drawBacklog(t) {
    var r = UI.screenFrame(ctx, '回 看', G.choiceLog.length + ' 次抉择', t, { x: 24, y: 16, w: W - 48, h: H - 32 });
    var y = r.y + 30;
    var n = Math.min(G.choiceLog.length, 8);
    if (!n) { PF.draw(ctx, '还没有做过选择。', r.cx, r.cy, 11, C.gray0, { align: 'center' }); }
    for (var i = 0; i < n; i++) {
      var c = G.choiceLog[G.choiceLog.length - 1 - i];
      var pl = PF.wrap(c.p, 9, r.w - 40);
      PF.draw(ctx, pl[0] || '', r.x + 12, y, 9, C.lav1, {});
      PF.draw(ctx, '→ ' + c.a, r.x + 22, y + 11, 10, C.gold3, {});
      y += 11 + (pl.length > 1 ? 10 : 0) + 14;
      if (y > r.y + r.h - 36) break;
    }
    UI.footerHint(ctx, r, 'ESC 返回', t);
  }

  /* ---------------------------- 结局 ---------------------------- */
  function prepareEnding() {
    var totalSig = Object.keys(STORY.sigils).length;
    var totalCodex = Object.keys(STORY.codex).length;
    var trials = Object.keys(G.trialResults).length;
    var rank;
    var acc = 0, cnt = 0;
    for (var k in G.trialResults) if (G.trialResults.hasOwnProperty(k)) {
      acc += (G.trialResults[k].accuracy || 0); cnt++;
    }
    acc = cnt ? acc / cnt : 0;
    if (G.sigils.length >= totalSig && acc >= 0.9) rank = '守灯人';
    else if (G.sigils.length >= totalSig - 1) rank = '独修者';
    else if (trials >= 5) rank = '行走者';
    else rank = '初来的人';
    G.endingReady = true;
    G.ending = { rank: rank, acc: acc, codex: Object.keys(G.codexSeen).length, totalCodex: totalCodex };
    save('auto');
    var doneAll = true;
    for (var ci = 0; ci < STORY.chapters.length; ci++) {
      var cid = STORY.chapters[ci].id;
      if (cid === 'end') continue;
      if (!G.chapterDone[cid]) { doneAll = false; break; }
    }
    if (doneAll) grant('finished');
    if (G.sigils.length >= totalSig) grant('allsigil');
  }
  /* 尾声正文：优先讲「人后来怎么样了」，一行一件事；统计面板另外画。 */
  function endingText() {
    var lines = [];
    lines.push('一年过去了。你把灯和笔记一起带回家，窗台上留着那盏长明烛。');
    if (G.flags.motive_lost) lines.push('你当初说的是「我不知道我为什么来」。现在你知道了一点。');
    else if (G.flags.motive_words) lines.push('关于信仰的问题，你开始有了自己的思考。');
    else if (G.flags.motive_quiet) lines.push('你当初要的是安静。现在安静是工具，不是目的了。');
    if (G.flags.helped_chen) lines.push('老陈的牛找回来了，开春还添了头小牛。他再见到你会主动打招呼。');
    else if (G.flags.patient) lines.push('你耐心回应了老陈的担心，也保留了自己的判断，他后来愿意跟你聊天了。');
    else if (G.flags.sharp) lines.push('面对老陈的质疑，你选择先问清说法的来历。他记住了这一点。');
    else if (G.flags.quiet) lines.push('你当时没有争辩，准备读清楚之后再谈。后来你真的读清楚了。');
    if (G.flags.c10_he_learn) lines.push('阿禾自己决定继续学。她不再问「马上学会」，开始问「这一页为什么这样写」。');
    else if (G.flags.c10_he_stop) lines.push('阿禾自己决定先停下。你送她到村口，她说：「我不是不信，我只是想先过自己的日子。」');
    else if (G.flags.c10_respect) lines.push('阿禾的事，你留给她自己决定。这份尊重她领了。');
    if (G.flags.c10_gift) lines.push('白先生收下了你那本书。第二天他的车就出了村，没人知道他会不会翻。');
    else if (G.flags.c8_bai_refuse || G.flags.c9_sneakers) lines.push('白先生还是走了，车辙印在雪泥里。他说的那些话，你只当故事听。');
    if ((G.rel.keeper || 0) >= 3) lines.push('守灯人没说过一句「你该信」。她只是每次都在。');
    else lines.push('守灯人话少。她肯陪你走完这一年，已经够少见了。');
    if (G.flags.path_moon) lines.push('下一步：给你的月相观察留一页记录。');
    if (G.flags.path_plan) lines.push('下一步：写下一个目标，和相应的仪式计划。');
    if (G.flags.path_journal) lines.push('下一步：把书里说的和亲身试过的分开记。');
    lines.push('');
    return lines;
  }
  function drawEnding(t) {
    UI.dimBackdrop(ctx, 0.62);
    /* 纵向预算：自上而下 标题 / 正文 / 分隔线 / 称号 / 统计 / 引语 / 提示，
       面板高度由正文实际行数倒推，避免"正文少 → 中间空一大块、底部三行挤成一坨"。 */
    var w = 400, PADX = 20, BODY_LH = 17, BODY_FS = 12, BODY_MAX = 7;
    var TOP = 10, TITLE_H = 24, GAP = 7, SEP_H = 6;
    var RANK_H = 18, STATS_H = 12, PHRASE_H = 16, HINT_H = 13;
    var lines = endingText(), wrapped = [];
    for (var i = 0; i < lines.length && wrapped.length < BODY_MAX; i++) {
      if (!lines[i]) continue;
      var ll = PF.wrap(lines[i], BODY_FS, w - PADX * 2);
      for (var j = 0; j < ll.length && wrapped.length < BODY_MAX; j++) wrapped.push(ll[j]);
    }
    var bottomH = RANK_H + GAP + STATS_H + GAP + PHRASE_H + GAP + HINT_H;
    var h = TOP + TITLE_H + wrapped.length * BODY_LH + GAP + SEP_H + GAP + bottomH + TOP;
    if (h % 2) h++;
    var x = Math.floor((W - w) / 2), y = Math.floor((H - h) / 2);
    Art.panel(ctx, x, y, w, h, { fill: 'rgba(10,8,20,0.97)', edge: C.gold2, inner: C.gold0, shadow: true });
    Art.glowSoft(ctx, x + w / 2, y + 30, 90, C.gold2, 0.24, 8);
    PF.draw(ctx, '这一年的路', x + w / 2, y + TOP, 16, C.gold4, { align: 'center', shadow: '#2a1400' });
    var yy = y + TOP + TITLE_H;
    for (i = 0; i < wrapped.length; i++) { PF.draw(ctx, wrapped[i], x + PADX, yy, BODY_FS, C.cream, {}); yy += BODY_LH; }
    yy += GAP;
    Art.px(ctx, x + PADX, yy, w - PADX * 2, 1, C.brown1);
    yy += SEP_H + GAP;
    var e = G.ending || { rank: '-', acc: 0, codex: 0, totalCodex: 1 };
    PF.draw(ctx, '称 号', x + PADX, yy + 2, 10, C.lav1, {});
    PF.draw(ctx, e.rank, x + PADX + 50, yy, 14, C.gold4, {});
    yy += RANK_H + GAP;
    var stats = '符印 ' + G.sigils.length + '/' + Object.keys(STORY.sigils).length +
                '　图鉴 ' + e.codex + '/' + e.totalCodex +
                '　悟性 ' + G.insight +
                '　试炼均分 ' + Math.round(e.acc * 100) + '%';
    PF.draw(ctx, stats, x + PADX, yy, 10, C.parch, {});
    yy += STATS_H + GAP;
    PF.draw(ctx, '“你不需要被允许。”', x + w / 2, yy, 11, C.teal4, { align: 'center' });
    yy += PHRASE_H + GAP;
    if (Math.sin(t * 4) > 0)
      PF.draw(ctx, '空格 回到标题 · ESC 菜单', x + w / 2, yy, 10, C.gold3, { align: 'center' });
  }

  /* ============================ 输入 ============================ */
  function anyOverlay() { return G.mode !== 'title' && G.mode !== 'scene' && G.mode !== 'choice' && G.mode !== 'trial' && G.mode !== 'quote' && G.mode !== 'ending'; }

  function openMenu() {
    if (G.mode === 'title') return;
    G.menuStack.push(G.mode);
    G.sel = 0; G.mode = 'menu'; sfx('page');
  }
  function closeOverlay() {
    if (G.mode === 'title') return;
    if (G.mode === 'map' || G.mode === 'codex' || G.mode === 'settings' ||
        G.mode === 'sigils' || G.mode === 'backlog') {
      var prev = G.menuStack.pop();
      G.mode = prev || 'scene'; sfx('cancel');
      if (G.mode === 'scene' && !G.dlg && !G.choice && !G.scene) G.mode = 'title';
      return;
    }
    if (G.mode === 'menu') { var p = G.menuStack.pop(); G.mode = p || 'scene'; sfx('cancel'); return; }
  }

  function onKey(e) {
    var k = e.key;
    if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' ','Enter','Tab'].indexOf(k) >= 0) e.preventDefault();
    unlockAudio();

    if (k === 'p' || k === 'P') { perf.show = !perf.show; perf.worst = 0; return; }
    /* 按 / 随时开关"点击坐标读数"。比改地址栏加 ?coords=1 省事得多 ——
       排查"某个位置点不中"时，让玩家自己按一下就能把数字读出来。 */
    if (k === '/' || k === '?') {
      coordDebug = !coordDebug;
      settings.coords = coordDebug;          // 和设置里的同名开关保持同步
      persistSettings();
      toast(coordDebug ? '坐标读数：开（再按 / 关闭）' : '坐标读数：关', 'teal');
      return;
    }
    if (k === 'f' || k === 'F') { toggleFullscreen(); return; }

    // 任何界面都可用 ESC 返回
    if (k === 'Escape') {
      if (G.mode === 'title') return;
      if (G.mode === 'menu') { closeOverlay(); return; }
      if (anyOverlay()) { closeOverlay(); return; }
      if (G.mode === 'ending') { G.menuStack.push('ending'); G.sel = 0; G.mode = 'menu'; return; }
      openMenu(); return;
    }
    // 快捷界面键
    if (k === 'm' || k === 'M') {
      if (G.mode === 'title' || G.mode === 'scene' || G.mode === 'choice' || G.mode === 'menu') {
        if (G.mode !== 'menu') G.menuStack.push(G.mode);
        G.menuIndex = curChapterIndex(); G.mode = 'map'; sfx('page'); return;
      }
    }
    if (k === 'b' || k === 'B') {
      if (G.mode === 'title' || G.mode === 'scene' || G.mode === 'choice') {
        G.menuStack.push(G.mode); G.mode = 'codex'; G.scroll = 0; G.sel = 0; sfx('page'); return;
      }
    }
    if (k === 'c' || k === 'C') {
      if (G.mode === 'title' || G.mode === 'scene' || G.mode === 'choice') {
        G.menuStack.push(G.mode); G.mode = 'sigils'; G.sel = 0; sfx('page'); return;
      }
    }

    if (G.mode === 'title') { keyTitle(k); return; }
    if (G.mode === 'map') { keyMap(k); return; }
    if (G.mode === 'codex') { keyCodex(k); return; }
    if (G.mode === 'sigils') { if (k === 'ArrowLeft') { G.sel = Math.max(0, G.sel - 1); sfx('select'); } else if (k === 'ArrowRight') { G.sel = Math.min(Object.keys(STORY.sigils).length - 1, G.sel + 1); sfx('select'); } else if (k === 'ArrowUp') { G.sel = Math.max(0, G.sel - 4); sfx('select'); } else if (k === 'ArrowDown') { G.sel = Math.min(Object.keys(STORY.sigils).length - 1, G.sel + 4); sfx('select'); } return; }
    if (G.mode === 'settings') { keySettings(k); return; }
    if (G.mode === 'menu') { keyPause(k); return; }
    if (G.mode === 'backlog') { return; }
    if (G.mode === 'page') { if (k === ' ' || k === 'Enter') pageAdvance(); return; }
    if (G.mode === 'explore') { keyExplore(k); return; }
    if (G.mode === 'ending') {
      if (k === ' ' || k === 'Enter') { G.mode = 'title'; G.menuIndex = 0; }
      return;
    }
    if (G.mode === 'trial') {
      var act = 'x';
      if (k === 'ArrowUp' || k === 'w') act = 'up';
      else if (k === 'ArrowDown' || k === 's' && !e.shiftKey) act = 'down';
      else if (k === 'ArrowLeft' || k === 'a') act = 'left';
      else if (k === 'ArrowRight' || k === 'd') act = 'right';
      else if (k === ' ' || k === 'Enter') act = 'confirm';
      if (k === 'S' || (k === 's' && e.shiftKey)) act = 'submit';
      UI.Trial.key(act);
      return;
    }
    if (G.mode === 'choice') {
      var n = G.choice.options.length;
      if (k === 'ArrowUp' || k === 'w') { G.choice.index = (G.choice.index + n - 1) % n; sfx('select'); }
      else if (k === 'ArrowDown' || k === 's') { G.choice.index = (G.choice.index + 1) % n; sfx('select'); }
      else if (k === ' ' || k === 'Enter') pickChoice(G.choice.index);
      return;
    }
    if (G.mode === 'quote') {
      if (k === ' ' || k === 'Enter') advanceDialogue();
      return;
    }
    if (G.mode === 'scene') {
      if (G.chapterCard) return;
      if (G.fx) return;
      if (G.dlg) {
        var wasDone = (G.dlg.kind === 'quote') ? G.dlg.reveal >= 1 : G.dlg.shown >= G.dlg.text.length;
        var target = G.dlg.thenGoto;
        advanceDialogue();
        if (wasDone && target) { if (!applyGoto(target)) runScript(); }
      }
    }
  }

  function keyTitle(k) {
    var n = TITLE_ITEMS.length;
    if (k === 'ArrowUp' || k === 'w') { G.menuIndex = (G.menuIndex + n - 1) % n; sfx('select'); }
    else if (k === 'ArrowDown' || k === 's') { G.menuIndex = (G.menuIndex + 1) % n; sfx('select'); }
    else if (k === ' ' || k === 'Enter') titleAct(G.menuIndex);
  }
  function titleAct(i) {
    var id = TITLE_ITEMS[i].id;
    sfx('confirm');
    if (id === 'new') {
      if (readSlot('auto')) { clearSave('auto'); }
      newGame();
    } else if (id === 'continue') {
      if (!loadGame('auto')) newGame();
      G.menuStack = [];
    } else if (id === 'map') { G.menuStack = ['title']; G.menuIndex = curChapterIndex(); G.mode = 'map'; }
    else if (id === 'codex') { G.menuStack = ['title']; G.mode = 'codex'; G.scroll = 0; G.sel = 0; }
    else if (id === 'settings') { G.menuStack = ['title']; G.sel = 0; G.mode = 'settings'; }
  }

  function keyMap(k) {
    var n = STORY.chapters.length;
    if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'a' || k === 'w') { G.menuIndex = (G.menuIndex + n - 1) % n; sfx('select'); }
    else if (k === 'ArrowRight' || k === 'ArrowDown' || k === 'd' || k === 's') { G.menuIndex = (G.menuIndex + 1) % n; sfx('select'); }
    else if (k === ' ' || k === 'Enter') {
      if (G.menuIndex > unlockedChapters()) { sfx('cancel'); return; }
      var ch = STORY.chapters[G.menuIndex];
      G.menuStack = [];
      sfx('confirm');
      G.mode = 'scene';
      startScene(ch.scene, {});
    }
  }

  function keyCodex(k) {
    var cats = codexCats();
    var list = codexList(cats[G.tab]);
    var rows = 9;
    if (k === 'ArrowLeft') { G.tab = (G.tab + cats.length - 1) % cats.length; G.sel = 0; G.scroll = 0; sfx('select'); }
    else if (k === 'ArrowRight' || k === 'Tab') { G.tab = (G.tab + 1) % cats.length; G.sel = 0; G.scroll = 0; sfx('select'); }
    else if (k === 'ArrowUp' || k === 'w') { G.sel = Math.max(0, G.sel - 1); if (G.sel < G.scroll) G.scroll = G.sel; sfx('select'); }
    else if (k === 'ArrowDown' || k === 's') { G.sel = Math.min(list.length - 1, G.sel + 1); if (G.sel >= G.scroll + rows) G.scroll = G.sel - rows + 1; sfx('select'); }
  }

  function keySettings(k) {
    if (k === 'ArrowUp' || k === 'w') { G.sel = (G.sel + SET_ITEMS.length - 1) % SET_ITEMS.length; sfx('select'); }
    else if (k === 'ArrowDown' || k === 's') { G.sel = (G.sel + 1) % SET_ITEMS.length; sfx('select'); }
    else if (k === 'ArrowLeft' || k === 'a') adjustSetting(-1);
    else if (k === 'ArrowRight' || k === 'd') adjustSetting(1);
    else if (k === ' ' || k === 'Enter') adjustSetting(1);
  }

  function keyPause(k) {
    var n = PAUSE_ITEMS.length;
    if (k === 'ArrowUp' || k === 'w') { G.sel = (G.sel + n - 1) % n; sfx('select'); }
    else if (k === 'ArrowDown' || k === 's') { G.sel = (G.sel + 1) % n; sfx('select'); }
    else if (k === ' ' || k === 'Enter') { pauseAct(PAUSE_ITEMS[G.sel].id); }
  }
  function pauseAct(id) {
    sfx('confirm');
    if (id === 'resume') { closeOverlay(); return; }
    if (id.indexOf('save') === 0) { var s = id.slice(4); save(s); toast('已存到 ' + s, 'teal'); return; }
    if (id.indexOf('load') === 0) { var s2 = id.slice(4); if (loadGame(s2)) { G.menuStack = []; toast('已读取', 'teal'); } else sfx('cancel'); return; }
    if (id === 'codex') { G.mode = 'codex'; G.scroll = 0; G.sel = 0; return; }
    if (id === 'map') { G.menuIndex = curChapterIndex(); G.mode = 'map'; return; }
    if (id === 'settings') { G.sel = 0; G.mode = 'settings'; return; }
    if (id === 'backlog') { G.mode = 'backlog'; return; }
    if (id === 'title') { G.mode = 'title'; G.menuStack = []; G.menuIndex = 0; return; }
  }

  function onPointer(e, isDown) {
    unlockAudio();
    if (touchMode) { touchMode = false; touchVis = 1; }   // 触摸后收起"用鼠标"的暗示
    var p = toVirtual(e.clientX, e.clientY);

    // 右上角导航按钮（任何游玩中的界面）
    if (G.mode === 'scene' || G.mode === 'choice' || G.mode === 'trial' || G.mode === 'quote' || G.mode === 'ending') {
      for (var i = 0; i < HUDBTNS.length; i++) {
        var r = hudBtnRect(i);
        if (p.x > r.x && p.x < r.x + r.w && p.y > r.y && p.y < r.y + r.h) {
          var id = HUDBTNS[i].id;
          if (id === 'menu') { openMenu(); }
          else if (id === 'map') { G.menuStack.push(G.mode); G.menuIndex = curChapterIndex(); G.mode = 'map'; }
          else if (id === 'codex') { G.menuStack.push(G.mode); G.mode = 'codex'; G.scroll = 0; G.sel = 0; }
          else if (id === 'sigils') { G.menuStack.push(G.mode); G.mode = 'sigils'; G.sel = 0; }
          return;
        }
      }
    }

    if (G.mode === 'title') {
      for (var j = 0; j < TITLE_ITEMS.length; j++) {
        var tr = titleItemRect(j);
        if (p.x > tr.x && p.x < tr.x + tr.w && p.y > tr.y && p.y < tr.y + tr.h) { G.menuIndex = j; titleAct(j); return; }
      }
      return;
    }
    if (G.mode === 'map') {
      var n = STORY.chapters.length;
      for (var mi = 0; mi < n; mi++) {
        var pos = mapNodePos(mi, G.time);
        if (Math.abs(p.x - pos.x) < 16 && Math.abs(p.y - pos.y) < 16) {
          if (G.menuIndex === mi) keyMap('Enter'); else { G.menuIndex = mi; sfx('select'); }
          return;
        }
      }
      return;
    }
    if (G.mode === 'codex') {
      var cats = codexCats();
      var tx = 24;
      for (var ci = 0; ci < cats.length; ci++) {
        var w = PF.width(cats[ci], 10) + 14;
        if (p.x > tx && p.x < tx + w && p.y > 36 && p.y < 54) { G.tab = ci; G.sel = 0; G.scroll = 0; sfx('select'); return; }
        tx += w + 4;
      }
      var lx = 24, ly = 60, lw = 150, lh = 174;
      if (p.x > lx && p.x < lx + lw && p.y > ly && p.y < ly + lh) {
        var idx = G.scroll + Math.floor((p.y - ly - 4) / 16);
        var list = codexList(cats[G.tab]);
        if (idx >= 0 && idx < list.length) { G.sel = idx; sfx('select'); }
        return;
      }
      return;
    }
    if (G.mode === 'sigils') {
      var ids = Object.keys(STORY.sigils), cols = 4, cw = Math.floor((W - 28 - 20) / cols);
      for (var si = 0; si < ids.length; si++) {
        var cx = 24 + (si % cols) * cw, cy = 50 + Math.floor(si / cols) * 92;
        if (p.x > cx && p.x < cx + cw - 8 && p.y > cy && p.y < cy + 86) { G.sel = si; sfx('select'); return; }
      }
      return;
    }
    if (G.mode === 'settings' || G.mode === 'menu') {
      if (G.mode === 'settings') {
        /* 与 drawSettings 共用同一份几何：面板 y=20，首行 +28，行距 SET_PITCH。
           之前这里写死 21 的行距，改过排版后点不中对应的行。 */
        var sr = { x: 70, y: 20 };
        for (var qi = 0; qi < SET_ITEMS.length; qi++) {
          var yy = sr.y + 28 + qi * SET_PITCH;
          if (p.y > yy - 3 && p.y < yy + SET_PITCH - 2 && p.x > sr.x && p.x < W - sr.x) {
            G.sel = qi;
            if (SET_ITEMS[qi].kind === 'bool' || SET_ITEMS[qi].kind === 'act') adjustSetting(1);
            else adjustSetting(p.x > W / 2 ? 1 : -1);
            return;
          }
        }
      } else {
        for (var pi = 0; pi < PAUSE_ITEMS.length; pi++) {
          var pr = pauseItemRect(pi);
          if (p.x > pr.x && p.x < pr.x + pr.w && p.y > pr.y && p.y < pr.y + pr.h) {
            G.sel = pi; pauseAct(PAUSE_ITEMS[pi].id); return;
          }
        }
      }
      return;
    }
    if (G.mode === 'backlog') { return; }
    if (G.mode === 'page') { pageAdvance(); return; }
    if (G.mode === 'explore') { clickExplore(p.x, p.y); return; }
    if (G.mode === 'ending') { G.mode = 'title'; G.menuIndex = 0; return; }
    if (G.mode === 'trial') { UI.Trial.click(p.x, p.y); return; }
    if (G.mode === 'choice') {
      var hit = UI.Choice.hitTest(G.choice, p.x, p.y);
      if (hit >= 0) { G.choice.index = hit; pickChoice(hit); }
      return;
    }
    if (G.mode === 'quote') { advanceDialogue(); return; }
    if (G.mode === 'scene') {
      if (G.chapterCard || G.fx) return;
      if (G.dlg) {
        var wasDone = G.dlg.shown >= G.dlg.text.length, target = G.dlg.thenGoto;
        advanceDialogue();
        if (wasDone && target) { if (!applyGoto(target)) runScript(); }
      }
    }
    void isDown;
  }
  /* ======================== 触摸 / 手机适配 ========================
   *   - 触摸点等于"按下"：原来只绑了 canvas 的 touchstart，手指落在画面外
   *     （比如侧边留白或被安全区挤出的那圈）就完全没反应，所以改成整窗监听。
   *   - 触摸时先用手指位置做一次 hover，再当作点击派发：探索界面的"选中"、
   *     按钮的高亮都靠 hover 状态，不先喂一次就会点第一下只选中、第二下才生效。
   *   - 滑动选点位：探索界面是"看图找东西"，手指按住滑动直接改选中项，
   *     比反复点小框舒服得多。
   *   - 触觉反馈：可用时给一次 10ms 轻震（多数浏览器会忽略，不报错）。 */
  var touchMode = false, touchVis = 0, touchStart = null, touchMoved = false;
  function setTouchMode() {
    if (touchMode) return;
    touchMode = true;
    touchVis = 1;
  }
  function buzz(ms) {
    try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) {}
  }
  /* 设备是否带触摸。用于把"键盘快捷键"这类提示换成触屏说法。 */
  function hasTouch() {
    try { return ('ontouchstart' in window) || (navigator.maxTouchPoints || 0) > 0; } catch (e) { return false; }
  }
  function touchPoint(t) { return toVirtual(t.clientX, t.clientY); }

  function onTouchStart(e) {
    unlockAudio();
    setTouchMode();
    if (!e.touches.length) return;
    e.preventDefault();                     // 禁掉滚动 / 双击缩放 / 长按选择
    var t = e.touches[0];
    touchMoved = false;
    touchStart = touchPoint(t);
    /* 先喂 hover：探索界面的选中、按钮高亮都依赖 hover 状态 */
    if (G.mode === 'trial') UI.Trial.move(touchStart.x, touchStart.y);
    else if (G.mode === 'explore') hoverExplore(touchStart.x, touchStart.y);
  }

  function onTouchMove(e) {
    if (!e.touches.length) return;
    e.preventDefault();
    var p = touchPoint(e.touches[0]);
    if (touchStart && Math.abs(p.x - touchStart.x) + Math.abs(p.y - touchStart.y) > 6) touchMoved = true;
    /* 按住滑动 = 在候选点位之间移动选中（不改选中项时就是普通的 hover） */
    if (G.mode === 'explore' && touchMoved) {
      var i = exploreSpotAt(p.x, p.y);
      if (i >= 0 && G.explore.sel !== i) { G.explore.sel = i; sfx('select'); }
      hoverExplore(p.x, p.y);
    } else if (G.mode === 'trial') UI.Trial.move(p.x, p.y);
  }

  function onTouchEnd(e) {
    e.preventDefault();
    if (!touchStart) return;
    var p = touchStart;
    touchStart = null;
    if (touchMoved) return;                 // 滑动过就不算点击，避免误触
    buzz(8);
    onPointer({ clientX: e.changedTouches && e.changedTouches[0]
      ? e.changedTouches[0].clientX : p.x, clientY: e.changedTouches && e.changedTouches[0]
      ? e.changedTouches[0].clientY : p.y }, true);
  }


  function onMove(e) {
    var p = toVirtual(e.clientX, e.clientY);
    if (G.mode === 'trial') UI.Trial.move(p.x, p.y);
    else if (G.mode === 'explore') hoverExplore(p.x, p.y);
  }

  function onWheel(e) {
    if (G.mode === 'codex') {
      var cats = codexCats(), list = codexList(cats[G.tab]);
      G.scroll = Math.max(0, Math.min(Math.max(0, list.length - 9), G.scroll + (e.deltaY > 0 ? 1 : -1)));
      G.sel = Math.max(G.scroll, Math.min(list.length - 1, G.sel));
      e.preventDefault();
    }
  }

  function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        var el = document.documentElement;
        (el.requestFullscreen || el.webkitRequestFullscreen || function () {}).call(el);
      } else {
        (document.exitFullscreen || document.webkitExitFullscreen || function () {}).call(document);
      }
    } catch (e) {}
  }

  /* ============================ 性能面板 ============================ */
  var perf = { ms: 0, fps: 60, frames: 0, acc: 0, worst: 0, show: false, canvases: 0 };
  function drawPerf() {
    var s = PF.stats();
    var lines = [perf.fps.toFixed(1) + ' fps', perf.ms.toFixed(2) + ' ms/帧',
                 '峰值 ' + perf.worst.toFixed(1) + ' ms', '文字缓存 ' + s.text,
                 '每帧新建 canvas ' + perf.canvases];
    Art.panel(ctx, 6, 30, 148, 10 + lines.length * 11, { fill: 'rgba(0,0,0,0.82)', edge: C.teal3, inner: C.teal1 });
    for (var i = 0; i < lines.length; i++)
      PF.draw(ctx, lines[i], 12, 34 + i * 11, 9, i === 4 ? (perf.canvases === 0 ? C.green3 : C.red3) : C.parch, {});
  }

  window.__perfCanvases = 0;
  (function hookCreateElement() {
    var orig = document.createElement.bind(document);
    document.createElement = function (tag) {
      if (String(tag).toLowerCase() === 'canvas') window.__perfCanvases++;
      return orig(tag);
    };
  })();

  /* ============================ 主循环 ============================ */
  var last = 0;
  function loop(now) {
    if (!last) last = now;
    var dt = Math.min(0.05, (now - last) / 1000);   // 必须夹上限
    last = now;
    var t0 = performance.now();
    update(dt);
    draw();
    if (perf.show) { drawPerf(); perf.canvases = window.__perfCanvases; window.__perfCanvases = 0; }
    var f = performance.now() - t0;
    perf.ms = perf.ms * 0.9 + f * 0.1;
    if (f > perf.worst) perf.worst = f;
    perf.acc += dt; perf.frames++;
    if (perf.acc >= 0.5) { perf.fps = perf.frames / perf.acc; perf.frames = 0; perf.acc = 0; }
    requestAnimationFrame(loop);
  }

  /* ============================ 测试面 ============================ */
  function doJump(v) {
    if (v === 'title') { G.mode = 'title'; return true; }
    if (v === 'ending') { G.mode = 'ending'; prepareEnding(); return true; }
    if (v === 'map') { G.menuStack = ['title']; G.menuIndex = curChapterIndex(); G.mode = 'map'; return true; }
    if (v === 'settings') { G.menuStack = ['title']; G.sel = 0; G.mode = 'settings'; return true; }
    if (v === 'sigils') { G.menuStack = ['title']; G.mode = 'sigils'; G.sel = 0; return true; }
    if (v === 'codex') { for (var k in STORY.codex) if (STORY.codex.hasOwnProperty(k)) G.codexSeen[k] = 1; G.mode = 'codex'; G.sel = 0; G.scroll = 0; return true; }
    if (v.indexOf('scene:') === 0) { G.mode = 'scene'; startScene(v.slice(6), { noSave: true }); return true; }
    if (v.indexOf('trial:') === 0) {
      G.scene = { script: [{ t: 'trial', id: v.slice(6) }] };
      G.sceneId = '__trial__'; G.pc = 0; G.labels = {}; G.mode = 'scene'; runScript(); return true;
    }
    return false;
  }

  function debugJump() {
    var q = location.search || '';
    if (/[?&]perf=1/.test(q)) perf.show = true;
    if (/[?&]nofx=1/.test(q)) settings.scanlines = false;
    if (/[?&]coords=1/.test(q)) coordDebug = true;
    var m = /[?&]jump=([^&]+)/.exec(q);
    if (!m) return false;
    return doJump(decodeURIComponent(m[1]));
  }
  var coordDebug = false;

  function advanceN(n, opts) {
    opts = opts || {};
    for (var i = 0; i < n; i++) {
      if (opts.trials) {
        if (G.mode === 'trial') {
          for (var g = 0; g < 400; g++) {
            if (G.mode !== 'trial') break;
            UI.Trial.autoStep(0, mkRng());
            update(1 / 60);
          }
          continue;
        }
      }
      if (G.mode === 'quote') { advanceDialogue(); continue; }
      if (G.mode !== 'scene' || !G.dlg) break;
      G.dlg.shown = G.dlg.text.length;
      advanceDialogue();
    }
  }
  function mkRng() { return function () { return 0.99; }; }   // 0.99 → 永远不触发 errorRate

  /* ?steps=N：启动后同步推进 N 帧（每帧 1/60 秒），让人一步跳到"第 N 帧那个画面"。
     为什么需要：无头截图里 rAF 是被节流的，一张截图经常只跑到开头的章节卡，
     根本看不到后面的对白/探索界面；有了它，截图和逐帧测试都能指定"停在第几帧"。
     ?steps=N&stepsAdv=1 时顺带把对白一次显示完（不逐字），方便截"整段文字"的图。 */
  function fastSteps() {
    var m = /[?&]steps=(\d+)/.exec(location.search || '');
    if (!m) return;
    var n = Math.min(200000, parseInt(m[1], 10) || 0);
    var skipType = /[?&]stepsAdv=1/.test(location.search || '');
    for (var i = 0; i < n; i++) {
      if (G.mode === 'scene' && G.dlg) {
        if (skipType) G.dlg.shown = G.dlg.text.length;
        update(1 / 60);
        if (G.dlg && G.dlg.shown >= G.dlg.text.length) advanceDialogue();
      } else if (G.mode === 'quote' && G.dlg) {
        if (skipType) G.dlg.reveal = 1;
        update(1 / 60);
        if (G.dlg && G.dlg.reveal >= 1) advanceDialogue();
      } else if (G.mode === 'page') {
        if (skipType) { G.page.shown = pageTotal(G.page); G.page.reveal = 1; }
        update(1 / 60);
        if (skipType && pageDone()) pageAdvance();
      } else {
        update(1 / 60);
      }
    }
    draw();
  }

  function boot() {
    loadSettings();
    applyShakeSetting();          // 设置里的"屏幕震动"要同步给 UI
    coordDebug = !!settings.coords;
    setupCanvas();
    window.addEventListener('keydown', onKey);
    canvas.addEventListener('mousedown', function (e) { onPointer(e, true); });
    canvas.addEventListener('mousemove', onMove);
    window.addEventListener('wheel', onWheel, { passive: false });
    /* 触摸：绑在 window 上而不是 canvas 上 —— 手指落在画面外的留白/安全区那圈
       （手机上很常见）时，绑 canvas 的监听收不到事件，表现就是"点了完全没反应"。
       passive:false 才能在 touchstart 里 preventDefault 掉滚动与双击缩放。 */
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: false });
    window.addEventListener('touchcancel', function () { touchStart = null; }, { passive: true });
    var el = document.getElementById('loading');
    if (el) el.style.display = 'none';
    try {
      if (debugJump()) {
        var am = /[?&]adv=(\d+)/.exec(location.search || '');
        if (am) advanceN(parseInt(am[1], 10), { trials: /[?&]advtrials=1/.test(location.search) });
        fastSteps();
      } else fastSteps();
    } catch (e) { console.warn('调试入口失败', e); }
    /* 探测 music/ 里有没有真实配乐。有的话下一次 bgm 指令（或标题页）
       就会播文件而不是内置合成曲；没有则一切照旧。 */
    try {
      if (typeof Music !== 'undefined' && Music.detect) {
        Music.detect().then(function (found) {
          var names = Object.keys(found || {});
          if (!names.length) return;
          console.log('[配乐] music/ 里找到 ' + names.length + ' 首：' + names.join(', '));
          var want = G.bgm || 'title';
          if (Music.has(want)) playBgm(want);
          /* 关键：文件还在等用户手势时，先把合成曲压掉，
             免得"两套音乐同时响"把玩家听糊涂。真播不了的话 music.js 会自己放回来。 */
          applySynthBgmVol();
        });
      }
    } catch (e) {}
    window.__booted = true;          // 测试面：无头 harness 靠这个判断启动完成
    requestAnimationFrame(loop);
  }

  return {
    boot: boot, G: G, newGame: newGame, save: save, loadGame: loadGame,
    startScene: startScene, debugJump: debugJump, jumpTo: doJump, settings: settings,
    slotInfo: slotInfo, readSlot: readSlot, advanceN: advanceN,
    unhideAll: function () {
      for (var k in STORY.codex) if (STORY.codex.hasOwnProperty(k)) G.codexSeen[k] = 1;
      for (var s in STORY.sigils) if (STORY.sigils.hasOwnProperty(s) && G.sigils.indexOf(s) < 0) G.sigils.push(s);
    },
    // 测试专用：无头环境 rAF 不可靠，测试页用这个自己推进时钟
    __step: function (dt) {
      dt = dt === undefined ? 1 / 60 : dt;
      if (perf.show) { window.__perfCanvases = 0; }
      update(dt);
      draw();
      if (perf.show) { perf.canvases = window.__perfCanvases; window.__perfCanvases = 0; }
    },
    __perf: perf
  };
})();
