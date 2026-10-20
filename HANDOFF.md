# 交接：《独修者的灯 2.0》剧本补完

项目：`D:\下载\pixel-wicca-v2`。纯前端单文件网页游戏（像素风视觉小说 + 小游戏），改编自 Scott Cunningham《Wicca: A Guide for the Solitary Practitioner》。
构建：`node build.mjs`（需 `npm i`，依赖 subset-font）→ 产出根目录 `index.html` 和 `dist/index.html`。校验：`node tools/validate.mjs`。
**规格全文在 `docs/STORY_SPEC.md`（必读，指令表、探索坐标、小游戏字段、字数限制、人物、时间线都在里面）。本文只是进度 + 做法。**

## 1. 进度（据目录推断，未实机验证）
已有：引擎 `src/engine.js`、界面 `src/ui.js`、画面 `src/art.js`、音频 `src/audio.js`、骨架 `src/story/base.js`（章节表 + `STORY_ADD` 合并）、`src/story/ch00.js`（序章）、`ch08.js`、`ch09.js`、`ch10.js`、`art/` 的 11 张背景和 6 张头像、字体子集、构建与校验脚本。

缺：
- `src/story/ch01.js` ~ `ch07.js`（7 个文件）。
- 尾声场景 `ending`（先检查 `ch10.js` 末尾是否已含；没有就新建 `ch11.js` 或 `ending.js`）。
- 背景 `winter`、`samhain` 没有对应 png（`art/` 里无 bg_winter / bg_samhain；spec 说它们是“石圈+雪”“暗色石圈+雾”的变体，看 `src/art.js` 是否已用代码画出；没有就补，或改引用）。
- 新文件要登记到 `game.template.html` 的 `<script src>` 列表和 `build.mjs`（照 ch08 的登记方式）。
- 全部写完后：build → validate 0 错误 → 浏览器实机从序章玩到尾声。

## 2. 分工建议（可并行，每个 AI 一个文件）
- A：ch01、ch02　B：ch03、ch04、ch05　C：ch06、ch07　E：尾声（ch09/10 若有缺漏也补）。
- 最稳的做法：先自己读 spec + `ch08.js` 前 70 行（格式范本：intro → narr/say → explore → choice → quote/codex → journal → finishChapter），再动笔。
- 参考资料原路径（可能已不存在，缺了就只靠 spec 和你对该书的了解，**不要编造页码和教义**）：
  `C:\Users\Lenovo\AppData\Local\Temp\pixel-wicca\notes_ch1_4.md`、`notes_ch5_7.md`、`notes_ch8_10.md`；
  书的 OCR：`C:\Users\Lenovo\WorkBuddy\2026-10-03-14-34-59\wicca_ocr\Wicca_Cunningham_OCR.md`；
  旧版剧情：同目录 `pixel-wicca-revised\src\story.js`（旧 codex / trials 数据，语气可参考）。

## 3. 世界与故事脉络
地点：北方山村，屋后坡上立石圈，坡下林子、湖、守灯人的小屋。玩家是村里长大、好奇但谨慎的年轻人（`who:"player"`, `name:"你"`，无立绘）。
时间：序章=十一月下旬满月夜；第1–7章约四周（满月走到下一个满月，第7章末在冬至前夕办第一次满月仪式）；第8章冬至→一年→萨温；第9章萨温后的十一月；第10章次年圣烛节（2/2）黎明；尾声紧接。

人物：
- 守灯人（`who:"keeper"`, `por:"keeper"`）：年长女性，独修多年，话少幽默常反问，**不是讲师**，不收徒不收钱不传教。常说“你自己翻到那一页看看”。她的旧书第 48 页被雨泡烂（对应原书缺页，第6章用这个梗：“这一页你自己补吧”，**不要编那页内容**）。
- 老陈（`chen`, `por:"skeptic"`）：种地养牛，怀疑嘴硬心软，担心你学坏。线索：走失母牛（第1章找到，flag `helped_chen`）→ 怀孕 → 欠兽医钱（第3章）→ 圣烛节产犊（第8章）→ 第5章拎二胡来、关系转折 → 结局只是愿意坐下聊天，不必皈依。
- 阿禾（`he`, `por:"he"`）：老陈侄女，17 岁急性子，想马上学会魔法。第2章末出场；第3章要你帮她让小满爱上她（伦理冲突）；第5章不好意思跳舞；第6章丢幸运手链慌了；第8章萨温想召唤去世的母亲；第9/10章自己选继续或放弃，两种都被尊重。
- 白先生（`bai`, `por:"bai"`）：货郎，卖“祖传原版影之书”“开光法刀”、收“入会费”、自称前世名人。是书中各种误解的化身，不是恶人。第4章初现，第7、9章再遇，第10章辩论摊牌，结局离村。
- 小满：只被提到不出场。女神/男神（`goddess`/`god`）只在幻视里，少说话多用“……”。
- 关系值：`rel` 指令，who 取 chen/he/bai/keeper；玩家体贴、讲理、不说教加分；每章 1–3 次机会；结局用 `relMin` 判断。

