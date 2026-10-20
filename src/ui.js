/* =========================================================================
 *  ui.js —— 对白框 / 选择支 / 试炼（7 种玩法）/ 图鉴 / 地图 / 设置 / HUD
 *
 *  依赖方向：ui.js 读 STORY（只读数据）与 Art / Sound；不推进剧本。
 *  试炼统一契约：init(def) → draw(ctx,S,t) → key(act) / click(x,y)
 *                对外返回 {done, success, score, hits, total}
 * ========================================================================= */
var UI = (function () {
  'use strict';
  var C = Art.C, W = Art.W, H = Art.H, PF = Art.PixelFont;

  /* 试炼答错时的画面震动开关（引擎按设置项改这个值）。
     默认开；关掉时震动效果直接跳过，但其它反馈（变色、音效）不受影响。 */
  var shakeEnabled = true;

  /* ============================ 公共部件 ============================ */
  function dimBackdrop(ctx, a) {
    ctx.globalAlpha = a === undefined ? 0.55 : a;
    Art.px(ctx, 0, 0, W, H, '#05040c');
    ctx.globalAlpha = 1;
  }

  // 试炼/图鉴这类"整页"界面的统一外壳
  function screenFrame(ctx, title, sub, t, opt) {
    opt = opt || {};
    dimBackdrop(ctx, opt.dim === undefined ? 0.72 : opt.dim);
    var x = opt.x || 14, y = opt.y || 10, w = opt.w || (W - 28), h = opt.h || (H - 20);
    Art.panel(ctx, x, y, w, h, { fill: 'rgba(12,9,22,0.96)', edge: C.gold1, inner: C.gold0, shadow: true });
    // 顶部装饰条
    Art.px(ctx, x + 2, y + 2, w - 4, 18, 'rgba(120,86,20,0.30)');
    Art.px(ctx, x + 2, y + 19, w - 4, 1, C.gold0);
    PF.draw(ctx, title, x + 10, y + 6, 12, C.gold3, { shadow: '#1a0e00' });
    if (sub) PF.draw(ctx, sub, x + w - 10, y + 7, 10, C.lav1, { align: 'right' });
    // 四角小菱形
    [[x + 3, y + 3], [x + w - 6, y + 3], [x + 3, y + h - 6], [x + w - 6, y + h - 6]].forEach(function (p) {
      Art.px(ctx, p[0], p[1], 3, 3, Math.sin(t * 3) > 0 ? C.gold3 : C.gold1);
    });
    return { x: x, y: y, w: w, h: h, cx: x + w / 2, cy: y + h / 2, inX: x + 10, inY: y + 26, inW: w - 20, inH: h - 36 };
  }

  function footerHint(ctx, r, text, t) {
    Art.px(ctx, r.x + 2, r.y + r.h - 17, r.w - 4, 15, 'rgba(0,0,0,0.35)');
    PF.draw(ctx, text, r.cx, r.y + r.h - 14, 9, C.gray1, { align: 'center' });
    if (Math.sin(t * 4) > 0) Art.px(ctx, r.x + 6, r.y + r.h - 10, 3, 3, C.gold2);
  }

  function progressDots(ctx, x, y, total, cur, gap, colDone, colNow) {
    gap = gap || 8;
    for (var i = 0; i < total; i++) {
      var col = i < cur ? (colDone || C.gold1) : (i === cur ? (colNow || C.gold3) : C.slate2);
      var s = i === cur ? 4 : 3;
      Art.px(ctx, x + i * gap, y - (i === cur ? 1 : 0), s, s, col);
    }
  }

  function wrapLines(text, size, w) { return PF.wrap(text || '', size, w); }

  /* 只画一行时用这个：折行后若有第二行被丢掉，结尾补省略号。
     否则玩家会以为那句话本来就说到这里 —— 配对题右列
     "女神的三神面向：少女、母亲、老妪" 被切成"…、老"，看着像原文就断在"老"。 */
  function clipLine(text, size, maxW) {
    var ls = wrapLines(text, size, maxW);
    if (ls.length <= 1) return text || '';
    var line = ls[0];
    while (line.length > 1 && PF.width(line + '…', size) > maxW) line = line.slice(0, -1);
    return line + '…';
  }

  // 知识卡弹出：显示 en 原文 + 中文释义 + 出处
  function cardBox(ctx, x, y, w, lines, size, col, lineH) {
    var h = lines.length * lineH + 12;
    Art.panel(ctx, x, y, w, h, { fill: 'rgba(6,14,20,0.96)', edge: C.teal3, inner: C.teal1, shadow: true });
    for (var i = 0; i < lines.length; i++) {
      PF.draw(ctx, lines[i], x + 8, y + 6 + i * lineH, size, i === 0 ? col : C.parch, {});
    }
    return h;
  }

  /* ============================ 对白 ============================ */
  /* 对话框：文字放大到 12px 档之后要重新算一遍纵向预算。
     可用正文宽 = 468 - (textLeft-DLG.x) - 16 = 372；12px 汉字整字宽，
     372/12 ≈ 31 字/行。最长的 narr/say 是 49 字 → 4 行；
     4×18 = 72，加 padY 11×2 = 94，取 96。y 相应上移到 168（底边仍落在 264）。 */
  var DLG = { x: 6, y: 168, w: 468, h: 96, padX: 96, padY: 11, lineH: 18, size: 12 };
  var POR_W = 72, POR_H = 84;

  var Dialogue = {
    draw: function (ctx, d, t, G) {
      var isThink = d.kind === 'think', isQuote = d.kind === 'quote';
      var top = isQuote ? DLG.y - 22 : DLG.y;
      var h = isQuote ? DLG.h + 22 : DLG.h;
      var edge = isThink ? C.vio3 : (isQuote ? C.teal3 : C.gold1);
      var inner = isThink ? C.vio1 : (isQuote ? C.teal1 : C.gold0);
      Art.panel(ctx, DLG.x, top, DLG.w, h, {
        fill: isThink ? 'rgba(22,14,40,0.95)' : (isQuote ? 'rgba(6,16,22,0.95)' : 'rgba(8,6,17,0.94)'),
        edge: edge, inner: inner, shadow: true
      });

      var textLeft = DLG.x + 14;
      var por = d.por ? Art.tex('por_' + d.por) : null;
      if (por) {
        // 立绘框
        Art.panel(ctx, DLG.x + 10, top + 8, POR_W + 4, h - 16, { fill: 'rgba(0,0,0,0.6)', edge: inner, inner: C.void1, innerShadow: true });
        ctx.drawImage(por, DLG.x + 12, top + 10, POR_W, Math.min(POR_H, h - 20));
        textLeft = DLG.x + 10 + POR_W + 14;
      }

      // 名牌
      if (d.name) {
        var nw = PF.width(d.name, 11) + 18;
        Art.panel(ctx, textLeft - 4, DLG.y - 11, nw, 16, { fill: 'rgba(46,30,10,0.97)', edge: C.gold2, inner: C.gold0 });
        PF.draw(ctx, d.name, textLeft + 5, DLG.y - 8, 11, C.gold4, { shadow: '#2a1400' });
      } else if (d.kind === 'think') {
        var lw = PF.width('心 声', 10) + 14;
        Art.panel(ctx, textLeft - 4, DLG.y - 10, lw, 15, { fill: 'rgba(30,18,54,0.97)', edge: C.vio2, inner: C.vio0 });
        PF.draw(ctx, '心 声', textLeft + 3, DLG.y - 7, 10, C.lav2, {});
      }

      var col = isThink ? C.lav2 : (d.kind === 'narr' ? C.parch : C.cream);
      if (isQuote) col = C.teal4;
      var size = isQuote ? 11 : DLG.size;
      var maxW = DLG.w - (textLeft - DLG.x) - 16;
      var budget = Math.floor(d.shown);   // ★ 取整：xs[小数] → NaN → drawImage 静默不画
      var baseY = (isQuote ? DLG.y - 12 : DLG.y) + DLG.padY;
      PF.drawLines(ctx, d.lines, textLeft, baseY, size, col, budget, DLG.lineH,
                   { shadow: '#000000' });

      if (isQuote && d.cite) {
        PF.draw(ctx, '—— ' + d.cite, DLG.x + DLG.w - 16, DLG.y + DLG.h - 15, 9, C.teal3, { align: 'right' });
      }
      /* 可点提示：整个对话框（含右侧空白）点了都有反应，但原来只在"字已打完"时
         才在右下角闪一下"空格 / 点击"，玩家在打字中途点右边空白区就会以为坏了。
         现在两个阶段都给明确反馈：还在打字 → "点击补全"；打完了 → "空格 / 点击"。 */
      var doneReveal = budget >= d.text.length;
      var blink = Math.sin(t * 5) > 0;
      if (blink) {
        var hint = doneReveal ? '空格 / 点击' : '点击补全';
        var hx = DLG.x + DLG.w - 12, hy = DLG.y + DLG.h - 15;
        Art.px(ctx, DLG.x + DLG.w - PF.width(hint, 9) - 24, hy - 3,
               PF.width(hint, 9) + 20, 14, 'rgba(0,0,0,0.45)');
        PF.draw(ctx, hint, hx, hy, 9, doneReveal ? C.gold2 : C.gray1, { align: 'right' });
        Art.px(ctx, hx - PF.width(hint, 9) - 8, hy - 1, 4, 4, doneReveal ? C.gold3 : C.silver2);
      }
      /* 边框呼吸：让"整块框都能点"这件事有视觉暗示（贴着面板内缘画一圈暗光） */
      if (blink) {
        var inset = 2;
        Art.px(ctx, DLG.x + inset, top + inset, DLG.w - inset * 2, 1, 'rgba(255,226,150,0.10)');
        Art.px(ctx, DLG.x + inset, top + h - inset - 1, DLG.w - inset * 2, 1, 'rgba(255,226,150,0.10)');
      }
      void G;
    }
  };

  /* ============================ 选择支 ============================ */
  var Choice = {
    layout: function (options) {
      var n = options.length;
      var boxW = 396, rowH = 26, promptH = 30;
      var boxH = promptH + n * rowH + 8;
      var x = (W - boxW) / 2, y = Math.max(12, 170 - boxH);
      return { x: x, y: y, w: boxW, h: boxH, rowH: rowH, promptH: promptH, n: n };
    },
    draw: function (ctx, ch, t) {
      var L = Choice.layout(ch.options);
      dimBackdrop(ctx, 0.32);
      Art.panel(ctx, L.x, L.y, L.w, L.h, { fill: 'rgba(8,6,17,0.96)', edge: C.gold2, inner: C.gold0, shadow: true });
      var pl = wrapLines(ch.prompt, 11, L.w - 24);
      for (var p = 0; p < pl.length && p < 2; p++) {
        PF.draw(ctx, pl[p], L.x + 10, L.y + 6 + p * 14, 11, C.lav2, { shadow: '#000' });
      }
      for (var i = 0; i < L.n; i++) {
        var ry = L.y + L.promptH + i * L.rowH, sel = i === ch.index;
        if (sel) {
          Art.px(ctx, L.x + 6, ry, L.w - 12, L.rowH - 4, 'rgba(200,152,44,0.22)');
          Art.rectOutline(ctx, L.x + 6, ry, L.w - 12, L.rowH - 4, C.gold1);
          var ax = L.x + 12 + (Math.sin(t * 6) > 0 ? 0 : 1);
          Art.px(ctx, ax, ry + 6, 1, 7, C.gold3);
          Art.px(ctx, ax + 1, ry + 7, 1, 5, C.gold3);
          Art.px(ctx, ax + 2, ry + 8, 1, 3, C.gold3);
        }
        var lines = wrapLines(ch.options[i].text, 11, L.w - 46);
        PF.draw(ctx, lines[0] || '', L.x + 22, ry + 5, 11, sel ? C.gold4 : C.parch, { shadow: '#000' });
      }
      PF.draw(ctx, '↑↓ 选择 · 回车确认', L.x + L.w - 10, L.y + L.h - 14, 9, C.gray0, { align: 'right' });
    },
    hitTest: function (ch, x, y) {
      var L = Choice.layout(ch.options);
      for (var i = 0; i < L.n; i++) {
        var ry = L.y + L.promptH + i * L.rowH;
        if (y > ry && y < ry + L.rowH - 2 && x > L.x && x < L.x + L.w) return i;
      }
      return -1;
    }
  };

  /* ============================ 试炼 ============================ */
  // 统一契约：state 里必须有 phase；draw 只读 state + def
  /* ---------------- 编排试炼（arrange）的公共几何 ----------------
     物件栏原来在 Trial.start 里写死 ix = 76 + k*40 / iy = 238，34px 的框从 238 一直排到
     272，而画布只有 270 高 —— 图标连同边框被裁掉大半，还压在页脚提示条上。
     现在统一在这里算，绘制和点击命中共用一份坐标，不会再各写一套。 */
  var ARRANGE_BAR_Y = 208, ARRANGE_BOX = 26, ARRANGE_GAP = 6, ARRANGE_X0 = 18;
  function arrangePending(def, S) {
    var out = [];
    for (var i = 0; i < def.items.length; i++) {
      if (!(S.placed && Object.prototype.hasOwnProperty.call(S.placed, def.items[i].id))) out.push(i);
    }
    return out;
  }
  function arrangeItemRect(q) {                       // q = 未放置物件里的序号
    return { x: ARRANGE_X0 + q * (ARRANGE_BOX + ARRANGE_GAP), y: ARRANGE_BAR_Y,
             w: ARRANGE_BOX, h: ARRANGE_BOX };
  }

  /* 描画试炼（trace）的节点坐标。原来这套 120 + x*240 / 70 + y*150 在绘制里抄了三遍、
     在命中测试里又抄了一遍，改一处忘一处就会"看着点在节点上、判定却没反应"。 */
  var TRACE_OX = 120, TRACE_OY = 80, TRACE_SX = 240, TRACE_SY = 150;
  function traceNodeXY(n) { return { x: TRACE_OX + n[0] * TRACE_SX, y: TRACE_OY + n[1] * TRACE_SY }; }

  var Trial = {
    state: null, onDone: null, def: null,

    start: function (def, cb) {
      this.def = def; this.onDone = cb;
      var S = {
        kind: def.kind, phase: 'play', t: 0,
        qi: 0, correct: 0, total: 0, wrong: [], hits: 0, miss: 0, perfect: 0,
        picked: -1, revealed: false, sel: 0, expect: 0, flash: 0, shake: 0,
        noteIdx: 0, notes: [], cursor: 0, combo: 0, bestCombo: 0,
        placed: {}, selItem: -1, revealAll: false, score: 0
      };
      if (def.kind === 'quiz') { S.total = def.questions.length; S.sel = 0; }
      else if (def.kind === 'multi') { S.total = 1; S.toggles = {}; }
      else if (def.kind === 'sort') { S.total = def.items.length; }
      else if (def.kind === 'match') { S.total = def.pairs.length; S.links = {}; S.selLeft = -1;
        S.rightOrder = Trial.shuffle(def.pairs.length, 20260921); }
      else if (def.kind === 'trace') { S.total = def.order.length; S.traced = []; S.hoverNode = -1; }
      else if (def.kind === 'rhythm') { S.total = (def.notes || []).length; S.t = 0; S.hitFlash = []; }
      else if (def.kind === 'arrange') { S.total = def.slots.length; S.selItem = -1; S.cursor = 0; }
      else if (def.kind === 'order') {
        // 正确顺序来自数据，展示顺序打乱；done 按真实下标累积
        S.total = def.items.length; S.done = []; S.missed = {}; S.sel = 0;
        S.shuffled = Trial.shuffle(def.items.length, 20260925);
      }
      else if (def.kind === 'breath') {
        S.total = def.cycles || 4; S.plan = Trial.breathPlan(def);
        S.bt = 0; S.holding = false; S.started = false; S.goodT = 0; S.allT = 0;
      }
      this.state = S;
      return S;
    },

    shuffle: function (n, seed) {
      var rng = Art.makeRng(seed), a = [];
      for (var i = 0; i < n; i++) a.push(i);
      for (var j = n - 1; j > 0; j--) { var k = (rng() * (j + 1)) | 0; var tmp = a[j]; a[j] = a[k]; a[k] = tmp; }
      return a;
    },

    /* ---------------- 键盘 ---------------- */
    key: function (act) {
      var S = this.state;
      if (!S) return;
      if (S.phase === 'result') { if (act === 'confirm') this.finish(); return; }
      if (S.phase === 'feedback') { if (act === 'confirm') this.nextItem(); return; }
      var k = S.kind;
      if (k === 'quiz') this.keyQuiz(S, act);
      else if (k === 'multi') this.keyMulti(S, act);
      else if (k === 'sort') this.keySort(S, act);
      else if (k === 'match') this.keyMatch(S, act);
      else if (k === 'trace') this.keyTrace(S, act);
      else if (k === 'rhythm') this.keyRhythm(S, act);
      else if (k === 'arrange') this.keyArrange(S, act);
      else if (k === 'order') this.keyOrder(S, act);
      else if (k === 'breath') this.keyBreath(S, act);
    },

    click: function (x, y) {
      var S = this.state;
      if (!S) return;
      if (S.phase === 'result') { this.finish(); return; }
      if (S.phase === 'feedback') { this.nextItem(); return; }
      var k = S.kind;
      if (k === 'quiz') this.clickQuiz(S, x, y);
      else if (k === 'multi') this.clickMulti(S, x, y);
      else if (k === 'sort') this.clickSort(S, x, y);
      else if (k === 'match') this.clickMatch(S, x, y);
      else if (k === 'trace') this.clickTrace(S, x, y);
      else if (k === 'rhythm') this.keyRhythm(S, 'confirm');
      else if (k === 'arrange') this.clickArrange(S, x, y);
      else if (k === 'order') this.clickOrder(S, x, y);
      else if (k === 'breath') { if (S.holding) this.keyBreath(S, 'release'); else this.keyBreath(S, 'confirm'); }
    },

    move: function (x, y) {
      var S = this.state;
      if (!S) return;
      if (S.kind === 'trace') {
        var n = Trial.nodeAt(S, x, y);
        S.hoverNode = n;
      } else if (S.kind === 'arrange') {
        S.hoverSlot = -1;
        var slots = this.def.slots;
        for (var i = 0; i < slots.length; i++) {
          if (Math.abs(x - slots[i].x) < 26 && Math.abs(y - slots[i].y) < 20) S.hoverSlot = i;
        }
      }
    },

    /* ---------------- 结果 ---------------- */
    finish: function () {
      var S = this.state, def = this.def;
      var acc = S.total ? (S.correct / S.total) : 1;
      var rank = acc >= 1 ? 'S' : acc >= 0.85 ? 'A' : acc >= 0.65 ? 'B' : acc >= 0.4 ? 'C' : 'D';
      var score = S.correct + '/' + S.total;
      var cb = this.onDone;
      this.state = null; this.onDone = null;
      if (cb) cb({ success: acc >= 0.5, score: score, rank: rank, accuracy: acc, wrong: S.wrong, hits: S.hits, total: S.total });
      void def;
    },

    nextItem: function () {
      var S = this.state, def = this.def;
      S.phase = 'play';          // ★ 必须先回到 play：否则讲解页会一直挂着不再出现
      if (S.kind === 'quiz') {
        S.qi++;
        S.picked = -1; S.revealed = false; S.sel = 0;
        if (S.qi >= def.questions.length) S.phase = 'result';
      } else if (S.kind === 'multi') {
        S.phase = 'result';
      } else if (S.kind === 'sort') {
        S.qi++;
        S.revealed = false; S.sel = 0;
        if (S.qi >= def.items.length) S.phase = 'result';
      } else if (S.kind === 'match') {
        S.revealed = false; S.selLeft = -1;
        if (Object.keys(S.links).length >= def.pairs.length) S.phase = 'result';
      } else if (S.kind === 'trace') {
        S.phase = 'result';
      } else if (S.kind === 'rhythm') {
        S.phase = 'result';
      } else if (S.kind === 'arrange') {
        S.phase = 'result';
      }
      if (S.phase === 'result') Sound.sfx('chime');
    },

    /* ---------------- 判分工具 ---------------- */
    mark: function (S, ok, wrongEntry) {
      S.total = S.total || 1;
      S.lastOk = !!ok;           // ★ 讲解页靠它决定显示"答对了"还是"再看看原文"
      if (ok) { S.correct++; Sound.sfx('correct'); S.flash = 0.5; }
      else { if (wrongEntry) S.wrong.push(wrongEntry); Sound.sfx('wrong'); S.shake = 0.4; }
    },

    /* ================= 玩法 1：单选问答（多题连答） ================= */
    keyQuiz: function (S, act) {
      var q = this.def.questions[S.qi];
      if (!q) return;
      if (act === 'up') { S.sel = (S.sel + q.options.length - 1) % q.options.length; Sound.sfx('select'); }
      else if (act === 'down') { S.sel = (S.sel + 1) % q.options.length; Sound.sfx('select'); }
      else if (act === 'confirm' && S.picked < 0) this.answerQuiz(S, S.sel);
    },
    clickQuiz: function (S, x, y) {
      if (S.picked >= 0) { this.nextItem(); return; }
      var a = this.quizLayout(S);
      for (var i = 0; i < a.rows.length; i++) {
        if (x > a.x && x < a.x + a.w && y > a.rows[i] && y < a.rows[i] + 22) { S.sel = i; this.answerQuiz(S, i); return; }
      }
    },
    answerQuiz: function (S, i) {
      var q = this.def.questions[S.qi];
      S.picked = i; S.revealed = true;
      S.combo = (i === q.answer) ? S.combo + 1 : 0;
      this.mark(S, i === q.answer, { q: q.q, right: q.options[q.answer], mine: q.options[i], explain: q.explain, src: q.src });
      S.phase = 'feedback';      // ★ 进讲解页；漏了这句 => 键盘/空格永远翻不到下一题
    },
    quizLayout: function (S) {
      var q = this.def.questions[S.qi];
      var n = q.options.length;
      var w = 420, x = (W - w) / 2, y = 74;
      /* 题干面板的高度是随折行数变的（22 + 行数*15），选项行不能再写死 y+26 ——
         题干占两行时，选项卡片会直接压住题干面板的下边框。改成从题干底部往下排，
         行距再按剩余空间自适应，题目选项多（5 个）时也不会撞到页脚提示条(239)。 */
      var qH = 22 + Math.max(1, wrapLines(q.q, 12, w - 16).length) * 15;
      var top = y + qH + 10, yEnd = 222;
      var rowH = Math.min(25, Math.max(18, Math.floor((yEnd - top) / Math.max(1, n))));
      var rows = [];
      for (var i = 0; i < n; i++) rows.push(top + i * rowH);
      return { x: x, y: y, w: w, rows: rows, n: n, qH: qH, rowH: rowH };
    },
    drawQuiz: function (ctx, S, def, t) {
      var q = def.questions[S.qi];
      if (!q) return;
      var a = this.quizLayout(S);
      var ql = wrapLines(q.q, 12, a.w - 16);
      Art.panel(ctx, a.x, a.y, a.w, a.qH, { fill: 'rgba(20,15,36,0.94)', edge: C.gold0, inner: C.brown1 });
      for (var i = 0; i < ql.length; i++) PF.draw(ctx, ql[i], a.x + 10, a.y + 6 + i * 15, 12, C.cream, { shadow: '#000' });
      for (var r = 0; r < a.n; r++) {
        var ry = a.rows[r], isAns = r === q.answer, isPick = r === S.picked;
        var edge = C.slate2, fill = 'rgba(12,10,24,0.9)', col = C.parch;
        if (S.revealed) {
          if (isAns) { edge = C.green3; fill = 'rgba(14,44,24,0.94)'; col = C.green4; }
          else if (isPick) { edge = C.red3; fill = 'rgba(52,12,14,0.94)'; col = C.red4; }
        } else if (r === S.sel) { edge = C.gold3; fill = 'rgba(56,40,12,0.94)'; col = C.gold4; }
        Art.panel(ctx, a.x, ry, a.w, a.rowH - 3, { fill: fill, edge: edge, inner: Art.mix(edge, '#000', 0.5) });
        PF.draw(ctx, 'ABCD'[r] + '.', a.x + 8, ry + 5, 11, edge, {});
        PF.draw(ctx, clipLine(q.options[r], 11, a.w - 44), a.x + 32, ry + 5, 11, col, { shadow: '#000' });
      }
      if (S.revealed) {
        PF.draw(ctx, '空格 / 点击 继续', a.x + a.w, 226, 9, C.gold2, { align: 'right' });
      }
    },

    /* ================= 玩法 2：多选 ================= */
    keyMulti: function (S, act) {
      var n = this.def.options.length;
      if (act === 'up') { S.sel = (S.sel + n - 1) % n; Sound.sfx('select'); }
      else if (act === 'down') { S.sel = (S.sel + 1) % n; Sound.sfx('select'); }
      else if (act === 'confirm') {
        if (!S.revealed) {
          S.toggles[S.sel] = !S.toggles[S.sel]; Sound.sfx('tick');
        }
      } else if (act === 'submit') {
        if (!S.revealed) this.answerMulti(S);
      }
    },
    clickMulti: function (S, x, y) {
      var a = this.multiLayout(S);
      if (S.revealed) { this.nextItem(); return; }
      for (var i = 0; i < a.rows.length; i++) {
        if (x > a.x && x < a.x + a.w && y > a.rows[i] && y < a.rows[i] + a.rowH - 4) { S.sel = i; S.toggles[i] = !S.toggles[i]; Sound.sfx('tick'); return; }
      }
      if (y > a.btnY && y < a.btnY + 20) this.answerMulti(S);
    },
    multiLayout: function (S) {
      var n = this.def.options.length;
      var w = 400, x = (W - w) / 2, y = 48;          // 顶到标题条下面就开始，别再往下压
      var fs = n >= 6 ? 10 : 11;                     // 选项多时缩一号，换回一行的高度
      var qH = 22 + Math.max(1, wrapLines(this.def.q, 12, w - 16).length) * 15;
      var top = y + qH + 14;                         // 14 留给"已选 x（可多选）· 按 S 提交"那行
      var btnH = 20, GAP = 8, btnMax = 216;
      var avail = btnMax - GAP - top;
      var rowH = Math.max(fs + 6, Math.min(24, Math.floor(avail / Math.max(1, n))));
      var rows = [];
      for (var i = 0; i < n; i++) rows.push(top + i * rowH);
      // 按钮跟着选项走，但不越过 btnMax —— 原来 btnY = y+30+n*24+8，
      // 6 个选项时算出来 252，按钮 252..272 直接跑出 270 的画布和主面板外框。
      return { x: x, y: y, w: w, rows: rows, n: n, qH: qH, rowH: rowH, fs: fs,
               statusY: y + qH + 2,
               btnY: Math.min(btnMax, top + n * rowH + GAP) };
    },
    answerMulti: function (S) {
      var def = this.def, ans = def.answers.slice().sort().join(',');
      var mine = Object.keys(S.toggles).filter(function (k) { return S.toggles[k]; }).map(Number).sort().join(',');
      S.revealed = true;
      var ok = ans === mine;
      S.total = 1;
      var missing = def.answers.filter(function (i) { return mine.indexOf(String(i)) < 0; })
                              .map(function (i) { return def.options[i]; });
      var extra = Object.keys(S.toggles).filter(function (k) { return S.toggles[k] && def.answers.indexOf(+k) < 0; })
                              .map(function (k) { return def.options[+k]; });
      this.mark(S, ok, { q: def.q, right: def.answers.map(function (i) { return def.options[i]; }).join(' / '),
                         mine: (mine ? mine.split(',').map(function (i) { return def.options[+i]; }).join(' / ') : '（未选）'),
                         explain: def.explain, src: def.src, missing: missing, extra: extra });
      S.phase = 'feedback';      // ★ 进讲解页
    },
    drawMulti: function (ctx, S, def, t) {
      var a = this.multiLayout(S);
      var ql = wrapLines(def.q, 12, a.w - 16);
      Art.panel(ctx, a.x, a.y, a.w, a.qH, { fill: 'rgba(20,15,36,0.94)', edge: C.gold0, inner: C.brown1 });
      for (var i = 0; i < ql.length; i++) PF.draw(ctx, ql[i], a.x + 10, a.y + 7 + i * 15, 12, C.cream, { shadow: '#000' });
      // 这一行原来画在 a.y + a.h - 8，可 a.h 在 layout 里压根不存在 → NaN → 回退 a.y+20，
      // 正好落进题干面板里压在题干上。改成画在题干面板下方那条留白里。
      PF.draw(ctx, S.revealed ? '已提交' : '已选 ' + Object.keys(S.toggles).filter(function (k) { return S.toggles[k]; }).length +
              ' 项（可多选）· 按 S 提交', a.x + a.w - 8, a.statusY, 9, C.lav1, { align: 'right' });
      for (var r = 0; r < a.n; r++) {
        var ry = a.rows[r], on = !!S.toggles[r], isAns = def.answers.indexOf(r) >= 0;
        var edge = on ? C.gold3 : C.slate2, col = on ? C.gold4 : C.parch;
        if (S.revealed) {
          if (isAns) { edge = C.green3; col = C.green4; }
          else if (on) { edge = C.red3; col = C.red4; }
          else { edge = C.slate1; col = C.gray0; }
        } else if (r === S.sel) edge = C.gold2;
        Art.panel(ctx, a.x, ry, a.w, a.rowH - 4, { fill: 'rgba(12,10,24,0.9)', edge: edge, inner: Art.mix(edge, '#000', 0.5) });
        // 勾选框
        var cy = ry + Math.floor((a.rowH - 4 - 10) / 2);
        Art.px(ctx, a.x + 7, cy, 10, 10, 'rgba(0,0,0,0.7)');
        Art.rectOutline(ctx, a.x + 7, cy, 10, 10, edge);
        if (on || (S.revealed && isAns)) {
          Art.px(ctx, a.x + 9, cy + 7, 2, 1, C.green4); Art.px(ctx, a.x + 11, cy + 6, 2, 1, C.green4);
          Art.px(ctx, a.x + 13, cy + 3, 2, 1, C.green4); Art.px(ctx, a.x + 13, cy + 4, 1, 1, C.green4);
        }
        PF.draw(ctx, clipLine(def.options[r], a.fs, a.w - 46), a.x + 24,
                ry + Math.max(1, Math.floor((a.rowH - 4 - a.fs - 2) / 2)), a.fs, col, { shadow: '#000' });
      }
      var canSubmit = !S.revealed && Object.keys(S.toggles).some(function (k) { return S.toggles[k]; });
      Art.button(ctx, a.x + a.w - 84, a.btnY, 84, 20, '提 交', S.revealed ? 'off' : (canSubmit ? 'sel' : 'idle'), t);
    },

    /* ================= 玩法 3：分类投箱 ================= */
    keySort: function (S, act) {
      var n = this.def.bins.length;
      if (act === 'left' || act === 'up') { S.sel = (S.sel + n - 1) % n; Sound.sfx('select'); }
      else if (act === 'right' || act === 'down') { S.sel = (S.sel + 1) % n; Sound.sfx('select'); }
      else if (act === 'confirm') { if (!S.revealed) this.answerSort(S, S.sel); }
    },
    clickSort: function (S, x, y) {
      if (S.revealed) { this.nextItem(); return; }
      var a = this.sortLayout(S);
      for (var i = 0; i < a.bins.length; i++) {
        var b = a.bins[i];
        if (x > b.x && x < b.x + b.w && y > b.y && y < b.y + b.h) { S.sel = i; this.answerSort(S, i); return; }
      }
    },
    sortLayout: function (S) {
      var n = this.def.bins.length, bw = Math.floor(420 / n) - 8;
      var bins = [], startX = (W - (bw + 8) * n + 8) / 2;
      for (var i = 0; i < n; i++) bins.push({ x: startX + i * (bw + 8), y: 168, w: bw, h: 56 });
      return { bins: bins, cardY: 96, cardW: 340 };
    },
    answerSort: function (S, i) {
      var it = this.def.items[S.qi], bin = this.def.bins[i];
      S.revealed = true; S.picked = i;
      this.mark(S, bin.id === it.bin, { q: it.text, right: (this.def.bins.filter(function (b) { return b.id === it.bin; })[0] || {}).label,
                                        mine: bin.label, explain: it.why || this.def.explain, src: it.src || this.def.src });
      S.phase = 'feedback';      // ★ 进讲解页
    },
    drawSort: function (ctx, S, def, t) {
      var a = this.sortLayout(S), it = def.items[S.qi];
      if (!it) return;
      // 卡片
      var cl = wrapLines(it.text, 12, a.cardW - 24);
      var ch = Math.max(50, cl.length * 17 + 22);
      var cx = (W - a.cardW) / 2;
      Art.panel(ctx, cx, a.cardY, a.cardW, ch, { fill: 'rgba(26,20,44,0.96)', edge: C.gold2, inner: C.gold0, shadow: true });
      PF.draw(ctx, '第 ' + (S.qi + 1) + ' / ' + def.items.length + ' 条', cx + 10, a.cardY + 5, 9, C.lav1, {});
      for (var i = 0; i < cl.length; i++) PF.draw(ctx, cl[i], cx + 12, a.cardY + 19 + i * 17, 12, C.cream, { shadow: '#000' });
      // 箱子
      for (var b = 0; b < a.bins.length; b++) {
        var B = a.bins[b], sel = b === S.sel, bin = def.bins[b];
        var isAns = S.revealed && bin.id === it.bin, isPick = S.revealed && b === S.picked;
        var edge = isAns ? C.green3 : (isPick ? C.red3 : (sel ? C.gold3 : C.slate2));
        Art.panel(ctx, B.x, B.y, B.w, B.h, {
          fill: isAns ? 'rgba(12,42,24,0.95)' : (isPick ? 'rgba(50,12,14,0.95)' : (sel ? 'rgba(52,38,12,0.95)' : 'rgba(12,10,24,0.9)')),
          edge: edge, inner: Art.mix(edge, '#000', 0.5), innerShadow: true
        });
        var ll = wrapLines(bin.label, 11, B.w - 14);
        for (var k = 0; k < ll.length && k < 3; k++) {
          PF.draw(ctx, ll[k], B.x + B.w / 2, B.y + 10 + k * 15, 11, isAns ? C.green4 : (sel ? C.gold4 : C.parch), { align: 'center' });
        }
        if (bin.tip && !S.revealed) PF.draw(ctx, bin.tip, B.x + B.w / 2, B.y + B.h - 13, 8, C.gray0, { align: 'center' });
      }
      if (S.revealed) PF.draw(ctx, '空格 / 点击 继续', W / 2, a.cardY + ch + 8, 9, C.gold2, { align: 'center' });
      void t;
    },

    /* ================= 玩法 4：配对 ================= */
    keyMatch: function (S, act) {
      var n = this.def.pairs.length;
      if (act === 'up') { S.sel = (S.sel + n - 1) % n; Sound.sfx('select'); }
      else if (act === 'down') { S.sel = (S.sel + 1) % n; Sound.sfx('select'); }
      else if (act === 'confirm') {
        if (S.selLeft < 0) { S.selLeft = S.sel; Sound.sfx('tick'); }
        else { this.linkMatch(S, S.selLeft, S.sel); }
      }
    },
    clickMatch: function (S, x, y) {
      var a = this.matchLayout(S);
      for (var i = 0; i < a.left.length; i++) {
        if (this.inRow(x, y, a.left[i])) {
          if (S.links[i] !== undefined) return;
          if (S.selLeft < 0) { S.selLeft = i; Sound.sfx('tick'); }
          else if (S.selLeft === i) S.selLeft = -1;
          else this.linkMatch(S, S.selLeft, i);
          return;
        }
      }
      for (var j = 0; j < a.right.length; j++) {
        if (this.inRow(x, y, a.right[j])) {
          if (S.links[S.selLeft] !== undefined) return;
          if (S.selLeft < 0) return;
          this.linkMatch(S, S.selLeft, j);
          return;
        }
      }
      if (S.revealed && y > a.footY) this.nextItem();
    },
    inRow: function (x, y, r) { return x > r.x && x < r.x + r.w && y > r.y && y < r.y + r.h; },
    matchLayout: function (S) {
      var n = this.def.pairs.length;
      var lx = 40, rx = 268, rw = 174, lw = 174;
      /* 纵向预算。上边界让开"把左边和右边…"(y=44, 11px) 与"已配对 x/n"(y=58, 9px)：
         原来 y0 写死 62，计数行正好糊在第一行卡片上。
         下边界让开底部"空格 / 点击 继续"(226) 与页脚提示条(239 起)。
         行高按可用空间均分，而不是 min(26, 120/n) —— 8 对时每行只有 15px，
         右列"女神的三神面向：少女、母亲、老妪"连第二行都放不下。 */
      var y0 = 74, yEnd = 222;
      var rowH = Math.max(13, Math.min(26, Math.floor((yEnd - y0) / Math.max(1, n))));
      var total = n * rowH;
      var top = y0 + Math.max(0, Math.floor((yEnd - y0 - total) / 2));   // 对少时整体居中，别都堆在顶上
      var left = [], right = [];
      for (var i = 0; i < n; i++) {
        left.push({ x: lx, y: top + i * rowH, w: lw, h: rowH - 3, i: i });
        right.push({ x: rx, y: top + i * rowH, w: rw, h: rowH - 3, i: i });
      }
      return { left: left, right: right, lx: lx, rx: rx, lw: lw, rw: rw, rowH: rowH,
               y0: top, footY: top + total + 4 };
    },
    linkMatch: function (S, l, r) {
      // r 是右侧显示行的下标；真实配对是 def.pairs[S.rightOrder[r]]
      var realRight = S.rightOrder[r];
      S.links[l] = r;
      S.total = this.def.pairs.length;
      var ok = (realRight === l);
      S.revealed = false; S.selLeft = -1;
      if (ok) { S.correct++; Sound.sfx('correct'); S.flash = 0.4; }
      else {
        Sound.sfx('wrong'); S.shake = 0.35;
        S.wrong.push({ q: this.def.pairs[l].left, right: this.def.pairs[l].right,
                       mine: this.def.pairs[realRight].right,
                       explain: this.def.pairs[l].note || this.def.explain, src: this.def.src });
        delete S.links[l];
      }
      if (Object.keys(S.links).length >= this.def.pairs.length) { S.phase = 'result'; Sound.sfx('chime'); }
    },
    drawMatch: function (ctx, S, def, t) {
      var a = this.matchLayout(S);
      PF.draw(ctx, '把左边和右边正确的一对连起来', W / 2, 44, 11, C.lav1, { align: 'center' });
      PF.draw(ctx, '已配对 ' + Object.keys(S.links).length + ' / ' + def.pairs.length, W / 2, 58, 9, C.gold2, { align: 'center' });
      for (var i = 0; i < a.left.length; i++) {
        var L = a.left[i], done = S.links[i] !== undefined;
        var sel = (i === S.selLeft) || (S.sel === i && S.selLeft < 0);
        var edge = done ? C.green3 : (sel ? C.gold3 : C.slate2);
        Art.panel(ctx, L.x, L.y, L.w, L.h, { fill: done ? 'rgba(12,42,24,0.9)' : 'rgba(14,11,26,0.9)', edge: edge, inner: Art.mix(edge, '#000', 0.5) });
        PF.draw(ctx, clipLine(def.pairs[i].left, 11, L.w - 14), L.x + 7, L.y + (L.h - 13) / 2, 11, done ? C.green4 : (sel ? C.gold4 : C.parch), {});
      }
      for (var j = 0; j < a.right.length; j++) {
        var R = a.right[j], real = S.rightOrder[j];
        var used = false;
        for (var k in S.links) if (S.links.hasOwnProperty(k) && S.links[k] === j) used = true;
        var e2 = used ? C.green3 : C.slate2;
        Art.panel(ctx, R.x, R.y, R.w, R.h, { fill: used ? 'rgba(12,42,24,0.9)' : 'rgba(14,11,26,0.9)', edge: e2, inner: Art.mix(e2, '#000', 0.5) });
        PF.draw(ctx, clipLine(def.pairs[real].right, 10, R.w - 14), R.x + 7, R.y + (R.h - 12) / 2, 10, used ? C.green4 : C.parch, {});
      }
      // 连线
      for (var m in S.links) if (S.links.hasOwnProperty(m)) {
        var y1 = a.left[+m].y + a.left[+m].h / 2, y2 = a.right[S.links[m]].y + a.right[S.links[m]].h / 2;
        Art.line(ctx, a.lx + a.lw + 2, y1, a.rx - 2, y2, C.green3);
      }
      if (S.phase === 'result' || Object.keys(S.links).length >= def.pairs.length) {
        // 固定 226（页脚提示条 239 之前），不跟着 footY 走 —— 跟着走的话 8 对时会被推到页脚条上
        PF.draw(ctx, '空格 / 点击 继续', W / 2, 226, 9, C.gold2, { align: 'center' });
      }
      void t;
    },

    /* ================= 玩法 5：描画（按顺序点节点） ================= */
    nodeAt: function (S, x, y) {
      var nodes = this.def.nodes;
      for (var i = 0; i < nodes.length; i++) {
        var np = traceNodeXY(nodes[i]);
        if (Math.abs(x - np.x) < 14 && Math.abs(y - np.y) < 14) return i;
      }
      return -1;
    },
    keyTrace: function (S, act) {
      var n = this.def.nodes.length;
      if (act === 'up' || act === 'left') { S.sel = (S.sel + n - 1) % n; Sound.sfx('select'); }
      else if (act === 'down' || act === 'right') { S.sel = (S.sel + 1) % n; Sound.sfx('select'); }
      else if (act === 'confirm') this.pickTrace(S, S.sel);
    },
    clickTrace: function (S, x, y) {
      var i = this.nodeAt(S, x, y);
      if (i >= 0) { S.sel = i; this.pickTrace(S, i); return; }
      if (S.phase === 'result' || S.traced.length >= this.def.order.length) this.nextItem();
    },
    pickTrace: function (S, i) {
      if (S.traced.length >= this.def.order.length) { this.nextItem(); return; }
      var want = this.def.order[S.traced.length];
      S.total = this.def.order.length;
      if (i === want) {
        S.traced.push(i);
        S.correct = S.traced.length;
        Sound.sfx(S.traced.length === this.def.order.length ? 'magic' : 'tick');
        S.flash = 0.3;
        if (S.traced.length >= this.def.order.length) { S.phase = 'result'; Sound.sfx('chime'); }
      } else {
        Sound.sfx('wrong'); S.shake = 0.32;
        S.wrong.push({ q: '第 ' + (S.traced.length + 1) + ' 笔的落点', right: '节点 ' + (want + 1),
                       mine: '节点 ' + (i + 1), explain: this.def.explain, src: this.def.src });
      }
    },
    drawTrace: function (ctx, S, def, t) {
      var r = screenFrame(ctx, def.title || '试炼 · 描画', '', t, { y: 14, h: H - 28 });
      PF.draw(ctx, def.caption || '照着口诀，按顺序点出每一笔', r.cx, r.y + 26, 10, C.lav1, { align: 'center' });
      var nodes = def.nodes;
      // 已连的线
      for (var k = 1; k < S.traced.length; k++) {
        var p = traceNodeXY(nodes[S.traced[k - 1]]), q = traceNodeXY(nodes[S.traced[k]]);
        Art.line(ctx, p.x, p.y, q.x, q.y, C.gold2);
      }
      // 若已完成，闭合
      if (S.traced.length >= def.order.length && def.close) {
        var f = traceNodeXY(nodes[S.traced[0]]), l = traceNodeXY(nodes[S.traced[S.traced.length - 1]]);
        Art.line(ctx, l.x, l.y, f.x, f.y, C.gold2);
      }
      for (var i = 0; i < nodes.length; i++) {
        var np = traceNodeXY(nodes[i]), nx = np.x, ny = np.y;
        var done = S.traced.indexOf(i) >= 0, isNext = (S.traced.length < def.order.length && def.order[S.traced.length] === i);
        var hover = i === S.hoverNode, sel = i === S.sel;
        var col = done ? C.gold3 : (isNext && def.showNext ? C.green4 : C.silver1);
        if (!def.showNext && !done) col = C.silver1;
        if (sel && !done) { Art.ring(ctx, nx, ny, 8, C.gold2, 1); }
        if (isNext && !done && Math.sin(t * 6) > 0) Art.glow(ctx, nx, ny, 12, C.gold2, 0.45);
        Art.disc(ctx, nx, ny, hover ? 5 : 4, col);
        Art.ring(ctx, nx, ny, hover ? 5 : 4, C.brown0, 1);
        Art.px(ctx, nx - 1, ny - 1, 2, 2, done ? C.brown0 : C.void0);
        if (done) {
          var ord = S.traced.indexOf(i) + 1;
          PF.draw(ctx, String(ord), nx, ny - 20, 9, C.gold2, { align: 'center' });
        }
      }
      PF.draw(ctx, '已落 ' + S.traced.length + ' / ' + def.order.length + ' 笔', r.cx, r.y + r.h - 34, 10, C.parch, { align: 'center' });
      footerHint(ctx, r, '方向键移动光标 · 回车落点 · 鼠标可直接点', t);
    },

    /* ================= 玩法 6：鼓点（节奏） ================= */
    keyRhythm: function (S, act) {
      if (S.phase !== 'play') { if (act === 'confirm') this.nextItem(); return; }
      if (act !== 'confirm') return;
      // 判定离判定线最近的那颗未判定的音符
      var def = this.def, lineX = 400, best = -1, bd = 1e9;
      for (var i = 0; i < S.notes.length; i++) {
        var n = S.notes[i];
        if (n.judged) continue;
        var d = Math.abs(n.x - lineX);
        if (d < bd) { bd = d; best = i; }
      }
      if (best < 0) return;
      var n2 = S.notes[best];
      var win = def.window || 26;
      if (bd <= win * 0.42) { n2.judged = 'perfect'; S.perfect++; S.hits++; S.correct++; S.combo++; Sound.sfx('spark'); }
      else if (bd <= win) { n2.judged = 'good'; S.hits++; S.correct++; S.combo++; Sound.sfx('drum'); }
      else {
        n2.judged = 'miss'; S.miss++; S.combo = 0; Sound.sfx('fail');
        S.wrong.push({ q: '鼓点 ' + (best + 1), right: '在鼓面经过标记时敲击', mine: '早了或晚了',
                       explain: def.explain, src: def.src });
      }
      S.bestCombo = Math.max(S.bestCombo, S.combo);
      S.hitFlash.push({ t: 0, kind: n2.judged });
    },
    drawRhythm: function (ctx, S, def, t) {
      var r = screenFrame(ctx, def.title || '试炼 · 鼓与神游', '', t, { y: 14, h: H - 28 });
      PF.draw(ctx, def.caption || '鼓面经过标记时敲击空格', r.cx, r.y + 26, 10, C.lav1, { align: 'center' });
      var lineX = 400, trackY = r.y + 84, trackH = 30, TRACK_X = 60, TRACK_W = 372;
      // 轨道
      Art.px(ctx, TRACK_X, trackY, TRACK_W, trackH, 'rgba(0,0,0,0.5)');
      Art.rectOutline(ctx, TRACK_X, trackY, TRACK_W, trackH, C.brown1);
      // 判定线
      Art.px(ctx, lineX, trackY - 8, 2, trackH + 16, C.gold3);
      Art.px(ctx, lineX - 1, trackY - 8, 4, 2, C.gold3);
      Art.px(ctx, lineX - 1, trackY + trackH + 6, 4, 2, C.gold3);
      // 精度窗口
      ctx.globalAlpha = 0.16;
      Art.px(ctx, lineX - (def.window || 26), trackY, (def.window || 26) * 2, trackH, C.green3);
      ctx.globalAlpha = 1;
      // 音符。裁剪范围原来写的是 n.x > W（画布右缘 480），可轨道只到 432，
      // 于是音符会飘到轨道外面、甚至越过整页画框的右边框。
      for (var i = 0; i < S.notes.length; i++) {
        var n = S.notes[i];
        if (n.x < TRACK_X || n.x > TRACK_X + TRACK_W) continue;
        var col = n.judged === 'perfect' ? C.gold3 : n.judged === 'good' ? C.green4
                : n.judged === 'miss' ? C.red2 : C.parch;
        Art.panel(ctx, n.x - 9, trackY + 6, 18, 18, { fill: n.judged ? 'rgba(20,16,30,0.5)' : 'rgba(40,28,10,0.95)', edge: col, inner: Art.mix(col, '#000', 0.5) });
        Art.icon(ctx, 'star', n.x - 8, trackY + 7, 1, col);
        if (n.x > 380 && !n.judged) Art.glow(ctx, n.x, trackY + 15, 14, C.gold2, 0.30);
      }
      // 判定文字
      for (var f = S.hitFlash.length - 1; f >= 0; f--) {
        var o = S.hitFlash[f];
        if (o.t > 0.7) { S.hitFlash.splice(f, 1); continue; }
        var label = o.kind === 'perfect' ? '完 美' : o.kind === 'good' ? '良 好' : '错 过';
        ctx.globalAlpha = 1 - o.t / 0.7;
        PF.draw(ctx, label, lineX, trackY - 26 - o.t * 14, 11,
                o.kind === 'perfect' ? C.gold4 : o.kind === 'good' ? C.green4 : C.red3, { align: 'center' });
        ctx.globalAlpha = 1;
      }
      // 神游槽
      var ratio = S.total ? (S.hits / S.total) : 0;
      PF.draw(ctx, '神游', 62, r.y + r.h - 52, 10, C.lav1, {});
      Art.bar(ctx, 96, r.y + r.h - 52, 300, 10, ratio, ratio > 0.75 ? C.gold3 : C.teal3, C.void1);
      PF.draw(ctx, Math.round(ratio * 100) + '%', 404, r.y + r.h - 52, 10, C.gold3, {});
      if (S.combo > 1) PF.draw(ctx, '连击 ×' + S.combo, r.cx, r.y + r.h - 70, 12, C.ember, { align: 'center' });
      footerHint(ctx, r, '空格 / 点击 敲鼓 · 看着鼓面经过金色标记时下手', t);
      void t;
    },

    /* ================= 玩法 7：布置（点击放置） ================= */
    // ★ S.placed[id] 存的是槽位下标，而 0 是假值 —— 用真值判断会把"放在 0 号槽"
    //   误当成"还没放"，于是键盘自动取件永远拿到同一件、点击也跳不过已放的物件。
    hasPlaced: function (S, id) {
      return S.placed && Object.prototype.hasOwnProperty.call(S.placed, id);
    },
    keyArrange: function (S, act) {
      if (S.phase === 'result') { this.nextItem(); return; }
      var n = this.def.slots.length;
      if (act === 'left') { S.cursor = (S.cursor + n - 1) % n; Sound.sfx('select'); }
      else if (act === 'right') { S.cursor = (S.cursor + 1) % n; Sound.sfx('select'); }
      else if (act === 'confirm') {
        if (S.selItem < 0) {
          // 在空槽上按回车：自动取下一个未放置的物件（键盘通路）
          var items = this.def.items, i;
          for (i = 0; i < items.length; i++) if (!this.hasPlaced(S, items[i].id)) { S.selItem = i; break; }
          if (S.selItem >= 0) Sound.sfx('tick');
        } else {
          this.placeArrange(S, S.cursor);
        }
      }
    },
    clickArrange: function (S, x, y) {
      if (S.phase === 'result') { this.nextItem(); return; }
      var def = this.def, i;
      var pend = arrangePending(def, S);
      for (var q = 0; q < pend.length; q++) {
        var rc = arrangeItemRect(q);
        if (x > rc.x && x < rc.x + rc.w && y > rc.y && y < rc.y + rc.h) { S.selItem = pend[q]; Sound.sfx('tick'); return; }
      }
      for (i = 0; i < def.slots.length; i++) {
        var s = def.slots[i];
        if (Math.abs(x - s.x) < 28 && Math.abs(y - s.y) < 22) {
          if (S.selItem < 0) return;
          S.cursor = i;
          this.placeArrange(S, i);
          return;
        }
      }
    },
    placeArrange: function (S, si) {
      var def = this.def, slot = def.slots[si], item = def.items[S.selItem];
      S.total = def.slots.length;
      if (this.hasPlaced(S, item.id)) return;
      if (slot.item === item.id) {
        S.placed[item.id] = si; S.correct++; S.selItem = -1;
        Sound.sfx('correct'); S.flash = 0.35;
        if (Object.keys(S.placed).length >= def.slots.length) { S.phase = 'result'; Sound.sfx('chime'); }
      } else {
        Sound.sfx('wrong'); S.shake = 0.32;
        var rightItem = def.items.filter(function (it) { return it.id === slot.item; })[0];
        S.wrong.push({ q: item.label + ' 该放在哪里？', right: rightItem ? rightItem.label : slot.item,
                       mine: slot.label, explain: item.why || def.explain, src: item.src || def.src });
        S.selItem = -1;
      }
    },
    drawArrange: function (ctx, S, def, t) {
      var r = screenFrame(ctx, def.title || '试炼 · 布置', '', t, { y: 14, h: H - 28 });
      PF.draw(ctx, def.caption || '把每件器具放到它该在的位置', r.cx, r.y + 26, 10, C.lav1, { align: 'center' });
      /* 纵向预算（画框 14..256）：标题条 14..33 / caption 40..52 / 两排槽位 109..196 /
         台面 200..206 / 物件栏 208..234 / 页脚提示条 239..254。
         槽位框从 34 高收到 30 高、两排间距拉开，是为了让"左侧 · 引导能量"这类
         8px 标签落在两排之间，原来标签(176)正好插进前排的框(157..191)里。 */
      Art.px(ctx, 60, 200, 360, 6, C.brown1);
      Art.px(ctx, 60, 200, 360, 2, C.brown3);
      // 槽位
      for (var i = 0; i < def.slots.length; i++) {
        var s = def.slots[i];
        var placedId = null, filled = false;
        for (var k in S.placed) if (S.placed.hasOwnProperty(k) && S.placed[k] === i) { filled = true; placedId = k; }
        var sel = i === S.cursor;
        var edge = filled ? C.green3 : (sel ? C.gold3 : C.slate2);
        ctx.globalAlpha = 0.5;
        Art.rectOutline(ctx, s.x - 22, s.y - 15, 44, 30, edge);
        ctx.globalAlpha = 1;
        if (!filled) {
          PF.draw(ctx, s.label, s.x, s.y + 18, 8, sel ? C.gold3 : C.gray0, { align: 'center' });
        } else {
          var pf = def.items.filter(function (it) { return it.id === placedId; })[0];
          if (pf) {
            Art.icon(ctx, pf.icon, s.x - 8, s.y - 9, 1, C.parch, C.gold2);
            PF.draw(ctx, pf.label, s.x, s.y + 18, 8, C.green4, { align: 'center' });
          }
        }
        if (sel) {
          var ax = s.x - 26 + (Math.sin(t * 6) > 0 ? 0 : 1);
          PF.draw(ctx, '▶', ax, s.y - 5, 10, C.gold3, {});
        }
      }
      // 物件栏：只画还没放下的，位置由 arrangeItemRect 统一决定
      var pend = arrangePending(def, S);
      for (var q = 0; q < pend.length; q++) {
        var it = def.items[pend[q]], rc = arrangeItemRect(q), isSel = pend[q] === S.selItem;
        Art.panel(ctx, rc.x, rc.y, rc.w, rc.h, {
          fill: isSel ? 'rgba(56,40,12,0.95)' : 'rgba(14,11,26,0.92)',
          edge: isSel ? C.gold3 : C.slate2, inner: Art.mix(isSel ? C.gold3 : C.slate2, '#000', 0.5)
        });
        Art.icon(ctx, it.icon, rc.x + 6, rc.y + 6, 0.875, C.parch, C.gold2);
      }
      // 选中物件的名字跟在物件栏右边（原来画在图标上方 it.iy-12，正好压到台面那条线）
      if (S.selItem >= 0) {
        var selIt = def.items[S.selItem];
        if (selIt && !this.hasPlaced(S, selIt.id)) {
          var lastX = arrangeItemRect(Math.max(0, pend.length - 1));
          PF.draw(ctx, '已拿起 · ' + selIt.label, lastX.x + lastX.w + 10, ARRANGE_BAR_Y + 8, 10, C.gold3, {});
        }
      }
      PF.draw(ctx, '已放 ' + Object.keys(S.placed).length + ' / ' + def.slots.length, r.x + r.w - 12, r.y + 26, 10, C.gold2, { align: 'right' });
      footerHint(ctx, r, '点物件再点位置 · 或方向键选位置 + 回车', t);
    },

    /* ================= 玩法 8：排序（按正确顺序点出步骤） ================= */
    orderLayout: function () {
      var def = this.def, n = def.items.length;
      var top = 62, bottom = 222, rowH = Math.min(22, Math.floor((bottom - top) / n));
      var L = [], R = [];
      for (var i = 0; i < n; i++) {
        L.push({ x: 30, y: top + i * rowH, w: 200, h: rowH - 3 });
        R.push({ x: 250, y: top + i * rowH, w: 200, h: rowH - 3 });
      }
      return { L: L, R: R, rowH: rowH };
    },
    orderPool: function (S) {
      return S.shuffled.filter(function (i) { return S.done.indexOf(i) < 0; });
    },
    keyOrder: function (S, act) {
      var pool = this.orderPool(S);
      if (!pool.length) { this.nextItem(); return; }
      if (act === 'up') { S.sel = (S.sel + pool.length - 1) % pool.length; Sound.sfx('select'); }
      else if (act === 'down') { S.sel = (S.sel + 1) % pool.length; Sound.sfx('select'); }
      else if (act === 'confirm') this.pickOrder(S, pool[Math.min(S.sel, pool.length - 1)]);
    },
    clickOrder: function (S, x, y) {
      var a = this.orderLayout(), pool = this.orderPool(S);
      if (!pool.length) { this.nextItem(); return; }
      for (var i = 0; i < pool.length; i++) {
        if (this.inRow(x, y, a.R[i])) { S.sel = i; this.pickOrder(S, pool[i]); return; }
      }
    },
    pickOrder: function (S, idx) {
      var def = this.def, want = S.done.length;
      S.total = def.items.length;
      if (idx === want) {
        S.done.push(idx);
        if (!S.missed[idx]) S.correct++;
        Sound.sfx(S.done.length === def.items.length ? 'chime' : 'correct');
        S.flash = 0.25; S.sel = 0;
        if (S.done.length >= def.items.length) S.phase = 'result';
      } else {
        Sound.sfx('wrong'); S.shake = 0.3;
        if (!S.missed[want]) {
          S.missed[want] = true;
          S.wrong.push({ q: '第 ' + (want + 1) + ' 步', right: def.items[want].label,
                         mine: def.items[idx].label, explain: def.items[want].why || def.explain, src: def.src });
        }
        S.hint = { idx: idx, t: 0.9 };
      }
    },
    drawOrder: function (ctx, S, def, t) {
      var r = screenFrame(ctx, def.title || '试炼 · 排序', '已排 ' + S.done.length + ' / ' + def.items.length, t, { y: 14, h: H - 28 });
      PF.draw(ctx, def.caption || '按先后顺序，依次点出每一步', r.cx, r.y + 26, 10, C.lav1, { align: 'center' });
      var a = this.orderLayout(), pool = this.orderPool(S);
      for (var i = 0; i < def.items.length; i++) {
        var L = a.L[i], got = i < S.done.length;
        Art.panel(ctx, L.x, L.y, L.w, L.h, { fill: got ? 'rgba(12,42,24,0.9)' : 'rgba(10,8,20,0.7)',
          edge: got ? C.green3 : C.slate1, inner: Art.mix(got ? C.green3 : C.slate1, '#000', 0.5) });
        PF.draw(ctx, (i + 1) + '.', L.x + 6, L.y + (L.h - 12) / 2, 10, got ? C.green4 : C.slate3, {});
        if (got) PF.draw(ctx, clipLine(def.items[S.done[i]].label, 10, L.w - 30), L.x + 24, L.y + (L.h - 12) / 2, 10, C.green4, {});
        else if (i === S.done.length && Math.sin(t * 5) > 0) Art.px(ctx, L.x + 24, L.y + L.h / 2, 8, 1, C.gold2);
      }
      for (var j = 0; j < pool.length; j++) {
        var R = a.R[j], idx = pool[j], sel = j === S.sel;
        var bad = S.hint && S.hint.idx === idx && S.hint.t > 0;
        var edge = bad ? C.red3 : (sel ? C.gold3 : C.slate2);
        Art.panel(ctx, R.x, R.y, R.w, R.h, { fill: bad ? 'rgba(52,12,14,0.94)' : (sel ? 'rgba(56,40,12,0.94)' : 'rgba(14,11,26,0.92)'),
          edge: edge, inner: Art.mix(edge, '#000', 0.5) });
        PF.draw(ctx, clipLine(def.items[idx].label, 10, R.w - 14), R.x + 7, R.y + (R.h - 12) / 2, 10, sel ? C.gold4 : C.parch, {});
      }
      if (S.hint) { S.hint.t -= 1 / 60; if (S.hint.t <= 0) S.hint = null; }
      Art.px(ctx, 240, 66, 1, 150, C.brown1);
      footerHint(ctx, r, '↑↓ 选择 · 回车放到下一格 · 鼠标可直接点', t);
    },

    /* ================= 玩法 9：呼吸（吸气按住，呼气松开） ================= */
    breathPlan: function (def) {
      var seq = [], cyc = def.cycles || 4;
      for (var c = 0; c < cyc; c++) {
        seq.push({ k: 'in', d: def.inhale || 4 });
        if (def.hold) seq.push({ k: 'hold', d: def.hold });
        seq.push({ k: 'out', d: def.exhale || 4 });
      }
      return seq;
    },
    keyBreath: function (S, act) {
      if (S.phase !== 'play') return;
      if (act === 'confirm') { S.holding = true; S.started = true; }
      else if (act === 'release') S.holding = false;
    },
    tickBreath: function (S, dt) {
      if (!S.started) return;
      S.bt += dt;
      var plan = S.plan, acc = 0, cur = null, local = 0, i;
      for (i = 0; i < plan.length; i++) { if (S.bt < acc + plan[i].d) { cur = plan[i]; local = S.bt - acc; break; } acc += plan[i].d; }
      if (!cur) {
        var ratio = S.goodT / Math.max(0.01, S.allT);
        S.total = this.def.cycles || 4;
        S.correct = Math.round(ratio * S.total);
        if (ratio < 0.6) S.wrong.push({ q: '呼吸节奏', right: '吸气时按住，屏息时继续按住，呼气时松开',
          mine: '有 ' + Math.round((1 - ratio) * 100) + '% 的时间没跟上', explain: this.def.explain, src: this.def.src });
        S.phase = 'result'; Sound.sfx('chime');
        return;
      }
      S.cur = cur; S.local = local; S.idx = i;
      if (local > 0.45) {                         // 刚换阶段给半秒反应
        S.allT += dt;
        var want = cur.k !== 'out';
        if (want === !!S.holding) S.goodT += dt;
      }
    },
    drawBreath: function (ctx, S, def, t) {
      var r = screenFrame(ctx, def.title || '练习 · 呼吸', '', t, { y: 14, h: H - 28 });
      PF.draw(ctx, def.caption || '跟着光圈呼吸', r.cx, r.y + 26, 10, C.lav1, { align: 'center' });
      var cx = 240, cy = 130, rad;
      var cur = S.cur, k = cur ? cur.k : 'in', p = cur ? Math.min(1, S.local / cur.d) : 0;
      if (!S.started) { rad = 18; k = 'wait'; }
      else if (k === 'in') rad = 18 + 34 * Art.ease(p);
      else if (k === 'hold') rad = 52;
      else rad = 52 - 34 * Art.ease(p);
      var col = k === 'in' ? C.teal3 : (k === 'hold' ? C.gold2 : (k === 'out' ? C.lav1 : C.slate3));
      Art.glowSoft(ctx, cx, cy, rad + 16, col, 0.22, 7);
      Art.disc(ctx, cx, cy, Math.round(rad), Art.mix(col, '#000', 0.55));
      Art.ring(ctx, cx, cy, Math.round(rad), col, 1);
      Art.ring(ctx, cx, cy, 52, Art.mix(col, '#000', 0.4), 1);
      var label = k === 'wait' ? '按住空格（或鼠标）开始吸气'
                : k === 'in' ? '吸 气 —— 按住' : k === 'hold' ? '屏 住 —— 继续按住' : '呼 气 —— 松开';
      PF.draw(ctx, label, cx, cy - 6, 12, C.cream, { align: 'center', shadow: '#000' });
      if (S.started && cur) PF.draw(ctx, Math.ceil(cur.d - S.local) + '', cx, cy + 10, 10, col, { align: 'center' });
      var plan = S.plan, cyc = def.cycles || 4, per = plan.length / cyc;
      var doneCyc = S.started ? Math.floor((S.idx || 0) / per) : 0;
      progressDots(ctx, cx - cyc * 6, 200, cyc, doneCyc, 12);
      var ok = !S.started || !cur || S.local <= 0.45 || ((cur.k !== 'out') === !!S.holding);
      Art.px(ctx, 168, 210, 144, 3, ok ? C.green3 : C.red2);
      PF.draw(ctx, S.holding ? '● 按住中' : '○ 松开', cx, 216, 9, S.holding ? C.teal4 : C.gray0, { align: 'center' });
      footerHint(ctx, r, '空格 / 鼠标：吸气与屏息时按住，呼气时松开', t);
    },

    /* ---------------- 主绘制 ---------------- */
    draw: function (ctx, t) {
      var S = this.state, def = this.def;
      if (!S || !def) return;
      S.t += t * 0 + 1 / 60;
      // 反馈闪烁/震动（震动可在设置里关掉：部分人对画面抖动敏感，手机上更容易不适）
      var ox = 0, oy = 0;
      if (S.shake > 0 && shakeEnabled) { ox = (Math.random() * 2 - 1) * S.shake * 6; oy = (Math.random() * 2 - 1) * S.shake * 6; S.shake = Math.max(0, S.shake - 1 / 60); }
      else if (S.shake > 0) { S.shake = 0; }
      ctx.save();
      ctx.translate(ox | 0, oy | 0);

      if (S.phase === 'feedback') { this.drawFeedback(ctx, S, def, t); ctx.restore(); return; }
      if (S.phase === 'result') { this.drawResult(ctx, S, def, t); ctx.restore(); return; }

      if (S.kind === 'quiz') {
        var r = screenFrame(ctx, def.title || '试炼 · 问答', '第 ' + Math.min(S.qi + 1, def.questions.length) + ' / ' + def.questions.length + ' 题', t, { y: 14, h: H - 28 });
        this.drawQuiz(ctx, S, def, t);
        progressDots(ctx, r.x + 12, r.y + r.h - 22, def.questions.length, S.qi, 9);
        footerHint(ctx, r, '↑↓ 选择 · 回车确认 · 鼠标可直接点', t);
      } else if (S.kind === 'multi') {
        var r2 = screenFrame(ctx, def.title || '试炼 · 多选', '多选题', t, { y: 14, h: H - 28 });
        this.drawMulti(ctx, S, def, t);
        footerHint(ctx, r2, '↑↓ 选择 · 回车勾选 · S 提交', t);
      } else if (S.kind === 'sort') {
        var r3 = screenFrame(ctx, def.title || '试炼 · 分类', '', t, { y: 14, h: H - 28 });
        this.drawSort(ctx, S, def, t);
        progressDots(ctx, r3.x + 12, r3.y + r3.h - 22, def.items.length, S.qi, 9);
        footerHint(ctx, r3, '←→ 选择箱子 · 回车投放 · 点箱子也行', t);
      } else if (S.kind === 'match') {
        var r4 = screenFrame(ctx, def.title || '试炼 · 配对', '', t, { y: 14, h: H - 28 });
        this.drawMatch(ctx, S, def, t);
        footerHint(ctx, r4, '点左边一项，再点右边配对的一项', t);
      } else if (S.kind === 'trace') {
        this.drawTrace(ctx, S, def, t);
      } else if (S.kind === 'rhythm') {
        this.drawRhythm(ctx, S, def, t);
      } else if (S.kind === 'arrange') {
        this.drawArrange(ctx, S, def, t);
      } else if (S.kind === 'order') {
        this.drawOrder(ctx, S, def, t);
      } else if (S.kind === 'breath') {
        this.drawBreath(ctx, S, def, t);
      }
      if (S.flash > 0) {
        S.flash = Math.max(0, S.flash - 1 / 60);
        ctx.globalAlpha = S.flash * 0.55;
        Art.px(ctx, 0, 0, W, H, C.green4);
        ctx.globalAlpha = 1;
      }
      ctx.restore();
    },

    // 每题作答后的讲解页（教育向：答错不惩罚，一定给原文依据）
    drawFeedback: function (ctx, S, def, t) {
      var r = screenFrame(ctx, '讲解', '', t, { y: 26, h: H - 68 });
      var w = S.wrong.length ? S.wrong[S.wrong.length - 1] : null;
      var ok = !w || false;
      ok = S.lastOk === true;
      PF.draw(ctx, ok ? '✦ 答对了' : '✦ 再看看原文', r.cx, r.y + 30, 14,
              ok ? C.green4 : C.ember, { align: 'center' });
      var y = r.y + 54;
      if (w) {
        if (w.q) { var ql = wrapLines('问题：' + w.q, 10, r.inW - 8);
          for (var i = 0; i < ql.length; i++) PF.draw(ctx, ql[i], r.inX, y + i * 14, 10, C.lav1, {}); y += ql.length * 14 + 2; }
        var rl = wrapLines('原文主张：' + w.right, 11, r.inW - 8);
        for (var a = 0; a < rl.length; a++) PF.draw(ctx, rl[a], r.inX, y + a * 15, 11, C.green4, {});
        y += rl.length * 15 + 3;
        if (w.mine) { var ml = wrapLines('你的选择：' + w.mine, 11, r.inW - 8);
          for (var b = 0; b < ml.length; b++) PF.draw(ctx, ml[b], r.inX, y + b * 15, 11, C.red3, {}); y += ml.length * 15 + 3; }
      }
      if (def.explain || (w && w.explain)) {
        var ex = (w && w.explain) || def.explain;
        var el = wrapLines(ex, 11, r.inW - 8);
        for (var c = 0; c < el.length && y + c * 15 < r.y + r.h - 32; c++)
          PF.draw(ctx, el[c], r.inX, y + c * 15, 11, C.cream, { shadow: '#000' });
      }
      var src = (w && w.src) || def.src;
      if (src) PF.draw(ctx, '出处 · ' + src, r.x + r.w - 12, r.y + r.h - 32, 9, C.teal3, { align: 'right' });
      PF.draw(ctx, '空格 / 点击 继续', r.cx, r.y + r.h - 16, 10, C.gold3, { align: 'center' });
      void t;
    },

    // 结果卡：评级 + 得分 + 错题回顾入口
    drawResult: function (ctx, S, def, t) {
      dimBackdrop(ctx, 0.8);
      var w = 380, h = 224, x = (W - w) / 2, y = Math.floor((H - h) / 2);
      Art.panel(ctx, x, y, w, h, { fill: 'rgba(12,9,22,0.97)', edge: C.gold2, inner: C.gold0, shadow: true });
      // 顶部光晕
      Art.glowSoft(ctx, x + w / 2, y + 34, 90, C.gold2, 0.28, 8);
      var acc = S.total ? S.correct / S.total : 1;
      var rank = acc >= 1 ? 'S' : acc >= 0.85 ? 'A' : acc >= 0.65 ? 'B' : acc >= 0.4 ? 'C' : 'D';
      Art.ring(ctx, x + w / 2, y + 34, 22, C.gold1, 1);
      PF.draw(ctx, rank, x + w / 2, y + 16, 30, acc >= 0.85 ? C.gold4 : (acc >= 0.5 ? C.parch : C.ember), { align: 'center' });
      PF.draw(ctx, '试炼结束', x + w / 2, y + 58, 12, C.lav1, { align: 'center' });
      var scoreTxt = S.correct + ' / ' + S.total;
      PF.draw(ctx, scoreTxt, x + w / 2, y + 76, 16, C.gold3, { align: 'center' });
      Art.bar(ctx, x + 60, y + 98, w - 120, 10, acc, acc >= 0.5 ? C.gold1 : C.red2, C.void1);
      var y2 = y + 118;
      if (S.bestCombo) { PF.draw(ctx, '最高连击 ×' + S.bestCombo, x + 20, y2, 10, C.ember, {}); }
      var footY = y + h - 18;
      if (S.wrong && S.wrong.length) {
        /* 同一条错误反复出现只展示一次 —— 节奏试炼 12 个音符全漏会记 12 条一模一样的
           "鼓面经过标记时敲击"，原来会原样列三遍（而且 q 和 →答案 还画在同一个 y 上，
           两段字是叠着画的）。这里先去重并标次数，q 一行、答案一行。 */
        var uniq = [], seen = {};
        for (var u = S.wrong.length - 1; u >= 0; u--) {
          var key = S.wrong[u].q || '';
          if (seen[key] !== undefined) { uniq[seen[key]].n++; continue; }
          seen[key] = uniq.length;
          uniq.push({ q: S.wrong[u].q, right: S.wrong[u].right, n: 1 });
        }
        PF.draw(ctx, '错题回顾', x + 20, y2, 10, C.red3, {});
        var n = Math.min(3, uniq.length);
        for (var i = 0; i < n; i++) {
          var ww = uniq[i], ly = y2 + 16 + i * 22;
          var qs = clipLine(ww.q || '', 10, w - 60) + (ww.n > 1 ? ' ×' + ww.n : '');
          PF.draw(ctx, '· ' + qs, x + 22, ly, 10, C.parch, {});
          PF.draw(ctx, '→ ' + clipLine(ww.right || '', 10, w - 62), x + 30, ly + 11, 10, C.green4, {});
        }
        if (uniq.length > 3) PF.draw(ctx, '…还有 ' + (uniq.length - 3) + ' 条，详见「回看」', x + 22, footY, 9, C.gray0, {});
      } else {
        PF.draw(ctx, '全对。这一段你已经记下了。', x + w / 2, y2 + 8, 11, C.green4, { align: 'center' });
      }
      if (def.explain && !S.wrong.length) {
        var el = wrapLines(def.explain, 10, w - 40);
        for (var k = 0; k < el.length && k < 3; k++) PF.draw(ctx, el[k], x + 20, y2 + 26 + k * 14, 10, C.lav1, {});
      }
      if (Math.sin(t * 5) > 0) PF.draw(ctx, '空格 / 点击 返回', x + w / 2, footY, 10, C.gold3, { align: 'center' });
      void t;
    },

    /* ---------------- 自动通关辅助（给无头 harness 用） ----------------
       每个玩法给出"一步合理操作"，让 autoplay 能走完全部试炼。
       errorRate 用来故意走错，以覆盖判错分支。 */
    autoStep: function (errorRate, rng) {
      var S = this.state;
      if (!S) return;
      rng = rng || Math.random;
      var wrong = rng() < (errorRate === undefined ? 0 : errorRate);
      if (S.phase === 'result') { this.finish(); return; }
      if (S.phase === 'feedback') { this.nextItem(); return; }
      var def = this.def, k = S.kind;
      if (k === 'quiz') {
        var q = def.questions[S.qi], a = (wrong && q.options.length > 1) ? (q.answer + 1) % q.options.length : q.answer;
        this.answerQuiz(S, a); S.lastOk = (a === q.answer); S.phase = 'feedback';
      } else if (k === 'multi') {
        var toggles = {};
        (wrong ? [0] : def.answers).forEach(function (i) { toggles[i] = true; });
        S.toggles = toggles;
        this.answerMulti(S); S.lastOk = !wrong; S.phase = 'feedback';
      } else if (k === 'sort') {
        var it = def.items[S.qi];
        var bi = 0;
        for (var i = 0; i < def.bins.length; i++) if (def.bins[i].id === it.bin) bi = i;
        if (wrong) bi = (bi + 1) % def.bins.length;
        this.answerSort(S, bi); S.lastOk = !wrong; S.phase = 'feedback';
      } else if (k === 'match') {
        if (S.selLeft < 0) {
          for (var l = 0; l < def.pairs.length; l++) if (S.links[l] === undefined) { S.selLeft = l; break; }
          return;
        }
        var rr = -1;
        for (var r = 0; r < def.pairs.length; r++) if (S.rightOrder[r] === S.selLeft) rr = r;
        if (wrong) rr = (rr + 1) % def.pairs.length;
        this.linkMatch(S, S.selLeft, rr);
        if (S.links[S.selLeft] === undefined && S.wrong.length) { /* 已记录 */ }
        S.phase = Object.keys(S.links).length >= def.pairs.length ? 'result' : 'play';
      } else if (k === 'trace') {
        if (S.traced.length >= def.order.length) { this.nextItem(); return; }
        var want = def.order[S.traced.length];
        if (wrong) want = (want + 1) % def.nodes.length;
        this.pickTrace(S, want);
      } else if (k === 'rhythm') {
        this.autoRhythm(S);
      } else if (k === 'arrange') {
        var next = -1;
        for (var m = 0; m < def.items.length; m++) if (!this.hasPlaced(S, def.items[m].id)) { next = m; break; }
        if (next < 0) { this.nextItem(); return; }
        S.selItem = next;
        var target = -1;
        for (var s2 = 0; s2 < def.slots.length; s2++) if (def.slots[s2].item === def.items[next].id) target = s2;
        if (wrong) target = (target + 1) % def.slots.length;
        this.placeArrange(S, target);
      } else if (k === 'order') {
        if (S.done.length >= def.items.length) { S.phase = 'result'; return; }
        var want = S.done.length;
        this.pickOrder(S, wrong ? (want + 1) % def.items.length : want);
      } else if (k === 'breath') {
        if (S.phase !== 'play') return;
        var cur = S.cur;
        var hold = !cur || cur.k !== 'out';       // 吸气/屏息按住，呼气松开
        if (hold) { if (!S.holding) this.keyBreath(S, 'confirm'); }
        else if (S.holding) this.keyBreath(S, 'release');
      }
    },
    autoRhythm: function (S) {
      var def = this.def, lineX = 400, win = def.window || 26;
      for (var i = 0; i < S.notes.length; i++) {
        var n = S.notes[i];
        if (n.judged) continue;
        if (Math.abs(n.x - lineX) <= win * 0.42) { this.keyRhythm(S, 'confirm'); return; }
        if (n.x > lineX + win) {  // 错过了，标记掉以免卡住
          n.judged = 'miss'; S.miss++;
          S.wrong.push({ q: '鼓点 ' + (i + 1), right: '在鼓面经过标记时敲击', mine: '错过', explain: def.explain, src: def.src });
        }
      }
      if (S.notes.every(function (n) { return n.judged; })) { S.phase = 'result'; }
    },
    // 节奏玩法每帧推进（引擎调用）
    tick: function (dt) {
      var S = this.state;
      if (!S || S.phase !== 'play') return;
      if (S.kind === 'breath') {
        if (S.plan) this.tickBreath(S, dt);      // plan 由 TrialWrap.start 建好
        return;
      }
      if (S.kind !== 'rhythm') return;
      var def = this.def;
      for (var i = 0; i < S.notes.length; i++) {
        var n = S.notes[i];
        if (n.judged) continue;
        n.x += (def.speed || 150) * dt;
        if (n.x > 470) {
          n.judged = 'miss'; S.miss++;
          S.wrong.push({ q: '鼓点 ' + (i + 1), right: '在鼓面经过标记时敲击', mine: '错过', explain: def.explain, src: def.src });
          Sound.sfx('fail');
        }
      }
      if (S.notes.length && S.notes.every(function (n) { return n.judged; })) { S.phase = 'result'; Sound.sfx('chime'); }
    }
  };

  /* ============================ 试炼的初始化包装 ============================ */
  var TrialWrap = {
    start: function (def, cb) {
      Trial.start(def, cb);
      var S = Trial.state;
      if (S.kind === 'rhythm') {
        S.notes = [];
        var n = def.notes || [];
        var speed = def.speed || 110;
        var lineX = 400, lead = def.lead === undefined ? 1.25 : def.lead;
        /* 谱面语义：lead = 一个音符从右侧入场走到判定线要用的秒数。
           所以起点 = lineX - speed*lead，到达时刻 = (n[j]-n[0])/1000 + lead，
           两者必须自洽 —— 之前用 lineX - (lead+相对时刻)*speed，
           后面的音符被推到 x=1200 之外（画面只有 480 宽），
           要十几秒才飘回判定线，看起来就是"鼓点不动、卡死"。
           lead 太长会让音符入场瞬间就在画面外，这里顺带夹到 3 秒内。 */
        if (lead * speed > 620) { lead = 3; speed = 620 / 3; }
        var t0ms = n.length ? n[0] : 0;
        for (var j = 0; j < n.length; j++) {
          var arrive = lead + (n[j] - t0ms) / 1000;
          S.notes.push({ at: n[j], x: lineX - speed * lead + (arrive - lead) * speed, judged: null });
        }
        S.judged = 0;
      }
      if (S.kind === 'multi') S.toggles = {};
      if (S.kind === 'match') { S.links = {}; S.selLeft = -1; S.rightOrder = Trial.shuffle(def.pairs.length, 20260921); }
    },
    get state() { return Trial.state; },
    get def() { return Trial.def; },
    draw: function (ctx, t) { Trial.draw(ctx, t); },
    key: function (a) { Trial.key(a); },
    click: function (x, y) { Trial.click(x, y); },
    move: function (x, y) { Trial.move(x, y); },
    autoStep: function (e, r) { Trial.autoStep(e, r); },
    tick: function (dt) { Trial.tick(dt); }
  };

  return {
    DLG: DLG, dimBackdrop: dimBackdrop, screenFrame: screenFrame,
    clipLine: clipLine,   // 引擎画按钮文案时要用（放不下就裁到省略号）
    footerHint: footerHint, progressDots: progressDots, wrapLines: wrapLines,
    Dialogue: Dialogue, Choice: Choice,
    Trial: TrialWrap, TrialCore: Trial,
    /* 引擎在设置里切换"屏幕震动"时调它 */
    setShake: function (v) { shakeEnabled = !!v; }
  };
})();
