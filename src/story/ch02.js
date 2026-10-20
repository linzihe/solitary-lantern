/* 第二章 · 三面之神（The Deities）—— 作者 A。入口 c2_moon，末页跳到第三章 c3_study。
 * 资料：notes_ch1_4.md 第 2 章（p.9–19），引文逐字取自 OCR。
 * 一条主线：月下湖见到女神 → 破晓见鹿与男神 → 七天的调谐练习 → 在家里摆第一座小神龛。
 * 注意：试炼 kind 只用引擎真正接通的 quiz/match/order/arrange/rhythm 之类里已验证的那几个。
 */
STORY_ADD({

  scenes: {

    /* ===================== 月下湖 · 女神 ===================== */
    "c2_moon": {
      title: "第二章 · 月下湖", bg: "moon", music: "moon",
      script: [
        {"t":"intro", "chapter":"第二章", "title":"三 面 之 神", "book":"第二章 The Deities · 原书 p.9–19",
         "points":["湖上那个月亮，今晚不止一个","一对鹿从雾里走出来，别出声","七天：夜对月，晨对日","在家给两位神摆一张小桌"]},
        {"t":"narr","text":"满月过去三天了，月亮缺了个边。湖面很平，风停在岸上不动。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"今天不读书。你抬头看。"},
        {"t":"say","who":"player","name":"你","text":"看什么？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"看这湖怎么把那个月亮吞下去，又吐出来。"},
        {"t":"sfx","name":"magic"},
        {"t":"fx","kind":"visionOn"},
        {"t":"vision","text":"水面上那轮月亮忽然裂成三个。一个细，一个圆，一个只剩一道弯。"},
        {"t":"vision","text":"三道月光从水里升起来，落到你手上，凉的，像有人握了一下你的手。"},
        {"t":"vision","text":"你没有看清脸。你只记得三个影子：一个在跑，一个抱着东西，一个弯着腰在找什么。"},
        {"t":"fx","kind":"visionOff"},
        {"t":"narr","text":"水面又平了。刚才那三个影子，像是从来没出现过。"},
        {"t":"say","who":"player","name":"你","text":"我刚才……看见了三个。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"嗯。书里说她有三个面向。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"少女、母亲、老妪。月亮从瘦到圆、再瘦回去，就是她走的那一圈。"},
        {"t":"quote","text":"在威卡人所知的她，常有三重面向：少女、母亲、老妪，以渐盈、圆满、渐亏的月亮为象征。",
         "en":"As the Wicca know her, she is often of three aspects: the maiden, the mother, and the crone, symbolized in the waxing, full, and waning moon.","cite":"Chapter 2 · p.12"},
        {"t":"codex","ids":["c2_three"]},

        {"t":"explore","id":"c2_lake","prompt":"湖上和岸上都有东西。先看哪儿？","need":3,"exitLabel":"坐回岸上",
         "spots":[
           {"id":"moon","x":200,"y":10,"w":80,"h":80,"label":"月亮","script":[
             {"t":"narr","text":"月亮缺了一个边，缺口朝西。你把头歪了一下，缺口就跟着歪。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说她在月亮里，也在那种不出声却一直在动的大海里。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"初春那一层新绿，也算她的显现。"},
             {"t":"quote","text":"我们在月亮里看见她，在无声而永动的大海里看见她，也在初春的新绿里看见她。她是丰饶与爱的化身。",
              "en":"We see her in the moon, the soundless, ever-moving sea, and in the green growth of the first spring. She is the embodiment of fertility and love.","cite":"Chapter 2 · p.12"},
             {"t":"codex","ids":["c2_three"]}]},
           {"id":"cloud","x":150,"y":44,"w":86,"h":20,"label":"云缝","script":[
             {"t":"narr","text":"一条薄云斜着过去，把月亮擦了一下就散了。"},
             {"t":"narr","text":"散了以后，水面上的倒影比天上那个更亮一点。"},
             {"t":"think","text":"倒影比实物亮。这事有点怪。"}]},
           {"id":"water","x":76,"y":112,"w":150,"h":92,"label":"湖面","script":[
             {"t":"narr","text":"湖心有一圈很浅的涟漪，一圈一圈往外推，然后自己平掉。"},
             {"t":"narr","text":"你伸手进水，水比你想的暖。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"水记东西。石头也记，只是慢。"}]},
           {"id":"trees","x":300,"y":212,"w":170,"h":34,"label":"林线","script":[
             {"t":"narr","text":"对岸那排树在月光里是一道黑边，一根一根竖着。"},
             {"t":"think","text":"白天那些树我能叫出名字。现在叫不出来。"}]},
           {"id":"below","x":60,"y":8,"w":130,"h":90,"label":"岸边","script":[
             {"t":"narr","text":"你脚边的沙上有不少脚印，旧的叠着新的，最深的一串是你自己的。"},
             {"t":"narr","text":"再往边上看，有一串更小的，走了一半就往回折了。"},
             {"t":"think","text":"有人走到这儿，又回头了。"}]}
         ]},

        {"t":"narr","text":"你坐回岸上。风从湖那边过来，把刚才那三个影子又吹回来一点。"},
        {"t":"choice","prompt":"守灯人问：「刚才那三个，你想先记住哪一个？」","options":[
          {"text":"那个在跑的。","reply":"「少女。」她说，「她还没做什么事，所以她什么都敢。」","insight":1,"flags":["c2_maiden"]},
          {"text":"那个抱着东西的。","reply":"「母亲。」她把手里那把干草拢了拢，「她有的东西最多，也最放不下。」","insight":1,"flags":["c2_mother"]},
          {"text":"那个弯着腰在找东西的。","reply":"「老妪。」她顿了顿，「她找的不是东西，是人。」","insight":1,"flags":["c2_crone"]}]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"三个都是她。你今天多看了一个，不表示别的两个不在。"},
        {"t":"say","who":"player","name":"你","text":"那男神呢？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"明天早上。天不亮就来这儿。"},
        {"t":"scene","id":"c2_dawn"}
      ]
    },

    /* ===================== 破晓 · 鹿与男神 ===================== */
    "c2_dawn": {
      title: "第二章 · 破晓", bg: "stag", music: "dawn",
      script: [
        {"t":"narr","text":"天快亮的时候，湖上起了一层雾。雾不高，刚没到人的膝盖。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"站着。别出声。往那边看。"},
        {"t":"narr","text":"对岸的雾动了一下。先出来的是一个角，然后是一整头鹿。"},
        {"t":"narr","text":"它身后又跟出一头小的，腿很细，走两步停一步，鼻子一直在动。"},
        {"t":"think","text":"那头大的听见我们了。它没跑。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"角。男神就戴这个。不是帽子，是他自己长的东西。"},

        {"t":"explore","id":"c2_stag","prompt":"雾里能看清的东西不多。先看什么？","need":3,"exitLabel":"让它走",
         "spots":[
           {"id":"stag","x":186,"y":42,"w":146,"h":160,"label":"鹿","script":[
             {"t":"narr","text":"公鹿的那个角有六个分叉，一边比另一边多一个。"},
             {"t":"narr","text":"它把头低下来，在雾里喷了一口气，又抬起来。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，男神也是野生动物的守护者。牛不算，牛归女神。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"所以古时候的人把它当成一切生命的源头：是那股暖意让休眠的种子迸发生机。"},
             {"t":"codex","ids":["c2_wild"]}]},
           {"id":"dead","x":120,"y":90,"w":66,"h":80,"label":"枯树","script":[
             {"t":"narr","text":"一棵死树，皮全掉了，白色。夏天的时候它应该还活着。"},
             {"t":"narr","text":"树根那儿有一圈新长的草，比周围都绿。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"死的东西底下最容易长东西。这句话你记着，后面有用。"}]},
           {"id":"fog","x":20,"y":176,"w":200,"h":54,"label":"晨雾","script":[
             {"t":"narr","text":"雾贴着地面走，走到你脚边就散，散完又从后面接上来。"},
             {"t":"narr","text":"你把手伸进雾里，手背上一会儿就湿了一层。"}]},
           {"id":"sky","x":0,"y":0,"w":150,"h":78,"label":"东边天","script":[
             {"t":"narr","text":"东边的天已经红了一条，太阳还没出来，红得比昨天深。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"太阳就是男神的脸。它一出来，你就把注意力放到太阳上。"}]},
           {"id":"calf","x":330,"y":186,"w":80,"h":46,"label":"小鹿","script":[
             {"t":"narr","text":"小鹿贴着母鹿的侧腹，头一直往那边拱。"},
             {"t":"narr","text":"母鹿没动，只是把脖子往小鹿那边偏了一点。"},
             {"t":"think","text":"这也算男神的？看起来不太像。"}]}
         ]},

        {"t":"narr","text":"太阳从山脊上冒出来。公鹿转身，把两头鹿都带进雾里去了。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"刚才你看了半天。现在我给你一堆东西，你替我分一分。"},
        {"t":"say","who":"player","name":"你","text":"分给谁？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"分给女神，或者分给男神。别猜我，翻书。"},
        {"t":"trial","id":"t2_symbol"},

        {"t":"narr","text":"太阳升到树梢高。你手心里那点凉气全散了。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里开头先说了一件更大的事：这两位背后，还有一个说不出来的力量。"},
        {"t":"quote","text":"威卡承认一个不可知的、终极的神圣力量，整个宇宙从它而生。这个概念因为难以亲近，在威卡中几乎已经失落。",
         "en":"The Wicca acknowledge a supreme divine power, unknowable, ultimate, from which the entire universe sprang. The concept of this power, far beyond our comprehension, has nearly been lost in Wicca because of our difficulty in relating to it.","cite":"Chapter 2 · p.9"},
        {"t":"codex","ids":["c2_supreme"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"所以要有一个能说话、能看的脸。书里说，世上所有受过崇拜的神，都是这两位的面向。"},
        {"t":"quote","text":"这个星球上每一个受过崇拜的神，都存在于原型男神与原型女神之内。世上那些庞杂的神谱，只是这两位的不同面向。",
         "en":"Every deity that has received worship upon this planet exists with the archetypal God and Goddess. The complex pantheons of deities that arose in many parts of the world are simply aspects of the two.","cite":"Chapter 2 · p.9"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你也别以为这书把女神抬得比男神高。它专门讲了一句平衡。"},
        {"t":"quote","text":"只以女性能量为基础的宗教，和完全以男性为中心的宗教一样失衡、不自然。理想是两者完美的平衡。",
         "en":"Religion based entirely on feminine energy, however, is as unbalanced and unnatural as one totally masculine in focus. The ideal is a perfect balance of the two.","cite":"Chapter 2 · p.11"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"有些人只拜女神，那是冲着几百年父权宗教去的。作者说可以理解，但那也是一条腿。"},
        {"t":"codex","ids":["c2_twin"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"男神不是那种板着脸、什么都能管的神。书里专门说了他不是。"},
        {"t":"quote","text":"他既不是基督教与犹太教中那个严厉全能的神，也不只是女神的配偶。神与女神是平等的、一体的。",
         "en":"He is neither the stern, all-powerful deity of Christianity and Judaism, nor is he simply the consort of the Goddess. God or Goddess, they are equal, one.","cite":"Chapter 2 · p.13"},
        {"t":"codex","ids":["c2_god"]},
        {"t":"say","who":"player","name":"你","text":"那太阳上面到底是谁？名字叫什么？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里列了一长串：Diana、Pan、Isis、Hermes……他故意不用这些名字。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"有人用名字觉得亲近，有人不用名字觉得自在。两种都行。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里还提醒一件事：遇着事，别顺手就丢给女神。"},
        {"t":"quote","text":"这并不意味着出了问题就该把它交到女神手中。那是拖延手段，是在逃避人生路上的颠簸。",
         "en":"This doesn't mean that when problems occur we should leave them in the hands of the Goddess. This is a stalling maneuver, an avoidance of dealing with the bumps on the road of life.","cite":"Chapter 2 · p.13"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"请她帮你把脑子理清楚，然后你自己动手。这是书里的意思。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"天亮了。回去睡一觉——晚上还有事，连着做七天。"},
        {"t":"scene","id":"c2_study"}
      ]
    },

    /* ===================== 书桌前 · 七天 ===================== */
    "c2_study": {
      title: "第二章 · 七天", bg: "cottage", music: "cottage",
      script: [
        {"t":"narr","text":"下午，守灯人的小屋。桌上摊着一本书，桌上还有一只倒扣的杯子。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书上有一段，作者让人试七天。夜里看月亮，早上看太阳。"},
        {"t":"say","who":"player","name":"你","text":"七天？天天？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"天天。最好每天是同一个钟点。你做不到也不必撒谎。"},
        {"t":"narr","text":"她把书推过来，那一页上画着一个小人，手举着，头上是一轮满月。"},
        {"t":"quote","text":"夜里，面对月亮坐下或站定。若看不见月亮，就想象你见过的最圆满的月亮在漆黑中发出银白光，正在你正前上方。",
         "en":"At night, stand or sit facing the moon, if it is visible. If not, imagine the fullest moon you've ever seen glowing silver-white in the inky blackness, directly above and before you.","cite":"Chapter 2 · p.14"},
        {"t":"codex","ids":["c2_nightmoon"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"她还让人吟古名：Diana、Lucina、Selena。念作 Dee-AH-nah、Loo-CHEE-nah、Say-LEE-nah。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你要觉得别扭，就不用名字。书里说，敞开就行。"},
        {"t":"quote","text":"感受柔和的月光流到你的皮肤上，感到它触碰、混入你自己的能量，互相交融，形成新的图样。",
         "en":"Feel the soft lunar light streaming onto your skin. Sense it touching and mixing with your own energies, commingling and forming new patterns.","cite":"Chapter 2 · p.14"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"早上那一段，是起床以后，不管多晚，站到太阳跟前去。隔着窗也行。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里还许你偷个懒：不想观想，就只调谐那股从太阳上倾泻下来的能量。满天是云，它照样到你身上。"},
        {"t":"quote","text":"若你不想观想男神（因为观想可能带来限制），只需调谐于从太阳倾泻而下的能量。即使满天是云，男神的能量仍会抵达你。",
         "en":"If you don't wish to visualize the God (for visualization can impose limitations), simply attune to the energies pouring down from the sun. Even if clouds fill the sky, the God's energies will still reach you.","cite":"Chapter 2 · p.15"},
        {"t":"codex","ids":["c2_morning"]},
        {"t":"narr","text":"书页边上有一行小字，是别人写的：「这两个练习同时做。别分开。」"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你看明白没有——她不是一个人。她是一圈。你抬起头那一眼，只看见她站的那一格。"},
        {"t":"say","who":"player","name":"你","text":"那我看月亮缺着边的时候，她是在老的那一头？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你自己说。我说了你就不会记。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"我考你几道。答错了我不念你——你翻回前面那两页去。"},
        {"t":"trial","id":"t2_phases"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"嗯。月亮那一圈你算认下来了。现在说桌上那张图。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"先练三口气。吸进来，停一停，再放出去。放比吸长。"},
        {"t":"say","who":"player","name":"你","text":"又是坐着不动。上次也这样。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"上次你坐着，这次你手里得有两件事：一个往上的，一个往下的。"},
        {"t":"narr","text":"你把手放在膝上。屋里很静，只有窗纸在响。"},
        {"t":"trial","id":"t2_attune"},

        {"t":"narr","text":"七天的头一夜，你站在院子里。月亮缺着边，比湖上那晚高了不少。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"记住：这七天不是你求什么。是你在认路。"},
        {"t":"narr","text":"第二天晚上，云厚，月亮看不见。你按书里说的，自己把它想了出来。"},
        {"t":"narr","text":"第三天晚上，风把月亮吹得很亮。你站了大概十分钟，脚冻得发麻。"},
        {"t":"narr","text":"第四天到第六天，你开始分不清是你去看月亮，还是月亮顺手看了你一眼。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"第七天。今晚你想站多久？"},
        {"t":"choice","prompt":"第七夜。月亮很亮，你却有点站不住了。","options":[
          {"text":"站到脚实在麻了为止。","reply":"你一瘸一拐回屋。守灯人看了一眼你的鞋，什么也没说，把热水往你那边推了推。","insight":1,"flags":["c2_long"]},
          {"text":"站一会儿就走，明天还来。","reply":"「懂得收。」她说，「七天不是七天一次，是七天都要能来。」","rel":{"keeper":1},"flags":["c2_steady"]},
          {"text":"今晚不站了，坐着看。","reply":"你搬了个小凳子出来。月亮还是那个月亮。你这样也算数——书里没规定姿势。","flags":["c2_sit"]}]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"七天里，你记住的是哪一个晚上？"},
        {"t":"choice","prompt":"说实话。","options":[
          {"text":"看不见月亮、只能自己想的那个晚上。","reply":"「那晚最难，也最算数。」她把灯芯往下压了一点。","insight":1,"flags":["c2_imagine"]},
          {"text":"最后一天，我以为自己站不住了。","reply":"「身体先抗议，这种事常有。」她说，「你能站完，是你自己站完的。」","rel":{"keeper":1},"flags":["c2_endure"]},
          {"text":"其实我没记住哪一晚，都差不多。","reply":"「差不多就是好。」她说，「要天天有惊喜，人是受不了的。」","flags":["c2_plain"]}]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"七天后要不要继续，书里说随你。直到你跟这两位相处自在了为止。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"还有一句藏着的话，我念给你，你自己咂摸。"},
        {"t":"quote","text":"这是威卡的秘密之一——神居于内。",
         "en":"This is one of the secrets of Wicca--deity dwells within.","cite":"Chapter 2 · p.15"},
        {"t":"codex","ids":["c2_within"]},
        {"t":"say","who":"player","name":"你","text":"神居于内……那我一直在往外找？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"先往外找也没什么。人总得先看见，才信里面有。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"现在说你那间屋。我给你一张小桌——不是给你坐的，是给两位神站的。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"先别急着摆。你先看看这几样东西是什么，再动手。"},
        {"t":"scene","id":"c2_shrine"}
      ]
    },

    /* ===================== 小桌 · 第一座神龛 ===================== */
    "c2_shrine": {
      title: "第二章 · 小神龛", bg: "cottage", music: "cottage",
      script: [
        {"t":"narr","text":"你那间屋的墙角，摆上了一张从柴房翻出来的小桌。桌上还什么都没有。"},
        {"t":"narr","text":"守灯人把东西一样一样从布袋里拿出来，摆在旁边。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说得很少：一张小桌、两枝蜡烛、一个香炉、一个放供品的盘或碗。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"就这些。别的都是我们自己加的。"},

        {"t":"explore","id":"c2_objects","prompt":"布袋里的东西摊了一桌。先看哪样？","need":4,"exitLabel":"开始摆",
         "spots":[
           {"id":"candles","x":148,"y":28,"w":150,"h":46,"label":"两枝蜡烛","script":[
             {"t":"narr","text":"一枝绿的，一枝红的。绿的短一些，灯芯剪得很齐。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"绿的那枝给女神，红的给男神。这是书里最直接的一段。"},
             {"t":"narr","text":"她把两枝蜡烛往桌上一并，绿的那枝落在她左手边。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里写得很死：左边那枝代表女神，右边那枝代表男神。红烛给男神，绿烛给她。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"红和绿是跟生与死有关的老魔法色。不想用，就用黄或金替红，白或银替绿。"},
             {"t":"codex","ids":["c2_candlecolor"]}]},
           {"id":"censer","x":230,"y":90,"w":60,"h":40,"label":"香炉","script":[
             {"t":"narr","text":"一只粗陶小碗，里面垫着大半碗细沙。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"沙吸热。线香插进沙里，塔香搁在沙面上，都不会烧着桌子。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说它放在两枝蜡烛的前面、中间。"},
             {"t":"codex","ids":["c2_censer"]}]},
           {"id":"plate","x":196,"y":150,"w":80,"h":44,"label":"供盘","script":[
             {"t":"narr","text":"一个浅口的盘子，边上有一圈细小的裂纹，看得出用了很多年。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，供品可以是花、果子、谷物、种子、酒或者奶。今天你有什么就放什么。"},
             {"t":"narr","text":"你摸了一下口袋——里面是两个昨天摘的野果，皮已经有点皱了。"},
             {"t":"codex","ids":["c2_offering"]}]},
           {"id":"flower","x":80,"y":96,"w":60,"h":44,"label":"一把草","script":[
             {"t":"narr","text":"一把晒干的草，捆得很松，一碰就掉碎屑。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里还许你加别的：当季的花、水晶、化石、干草药，都算你自己的东西。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"加不加都行。桌上摆什么，最后是你在认这张桌子。"}]},
           {"id":"cloth","x":290,"y":140,"w":110,"h":54,"label":"桌布","script":[
             {"t":"narr","text":"桌布是旧的，洗得发白，四个角有一角被磨破了。"},
             {"t":"narr","text":"守灯人把它铺平，用手从中间往外推了两下，把褶子推掉。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"摆东西本身也是仪式的一部分。别糊弄这一下。"}]}
         ]},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"好了。你现在把四样摆上去：绿烛、红烛、香炉、供盘。"},
        {"t":"say","who":"player","name":"你","text":"我怎么知道哪个放哪儿？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你都看过了。顺序和位置，书里写得很死——你自己想。"},
        {"t":"trial","id":"t2_shrine"},

        {"t":"narr","text":"四样东西落在桌上的位置，跟书里那张图对上了。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"现在点烛。点香。手里拿着供品站着。"},
        {"t":"narr","text":"火柴擦了两下才着。绿烛先亮，红烛跟上，香头上那点红慢慢烧成一个圈。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"把果子放进盘里，说几句话。想说什么就说什么，不用押韵。"},
        {"t":"quote","text":"月之女士，躁动之海与青翠大地之主，／太阳与野生生灵之主，／请接受我为敬奉你们而放在此处的供品。／赐我智慧，得见你们临在于整个自然之中，／伟大者啊！",
         "en":"Lady of the moon, of the restless sea and verdant earth, / lord of the sun and of the wild creatures, / accept this offering I place here in your honor. / Grant me the wisdom to see your presence in all nature, / O Great Ones!","cite":"Chapter 2 · p.16"},
        {"t":"codex","ids":["c2_prayer"]},
        {"t":"narr","text":"你站着没动，站了几分钟。桌上的火苗一直在动，你的影子也跟着动。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"静一会儿。想他们，也想你跟他们之间那点刚长出来的关系。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，感受他们在你之内、也在你周围。说不出来就别说。"},
        {"t":"narr","text":"守灯人伸手把两枝烛火按灭了，用手指，没用嘴吹。香她没动，让它自己烧。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说：火要熄，香不用管——让它自己烧完，你就去过你的白天和夜晚。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"桌上那两颗果子，明天早上之前得回到土里去。"},
        {"t":"say","who":"player","name":"你","text":"为什么？放着不好看吗？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说：每天结束、或者你带新的来的时候，把供品还给大地。"},
        {"t":"codex","ids":["c2_return"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"还有一句你今晚用得上：这件事不必要天天做，但稳定的节奏有好处。"},
        {"t":"shard","id":"moon3"},

        {"t":"bg","name":"forest"},
        {"t":"narr","text":"你拿着那两颗果子出了门。屋后有一小块松土，是夏天种过东西的地方。"},
        {"t":"narr","text":"你蹲下去，用手指抠开一个坑，把果子放进去，再把土盖回来，按了两下。"},
        {"t":"think","text":"明天它就找不着了。这大概就是她说的「把东西还给谁」。"},
        {"t":"sfx","name":"step"},
        {"t":"narr","text":"身后有脚步声，很轻，但是踩断了一根小枝。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"……你在埋什么？"},
        {"t":"think","text":"老陈的侄女。十七岁，跑得比谁都快，嘴也比谁都快。"},
        {"t":"say","who":"player","name":"你","text":"两个果子。拜神用的，用完了。埋回去。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"拜神？你们家什么时候拜神了。"},
        {"t":"narr","text":"她蹲下来，看那个坑，眼睛亮得很，一点也不害怕。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"你会魔法吗？"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"——你教我呗。"},
        {"t":"think","text":"她说这话的时候，像在问能不能借我的自行车。"},
        {"t":"choice","prompt":"阿禾蹲在你面前，等着你回答。","options":[
          {"text":"「我不会。我也才刚开始。」","reply":"「那你开始的时候怎么弄的？」她追问，「你告诉我第一步。」","rel":{"he":1},"flags":["c2_he_honest"]},
          {"text":"「教不了。这不是能教的东西。」","reply":"她「哦」了一声，站起来拍了拍裤子，明显不信。","flags":["c2_he_refuse"]},
          {"text":"「你先把这坑填上，我就告诉你。」","reply":"她伸手就抓土，指甲缝里立刻塞满了泥。她填得比你还平。","rel":{"he":1},"flags":["c2_he_dig"]}]},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我明天还来找你。你要是不在，我就去问你那个老师。"},
        {"t":"narr","text":"她跑回家去了。跑之前还回头看了一眼那块被她拍平的新土。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"听见了。"},
        {"t":"think","text":"她什么时候站在那儿的？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"别急着答应她什么。她要是明天来，你带她来找我。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书在你包里。第三章讲魔法——她会比你有兴趣得多。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"记住那张桌子：左绿右红，香在中间，供盘在前。别的都可以改，这一条随你。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里原话是：这套仪式对你太正式，就改掉，或者自己写一套。照你的方式来，不是照我的。"},
        {"t":"codex","ids":["c2_yourway"]},
        {"t":"shard","id":"antler"},
        {"t":"journal","id":"j_c2","title":"第二章 · 本章笔记","lines":[
          "满月过去三天，湖上那个月亮裂成了三个：细的、圆的、一道弯的。守灯人说那是少女、母亲、老妪。",
          "书里说她在月亮里、在无声而永动的大海里、在初春的新绿里。她是丰饶与爱的化身。",
          "破晓时湖上起了雾，一头公鹿带着小鹿走出来。角是男神的记号；书里说公牛、蛇、鱼、鹿、狼、鹰这些也都是他的。",
          "男神不是严厉全能的神，也不只是女神的配偶。他戴角，也是野生动物的守护者；家畜却归女神。",
          "我做完了七天的调谐：夜里对着月亮、早上对着太阳。看不见月亮的那晚，我按书里说的自己把它想了出来。",
          {"when":"c2_imagine","text":"七天里最算数的是看不见月亮那一晚——只能自己把它想出来。"},
          {"when":"c2_steady","text":"第七夜我站一会儿就回屋了。守灯人说懂得收也算一种稳。"},
          "我在家摆了第一座小神龛：左绿烛、右红烛，香炉在中间，供盘最前。红与绿是跟生与死有关的老魔法色。",
          "供品第二天要还回大地。这个道理我懂了一半：东西不是给出去的，是借放一下。",
          {"when":"c2_he_honest","text":"阿禾看见我埋供品，问我会不会魔法。我说我不会——我也才刚开始。"},
          {"when":"c2_he_dig","text":"阿禾帮我一起把那两颗果子埋了。她填土比我填得还平。"},
          "她说明天还来。守灯人说别急着答应她什么，她来了就带她去找她。第三章讲魔法，得先弄明白魔法到底是什么。"
        ]},
        {"t":"bgm","name":"forest"},
        {"t":"fx","kind":"flash"},
        {"t":"finishChapter","id":"c2"},
        {"t":"chapter","title":"第三章","sub":"三 条 河","en":"MAGIC"},
        {"t":"scene","id":"c3_study"}
      ]
    }
  },

  /* ===================== 图鉴 ===================== */
  codex: {
    "c2_supreme": {
      cat: "第二章", title: "至高力量", en: "a supreme divine power",
      text: "威卡承认一个不可知、至高的神圣力量，整个宇宙由它而生。因为它难以亲近，这个概念在威卡里几乎失落了。",
      src: "p.9"
    },
    "c2_twin": {
      cat: "第二章", title: "双生与平衡", en: "equal, complementary",
      text: "女神与男神平等、互补，谁都不更高。纯女性或纯男性能量的宗教，书里说都一样失衡。",
      src: "p.11"
    },
    "c2_three": {
      cat: "第二章", title: "三相", en: "maiden, mother, crone",
      text: "女神常有三重面向：少女、母亲、老妪，以渐盈、圆满、渐亏的月亮为象征。她同时是未耕的田、满的收成、霜覆的休眠大地。",
      src: "p.12"
    },
    "c2_god": {
      cat: "第二章", title: "有角者", en: "the horned God",
      text: "男神既不是严厉全能的神，也不只是女神的配偶。他戴角，是野生动物的守护者；捕猎归他，驯养家畜归女神。",
      src: "p.13"
    },
    "c2_wild": {
      cat: "第二章", title: "野生与家养", en: "tender of the wild animals",
      text: "书里把狩猎一类的事划给男神，把驯养动物划给女神。所以牛是她的，林子里那头鹿是他的。",
      src: "p.13"
    },
    "c2_nightmoon": {
      cat: "第二章", title: "夜对月", en: "facing the moon",
      text: "调谐练习的第一步：夜里面对月亮坐下或站定；看不见月亮，就想象最圆满的月亮在漆黑中发出银白光。每晚同一时间，连做一周。",
      src: "p.14"
    },
    "c2_morning": {
      cat: "第二章", title: "晨对日", en: "attune with the God",
      text: "练习的另一半：起床后不管多晚，站到太阳前吸收它的能量，想着男神。可与夜对月同期进行。",
      src: "p.14-15"
    },
    "c2_within": {
      cat: "第二章", title: "神居于内", en: "deity dwells within",
      text: "作者称这是威卡的秘密之一：他们一直在我们之内、在我们周围，我们只需要向这份觉知敞开。",
      src: "p.15"
    },
    "c2_candlecolor": {
      cat: "第二章", title: "左绿右红", en: "left the Goddess, right the God",
      text: "神龛后排两枝蜡烛：左边代表女神，右边代表男神。红烛给男神、绿烛给女神；红与绿是跟生与死有关的老魔法色。",
      src: "p.16"
    },
    "c2_censer": {
      cat: "第二章", title: "香炉", en: "the censer",
      text: "放在两枝蜡烛之前、之间。任何碗或杯装半满的沙或盐即可，沙盐吸热；线香插进沙里，塔香搁在表面。",
      src: "p.16"
    },
    "c2_offering": {
      cat: "第二章", title: "供品", en: "offerings",
      text: "供盘放在香炉前面。供品可以是花、水果、谷物、种子、酒或奶——手上有什么就用什么。",
      src: "p.16"
    },
    "c2_prayer": {
      cat: "第二章", title: "供品祷词", en: "accept this offering",
      text: "书里给的一段话：月之女士、太阳与野生生灵之主，请接受这份供品，并赐我智慧，得见你们临在于整个自然之中。",
      src: "p.16"
    },
    "c2_return": {
      cat: "第二章", title: "还给大地", en: "return them to the earth",
      text: "每天结束时，或带来新供品时，把留在神龛上的供品归还大地。供品不是丢掉的，是交还的。",
      src: "p.17"
    },
    "c2_yourway": {
      cat: "第二章", title: "照你的方式来", en: "do it your way, not my way",
      text: "这套仪式太正式就改掉，或者自己写一套。作者说这是全书的根本主张：别踩着别人留在沙上的脚印走。",
      src: "p.17"
    }
  },

  /* ===================== 试炼 ===================== */
  trials: {
    "t2_symbol": {
      kind: "match", title: "第二章 · 试炼 · 谁的记号", src: "Chapter 2 · p.12-13",
      explain: "书里给女神和男神各列了一串象征物与圣兽。分清了，往后看到一件东西你就知道它在指谁。",
      pairs: [
        {"left": "大釜", "right": "女神的象征物", "note": "还有杯、双刃斧、五瓣花、镜子、项链、贝壳、珍珠、银、祖母绿。"},
        {"left": "剑与角", "right": "男神的象征物", "note": "还有矛、蜡烛、金、黄铜、钻石、镰刀、箭、魔杖、三叉戟、刀。"},
        {"left": "猫头鹰与蜜蜂", "right": "女神的神兽", "note": "兔、熊、猫、狗、蝙蝠、鹅、母牛、海豚、狮、马、鹪鹩、蝎、蜘蛛。"},
        {"left": "公牛与雄鹿", "right": "男神的神兽", "note": "狗、蛇、鱼、龙、狼、野猪、鹰、隼、鲨、蜥蜴。"},
        {"left": "狩猎与野生动物", "right": "归男神掌管", "note": "书里说驯养动物则归女神。"},
        {"left": "驯养动物", "right": "归女神掌管", "note": "所以老陈的牛算是她这边的。"}
      ]
    },
    "t2_phases": {
      kind: "quiz", title: "第二章 · 试炼 · 她的三张脸", src: "Chapter 2 · p.12",
      explain: "月亮的盈亏就是她走的那一圈。这一圈记牢，第七章的满月仪式你会看得更清楚。",
      questions: [
        {"q": "书里说女神常有三重面向，是哪三个？",
         "options": ["少女、母亲、老妪", "春、夏、冬", "天空、大地、海", "过去、现在、将来"],
         "answer": 0, "explain": "「少女、母亲、老妪，以渐盈、圆满、渐亏的月亮为象征。」", "src": "p.12"},
        {"q": "渐盈（越来越圆）的月亮，对应哪一个面向？",
         "options": ["少女", "母亲", "老妪", "书里没分"],
         "answer": 0, "explain": "渐盈配少女，圆满配母亲，渐亏配老妪——游戏里那颗月亮就是这么分的。", "src": "p.12"},
        {"q": "「她赐予生命，同时附带死亡的承诺。」书里说那死亡是什么？",
         "options": ["黑暗与湮灭", "两次转世之间的休息", "惩罚", "永远不再回来"],
         "answer": 1, "explain": "原文：这不是黑暗与湮灭，而是从肉身存在劳苦中的休息——两世之间的那一段。", "src": "p.12"},
        {"q": "关于月亮，她还说过一句什么话？",
         "options": ["月亮是男神的脸", "她没有特别的显现", "她在月亮里，也在无声而永动的大海里", "月亮是她的囚牢"],
         "answer": 2, "explain": "「我们看见她在月亮里，在无声而永动的大海里，在初春的新绿里。」", "src": "p.12"}
      ]
    },
    "t2_attune": {
      kind: "rhythm", title: "第二章 · 试炼 · 呼吸与敲", src: "Chapter 2 · p.14-15",
      explain: "书上让人每天对着月亮和太阳停一会儿。这里用一段很慢的拍子代替：慢、稳、不追。",
      caption: "跟着极慢的拍子敲（空格 / 鼠标）",
      speed: 95, lead: 1.4,
      notes: [0, 900, 1800, 2700, 3600, 4500, 5400, 6300, 7200, 8100]
    },
    "t2_shrine": {
      kind: "arrange", title: "第二章 · 试炼 · 摆第一座神龛", src: "Chapter 2 · p.15-16",
      caption: "把四样东西摆到书里那张图的位置上：左绿烛、右红烛、香炉居中，供盘在前。",
      explain: "后排两枝蜡烛：左女神、右男神；香炉在两烛之前、之间；供盘放在香炉前面。摆完这一桌，位置你就记住了。",
      items: [
        {"id": "goddess", "icon": "candle", "label": "绿烛", "why": "左边的蜡烛代表女神；绿烛敬奉女神。", "src": "p.16"},
        {"id": "god", "icon": "candle", "label": "红烛", "why": "右边的蜡烛代表男神；红烛献给男神。", "src": "p.16"},
        {"id": "censer", "icon": "censer", "label": "香炉", "why": "放在两烛之前、之间。", "src": "p.16"},
        {"id": "plate", "icon": "chalice", "label": "供盘", "why": "在香炉前面，放花、果、谷物、种子、酒或奶。", "src": "p.16"}
      ],
      slots: [
        {"x": 165, "y": 100, "label": "左·女神", "item": "goddess"},
        {"x": 315, "y": 100, "label": "右·男神", "item": "god"},
        {"x": 240, "y": 128, "label": "中·香炉", "item": "censer"},
        {"x": 240, "y": 180, "label": "前·供盘", "item": "plate"}
      ]
    }
  },

  /* ===================== 符印与成就 ===================== */
  sigils: {
    "moon3": {"name": "三月", "icon": "moon", "desc": "湖上裂成三个的月亮：少女、母亲、老妪，都在她身上。", "src": "第二章 · p.12"},
    "antler": {"name": "鹿角", "icon": "horn", "desc": "破晓雾里公鹿的角。男神戴它，不是帽子，是他自己长的。", "src": "第二章 · p.13"}
  },

  achv: {
    "c2_sevenday": {"name": "七个晚上", "desc": "做完一周夜对月、晨对日的调谐练习"},
    "c2_shrine": {"name": "第一张神桌", "desc": "在家摆起自己的第一座小神龛"}
  }
});