各章要点（知识必须在“解决一件事”的过程里出现，不要灌输）：
- 序章：满月夜石圈遇守灯人，她借灯和书。要点：仪式是路标不是圣典；没有唯一正确的威卡；作者不传教；珠宝匠比喻；独修者不必等别人批准。动机选项 motive_words / motive_quiet / motive_lost。
- 1 萨满的鼓：林间找老陈走失的牛（explore）；萨满、出神、鼓；“黑书招惹坏东西”→“不是撒旦”；信条（神为二、神不远、轮回只为人、勿伤一人也勿伤己、魔法是自然的、不信宿命、威卡≠魔法、别关上物质世界、威卡的神殿是草地森林海滩）；夜里篝火鼓点。
- 2 三面之神：湖边月夜见女神幻视；破晓见鹿与男神；一周调谐练习（夜对月晨对日，p.14–15，用 breath + 每日选择做成七天）；布置第一座神龛（左绿烛女神、右红烛男神、香炉居中、供盘在前，p.15–17，arrange）；供品归还大地。章末阿禾看见你埋供品，追问“能教我吗”。
- 3 三条河：守灯人书房；魔法定义、三种力量、磁铁小实验、魔法不是超自然；账单例子完整步骤（order）；阿禾求爱情魔法→不做操弄人的魔法，可改为为她自己的勇气；老陈母牛要请兽医欠钱→实际筹钱办法与“账单”例对照（魔法结果可能间接，不保证凭空来钱）；别怕魔法；最简单的仪式是点一支蜡烛。
- 4 十一件：桌上十一件工具（扫帚、魔杖、香炉、大釜、魔法刀、白柄刀、水晶球、杯、五芒星盘、影之书、铃）逐个探索；扎扫帚（梣木柄、桦枝、柳条，砍枝前谢树）；魔杖“会自己来找你”；白先生首次出现卖假货，玩家用书里知识分辨（sort）；旧物净化（埋土/盐、浸水；木头别泡水）。
- 5 鼓舞与手：篝火夜；乐器四类对四元素（sort）；四方手势（arrange）；鼓点（rhythm）；The Dance 步骤（order）；女神/男神姿势；阿禾害羞（“你不是在给观众表演”）；老陈拿二胡来（弦乐属火）。
- 6 仪式之前：准备第一次满月仪式；沐浴与八种草+缬草根；裸身/袍子/便服；袍色饰品；阿禾丢手链→作者“我没有幸运符”；邀请同伴（只邀真心认同的）；独修不是二流；第48页泡烂。
- 7 圈与祭坛：画圈、圈是能量球体、标记物随季节、四方对元素对标记物（arrange）、祭坛左女神右男神（arrange）、火柴与小碗；白先生推销“标准九尺铜圈套装”（书说任何舒适尺寸）；户外要低调；章末冬至前夕满月仪式（esbat：新月形小饼、柠檬水/牛奶），阿禾若被邀请在旁。
- 8（已写）一年：Yule→Imbolc（母牛产犊）→春分→Beltane（阿禾编彩带）→Litha→Lughnasadh→秋分→Samhain（阿禾想召唤亡母→“让亡者安息，用记忆纪念”）。
- 9（已写）转世、业非奖惩、死后回顾、夏日之地；白先生卖前世解读；立誓仪式（亏月夜）。
- 10（已写）入门；白先生收费→辩论 quiz；与神调谐才是入门；自我献身（圣烛节黎明，order + breath）。
- 尾声：守灯人的信，灯送你；回顾全年日记；各人物结局看 flag 与 rel；选下一步练习；最后一步 `{"t":"ending"}`。

