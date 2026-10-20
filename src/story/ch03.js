/* 第三章 · 三条河 —— 入口场景 c3_study。资料：notes_ch1_4.md（第3章 Magic，p.21–26）。
 * 三条河 = 个人力量 / 大地力量 / 神圣力量。末页跳到第四章 c4_altar。
 */
STORY_ADD({

  scenes: {

    /* ===================== 书房 · 三条河 ===================== */
    "c3_study": {
      "title": "第三章 · 三条河", "bg": "study", "music": "cottage",
      "script": [
        {"t":"intro","chapter":"第三章","title":"三 条 河","book":"第三章 Magic · 原书 p.21-26",
         "points":["魔法有一个只有一行的定义","书里说力气来自三个地方","那张付不出的账单，你亲手排一遍","有人会请你去改变另一个人"]},

        {"t":"narr","text":"书房的窗很小，光是斜着进来的。桌上摊着昨夜没合上的书，蜡烛烧到了底，灯芯歪在一边。"},
        {"t":"narr","text":"守灯人把一只粗碗推到桌子中间。碗里三样东西：一撮土、半碗水、一根烧黑的烛头。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"三条河。"},
        {"t":"say","who":"player","name":"你","text":"什么三条河？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"魔法的力气，从三个地方来。名字先别记，你先看这张桌子。"},

        {"t":"explore","id":"c3_desk","prompt":"桌上、架上都是东西。先看哪儿？","need":3,"exitLabel":"回到桌边",
         "spots":[
           {"id":"shelf","x":0,"y":10,"w":210,"h":230,"label":"书架","script":[
             {"t":"narr","text":"书架上挤着几十本书，讲魔法的只有三本，其余是植物、天气、木工、兽医。"},
             {"t":"narr","text":"那三本的页边画满了线，线画得很歪，有的划到装订线外面去了。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"线是别人画的。他觉得有用的地方，你未必用得上。"},
             {"t":"think","text":"那我自己画线的时候，该画在哪儿？"}]},
           {"id":"candle","x":225,"y":35,"w":35,"h":95,"label":"蜡烛","script":[
             {"t":"narr","text":"这支蜡烛烧得很短，烛泪积成一小片，把烛台粘在了桌面上。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"昨天夜里点的。想一件事，想到它自己灭。"},
             {"t":"narr","text":"她说得很平常，像在说一壶水烧开了。"},
             {"t":"codex","ids":["c3_positive"]}]},
           {"id":"openbook","x":200,"y":140,"w":130,"h":55,"label":"打开的书","script":[
             {"t":"narr","text":"摊开的那页写着件很小的事：一张电话账单，一百块，手里没有钱。"},
             {"t":"think","text":"书上连这种事都要一步一步写清楚。"},
             {"t":"narr","text":"旁边还画了一张小图，方框，中间一个大叉。"},
             {"t":"codex","ids":["c3_bill"]}]},
           {"id":"ink","x":300,"y":85,"w":60,"h":80,"label":"墨水","script":[
             {"t":"narr","text":"墨水瓶里的墨是绿的，只剩一个底。瓶口结了一圈干掉的绿壳。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"绿墨水。书里那个例子，用的就是绿墨水。"},
             {"t":"narr","text":"笔尖被剪过。写字的人习惯把字写得很小，一行能塞两行的话。"},
             {"t":"think","text":"她抄过多少遍，才把墨用到这个底。"}]},
           {"id":"scroll","x":370,"y":165,"w":80,"h":45,"label":"旧卷轴","script":[
             {"t":"narr","text":"一卷旧纸，是邻村的人抄来的祈请文，抄错了两三个词，用朱笔改在旁边。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"抄错了不要紧。要紧的是他知道自己在请谁。"},
             {"t":"narr","text":"纸的末尾没有署名，只按了一个指印，印得很轻。"}]},
           {"id":"chair","x":380,"y":55,"w":90,"h":110,"label":"椅子","script":[
             {"t":"narr","text":"椅子上的坐垫塌下去一块，形状正好是一个人坐很多年的样子。"},
             {"t":"narr","text":"扶手上有一道很深的划痕，像是刀尖随手拖出来的。"},
             {"t":"think","text":"她每天在这儿坐多久？一个人对着这些书，不闷吗？"}]}
         ]},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"看完了？那你说说，魔法是什么。"},
        {"t":"say","who":"player","name":"你","text":"……把想要的事情弄出来？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"差不多。书上那句话只有一行，作者说他改了很多遍才敢写。"},
        {"t":"quote","text":"魔法是把自然的能量投射出去，以产生需要的效果。",
         "en":"Magic is the projection of natural energies to produce needed effects.","cite":"Chapter 3 · p.21"},
        {"t":"codex","ids":["c3_def"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"三个词。自然的、能量、需要的效果。少一个，这句话就塌了。"},
        {"t":"say","who":"player","name":"你","text":"那力气是哪儿来的？"},
        {"t":"quote","text":"这种能量有三个主要来源：个人力量、大地力量、神圣力量。",
         "en":"There are three main sources of this energy--personal power, earth power, and divine power.","cite":"Chapter 3 · p.21"},
        {"t":"codex","ids":["c3_three"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"碗里这三样，一件对一条河。你自己分分看，别问我。"},
        {"t":"trial","id":"t3_powers"},
        {"t":"codex","ids":["c3_personal","c3_earth","c3_divine"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"名字记不牢不要紧，记住脾气：一条在你身上，一条在脚下，一条要你开口去请。"},
        {"t":"quote","text":"在魔法中，个人力量被唤起，注入特定目的，被释放，并导向它的目标。",
         "en":"In magic, personal power is aroused, infused with a specific purpose, released, and directed toward its goal.","cite":"Chapter 3 · p.22"},
        {"t":"say","who":"player","name":"你","text":"那撮土呢？土也要念咒吗？"},
        {"t":"quote","text":"大地力量存在于这个星球和它的天然产物之中。石头、树木、风、火焰、水、水晶和香气，各有独特的力量。",
         "en":"Earth power is that which resides within our planet and in its natural products. Stones, trees, wind, flames, water, crystals, and scents all possess unique, specific powers that can be used during magical ritual.","cite":"Chapter 3 · p.22"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"所以那撮土不是摆着好看的。它自己就有话要说。"},
        {"t":"say","who":"player","name":"你","text":"那第三条呢？怎么请？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里用的词是「祈请」。开口请，不是命令。"},
        {"t":"narr","text":"她把那半碗水端起来看了一眼，又放回去，水面上那圈光晃了两下才静。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"记住这个分别。命令是刀的事，祈请是人的事。"},

        {"t":"narr","text":"她从抽屉最里面摸出两块黑铁片。它们隔着纸也吸在一起，你揭了半天才揭开。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"玩一会儿。别急着说你懂了。"},
        {"t":"narr","text":"你把一块压在纸下面推着走。另一块跟着走，纸没破，桌上的灰却被拖出一条线。"},
        {"t":"narr","text":"你把它们分开，手刚松开，啪的一声，又贴了回去。"},
        {"t":"sfx","name":"spark"},
        {"t":"quote","text":"拿两块磁铁玩一玩。看看那些看不见的力，如何以看似超自然的方式相斥相吸。",
         "en":"Play with two magnets. See the invisible forces resisting and attracting in seemingly supernatural ways.","cite":"Chapter 3 · p.23"},
        {"t":"codex","ids":["c3_magnet"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"磁力从前算魔法。后来科学给它起了名字，它就从魔法里搬出去了。"},
        {"t":"say","who":"player","name":"你","text":"剩下这些，也在等着被起名字？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"作者就是这么说的。他一点不慌。"},
        {"t":"quote","text":"与流行看法相反，魔法并非超自然。它是一种自然的实践，运用的是科学尚未发现或命名的真实力量。",
         "en":"Contrary to popular belief, magic isn't supernatural. True, it is an occult (hidden) practice steeped in millennia of secrecy, slander, and misinformation, but it is a natural practice utilizing genuine powers that haven't yet been discovered or labeled by science.","cite":"Chapter 3 · p.22"},
        {"t":"codex","ids":["c3_natural"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"所以别在我这儿说「超自然」。这个词一出口，事情就变味了。"},
        {"t":"think","text":"村里人说的「邪门」，大概就是这个意思的反面。"},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里有个例子。不大：一张付不出的电话账单，一百块钱。"},
        {"t":"say","who":"player","name":"你","text":"这也算魔法？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你分一遍就知道为什么算。那一页在桌上，你自己看。"},
        {"t":"narr","text":"那一页的底下用铅笔标了三小段，字很小：动手之前、仪式当中、最后收尾。"},
        {"t":"narr","text":"铅笔线画得很轻，像是怕别人看见，又像是怕自己忘了。"},
        {"t":"trial","id":"t3_bill"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"分完了。你说，那个人到底做了什么？"},
        {"t":"say","who":"player","name":"你","text":"他一直盯着一件事看。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"对。所以作者写下了一句挺重的话。"},
        {"t":"quote","text":"从我决定施行魔法的那一刻起，我就已经在施行了。想着它，就让个人力量运转起来。",
         "en":"From the time I decide to do an act of magic, I'm doing it. Thinking about it sets personal power into motion.","cite":"Chapter 3 · p.24"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"别把这句听成许愿。它说的是：注意力是有重量的东西。"},
        {"t":"say","who":"player","name":"你","text":"那目标写大一点，不是更划算？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"他写的是「付掉这张账单」，不是「变出一百块」。"},
        {"t":"narr","text":"你又看了一眼那张小图：方框、一个叉，还有一行铅笔小字，写着支票的余额。"},

        {"t":"narr","text":"她把碗里的土倒进窗台的花盆，把水也倒进去。烛头留在碗底，成一个黑点。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"三条河你都见过了。以后你自己用，别问我灵不灵。"},
        {"t":"sfx","name":"shard"},
        {"t":"shard","id":"rivers"},
        {"t":"achv","id":"c3_rivers"},
        {"t":"think","text":"碗空了。可我记住的不是这只碗。"},

        {"t":"narr","text":"门被敲了三下，很急。风从门缝里挤进来，把桌上的纸掀起一角。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"你在不在？……她也在？"},
        {"t":"narr","text":"老陈站在门口，肩膀上的雨衣还在滴水。他不肯往里走，也不看守灯人。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"兽医来过了。"},
        {"t":"think","text":"他从来不上这座坡。"},
        {"t":"scene","id":"c3_chen"}
      ]
    },

    /* ===================== 老陈的灶间 ===================== */
    "c3_chen": {
      "title": "第三章 · 灶间", "bg": "cottage", "music": "cottage",
      "script": [
        {"t":"narr","text":"他的灶间比外头还暗。灶上炖着一锅糊糊，火压得很低，柴是省着烧的。"},
        {"t":"narr","text":"屋梁上吊着几把干草，颜色发灰，捆得整整齐齐，最靠里那把还带着细小的白花。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"牛怀上了。"},
        {"t":"narr","text":"他说这话的时候没笑，反而把手里的帽子捏得更紧，捏出了一道折痕。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"怀上了就得保。兽医还要来两趟。"},
        {"t":"say","who":"player","name":"你","text":"两趟多少钱？"},
        {"t":"narr","text":"他没答。桌上压着一张单子，底下的数字写得很重，笔尖把纸戳破了一点。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"外面的钱我没欠过。就这一回。"},

        {"t":"explore","id":"c3_chenroom","prompt":"灶间里没什么好看的。你先看什么？","need":3,"exitLabel":"坐一会儿",
         "spots":[
           {"id":"stove","x":0,"y":90,"w":80,"h":160,"label":"灶火","script":[
             {"t":"narr","text":"灶膛里的火很小，烧的是掰碎的旧木料。锅盖边上冒着一线白气。"},
             {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"牛棚里那盆热水是给它留的。你别嫌这屋里有味。"},
             {"t":"narr","text":"他说完自己把窗子推开了一条缝，风一进来，火苗往一边倒。"}]},
           {"id":"window","x":300,"y":55,"w":110,"h":110,"label":"窗","script":[
             {"t":"narr","text":"窗外就是牛棚。母牛站在槽边，慢慢嚼着，肚子靠近后腿的地方鼓出来一块。"},
             {"t":"narr","text":"它抬头看了一眼屋里，又低下去继续吃。"},
             {"t":"think","text":"它一点不知道自己值一笔兽医钱。"}]},
           {"id":"table","x":120,"y":140,"w":150,"h":90,"label":"桌上的单子","script":[
             {"t":"narr","text":"单子是兽医开的，字很潦草。底下那个数字你看了两遍才认出来。"},
             {"t":"narr","text":"单子旁边压着一张卖粮的收条，日期是上个月，钱数比单子小一半。"},
             {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"粮卖早了。今年价钱不好，我认。"},
             {"t":"think","text":"他不是不会算。他是算过了，才更不说话。"}]},
           {"id":"herb","x":95,"y":25,"w":200,"h":90,"label":"挂的草","script":[
             {"t":"narr","text":"房梁上那几把草吊了很多年，绳子换过，草没换。"},
             {"t":"say","when":"helped_chen","who":"chen","name":"老陈","por":"skeptic","text":"她挂的。以前牛不舒服，她就去坡上揪两把。"},
             {"t":"narr","text":"他说完就不说了，用袖子把灶台擦了一下，其实灶台不脏。"},
             {"t":"think","text":"他一个人在这屋里吃饭，吃了几年了。"}]},
           {"id":"stool","x":80,"y":205,"w":45,"h":50,"label":"凳子","script":[
             {"t":"narr","text":"凳子上放着一只搪瓷缸，缸底沉着茶叶，早凉了。"},
             {"t":"narr","text":"凳子腿下垫着一块折起来的纸，用来把不平的地面找平。"}]}
         ]},

        {"t":"say","when":"helped_chen","who":"chen","name":"老陈","por":"skeptic","text":"上回找牛的事，我还没谢你。也没打算谢，你别等着。"},
        {"t":"say","who":"player","name":"你","text":"我没等。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"那就好。"},
        {"t":"narr","text":"他把帽子放在桌上，想了想，又拿起来戴上。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"你那个老师，真有本事的话，能不能弄出钱来？"},
        {"t":"think","text":"他说的是「弄」，不肯说出那两个字。"},
        {"t":"say","who":"player","name":"你","text":"你想让她做什么？"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"变一笔钱。就当我跟你借的，我拿粮抵。"},
        {"t":"narr","text":"他自己也知道这话说不通，说完就把脸转开，去看灶上那锅糊糊。"},

        {"t":"trial","id":"t3_price"},

        {"t":"quote","text":"一两天，也许一周之内，我会收到意外或拖欠的款项，或者以别的方式了结财务义务，从而能付掉这张账。",
         "en":"Within a day or two, perhaps a week, I'll either receive unexpected (or delayed) money, or will satisfy other financial obligations in a manner that frees me to pay the bill.","cite":"Chapter 3 · p.24"},
        {"t":"codex","ids":["c3_indirect"]},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"拖欠的……"},
        {"t":"narr","text":"他忽然不说话了。你想起村东头老赵家欠他两年工钱，他一直没去要。"},
        {"t":"say","who":"player","name":"你","text":"那笔钱，你还想要吗？"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"要钱就得撕脸。一个村的，抬头不见低头见。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"再说我去了，人家要是说没有，我这脸往哪儿放。"},

        {"t":"choice","prompt":"灶膛里的火啪地响了一声。你要说什么？","options":[
          {"text":"「明天我陪你去。我站在门口。」","reply":"他把帽子往下一扣：「站着就行，嘴我自己张。」","rel":{"chen":1},"flags":["c3_chen_wage"]},
          {"text":"「你自己去。你去比我管用。」","reply":"他盯了你一会儿，哼了一声：「你倒会使唤人。」","insight":1,"flags":["c3_chen_alone"]},
          {"text":"「我手里有一点，你先拿着。」","reply":"他把你的手推回来，推得挺用力：「你的钱留着。我又不是要饭的。」","rel":{"chen":1},"flags":["c3_chen_loan"]}]},

        {"t":"set","flags":["c3_chen_preg"]},
        {"t":"say","who":"player","name":"你","text":"兽医那边能不能先说一声，分两回给。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"人家是镇上的人，凭啥等我。"},
        {"t":"narr","text":"他把锅里的糊糊盛出两碗，一碗推到你面前，自己那碗一口没动。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"吃吧。别嫌糊。"},
        {"t":"narr","text":"你埋着头吃。糊糊很淡，锅底有一点糊味。"},
        {"t":"narr","text":"你出门的时候，守灯人正提着灯站在院外，没进来，只把灯举在牛棚那一边。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你说，那笔钱明天要是没要回来，今晚这些事算不算白做？"},
        {"t":"say","who":"player","name":"你","text":"……算吗？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你先留着这个问题。回头自己填。"},
        {"t":"think","text":"她提着灯先走了，光在雪前的干草上一晃一晃。"},
        {"t":"narr","text":"村口的小路上有人坐着等你，脚边一堆揪断的草。"},
        {"t":"scene","id":"c3_he"}
      ]
    },

    /* ===================== 小路上的阿禾 ===================== */
    "c3_he": {
      "title": "第三章 · 小路", "bg": "forest", "music": "forest",
      "script": [
        {"t":"narr","text":"天黑得早，路边的草上已经结了霜。阿禾坐的那块石头，被她焐出一小块干的地方。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我等你好久了。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"你现在会魔法了，对吧。你帮我一个忙。"},
        {"t":"say","who":"player","name":"你","text":"什么忙。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"小满。镇上卖布那家的。你认识。"},
        {"t":"narr","text":"她说这个名字的时候，声音比刚才轻，脚在地上蹭了两下。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"她跟谁都能说上话，就是不理我。我说话她也听不见。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"书里那种，让人喜欢上你的。你给我做一次。"},
        {"t":"think","text":"她说得很顺。像已经练了很久，就等一个会做的人。"},
        {"t":"narr","text":"她从袖子里掏出一张折了很多次的纸，塞过来。纸上写着小满的名字，还有一个生日。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我连她生日都打听好了。"},
        {"t":"say","who":"player","name":"你","text":"……"},
        {"t":"narr","text":"守灯人站在几步外的树下，没过来，只把灯举高了一点，照着你手里那张纸。"},
        {"t":"think","text":"书上有一句话，是关于「不做」的。"},
        {"t":"narr","text":"你想起来：那页的边角被指甲划过很多次，划得发白。"},

        {"t":"trial","id":"t3_ethics"},

        {"t":"quote","text":"这很重要：魔法是一种积极的实践。威卡不做破坏性、操纵性或剥削性的魔法。",
         "en":"This is important--magic is a positive practice. Wiccans don't perform destructive, manipulative, or exploitive magic.","cite":"Chapter 3 · p.25"},
        {"t":"codex","ids":["c3_ethics"]},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"你别背句子给我听。你就说做不做。"},
        {"t":"say","who":"player","name":"你","text":"做了以后，她会喜欢你。可那不是她。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我不管。我要的就是她喜欢我。"},
        {"t":"narr","text":"她说完自己愣了一下。草在她脚底下断了两根。"},
        {"t":"narr","text":"她把袖子往上撸了撸，手腕上有一圈很细的旧红绳，颜色褪得发白。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我娘说这个能保人。保了三年，什么也没保来。"},

        {"t":"choice","prompt":"阿禾正等着你点头。你说什么？","options":[
          {"text":"「我来教你说话，不教这个。」","reply":"她攥着那张纸没动，过了好一会儿才说：「那你明天什么时候有空。」","rel":{"he":1},"flags":["c3_he_brave"]},
          {"text":"「这件事我不做。你自己去问守灯人。」","reply":"她站起来就走，走了七八步又回头喊：「你们说话都拐弯！」","insight":1,"flags":["c3_he_refuse"]},
          {"text":"「先教你一个稳住的法子，别碰她。」","reply":"她将信将疑地跟着你把手按在胸口，数到十，肩膀塌下去一点。","rel":{"he":1},"flags":["c3_he_calm"]}]},

        {"t":"say","when":"c3_he_brave","who":"he","name":"阿禾","por":"he","text":"到时候你要站远点。站近了我不说。"},
        {"t":"say","when":"c3_he_refuse","who":"he","name":"阿禾","por":"he","text":"你们说话都拐弯。我走了。"},
        {"t":"say","when":"c3_he_calm","who":"he","name":"阿禾","por":"he","text":"数到十就不抖了。这也算你教的，我记着。"},
        {"t":"narr","text":"她把那张纸掐成一团，扔进路边的沟里。扔完又看了一眼，没去捡。"},
        {"t":"narr","text":"她走的时候步子很大，走到坡口停了一下，还是没回头。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你刚才是在拒绝她，还是在帮她？"},
        {"t":"say","who":"player","name":"你","text":"我不知道。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"不知道也行。她的人生是她的，你替她做的那部分越少越好。"},
        {"t":"say","who":"player","name":"你","text":"那要是她真的去说了，被人拒绝了怎么办。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"那就是她的了。你在旁边站着就行。"},
        {"t":"narr","text":"夜里的风从坡上下来，灯焰歪了一下，又立直了。"},
        {"t":"think","text":"那张纸在沟里。明天多半会被霜打湿。"},
        {"t":"scene","id":"c3_lamp"}
      ]
    },

    /* ===================== 一支蜡烛 ===================== */
    "c3_lamp": {
      "title": "第三章 · 一支蜡烛", "bg": "cottage", "music": "cottage",
      "script": [
        {"t":"narr","text":"回到屋里，守灯人在桌子中间留出一小块空地方，上面只放了一支蜡烛和一盒长火柴。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"今晚不做别的。坐在这儿就行。"},
        {"t":"say","who":"player","name":"你","text":"就这样？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"就这样。书里这句话，我抄在书皮上了，抄了十几年。"},
        {"t":"quote","text":"别的都没有的话，就点一支蜡烛，在它面前静下心来，专注于你的魔法需求。相信你自己。",
         "en":"If nothing else, light a candle, settle down before it, and concentrate on your magical need. Trust yourself.","cite":"Chapter 3 · p.26"},
        {"t":"codex","ids":["c3_minimal"]},
        {"t":"say","who":"player","name":"你","text":"那要是我做错了呢？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"很多人怕这个。怕的人，多半是被没做过这件事的人吓的。"},
        {"t":"quote","text":"别害怕。过马路也很危险，但只要你按规矩过，就没事。",
         "en":"Don't be scared. Crossing the street is dangerous too. But if you do it properly, you're fine.","cite":"Chapter 3 · p.26"},
        {"t":"codex","ids":["c3_fear"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"方法对了就没事。可唯一的验证办法，是去走一趟。"},
        {"t":"narr","text":"她划着一根长火柴，把蜡烛点上，然后把火柴盒推到你这边的桌角。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"点着以后，心里放一件事。不要多，一件就够。"},
        {"t":"narr","text":"你盯着火苗看。它立着不动，只有最上面那一点在轻轻抖。"},

        {"t":"choice","prompt":"你心里放的是哪一件？","options":[
          {"text":"老陈的兽医钱。","reply":"你想的是那张单子上写得很重的数字，和灶上那锅稀糊糊。","flags":["c3_wish_chen"]},
          {"text":"阿禾和小满。","reply":"你想的是沟里那团纸，和她说那个名字时变轻的声音。","flags":["c3_wish_he"]},
          {"text":"你自己的一件小事，不说给谁听。","reply":"你没把它写成句子。你只是让它待在那儿，像桌上放着一件东西。","flags":["c3_wish_self"]}]},

        {"t":"narr","text":"你说不清过了多久。蜡烛烧下去一小截，桌上多了一小片化开的蜡。"},
        {"t":"narr","text":"风从窗缝里过，火苗往一边偏了一下，又竖直了。"},
        {"t":"say","who":"player","name":"你","text":"就这样看着它，算做完了吗？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"算做完。做完比做对要紧。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"明天把蜡烛头收起来，别扔。第一支留着自己看。"},
        {"t":"think","text":"她没说会灵。她只说了别扔。"},
        {"t":"sfx","name":"chime"},

        {"t":"journal","id":"j_c3","title":"第三章 · 本章笔记","lines":[
          "魔法是把自然的能量投射出去。书上这句话只有一行，作者说他改了很多遍。",
          "力气有三个来源：我自己的命力、脚下的东西、还有开口去请的那一份。",
          "书里那个账单的例子我排了一遍：把注意力钉在一件事上，然后照着去做。",
          {"when":"c3_chen_wage","text":"老陈的兽医钱，我说明天陪他去要那笔两年的工钱。"},
          {"when":"c3_chen_alone","text":"老陈的钱，我让他自己去。他嘴上不服，帽子倒是戴好了。"},
          {"when":"c3_chen_loan","text":"我说我手里有一点，他把我的手推回来了。他说他不是要饭的。"},
          {"when":"c3_he_brave","text":"阿禾要我让小满爱上她。我说我教她说话，不教这个。"},
          {"when":"c3_he_refuse","text":"阿禾那件事我没接。她骂我说话拐弯，走了。"},
          {"when":"c3_he_calm","text":"我没碰小满。我教了阿禾一个让自己稳下来的法子。"},
          "书里说威卡不做破坏性、操纵性、剥削性的魔法。原来「不做」也是一种做法。",
          {"when":"c3_wish_chen","text":"今晚点蜡烛的时候，我心里放的是老陈那笔兽医钱。"},
          {"when":"c3_wish_he","text":"今晚点蜡烛的时候，我心里放的是阿禾和小满。"},
          {"when":"c3_wish_self","text":"今晚点蜡烛的时候，我放的是自己的一件小事。没告诉任何人。"},
          "她说别怕，过马路也危险。唯一的验证办法是自己走一趟。",
          "我还有一件事没弄明白：魔法什么时候才算「做完了」。"
        ]},

        {"t":"fx","kind":"flash"},
        {"t":"finishChapter","id":"c3"},
        {"t":"chapter","title":"第四章","sub":"十 一 件","en":"ELEVEN TOOLS"},
        {"t":"scene","id":"c4_altar"}
      ]
    }
  },

  codex: {
    "c3_def": {"cat":"第三章","title":"魔法的定义","en":"Magic is the projection of natural energies to produce needed effects.","text":"作者说下这个定义出乎意料地难，这是他改过很多遍的一行：把自然的能量投射出去，产生需要的效果。","src":"p.21"},
    "c3_three": {"cat":"第三章","title":"三种力量","en":"personal power, earth power, and divine power","text":"个人力量、大地力量、神圣力量。它们常常一起用，不是三种互不相干的咒语。","src":"p.21"},
    "c3_personal": {"cat":"第三章","title":"个人力量","en":"Personal power","text":"维持我们生命的命力。从日月、水和食物里吸收；运动、性、分娩时释放；连呼气都会漏掉一点。","src":"p.21-22"},
    "c3_earth": {"cat":"第三章","title":"大地力量","en":"Earth power","text":"住在这个星球和它的天然产物里：石头、树木、风、火焰、水、水晶、香气。草药撒在烛边就是这一种。","src":"p.22"},
    "c3_divine": {"cat":"第三章","title":"神圣力量","en":"Divine power","text":"个人力量与大地力量的显现，是诸神之内的能量，也就是创造万物的那个源头。威卡用祈请把它请来。","src":"p.22"},
    "c3_natural": {"cat":"第三章","title":"不是超自然","en":"magic isn't supernatural","text":"作者说魔法确实隐秘，但它是自然的实践，用的是科学还没发现或命名的真实力量。磁力从前也算魔法。","src":"p.22-23"},
    "c3_magnet": {"cat":"第三章","title":"两块磁铁","en":"Play with two magnets.","text":"作者让人拿两块磁铁玩一玩：看不见的力以看似超自然的方式相斥相吸。看不懂，不等于不存在。","src":"p.23"},
    "c3_bill": {"cat":"第三章","title":"账单范例","en":"a typical candle ritual","text":"一张付不出的电话账单：定目标、点烛、画账单、打叉、抹油、撒草药、烧掉。每一步都在把注意力钉住。","src":"p.23-24"},
    "c3_indirect": {"cat":"第三章","title":"间接结果","en":"unexpected (or delayed) money","text":"书里没保证凭空来钱。结果可能是意外收到或拖欠已久的钱，也可能是别的账被了结，腾出钱来付。","src":"p.24"},
    "c3_positive": {"cat":"第三章","title":"正面实践","en":"magic is a positive practice","text":"书里强调魔法是积极的实践。破坏性、操纵性、剥削性的魔法，作者说这是绝对禁忌。","src":"p.25"},
    "c3_ethics": {"cat":"第三章","title":"不操弄人","en":"manipulative magic","text":"让一个人违背自己的意愿去爱谁，属于操纵。书里禁止的不是喜欢，是把别人当成可以拧的开关。","src":"p.25"},
    "c3_minimal": {"cat":"第三章","title":"最小仪式","en":"If nothing else, light a candle","text":"什么都没有的时候，点一支蜡烛，在它面前静下来，专注你真正需要的那件事，然后相信你自己。","src":"p.26"},
    "c3_fear": {"cat":"第三章","title":"别怕魔法","en":"Don't be scared.","text":"作者说：过马路也危险，方法对了就没事，唯一的验证方式是去走一趟。用爱做出来的魔法没有危险。","src":"p.26"}
  },

  trials: {
    "t3_powers": {
      "kind":"sort",
      "title":"第三章 · 试炼 · 三条河",
      "hint":"这些力气，各自是从哪儿来的？",
      "bins":[
        {"id":"personal","label":"个人力量","tip":"你自己的命力"},
        {"id":"earth","label":"大地力量","tip":"地上的东西"},
        {"id":"divine","label":"神圣力量","tip":"请来的那一份"}],
      "items":[
        {"text":"你呼气的时候溜掉的那点力气","bin":"personal","why":"个人力量就是维持生命的命力，连呼气都会放掉一些，吸气再补回来。","src":"p.21"},
        {"text":"跑步跑到心跳撞耳朵的那股劲","bin":"personal","why":"运动、锻炼、性、分娩都会释放个人力量。","src":"p.21"},
        {"text":"一块石英水晶里存着的凉","bin":"earth","why":"大地力量住在星球和它的天然产物里：石、树、风、火、水、水晶、香气。","src":"p.22"},
        {"text":"撒在蜡烛周围的草药味","bin":"earth","why":"书里的例子：草药撒在烛边，产生特定的魔法效果。","src":"p.22"},
        {"text":"你搓热手掌按在牛背上的热","bin":"earth","why":"水晶浸过盐水再按在病人身上，送进去的是大地力量。","src":"p.22"},
        {"text":"你安静开口请女神和男神的时候","bin":"divine","why":"神圣力量是个人力量与大地力量的显现，是诸神之内的能量。","src":"p.22"},
        {"text":"创造万物的那个源头","bin":"divine","why":"书里说它是创造一切存在的宇宙力量之源。","src":"p.22"}],
      "explain":"三条河不是三种咒语，是三种力气。它们常常一起用：你自己身上的、地上现成的、还有你开口请来的那一份。",
      "src":"Chapter 3 · p.21-22"
    },

    "t3_bill": {
      "kind":"sort",
      "title":"第三章 · 试炼 · 一张账单",
      "hint":"书里这个例子的八步，各在哪一段？",
      "bins":[
        {"id":"prep","label":"动手之前","tip":"先想清楚"},
        {"id":"rite","label":"仪式当中","tip":"一步一步"},
        {"id":"after","label":"最后收尾","tip":"把手松开"}],
      "items":[
        {"text":"定下目标：付掉这张账的途径","bin":"prep","why":"他的目标不是「一百块」，是「付掉这张账单的途径」——目标要小，要具体。","src":"p.23"},
        {"text":"清点材料：绿烛、绿墨水、羊皮纸","bin":"prep","why":"绿蜡烛、广藿香油、招财草药、羊皮纸、绿墨水，先看手里有什么。","src":"p.23"},
        {"text":"点女神与男神的蜡烛，默默祈请","bin":"rite","why":"不出声地请他们临在；再烧炭饼，撒肉桂和鼠尾草当招财香。","src":"p.23"},
        {"text":"画出账单，写清金额，画框打叉","bin":"rite","why":"画的时候观想这张纸就是账单；方框是掌控它，大叉是取消它。","src":"p.23"},
        {"text":"观想已付清，写下支票","bin":"rite","why":"观想自己翻支票簿，余额够，然后写下那张支票。","src":"p.24"},
        {"text":"抹油、点烛，把力气送进图里","bin":"rite","why":"从两端往中间抹，念那句祈请；火焰一亮，力气就释放进图画。","src":"p.24"},
        {"text":"烧掉图画，丢进小大釜","bin":"after","why":"最后一点力量被松开，去替他安排付账的方式。","src":"p.24"},
        {"text":"让蜡烛自己烧完","bin":"after","why":"不再管它，知道仪式会生效。","src":"p.24"}],
      "explain":"八步里没有一步是「求」。他做的是把散着的注意力收成一条线，钉在「付掉这张账」上：先想清楚要什么，再动手，最后松手。书里说，从他决定要做的那一刻起，就已经在做了。",
      "src":"Chapter 3 · p.23-24"
    },

    "t3_ethics": {
      "kind":"multi",
      "title":"第三章 · 试炼 · 哪些不能做",
      "q":"阿禾说：只要心诚，让谁爱上谁都行。书里明说威卡不做哪些魔法？",
      "options":["破坏性的魔法","操纵别人的魔法","剥削别人的魔法","帮自己下决心的魔法","让自己变勇敢的魔法","让别人替你拿主意的魔法"],
      "answers":[0,1,2],
      "explain":"书里的原话是破坏性、操纵性、剥削性三种。后三种不在禁止之列——但「让别人替你拿主意」不该由魔法来做，也不该由你做。阿禾要的那件事，正落在第二类里。",
      "src":"Chapter 3 · p.25"
    },

    "t3_price": {
      "kind":"quiz",
      "title":"第三章 · 试炼 · 一笔兽医钱",
      "questions":[
        {"q":"老陈说：「那本书要是真灵，你让它掉一笔钱下来。」你怎么答？",
         "options":["「书里那个例子的结果，是意外的或拖欠的钱。」","「行，明天就有。」","「书里的魔法只对信的人有用。」","「这得挑月相才灵。」"],
         "answer":0,
         "explain":"书里写的是：一两天到一周内，收到意外或拖欠的款项，或者以别的方式了结财务义务。","src":"p.24"},
        {"q":"老陈说：「那不就等于没用。」你怎么答？",
         "options":["「有用的那部分，是你自己去把钱要回来。」","「不是没用，是你心不诚。」","「那你别求我。」","「等你不怀疑了才有用。」"],
         "answer":0,
         "explain":"作者拿一张付不出的账单举例：他把注意力定在一件事上，然后照着去做。","src":"p.24"},
        {"q":"老陈说：「我不信这个。你别在我牛棚里弄。」你怎么答？",
         "options":["「行。牛棚里的事按兽医说的来。」","「你不信会倒霉。」","「我偷偷弄你也看不见。」","「不信的人会被反噬。」"],
         "answer":0,
         "explain":"书里既不吓人也不逼人。别怕魔法，也别拿魔法去吓别人。","src":"p.26"}],
      "explain":"老陈问的都是实在话。魔法不替他付钱，但它能让人把「付钱」这件事想清楚，然后动手。",
      "src":"Chapter 3 · p.23-26"
    }
  },

  sigils: {
    "rivers": {"name":"三条河","icon":"water","desc":"个人、大地、神圣。三条河从三个方向来。","src":"p.21-22"}
  },

  achv: {
    "c3_rivers": {"name":"分清三条河","desc":"把三种力量的来源都分清"}
  }
});
