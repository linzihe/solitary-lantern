# 独修者的灯 2.0 · 章节作者简报（ch01–ch07 必读）

你已经拿到一本**能跑的像素游戏**的骨架。序章、第八、九、十章已经写完并通过校验；
**第一章到第七章是空的**，这就是你要写的。你只写**一个文件**（或两个，见下发的任务），
写完必须让 `node tools/validate.mjs` 的相关错误为 0。

项目根目录：`D:/Lenovo/Documents/pixel-wicca-v2`（下称「项目」）。
这是从用户原目录 `D:/下载/pixel-wicca-v2` 复制出来、**可写**的工作副本。

---

## 0. 先读这五份东西，再动笔

| 文件 | 用途 |
|---|---|
| `docs/STORY_SPEC.md` | **规格**：指令表、每章大纲、最低配置。这是硬要求。 |
| `C:/Users/Lenovo/AppData/Local/Temp/pixel-wicca/notes_ch1_4.md` | 书的内容笔记（印刷页码），第一章–第四章 + 序章引言 |
| `C:/Users/Lenovo/AppData/Local/Temp/pixel-wicca/notes_ch5_7.md` | 第五章–第七章笔记 |
| `C:/Users/Lenovo/WorkBuddy/2026-10-03-14-34-59/wicca_ocr/Wicca_Cunningham_OCR.md` | 原书英文 OCR 全文（引文 `en` 字段**逐字**从这里抄，页码用印刷页码） |
| `src/story/ch00.js`、`ch08.js`、`ch09.js`、`ch10.js` | **语感与格式的唯一标准**。先读 `ch08.js` 前 200 行，照它的密度和语气写。 |

`notes_*.md` 里的标记：`★` = 旧版游戏没覆盖的内容（正好是你要写的），
`[OCR 缺]` = 原文缺失，**不许补写、不许编造成引文**；可以让守灯人说「这一页泡烂了」。

---

## 1. 你要产出的东西

一个文件 `src/story/chNN.js`，内容**只有一个** `STORY_ADD({...})` 调用：

```js
/* 第X章 · 副题 —— 入口场景 cX_xxx。资料：notes_ch1_4.md（第X章 p.NN–NN）。 */
STORY_ADD({
  scenes: { "cX_entry": { title, bg, music, script: [ ... ] }, "cX_other": {...} },
  codex:  { "cX_key": { cat:"第X章", title:"≤6字", en:"English", text:"≤80字", src:"p.NN" } },
  trials: { "tX_name": { kind:"sort", title:"第X章 · 试炼 · ≤8字", explain:"≤90字", src:"Chapter X · p.NN", ... } },
  sigils: { "drum": { name:"≤3字", icon:"drum", desc:"≤30字", src:"p.NN" } },
  achv:   { "cX_something": { name:"≤10字", desc:"≤24字" } }
});
```

- 文件必须是**合法 JS**。中文引号一律用 `「」` 或 `“”`，字符串里不要出现未转义的 `"`。
- **id 全部带章前缀**：场景 `c5_dance`、旗标 `c5_shy`、试炼 `t5_instruments`、日记 `j_c5`、图鉴 `c5_topic`。
- 章末固定三连（第 8/9/10 章已经这样写，照抄结构）：
  ```js
  {"t":"finishChapter","id":"c5"},
  {"t":"chapter","title":"第六章","sub":"仪 式 之 前","en":"RITUAL AND PREPARATION"},
  {"t":"scene","id":"c6_prep"}
  ```
  入口场景开头**不要**再放 `chapter` 卡（上一章末尾放了），但**要**放 `intro` 导读卡。

---

## 2. 每章最低配置（验收时会数）

- 开头 1 个 `intro`（`chapter`/`title`/`book`/`points` 3–4 条，每条 ≤26 字）。
- 正文 **3–5 个场景**（含入口），**总步骤 200–260**（含 explore 子脚本；`ch08.js` 是 441 步的样板，别低到 120 就收工）。
- 至少 **2 个 `explore`**，每个 3–6 个探索点，坐标对得准背景里的真东西（见 STORY_SPEC §5 各图坐标表）。
- 至少 **3 个不同类型的试炼**（kind 从 `quiz multi sort match order arrange rhythm breath trace` 里选）。
- **2 次有后果的 `choice`**：`flags` 或 `rel` 二选一必须真的设，后面的章节/日记/尾声会读它。
- **6–12 条 `quote`**：`en` 是 OCR 原文逐字，`text` 是中文翻译，`cite` 形如 `"Chapter 5 · p.40"`。
- **8–14 条 codex**，每条都在某个场景里用 `codex` 指令解锁；**章末 1 页 `journal`**（id `j_cN`，4–7 行，
  可用 `{"when":"flag","text":"…"}` 根据选择变化）。
