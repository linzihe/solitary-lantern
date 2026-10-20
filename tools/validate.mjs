// 剧本校验：node tools/validate.mjs [chXX ...] [--ends]
// 加载 src/story/base.js 与全部 chXX.js，检查结构、引用、长度。
//   node tools/validate.mjs            全量校验：悬空的场景引用算错误（交付前必须 0 错误）
//   node tools/validate.mjs ch03       只校验 ch03（属主线可分派：缺的其它章节只报「分派」不算错误）
//   --ends                             额外打印每章出口与跨界依赖清单
// 能力白名单（bg / bgm / sfx / icon / 指令）直接读 src/art.js、src/audio.js、src/engine.js，
// 所以这里不会再出现「白名单写着引擎里没有的东西」这种假错误。
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'src', 'story');
const argv = process.argv.slice(2);
const showEnds = argv.includes('--ends');
const only = argv.filter(a => !a.startsWith('--'));
const strict = only.length === 0;         // 全量模式才把「引用未定义场景」当错误

// ---------- 从引擎/美术/音频里读出真实能力 ----------
const rd = p => fs.readFileSync(path.join(root, p), 'utf8');
const artSrc = rd('src/art.js');
const audioSrc = rd('src/audio.js');
const engineSrc = rd('src/engine.js');
const uniq = a => [...new Set(a)];
const uiSrc = rd('src/ui.js');
const BG = uniq([
  ...[...artSrc.matchAll(/defBg\('([a-z0-9]+)'/g)].map(m => m[1]),
  ...[...artSrc.matchAll(/([a-z]+)\s*:\s*\{\s*base:/g)].map(m => m[1]),
  'void'
]).sort();
const ICON = uniq([...artSrc.matchAll(/\bICONS\.([A-Za-z]+)\s*=/g)].map(m => m[1]));
const BGM = uniq([
  ...[...audioSrc.matchAll(/^\s*([a-z]+)\s*:\s*\{\s*title\s*:/gm)].map(m => m[1]),
  ...[...audioSrc.matchAll(/TRACKS\.([a-z]+)\s*=\s*Object/g)].map(m => m[1])
]);
const cueBlock = audioSrc.match(/var cues=\{([^}]*)\}/);
const SFX = cueBlock ? uniq([...cueBlock[1].matchAll(/([a-z0-9]+):\[/g)].map(m => m[1])).concat(['blip']) : [];
const OPS = uniq([...engineSrc.matchAll(/case '([a-zA-Z]+)':/g)].map(m => m[1]));
const POR = ['keeper', 'skeptic', 'he', 'bai', 'goddess', 'god'];
const WHO = ['player', 'keeper', 'chen', 'he', 'bai', 'goddess', 'god'];
const KINDS = uniq([...uiSrc.matchAll(/\bkind\s*===?\s*'([a-z]+)'/g)].map(m => m[1]));

// 章节表是契约：入口场景 id 由 base.js 的 chapters 固定
const files = fs.readdirSync(dir).filter(f => /^ch\d+\.js$/.test(f)).sort();
const ctx = { console };
vm.createContext(ctx);
vm.runInContext(rd('src/story/base.js'), ctx, { filename: 'base.js' });

const origin = {};
const errors = [], warns = [];
for (const f of files) {
  try {
    const code = rd('src/story/' + f);
    const before = {};
    for (const k of ['scenes', 'codex', 'trials', 'sigils', 'achv']) before[k] = new Set(Object.keys(ctx.STORY[k]));
    vm.runInContext(code, ctx, { filename: f });
    for (const k of ['scenes', 'codex', 'trials', 'sigils', 'achv'])
      for (const id of Object.keys(ctx.STORY[k])) if (!before[k].has(id)) origin[k + ':' + id] = f;
  } catch (e) {
    errors.push(`[${f}] 无法解析: ${e.message}`);
  }
}
const S = ctx.STORY;
for (const d of S.__dups) errors.push(`重复 id: ${d}`);

const labels = {};
const where = (sid, i, extra) => `[${origin['scenes:' + sid] || 'base'}] ${sid}#${i}${extra ? ' ' + extra : ''}`;
const len = s => [...(s || '')].length;

function walk(sid, script, fn, path = '') {
  script.forEach((st, i) => {
    fn(st, i, path);
    if (st && st.t === 'explore' && Array.isArray(st.spots))
      st.spots.forEach(sp => Array.isArray(sp.script) && walk(sid, sp.script, fn, path + `/${st.id}.${sp.id}`));
  });
}

for (const [sid, sc] of Object.entries(S.scenes)) {
  if (!Array.isArray(sc.script)) { errors.push(`${sid}: 没有 script`); continue; }
  if (sc.bg && !BG.includes(sc.bg)) errors.push(where(sid, '-', `未知背景 ${sc.bg}`));
  if (sc.music && !BGM.includes(sc.music)) errors.push(where(sid, '-', `未知音乐 ${sc.music}`));
  walk(sid, sc.script, (st) => {
    if (st && st.t === 'label') {
      if (labels[st.name]) errors.push(`标签重复: ${st.name} (${labels[st.name]} / ${sid})`);
      labels[st.name] = sid;
    }
  });
}
// 场景未定义时，记下"被谁引用"的位置，方便定位
const sceneRefs = {};
function noteRef(target, at) { (sceneRefs[target] = sceneRefs[target] || []).push(at); }

const refs = { codex: new Set(), trial: new Set(), shard: new Set() };
for (const [sid, sc] of Object.entries(S.scenes)) {
  if (!Array.isArray(sc.script)) continue;
  walk(sid, sc.script, (st, i, p) => {
    const at = where(sid, i, p);
    if (!st || typeof st !== 'object') { errors.push(`${at}: 步骤不是对象`); return; }
    if (!OPS.includes(st.t)) { errors.push(`${at}: 未知指令 ${st.t}`); return; }
    const text = st.text;
    if (st.t === 'amb') return;
    switch (st.t) {
      case 'narr': case 'think': case 'vision':
        if (!text) errors.push(`${at}: ${st.t} 缺 text`);
        if (st.t === 'think' && len(text) > 56) warns.push(`${at}: think 过长 ${len(text)}`);
        if (st.t !== 'think' && len(text) > 90) warns.push(`${at}: ${st.t} 过长 ${len(text)}`);
        break;
      case 'say':
        if (!text) errors.push(`${at}: say 缺 text`);
        if (!st.name) errors.push(`${at}: say 缺 name`);
        if (st.who && !WHO.includes(st.who)) errors.push(`${at}: 未知 who ${st.who}`);
        if (st.por && !POR.includes(st.por)) errors.push(`${at}: 未知立绘 ${st.por}`);
        if (len(text) > (st.por ? 78 : 90)) warns.push(`${at}: say 过长 ${len(text)}`);
        break;
      case 'quote':
        if (!text || !st.en || !st.cite) errors.push(`${at}: quote 需要 text/en/cite`);
        if (len(text) > 110) warns.push(`${at}: quote 中文过长 ${len(text)}`);
        if (len(st.en) > 300) warns.push(`${at}: quote 英文过长 ${len(st.en)}`);
        break;
      case 'choice':
        if (!st.prompt || !Array.isArray(st.options) || !st.options.length) { errors.push(`${at}: choice 需要 prompt/options`); break; }
        if (st.options.length > 4) errors.push(`${at}: 选项超过 4 个`);
        st.options.forEach((o, k) => {
          if (!o.text) errors.push(`${at}: 选项${k} 缺 text`);
          if (len(o.text) > 30) warns.push(`${at}: 选项${k} 过长 ${len(o.text)}`);
          if (o.reply && len(o.reply) > 90) warns.push(`${at}: 选项${k} reply 过长 ${len(o.reply)}`);
          if (o.goto && !labels[o.goto] && !S.scenes[o.goto]) errors.push(`${at}: 选项${k} goto 目标不存在 ${o.goto}`);
          else if (o.goto) noteRef(o.goto, at + ` 选项${k}`);
          if (o.goto && p) errors.push(`${at}: 探索点里的选项不能 goto`);
          if (o.rel) for (const w of Object.keys(o.rel)) if (!['chen', 'he', 'bai', 'keeper'].includes(w)) errors.push(`${at}: rel 对象未知 ${w}`);
        });
        break;
      case 'codex':
        (st.ids || []).forEach(id => { refs.codex.add(id); if (!S.codex[id]) errors.push(`${at}: 图鉴不存在 ${id}`); });
        break;
      case 'shard':
        refs.shard.add(st.id);
        if (!S.sigils[st.id]) errors.push(`${at}: 符印不存在 ${st.id}`);
        break;
      case 'achv':
        if (!S.achv[st.id]) errors.push(`${at}: 成就不存在 ${st.id}`);
        break;
      case 'trial':
        refs.trial.add(st.id);
        if (!S.trials[st.id]) errors.push(`${at}: 试炼不存在 ${st.id}`);
        break;
      case 'intro':
        if (!st.title || !Array.isArray(st.points)) errors.push(`${at}: intro 需要 title/points`);
        (st.points || []).forEach(x => len(x) > 28 && warns.push(`${at}: intro 条目过长 ${len(x)}`));
        if ((st.points || []).length > 4) errors.push(`${at}: intro 最多 4 条`);
        break;
      case 'explore': {
        if (!st.id || !Array.isArray(st.spots) || !st.spots.length) { errors.push(`${at}: explore 需要 id/spots`); break; }
        if (st.spots.length > 6) errors.push(`${at}: 探索点超过 6 个`);
        const ids = new Set();
        st.spots.forEach(sp => {
          if (ids.has(sp.id)) errors.push(`${at}: 探索点 id 重复 ${sp.id}`);
          ids.add(sp.id);
          for (const k of ['x', 'y', 'w', 'h']) if (typeof sp[k] !== 'number') errors.push(`${at}: 探索点 ${sp.id} 缺 ${k}`);
          if (sp.x < 0 || sp.y < 0 || sp.x + sp.w > 480 || sp.y + sp.h > 270) errors.push(`${at}: 探索点 ${sp.id} 超出画面`);
          if (len(sp.label) > 6) warns.push(`${at}: 探索点 label 过长 ${sp.label}`);
          if (!Array.isArray(sp.script) || !sp.script.length) errors.push(`${at}: 探索点 ${sp.id} 没有 script`);
        });
        if (st.need && st.need > st.spots.length) errors.push(`${at}: need 大于探索点数量`);
        break;
      }
      case 'journal':
        if (!st.id || !st.title || !Array.isArray(st.lines)) errors.push(`${at}: journal 需要 id/title/lines`);
        (st.lines || []).forEach(l => { const s = typeof l === 'string' ? l : l && l.text; if (!s) errors.push(`${at}: journal 行为空`); else if (len(s) > 60) warns.push(`${at}: journal 行过长 ${len(s)}`); });
        break;
      case 'rel':
        if (!['chen', 'he', 'bai', 'keeper'].includes(st.who) || typeof st.n !== 'number') errors.push(`${at}: rel 需要 who/n`);
        break;
      case 'goto': case 'jump':
        if (!labels[st.to] && !S.scenes[st.to]) errors.push(`${at}: 跳转目标不存在 ${st.to}`);
        else noteRef(st.to, at);
        break;
      case 'scene':
        if (!S.scenes[st.id]) { noteRef(st.id, at); if (strict) errors.push(`${at}: 场景不存在 ${st.id}`); }
        break;
      case 'bg': if (!BG.includes(st.name)) errors.push(`${at}: 未知背景 ${st.name}`); break;
      case 'bgm': if (!BGM.includes(st.name)) errors.push(`${at}: 未知音乐 ${st.name}`); break;
      case 'sfx': if (!SFX.includes(st.name)) errors.push(`${at}: 未知音效 ${st.name}`); break;
      case 'fx': if (!['flash', 'visionOn', 'visionOff'].includes(st.kind)) errors.push(`${at}: 未知 fx ${st.kind}`); break;
      case 'chapter': if (!st.title) errors.push(`${at}: chapter 缺 title`); break;
      case 'finishChapter': if (!S.chapters.some(c => c.id === st.id)) errors.push(`${at}: 未知章节 ${st.id}`); break;
      case 'multiline': if (!Array.isArray(st.lines)) errors.push(`${at}: multiline 缺 lines`); break;
    }
  });
}

for (const [id, d] of Object.entries(S.trials)) {
  const at = `[${origin['trials:' + id] || 'base'}] 试炼 ${id}`;
  if (!KINDS.includes(d.kind)) { errors.push(`${at}: 未知 kind ${d.kind}`); continue; }
  if (!d.title) errors.push(`${at}: 缺 title`);
  if (len(d.title) > 18) warns.push(`${at}: title 过长`);
  if (d.kind === 'quiz') (d.questions || []).forEach((q, k) => {
    if (!Array.isArray(q.options) || q.options.length < 2 || q.options.length > 4) errors.push(`${at}: 第${k}题选项数错误`);
    if (typeof q.answer !== 'number' || !q.options || q.answer >= q.options.length) errors.push(`${at}: 第${k}题 answer 越界`);
    if (len(q.q) > 56) warns.push(`${at}: 第${k}题题干过长 ${len(q.q)}`);
    (q.options || []).forEach(o => len(o) > 30 && warns.push(`${at}: 第${k}题选项过长 ${o}`));
  });
  if (d.kind === 'multi') {
    if (!d.q || !Array.isArray(d.options) || !Array.isArray(d.answers)) errors.push(`${at}: multi 需要 q/options/answers`);
    else { if (d.options.length > 8) errors.push(`${at}: 选项超过 8`); d.answers.forEach(a => a >= d.options.length && errors.push(`${at}: answers 越界`)); }
  }
  if (d.kind === 'sort') {
    const bins = new Set((d.bins || []).map(b => b.id));
    if (bins.size < 2 || bins.size > 4) errors.push(`${at}: bins 需要 2–4 个`);
    (d.items || []).forEach(it => { if (!bins.has(it.bin)) errors.push(`${at}: 条目 bin 不存在 ${it.bin}`); if (len(it.text) > 42) warns.push(`${at}: 条目过长 ${it.text}`); });
  }
  if (d.kind === 'match') {
    if (!Array.isArray(d.pairs) || d.pairs.length < 3 || d.pairs.length > 6) errors.push(`${at}: pairs 需要 3–6 对`);
    (d.pairs || []).forEach(p => { if (len(p.left) > 9) warns.push(`${at}: left 过长 ${p.left}`); if (len(p.right) > 16) warns.push(`${at}: right 过长 ${p.right}`); });
  }
  if (d.kind === 'order') {
    if (!Array.isArray(d.items) || d.items.length < 3 || d.items.length > 8) errors.push(`${at}: order 需要 3–8 项`);
    (d.items || []).forEach(it => { if (!it.id || !it.label) errors.push(`${at}: order 项缺 id/label`); if (len(it.label) > 15) warns.push(`${at}: order 项过长 ${it.label}`); });
  }
  if (d.kind === 'arrange') {
    const items = new Set((d.items || []).map(x => x.id));
    (d.items || []).forEach(x => { if (!ICON.includes(x.icon)) errors.push(`${at}: 未知图标 ${x.icon}`); if (len(x.label) > 5) warns.push(`${at}: 物件名过长 ${x.label}`); });
    (d.slots || []).forEach(s => { if (!items.has(s.item)) errors.push(`${at}: 槽位物件不存在 ${s.item}`); if (s.x < 60 || s.x > 420 || s.y < 66 || s.y > 190) errors.push(`${at}: 槽位越界 ${s.label}`); if (len(s.label) > 8) warns.push(`${at}: 槽位名过长 ${s.label}`); });
    if ((d.slots || []).length > 8) errors.push(`${at}: 槽位超过 8`);
  }
  if (d.kind === 'rhythm') {
    const n = d.notes || [];
    if (n.length < 6) errors.push(`${at}: notes 太少`);
    for (let k = 1; k < n.length; k++) if (n[k] - n[k - 1] < 360) errors.push(`${at}: 音符间隔太近 @${k}`);
  }
  if (d.kind === 'breath') for (const k of ['cycles', 'inhale', 'exhale']) if (typeof d[k] !== 'number') errors.push(`${at}: breath 缺 ${k}`);
  if (!refs.trial.has(id)) warns.push(`${at}: 没有被任何场景使用`);
}
for (const [id, c] of Object.entries(S.codex)) {
  const at = `[${origin['codex:' + id] || 'base'}] 图鉴 ${id}`;
  if (!c.cat || !c.title || !c.text) errors.push(`${at}: 需要 cat/title/text`);
  if (len(c.title) > 7) warns.push(`${at}: title 过长`);
  if (len(c.text) > 90) warns.push(`${at}: text 过长 ${len(c.text)}`);
  if (!refs.codex.has(id)) warns.push(`${at}: 没有被解锁`);
}
for (const [id, s] of Object.entries(S.sigils)) {
  const at = `[${origin['sigils:' + id] || 'base'}] 符印 ${id}`;
  if (!ICON.includes(s.icon)) errors.push(`${at}: 未知图标 ${s.icon}`);
  if (len(s.name) > 3) warns.push(`${at}: name 过长`);
  if (len(s.desc) > 32) warns.push(`${at}: desc 过长`);
  if (!refs.shard.has(id)) warns.push(`${at}: 没有被获得`);
}
for (const ch of S.chapters) {
  if (!S.scenes[ch.scene]) {
    if (strict) errors.push(`章节入口场景缺失: ${ch.id} -> ${ch.scene}（被 ${(sceneRefs[ch.scene] || ['?']).join(' / ')} 引用）`);
    else warns.push(`章节入口场景缺失（属其他作者分派）: ${ch.id} -> ${ch.scene}`);
  }
}

// ---------- 分派视图：每章的场景与出口 ----------
if (showEnds) {
  const groups = {};
  for (const sid of Object.keys(S.scenes)) {
    const f = origin['scenes:' + sid] || 'base';
    (groups[f] = groups[f] || []).push(sid);
  }
  console.log('\n===== 各章场景与出口 =====');
  for (const f of Object.keys(groups).sort()) {
    console.log(`\n${f}  场景 ${groups[f].length} 个：`);
    for (const sid of groups[f]) {
      const sc = S.scenes[sid];
      const exits = new Set();
      walk(sid, sc.script || [], st => {
        if (st && st.t === 'scene') exits.add(st.id);
        if (st && (st.t === 'goto' || st.t === 'jump')) exits.add(st.to);
        if (st && st.t === 'choice') (st.options || []).forEach(o => o.goto && exits.add(o.goto));
      });
      const out = [...exits].filter(t => t !== sid && !labels[t]);
      if (out.length) console.log(`   ${sid} -> ${out.join(', ')}`);
    }
  }
}

const filt = a => only.length ? a.filter(x => only.some(o => x.includes(o))) : a;
const E = filt(errors), Wn = filt(warns);
for (const w of Wn) console.log('警告 ' + w);
for (const e of E) console.log('错误 ' + e);
const steps = Object.values(S.scenes).reduce((a, s) => a + (s.script ? s.script.length : 0), 0);
console.log(`\n场景 ${Object.keys(S.scenes).length} · 步骤 ${steps} · 图鉴 ${Object.keys(S.codex).length} · 试炼 ${Object.keys(S.trials).length} · 符印 ${Object.keys(S.sigils).length} · 成就 ${Object.keys(S.achv).length}`);
console.log(`能力：背景 ${BG.length} · 音乐 ${BGM.length} · 音效 ${SFX.length} · 图标 ${ICON.length} · 指令 ${OPS.length} · 试炼 ${KINDS.length}`);
console.log(`${E.length} 个错误，${Wn.length} 个警告${only.length ? '（筛选模式）' : ''}`);
process.exit(E.length ? 1 : 0);
