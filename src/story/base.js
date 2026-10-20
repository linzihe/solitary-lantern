/* 剧本骨架：章节表 + 合并函数。各章内容在 src/story/chXX.js 里用 STORY_ADD 追加。 */
var STORY = {
  meta: {
    title: '独 修 者 的 灯',
    titleEn: 'THE SOLITARY LANTERN',
    sub: '一本能玩的《威卡：独修者指南》',
    src: '知识参考 Scott Cunningham《Wicca》第一部分；人物与剧情为原创改编。',
    version: '2.0 · 一年之轮',
    contentVersion: '2.0'
  },
  startScene: 'prologue',
  chapters: [
    { id: 'p0',  n: 0,  title: '序章 · 守夜',       sub: '石圈边的灯',   scene: 'prologue',  bg: 'stones' },
    { id: 'c1',  n: 1,  title: '第一章 · 萨满的鼓', sub: '威卡与萨满',   scene: 'c1_forest', bg: 'forest' },
    { id: 'c2',  n: 2,  title: '第二章 · 三面之神', sub: '神祇',         scene: 'c2_moon',   bg: 'moon' },
    { id: 'c3',  n: 3,  title: '第三章 · 三条河',   sub: '魔法',         scene: 'c3_study',  bg: 'study' },
    { id: 'c4',  n: 4,  title: '第四章 · 十一件',   sub: '工具',         scene: 'c4_altar',  bg: 'altar' },
    { id: 'c5',  n: 5,  title: '第五章 · 鼓舞与手', sub: '音乐舞蹈手势', scene: 'c5_dance',  bg: 'fire' },
    { id: 'c6',  n: 6,  title: '第六章 · 仪式之前', sub: '仪式与准备',   scene: 'c6_prep',   bg: 'cottage' },
    { id: 'c7',  n: 7,  title: '第七章 · 圈与祭坛', sub: '魔法圈与祭坛', scene: 'c7_circle', bg: 'wheel' },
    { id: 'c8',  n: 8,  title: '第八章 · 一年之轮', sub: '力量之日',     scene: 'c8_wheel',  bg: 'winter' },
    { id: 'c9',  n: 9,  title: '第九章 · 重生螺旋', sub: '重生',         scene: 'c9_spiral', bg: 'samhain' },
    { id: 'c10', n: 10, title: '第十章 · 无人授予', sub: '关于入门',     scene: 'c10_init',  bg: 'winter' },
    { id: 'end', n: 11, title: '尾声 · 黎明',       sub: '你自己的路',   scene: 'ending',    bg: 'dawn' }
  ],
  scenes: {}, codex: {}, trials: {}, sigils: {}, achv: {
    firststep: { name: '把灯接过去', desc: '走完序章' },
    perfect:   { name: '一次没错',   desc: '任意一个小游戏全对' },
    scholar:   { name: '较真的人',   desc: '看清 60 条图鉴' },
    allsigil:  { name: '挂满一墙',   desc: '集齐全部符印' },
    explorer:  { name: '什么都想摸', desc: '所有探索点都看过' },
    finished:  { name: '一年的路',   desc: '走完十章' }
  },
  __dups: []
};

function STORY_ADD(part) {
  ['scenes', 'codex', 'trials', 'sigils', 'achv'].forEach(function (k) {
    var src = part[k];
    if (!src) return;
    for (var id in src) if (Object.prototype.hasOwnProperty.call(src, id)) {
      if (STORY[k][id]) STORY.__dups.push(k + ':' + id);
      STORY[k][id] = src[id];
    }
  });
}
