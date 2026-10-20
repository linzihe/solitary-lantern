/* 第七章 · 圈与祭坛（The Magic Circle and the Altar）
 * 作者 D。资料：notes_ch5_7.md 第七章（印刷页 p.57–63）+ notes_ch8_10.md §1.4 满月仪式（p.134–136、p.161）。
 * 一条线：在石圈里画圈、摆祭坛、挡掉一个卖铜圈的人，然后在冬至前夕的满月下把第一次满月仪式做完。
 * 出口：c8_wheel（第八章 · 冬至）。读第六章的 c6_invite_he / c6_invite_chen / c6_alone。
 */
STORY_ADD({

  scenes: {

    /* ===================== 石圈 · 画圈 ===================== */
    "c7_circle": {
      title: "第七章 · 圈与祭坛", bg: "wheel", music: "wheel",
      script: [
        {"t":"intro","chapter":"第七章","title":"圈 与 祭 坛","book":"第七章 The Magic Circle and the Altar · 原书 p.57–63",
         "points":["圈不是地上的一条线，是个球","四方各放什么，书里有说法","今天有人上山来卖铜圈","今晚满月，你要自己做完一次"]},

        {"t":"narr","text":"坡上的石圈从高处看下去，像一只摊开的手。守灯人把一卷旧麻绳丢在你脚边。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"今天先不翻书。你把这一圈画出来。"},
        {"t":"say","who":"player","name":"你","text":"用这根麻绳？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"绳子、粉笔、松枝、石头，书里列了一串。你自己挑。"},
        {"t":"narr","text":"她退到圈子外面，抱着胳膊站着，看上去不打算帮你。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"先看地上有什么。别急着放绳子。"},

        {"t":"explore","id":"c7_ground","prompt":"石圈里有几块石头。先看哪一块？","need":4,"exitLabel":"开始画圈",
         "spots":[
           {"id":"n","x":225,"y":50,"w":35,"h":50,"label":"北石","script":[
             {"t":"narr","text":"北边这块石头最高，顶上有一道水痕，是雪化下去留下的。"},
             {"t":"narr","text":"它朝北的那面长着青苔，摸上去是湿的，像刚被人擦过。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"北边是土。别急着记，先用手认一遍。"}]},
           {"id":"e","x":300,"y":110,"w":40,"h":50,"label":"东石","script":[
             {"t":"narr","text":"东边的石头矮一些，被风磨得发亮，缝里卡着几根干草。"},
             {"t":"narr","text":"风从这头进来，绕着石头打了一个转，又往坡下去。"},
             {"t":"think","text":"这里的东西都是动的。"}]},
           {"id":"s","x":225,"y":185,"w":35,"h":50,"label":"南石","script":[
             {"t":"narr","text":"南边的石头晒得最暖，中间凹下去一块，像放过什么烫的东西。"},
             {"t":"narr","text":"你把手掌按上去，掌心立刻出了一层汗。"}]},
           {"id":"w","x":145,"y":110,"w":40,"h":50,"label":"西石","script":[
             {"t":"narr","text":"西边的石头底下积着一小汪水，水面浮着两片叶子。"},
             {"t":"narr","text":"你蹲下去，看见自己在水里，脸是圆的。"}]},
           {"id":"mid","x":215,"y":120,"w":50,"h":40,"label":"中心","script":[
             {"t":"narr","text":"圈子中间是一小块被踩平的土，草长得比别处矮。"},
             {"t":"narr","text":"土上有一个旧的圆印子，边缘很淡，不知道是多少年前的。"},
             {"t":"think","text":"有人在这里站过很久。"}]}
         ]},

        {"t":"narr","text":"你顺着石头走了一圈，把绳子在地上绕开。圈有点扁，接口处压着一块小石头。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你刚才量的是什么？"},
        {"t":"say","who":"player","name":"你","text":"……圈。可它好像不是躺在地上的一条线。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"说下去。"},
        {"t":"think","text":"我摸到的是边。边上还有东西，一直盖到我头顶。"},
        {"t":"narr","text":"你把手举过头顶，又慢慢放下来，像要把看不见的东西按回地里。"},
        {"t":"quote","text":"完成时，圈是一个包围整个工作区域的能量球体。「圆圈」一词其实是误称；实际造出来的是一个能量球体。",
         "en":"When completed, the circle is a sphere of energy that encompasses the entire working area. The word “circle” is a misnomer; a sphere of energy is actually created.",
         "cite":"Chapter 7 · p.59"},
        {"t":"codex","ids":["c7_sphere"]},
        {"t":"quote","text":"圈、魔法圈或球体，是一座界限分明却非物质的神殿。今天多数威卡仪式与魔法工作，都在这类由个人力量构成的构造里进行。",
         "en":"The circle, magic circle, or sphere is a well-defined though nonphysical temple. In much of Wicca today, rituals and magical workings take place within such a construction of personal power.",
         "cite":"Chapter 7 · p.57"},
        {"t":"codex","ids":["c7_circle"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"还有一件事。圈有两种。书上先讲的那一种，不是我们的。"},
        {"t":"quote","text":"仪式魔法师的圈，保护他不被自己召来的力量伤到；威卡的圈，是一个人与女神和男神相会的神圣空间。",
         "en":"Those used by ceremonial magicians of yesterday (and today) are designed to protect the magician from the forces which he or she raises. In Wicca, the circle is used to create a sacred space in which humans meet with the Goddess and God.",
         "cite":"Chapter 7 · p.57"},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"现在说尺寸。你打算画多大？"},
        {"t":"choice","prompt":"手里的绳子还剩下小半卷。这个圈画多大？","options":[
          {"text":"「就照我一步能跨过去的画。」","reply":"你重新绕了一圈，用脚踩住接头。","flags":["c7_fit"],"rel":{"keeper":1}},
          {"text":"「书里说九尺。我去找尺子量。」","reply":"你量了半天，绳子短了一截，接头处打了一个很丑的结。","flags":["c7_nine"]},
          {"text":"「越大越好，省得以后改。」","reply":"你把绳子放到最长，圈大得能站下三个人。","flags":["c7_big"]}
        ]},
        {"t":"quote","text":"圈的直径通常是九英尺，不过任何舒适的尺寸都可以。",
         "en":"The circle is usually nine feet in diameter, though any comfortable size is fine.",
         "cite":"Chapter 7 · p.60"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"脚注里写着，九是女神之数。可后头那半句才是要紧的。"},
        {"t":"codex","ids":["c7_nine"]},
        {"t":"say","when":"c7_fit","who":"keeper","name":"守灯人","por":"keeper","text":"量自己的身子，比量别人的书准。"},
        {"t":"narr","when":"c7_big","text":"圈大到边上的石头都跑到外头去了。守灯人看了一眼，什么也没说。"},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"圈边上四个方向，一个方向放一样东西。你知道是哪四样？"},
        {"t":"say","who":"player","name":"你","text":"北边是土，这个我猜到了。别的不敢说。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"那就摆。摆错了我不拦你。"},
        {"t":"trial","id":"t7_quart"},
        {"t":"codex","ids":["c7_quart"]},
        {"t":"narr","text":"你按自己记得的样子，把四样东西一件一件放下，退回去看了半天。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"花和绳子只是边。真正立起来的那一层，你看不见，可它会挡风。"},
        {"t":"think","text":"书里说，圈代表女神、自然的灵性面，也代表大地本身。"},

        {"t":"narr","text":"坡下有人喊了一声。一个挑担子的人从村口那条路上来，走得很稳。"},
        {"t":"sfx","name":"step"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"远远看见坡上有人，我就上来了。小姑娘，今天办大事？"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"我这儿有一套铜圈。标准九尺，老样式，接缝对北。"},
        {"t":"narr","text":"他放下担子，解开一层油布。里面卷着几根发暗的铜条，边角磨得发亮。"},
        {"t":"sfx","name":"spark"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"麻绳挡不住东西。差一寸，神就不来。这话你别不信。"},
        {"t":"think","text":"守灯人一个字都没说，只用脚尖把绳子往我这边推了推。"},
        {"t":"trial","id":"t7_bai"},
        {"t":"narr","text":"白先生把油布重新盖上，动作没停，脸上也没恼。"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"书上写的是一回事，真做起来是另一回事。你以后慢慢就懂了。"},
        {"t":"choice","prompt":"铜圈摊在你面前，油布上还压着别的货。","options":[
          {"text":"「我先不买。谢谢你跑一趟。」","reply":"他把油布角压好，说下个集还来。","flags":["c7_refused"],"rel":{"bai":1}},
          {"text":"「多少钱？我先看看。」","reply":"他报了个价，又自己往下压了两成。你把手缩回袖子里。","flags":["c7_browsed"],"rel":{"bai":1}},
          {"text":"「你这圈，跟书里说的不一样。」","reply":"他笑了一声：书是书，生意是生意。","flags":["c7_argued"],"rel":{"bai":-1},"insight":1}
        ]},
        {"t":"sfx","name":"step"},
        {"t":"narr","text":"他挑担下坡，铜条一路叮当，拐进林子就听不见了。"},
        {"t":"say","when":"c7_refused","who":"keeper","name":"守灯人","por":"keeper","text":"他卖他的。这一行里，嘴比货值钱。"},
        {"t":"say","when":"c7_argued","who":"keeper","name":"守灯人","por":"keeper","text":"你跟他讲书，他心里在算别的账。下次别费口舌。"},
        {"t":"say","when":"c7_browsed","who":"keeper","name":"守灯人","por":"keeper","text":"看过价，你就知道铜和神不是一回事。"},

        {"t":"quote","text":"可以使用工具，但要记住：它们是配件，不是必需品。如果你觉得它们会惹麻烦，就把它们留在家里。",
         "en":"Tools can be used, but remember that they're accessories, not necessities. Leave them at home if you feel that they'll become problems.",
         "cite":"Chapter 7 · p.58"},
        {"t":"codex","ids":["c7_outdoor"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"坡下有村子。晚上点蜡烛别点成一排，火小一点，人散开。"},
        {"t":"say","who":"player","name":"你","text":"那还怎么在户外做？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里有个老头，在夏威夷海边做过一次。你自己看那一页。"},
        {"t":"quote","text":"我没发表长篇讲话，也没在空中挥舞工具。然而神灵就在那里，就在四周。",
         "en":"I used no lengthy speeches and brandished no tools in the air. Still, the deities were there, all around…",
         "cite":"Chapter 7 · p.58"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"天要黑了。回屋里去，先把祭坛摆一遍给我看。"},
        {"t":"scene","id":"c7_altar"}
      ]
    },

    /* ===================== 屋里 · 摆祭坛 ===================== */
    "c7_altar": {
      title: "第七章 · 祭坛", bg: "altar", music: "cottage",
      script: [
        {"t":"narr","text":"屋里的灯芯剪得很短，火只有豆子那么大。桌上摊着一块旧布，工具一件一件摆开。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"今晚满月。你先把祭坛摆对，再搬上去。"},
        {"t":"say","who":"player","name":"你","text":"祭坛摆在哪儿？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"圈的中心。一般是面朝北。为什么是北，你刚才摸过了。"},
        {"t":"think","text":"北是力量之方。土。大地是我们的家。"},

        {"t":"explore","id":"c7_table","prompt":"桌上摊着好几样工具。先看哪一件？","need":4,"exitLabel":"开始摆",
         "spots":[
           {"id":"candle","x":170,"y":70,"w":25,"h":90,"label":"白蜡烛","script":[
             {"t":"narr","text":"蜡烛是新买的，烛芯上还留着剪过的斜口。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"满月用白的。绿的和银的也归女神那一边。"}]},
           {"id":"bowl","x":80,"y":140,"w":75,"h":45,"label":"水碗","script":[
             {"t":"narr","text":"碗是粗陶的，装了大半碗井水，端起来扎手。"},
             {"t":"narr","text":"水底沉着指甲盖大的一小块银子，是守灯人从旧耳坠上拆下来的。"},
             {"t":"think","text":"她说满月的水要看月亮。"}]},
           {"id":"salt","x":130,"y":175,"w":55,"h":30,"label":"盐碟","script":[
             {"t":"narr","text":"小碟里是粗盐，堆成一个小小的圆堆，上面按了一个指印。"},
             {"t":"narr","text":"碟底是湿的，盐把陶面咬出过一圈白痕。"}]},
           {"id":"censer","x":230,"y":30,"w":50,"h":130,"label":"香炉","script":[
             {"t":"narr","text":"香是去年秋天自己晒的艾草，烟细得像一根线。"},
             {"t":"narr","text":"烟从炉口出来，不往窗那边走，先往桌子中间聚。"},
             {"t":"think","text":"屋里没有风。烟是自己拐弯的。"}]},
           {"id":"cup","x":295,"y":85,"w":60,"h":75,"label":"银杯","script":[
             {"t":"narr","text":"杯子是银的，擦得很亮，杯口有一处小的磕痕。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"这一半桌子是女神的。杯子、五角星盘、铃、水晶、大釜。"}]},
           {"id":"knife","x":195,"y":165,"w":100,"h":45,"label":"刀","script":[
             {"t":"narr","text":"两把刀并排躺着：黑柄那把刃是钝的，白柄那把刃口薄。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"黑柄的叫 athame，引导力气用。白柄的只切草药。别弄混。"}]}
         ]},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"现在说祭坛。你觉得它是干什么用的？"},
        {"t":"say","who":"player","name":"你","text":"神住的地方？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说得很干脆。你自己读这一句。"},
        {"t":"quote","text":"威卡信徒不相信女神和男神居住在祭坛本身之中。它是力量与魔法之所，但并非神圣不可侵犯。",
         "en":"The Wicca don't believe that the Goddess and God inhabit the altar itself. It is a place of power and magic, but it isn't sacrosanct.",
         "cite":"Chapter 7 · p.61"},
        {"t":"codex","ids":["c7_altar"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"木头最好，橡木或者柳木。没桌子的，纸箱、两块砖加一块板也算。"},
        {"t":"narr","text":"她敲了敲桌角。这张桌子是自己拼的，一条腿短一截，底下垫着折起来的纸。"},
        {"t":"say","who":"player","name":"你","text":"这桌子……是歪的。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"歪的也一样用。书里那句话怎么说的？所用的工具，是心的力量。"},
        {"t":"narr","text":"她说着，把垫桌角的那张纸抽出来又重新折了一道，桌面正了一点。"},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"左边归女神，右边归男神，中间那块地方归两个人。你摆。"},
        {"t":"trial","id":"t7_altar"},
        {"t":"codex","ids":["c7_side","c7_mid"]},
        {"t":"narr","text":"刀放得离杯子太近，你把它挪开了一点，像怕它碰到什么。"},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"还差一样。今晚要划火柴。你打算把用过的扔哪儿？"},
        {"t":"choice","prompt":"手里捏着三根还热着的火柴。","options":[
          {"text":"「找个碗，专门装它们。」","reply":"你在桌角放了一只小陶碗，把三根一起撂了进去。","flags":["c7_bowl"],"rel":{"keeper":1}},
          {"text":"「扔大釜里，省事。」","reply":"守灯人伸手按住釜沿，你这才想起书里那句话。","flags":["c7_kettle"]},
          {"text":"「揣兜里，回头再说。」","reply":"你把火柴塞进外套口袋。口袋底已经有一小堆灰了。","flags":["c7_pocket"]}
        ]},
        {"t":"quote","text":"永远别忘了把火柴放在手边，再备一个小碗装用过的火柴（把它们扔进香炉或大锅里是不礼貌的）。",
         "en":"Never forget to have matches handy, and a small bowl to hold the used ones (it's impolite to throw them into the censer or cauldron).",
         "cite":"Chapter 7 · p.62"},
        {"t":"codex","ids":["c7_match"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"这不叫讲究。这是你去别人家做客时的规矩。"},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"圈画在土上，得让人看得见。今晚这一圈，你用什么标出来？"},
        {"t":"say","who":"player","name":"你","text":"绳子。可院子里还有别的。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里列了一串。哪一样用在什么时候，你自己掂量。"},
        {"t":"trial","id":"t7_mark"},
        {"t":"codex","ids":["c7_mark"]},
        {"t":"quote","text":"使用能激发你想象力、并与仪式相契合的物品。",
         "en":"Use objects that spark your imagination and are in tune with the ritual.",
         "cite":"Chapter 7 · p.59"},

        {"t":"narr","text":"你把五角星盘和女神像摆到左边。画像很旧，鼻子那块颜色掉了。"},
        {"t":"say","who":"player","name":"你","text":"这算不算……在拜它？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你说呢。石头就是石头。可你怎么看它，是你的事。"},
        {"t":"quote","text":"我们不崇拜树、鸟或石头。我们只是乐于把它们看作宇宙创造力量——女神与男神——的显现。",
         "en":"We don't worship trees or birds or stones. We simply delight in seeing them as manifestations of the universal creative forces—the Goddess and God.",
         "cite":"Chapter 7 · p.62"},
        {"t":"codex","ids":["c7_idol"]},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"白先生走之前说的那几句，你还记得几成？"},
        {"t":"say","who":"player","name":"你","text":"记得。可我分不清哪句是书里的。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"那你就把「圈不是什么」挑出来。"},
        {"t":"trial","id":"t7_not"},

        {"t":"narr","text":"筐底还空着一角。今晚来不来人，你其实没把握。"},
        {"t":"narr","when":"c6_invite_he","text":"门被敲了两下。阿禾站在门口，靴子上全是泥，手里拎着一个布包。"},
        {"t":"say","when":"c6_invite_he","who":"he","name":"阿禾","por":"he","text":"我来了。你说过满月那晚我可以来的。"},
        {"t":"say","when":"c6_invite_he","who":"he","name":"阿禾","por":"he","text":"我带了东西。不是手链，是吃的。"},
        {"t":"narr","when":"c6_invite_he","text":"她解开布包。里面是几个歪歪扭扭的月牙形小饼，边上还沾着干面。"},
        {"t":"choice","when":"c6_invite_he","prompt":"今晚这个圈，让阿禾站在哪儿？","options":[
          {"text":"「你跟我进来，站我旁边。」","reply":"她跨过绳子的时候特意抬高了脚，像怕踩断什么。","flags":["c7_invited_he","c7_he_inside"],"rel":{"he":1}},
          {"text":"「你在圈外看着，别出声。」","reply":"她退后两步，把布包抱在怀里，比刚才安静。","flags":["c7_invited_he","c7_he_outside"]},
          {"text":"「今晚人少点好。你先回去。」","reply":"她愣了一下，把布包放在门槛上就走了。饼还是热的。","flags":["c7_he_sent"]}
        ]},

        {"t":"narr","when":"c6_invite_chen","text":"坡下飘上来一点烟味。老陈站在最下面那块石头旁边，手里提着马灯。"},
        {"t":"say","when":"c6_invite_chen","who":"chen","name":"老陈","por":"skeptic","text":"我路过。看见亮，就上来站站。"},
        {"t":"say","when":"c6_invite_chen","who":"chen","name":"老陈","por":"skeptic","text":"我不进去。你们弄你们的。"},
        {"t":"choice","when":"c6_invite_chen","prompt":"老陈站在圈外，马灯照着他的鞋。","options":[
          {"text":"「风大，你往前站一点。」","reply":"他往前挪了半步，把灯提低了些，不照你的脸。","flags":["c7_chen_came"],"rel":{"chen":1}},
          {"text":"「你就在那儿。我知道你在。」","reply":"他嗯了一声，把灯芯拧小，坡上暗了一半。","flags":["c7_chen_watched"]},
          {"text":"「牛棚离不了人。你回去吧。」","reply":"他转身就走，走了两步又回头看了一眼那圈绳子。","flags":["c7_chen_left"]}
        ]},

        {"t":"narr","when":"c6_alone","text":"没有人来。绳子在土上围了一个很不圆的圈。"},
        {"t":"think","when":"c6_alone","text":"书里说独修不是二等。可我现在只想找个人说句话。"},
        {"t":"choice","when":"c6_alone","prompt":"天已经黑透了。要不要去叫个人？","options":[
          {"text":"去村口叫阿禾。她说过想看。","reply":"她披着衣服跑出来，一路问你是不是出事了。","flags":["c7_invited_he","c7_he_outside"],"rel":{"he":1}},
          {"text":"不去。今晚就一个人做完。","reply":"你把绳子踢正，蹲下去重新系了个结。","flags":["c7_alone"]}
        ]},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"东西收进筐里。搬上去，一件一件照刚才的位置放。"},
        {"t":"scene","id":"c7_esbat"}
      ]
    },

    /* ===================== 石圈 · 满月 ===================== */
    "c7_esbat": {
      title: "第七章 · 满月", bg: "stones", music: "moon",
      script: [
        {"t":"narr","text":"坡上比屋里冷。月亮刚从东边的林线上升起来，白得没有一丝黄。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"我站在这块石头外面。你自己进去，把四样东西放好。"},
        {"t":"think","text":"她要站在外面。这么久了，她一次也没进过我的圈。"},
        {"t":"narr","text":"你穿着自己准备好的那身衣服，风从领口进去，你又把扣子扣上一颗。"},
        {"t":"narr","text":"你照屋里摆过的样子一件件放下，退到中间，才发现绳子有一角被自己踩歪了。"},

        {"t":"explore","id":"c7_night","prompt":"月亮爬上来了。圈里有几处可以看。","need":3,"exitLabel":"回到圈里",
         "spots":[
           {"id":"moon","x":208,"y":20,"w":64,"h":64,"label":"月亮","script":[
             {"t":"narr","text":"月亮圆得发亮，边上有一圈毛茸茸的光晕。"},
             {"t":"narr","text":"盯久了，眼睛里会多出两个月亮的影子。"},
             {"t":"think","text":"上一次看它，我还在坡下替老陈找牛。"}]},
           {"id":"stone","x":260,"y":150,"w":40,"h":90,"label":"立石","script":[
             {"t":"narr","text":"中间那块立石被月光照亮了半边，另半边黑得像还没长出来。"},
             {"t":"narr","text":"它的影子落在你脚边，正正指着南边。"}]},
           {"id":"pine","x":130,"y":110,"w":60,"h":90,"label":"松枝","script":[
             {"t":"narr","text":"松枝上压着一层薄霜，风一过，霜就簌簌地掉。"},
             {"t":"narr","text":"你折了一小枝，别在绳子和土之间。"},
             {"t":"think","text":"书里说冬天用松枝标圈。今晚正好。"}]},
           {"id":"road","x":40,"y":130,"w":60,"h":50,"label":"坡下","script":[
             {"t":"narr","text":"坡下的村子只剩三四点灯火。谁家的狗叫了两声，很快又不叫了。"},
             {"t":"narr","text":"从这个高度看，人的屋顶小得像棋子。"}]},
           {"id":"out","x":320,"y":180,"w":24,"h":52,"label":"圈外","script":[
             {"t":"narr","text":"绳子外面就是坡。风从那儿下去，带着一点柴火味。"},
             {"t":"narr","when":"c7_he_inside","text":"阿禾的影子在圈边晃来晃去，她不敢站定。"},
             {"t":"narr","when":"c7_he_outside","text":"阿禾站在圈外那块矮墙边，一动不动。"},
             {"t":"narr","when":"c7_chen_came","text":"老陈的马灯在坡下亮着，光小得像一粒米。"},
             {"t":"narr","when":"c7_alone","text":"圈外什么都没有，只有你自己的脚印来回踩了两趟。"}]}
         ]},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"先别点烛。抬头，看月亮。"},
        {"t":"quote","text":"感受它的能量沉进你的身体。感受那清凉的女神能量，用力量与爱洗过你。",
         "en":"Feel its energies sinking into your body. Feel its cool Goddess energy wash you with power and love.",
         "cite":"The Full Moon Rite · p.135"},
        {"t":"narr","text":"你抬着头站了一会儿，脖子发酸，眼睛有点湿。"},
        {"t":"codex","ids":["c7_esbat"]},
        {"t":"narr","text":"月亮底下，水碗里那块小银亮得像另一个更小的月亮。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"满月是它力量最高的那两三天。这两天做的事、许的愿，都比平常重。"},

        {"t":"narr","text":"划火柴的时候，第一根断了头，第二根被风吹灭，第三根才着。"},
        {"t":"sfx","name":"spark"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"慢慢来。三根都放进小碗里，别丢。"},
        {"t":"say","who":"player","name":"你","text":"……我手在抖。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"抖就抖。火不笑人。"},

        {"t":"say","who":"player","name":"你","text":"我向月亮祈求……我向月亮祈求……我向月亮祈求。"},
        {"t":"narr","text":"第三遍的声音比前两遍低。没有人纠正你，也没有人跟着念。"},

        {"t":"say","when":"c7_he_inside","who":"he","name":"阿禾","por":"he","text":"我可以跟着念吗？就跟着，不出声。"},
        {"t":"say","when":"c7_he_inside","who":"keeper","name":"守灯人","por":"keeper","text":"跟着呼吸就行。词是你自己的。"},
        {"t":"narr","when":"c7_he_inside","text":"她真的只动了嘴唇，一句也没出声，鼻尖冻得发红。"},
        {"t":"narr","when":"c7_he_outside","text":"阿禾站在圈外，两只手插在袖子里，脚尖朝着你的方向。"},
        {"t":"say","when":"c7_he_outside","who":"he","name":"阿禾","por":"he","text":"我就在这儿。你不用管我。"},
        {"t":"narr","when":"c7_chen_came","text":"老陈的马灯在坡下亮着，风一吹，光晃一下，像有人点头。"},
        {"t":"narr","when":"c7_alone","text":"圈里只有你和一支蜡烛。连回声都没有。"},

        {"t":"narr","text":"守灯人从筐里拿出小饼和一只瓶子，隔着绳子递进来。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"做完要吃点东西。书里管这一步叫「简单的宴席」。"},
        {"t":"quote","text":"柠檬水、牛奶或白葡萄酒这类月亮的饮品，可以在其后的「简单宴席」上喝；新月形小饼也是传统的。",
         "en":"Lunar liquids such as lemonade, milk, or white wine can be consumed during The Simple Feast that follows. Crescent cakes are traditional as well.",
         "cite":"The Full Moon Rite · p.136"},
        {"t":"codex","ids":["c7_cake"]},
        {"t":"narr","text":"小饼是月牙形的，弯得不太对称。你咬了一口，里面是杏仁和糖。"},
        {"t":"say","when":"c7_he_inside","who":"he","name":"阿禾","por":"he","text":"是我捏的。我捏坏了一整盘，只剩这几个能看。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"面团掐成核桃那么大，捏成月牙，烤二十分钟。方子在书的后面。"},
        {"t":"narr","text":"柠檬水没放糖，酸得你眯起眼睛。你还是把它喝完了。"},
        {"t":"think","text":"原来第一次满月是这个味道。"},
        {"t":"narr","text":"小饼的碎屑落在土上。你捡起来按回绳子里侧，没让它们过线。"},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"谢谢他们，然后把圈松开。"},
        {"t":"say","who":"player","name":"你","text":"……我不知道怎么松。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"这一章里没写施圈和收圈。书里说在后面，你自己翻到了再说。"},
        {"t":"narr","text":"你按她说的，把四样东西收进筐，蜡烛用手捏灭，用过的火柴倒进小碗。"},
        {"t":"narr","text":"最后你蹲下去，把绳子一圈一圈收在手上。土上留下一个很淡的圆。"},
        {"t":"shard","id":"circle"},
        {"t":"sfx","name":"shard"},
        {"t":"achv","id":"c7_fullmoon"},
        {"t":"scene","id":"c7_eve"}
      ]
    },

    /* ===================== 下山 · 冬至前夜 ===================== */
    "c7_eve": {
      title: "第七章 · 冬至前夜", bg: "stones", music: "wheel",
      script: [
        {"t":"narr","text":"下山的时候，筐里的东西一路轻响。守灯人在前面走，脚步很慢。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"今晚做得不算漂亮。绳子歪了，蜡烛灭了两次。"},
        {"t":"say","who":"player","name":"你","text":"……嗯。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"可你做完了。第一次能做到底，比做得漂亮要紧。"},
        {"t":"narr","text":"你回头看了一眼石圈。绳子已经收走了，土上那个圆还在。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"祭坛和它站着的那个圈，是你自己搭的。你自己觉得顺眼，才算数。"},
        {"t":"think","text":"书里说，独修的人可以自己开始，不必等谁批准。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"满月过了，冬至没几天了。那是一年里最长的一个夜。"},
        {"t":"say","who":"player","name":"你","text":"到那天做什么？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"到那天你就知道了。先把这几天的觉睡够。"},
        {"t":"narr","text":"她把灯举高，照了照你自己的那个圈，然后转身往坡下走。"},
        {"t":"sfx","name":"page"},

        {"t":"journal","id":"j_c7","title":"第七章 · 本章笔记","lines":[
          "圈不是地上的一条线，是罩住整块地方的球。我一开始只摸到了边。",
          "四方：北土、东风、南火、西水。绳、粉笔、花、松枝都能标出那一圈。",
          "祭坛左半边归女神，右半边归男神，中间那点地方归两个人。",
          "工具是配件，不是必需品。火柴放手边，用过的丢进小碗。",
          "满月那晚的柠檬水太酸，我一口一口喝完了。饼是月牙形的。",
          {"when":"c7_refused","text":"白先生的铜圈我没买。他说差一寸，神就不来。"},
          {"when":"c7_argued","text":"我跟白先生顶了一句。他收起铜条，还是笑着走的。"},
          {"when":"c7_browsed","text":"白先生报了价，又自己往下压了两成。我没接。"},
          {"when":"c7_invited_he","text":"阿禾真的来了。她带来了自己捏的月牙小饼。"},
          {"when":"c7_he_sent","text":"我让阿禾先回去了。饼留在门槛上，还是热的。"},
          {"when":"c7_alone","text":"第一次满月是我一个人做完的。没人看，也没人打分。"}
        ]},
        {"t":"finishChapter","id":"c7"},
        {"t":"chapter","title":"第八章","sub":"一 年 之 轮","en":"THE DAYS OF POWER"},
        {"t":"scene","id":"c8_wheel"}
      ]
    }

  },

  /* ===================== 图鉴 ===================== */
  codex: {
    "c7_circle":  {"cat":"第七章","title":"魔法圈","en":"The Circle","text":"圈、魔法圈或球体，是一座界限分明却非物质的神殿。今天多数威卡仪式与魔法，都在这种由个人力量构成的构造里进行。","src":"p.57"},
    "c7_sphere":  {"cat":"第七章","title":"能量球体","en":"A Sphere of Energy","text":"力量从身体流出，经过 athame 射入空中。完成时它是一个罩住整块工作区的球；「圆圈」只是球与地面的交线。","src":"p.59"},
    "c7_mark":    {"cat":"第七章","title":"地面标记","en":"Marking the Ground","text":"绳、粉笔轻画的圈、花（春夏）、松枝（冬节）、石头或贝壳、石英水晶、塔罗牌——能激发想象、与仪式相合就行。","src":"p.59"},
    "c7_nine":    {"cat":"第七章","title":"九尺","en":"Nine Feet","text":"圈通常是九英尺直径，九是女神之数；但任何舒适的尺寸都可以。四个方位常用点燃的蜡烛或对应工具标记。","src":"p.60"},
    "c7_quart":   {"cat":"第七章","title":"四方","en":"The Four Quarters","text":"北放五角星盘、盐或泥土（土）；东放燃香的香炉（风）；南放蜡烛（火）；西放一杯水（水）。也可移到祭坛上。","src":"p.60"},
    "c7_outdoor": {"cat":"第七章","title":"户外低调","en":"Outdoor Rites","text":"工具是配件，不是必需品，会惹麻烦就留在家里。穿黑袍、搅大釜、在空中挥刀，不是避免引人注意的好办法。","src":"p.58"},
    "c7_altar":   {"cat":"第七章","title":"祭坛","en":"The Altar","text":"立在圈中心，一般面朝北。木头最好（橡木、柳木），也可以是纸箱、两块砖加一块板、树桩或大平石。神不住在里面。","src":"p.61"},
    "c7_side":    {"cat":"第七章","title":"左与右","en":"Left and Right","text":"左半边归女神：杯、五角星盘、铃、水晶、大釜、神像，扫帚可靠左侧。右半边归男神：红黄金蜡烛、香炉、魔杖、两把刀。","src":"p.62"},
    "c7_mid":     {"cat":"第七章","title":"中间","en":"The Center","text":"花放中间，插在花瓶或小锅里。香炉也常居中，让烟同时献给女神和男神；五角星盘可以放在香炉前面。","src":"p.62"},
    "c7_match":   {"cat":"第七章","title":"火柴","en":"Matches","text":"动手前所有东西都要在圈里。火柴放手边，另备一个小碗装用过的——丢进香炉或大釜是不礼貌的。","src":"p.62"},
    "c7_idol":    {"cat":"第七章","title":"不是偶像","en":"Not Idol Worship","text":"雕像或一堆石头并不是神本身；我们不崇拜树、鸟、石头，只是乐于把它们看作女神与男神的显现。","src":"p.62"},
    "c7_esbat":   {"cat":"第七章","title":"满月仪式","en":"The Full Moon Rite","text":"夜里做，尽量看得见月亮。祭坛上放新月形物、白花、银器；用水晶球，或盛水并放一块银的大釜、白碗。","src":"p.134-135"},
    "c7_cake":    {"cat":"第七章","title":"新月小饼","en":"Crescent Cakes","text":"「简单宴席」上可喝柠檬水、牛奶或白葡萄酒，新月形小饼是传统。面团掐成核桃大小，捏成月牙，烤二十分钟。","src":"p.136, 161"}
  },

  /* ===================== 试炼 ===================== */
  trials: {

    "t7_quart": {
      kind: "arrange", title: "第七章 · 四方与元素",
      caption: "把四样东西放到它自己的方向上",
      explain: "北土、东风、南火、西水。书里说这四件也可以移到祭坛上，位置照着方位来。",
      src: "Chapter 7 · p.60",
      items: [
        {"id":"pentacle","icon":"pentacle","label":"五角星盘","why":"北是土：稳定、丰饶、滋养，另外三元素的基础。","src":"p.60"},
        {"id":"censer","icon":"censer","label":"香炉","why":"东是风：心智、沟通、运动、占卜。鲜花或线香也可以。","src":"p.60"},
        {"id":"candle","icon":"candle","label":"蜡烛","why":"南是火：转化、激情与改变、成功、健康与力量。","src":"p.60"},
        {"id":"water","icon":"water","label":"水","why":"西是水：情感、灵能心智、爱、疗愈、美。","src":"p.60"}
      ],
      slots: [
        {"x":240,"y":80,"label":"北","item":"pentacle"},
        {"x":340,"y":130,"label":"东","item":"censer"},
        {"x":240,"y":180,"label":"南","item":"candle"},
        {"x":140,"y":130,"label":"西","item":"water"}
      ]
    },

    "t7_altar": {
      kind: "arrange", title: "第七章 · 祭坛的左与右",
      caption: "左边归女神，右边归男神，中间那块归两个人",
      explain: "杯在左，刀在右，花在中间。香炉居中或居右，书里两种做法都提到过。",
      src: "Chapter 7 · p.62",
      items: [
        {"id":"cup","icon":"chalice","label":"杯","why":"杯是女神的东西，放在左半边。","src":"p.62"},
        {"id":"flower","icon":"flower","label":"花","why":"花放中间，插在花瓶或小锅里。","src":"p.62"},
        {"id":"knife","icon":"athame","label":"魔法刀","why":"athame 归右半边，和魔杖、白柄刀一起。","src":"p.62"}
      ],
      slots: [
        {"x":150,"y":120,"label":"左","item":"cup"},
        {"x":240,"y":120,"label":"中","item":"flower"},
        {"x":330,"y":120,"label":"右","item":"knife"}
      ]
    },

    "t7_mark": {
      kind: "arrange", title: "第七章 · 用什么标圈",
      caption: "三种场合，三样标记物",
      explain: "花适合春夏，松枝适合冬季节日，绳子随时都能用。石头、贝壳、水晶、塔罗牌也都行。",
      src: "Chapter 7 · p.59",
      items: [
        {"id":"flower","icon":"flower","label":"花","why":"花是春夏仪式的首选，跟草木最合。","src":"p.59"},
        {"id":"pine","icon":"leaf","label":"松枝","why":"松枝用在冬季节日，常青，雪里也看得见。","src":"p.59"},
        {"id":"cord","icon":"cord","label":"绳","why":"绳子绕着圈一放就是标记，哪天都能用。","src":"p.59"}
      ],
      slots: [
        {"x":150,"y":105,"label":"春夏","item":"flower"},
        {"x":330,"y":105,"label":"冬节","item":"pine"},
        {"x":240,"y":170,"label":"随时","item":"cord"}
      ]
    },

    "t7_bai": {
      kind: "quiz", title: "第七章 · 白先生的四句话",
      explain: "这四句都是他说的。书里每一句都有对应的说法，你自己挑。",
      src: "Chapter 7 · p.57-62",
      questions: [
        {"q":"白先生：「圈必须正好九尺，差一寸神就不来。」","options":[
           "「九尺只是通常尺寸，舒服就行。」",
           "「对，尺寸错了就没有力量。」",
           "「九是女神之数，所以必须九尺。」",
           "「那我得先买把尺子。」"],
         "answer":0,
         "explain":"书里说圈通常是九英尺（九是女神之数），但任何舒适的尺寸都可以。",
         "src":"Chapter 7 · p.60"},
        {"q":"白先生：「没有铜圈，你画的圈一点用都没有。」","options":[
           "「绳、粉笔、花、松枝、石头都行。」",
           "「所以我该买你的圈。」",
           "「那今晚就不做了。」",
           "「铜圈才是老规矩。」"],
         "answer":0,
         "explain":"书里列了一串可以标圈的东西：要能激发想象、与仪式相契合。",
         "src":"Chapter 7 · p.59"},
        {"q":"白先生：「圈是护城河，防着你召来的东西反咬你。」","options":[
           "「那是仪式魔法师的圈。威卡的圈是见神的地方。」",
           "「对，圈越厚越好。」",
           "「反正两种圈都一样。」",
           "「那我今晚不召请了。」"],
         "answer":0,
         "explain":"书里分了两种圈：一种保护魔法师不被召来的力量伤到，一种创造人与神相会的神圣空间。",
         "src":"Chapter 7 · p.57"},
        {"q":"白先生：「工具越全越灵，铜刀银杯，一样都不能少。」","options":[
           "「工具是配件，不是必需品。」",
           "「对，我得慢慢攒钱。」",
           "「那我先买一把刀。」",
           "「少一件今晚就不做。」"],
         "answer":0,
         "explain":"「Tools can be used, but remember that they're accessories, not necessities.」",
         "src":"Chapter 7 · p.58"}
      ]
    },

    "t7_not": {
      kind: "multi", title: "第七章 · 圈不是什么",
      q: "书里说，下面哪些不是圈的样子或者规矩？",
      options: [
        "只是地上一圈花或绳",
        "包围整个工作区的一个球",
        "必须正好九英尺",
        "女神和男神住在圈里",
        "绳、粉笔、石头都能标出来",
        "没有工具就做不成仪式"
      ],
      answers: [0,2,3,5],
      explain: "圈是罩住整块地方的球；尺寸随意；神不住在圈或祭坛里；绳、粉笔、花、松枝都行；工具是配件，不是必需品。",
      src: "Chapter 7 · p.59-62"
    }

  },

  /* ===================== 符印与成就 ===================== */
  sigils: {
    "circle": {"name":"圈","icon":"circle","desc":"画在土上的是一个圆，做出来的是一个球。","src":"第七章 · p.59"}
  },

  achv: {
    "c7_fullmoon": {"name":"第一次满月","desc":"在冬至前的满月下做完了第一次满月仪式。"}
  }

});