- 章末最后一步跳向下一章入口，并 `finishChapter`。**每章必须有 1–2 个 `shard`（符印）**（id 见下表）。
- 单句长度：`say`/`narr` ≤ 80 字（有立绘 ≤ 70 字），`think` ≤ 50 字，`quote` 中文 ≤ 100 字、英文 ≤ 280 字符。
  守灯人**别连着说超过 2 句**，中间穿插玩家动作、回问、旁白描写。

### 三章的地基：入口场景、背景、音乐、符印（**id 不许改**）

| 章 | 入口场景 | bg | 建议 bgm | 符印 id（icon 必须从 art.js 里挑，见 §5） | 你写完后要交接的下一场景 |
|---|---|---|---|---|---|
| 1 | `c1_forest` | `forest` | `forest` | `drum`(drum) `tenets`(scale) | `c2_moon` |
| 2 | `c2_moon` | `moon` | `moon` | `moon3`(moon) `antler`(horn) | `c3_study` |
| 3 | `c3_study` | `study` | `cottage` | `rivers`(water) | `c4_altar` |
| 4 | `c4_altar` | `altar` | `cottage` | `pent`(pentacle) `besom`(wand) | `c5_dance` |
| 5 | `c5_dance` | `fire` | `trance` | `hand`(star) | `c6_prep` |
| 6 | `c6_prep` | `cottage` | `cottage` | `robe`(cord) | `c7_circle` |
| 7 | `c7_circle` | `wheel` | `wheel` | `circle`(circle) | `c8_wheel` |

> 符号表里 `hand`/`broom`/`bell`/`drum` 这些**图标在 art.js 里并不存在**，画不出来就是一块空白。
> 动笔前先确认 `src/art.js` 里的 `ICONS.xxx =` 名单（§5 有完整名单）。

---

## 3. 跨界契约：别人已经写了什么、指望你写什么

**必须设的旗标（后续章节已写好，会读它）**：
- 第一章：`helped_chen`（找到母牛支线完成）。尾声会读；第八章老陈线会读。
- 第六章：`c6_invite_he`（邀请阿禾）、`c6_invite_chen`（邀请老陈）、`c6_alone`（谁也没邀）——**第八章已引用，必须设**。
- 第七章：`c7_invited_he`（值：是否真的来了，给第八章用；名字自定但要在日记里说明）。
- 序章已给的旗标可以读：`motive_words` `motive_quiet` `motive_lost` `p0_counted` `p0_distracted` `p0_quiet`；
  `path_journal` `path_moon` `path_plan`；`patient` `sharp` `quiet`（老陈那段）。

**已经写完的下一章会读的旗标**（你设了就用得上，不设也不会报错，但会少一段戏）：
`c8_he_count` `c8_honest` `c8_lampquiet` `c8_he_read_bos` `c9_honest` `c9_he_memory` `c9_he_gentle`
`c9_he_hurt` `c9_he_vow` `c9_karma_clear` `c9_sneakers` `c9_lean_yes/wait/no` `c10_he_learn` `c10_he_stop`
`c10_gift` `c10_respect` `c10_push`。

**人物线与时间线（不许走样）**：
- 序章：十一月下旬满月夜。**第 1–7 章在接下来约四周**（满月 → 下一个满月，第 7 章结尾那次仪式就在冬至前夕）。
- 你（玩家）：`who:"player"`，`name:"你"`，**没有 por**。村里长大的年轻人，好奇但谨慎。
- 守灯人：`who:"keeper"`,`name:"守灯人"`,`por:"keeper"`。独修多年，话少、幽默、常反问，**不是讲师**。
  她不说教、不收徒、不要钱；常说「你自己翻到那一页看看」。讲知识点**要在解决一件事的过程里**出现。
- 老陈：`who:"chen"`,`name:"老陈"`,`por:"skeptic"`。种地养牛，怀疑、嘴硬、心软，担心你「学坏」。
  线：第 1 章走失的母牛被你找到 → 第 3 章母牛怀孕要请兽医、欠钱 → 第 5 章他拎着二胡来篝火夜（转折）→ 第 8 章圣烛节产犊。
