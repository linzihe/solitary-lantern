# 配乐提示词（Suno）· 独修者的灯 2.0 · 修订版

> 本版按你的两条要求重写：
> **① 全程同一力度，不要副歌、不要高潮；② 首尾必须能接上（闭环）。**

---

## 0. 三条铁律（比旋律更重要，Suno 很容易违反）

### 铁律一：不做"歌"，只做"底"
这些曲子是**背景垫底**，不是给人专心听的歌。所以：

- **不要副歌（chorus / hook）、不要桥段（bridge）、不要 drop、不要 build-up。**
  一旦出现"主旋律段落反复回来"，玩家在认真读台词时就会被拽走注意力；
  而且高潮段落撞上平淡剧情、平淡段落撞上激烈剧情，都会很出戏。
- **力度曲线必须是平的**。整首的音量、配器数量、鼓的密度从头到尾基本不变。
  只允许极小的变化：某一小节换个乐器把动机再奏一遍，仅此而已。
- **不要渐强、不要渐弱、不要在结尾"收束"。**
  最后一个音不要落在主和弦上做终止感 —— 那听起来像"歌放完了"，
  而我们需要的是"它一直在这里"。

### 铁律二：首尾闭环（这条决定我能不能做无缝循环）
Suno 一次给你 3–4 分钟就停了。接进游戏后我是这样处理的：

```
淡入 2 秒 ──► 全长保持同一力度 ──► 淡出 2 秒
   ↑                                    ↓
   └────────── 与开头交叉叠化 ◄──────────┘
```

也就是说：**开头会成为结尾的延续**。所以你要的是：

- 开头 **2–3 秒内进入状态**，不要长引子、不要单独的前奏段落；
- 开头那 8 小节用什么乐器、什么力度，**结尾那 8 小节就用同样的**；
- 结尾**不要淡到 0、不要停顿、不要留静音**（静音尾我会叠化出一个小断层）；
  直接停在乐句中间也没关系，我靠交叉叠化接回去。
- 全曲最好只有 **2–3 个和弦**循环，不加转调（modulation）。转调会让接缝露馅。

**Suno 里怎么让 AI 照做**：把下面的词放进 Style 标签或 Prompt 里 ——
`no chorus, no climax, no build-up, no dynamics, flat dynamics, constant intensity,
loopable, seamless loop, cyclical, no intro, no outro, no fade out, no resolution`

### 铁律三：十首同一套音色
原声吉他（指弹）、凯尔特竖琴、木笛/低音哨笛、大提琴（长音铺底）、手鼓与铃（极少量）、
雨棍/风铃（点缀）。**不要**电吉他、合成器主音、鼓组、管弦大编制、人声、合唱。
调式集中在 A 小调 / D 多利亚 / G 大调，场景切换时才不跳。

---

## 1. 交付约定（照旧）

文件名**必须和游戏内部 ID 一致**，我按名字直接读：

```
title.mp3   forest.mp3   cottage.mp3  moon.mp3    dawn.mp3
trance.mp3  wheel.mp3    trial.mp3    ending.mp3  vision.mp3(可选)
```

