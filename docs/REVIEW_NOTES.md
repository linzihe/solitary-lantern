# 独修者的灯 2.0 · 剧本审读笔记（ch00–ch10 跨章一致性 + 引文核查）

审读者：`verifier-story`（共享任务 `task-5`）。**只读审读**：未改动任何 story 文件，未跑 build / `validate.mjs`。
唯一产出：本文件。

审读范围：`src/story/ch00.js`–`ch10.js`，共 **47 场景 / 1932 顶层步骤 / 147 图鉴 / 45 试炼 / 136 条 quote**（与交接说明的 47 场景、147 图鉴、约 1900 步一致）。

核查方式：
- **引文**：一次性 Node 脚本把每章 `quote.en` 抽出，做「去空白 + 去大小写」后的 OCR 全文子串匹配；不命中再用最长词窗定位近似原文。
- **页码**：把三份 notes 的逐字引文表解析成「原句 → 印刷页」字典逐条比对；同时从 OCR 的 `*[p.N]*` 分页标记 + 页眉印刷页码反推每句的实际印刷页。
- **旗标**：遍历所有对象（含 choice option、journal line 的 `when`）收集「读」，从 `set` / `flags` 收集「写」，做双向差集。
- 脚本与原始 JSON 放在系统临时目录 `C:\Users\Lenovo\AppData\Local\Temp\pwv2_audit\`，**没有留在项目里**。

---

## 0. 总体结论

| 检查项 | 结果 |
|---|---|
| 引文真实性 | 136 条中 **132 条逐字命中 OCR**；另有 2 条（`ch00.js:391`、`ch10.js:95`）是 OCR 把页码标记插进句中导致的假失配，实为逐字；**真问题 2 条**（`ch01.js:138` 改写、`ch01.js:144` 漏句）。**没有"完全找不到"的引文。** |
| cite 页码 | 能与 notes 引文表对上的 68 条，页码 **0 分歧**；与 OCR 页眉逐条比对：113 条精确、11 条差一页（均为跨页引文）、**0 条差 ≥2 页**。真正的问题是 **3 条章标签写错**（页对、书里的章不对）。 |
| 旗标闭环 | 153 个旗标，**"被读但从没被设" = 0**；"被设但从没被读" = 78（其中 8 组是先前约定过的跨章回调，见 S2）。 |
| 时间线 | 序章→第十章的骨架对得上，但有 1 处**朔望月算术不自洽**（M1）。 |
| 人物线 | 老陈 / 阿禾 / 白先生三条线推进完整、无非恶魔化；3 处「只挂邀请旗标、没挂实际发生的事」需要补条件（M5）。 |

---

## 1. 必须修（会让人出戏 / 事实错）

### M1 满月与冬至的间隔算错了（时间线）
- **位置**：`src/story/ch00.js:30`（「十一月下旬，满月」）、`ch01.js:15`（「十一月末」） ↔ `src/story/ch07.js:339`（「满月过了，离冬至还有半个月」）、`ch07.js:341`（「先把这半个月的觉睡够」）、`src/story/ch08.js:40`（「冬至前的那次满月，就在半个月前」）。
- **一句话修法**：`ch07.js:339` 改「离冬至没几天了」，`ch07.js:341` 的「这半个月」改「这几天」，`ch08.js:40` 的「半个月前」改「几天前」。
- **为什么**：第 7 章那次 esbat 是序章满月之后的**下一个**满月（`ch02.js:16`「满月过去三天了」、`ch06.js:20`「再过三天就是满月」），中间只隔一个朔望月（约 29.5 天）。序章在 11 月下旬 ⇒ 这次满月只能落在 12 月中下旬、紧贴冬至；说"离冬至还有半个月"就等于把序章推到 11 月上旬。三句必须一起改才自洽。

### M2 引文被改写：「magical rituals」不是原文
- **位置**：`src/story/ch01.js:138`，`"en":"Shamans use a steady drum beat to induce trance, and a drum can be used to control the pace of magical rituals."`（cite `Chapter 5 · p.42`）
- **一句话修法**：`rituals` 改回 `dance`，并把 cite 的 `p.42` 改成 `p.41`。
- **为什么**：OCR 近似原文（OCR line 2860，页眉 "Music, Dance, and Gesture 41"，印刷 p.41）是 `...a drum can be used to control the pace of magical dance.`；同一句在 `ch05.js:28` 写的就是正确的 `magical dance`，所以这是 ch01 的笔误，不是版本差异。

### M3 引文漏抄中间一句，且没有省略号
- **位置**：`src/story/ch01.js:144`：`"...The shamans were the first humans with knowledge. Knowledge is power."`
- **一句话修法**：两句之间补一个省略号（或补回原句 `They created discovered, nurtured, and used it.`）。
- **为什么**：OCR（line 590，印刷 p.4/5，Ch1）里这两句之间还有 `They created discovered, nurtured, and used it.`；引文卡声明 en 是逐字原文，拼接非相邻句必须标省略。

### M4 cite 的书内章标签写错（页对、章不对，共 3 条）
- **位置与修法**：
  - `src/story/ch01.js:284`「No intermediaries are needed; no priests or confessors or shamans.」cite `Chapter 1 · p.14` → 应为 **`Chapter 2 · p.14`**。
  - `src/story/ch05.js:147`「I used no lengthy speeches and brandished no tools in the air.」cite `Chapter 5 · p.58` → 应为 **`Chapter 7 · p.58`**（`ch07.js:117` 已有同一句的正确版本）。
  - `src/story/ch05.js:294`「An unexpected glimpse of the full moon half-shrouded in clouds…」cite `Chapter 5 · p.53` → 应为 **`Chapter 6 · p.53`**。
- **为什么**：按 OCR 分页定位——ch01:284 在 PDF p.26 / 印刷 p.14，位于 *The Deities* 章（notes 也把 Ch2 标为 p.9–19；`notes_ch1_4.md` 的 Q12 只给了 p.14 没给章名，容易被误归到 Ch1）；ch05:147 在 PDF p.67 / 印刷 p.58，位于 *The Magic Circle and the Altar*（`notes_ch5_7.md:443` 也把这句列在 Ch7 的引文里）；ch05:294 在 PDF p.63 / 印刷 p.53，位于 *Ritual and Preparation for Ritual*。三处**页码本身都对**，错的只是章名。

### M5（用户点名核实的那处）阿禾"站在圈外"与第七章的选项真的冲突
- **结论：确实冲突，不是误读。**
  - `ch07.js:216-220` 的选择允许玩家选 `c7_he_inside`（217 行「你跟我进来，站我旁边」）/ `c7_he_outside`（218 行）/ `c7_he_sent`（219 行「你先回去」）；`ch07.js:271-310` 有 6 处台词与旁白按 `c7_he_inside` 走，她在圈内跟着念。
  - `ch10.js:322` 的日记行只挂 `c6_invite_he`，却断言「阿禾：满月那晚，她站在圈外看你做完了仪式。」
- **最省事的一句话修法**（只改 `ch10.js:322` 一行，去掉位置断言、并排除"让她先回去"那支）：
  ```json
  {"when":["c6_invite_he","!c7_he_sent"],"text":"阿禾：满月那晚，她看你做完了仪式。"}
  ```
- **如果想保留"圈内 / 圈外"的区别**：拆成两行（`when:["c6_invite_he","c7_he_inside"]` 写"站在你旁边"；`when:["c6_invite_he","c7_he_outside"]` 写"站在圈外"），再加一支 `c7_he_sent`。多两行，不如上面一行省。
- **同一族还有 3 处只挂邀请旗标、没挂后续真发生的事**，建议一并各加一个条件（每处一行）：
  - `src/story/ch08.js:67`（阿禾「上次看你们做满月，我回去想了好久」）→ 加 `"!c7_he_sent"`（她先回去了就没看成）。
  - `src/story/ch08.js:580`（老陈「去年你们做满月那回，我在底下看着。我没上来。」）→ 加 `"!c7_chen_left"`（玩家可以让他回家）。
  - `src/story/ch10.js:323`（老陈「满月那晚他来过一次，站得远远的，没进来」）→ 同样加 `"!c7_chen_left"`。

### M6 从"谁也没邀"那条路临时叫来阿禾，满月仪式里她完全不出场，日记却说"她真的来了"
- **位置**：`src/story/ch07.js:234`（选项 flags 只有 `c7_invited_he`）、`ch07.js:354`（日记 `{"when":"c7_invited_he","text":"阿禾真的来了。她带来了自己捏的月牙小饼。"}`）。
- **一句话修法**：把 `ch07.js:234` 的 flags 改成 `["c7_invited_he","c7_he_outside"]`。
- **为什么**：`c7_esbat` 里所有阿禾的台词/旁白都只由 `c7_he_inside` / `c7_he_outside` 控制；这条路两个都没设，玩家明明去叫了人，台上却只有自己，然后日记说她来了。

### M7 玩家性别称呼前后不一
- **位置**：`src/story/ch07.js:90` 白先生「小兄弟，今天办大事？」
- **一句话修法**：改成「小姑娘，今天办大事？」（或统一成他别处用的「小友」）。
- **为什么**：同一部戏里玩家被当女性——`ch00.js:168` 守灯人「小姑娘家，怎么还不回去？」、`ch04.js:242`「小姑娘，你懂行。」、`ch10.js:65`「小姑娘，钱先收着。」；只有 ch07 这一句"小兄弟"。

---

## 2. 建议修（不致命，但影响手感 / 密度）

### S1 守灯人连说 ≥3 句共 22 处，其中 4 连 8 处（规格要求"讲解别超过 2 句"）
- **4 连的 8 处**：`ch02.js:288-291`；`ch06.js:142-145`；`ch06.js:160-163`；`ch06.js:316-319`；`ch06.js:322,324-326`；`ch06.js:347-350`；`ch08.js:145-148`；`ch08.js:613-616`。
- **一句话修法**：在第 2、3 句之间插一步 `narr`（一个动作/一个物件特写），或把其中一句改成玩家的 `say` 回问。
- **为什么**：`ch06.js` 一章就占 11 处连说，蜡烛颜色那串（160-163「黄…紫…蓝…绿…棕…白…橙和红」）读起来像报菜名，是最容易变成讲师腔的地方。

### S2 78 个旗标"被设但从没被读"；其中 8 组是先前承诺过的跨章回调
- **跨章回调失效（设了但后面没人读）**：
  - `ch07.js:227` `c7_chen_watched`；`ch07.js:228` `c7_chen_left`
  - `ch08.js:70` `c8_he_count`；`ch08.js:72` `c8_he_read_bos`；`ch08.js:158` `c8_lampquiet`
  - `ch09.js:51` `c9_honest`；`ch09.js:82` `c9_he_memory`
  - `ch10.js:111-112` `c10_respect`
- **一句话修法**：各补一句挂该旗标的 `narr`/`say`（例如尾声中加 `{"when":"c10_respect","text":"阿禾：那句话她记住了。"}`），否则删掉旗标，别让它看起来有用。
- **为什么**：这些正是 `docs/CHAPTER_BRIEF.md:94-97` 写明"后面的章会读"的旗标，实际没有读者，玩家选了看不到任何差别。
- 其余 70 个（如 `c1_calm`、`c2_maiden`、`c5_danced`、`c6_color_blue`、`c8_token_bag`、`c8_burn_why`…）只影响所在章的局部花色，留着无害，属可接受。

### S3 结局最后一次选择没有任何后果
- **位置**：`src/story/ch10.js:338-340` 设 `path_moon` / `path_plan` / `path_journal`，之后只有三句旁白和 `{"t":"ending"}`；全剧没有任何地方读这三个旗标（日记 `j_end` 在 314 行，早于这次选择）。
- **一句话修法**：在 `ch10.js:341` 之后按三个旗标各加一句 `narr`，或把这次选择移到 `j_end` 之前。
- **为什么**：这是玩家在游戏里做的最后一个决定，现在等于没记下来；`CHAPTER_BRIEF` 里"尾声读 path_*"的设计落空了。

### S4 日记把圣烛节写成农历味的"二月二"
- **位置**：`src/story/ch08.js:621`「二月二那晚，我在老陈家守到小牛站起来。」
- **一句话修法**：改成「二月二号那晚」。
- **为什么**：Imbolc 是 2 月 2 日（`ch08.js:96` 自己写的是"二月二号"），而"二月二"在中文里通常指农历龙抬头，容易读岔。

### S5 一条 en 超出 280 字符上限
- **位置**：`src/story/ch10.js:92`，en 长 292 字符（`Unlike most orthodox religions, Wicca doesn't want your money…`）。
- **一句话修法**：在句子边界截断并加省略号（保留第一句即可）。
- **为什么**：`STORY_SPEC §8` / `CHAPTER_BRIEF §2` 规定 `quote.en` ≤ 280 字符；全剧只有这一条超。