- 阿禾：`who:"he"`,`name:"阿禾"`,`por:"he"`。老陈侄女，十七，急性子，想「马上学会魔法」。
  第 2 章末出场（看见你埋供品）→ 第 3 章求你让喜欢的人（小满）爱上她（伦理冲突）→ 第 5 章不好意思跳舞
  → 第 6 章丢了幸运手链崩溃 → 第 8 章萨温想召唤去世的母亲。**她的人生由她自己选，两种选择都被尊重。**
- 白先生：`who:"bai"`,`name:"白先生"`,`por:"bai"`。货郎，口才好，卖「祖传原版影之书」「开过光的法刀」，
  收费入会，自称前世名人。第 4 章村口集市初登场，第 7 章来推销「标准九尺铜圈套装」，第 9/10 章再遇。
  他是书里各种误解的化身，**但不是恶魔，只是生意人**；结局他离开村子。
- 小满：**只被提到，不出场**。女神/男神：`por:"goddess"/"god"`，只在幻视里，多是「……」。
- 关系值 `rel`：`chen` / `he` / `bai` / `keeper`。玩家体贴、讲理、不说教时 +1。**每章给 1–3 次加减机会**。
  第十章末尾按 `keeper≥3`、`chen≥2` 分岔，所以守灯人和老陈的线要长期为正。

---

## 4. 每章要落在事件里的知识点（照 STORY_SPEC 的章表，这里是执行版）

- **第一章 · 萨满的鼓**（森林/白天）：鼓与出神、萨满是什么、威卡与萨满的关系；老陈的牛走失（explore 找线索：
  蹄印、声音、被压的草，选路径，`helped_chen`）；他说「那本黑书招惹坏东西」→「不是撒旦」；
  夜里篝火鼓点讲**信条**（神为二、神不远、轮回只为人、勿伤一人也勿伤己、魔法是自然的、不信宿命、
  威卡≠魔法、别关上物质世界、威卡的神殿是草地森林海滩）；`t1_...` 三个试炼（建议：sort 线索分类 / rhythm 鼓点 / quiz 信条）。
- **第二章 · 三面之神**（月下湖 + 破晓鹿）：女神幻视（`fx visionOn`）→ 破晓见鹿与男神；
  **一周的调谐练习**（夜对月、晨对日，p.14–15）用 `breath` + 每日 `choice` 做成「七天」；
  **在家布置第一座小神龛**（左绿烛女神、右红烛男神、香炉居中、供盘在前，p.15–17）→ `arrange` 试炼；
  供品归还大地。章末阿禾看见你埋供品，追问「你会魔法吗？能教我吗？」
- **第三章 · 三条河**（书房）：魔法的定义、三种力量、磁铁小实验、「魔法不是超自然」；
  **账单例子完整步骤**（p.23–24）→ `order` 试炼；阿禾求你让她被爱上 → 伦理冲突（不操弄人）；
  老陈母牛怀孕要请兽医、欠钱——实际筹钱办法对照「魔法结果可能是间接的」；
  「别怕魔法」「过马路比喻」「最简单的仪式就是点一支蜡烛」。
- **第四章 · 十一件**（守灯人的桌子）：十一件工具（扫帚、魔杖、香炉、大釜、魔法刀、白柄刀、水晶球、杯、
  五芒星盘、影之书、铃）逐个 `explore`；亲手扎扫帚（梣木柄、桦枝、柳条，砍枝前谢树）；
  找魔杖（「它会自己来找你」）；**白先生第一次出现**在村口集市，玩家用书里的知识分辨（`sort` 试炼）；
  旧物净化（埋土/盐、浸水；木头别泡水）。
- **第五章 · 鼓、舞与手**（篝火夜）：音乐、舞蹈、手势；乐器分四类对四元素（`sort`）；
  四方手势（`arrange`）；鼓点（`rhythm`）；「The Dance」步骤（`order`）；女神姿势与男神姿势；
  阿禾不好意思跳舞（「你不是在给观众表演」）；**老陈拎着二胡来了**（弦乐属火）——关系转折。