- MP3 / M4A 都行，**128 kbps 以内**，**每首 2–3 分钟**（别再长了，4 分钟的文件只会让体积翻倍而听感没差）
- Suno 一定要勾 **Instrumental**，歌词框留空或写 `[instrumental]`
- 放到文件夹（或压缩包）里，路径发我；也可以直接丢进 `D:\下载\pixel-wicca-v2\music\`

---

## 2. 十首曲子（全部按"平的循环底"写法）

> 每首的 Style 标签和 Prompt 里都已经包含"无副歌/无高潮/可无缝循环"的要求，
> 直接整段复制即可，不用自己再补。

### ① `title.mp3` — 标题 / 石圈守夜
**感受**：夜里独自走上山坡，一圈立石在月光下。安静的孤独，不要壮阔。
```
instrumental, celtic folk, ambient bed, solo harp, low whistle, cello drone, slow 3/4, sparse,
flat dynamics, no chorus, no climax, no build-up, loopable, seamless loop, no intro, no outro, no fade, no vocals, no drums
```
```
A continuous instrumental ambient celtic folk bed for a quiet night scene. Solo Celtic harp repeats one simple rising
arpeggio figure; a low whistle answers briefly and then stops; a single low cello drone holds underneath. The
arrangement, texture and volume stay exactly the same from the first bar to the last — no build, no peak, no
resolution. Sparse and intimate, soft natural reverb like a stone circle at midnight. Only two chords, cycling.
Never epic. No vocals, no drums, no synthesizers.
```

### ② `forest.mp3` — 第一章 · 白天林间
**感受**：白天的林子，光斑、脚步声。中性偏轻，像走路时的背景。
```
instrumental, celtic folk, ambient bed, acoustic guitar fingerpicking, wooden flute, soft shaker, 6/8,
steady tempo 78, flat dynamics, no chorus, no climax, no build-up, loopable, seamless loop, no intro, no outro, no vocals
```
```
A steady instrumental folk bed for walking through a daytime birch forest, at an even 78 bpm in 6/8. Fingerpicked
acoustic guitar cycles one short pattern, a wooden flute states a small motif and later repeats it unchanged, very
light shaker like footsteps on leaves. The intensity is completely flat throughout — it never swells, never peaks,
never resolves. Two chords only, no key change. Keep it unobtrusive enough to read over for an hour.
No vocals, no electric instruments, no drum kit.
```

### ③ `cottage.mp3` — 守灯人的小屋 / 书房 / 翻书（用得最多）
**感受**：室内、壁炉、旧书、有人在翻页。温暖、安静、不沉闷。
```
instrumental, chamber folk, ambient bed, fingerpicked guitar, harp, soft cello, fireplace crackle, slow 68,
intimate, flat dynamics, no chorus, no climax, no build-up, loopable, seamless loop, no intro, no outro, no drums, no vocals
```
```
A warm continuous instrumental chamber folk bed for a small candlelit cottage with a fireplace and old books.
Fingerpicked classical guitar and harp trade a short figure back and forth, a cello holds long soft notes, faint
fireplace crackle underneath. Same volume and same number of instruments from start to finish: no build-up, no
climax, no closing cadence. Two chords, cycling evenly, around 68 bpm. No vocals, no drums, no synthesizers.
```

### ④ `moon.mp3` — 第二章 · 月下湖面（也让"幻视"复用）
**感受**：湖面月光。神秘但不恐怖，"神就在附近"而非恐怖片。
```
instrumental, ambient folk, ambient bed, harp harmonics, singing bowl, low whistle, cello drone, very slow,
deep reverb, floating, flat dynamics, no chorus, no climax, no build-up, loopable, seamless loop, no intro, no outro, no vocals, no choir
```
```
A very slow floating ambient folk bed for a lake under a full moon. Harp harmonics with long decays, one low whistle
line drifting in and out, a singing bowl struck every few bars, a distant cello drone. Completely even and static in
intensity — nothing builds, nothing peaks, nothing concludes. Water-like shimmer, generous reverb, only two chords
with no modulation. Sense of a quiet presence nearby, never frightening.
No vocals, no choir, no church organ, no drums.
```

### ⑤ `dawn.mp3` — 破晓 / 鹿与男神 / 尾声白日
**感受**：天刚亮，山谷起雾。温暖、开阔 —— 但**不要"太阳升起"那种渐强高潮**。
```
instrumental, celtic folk, ambient bed, low whistle, acoustic guitar, warm strings, slow 72, open, gentle,
flat dynamics, no chorus, no climax, no build-up, no swell, loopable, seamless loop, no intro, no outro, no vocals
```
```
An even, warm instrumental folk bed for sunrise over a misty valley. A lone low whistle holds a simple phrase over a
soft guitar arpeggio, with warm sustained strings underneath. IMPORTANT: it must NOT rise or swell — no sunrise
crescendo, no climax, no triumphant ending, no key change. The same gentle level runs from the first bar to the last,
cycling two or three chords around 72 bpm. Spacious and calm, morning light without fanfare.
No vocals, no drums, no cinematic build.
```

### ⑥ `trance.mp3` — 篝火夜 / 鼓与舞 / 萨满的鼓
**感受**：夜篝火，有人打鼓，人慢慢进入专注。有推进感 —— 但**是恒定的推进，不是越打越猛**。
```
instrumental, ritual folk, ambient bed, frame drum, bodhran, rattles, jaw harp, low drone, hypnotic, repetitive,
steady pulse, flat dynamics, no drum solo, no build-up, no chorus, no climax, loopable, seamless loop, no intro, no outro, no vocals
```
```
A hypnotic instrumental ritual folk bed for a night campfire. One hand drum keeps a steady, unwavering pulse; rattles
and a second drum are already present from the beginning; a jaw harp and low whistle play short repeating figures over
a low drone. Crucially, the groove stays absolutely constant: it does NOT speed up, does NOT get louder, has no drum
solo, no break, no build and no climax. It should feel like a circle that has always been going. Around 66 bpm,
repetitive and even. No vocals, no rock or electronic drums.
```

### ⑦ `wheel.mp3` — 一年之轮 / 石圈仪式 / 四季
**感受**：一年转一圈，八个节日轮着来。循环感要强，明亮一点。
```
instrumental, celtic folk, ambient bed, cyclical 6/8, harp, accordion, fiddle, soft hand percussion, steady 72,
seasonal, even, flat dynamics, no chorus, no climax, no build-up, loopable, seamless loop, no intro, no outro, no vocals
```
```
An instrumental folk bed built on one cyclical 6/8 figure that keeps returning — the same phrase, taken in turn by
harp, then accordion, then fiddle, and then back to harp. The energy level never changes: no build, no peak, no final
flourish, no tempo change. Around 72 bpm, warm and rustic, only two or three chords cycling without modulation.
The last eight bars should be interchangeable with the first eight.
No vocals, no electric instruments, no big drums.
```

### ⑧ `trial.mp3` — 小游戏 / 试炼（每章要用好几次，最需要"不烦"）
**感受**：做练习题，像一卷摊开的书页。轻，简单，重复起来不腻。
```
instrumental, light chamber folk, ambient bed, pizzicato strings, marimba, fingerpicked guitar, soft tap percussion,
steady 76, minimal, playful but even, flat dynamics, no chorus, no climax, no build-up, loopable, seamless loop, no intro, no outro, no vocals
```
```
A short, even instrumental chamber folk loop for a quiet study exercise. Pizzicato strings and soft marimba exchange a
small question-and-answer pattern over fingerpicked guitar, with a light page-turn-like tap every other bar. It must be
completely static in intensity — no chorus, no hook that returns as a "big moment", no build, no ending cadence —
because the player will hear it dozens of times. Around 76 bpm, two chords, minimal and unobtrusive.
No vocals, no drum kit, no synth.
```

### ⑨ `ending.mp3` — 尾声 · 黎明 / 把灯带回家
**感受**：一夜结束，把灯和笔记带回家。温暖、有余味 —— 但**不要"大团圆式"的收束**。
```
instrumental, celtic folk, ambient bed, harp, guitar, cello, slow 68, warm, even, flat dynamics,
no chorus, no climax, no build-up, no final cadence, no key change, loopable, seamless loop, no intro, no outro, no vocals
```
```
A warm, even instrumental folk bed for daybreak at the end of a long story. Harp and guitar carry a quiet motif with
cello underneath. IMPORTANT: do not resolve it like a finale — no big final chord, no swell, no key change, no
"the end" feeling. Keep the same level and the same two or three chords from start to finish so it can sit under the
ending text indefinitely. Around 68 bpm, bittersweet and calm, like walking home with a lantern.
No vocals, no drums, no cinematic ending.
```

### ⑩ `vision.mp3`（可选）— 幻视 / 神祇显现
**感受**：短暂的、半透明的几秒。若不做，我用 `moon.mp3` 代替。
```
instrumental, ambient, drone, glass harmonica, harp harmonics, very slow, floating, static, no melody, no chorus,
no climax, no build-up, loopable, seamless loop, no intro, no outro, no vocals, no choir
```
```
A very short static ambient bed for a vision: floating harp harmonics over one warm unchanging drone, a glassy
bell-like timbre, everything blurred and distant as if heard through water. No melody that develops, no movement, no
climax — it simply hangs there. 45–60 seconds is enough. Neutral, neither happy nor sad.
No words, no choir, no percussion.
```

---

## 3. 贴给 Suno 的通用负面词

放进 Exclude 框（或作为风格尾巴）：

```
no vocals, no lyrics, no choir, no humming, no oohs, no EDM, no synth lead, no drum kit, no electric guitar,
no trap hi-hats, no epic orchestral, no horror stingers, no chorus, no bridge, no climax, no build-up, no drop,
no crescendo, no swell, no tempo change, no key change, no modulation, no drum solo, no intro, no outro,
no fade out, no final cadence, no resolution
```

## 4. 生成与验收的小技巧

1. **一次生成两个候选**，挑"前 20 秒就进入状态、且第 2 分钟和第 1 分钟听起来一样"的那个。
2. 出现"第 2 分半突然变响/加了新乐器"的，直接弃用 —— 那就是变相的高潮。
3. 验收方法：**单曲连听 3 分钟**。如果中途你会注意到"音乐变了"，说明不合格。
4. **不要**用 Suno 的 Extend / 续写功能去凑长度 —— 那最容易接出断层，也最容易加出高潮。
5. 交付前自己听一下最后一小节：**如果结束在明显的终止和弦上**（听感"唱完了"），
   建议重生成；我们要的是"停在半路、还能接回去"。