## 4. 代码怎么写（硬性规则）
- 每文件结构：`STORY_ADD({ scenes:{}, codex:{}, trials:{}, sigils:{}, achv:{} })`。必须**合法 JS**，JSON 风格双引号；中文引号用「」“”，字符串里不要出现未转义 `"`。
- 命名：场景 id、flag、试炼 id、日记 id 用章前缀（`c5_`、`c5_shy`、`t5_`、`j_c5`）；label 全局唯一。
- 入口场景 id 固定：c1_forest c2_moon c3_study c4_altar c5_dance c6_prep c7_circle c8_wheel c9_spiral c10_init ending。入口场景开头放 `intro` 导读卡（3–4 条，每条 ≤26 字），**不要**放 chapter 卡（由上一章末尾放）。
- 章末固定三连：`{"t":"finishChapter","id":"c5"}`、`{"t":"chapter","title":"第六章","sub":"…","en":"…"}`、`{"t":"scene","id":"c6_prep"}`。finishChapter id：p0、c1…c10。
- 符印 id 固定：lantern(序) / drum tenets(1) / moon3 antler(2) / rivers(3) / pent besom(4) / hand(5) / robe(6) / circle(7) / wheel(8) / spiral(9) / dawnoath(10)。定义 `{name≤3字, icon, desc≤30字, src}`。
- 每章最低：1 个 intro；2–4 个场景共 120–220 步；≥2 次 explore（每次 3–6 个点，坐标对着背景真实物件，坐标表见 spec 第5节）；≥3 种不同试炼；≥2 次有后果的 choice（设 flag/rel，后文要用）；6–12 条 quote（`en` 须为逐字英文原文，cite 如 `"Chapter 5 · p.40"`，用印刷页码）；8–14 条 codex（title ≤6 字，text ≤80 字）；章末 `journal`（id `j_cN`，4–7 行大白话，可用 when 随选择变化）。
- 字数：say/narr ≤80（有立绘 ≤70），think ≤50，quote 中文 ≤100、英文 ≤280 字符。守灯人连续讲解不超过 2 句，穿插玩家动作、反问、描写。
- 试炼类型：quiz / multi / sort / match / order / arrange / rhythm / breath / trace，字段与长度限制见 spec 第7节。
- 常用指令：narr say think quote choice codex shard achv trial intro explore journal rel set insight label goto jump scene bg bgm sfx fx vision multiline chapter finishChapter wait ending；任何步骤可带 `when`（`"flag"`/`"!flag"`/数组）、`relMin`、`relMax`。
- 背景：stones forest fire moon stag altar study cottage dawn shore wheel void winter yule spring beltane midsummer harvest samhain rainy village。音乐：title forest cottage moon dawn trance ending vision wheel trial。音效：step page magic chime drum whoosh shard unlock。立绘：keeper skeptic he bai goddess god。
- 写作原则：少讲课多场景；书中观点说成“书里/作者这样说”，不是“所有威卡都这样”；OCR 缺字不补；不传教、不嘲笑任何宗教、尊重怀疑者。

## 5. 给子 AI 的提示词模板（每章一份，替换方括号）
> 你在为像素风视觉小说《独修者的灯 2.0》写第 [N] 章剧本，输出文件 `D:\下载\pixel-wicca-v2\src\story\ch0[N].js`。
> 先完整阅读 `docs\STORY_SPEC.md`，再读 `src\story\ch08.js` 前 150 行作格式范本。本章入口场景 `[scene_id]`，对应原书 [章节]，剧情要点见 spec 第2.5节表格的第 [N] 行及 HANDOFF.md 第3节。
> 要求：满足 spec 第8节每章最低配置；合法 JS（双引号、无未转义引号）；id 带章前缀；章末写 journal、finishChapter、chapter 卡并跳到下一章入口；与上一章结尾和 ch08 开头衔接（flag：helped_chen、c6_invite_he 等需前后一致）。
> 写完运行 `node tools\validate.mjs`，修到 0 错误；不要修改其他章节文件和引擎。最后回报：场景数、步数、试炼数、新设的 flag 列表（供后续章节衔接）。

## 6. 收尾清单
1. 所有 `ch0N.js` 登记进 `game.template.html` 和 `build.mjs`。
2. `node tools/validate.mjs` → 0 错误（跳转、重复 id、缺背景、flag 拼写）。
3. 补 `winter` / `samhain` 背景或改引用。
4. `node build.mjs`（新增文字后必须重跑，字体子集才含新字符）。
5. 浏览器打开 `index.html` 玩通：序章→十章→尾声，各小游戏至少触发一次；检查有无字缺失（方块字）、卡死、跳转错误。
6. 更新 `README.md` 版本说明。

## 7. 注意
- 不要手改 `src/art-data.js`、`src/font-data.js`（构建生成）。
- PowerShell 读写中文请显式 UTF-8。
- 版本号：`base.js` 里是 2.0 · 一年之轮；README 仍是 1.1 旧内容，需重写。