### S6 同一张引文卡出现在两章，且第五章那张章标签是错的
- **位置**：`src/story/ch05.js:146-147` 与 `src/story/ch07.js:117-119` 是同一句英文（中文译文略有出入），ch07 那处 cite 正确（`Chapter 7 · p.58`）。
- **一句话修法**：把 `ch05.js:146-147` 换成一条真正的第五章引文（`notes_ch5_7.md` 第 9 条 `"Feel free to move in any manner you wish…"` p.43），或至少把 cite 改成 `Chapter 7 · p.58`。
- **为什么**：既去掉跨章重复卡，又顺手清掉 M4 里的那一处章标签错。

### S7 第七章三个试炼都是 arrange
- **位置**：`src/story/ch07.js`：`t7_quart` / `t7_altar` / `t7_mark` 全为 `arrange`（另各有一个 quiz、multi）。全剧只有这一章出现同类三连。
- **一句话修法**：把 `t7_mark`（标圈用物）改成 `sort` 或 `match`。
- **为什么**：规格要求每章至少 3 个不同类型；这章达标但手感偏单一。

### S8 序章一条引文的罗马页码可能差一位
- **位置**：`src/story/ch00.js:429`「Like most Wiccans, I'm not out to change your spiritual and religious beliefs…」cite `Preface · p.x`。
- **一句话修法**：按 OCR 页眉（PDF 10 的页眉印着 `Xi`）与 `notes_ch1_4.md` 的换算说明（「PDF 10 = xi」）改成 `p.xi`。
- **为什么**：这是全剧唯一一条与 OCR 页眉差 ≥1 的**罗马**页码（其余序言/引言引文都落在 p.ix–p.xiv 区间内，无法更精确）。