- **第六章 · 仪式之前**（小屋，阴雨 `rainy`）：沐浴与浴草包（八种草 + 缬草根）；裸身/袍子/便服的选择、
  袍子颜色、饰品；阿禾丢了「幸运手链」（作者「我没有幸运符」的观点）；同伴：邀请谁（只邀请真心认同的人，
  设 `c6_invite_he`/`c6_invite_chen`/`c6_alone`）；独修不是二流；**第 48 页被雨泡烂了**——守灯人：「这一页你自己补吧。」
- **第七章 · 圈与祭坛**（石圈俯视）：画圈与布置祭坛；圈是能量球体、标记物随季节、四方与元素与标记物（`arrange`）、
  祭坛左女神右男神（`arrange`）、火柴与装火柴的小碗；**白先生**推销「标准九尺铜圈套装」（书里说任何舒适尺寸都可以）；
  户外要低调、工具是配件；章末在冬至前夕的满月下完成**第一次满月仪式**（esbat：新月形小饼、柠檬水/牛奶），
  阿禾在旁（如果你邀请了，读 `c6_invite_he`）。

> 知识必须能在笔记里找到出处。作者个人观点要写成「书里/作者这样说」，不是「所有威卡都这样」。
> 不传教、不嘲笑任何宗教、尊重怀疑者。

---

## 5. 引擎真实能力清单（**白名单**，用名单外的东西校验会报错）

- **背景 bg**（21 个）：`altar beltane cottage dawn fire forest harvest midsummer moon rainy samhain shore spring stag stones study village void wheel winter yule`
- **音乐 bgm**（10 个）：`title forest cottage moon dawn trance ending vision wheel trial`
- **音效 sfx**（16 个）：`select tick confirm correct wrong fail chime unlock shard magic spark drum page step whoosh blip`
- **立绘 por**：`keeper skeptic he bai goddess god`（玩家没有立绘）
- **图标 icon**（31 个，`arrange` 和符印只能用这些，否则画出来是空白）：
  `moonWaxing moonWaning pentacle athame boline wand chalice censer cord candle salt water book sword horn moon star leaf flame eye key circle scroll seed wind scale sun snow flower bread cauldron`
- **指令 t**（30 个）：`narr say think quote choice codex shard achv trial intro explore journal rel set insight label goto jump scene bg bgm amb sfx fx vision multiline chapter finishChapter wait ending`
- **试炼 kind**（12 个）：`quiz multi sort match order arrange rhythm breath trace`
- 条件字段（任何步骤都能带）：`when`（`"flag"` / `"!flag"` / `["a","!b"]`）、`relMin`、`relMax`。
- `explore` 里的 `choice` **不能 goto**；`label` 全局唯一（带章前缀）。

试炼数据结构照 `docs/STORY_SPEC.md` §7；`arrange` 槽位坐标必须落在
`x 60–420`、`y 66–190` 内，两槽中心横距 ≥70 或竖距 ≥48。

---

## 6. 写完怎么自检（**必须真的跑，不许"我觉得没问题"**）

```powershell
cd D:/Lenovo/Documents/pixel-wicca-v2
node tools/validate.mjs ch05            # 只看自己这章；别人的缺章会报「属其他作者分派」的警告，正常
node tools/validate.mjs                 # 全量：只有最后所有人写完才可能 0 错误
```

- **错误必须为 0**（分派警告不算）。警告尽量清掉：最长句、未解锁图鉴、没被用到的试炼。
- 自检清单（逐条对自己文件确认）：
  1. `finishChapter` + `chapter` 卡 + `scene` 三连在文件最后，且下一章 id 正确；
  2. 至少 2 个 `explore`、3 个不同类型的 `trial`、2 个真设了 flags/rel 的 `choice`；
  3. 每条 codex 都被 `codex` 指令解锁过；每个 trial 都被 `trial` 指令用过；
  4. 引文 `en` 逐字来自 OCR，`cite` 页码与 notes 一致；
  5. 至少 1 个 `shard`，icon 在 §5 名单里；
  6. 步骤数 ≥200；
  7. 所有 `say` 都带 `name`；带 `por` 的人物只在 `keeper/skeptic/he/bai/goddess/god` 里。
- 写完后在回复里贴：场景数、步骤数、试炼 id 与 kind、引文条数、图鉴条数、`node tools/validate.mjs chXX` 的结果。

**风格红线**：别写成教科书。每个知识点都要落在一件正在发生的事上；守灯人反问、让玩家自己看；
老陈和阿禾要真的有自己的脾气。玩家不做的事就别替玩家做决定。
