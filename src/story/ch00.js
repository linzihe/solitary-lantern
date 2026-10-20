/* 序章 · 守夜 —— 作者 A。入口场景 prologue，末页跳到第一章 c1_forest。 */
STORY_ADD({
  scenes: {
    "prologue": {
      "title": "序章 · 守夜",
      "bg": "stones",
      "music": "title",
      "amb": "wind",
      "script": [
        {
          "t": "chapter",
          "title": "序章",
          "sub": "守 夜",
          "en": "THE VIGIL"
        },
        {
          "t": "intro",
          "chapter": "序章",
          "title": "守夜",
          "book": "序言 · 引言",
          "points": [
            "满月夜，石圈边，你会遇见守灯人",
            "有一个问题要你自己回答：你今晚为什么上来",
            "你会亲手试一次：看月亮、坐下、呼吸",
            "离开时你带走一盏灯和一个符印"
          ]
        },
        {
          "t": "narr",
          "text": "十一月下旬，满月。风把坡上的草按向一边，石头在月光下比白天更白。"
        },
        {
          "t": "narr",
          "text": "你从小就住在这个村子边上。屋后是坡，坡上是乱石，乱石中间围着一圈站着的石头。"
        },
        {
          "t": "narr",
          "text": "大人说那圈石头不能碰。你碰过：八岁那年你在中间坐了一下午，回家挨了一顿。"
        },
        {
          "t": "think",
          "text": "今晚我又上来了。手冻得发僵，我还没打算回去。"
        },
        {
          "t": "explore",
          "id": "p0_stones",
          "prompt": "石圈在月光里。你想先看哪儿？",
          "need": 3,
          "exitLabel": "走到石头中间",
          "spots": [
            {
              "id": "moon",
              "x": 208,
              "y": 20,
              "w": 64,
              "h": 64,
              "label": "月亮",
              "script": [
                {
                  "t": "narr",
                  "text": "月亮很圆，圆得有点不像话。你盯着看了一会儿，眼睛发酸。"
                },
                {
                  "t": "narr",
                  "text": "看久了，月亮的边上会浮出一圈毛边，像被水洇开的墨。"
                },
                {
                  "t": "think",
                  "text": "村里人说不能盯着月亮看。可我看了，什么事也没有。"
                }
              ]
            },
            {
              "id": "stone",
              "x": 260,
              "y": 150,
              "w": 40,
              "h": 90,
              "label": "立石",
              "script": [
                {
                  "t": "narr",
                  "text": "中间那块立石最高。它朝北的一面有几道浅浅的刻痕，被风雨磨得几乎平了。"
                },
                {
                  "t": "narr",
                  "text": "你把手按上去。是凉的，凉得很实在，像摸到一件还没醒过来的东西。"
                },
                {
                  "t": "think",
                  "text": "这些痕迹是谁刻的？刻的时候他在想什么？"
                }
              ]
            },
            {
              "id": "pine",
              "x": 130,
              "y": 110,
              "w": 60,
              "h": 90,
              "label": "松林",
              "script": [
                {
                  "t": "narr",
                  "text": "左边的松树把月光切成一片一片。树下的地上有一小圈灰，是很早以前烧过火的痕迹。"
                },
                {
                  "t": "narr",
                  "text": "灰早被雨水冲平了，只在低处留下一点黑。有人在这里坐过，而且不止一次。"
                }
              ]
            },
            {
              "id": "hill",
              "x": 40,
              "y": 130,
              "w": 60,
              "h": 50,
              "label": "坡下",
              "script": [
                {
                  "t": "narr",
                  "text": "坡下村子的窗子只剩两扇还亮着。狗叫过一阵，现在也叫累了。"
                },
                {
                  "t": "narr",
                  "text": "从这里看下去，人住的地方很小，小得像一堆积木。"
                }
              ]
            },
            {
              "id": "figure",
              "x": 320,
              "y": 180,
              "w": 24,
              "h": 52,
              "label": "坡下来人",
              "script": [
                {
                  "t": "narr",
                  "text": "坡下的草响了一下。不是风——风是成片的，这个声音是一条线。"
                },
                {
                  "t": "narr",
                  "text": "有人提着一盏灯，正顺着上坡的小路走。灯光一荡一荡，却始终没灭。"
                },
                {
                  "t": "think",
                  "text": "这个点，谁会往山上走？"
                }
              ]
            }
          ]
        },
        {
          "t": "sfx",
          "name": "step"
        },
        {
          "t": "narr",
          "text": "脚步声在石圈外停住了。来的人没有立刻进来，先站着看了你一会儿。"
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "我在坡下看了你很久。天凉，小姑娘家，怎么还不回去？"
        },
        {
          "t": "think",
          "text": "她是守灯人。村里人这么叫她，因为她总在夜里提着一盏灯走来走去。"
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "别慌。我年年都上来。年年都有人在石头中间站着，站一会儿就走了。"
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "很少有人像你这样——来了，又不走，也不干什么。"
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "说吧，你在这儿等什么？"
        },
        {
          "t": "choice",
          "prompt": "她把灯往上提了提。你要怎么答？",
          "options": [
            {
              "text": "「我想知道，人为什么会需要一个神。」",
              "flags": [
                "motive_words"
              ],
              "insight": 1,
              "reply": "她点点头，像是早就料到。「这个问题不小。今晚我不答题，我借你一本书。」"
            },
            {
              "text": "「这里安静。别的地方都不安静。」",
              "flags": [
                "motive_quiet"
              ],
              "insight": 1,
              "reply": "她没再问，就在旁边的石头上坐下来，把灯放在两个人中间。"
            },
            {
              "text": "「我不知道我为什么来。」",
              "flags": [
                "motive_lost"
              ],
              "insight": 2,
              "reply": "「不知道也可以。」她说，「很多人是知道了原因以后，反倒不来了。」"
            }
          ]
        },
        {
          "t": "narr",
          "text": "她把灯放在石头上，又解下背上的布包。包里硌着东西，碰在石头上响了一声。"
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "先别急着问我。你刚才看了一圈，我先看看你看见了什么。"
        },
        {
          "t": "explore",
          "id": "p0_kit",
          "prompt": "她把东西摊在石头上。你想先看哪样？",
          "need": 2,
          "exitLabel": "坐回去",
          "spots": [
            {
              "id": "lantern",
              "x": 300,
              "y": 170,
              "w": 42,
              "h": 42,
              "label": "提灯",
              "script": [
                {
                  "t": "narr",
                  "text": "灯是铜的，很旧。提梁上缠着一圈布，被手磨得发亮，布的颜色已经看不出原样。"
                },
                {
                  "t": "narr",
                  "text": "灯罩里那点火很小，可石头、草、你的手背，都被它照出了一层暖色。"
                },
                {
                  "t": "think",
                  "text": "这条路她走了多少年，才能把一块布磨成这样。"
                }
              ]
            },
            {
              "id": "book",
              "x": 237,
              "y": 178,
              "w": 44,
              "h": 38,
              "label": "那本书",
              "script": [
                {
                  "t": "narr",
                  "text": "书角翻得起了毛，封面上画着一颗五条线连成的星星。"
                },
                {
                  "t": "narr",
                  "text": "书名是《威卡：独修者指南》。你翻了两页，字很小，写得很密，页边还有铅笔画的线。"
                },
                {
                  "t": "think",
                  "text": "这书被人从头到尾读过。有的页角还折着。"
                }
              ]
            },
            {
              "id": "bag",
              "x": 350,
              "y": 196,
              "w": 44,
              "h": 40,
              "label": "布袋",
              "script": [
                {
                  "t": "narr",
                  "text": "布包里还有别的：一小把干草、半截蜡烛、一小袋麦子，都用纸分别包好。"
                },
                {
                  "t": "narr",
                  "text": "麦子是今年的新麦，从袋子口漏出几粒，落在石头上。"
                },
                {
                  "t": "think",
                  "text": "她上山不只是来看月亮的。"
                }
              ]
            },
            {
              "id": "staff",
              "x": 355,
              "y": 145,
              "w": 22,
              "h": 78,
              "label": "她的杖",
              "script": [
                {
                  "t": "narr",
                  "text": "一根木杖靠在石头上，比她的肩膀略高。杖头被手磨得发亮，杖身却没有上漆。"
                },
                {
                  "t": "narr",
                  "text": "你碰了一下，木头是干的，敲上去声音很实。"
                }
              ]
            }
          ]
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "看完了？那就把书拿去。今晚起，我们按它读几章。"
        },
        {
          "t": "say",
          "who": "player",
          "name": "你",
          "text": "……您教我？"
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "我陪你读。教这个字我不敢当——书上第一句就把我这种人的位置说清楚了。"
        },
        {
          "t": "quote",
          "text": "本书中确实有仪式，但它们是路标，而非圣典。我写下它们，是想让别人拿它们当大致的方向，去写出自己的那一套。",
          "en": "There are rituals in this book, yes, but they're guideposts, not holy writ. I wrote them so that others, using them as general guidelines, could create their own.",
          "cite": "Preface · p.ix"
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "路标只管指路，不管你怎么走。你以后要是觉得哪一段不对，就改掉它。"
        },
        {
          "t": "quote",
          "text": "这里描述的威卡是「新」的。它不是流传了几千年的古代秘仪重现；但这不使它失效，因为它建立在由来已久的实践之上。",
          "en": "It is not a revelation of ancient rituals handed down for thousands of years. This does not invalidate it, however, for it is based on time-honored practices.",
          "cite": "Preface · p.ix"
        },
        {
          "t": "say",
          "who": "player",
          "name": "你",
          "text": "那我们这圈石头，是古人留下的吗？"
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "不知道。是谁把它们立起来的，村里早没人说得清了。"
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "我不打算给它编一个来历。作者在这本书里也没编——他说得很直。"
        },
        {
          "t": "quote",
          "text": "从来不曾、也永远不会有哪一种「纯正的」「真正的」或「原版的」威卡。没有中央管理机构，没有肉身领袖，也没有公认的先知。",
          "en": "There is not, and can never be, one \"pure\" or \"true\" or \"genuine\" form of Wicca. There are no central governing agencies, no physical leaders, no universally recognized prophets or messengers.",
          "cite": "Preface · p.ix"
        },
        {
          "t": "codex",
          "ids": [
            "p0_guide",
            "p0_new",
            "p0_unique"
          ]
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "各派对仪式、象征、神学的看法并不一致。作者管这个叫健康的个人主义。"
        },
        {
          "t": "quote",
          "text": "切割祖母绿原石的珠宝匠并没有创造宝石，陶匠也没有创造黏土。",
          "en": "The jeweler who facets rough emeralds didn't create the gemstones; nor the potter the clay.",
          "cite": "Preface · p.ix"
        },
        {
          "t": "think",
          "text": "所以这本书是把现成的东西摆到一起，不是从天上接下一部经。"
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "他这么写，是为了让读的人自己去长，而不是再立一个门派。"
        },
        {
          "t": "quote",
          "text": "像大多数威卡人一样，我不是来改变你在灵性和宗教上的信仰的；那不关我的事。",
          "en": "Like most Wiccans, I'm not out to change your spiritual and religious beliefs; it's none of my business.",
          "cite": "Preface · p.x"
        },
        {
          "t": "quote",
          "text": "威卡不招揽信徒。原因和大多数西方宗教不同：它并不声称自己是通往神的唯一真道。",
          "en": "Wicca doesn't solicit because, unlike most western religions, it doesn't claim to be the one true way to deity.",
          "cite": "Introduction · p.xiii"
        },
        {
          "t": "codex",
          "ids": [
            "p0_jewel",
            "p0_prose"
          ]
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "所以我不劝你信，也不收你钱。你要走，明天下山就当没见过我。"
        },
        {
          "t": "say",
          "who": "player",
          "name": "你",
          "text": "那我算什么？没有师父，没有入门，算什么？"
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "算独修者。这本书就是给这种人写的。"
        },
        {
          "t": "quote",
          "text": "这本书打破了许多威卡的惯例。它的结构让世界上任何地方的人都能修习，不需要任何入门仪式。",
          "en": "This book breaks many Wicca conventions. It has been structured so that anyone, anywhere in the world, can practice Wicca. No initiations are required.",
          "cite": "Introduction · p.xiv"
        },
        {
          "t": "codex",
          "ids": [
            "wicca",
            "solitary",
            "p0_open"
          ]
        },
        {
          "t": "narr",
          "text": "她伸手把书往你这边推了推，纸页在石头上刮出一声轻响。"
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "书里还说过一句更要紧的话：仪式有没有用，取决于做它的人。"
        },
        {
          "t": "quote",
          "text": "一段三千年前向神呼唤的咒语，未必比私人仪式中即兴而作的更有力。决定仪式或咒语成败的，是施行它的人。",
          "en": "A three-thousand-year-old incantation to manna isn't necessarily more powerful or effective than one improvised during a private rite. The person practicing the ritual or spell determines its success.",
          "cite": "Preface · p.ix"
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "所以我不考你。考你的人，是你自己。"
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "先来一件小事。这几句话里，哪些是书里真写的，哪些是外面传的，你替我分一分。"
        },
        {
          "t": "trial",
          "id": "p0_true"
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "不错。你比我第一次读的时候认真。"
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "还有一件事你今晚就能知道：你没有等谁批准。"
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "按这本书的道理，独自开始的人，本来就不需要谁点头。"
        },
        {
          "t": "achv",
          "id": "firststep"
        },
        {
          "t": "shard",
          "id": "lantern"
        },
        {
          "t": "quote",
          "text": "威卡是一门从我们与自然的亲缘里长出来的喜乐宗教。它是对生命个人的、积极的庆祝。",
          "en": "Wicca is a joyous religion springing from our kinship with nature. It is a merging with the goddesses and gods, the universal energies that created all in existence. It is a personal, positive celebration of life.",
          "cite": "Introduction · p.xiv"
        },
        {
          "t": "codex",
          "ids": [
            "p0_joy"
          ]
        },
        {
          "t": "say",
          "who": "player",
          "name": "你",
          "text": "喜乐……我没想到会是这个词。"
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "别人以为我们夜里在山上是干些阴森事。你自己看，这里冷是冷，可一点也不阴。"
        },
        {
          "t": "narr",
          "text": "她在石头上坐下来，把袍子拢了拢。风从松林那边过来，吹得灯焰歪了一下，又立直了。"
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "读书之前，我先教你一件比读书有用的事：怎么坐着，不动。"
        },
        {
          "t": "say",
          "who": "player",
          "name": "你",
          "text": "坐着也算练？"
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "算。书里把这类体验叫「另类意识状态」，还特意说它并不违反自然。"
        },
        {
          "t": "quote",
          "text": "我特意用了「另类意识状态」这个词。这些改变了的意识状态并非不自然，只是偏离了我们平常的清醒状态。",
          "en": "I deliberately used the term \"alternate states of consciousness.\" Such changed consciousness states aren't unnatural, but are a deviation from the \"normal\" waking consciousness.",
          "cite": "Chapter 1 · p.4"
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "吸气，数四下。屏住两下。呼出去，数六下。呼比吸长，人就会慢下来。"
        },
        {
          "t": "narr",
          "text": "她说完就不再说话了，只把手放在膝上。灯的火苗稳稳的，成了这个夜里唯一在动的东西。"
        },
        {
          "t": "trial",
          "id": "p0_breath"
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "好。刚才那几分钟，你脑子里是什么样子？"
        },
        {
          "t": "choice",
          "prompt": "说实话也没关系。",
          "options": [
            {
              "text": "「有点乱，走神好几次。」",
              "flags": [
                "p0_distracted"
              ],
              "reply": "「那就是最正常的样子。」她说，「能把注意力捡回来几次，你就练了几次。」"
            },
            {
              "text": "「比平时安静一点，就一点。」",
              "flags": [
                "p0_quiet"
              ],
              "insight": 1,
              "reply": "「一点就够了。」她把灯芯剪了一下，「第一次就安静到底的，我到现在也没见过。」"
            },
            {
              "text": "「我一直在数呼吸，别的没想。」",
              "flags": [
                "p0_counted"
              ],
              "insight": 1,
              "reply": "「数也是办法。」她笑了一下，「数到自己不用数了，就更好。」"
            }
          ]
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "明天日落前来坡下的林子。我们从第一章读起。"
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "还有一件小事：回去的路上，别踩那些草。它们冬天长得不容易。"
        },
        {
          "t": "narr",
          "text": "她把灯递过来。铜的，比看上去重。提梁上那圈布正好落在你手心里。"
        },
        {
          "t": "say",
          "who": "keeper",
          "name": "守灯人",
          "por": "keeper",
          "text": "灯借你。路你自己走。"
        },
        {
          "t": "think",
          "text": "她说得轻，但我听出来了：这句话不是客气，是条件。"
        },
        {
          "t": "journal",
          "id": "j_p0",
          "title": "序章 · 本章笔记",
          "lines": [
            "十一月下旬，满月。我第一次在夜里上到石圈，守灯人把她的灯借给了我。",
            {
              "when": "motive_words",
              "text": "我跟她说我想知道人为什么需要一个神。她没笑我，只说这问题不小。"
            },
            {
              "when": "motive_quiet",
              "text": "我说这里安静。她就在旁边坐下，把灯放在我们两个人中间。"
            },
            {
              "when": "motive_lost",
              "text": "我说我不知道自己为什么来。她说不知道也可以。"
            },
            "书里说：仪式是路标，不是圣典；这本书里的威卡是新的，也从来没有什么唯一纯正的威卡。",
            "作者写书不是来劝人改信的。守灯人说她也不劝。",
            "她说我不用等谁批准——独修者本来就可以自己开始。",
            {
              "when": "p0_quiet",
              "text": "刚才坐着的时候，比平时安静了一点。就一点，但我记住了。"
            },
            {
              "when": "p0_distracted",
              "text": "我走神了好几次。她说能把注意力捡回来几次，就等于练了几次。"
            },
            {
              "when": "p0_counted",
              "text": "我一直在数呼吸。原来数数也能让人停下来。"
            },
            "我还有一件事没问出口：这圈石头到底是谁立的。明天再问。"
          ]
        },
        {
          "t": "fx",
          "kind": "flash"
        },
        {
          "t": "finishChapter",
          "id": "p0"
        },
        {
          "t": "chapter",
          "title": "第一章",
          "sub": "萨 满 的 鼓",
          "en": "THE SHAMAN'S DRUM"
        },
        {
          "t": "scene",
          "id": "c1_forest"
        }
      ]
    }
  },
  codex: {
    "wicca": {
      "cat": "序章",
      "title": "威卡",
      "en": "Wicca",
      "text": "一条现代异教传统：以对自然创造力量（用女神与男神象征）的敬意为中心，同时容纳宗教与魔法。没有中央机构，也没有唯一正确的版本。",
      "src": "p.xiii"
    },
    "solitary": {
      "cat": "序章",
      "title": "独修者",
      "en": "the solitary practitioner",
      "text": "不加入团体、一个人实践的人。这本书就是为他们写的：不需要入门仪式，世界上任何地方的人都可以修习。",
      "src": "p.xiv"
    },
    "p0_guide": {
      "cat": "序章",
      "title": "路标",
      "en": "guideposts",
      "text": "作者对自己写的仪式的定位：它们是路标，不是圣典。觉得太正式，就改掉；它们只负责指方向。",
      "src": "p.ix"
    },
    "p0_new": {
      "cat": "序章",
      "title": "「新」的威卡",
      "en": "the Wicca as described here is new",
      "text": "作者直说：他描述的威卡是新的，不是流传千年的古代仪式揭秘。但他认为这并不使它失效，因为它建立在由来已久的实践上。",
      "src": "p.ix"
    },
    "p0_unique": {
      "cat": "序章",
      "title": "没有原版",
      "en": "no one true Wicca",
      "text": "没有中央机构、肉身领袖或公认先知，各派在仪式与神学上并不一致。作者把这叫做健康的个人主义。",
      "src": "p.ix"
    },
    "p0_jewel": {
      "cat": "序章",
      "title": "珠宝匠",
      "en": "the jeweler",
      "text": "切磨祖母绿的人没有创造宝石。作者说他只是把威卡的主要主题和仪式结构摆到一起，让读者去长自己的那一套。",
      "src": "p.ix"
    },
    "p0_prose": {
      "cat": "序章",
      "title": "不劝人信",
      "en": "not proselytizing",
      "text": "作者明确说自己不是来传教的：改变别人的信仰不关他的事。威卡不招揽信徒，因为它不声称自己是唯一真道。",
      "src": "p.x, p.xiii"
    },
    "p0_open": {
      "cat": "序章",
      "title": "不必等批准",
      "en": "no initiations required",
      "text": "过去要进入威卡，得先联系一位已入会的人、再接受入门。这本书打破了这条惯例：不需要入门仪式。",
      "src": "p.xiv"
    },
    "p0_joy": {
      "cat": "序章",
      "title": "喜乐的宗教",
      "en": "a joyous religion",
      "text": "威卡从人与自然的亲缘里长出来，是对生命个人的、积极的庆祝。它不把神安放在远处，也不靠恐吓维持。",
      "src": "p.xiv"
    }
  },
  trials: {
    "p0_true": {
      "kind": "sort",
      "title": "序章 · 试炼 · 书里书外",
      "hint": "这句话是书里写的，还是外面传的？",
      "bins": [
        {
          "id": "yes",
          "label": "书里写了",
          "tip": "作者的立场"
        },
        {
          "id": "no",
          "label": "书里没有",
          "tip": "流行的误会"
        }
      ],
      "items": [
        {
          "text": "书里的仪式是路标，不是圣典。",
          "bin": "yes",
          "why": "「本书中确实有仪式，但它们是路标，而非圣典。」",
          "src": "p.ix"
        },
        {
          "text": "威卡没有中央机构，也没有公认的先知。",
          "bin": "yes",
          "why": "「没有中央管理机构，没有肉身领袖，也没有公认的先知。」",
          "src": "p.ix"
        },
        {
          "text": "这本书描述的威卡是新的，不是古代秘传。",
          "bin": "yes",
          "why": "作者自己写下这句：它不是流传千年的古代仪式重现。",
          "src": "p.ix"
        },
        {
          "text": "决定仪式或咒语成败的，是施行它的人。",
          "bin": "yes",
          "why": "「决定仪式或咒语成败的，是施行它的人。」",
          "src": "p.ix"
        },
        {
          "text": "作者希望读者读完就改信威卡。",
          "bin": "no",
          "why": "他写得很清楚：他不是来传教的，改变别人的信仰不关他的事。",
          "src": "p.x"
        },
        {
          "text": "威卡派人到处招揽新成员。",
          "bin": "no",
          "why": "「威卡不招揽信徒」，因为它不声称自己是通往神的唯一真道。",
          "src": "p.xiii"
        },
        {
          "text": "要开始修习，必须先找一位已入会的人。",
          "bin": "no",
          "why": "这是过去的规矩。本书打破它：不需要任何入门仪式。",
          "src": "p.xiv"
        }
      ],
      "explain": "序言和引言里，作者反复做同一件事：先说明这本书的立场，再拆掉外面流传的说法。分不清这两件事，后面几章会被自己的预设绊住。",
      "src": "Preface · p.ix, Introduction · p.xiv"
    },
    "p0_breath": {
      "kind": "breath",
      "title": "序章 · 试炼 · 坐着呼吸",
      "caption": "按住空格吸气四拍，松手呼气六拍",
      "cycles": 3,
      "inhale": 4,
      "hold": 2,
      "exhale": 6,
      "explain": "书里把专注、冥想这类方式列为进入仪式意识的途径之一。呼吸练习是游戏加的一层：它不神秘，只是让人慢下来。做不好也不代表什么。",
      "src": "Chapter 1 · p.4"
    }
  },
  sigils: {
    "lantern": {
      "name": "灯",
      "icon": "flame",
      "desc": "守灯人借给你的灯。她说灯借你，路你自己走。",
      "src": "序章"
    }
  },
  achv: {}
});