---

## 3. 通过（已核，未发现问题）

- **人物线 · 老陈**：`ch01.js:117` 溪边找回母牛 → `ch03.js:134-139` 怀孕 + 兽医钱 + 卖粮欠款 → `ch05.js:141` 拎二胡来篝火夜 → `ch08.js:107-143` 圣烛节雪夜产犊 → `ch10.js:14`「去年圣烛节出生的小牛已经长到人腰高」；`ch03.js:158`「她挂的」与 `ch08.js:128`「他媳妇生前挂的」同指一人，不矛盾。全剧他有脾气、不皈依，结局只是愿意坐下来说话。
- **人物线 · 阿禾**：`ch02.js:272-278` 末场出场 → `ch03.js:216-243` 伦理冲突（三个选项都不碰操纵魔法）→ `ch05.js`（不好意思跳舞）→ `ch06.js:197-201` 丢了母亲留的手链 → `ch08.js:518-546` 萨温想召唤亡母，两个结局（叫/不叫）都有完整台词 → `ch09.js:46-85` 转世追问 → `ch10.js:110-138`「继续自己读 / 先停下」两支都完整且都被尊重。
- **人物线 · 白先生**：ch04 集市首现（卖"祖传原版"、开光法刀、入会三百）→ ch07 九尺铜圈 → ch08 五朔节货 → ch09 前世解读（克娄巴特拉，脚注提醒自欺）→ ch10 三重入会摊牌后往南离开；全程是生意人，没有写成恶魔/邪教，自述「我也被人骗过三百块」有分寸。
- **契约人物**：小满只被提及、从未出场；女神/男神只在幻视里出现（多为「……」）✓。
- **第 48 页梗**：`ch06.js:22` 泡烂 → `ch06.js:405` → `ch10.js:271`「第 48 页还是烂的，你自己补」，三处一致 ✓。
- **引文逐字**：其余 134 条 en 均可在 OCR 逐字命中（含上述 2 条假失配）。
- **cite 页码**：可核对的 68 条与 notes 引文表 **0 分歧**；113 条与 OCR 页眉精确一致；11 条差一页（`ch00.js:595`、`ch02.js:31`、`ch02.js:128`、`ch03.js:57`、`ch03.js:62`、`ch07.js:57`、`ch07.js:62`、`ch07.js:279`、`ch08.js:53`、`ch08.js:62` 等），全部是引文跨页导致的 ±1，**无一条差 ≥2 页**。
- **旗标闭环**：没有"被读但从未被设"的旗标；`CHAPTER_BRIEF §3` 点名必须设的 `helped_chen`、`c6_invite_he`、`c6_invite_chen`、`c6_alone`、`c7_invited_he` 全部设了，且都在后续章节被读；序章的 `motive_*` / `p0_*` 也都在序章日记里被读。
- **关系值口径**：全剧可得正分 keeper +8 / chen +17 / he +26；`ch10.js:15` 的 `relMin chen:2` 与 `ch10.js:329` 的 `relMin keeper:3` 都能达到；每章 1–3 次有效加减（序章 0 次，序章不适用此条）。
- **语气红线**：没有找到传教句，也没有嘲笑宗教或怀疑者的句子；涉及基督教的比较（如 `ch02.js:127`）全部出自 `quote` 原文，不是守灯人的结论；作者个人观点都写成了"书里说/作者说"。
- **玩家自主**：正文里的"你…"多为动作描写（贴手掌、划火柴、埋供品），关键取舍都做成了 `choice`（阿禾伦理、白先生、邀请谁、萨温、立誓、入会、最后练什么）；未发现替玩家做决定的叙述。
- **重复感**：全剧 `say/narr/journal` 精确重复 0 组；45 个试炼全部被 `trial` 指令使用，无未使用定义；唯一同类三连见 S7。
- **结构完整性**：47 场景 / 1932 顶层步骤 / 147 图鉴 / 39 处 explore / 136 条 quote；`explore` 每处 3–6 个探索点，每章 ≥2 个 explore、≥3 种试炼、≥1 个 journal。

---

## 4. 复核方式（可重跑）

临时脚本目录 `C:\Users\Lenovo\AppData\Local\Temp\pwv2_audit\`（不在项目内）：
- `audit2.mjs` → `audit2.json`：章节统计、逐条 quote 的 OCR 命中/页码/notes 页、旗标读写差集、连说、超长句、重复句。
- `verifypages.mjs` → `vp.txt`、`pagemap.json`：从 OCR `*[p.N]*` + 页眉印刷页码建 PDF→印刷页映射，逐条比对 cite。
- `mergecheck.mjs`：notes 引文表页码 vs story cite（68 条，0 分歧）。
- `analyze3.mjs` / `runs5.mjs`：连说分组、语气候选、试炼 kind 分布、4 连行号。
- `probe2.mjs`：三条章标签错误的 OCR 定位与上下文。

如需复核，可只跑 `node audit2.mjs` 与 `node verifypages.mjs` 两份，输出即覆盖引文与旗标两项。
