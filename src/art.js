/* =========================================================================
 *  art.js —— 调色板 / 绘图原语 / 像素中文字体 / 图像与粒子 / UI 部件 / 图标
 *
 *  设计要点：
 *   1. 全项目只用 C 里的颜色 + mix() 派生色，取色用名字不用十六进制字面量
 *   2. 背景是 AI 生成的静态像素图 + 代码绘制的动态粒子层 + 缓慢推镜，
 *      静态图靠粒子与运镜"活"起来
 *   3. 像素中文字体：12px 渲染后 alpha 二值化，得到 1-bit 点阵
 *   4. 昂贵且不变的层（暗角、扫描线、噪声、圆角遮罩）一律缓存成离屏画布
 * ========================================================================= */
var Art = (function () {
  'use strict';

  var W = 480, H = 270;

  /* ------------------------------ 调色板 ------------------------------ */
  var C = {
    none: null,
    // 夜与虚空
    void0:'#06050d', void1:'#0c0a1a', void2:'#141026', void3:'#1d1735',
    night0:'#241c46', night1:'#332860', night2:'#463878',
    vio0:'#3a2c6b', vio1:'#514188', vio2:'#6b58a6', vio3:'#8a76c4',
    lav0:'#a494d2', lav1:'#c3b6e4', lav2:'#e0d7f4',
    // 纸与光
    white:'#f6f2ff', cream:'#fff4d6', parch:'#f0ddb0', parch2:'#d9c08a', parch3:'#b99f6b',
    // 木与铜
    brown0:'#1d1206', brown1:'#33210e', brown2:'#4e3418', brown3:'#6b4826',
    leather:'#7d5626', tan:'#a8793c', tan2:'#c9a05a',
    gold0:'#7d5a14', gold1:'#b8891f', gold2:'#e0b545', gold3:'#ffdf8e', gold4:'#fff6cf',
    // 草木
    green0:'#0c2118', green1:'#163a27', green2:'#245a38', green3:'#3d8a4e', green4:'#63b46b',
    // 血与火
    red0:'#3a0b11', red1:'#65151b', red2:'#a02329', red3:'#d44e46', red4:'#f08a63',
    orange:'#e07a34', ember:'#ff9b3d',
    // 水与银
    teal0:'#0a2733', teal1:'#154456', teal2:'#26788e', teal3:'#4fb6cb', teal4:'#9fe3ee',
    silver0:'#6b7684', silver1:'#9aa5b4', silver2:'#c8d2dd', silver3:'#eef4fa',
    // 石与灰
    slate0:'#1c1c26', slate1:'#33333f', slate2:'#52525f', slate3:'#7a7a88',
    gray0:'#8e8e9e', gray1:'#b3b3c0', gray2:'#dcdce6',
    // 肤色
    skin0:'#4d2c18', skin1:'#7a4d2b', skin2:'#a87243', skin3:'#cf9c69', skin4:'#ecc49b',
    pink:'#e79aa2', pink2:'#f5c1c4'
  };

  /* --------------------------- 基础工具函数 --------------------------- */
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function ease(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
  function easeOut(t) { return 1 - (1 - t) * (1 - t); }
  function easeIn(t) { return t * t; }

  // 确定性伪随机：星位、砖块、噪点这些"随机"分布必须用它。
  // 用 Math.random() 每帧重算会让画面疯狂闪烁。
  function makeRng(seed) {
    var s = (seed | 0) || 1;
    return function () {
      s ^= s << 13; s |= 0;
      s ^= s >>> 17;
      s ^= s << 5; s |= 0;
      return ((s >>> 0) % 100000) / 100000;
    };
  }

  /* ------------------------------ 绘图原语 ------------------------------ */
  function px(ctx, x, y, w, h, col) {
    if (!col || w <= 0 || h <= 0) return;
    ctx.fillStyle = col;
    ctx.fillRect(x | 0, y | 0, Math.max(1, w | 0), Math.max(1, h | 0));
  }
  function rectOutline(ctx, x, y, w, h, col) {
    px(ctx, x, y, w, 1, col); px(ctx, x, y + h - 1, w, 1, col);
    px(ctx, x, y, 1, h, col); px(ctx, x + w - 1, y, 1, h, col);
  }
  function line(ctx, x0, y0, x1, y1, col) {
    x0 |= 0; y0 |= 0; x1 |= 0; y1 |= 0;
    var dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
    var sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    var err = dx - dy;
    ctx.fillStyle = col;
    for (var g = 0; g < 4096; g++) {
      ctx.fillRect(x0, y0, 1, 1);
      if (x0 === x1 && y0 === y1) break;
      var e2 = 2 * err;
      if (e2 > -dy) { err -= dy; x0 += sx; }
      if (e2 < dx) { err += dx; y0 += sy; }
    }
  }
  function disc(ctx, cx, cy, r, col) {
    if (r <= 0) return;
    ctx.fillStyle = col;
    for (var y = -r; y <= r; y++) {
      var w = Math.floor(Math.sqrt(Math.max(0, r * r - y * y)));
      ctx.fillRect((cx - w) | 0, (cy + y) | 0, w * 2 + 1, 1);
    }
  }
  function ring(ctx, cx, cy, r, col, thick) {
    thick = thick || 1;
    var x = r, y = 0, err = 0;
    ctx.fillStyle = col;
    var guard = 0;
    while (x >= y && guard++ < 512) {
      var pts = [[x,y],[y,x],[-x,y],[-y,x],[-x,-y],[-y,-x],[x,-y],[y,-x]];
      for (var i = 0; i < pts.length; i++)
        for (var t = 0; t < thick; t++)
          ctx.fillRect((cx + pts[i][0]) | 0, (cy + pts[i][1] + t) | 0, 1, 1);
      y++;
      if (err <= 0) err += 2 * y + 1; else { x--; err += 2 * (y - x) + 1; }
    }
  }
  // 多层同心圆叠加 → 没有明显色阶的光晕。最便宜的"好看"。
  function glow(ctx, cx, cy, r, col, alpha) {
    if (r <= 0) return;
    var steps = 7;
    for (var i = steps; i >= 1; i--) {
      ctx.globalAlpha = (alpha || 0.5) * 0.13;
      disc(ctx, cx, cy, Math.round(r * i / steps), col);
    }
    ctx.globalAlpha = 1;
  }
  function glowSoft(ctx, cx, cy, r, col, alpha, steps) {
    steps = steps || 10;
    for (var i = steps; i >= 1; i--) {
      ctx.globalAlpha = (alpha || 0.5) * (i / steps) * 0.10;
      disc(ctx, cx, cy, Math.round(r * i / steps), col);
    }
    ctx.globalAlpha = 1;
  }

  function hex2rgb(h) {
    if (h.charAt(0) !== '#') return [255, 255, 255];
    h = h.slice(1);
    if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
    return [parseInt(h.substr(0,2),16), parseInt(h.substr(2,2),16), parseInt(h.substr(4,2),16)];
  }
  function rgb2hex(r, g, b) {
    return '#' + ((1 << 24) + (clamp(r|0,0,255) << 16) + (clamp(g|0,0,255) << 8) + clamp(b|0,0,255))
      .toString(16).slice(1);
  }
  function mix(c1, c2, t) {
    var a = hex2rgb(c1), b = hex2rgb(c2);
    return rgb2hex(lerp(a[0],b[0],t), lerp(a[1],b[1],t), lerp(a[2],b[2],t));
  }
  function shade(c, t) { return mix(c, '#000000', t); }
  function tint(c, t) { return mix(c, '#ffffff', t); }

  // 逐行混色的竖直渐变；dither 用 4x4 有序抖动打散色带
  var BAYER = [0,8,2,10, 12,4,14,6, 3,11,1,9, 15,7,13,5];
  function gradV(ctx, x, y, w, h, c1, c2, dither) {
    var steps = Math.max(2, Math.abs(h));
    for (var i = 0; i < steps; i++) {
      var t = i / (steps - 1);
      if (dither) {
        // 每行只画一次底，再用 4x4 抖动点补上层色 → 色带被打散
        px(ctx, x, y + i, w, 1, c1);
        var th = t;
        for (var xx = 0; xx < w; xx++) {
          if (BAYER[(xx & 3) + ((i & 3) << 2)] / 16 < th) px(ctx, x + xx, y + i, 1, 1, c2);
        }
      } else px(ctx, x, y + i, w, 1, mix(c1, c2, t));
    }
  }
  function gradH(ctx, x, y, w, h, c1, c2) {
    for (var i = 0; i < w; i++) px(ctx, x + i, y, 1, h, mix(c1, c2, i / Math.max(1, w - 1)));
  }

  /* ------------------------------ 图像层 ------------------------------ */
  // 由引擎在 boot 时填入：name -> canvas
  var IMG = {};
  var IMG_READY = false;

  function loadImages(data, done) {
    var keys = [], k;
    for (k in data) if (data.hasOwnProperty(k)) keys.push(k);
    var left = keys.length, failed = [];
    if (!left) { IMG_READY = true; if (done) done(failed); return; }
    keys.forEach(function (name) {
      var im = new Image();
      im.onload = function () {
        // 转存成 canvas：drawImage(canvas) 比 drawImage(img) 稳定，且便于后续取样
        var cv = document.createElement('canvas');
        cv.width = im.naturalWidth; cv.height = im.naturalHeight;
        cv.getContext('2d').drawImage(im, 0, 0);
        IMG[name] = cv;
        if (--left === 0) { IMG_READY = true; if (done) done(failed); }
      };
      im.onerror = function () {
        failed.push(name);
        if (--left === 0) { IMG_READY = true; if (done) done(failed); }
      };
      im.src = data[name];
    });
  }
  function tex(name) { return IMG[name] || null; }

  /* ------------------------- 背景 = 图 + 粒子 + 运镜 ------------------------- */

  // 缓慢推镜：静态图靠它活起来。drift 参数由每个背景自己给。
  function drawPlate(ctx, name, t, opt) {
    opt = opt || {};
    var cv = IMG[name];
    if (!cv) { px(ctx, 0, 0, W, H, C.void1); return; }
    var zoom = opt.zoom || 0;
    var panX = opt.panX || 0, panY = opt.panY || 0;
    var s = 1 + zoom;
    var dw = Math.round(W * s), dh = Math.round(H * s);
    var dx = Math.round(-(dw - W) / 2 + Math.sin(t * 0.075 + (opt.seed || 0)) * panX);
    var dy = Math.round(-(dh - H) / 2 + Math.cos(t * 0.058 + (opt.seed || 0)) * panY);
    ctx.drawImage(cv, dx, dy, dw, dh);
    // 图外溢出（运镜幅度大于缩放余量时）用边缘色补，避免露黑
    if (dx > 0) px(ctx, 0, 0, dx, H, C.void0);
    if (dx + dw < W) px(ctx, dx + dw, 0, W - dx - dw, H, C.void0);
    if (dy > 0) px(ctx, 0, 0, W, dy, C.void0);
    if (dy + dh < H) px(ctx, 0, dy + dh, W, H - dy - dh, C.void0);
  }

  /* ---- 粒子层：让静态图"活"起来的核心 ---- */
  function fireflies(ctx, t, n, seed, x0, y0, w, h, col, alpha) {
    var rng = makeRng(seed);
    for (var i = 0; i < n; i++) {
      var bx = rng(), by = rng(), sp = 0.11 + rng() * 0.34, ph = rng() * 6.283;
      var x = x0 + (bx * w + Math.sin(t * sp + ph) * (14 + rng() * 26)) % w;
      var y = y0 + (by * h + Math.cos(t * sp * 0.72 + ph) * (9 + rng() * 16)) % h;
      var pulse = Math.sin(t * (0.9 + rng() * 1.7) + ph) * 0.5 + 0.5;
      if (pulse < 0.24) continue;
      ctx.globalAlpha = (alpha || 0.7) * pulse;
      px(ctx, x, y, 1, 1, col || C.gold3);
      ctx.globalAlpha = (alpha || 0.7) * pulse * 0.25;
      px(ctx, x - 1, y, 3, 1, col || C.gold3);
      px(ctx, x, y - 1, 1, 3, col || C.gold3);
    }
    ctx.globalAlpha = 1;
  }

  function motes(ctx, t, n, seed, x0, y0, w, h, col, alpha) {
    var rng = makeRng(seed);
    for (var i = 0; i < n; i++) {
      var bx = rng() * w, by = rng() * h, sp = 0.06 + rng() * 0.22;
      var x = x0 + (bx + Math.sin(t * sp + i) * (6 + rng() * 14)) % w;
      var y = y0 + (by + t * (2 + rng() * 7)) % h;     // 缓慢上升
      ctx.globalAlpha = (alpha || 0.35) * (0.4 + 0.6 * (Math.sin(t * 1.1 + i * 1.7) * 0.5 + 0.5));
      px(ctx, x, y, 1, 1, col || C.gold3);
    }
    ctx.globalAlpha = 1;
  }

  function embers(ctx, t, n, seed, x0, x1, yBase, col) {
    var rng = makeRng(seed);
    for (var i = 0; i < n; i++) {
      var life = (t * (0.28 + rng() * 0.5) + rng()) % 1;
      var x = x0 + rng() * (x1 - x0) + Math.sin(t * 0.9 + i * 2.1) * (5 + rng() * 12);
      var y = yBase - life * (70 + rng() * 70);
      ctx.globalAlpha = (1 - life) * 0.9;
      px(ctx, x, y, 1, 1, rng() > 0.55 ? (col || C.ember) : C.gold3);
      if (rng() > 0.82) px(ctx, x, y, 1, 2, C.orange);
    }
    ctx.globalAlpha = 1;
  }

  function petals(ctx, t, n, seed, col) {
    var rng = makeRng(seed);
    for (var i = 0; i < n; i++) {
      var life = (t * (0.05 + rng() * 0.09) + rng()) % 1;
      var x = (rng() * W + Math.sin(t * 0.4 + i) * 34 + life * 40) % W;
      var y = -6 + life * (H + 14);
      ctx.globalAlpha = 0.85;
      var sway = Math.sin(t * 1.6 + i * 1.3) > 0 ? 0 : 1;
      px(ctx, x, y, 2, 1, col || C.pink);
      px(ctx, x + sway, y + 1, 1, 1, mix(col || C.pink, C.brown1, 0.3));
    }
    ctx.globalAlpha = 1;
  }

  function snow(ctx, t, n, seed) {
    var rng = makeRng(seed);
    for (var i = 0; i < n; i++) {
      var life = (t * (0.04 + rng() * 0.08) + rng()) % 1;
      var x = (rng() * W + Math.sin(t * 0.5 + i * 1.7) * 26) % W;
      var y = life * (H + 10) - 5;
      ctx.globalAlpha = 0.5 + rng() * 0.5;
      px(ctx, x, y, 1, 1, C.silver3);
    }
    ctx.globalAlpha = 1;
  }

  function rain(ctx, t, n, seed, alpha) {
    var rng = makeRng(seed);
    ctx.globalAlpha = alpha || 0.4;
    for (var i = 0; i < n; i++) {
      var life = (t * (0.9 + rng() * 0.8) + rng()) % 1;
      var x = (rng() * (W + 40) + life * 30) % W;
      var y = life * (H + 30) - 10;
      line(ctx, x, y, x + 2, y + 7, C.teal4);
    }
    ctx.globalAlpha = 1;
  }

  // 火光的呼吸：用两个不同频率的正弦叠加，避免机械感
  function fireLight(ctx, cx, cy, r, t, ph, alpha) {
    var f = Math.sin(t * 7.3 + ph) * 0.5 + Math.sin(t * 3.1 + ph * 2) * 0.5;
    glowSoft(ctx, cx, cy, r * (0.9 + f * 0.12), C.orange, (alpha || 0.5) * (0.85 + f * 0.15), 9);
  }

  function lightShaft(ctx, x, y, w, h, t, ph, col, alpha) {
    var f = Math.sin(t * 0.5 + ph) * 0.5 + 0.5;
    ctx.globalAlpha = (alpha || 0.10) * (0.6 + f * 0.4);
    for (var i = 0; i < w; i++) {
      px(ctx, x + i, y + (i * 0.14) | 0, 1, h, col || C.gold3);
    }
    ctx.globalAlpha = 1;
  }

  /* ---- 背景注册表 ---- */
  var BG = {};
  function defBg(name, plate, opt, layer) {
    BG[name] = function (ctx, t) {
      drawPlate(ctx, plate, t, opt || {});
      if (layer) layer(ctx, t);
    };
  }

  defBg('stones', 'bg_stones', { zoom: 0.05, panX: 8, panY: 3, seed: 0 }, function (ctx, t) {
    motes(ctx, t, 26, 91, 0, 90, W, 170, C.silver2, 0.30);
    fireflies(ctx, t, 9, 33, 120, 150, 260, 110, C.gold3, 0.45);
  });
  defBg('cottage', 'bg_cottage', { zoom: 0.045, panX: 6, panY: 2, seed: 1 }, function (ctx, t) {
    fireLight(ctx, 52, 214, 54, t, 0.4, 0.42);
    motes(ctx, t, 22, 17, 0, 40, W, 200, C.gold3, 0.26);
    // 窗外的夜：缓慢飘过的云
    ctx.globalAlpha = 0.16;
    px(ctx, 352 + Math.sin(t * 0.11) * 22, 152, 34, 3, C.lav1);
    ctx.globalAlpha = 1;
  });
  defBg('forest', 'bg_forest', { zoom: 0.06, panX: 9, panY: 3, seed: 2 }, function (ctx, t) {
    motes(ctx, t, 44, 55, 0, 0, W, H, C.gold3, 0.34);
    fireflies(ctx, t, 6, 71, 40, 90, 380, 140, C.green4, 0.35);
    lightShaft(ctx, 150 + Math.sin(t * 0.35) * 6, 0, 22, 210, t, 0.0, C.gold3, 0.055);
    lightShaft(ctx, 268 + Math.sin(t * 0.29 + 2) * 6, 0, 16, 200, t, 1.6, C.gold3, 0.05);
  });
  defBg('fire', 'bg_fire', { zoom: 0.04, panX: 5, panY: 2, seed: 3 }, function (ctx, t) {
    fireLight(ctx, 240, 228, 108, t, 1.1, 0.34);
    embers(ctx, t, 34, 23, 180, 300, 228, C.ember);
    motes(ctx, t, 14, 61, 0, 60, W, 180, C.gold3, 0.2);
  });
  defBg('moon', 'bg_moon', { zoom: 0.05, panX: 7, panY: 3, seed: 4 }, function (ctx, t) {
    // 水面月光闪烁：横向 1px 高光条
    var rng = makeRng(404);
    for (var i = 0; i < 70; i++) {
      var y = 108 + rng() * 120, x = 60 + rng() * 360;
      var f = Math.sin(t * (0.7 + rng() * 1.6) + i) * 0.5 + 0.5;
      if (f < 0.5) continue;
      ctx.globalAlpha = (f - 0.5) * 0.7;
      px(ctx, x, y, 3 + rng() * 9, 1, C.silver3);
    }
    ctx.globalAlpha = 1;
    glowSoft(ctx, 216, 62, 62, C.silver2, 0.16, 8);
  });
  defBg('stag', 'bg_stag', { zoom: 0.06, panX: 8, panY: 3, seed: 5 }, function (ctx, t) {
    glowSoft(ctx, 196, 118, 76, C.gold2, 0.20, 9);
    motes(ctx, t, 34, 88, 0, 60, W, 150, C.cream, 0.3);
    // 低伏的雾带
    ctx.globalAlpha = 0.12;
    px(ctx, (Math.sin(t * 0.07) * 30) | 0, 176, 460, 2, C.silver3);
    px(ctx, (60 + Math.cos(t * 0.05) * 40) | 0, 190, 400, 2, C.silver3);
    ctx.globalAlpha = 1;
  });
  defBg('wheel', 'bg_wheel', { zoom: 0.035, panX: 5, panY: 2, seed: 6 }, function (ctx, t) {
    // 石环缓慢旋转的金色光点
    for (var i = 0; i < 12; i++) {
      var a = t * 0.14 + i * (6.283 / 12);
      var x = 240 + Math.cos(a) * 96, y = 132 + Math.sin(a) * 78;
      ctx.globalAlpha = 0.5 + Math.sin(t * 1.4 + i) * 0.4;
      px(ctx, x, y, 2, 2, C.gold3);
    }
    ctx.globalAlpha = 1;
    motes(ctx, t, 20, 12, 60, 20, 360, 200, C.gold2, 0.3);
  });
  defBg('altar', 'bg_altar', { zoom: 0.05, panX: 6, panY: 2, seed: 7 }, function (ctx, t) {
    fireLight(ctx, 200, 140, 66, t, 2.2, 0.36);
    motes(ctx, t, 26, 44, 0, 30, W, 200, C.gold3, 0.3);
    // 香炉的烟：一缕垂直上升并扩散
    for (var i = 0; i < 12; i++) {
      var life = ((t * 0.16) + i / 12) % 1;
      ctx.globalAlpha = (1 - life) * 0.20;
      px(ctx, 268 + Math.sin(t * 0.9 + i * 0.8) * (2 + life * 12), 128 - life * 74, 1 + life * 2, 1, C.silver1);
    }
    ctx.globalAlpha = 1;
  });
  defBg('study', 'bg_study', { zoom: 0.045, panX: 6, panY: 2, seed: 8 }, function (ctx, t) {
    fireLight(ctx, 196, 198, 58, t, 3.1, 0.34);
    motes(ctx, t, 40, 29, 0, 0, W, H, C.gold3, 0.26);
  });
  defBg('shore', 'bg_shore', { zoom: 0.055, panX: 8, panY: 3, seed: 9 }, function (ctx, t) {
    glowSoft(ctx, 176, 92, 70, C.silver2, 0.14, 8);
    var rng = makeRng(909);
    for (var i = 0; i < 90; i++) {
      var y = 96 + rng() * 120, x = rng() * W;
      var f = Math.sin(t * (0.6 + rng() * 1.9) + i * 1.3) * 0.5 + 0.5;
      if (f < 0.55) continue;
      ctx.globalAlpha = (f - 0.55) * 1.1;
      px(ctx, x, y, 2 + rng() * 8, 1, C.teal4);
    }
    ctx.globalAlpha = 1;
    // 风中的浪花
    for (var k = 0; k < 5; k++) {
      var life = ((t * 0.22) + k / 5) % 1;
      ctx.globalAlpha = (1 - life) * 0.24;
      px(ctx, 30 + life * 420, 214 - life * 30, 10 + life * 26, 1, C.silver3);
    }
    ctx.globalAlpha = 1;
  });
  defBg('dawn', 'bg_dawn', { zoom: 0.05, panX: 7, panY: 3, seed: 10 }, function (ctx, t) {
    glowSoft(ctx, 372, 76, 84, C.gold2, 0.20, 9);
    motes(ctx, t, 36, 77, 0, 20, W, 170, C.cream, 0.32);
    ctx.globalAlpha = 0.13;
    px(ctx, (Math.sin(t * 0.06) * 26) | 0, 158, 460, 2, C.silver3);
    px(ctx, (70 + Math.cos(t * 0.045) * 34) | 0, 172, 400, 2, C.silver3);
    ctx.globalAlpha = 1;
  });
  defBg('void', null, null, function (ctx, t) {
    gradV(ctx, 0, 0, W, H, C.void0, C.vio0, true);
    var rng = makeRng(7777);
    for (var i = 0; i < 150; i++) {
      var x = (rng() * W) | 0, y = (rng() * H) | 0;
      var tw = Math.sin(t * (0.7 + rng() * 2.1) + i) * 0.5 + 0.5;
      if (tw < 0.34) continue;
      ctx.globalAlpha = 0.3 + tw * 0.7;
      px(ctx, x, y, rng() > 0.92 ? 2 : 1, 1, rng() > 0.6 ? C.white : C.lav2);
    }
    ctx.globalAlpha = 1;
  });

  /* ---- 季节变体：在已有底图上叠雪/花/叶/暗，省掉一半新图，又不至于换季没感觉 ---- */
  var SEASON = {
    winter:   { base: 'stones',  snow: 70, dim: 0.22, tint: 'rgba(120,140,190,0.16)' },
    samhain:  { base: 'stones',  fog: 3, dim: 0.22, tint: 'rgba(70,50,110,0.20)' },
    yule:     { base: 'cottage', snow: 46, dim: 0.10 },
    rainy:    { base: 'cottage', rain: 70, dim: 0.16 },
    village:  { base: 'dawn',    dim: 0.04 },
    spring:   { base: 'forest',  petals: 22, col: C.pink, dim: 0.0 },
    beltane:  { base: 'dawn',    petals: 26, col: C.green4, dim: 0.0 },
    midsummer:{ base: 'fire',    dim: 0.0 },
    harvest:  { base: 'stag',    petals: 18, col: C.gold2, dim: 0.0 }
  };
  Object.keys(SEASON).forEach(function (k) {
    var cfg = SEASON[k];
    defBg(k, 'bg_' + cfg.base, { zoom: 0.05, panX: 7, panY: 3, seed: 11 + k.length }, function (ctx, t) {
      if (cfg.snow) snow(ctx, t, cfg.snow, 55);
      if (cfg.rain) rain(ctx, t, cfg.rain, 0.45);
      if (cfg.petals) petals(ctx, t, cfg.petals, 77, cfg.col || C.pink);
      if (cfg.dim) {
        ctx.globalAlpha = cfg.dim;
        px(ctx, 0, 0, W, H, k === 'samhain' || k === 'winter' ? C.vio0 : C.void0);
        ctx.globalAlpha = 1;
      }
      if (cfg.fog) {
        for (var i = 0; i < cfg.fog; i++) {
          var off = (i * 37 + t * 3) % 480;
          ctx.globalAlpha = 0.12;
          px(ctx, off - 480, 186 + i * 7, 480, 2, C.silver3);
          px(ctx, off, 186 + i * 7, 480, 2, C.silver3);
        }
        ctx.globalAlpha = 1;
      }
      if (k === 'midsummer') { fireLight(ctx, 240, 228, 128, t, 1.4, 0.42); embers(ctx, t, 46, 24, 170, 310, 228, C.ember); }
    });
  });

  function paintBackground(ctx, name, t) {
    var fn = BG[name];
    if (!fn) { fn = BG.void; }
    ctx.save();
    fn(ctx, t || 0);
    ctx.restore();
  }

  /* ------------------------------ 缓存层 ------------------------------ */
  function makeLayer(w, h, draw) {
    var cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    draw(cv.getContext('2d'), w, h);
    return cv;
  }

  var vigCache = null;
  function vignette(ctx, strength) {
    if (!vigCache) {
      vigCache = makeLayer(W, H, function (c) {
        var cx = W / 2, cy = H / 2, maxD = Math.sqrt(cx*cx + cy*cy);
        for (var y = 0; y < H; y++) for (var x = 0; x < W; x++) {
          var d = Math.sqrt((x-cx)*(x-cx) + (y-cy)*(y-cy)) / maxD;
          var a = clamp((d - 0.34) / 0.66, 0, 1);
          a = a * a * 0.80;
          if (a > 0.02) { c.fillStyle = 'rgba(0,0,0,' + a.toFixed(3) + ')'; c.fillRect(x, y, 1, 1); }
        }
      });
    }
    ctx.globalAlpha = strength === undefined ? 1 : strength;
    ctx.drawImage(vigCache, 0, 0);
    ctx.globalAlpha = 1;
  }

  var scanCache = null;
  function scanlines(ctx, strength) {
    if (!scanCache) {
      scanCache = makeLayer(4, 4, function (c) {
        c.fillStyle = 'rgba(0,0,0,0.28)'; c.fillRect(0, 2, 4, 1);
        c.fillStyle = 'rgba(255,255,255,0.045)'; c.fillRect(0, 0, 4, 1);
      });
    }
    ctx.save();
    ctx.globalAlpha = strength === undefined ? 1 : strength;
    var pat = ctx.createPattern(scanCache, 'repeat');
    ctx.fillStyle = pat;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  // 过渡用的块状噪声（固定种子，一次生成）
  var noiseCache = null;
  function noiseMask(ctx, progress, col, opt) {
    // progress 0 = 完全遮住, 1 = 完全露出
    opt = opt || {};
    var bs = opt.block || 8;
    var cols = Math.ceil(W / bs), rows = Math.ceil(H / bs);
    if (!noiseCache || noiseCache.cols !== cols || noiseCache.rows !== rows) {
      var arr = new Float32Array(cols * rows);
      var rng = makeRng(20240501);
      for (var i = 0; i < arr.length; i++) arr[i] = rng();
      noiseCache = { cols: cols, rows: rows, arr: arr };
    }
    ctx.fillStyle = col || '#000000';
    var thr = progress * 1.25 - 0.12;
    for (var r = 0; r < rows; r++) for (var cc = 0; cc < cols; cc++) {
      if (noiseCache.arr[r * cols + cc] > thr) ctx.fillRect(cc * bs, r * bs, bs, bs);
    }
  }

  /* ------------------------------ UI 部件 ------------------------------ */
  // 像素面板：双层描边 + 四角铆钉 + 顶部高光 + 可选内阴影
  function panel(ctx, x, y, w, h, opt) {
    opt = opt || {};
    var edge = opt.edge || C.gold1, inner = opt.inner || C.gold0;
    if (opt.shadow) { ctx.globalAlpha = 0.42; px(ctx, x + 3, y + 3, w, h, '#000000'); ctx.globalAlpha = 1; }
    ctx.fillStyle = opt.fill || 'rgba(9,7,18,0.92)';
    ctx.fillRect(x, y, w, h);
    rectOutline(ctx, x, y, w, h, edge);
    rectOutline(ctx, x + 1, y + 1, w - 2, h - 2, inner);
    if (opt.glow) { rectOutline(ctx, x - 1, y - 1, w + 2, h + 2, mix(edge, '#000', 0.55)); }
    [[x,y],[x+w-3,y],[x,y+h-3],[x+w-3,y+h-3]].forEach(function (p) { px(ctx, p[0], p[1], 3, 3, edge); });
    ctx.globalAlpha = 0.14;
    px(ctx, x + 2, y + 2, w - 4, 1, C.white);
    px(ctx, x + 2, y + 2, 1, h - 4, C.white);
    ctx.globalAlpha = 1;
    if (opt.innerShadow) {
      ctx.globalAlpha = 0.30;
      px(ctx, x + 2, y + h - 3, w - 4, 1, '#000000');
      px(ctx, x + w - 3, y + 2, 1, h - 4, '#000000');
      ctx.globalAlpha = 1;
    }
  }

  // 羊皮纸面板：暖色底 + 毛边
  function parchPanel(ctx, x, y, w, h, opt) {
    opt = opt || {};
    ctx.fillStyle = opt.fill || C.parch;
    ctx.fillRect(x, y, w, h);
    ctx.globalAlpha = 0.5;
    var rng = makeRng(606);
    for (var i = 0; i < w * h / 26; i++) {
      px(ctx, x + (rng() * w) | 0, y + (rng() * h) | 0, 1, 1, rng() > 0.5 ? C.parch3 : C.cream);
    }
    ctx.globalAlpha = 1;
    rectOutline(ctx, x, y, w, h, opt.edge || C.brown2);
    rectOutline(ctx, x + 1, y + 1, w - 2, h - 2, opt.edge || C.tan);
  }

  function bar(ctx, x, y, w, h, ratio, colFill, colBack, opt) {
    opt = opt || {};
    px(ctx, x, y, w, h, colBack || C.void1);
    var fw = Math.round((w - 2) * clamp(ratio, 0, 1));
    if (fw > 0) {
      var cf = colFill || C.gold1;
      for (var i = 0; i < fw; i++) px(ctx, x + 1 + i, y + 1, 1, h - 2, mix(cf, opt.dark || C.brown1, (i / Math.max(1, fw)) * 0.45));
      ctx.globalAlpha = 0.4; px(ctx, x + 1, y + 1, fw, 1, C.white); ctx.globalAlpha = 1;
    }
    rectOutline(ctx, x, y, w, h, opt.edge || C.gold0);
  }

  function button(ctx, x, y, w, h, label, state, t) {
    // state: 'idle' | 'sel' | 'off'
    var edge = state === 'sel' ? C.gold3 : (state === 'off' ? C.slate2 : C.gold0);
    var fill = state === 'off' ? 'rgba(10,9,18,0.72)'
             : state === 'sel' ? 'rgba(60,42,12,0.94)' : 'rgba(16,12,28,0.86)';
    var xo = 0, yo = 0;
    if (state === 'sel') { var p = Math.sin(t * 5) * 0.5 + 0.5; xo = -1; yo = -1; if (p > 0.5) glowSoft(ctx, x + w/2, y + h/2, 34, C.gold1, 0.16, 5); }
    panel(ctx, x + xo, y + yo, w, h, { fill: fill, edge: edge, inner: state === 'sel' ? C.gold1 : mix(edge, '#000', 0.4), innerShadow: true });
    var col = state === 'off' ? C.gray0 : (state === 'sel' ? C.gold4 : C.parch);
    var tw = PixelFont.width(label, 11);
    PixelFont.draw(ctx, label, x + xo + (w - tw) / 2, y + yo + (h - 14) / 2, 11, col, {});
    if (state === 'sel') {
      var ax = x + xo + 5 + (Math.sin(t * 6) > 0 ? 0 : 1);
      px(ctx, ax, y + yo + h / 2 - 3, 1, 6, C.gold3);
      px(ctx, ax + 1, y + yo + h / 2 - 2, 1, 4, C.gold3);
      px(ctx, ax + 2, y + yo + h / 2 - 1, 1, 2, C.gold3);
    }
  }

  /* ------------------------------ 图标 ------------------------------ */
  // 全部用 rect 拼，坐标基于 (0,0)-(15,15) 的 16x16 网格，scale 可放大
  var ICONS = {};
  function moonPhase(c, col, right) {
    for (var y=1;y<15;y++) for(var x=1;x<15;x++) {
      if((x-7.5)*(x-7.5)+(y-7.5)*(y-7.5)<43) {
        px(c,x,y,1,1,((right&&x>=8)||(!right&&x<8))?col:'#302842');
      }
    }
  }
  ICONS.moonWaxing=function(c,a){moonPhase(c,a,true);};
  ICONS.moonWaning=function(c,a){moonPhase(c,a,false);};
  function icon(ctx, name, x, y, sc, col, col2) {
    var f = ICONS[name];
    if (!f) return;
    sc = sc || 1;
    ctx.save();
    ctx.translate(x | 0, y | 0);
    if (sc !== 1) ctx.scale(sc, sc);
    f(ctx, col || C.parch, col2 || C.gold1);
    ctx.restore();
  }
  function pxAt(ctx, gx, gy, gw, gh, col) { px(ctx, gx * 1, gy * 1, gw, gh, col); }

  ICONS.pentacle = function (c, a, b) {
    disc(c, 8, 8, 7, b); disc(c, 8, 8, 6, a);
    c.strokeStyle = b; c.lineWidth = 1.4; c.beginPath();
    for (var i = 0; i < 5; i++) {
      var ang = -Math.PI / 2 + i * (4 * Math.PI / 5);
      var xx = 8 + Math.cos(ang) * 5.2, yy = 8 + Math.sin(ang) * 5.2;
      if (i === 0) c.moveTo(xx, yy); else c.lineTo(xx, yy);
    }
    c.closePath(); c.stroke();
  };
  ICONS.athame = function (c, a, b) {         // 黑柄匕首
    px(c, 7, 1, 2, 9, C.silver2); px(c, 8, 1, 1, 9, C.silver3);
    px(c, 6, 9, 4, 1, b); px(c, 6, 10, 4, 1, b);
    px(c, 7, 11, 2, 4, C.brown0); px(c, 7, 11, 1, 4, C.slate1);
  };
  ICONS.boline = function (c, a, b) {         // 白柄小刀
    px(c, 7, 2, 2, 8, C.silver2);
    px(c, 5, 9, 6, 2, C.brown2); px(c, 6, 8, 2, 1, b);
    px(c, 7, 12, 2, 3, C.cream); px(c, 7, 12, 1, 3, C.parch2);
  };
  ICONS.wand = function (c, a, b) {
    for (var i = 0; i < 12; i++) px(c, 3 + i * 0.9, 13 - i * 0.95, 2, 2, i < 4 ? C.brown3 : (i < 9 ? C.brown2 : C.tan));
    px(c, 11, 3, 2, 2, b); px(c, 12, 2, 1, 1, C.gold3);
  };
  ICONS.chalice = function (c, a, b) {
    px(c, 4, 3, 8, 1, b); px(c, 4, 4, 8, 4, a); px(c, 5, 8, 6, 1, b);
    px(c, 7, 9, 2, 4, a); px(c, 5, 13, 6, 1, b);
    px(c, 5, 4, 1, 3, C.white);
  };
  ICONS.censer = function (c, a, b) {
    px(c, 3, 6, 10, 1, b); px(c, 4, 7, 8, 6, a); px(c, 5, 7, 1, 5, C.gold3);
    px(c, 7, 3, 2, 3, C.silver1); px(c, 6, 2, 4, 1, C.silver2);
    px(c, 5, 14, 6, 1, b);
  };
  ICONS.cord = function (c, a, b) {
    for (var i = 0; i < 5; i++) {
      ring(c, 8, 8, 6 - i, i % 2 ? a : b, 1);
    }
  };
  ICONS.candle = function (c, a, b) {
    px(c, 6, 6, 4, 8, a); px(c, 6, 6, 1, 8, C.white);
    px(c, 5, 14, 6, 1, b);
    px(c, 7, 4, 2, 2, C.gold3); px(c, 7, 2, 1, 2, C.cream);
  };
  ICONS.salt = function (c, a, b) {
    px(c, 3, 9, 10, 5, a); px(c, 4, 8, 8, 1, C.white);
    px(c, 4, 10, 8, 1, b); px(c, 5, 4, 1, 4, C.white); px(c, 7, 3, 1, 5, C.white);
    px(c, 9, 4, 1, 4, C.white);
  };
  ICONS.water = function (c, a, b) {
    px(c, 3, 6, 10, 7, a); px(c, 3, 6, 10, 2, mix(a, C.white, 0.35));
    px(c, 4, 13, 8, 1, b);
    px(c, 6, 4, 4, 1, C.teal3); px(c, 7, 3, 2, 1, C.teal4);
  };
  ICONS.book = function (c, a, b) {
    px(c, 2, 3, 12, 10, b); px(c, 3, 4, 10, 8, a);
    px(c, 7, 3, 1, 10, mix(a, '#000', 0.3));
    px(c, 4, 6, 2, 1, C.parch3); px(c, 9, 6, 2, 1, C.parch3);
    px(c, 4, 8, 2, 1, C.parch3); px(c, 9, 8, 2, 1, C.parch3);
  };
  ICONS.sword = function (c, a, b) {
    px(c, 7, 1, 2, 9, C.silver2); px(c, 8, 1, 1, 9, C.silver3);
    px(c, 4, 10, 8, 1, b); px(c, 7, 11, 2, 3, C.brown1);
    px(c, 6, 14, 4, 1, b);
  };
  ICONS.horn = function (c, a, b) {           // 鹿角（有角者）
    px(c, 7, 8, 2, 6, C.brown2);
    px(c, 5, 5, 1, 3, C.brown2); px(c, 4, 4, 1, 2, C.tan);
    px(c, 10, 5, 1, 3, C.brown2); px(c, 11, 4, 1, 2, C.tan);
    px(c, 3, 3, 1, 1, C.tan2); px(c, 12, 3, 1, 1, C.tan2);
  };
  ICONS.moon = function (c, a, b) {
    disc(c, 8, 8, 6, b); disc(c, 9, 7, 6, a === C.none ? 'rgba(0,0,0,0)' : a);
  };
  ICONS.star = function (c, a) {
    px(c, 7, 1, 2, 14, a); px(c, 1, 7, 14, 2, a);
    px(c, 4, 4, 8, 8, a); px(c, 6, 6, 4, 4, a);
  };
  ICONS.leaf = function (c, a, b) {
    px(c, 7, 2, 2, 12, b);
    px(c, 4, 3, 4, 3, a); px(c, 8, 5, 4, 3, a);
    px(c, 4, 8, 4, 3, a); px(c, 8, 9, 4, 3, a);
  };
  ICONS.flame = function (c, a, b) {
    px(c, 7, 2, 2, 3, C.gold3); px(c, 6, 4, 4, 4, C.gold2);
    px(c, 5, 7, 6, 5, b); px(c, 6, 12, 4, 2, C.red2);
    px(c, 7, 8, 2, 4, C.cream);
  };
  ICONS.eye = function (c, a, b) {
    px(c, 1, 7, 14, 2, b); px(c, 3, 5, 10, 1, b); px(c, 3, 10, 10, 1, b);
    disc(c, 8, 8, 3, a); disc(c, 8, 8, 1, C.void0);
  };
  ICONS.key = function (c, a, b) {
    ring(c, 5, 5, 3, b, 2); disc(c, 5, 5, 1, C.void0);
    px(c, 6, 7, 2, 8, b); px(c, 8, 12, 3, 1, b); px(c, 8, 14, 3, 1, b);
  };
  ICONS.circle = function (c, a, b) {
    ring(c, 8, 8, 7, b, 2); ring(c, 8, 8, 4, a, 1);
    px(c, 8, 1, 1, 2, C.gold3); px(c, 8, 13, 1, 2, C.gold3);
    px(c, 1, 8, 2, 1, C.gold3); px(c, 13, 8, 2, 1, C.gold3);
  };
  ICONS.scroll = function (c, a, b) {
    px(c, 3, 3, 10, 10, a); px(c, 3, 3, 10, 1, b); px(c, 3, 12, 10, 1, b);
    px(c, 5, 5, 6, 1, C.parch3); px(c, 5, 7, 6, 1, C.parch3); px(c, 5, 9, 4, 1, C.parch3);
  };
  ICONS.seed = function (c, a, b) {
    disc(c, 8, 9, 4, a); px(c, 7, 3, 2, 6, b);
    px(c, 4, 5, 3, 1, b); px(c, 9, 6, 3, 1, b);
  };
  ICONS.wind = function (c, a, b) {
    px(c, 2, 5, 9, 1, b); px(c, 2, 8, 12, 1, a); px(c, 2, 11, 7, 1, a);
  };
  ICONS.scale = function (c, a, b) {          // 天平：伦理
    px(c, 7, 2, 2, 11, b); px(c, 3, 13, 10, 1, b);
    px(c, 2, 4, 12, 1, b); px(c, 2, 5, 1, 3, a); px(c, 13, 5, 1, 3, a);
    px(c, 1, 8, 3, 1, a); px(c, 12, 8, 3, 1, a);
  };
  // 下面五个是补画：第八章 arrange、第十章符印 dawnoath 已经用到，之前漏了会画成空白
  ICONS.sun = function (c, a, b) {            // 太阳：神男 / 一年之轮的阳面
    disc(c, 8, 8, 4, a); disc(c, 8, 8, 2, b);
    px(c, 7, 0, 2, 2, b); px(c, 7, 14, 2, 2, b);
    px(c, 0, 7, 2, 2, b); px(c, 14, 7, 2, 2, b);
    px(c, 2, 2, 2, 2, b); px(c, 12, 2, 2, 2, b);
    px(c, 2, 12, 2, 2, b); px(c, 12, 12, 2, 2, b);
  };
  ICONS.snow = function (c, a, b) {           // 雪花：冬至 / 冬
    px(c, 7, 1, 2, 14, b); px(c, 1, 7, 14, 2, b);
    for (var i = 0; i < 4; i++) {
      px(c, 4 + i, 4 + i, 2, 2, a); px(c, 10 - i, 4 + i, 2, 2, a);
      px(c, 4 + i, 10 - i, 2, 2, a); px(c, 10 - i, 10 - i, 2, 2, a);
    }
    px(c, 7, 7, 2, 2, C.white);
  };
  ICONS.flower = function (c, a, b) {         // 花：春分 / 五朔
    px(c, 6, 3, 4, 4, a); px(c, 3, 6, 4, 4, a);
    px(c, 9, 6, 4, 4, a); px(c, 6, 9, 4, 4, a);
    px(c, 6, 6, 4, 4, b);
    px(c, 7, 12, 2, 4, C.green3); px(c, 4, 12, 3, 1, C.green2); px(c, 9, 14, 3, 1, C.green2);
  };
  ICONS.bread = function (c, a, b) {          // 面包：收获节 / 男神像
    disc(c, 8, 9, 6, b);
    for (var y = 4; y < 15; y++) for (var x = 2; x < 14; x++)
      if ((x - 8) * (x - 8) / 36 + (y - 9) * (y - 9) / 30 < 1) px(c, x, y, 1, 1, a);
    px(c, 4, 6, 2, 1, b); px(c, 8, 5, 2, 1, b); px(c, 11, 6, 2, 1, b);
  };
  ICONS.cauldron = function (c, a, b) {       // 大釜：女神 / 重生
    disc(c, 8, 9, 5, a); disc(c, 8, 9, 3, C.void0);
    px(c, 3, 6, 10, 2, b); px(c, 5, 4, 6, 1, b);
    px(c, 11, 4, 1, 3, b); px(c, 1, 8, 2, 2, b); px(c, 13, 8, 2, 2, b);
    px(c, 6, 12, 4, 2, C.slate1);
  };

  /* ---------------------------- 参数化小人 ---------------------------- */
  // (x, y) 锚在脚底中心。只支持整数倍缩放，保证 fillRect 落在整像素上。
  function drawPerson(ctx, cfg, x, y, opt) {
    opt = opt || {};
    var sc = opt.scale || 1;
    var t = opt.t || 0, phase = opt.phase || 0;
    var bob = (Math.sin(t * 2.6 + phase) > 0 ? 0 : 1) * sc;
    var alpha = opt.alpha === undefined ? 1 : opt.alpha;
    var flip = opt.flip ? -1 : 1;
    var Robe = cfg.robe || C.brown2, RobeDk = cfg.robeDk || shade(Robe, 0.4);
    var Skin = cfg.skin || C.skin2, Hair = cfg.hair || C.brown1;
    if (alpha < 1) ctx.globalAlpha = alpha;
    // 脚底阴影
    ctx.globalAlpha = alpha * 0.36;
    disc(ctx, x, y - 1 * sc, 7 * sc, '#000000');
    ctx.globalAlpha = alpha;

    var bx = x, by = y - bob;   // by = 脚底
    // 袍身（梯形）
    for (var r = 0; r < 15 * sc; r++) {
      var w = (7 + Math.floor(r / (5 * sc))) * sc;
      px(ctx, bx - w / 2, by - r - 1, w, 1, r > 10 * sc ? Robe : (r > 3 * sc ? Robe : shade(Robe, 0.12)));
    }
    px(ctx, bx - 7 * sc, by - 1, 14 * sc, 1, RobeDk);
    // 手臂
    px(ctx, bx - 9 * sc, by - 13 * sc, 3 * sc, 6 * sc, Robe);
    px(ctx, bx + 6 * sc, by - 13 * sc, 3 * sc, 6 * sc, RobeDk);
    px(ctx, bx - 9 * sc, by - 8 * sc, 3 * sc, 2 * sc, Skin);
    px(ctx, bx + 6 * sc, by - 8 * sc, 3 * sc, 2 * sc, Skin);
    // 头
    px(ctx, bx - 4 * sc, by - 22 * sc, 8 * sc, 7 * sc, Skin);
    px(ctx, bx - 4 * sc, by - 22 * sc, 8 * sc, 2 * sc, Hair);
    // 头发
    if (cfg.hairStyle === 'hood') {
      px(ctx, bx - 6 * sc, by - 24 * sc, 12 * sc, 10 * sc, Robe);
      px(ctx, bx - 5 * sc, by - 20 * sc, 10 * sc, 6 * sc, shade(Robe, 0.25));
      px(ctx, bx - 3 * sc, by - 20 * sc, 6 * sc, 5 * sc, '#000000');
      px(ctx, bx - 3 * sc, by - 19 * sc, 6 * sc, 4 * sc, Skin);
    } else if (cfg.hairStyle === 'long') {
      px(ctx, bx - 5 * sc, by - 24 * sc, 10 * sc, 4 * sc, Hair);
      px(ctx, bx - 6 * sc, by - 22 * sc, 2 * sc, 10 * sc, Hair);
      px(ctx, bx + 4 * sc, by - 22 * sc, 2 * sc, 10 * sc, shade(Hair, 0.2));
    } else if (cfg.hairStyle === 'bald') {
      /* 无 */
    } else {
      px(ctx, bx - 5 * sc, by - 24 * sc, 10 * sc, 3 * sc, Hair);
      px(ctx, bx - 5 * sc, by - 23 * sc, 2 * sc, 4 * sc, Hair);
      px(ctx, bx + 3 * sc, by - 23 * sc, 2 * sc, 4 * sc, shade(Hair, 0.2));
    }
    // 五官
    if (!cfg.noFace) {
      px(ctx, bx - 2 * sc, by - 19 * sc, 1 * sc, 1 * sc, C.void0);
      px(ctx, bx + 1 * sc, by - 19 * sc, 1 * sc, 1 * sc, C.void0);
      if (opt.talking && Math.sin(t * 14) > 0) px(ctx, bx - 1 * sc, by - 17 * sc, 2 * sc, 1 * sc, shade(Skin, 0.5));
      else px(ctx, bx - 1 * sc, by - 17 * sc, 2 * sc, 1 * sc, shade(Skin, 0.28));
    }
    // 配件
    var ex = cfg.extras || [];
    for (var i = 0; i < ex.length; i++) {
      if (ex[i] === 'lantern') {
        var lx = bx + 10 * sc, ly = by - 10 * sc;
        px(ctx, lx - 1, ly, 1, 2, C.slate1);
        px(ctx, lx - 2, ly + 2, 5, 5, C.brown2);
        px(ctx, lx - 1, ly + 3, 3, 3, C.gold3);
        glow(ctx, lx, ly + 4, 12 * sc, C.gold2, 0.5 + Math.sin(t * 6) * 0.12);
      } else if (ex[i] === 'staff') {
        px(ctx, bx - 11 * sc, by - 26 * sc, 2 * sc, 26 * sc, C.brown2);
        px(ctx, bx - 11 * sc, by - 26 * sc, 1 * sc, 26 * sc, C.brown3);
      } else if (ex[i] === 'book') {
        px(ctx, bx + 5 * sc, by - 12 * sc, 6 * sc, 5 * sc, C.brown1);
        px(ctx, bx + 6 * sc, by - 11 * sc, 4 * sc, 3 * sc, C.parch);
      } else if (ex[i] === 'crown') {
        px(ctx, bx - 4 * sc, by - 26 * sc, 8 * sc, 2 * sc, C.gold2);
        px(ctx, bx - 3 * sc, by - 27 * sc, 1 * sc, 1 * sc, C.gold3);
        px(ctx, bx, by - 27 * sc, 1 * sc, 1 * sc, C.gold3);
        px(ctx, bx + 2 * sc, by - 27 * sc, 1 * sc, 1 * sc, C.gold3);
      } else if (ex[i] === 'halo') {
        ctx.globalAlpha = alpha * (0.5 + Math.sin(t * 2) * 0.2);
        ring(ctx, bx, by - 27 * sc, 6 * sc, C.gold3, 1);
        ctx.globalAlpha = alpha;
      }
    }
    ctx.globalAlpha = 1;
  }

  /* ---------------------------- 像素中文字体 ---------------------------- */
  var PixelFont = (function () {
    /* 旧版用系统黑体在 9~11px 下渲染再二值化：黑体是矢量字，缩到这么小时
     * 相邻的撇、捺、点被挤进同一个像素，二值化后粘成一团 —— 玩家认不出是什么字。
     * 现在内嵌开源点阵字体 Fusion Pixel（SIL OFL 1.1，字形逐像素手绘）：
     *   - 只在它的原生字号 10px / 12px 上渲染，需要更大时整数倍放大，
     *     每一笔都落在整像素上，不会再有半像素灰边被二值化"吃掉"或"粘连"；
     *   - 调用方传的逻辑字号 size 先映射成 原生字号 × 整数倍（见 spec）。
     * 字体没载入（极旧浏览器）时退回系统黑体，行为和旧版一致。 */
    /* 字体表：
     *   lem = 乐米像素体（免费商用，正文主力）。它自带抗锯齿，**不要二值化** ——
     *         二值化会把灰边切成毛刺，反而更糊（已做 A/B 对比确认）。
     *   f10/f12 = Fusion Pixel（拉丁、数字、极小角标），SIL OFL 1.1。 */
    var FACE = { lem: 'SLLemi', 10: 'SLPixel10', 12: 'SLPixel12' };
    var FALLBACK = '"SimHei","Microsoft YaHei","PingFang SC","Hiragino Sans GB","Noto Sans SC",sans-serif';
    /* 二值化阈值：0 = 关闭（保留字体自带的抗锯齿）。给硬网格点阵字体准备的老逻辑留着，
       换字体时改这一行即可。 */
    var THRESHOLD = 0, PAD = 2;
    var pixelReady = false;

    /* 逻辑字号 → 实际渲染方式。乐米像素体直接按 12px 渲染，不再做 10→12 那种放大。
       注意：10 与 12 落在同一档（字形高都是 11px），这是有意的 ——
       12px 是对话框正文的字号，改它的档位会连带把正文放大一倍。
       想让某个位置"看起来更大"，用更大的逻辑字号（16/24/30）或换颜色，别动这里的边界。 */
    function spec(size) {
      if (!pixelReady) return { base: size, sc: 1, lh: Math.ceil(size * 1.5), top: Math.round(size * 0.16), face: 12 };
      if (size >= 24) return { base: 12, sc: 3, lh: 42, top: 3, face: 'lem' };
      if (size >= 16) return { base: 12, sc: 2, lh: 28, top: 2, face: 'lem' };
      if (size >= 10) return { base: 12, sc: 1, lh: 16, top: 1, face: 'lem' };
      return { base: 10, sc: 1, lh: 13, top: 1, face: 10 };
    }
    function fontFor(base, weight) {
      return (weight || '') + ' ' + (base === 'lem' ? 12 : base) + 'px ' +
        (pixelReady ? '"' + FACE[base] + '",' + FALLBACK : FALLBACK);
    }

    var measCtx = null;
    function getMeasCtx() {
      if (!measCtx) {
        var cv = document.createElement('canvas');
        cv.width = 8; cv.height = 8;
        measCtx = cv.getContext('2d');
      }
      return measCtx;
    }
    function parseColor(col) {
      col = String(col).trim();
      if (col.charAt(0) === '#') {
        var h = col.slice(1);
        if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
        return [parseInt(h.substr(0,2),16), parseInt(h.substr(2,2),16), parseInt(h.substr(4,2),16), 1];
      }
      var m = /rgba?\(([^)]+)\)/.exec(col);
      if (m) {
        var p = m[1].split(',');
        return [parseFloat(p[0])||0, parseFloat(p[1])||0, parseFloat(p[2])||0,
                p.length > 3 ? (parseFloat(p[3])||0) : 1];
      }
      return [255,255,255,1];
    }

    /* 逐字推进宽度：按 (size, weight, 文本) 缓存整串的每字宽度数组。
     * 全引擎只有这一个"测文字"的地方 —— width() 求和、wrap() 累加、build() 取
     * 字符位置，三者用的是同一份数据，所以"量出来的宽度"和"画出来的宽度"
     * 一定一致。像素字体下宽度取整后再乘倍数，保证字距也是整像素。 */
    var advCache = {}, advCount = 0;
    function advances(text, size, weight) {
      var key = size + '|' + (weight || '') + '|' + text;
      var hit = advCache[key];
      if (hit) return hit;
      var sp = spec(size), c = getMeasCtx();
      c.font = fontFor(sp.base, weight);
      var xs = new Array(text.length);
      for (var i = 0; i < text.length; i++) {
        var w = c.measureText(text[i]).width;
        xs[i] = pixelReady ? Math.round(w) * sp.sc : w;
      }
      if (advCount > 3000) { advCache = {}; advCount = 0; }
      advCache[key] = xs; advCount++;
      return xs;
    }

    var widthCache = {}, widthCount = 0;
    function width(text, size, weight) {
      var key = size + '|' + (weight || '') + '|' + text;
      var v = widthCache[key];
      if (v !== undefined) return v;
      var xs = advances(text, size, weight), acc = 0;
      for (var i = 0; i < xs.length; i++) acc += xs[i];
      if (widthCount > 3000) { widthCache = {}; widthCount = 0; }
      widthCache[key] = acc; widthCount++;
      return acc;
    }

    var textCache = {}, textCount = 0;
    function build(text, size, col, weight) {
      var key = size + '|' + col + '|' + (weight || '') + '|' + text;
      var hit = textCache[key];
      if (hit) return hit;
      var sp = spec(size);
      var adv = advances(text, size, weight), total = 0;
      for (var q = 0; q < adv.length; q++) total += adv[q];
      // 先在原生字号下逐字画（逐字画保证每个字起点就是 advances 算出来的整像素位置）
      var bw = Math.ceil(total / sp.sc) + PAD * 2, bh = sp.lh / sp.sc;
      var cv = document.createElement('canvas');
      cv.width = Math.max(1, bw); cv.height = Math.max(1, bh + 8);   // 先留出纵向余量，后面按墨迹裁
      var c = cv.getContext('2d');
      c.font = fontFor(sp.base, weight);
      c.textBaseline = 'top';
      c.fillStyle = '#ffffff';
      var x = PAD, ty = pixelReady ? 1 : sp.top;
      for (var k0 = 0; k0 < text.length; k0++) {
        c.fillText(text[k0], x, ty);
        x += adv[k0] / sp.sc;
      }
      var img = c.getImageData(0, 0, cv.width, cv.height);
      var d = img.data, rgb = parseColor(col);
      /* 纵向按"真的有字"的范围裁掉上下空白。
         为什么必须裁：本字体自带上下的 alpha 羽化，而 getImageData 的阈值判定
         会让**整个字块整体下移 1 像素**。于是字实际坐在第 1~15 行，可画布只有
         lh 高、调用方又按 size 排行距，字就溢出了自己那一行 —— 表现是标题页
         "英文副标题压在中文副标题上"这种行间重叠。
         裁掉空白之后，字块高度 == 字形高度，行距才真的等于我们以为的间距。 */
      var inkTop = -1, inkBot = -1;
      for (var yy = 0; yy < cv.height && inkTop < 0; yy++) {
        for (var xx = 0; xx < cv.width; xx++) if (d[(yy * cv.width + xx) * 4 + 3] > 0) { inkTop = yy; break; }
      }
      for (var y2 = cv.height - 1; y2 >= 0 && inkBot < 0; y2--) {
        for (var x2 = 0; x2 < cv.width; x2++) if (d[(y2 * cv.width + x2) * 4 + 3] > 0) { inkBot = y2; break; }
      }
      if (inkTop < 0) { inkTop = 0; inkBot = 0; }
      var inkH = inkBot - inkTop + 1;
      for (var i = 0; i < d.length; i += 4) {
        /* THRESHOLD = 0 时这一遍只做"上色 + 按 alpha 保留"，不改抗锯齿；
           阈值 > 0 时才是老的硬边二值化（给 Fusion Pixel 那种硬网格字体用）。 */
        if (d[i+3] > THRESHOLD) {
          d[i] = rgb[0]; d[i+1] = rgb[1]; d[i+2] = rgb[2];
          d[i+3] = Math.round(d[i+3] * rgb[3]);
        } else d[i+3] = 0;
      }
      c.putImageData(img, 0, 0);
      /* 把画布裁到"真的有字"的那几行（保留左右 PAD 与纵向既定的视觉位置）。
         inkTop 一般 == 1（阈值造成的整体下移），裁掉它之后字块高度 = 字形高度。 */
      var cut = document.createElement('canvas');
      cut.width = Math.max(1, cv.width); cut.height = Math.max(1, inkH);
      cut.getContext('2d').drawImage(cv, 0, inkTop, cv.width, inkH, 0, 0, cv.width, inkH);
      var out = cut;
      if (sp.sc > 1) {                                  // 整数倍最近邻放大
        out = document.createElement('canvas');
        out.width = cut.width * sp.sc; out.height = cut.height * sp.sc;
        var o = out.getContext('2d');
        o.imageSmoothingEnabled = false;
        o.drawImage(cut, 0, 0, out.width, out.height);
      }
      var P = PAD * sp.sc;
      var xs = [P], acc = P;
      for (var k = 0; k < adv.length; k++) { acc += adv[k]; xs.push(acc); }
      /* 纵向落点要补偿裁掉的行数 + 阈值造成的下移，否则整行字会往上跳 1 像素。
         inkTop 是"字的顶端在原生画布里的行号"，所以绘制时往上偏移 inkTop 即可还原。 */
      var rec = {
        canvas: out, xs: xs, width: total + P * 2, height: out.height, pad: P,
        yOff: -inkTop * sp.sc
      };
      if (textCount > 2400) { textCache = {}; textCount = 0; }
      textCache[key] = rec; textCount++;
      return rec;
    }

    // opts.n = 只画前 n 个字符（打字机）；n 必须取整，且阴影共用同一裁剪宽度
    function draw(ctx, text, x, y, size, col, opts) {
      opts = opts || {};
      if (!text) return 0;
      var n = (opts.n === undefined || opts.n === null) ? text.length : Math.floor(opts.n);
      n = clamp(n, 0, text.length);
      if (n <= 0) return 0;
      var dx0 = 0;
      if (opts.align === 'center') dx0 = -Math.floor(width(text, size, opts.weight) / 2);
      else if (opts.align === 'right') dx0 = -Math.floor(width(text, size, opts.weight));
      function blit(rec, dx, dy) {
        var w = Math.max(1, Math.ceil(rec.xs[n] - rec.xs[0] + rec.pad));
        /* rec.yOff 补偿"裁掉的空白行 + 阈值造成的整体下移"，让字形仍落在调用方
           指定的那一行上 —— 不补的话所有文字会整体上跳 1 像素。 */
        ctx.drawImage(rec.canvas, 0, 0, w, rec.height,
          Math.round(x) + dx0 - rec.pad + dx, Math.round(y) + dy + (rec.yOff || 0), w, rec.height);
      }
      if (opts.shadow) {
        var sd = spec(size).sc;
        blit(build(text, size, opts.shadow, opts.weight), opts.shadowDX || sd, opts.shadowDY || sd);
      }
      var rec = build(text, size, col, opts.weight);
      blit(rec, 0, 0);
      return rec.width - rec.pad * 2;
    }

    // 打字机"整行"绘制：按行号 + 该行已显示字数，避免跨行累加的 off-by-one
    function drawLines(ctx, lines, x, y, size, col, budget, lineH, opts) {
      opts = opts || {};
      var used = 0;
      for (var i = 0; i < lines.length; i++) {
        var n = Math.max(0, Math.min(lines[i].length, budget - used));
        if (n > 0) {
          draw(ctx, lines[i], x, y + i * lineH, size, col,
               { n: n, shadow: opts.shadow, weight: opts.weight });
        }
        used += lines[i].length;
        if (used >= budget) break;
      }
    }

    /* 折行：中文按字断；行首不放标点（，。、；：？！」』）…），
     * 遇到时把上一行最后一个字一起带下来，避免"孤零零一个逗号开头"。 */
    var NO_HEAD = '，。、；：？！」』）》…—,.;:?!)';
    var wrapCache = {}, wrapCount = 0;
    function wrap(text, size, maxWidth) {
      var key = size + '|' + maxWidth + '|' + text;
      var hit = wrapCache[key];
      if (hit !== undefined) return hit;
      var adv = advances(text, size);
      var lines = [], cur = '', curW = 0;
      for (var i = 0; i < text.length; i++) {
        var ch = text[i];
        if (ch === '\n') { lines.push(cur); cur = ''; curW = 0; continue; }
        if (curW + adv[i] > maxWidth && cur.length > 0) {
          if (NO_HEAD.indexOf(ch) >= 0 && cur.length > 1) {
            var last = cur.charAt(cur.length - 1);
            lines.push(cur.slice(0, -1));
            cur = last + ch; curW = adv[i - 1] + adv[i];
          } else {
            lines.push(cur);
            cur = ch; curW = adv[i];
          }
        } else {
          cur += ch; curW += adv[i];
        }
      }
      if (cur.length) lines.push(cur);
      if (wrapCount > 2000) { wrapCache = {}; wrapCount = 0; }
      wrapCache[key] = lines; wrapCount++;
      return lines;
    }

    function clearCaches() {
      advCache = {}; advCount = 0; widthCache = {}; widthCount = 0;
      textCache = {}; textCount = 0; wrapCache = {}; wrapCount = 0;
    }

    /* fonts = { lem: dataURI, f10: dataURI, f12: dataURI }
       正文用的 lem 是必需项；缺了就直接退回系统字体（宁可不换字体，也不要半套） */
    function load(fonts, done) {
      if (!fonts || typeof FontFace === 'undefined' || !document.fonts) { done(false); return; }
      var need = [['lem', 'lem'], ['f10', 10], ['f12', 12]];
      var jobs = [];
      var missing = [];
      need.forEach(function (pair) {
        var src = fonts[pair[0]];
        if (!src) { missing.push(pair[0]); return; }
        try {
          var ff = new FontFace(FACE[pair[1]], 'url(' + src + ')');
          jobs.push(ff.load().then(function (f) { document.fonts.add(f); }));
        } catch (e) { missing.push(pair[0]); }
      });
      if (missing.length) { console.warn('缺少字体数据：' + missing.join(',')); done(false); return; }
      Promise.all(jobs).then(function () {
        pixelReady = true; clearCaches(); done(true);
      }, function (e) { console.warn('像素字体载入失败，改用系统字体', e); done(false); });
    }

    return {
      draw: draw, drawLines: drawLines, width: width, wrap: wrap, load: load,
      lineHeight: function (size) { return spec(size).lh; },
      isPixel: function () { return pixelReady; },
      stats: function () { return { text: textCount, width: widthCount, wrap: wrapCount, adv: advCount }; }
    };
  })();

  /* ------------------------------ 其他 ------------------------------ */
  function fade(ctx, a) {
    if (a <= 0) return;
    var p = clamp(a, 0, 1);
    ctx.globalAlpha = p; px(ctx, 0, 0, W, H, '#000000'); ctx.globalAlpha = 1;
  }
  function flash(ctx, col, a) {
    if (a <= 0) return;
    ctx.globalAlpha = clamp(a, 0, 1); px(ctx, 0, 0, W, H, col || C.white); ctx.globalAlpha = 1;
  }
  function letterbox(ctx, h) {
    if (h <= 0) return;
    px(ctx, 0, 0, W, h, '#000000');
    px(ctx, 0, H - h, W, h, '#000000');
  }
  function circleMask(ctx, cx, cy, r, invert) {
    // 用路径裁切：圆场过渡
    ctx.save();
    ctx.beginPath();
    if (invert) { ctx.rect(0, 0, W, H); ctx.arc(cx, cy, Math.max(0, r), 0, 6.2832, true); }
    else ctx.arc(cx, cy, Math.max(0, r), 0, 6.2832);
    ctx.clip();
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  return {
    W: W, H: H, C: C,
    clamp: clamp, lerp: lerp, ease: ease, easeOut: easeOut, easeIn: easeIn, makeRng: makeRng,
    px: px, rectOutline: rectOutline, line: line, disc: disc, ring: ring,
    glow: glow, glowSoft: glowSoft, mix: mix, shade: shade, tint: tint,
    gradV: gradV, gradH: gradH,
    loadImages: loadImages, tex: tex, IMG: IMG, imagesReady: function () { return IMG_READY; },
    drawPlate: drawPlate, BG: BG, paintBackground: paintBackground, defBg: defBg,
    vignette: vignette, scanlines: scanlines, noiseMask: noiseMask, makeLayer: makeLayer,
    panel: panel, parchPanel: parchPanel, bar: bar, button: button,
    icon: icon, ICONS: ICONS, drawPerson: drawPerson,
    fade: fade, flash: flash, letterbox: letterbox, circleMask: circleMask,
    PixelFont: PixelFont,
    fireflies: fireflies, motes: motes, embers: embers, petals: petals,
    snow: snow, rain: rain, fireLight: fireLight, lightShaft: lightShaft
  };
})();
var PixelFont = Art.PixelFont;
if (typeof module !== 'undefined') module.exports = Art;
