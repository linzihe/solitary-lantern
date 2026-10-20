/* 第四章 · 十一件 —— 入口场景 c4_altar。资料：notes_ch1_4.md（第4章 Tools，p.27–38）。
 * 十一件工具：扫帚、魔杖、香炉、大釜、魔法刀、白柄刀、水晶球、杯、五芒星盘、影之书、铃。
 * 白先生第一次登场（村口集市）。末页跳到第五章 c5_dance。
 */
STORY_ADD({

  scenes: {

    /* ===================== 守灯人的桌子 ===================== */
    "c4_altar": {
      "title": "第四章 · 十一件", "bg": "altar", "music": "cottage",
      "script": [
        {"t":"intro","chapter":"第四章","title":"十 一 件","book":"第四章 Tools · 原书 p.27-38",
         "points":["守灯人的桌上摊着十一件工具","每一件都有自己的脾气","你要亲手扎一把扫帚","村口来了个卖原版书的货郎"]},

        {"t":"narr","text":"守灯人把桌布掀开一半，露出底下的桌面。东西摊了一排，墙角还靠着几件。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"今天不读书。今天认工具。"},
        {"t":"say","who":"player","name":"你","text":"十一件？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"十一件。先看，别急着往兜里揣。"},

        {"t":"explore","id":"c4_table","prompt":"桌面上摊着一排。先看哪一件？","need":4,"exitLabel":"看墙角那几件",
         "spots":[
           {"id":"censer","x":230,"y":30,"w":50,"h":130,"label":"香炉","script":[
             {"t":"narr","text":"一只黑陶碗，里面铺着半碗沙。一根线香插在沙里，烧到了三分之二，灰还没断。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"沙子吸热。买不到香炉，随便一个碗或杯子装半满的沙、半满的盐，一样用。"},
             {"t":"narr","text":"烟斜着往上走，走到一半散开，屋里的味道有点像晒过的干草。"},
             {"t":"codex","ids":["c4_censer"]}]},
           {"id":"cup","x":295,"y":85,"w":60,"h":75,"label":"杯","script":[
             {"t":"narr","text":"一只带脚的铜杯，杯口有一圈绿锈，杯底磨得发亮。"},
             {"t":"say","who":"player","name":"你","text":"这也是大釜？"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"带脚的大釜。它属水，象征女神和丰饶——可以盛水，也可以盛仪式上喝的东西。"},
             {"t":"codex","ids":["c4_cup"]}]},
           {"id":"athame","x":195,"y":165,"w":100,"h":45,"label":"魔法刀","script":[
             {"t":"narr","text":"一把双刃刀，柄是黑的。刃口是钝的，钝得有点刻意。"},
             {"t":"say","who":"player","name":"你","text":"这把切不动东西吧。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"它本来就不切东西。它导引仪式里唤起来的力气。"},
             {"t":"quote","text":"它很少用来祈请或呼唤诸神，因为它是命令与操纵力量的工具。我们宁愿祈请女神与男神。",
              "en":"It is seldom used to invoke or call upon the deities for it is an instrument of commanding and power manipulation. We'd rather invoke the Goddess and God.","cite":"Chapter 4 · p.33"},
             {"t":"codex","ids":["c4_athame"]}]},
           {"id":"pentacle","x":285,"y":155,"w":100,"h":55,"label":"五芒星盘","script":[
             {"t":"narr","text":"一块黄铜圆盘，扁扁的，正面刻着五条线连成的一颗星，刻痕里积着暗色的东西。"},
             {"t":"narr","text":"你把盘端起来对着窗，星的五个角一直连到盘边。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"铜的、木的、蜡的都有。刻的符号不必多，五芒星这一样就够了。"},
             {"t":"codex","ids":["c4_pentacle"]}]},
           {"id":"boline","x":150,"y":200,"w":48,"h":28,"label":"白柄刀","script":[
             {"t":"narr","text":"紧挨着那把黑柄刀，还有一把柄是白的，刃口很薄，刀背上一道明显的缺。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"这把是干活的：割魔杖、剪绳、在蜡烛上刻字。"},
             {"t":"narr","text":"她拿起来在指腹上试了试，又放回原处，柄朝着你的方向。"},
             {"t":"codex","ids":["c4_boline"]}]},
           {"id":"cauldron","x":60,"y":225,"w":70,"h":40,"label":"大釜","script":[
             {"t":"narr","text":"桌腿边蹲着一口小黑锅，铁的，三条腿，口比肚子窄一圈。"},
             {"t":"narr","text":"锅底有一层烧黑的印子，像被用过很多次，又很久没用。"},
             {"t":"quote","text":"理想情况下，大釜应当是铁制的，立在三只脚上，开口小于它最宽的部位。",
              "en":"Ideally speaking, the cauldron should be of iron, resting on three legs, with its opening smaller than its widest part.","cite":"Chapter 4 · p.32"},
             {"t":"codex","ids":["c4_cauldron"]}]}
         ]},

        {"t":"narr","text":"墙角还有几件，放得比桌上随意。桌上那排像是给人看的，这些像是给自己用的。"},

        {"t":"explore","id":"c4_far","prompt":"墙角和桌沿还有几件。看哪件？","need":3,"exitLabel":"看完了",
         "spots":[
           {"id":"besom","x":35,"y":40,"w":50,"h":195,"label":"扫帚","script":[
             {"t":"narr","text":"一把旧扫帚靠在墙边，柄是深色木头，扫头是细枝扎的，外面缠着已经发黄的柳条。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"开始之前先扫一圈。刷毛不必真的碰地。"},
             {"t":"quote","text":"因为它是净化者，扫帚与水元素相连。",
              "en":"Since it is a purifier, the broom is linked with the element of water.","cite":"Chapter 4 · p.28"},
             {"t":"codex","ids":["c4_broom"]}]},
           {"id":"wand","x":215,"y":115,"w":140,"h":16,"label":"魔杖","script":[
             {"t":"narr","text":"桌沿上横着一根直木，一头被手磨圆了，另一头还留着树皮。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"举着它开口，就是请；拿它在地上划一圈，就是画圈。"},
             {"t":"narr","text":"木头上没有上漆，摸上去比看上去暖一点。"},
             {"t":"codex","ids":["c4_wand"]}]},
           {"id":"crystal","x":355,"y":55,"w":55,"h":55,"label":"水晶球","script":[
             {"t":"narr","text":"一颗球，放在一小块绒布上。你指头按上去，玻璃面上留了一小片雾。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"这一颗是玻璃的。真的石英球凉得更久，价钱也吓人。"},
             {"t":"narr","text":"她把球转了半圈，绒布上的一点灰被带了下来。"},
             {"t":"codex","ids":["c4_crystal"]}]},
           {"id":"bos","x":370,"y":170,"w":90,"h":50,"label":"影之书","script":[
             {"t":"narr","text":"一本硬皮本子，书脊上贴着一张白纸，上面写着三个字：影之书。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"不是谁传给我的。我自己抄的，抄了半辈子。"},
             {"t":"quote","text":"别信大多数威卡书里的那种故事，说什么有一本唯一的影之书自古流传下来：每一个派别都说自己那本是原版，而它们全都不一样。",
              "en":"Don't believe the stories in most other Wiccan books that one single Book of Shadows has been handed down from antiquity, for each sect of Wicca seems to claim that their own is the original, and they're all different.","cite":"Chapter 4 · p.37"},
             {"t":"codex","ids":["c4_bos"]}]},
           {"id":"bell","x":345,"y":225,"w":45,"h":38,"label":"铃","script":[
             {"t":"narr","text":"一枚小铜铃，挂在桌边钉子上。铃身上有两处磨出来的亮斑，正好是手指捏的地方。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"铃是女性的象征，常用来请女神。也能标示一段的开始和结束。"},
             {"t":"narr","text":"她晃了一下。声音不大，屋里的安静被切开了一条缝。"},
             {"t":"codex","ids":["c4_bell"]}]}
         ]},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"十一件都看过了。你说，这些东西是干什么用的？"},
        {"t":"say","who":"player","name":"你","text":"……帮你做事的？"},
        {"t":"quote","text":"这些工具祈请诸神、驱散负面，并透过我们的触碰与意图来导引能量。",
         "en":"These tools invoke the deities, banish negativity, and direct energy through our touch and intention.","cite":"Chapter 4 · p.27"},
        {"t":"codex","ids":["c4_tools"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"注意最后三个字：意图。工具不替你做事，它替你省力气。"},
        {"t":"quote","text":"民间故事和迪士尼的推广，让千百万人知道大釜用来熬药水、魔杖能把单调的东西变漂亮。",
         "en":"Through the popularization of folktales and the work of Disney studios, millions know that cauldrons are used to brew up potions and that wands transform the drab into the beautiful.","cite":"Chapter 4 · p.27"},
        {"t":"say","who":"player","name":"你","text":"外面传的都是这些。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"传的人不知道后面的东西。这不怪他们。"},
        {"t":"say","who":"player","name":"你","text":"这些东西，你都是打哪儿弄来的？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"古董铺、旧货摊、交换会。也有托人从外地捎的。"},
        {"t":"narr","text":"她用袖子擦了一下铜盘正中的星，擦出来的亮线和旁边的暗色形成一道边。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"难找是真的。值得也是真的。"},
        {"t":"say","who":"player","name":"你","text":"那少几件，就做不成事了？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"作者说得很清楚：用得舒服就一直用，不想用也行。"},
        {"t":"narr","text":"她把桌上那排工具往两边分了分，中间空出一条窄窄的道，像给自己让路。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"现在对一对：这些东西各自管什么。别看错。"},
        {"t":"trial","id":"t4_tools"},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"不错。记住一句：刀不切东西，铃不催人，大釜不煮饭。"},
        {"t":"say","who":"player","name":"你","text":"那我先拿哪一件？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你自己伸手。伸向哪件，你心里就先欠着哪件。"},

        {"t":"choice","prompt":"桌面上的东西都在，你先伸手拿哪一件？","options":[
          {"text":"那把旧扫帚。","reply":"你握住柄，发现它比看上去轻。守灯人说：「先会扫，再学别的。」","flags":["c4_first_besom"]},
          {"text":"那根直木条。","reply":"你刚碰到它，守灯人说：「别急。它还没决定跟不跟你。」","flags":["c4_first_wand"]},
          {"text":"那本影之书。","reply":"你翻开第一页，上面只有一行字：「这是我自己抄的，你重抄一遍。」","flags":["c4_first_book"]}]},

        {"t":"narr","text":"她把那块黄铜圆盘推到你手边，正面朝上，星朝着你。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"盘子留给你。护符、草药、别人塞给你的东西，都先放它上面。"},
        {"t":"sfx","name":"shard"},
        {"t":"shard","id":"pent"},
        {"t":"think","text":"铜是凉的，可它压在手心里有点分量，不像一件摆设。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"桌上这些，都是我这些年攒的。你自己的那一件，得你自己做。"},
        {"t":"say","who":"player","name":"你","text":"哪一件？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"扫帚。斧子在门口，桦树在坡下。走吧。"},
        {"t":"scene","id":"c4_wood"}
      ]
    },

    /* ===================== 坡下的三棵树 ===================== */
    "c4_wood": {
      "title": "第四章 · 扎扫帚", "bg": "forest", "music": "forest",
      "script": [
        {"t":"narr","text":"坡下的林子。日头偏西，树影拉得很长，踩在落叶上会陷下去半寸。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"柄用梣木，扫头用桦枝，捆的用柳条。这是书里的老配方。"},
        {"t":"quote","text":"若你想自制魔法扫帚，可以试试这个古老的魔法配方：梣木杖柄、桦木细枝、柳条捆扎。",
         "en":"If you wish to make your magic broom, you might try the old magical formula of an ash staff, birch twigs, and a willow binding.","cite":"Chapter 4 · p.29"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"梣木护人，桦木净人，柳条是女神的。这三种木头的脾气，书里也写了。"},

        {"t":"explore","id":"c4_trees","prompt":"林子里三样材料都有。先看哪一样？","need":2,"exitLabel":"动手砍",
         "spots":[
           {"id":"ash","x":0,"y":40,"w":110,"h":180,"label":"梣树","script":[
             {"t":"narr","text":"左边这棵树皮发灰，纹路像一条条浅沟，摸上去干而硬。"},
             {"t":"narr","text":"你伸手比了比，够得着的那几根枝里有一根很直。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"就那一根。别砍最粗的，粗的它自己还要用。"}]},
           {"id":"birch","x":370,"y":40,"w":110,"h":190,"label":"桦树","script":[
             {"t":"narr","text":"右边那棵皮是白的，身上一道一道横纹，像被谁用指甲划过。"},
             {"t":"narr","text":"低处的细枝密，枝条很软，一握就弯成一把。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"桦枝做扫头，因为它干净。这一段是书里的原话，不是我加的。"}]},
           {"id":"willow","x":190,"y":190,"w":110,"h":70,"label":"柳条","script":[
             {"t":"narr","text":"小路尽头有一片湿处，柳条从那儿垂下来，皮是青的，掰一下就出白茬。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"柳条要趁软剥皮。干了就脆，捆不紧。"},
             {"t":"think","text":"三样东西，三棵树，还得先跟它们说一声。"}]}
         ]},

        {"t":"narr","text":"你握住那根最直的梣木枝，斧子举到一半，停住了。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"砍之前，有件事得做。书里特意写了一句。"},
        {"t":"quote","text":"当然，任何树或灌木的枝条都可以用来代替扫帚的木柄。（砍它的时候，谢谢这棵树作出的牺牲；可以用《草木魔法书》那一节里的话。）",
         "en":"Of course, a branch from any tree or bush can be used in place of the broom (while cutting it, thank the tree for its sacrifice, using such words as will be found in the \"An Herbal Grimoire\" section of The Standing Stones Book of Shadows, section III).","cite":"Chapter 4 · p.29"},
        {"t":"narr","text":"你对着那根枝站了一会儿。风把树上的叶子翻了个面。"},
        {"t":"say","who":"player","name":"你","text":"……谢谢你让出这一枝。"},
        {"t":"narr","text":"你说得很小声。树当然没回答。可你听见自己把话说完了。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"行了。砍吧，斜着下斧，别劈裂。"},
        {"t":"sfx","name":"step"},

        {"t":"narr","text":"斧子落了两下。梣木断开的时候，声音是脆的，不是闷的。"},
        {"t":"say","who":"player","name":"你","text":"然后呢？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你先说一遍顺序。说对了再动手，省得白砍。"},

        {"t":"trial","id":"t4_besom"},

        {"t":"narr","text":"桦枝理顺，分成两把。柳条剥了皮，绕上去，缠了三圈，打了个死结。"},
        {"t":"narr","text":"扫头用白柄刀削齐。你削得不平，一头长一头短。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"不平就不平。第一次做的扫帚，认得出手印才好。"},
        {"t":"sfx","name":"shard"},
        {"t":"shard","id":"besom"},
        {"t":"think","text":"柄上有一小段树皮我没削掉，摸上去粗糙。我故意留着的。"},

        {"t":"say","who":"player","name":"你","text":"还差一根魔杖。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"急不得。书里说，它会自己来找你。"},
        {"t":"quote","text":"起初别为找不到理想的魔杖发愁，它会来找你。我曾用一段甘草根当魔杖用了一阵，效果不错。",
         "en":"Don't worry about finding the ideal wand at first; one will come to you. I used a length of licorice root as a wand for a while and had good results with it.","cite":"Chapter 4 · p.30"},
        {"t":"narr","text":"她从口袋里摸出一段黑褐色的东西，塞给你。是甘草根，直得像根小棍。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"这个先拿着。不算数，但能用。"},
        {"t":"narr","text":"你把它握在手里，正好一手长，比想象中轻。"},
        {"t":"say","who":"player","name":"你","text":"那算数的那根，什么时候来？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你握过的东西多了，它就来了。"},
        {"t":"narr","text":"坡上传来跑步的声音，踩断了好几根枯枝。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"你们快上来！村口来了个货郎，说是祖传的影之书！"},
        {"t":"think","text":"「祖传」这两个字，她喊得比谁都响。"},
        {"t":"scene","id":"c4_market"}
      ]
    },

    /* ===================== 村口集市 ===================== */
    "c4_market": {
      "title": "第四章 · 村口集市", "bg": "village", "music": "cottage",
      "script": [
        {"t":"narr","text":"村口的路边围了一小圈人。中间铺着一块蓝布，布上摆着书、刀、黄纸和小铜器。"},
        {"t":"narr","text":"货郎穿一件干净的旧褂子，头发梳得很整齐，笑起来先看人的手。"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"小姑娘眼睛好。这本影之书，祖传原版，走遍三个省也找不出第三本。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"真的？"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"我祖父的祖父就在书里记过账。你看这皮子，这线，机器做不出来。"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"再看这把刀，开过光的。回去切草药，一刀就灵。"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"你要真想学，我这儿还有门路。入会三百，保你入门。"},
        {"t":"think","text":"三百块。他没说保的是什么门。"},
        {"t":"think","text":"书上写过一个卖刀的人吗？没有。可书上写过这种说法。"},
        {"t":"narr","text":"阿禾拽了拽你的袖子，声音压得很低：「他说的对不对？」"},

        {"t":"explore","id":"c4_stall","prompt":"蓝布上摆着几样。先看哪个？","need":3,"exitLabel":"跟他对一对",
         "spots":[
           {"id":"book","x":255,"y":155,"w":60,"h":45,"label":"影之书","script":[
             {"t":"narr","text":"书皮是真皮的，很新，边角硬得能划手。翻开来，字是印的，墨色还发亮。"},
             {"t":"think","text":"祖传的书，怎么会比我的鞋还硬。"},
             {"t":"say","who":"bai","name":"白先生","por":"bai","text":"旧东西得养。这书我养了二十年。"}]},
           {"id":"knife","x":330,"y":175,"w":55,"h":30,"label":"法刀","script":[
             {"t":"narr","text":"刀刃是亮的，很锋利，柄上缠着新红绳，绳头还带着毛。"},
             {"t":"think","text":"书里说魔法刀是钝的、双刃的、黑柄；切草药的是另一把白柄刀。"},
             {"t":"say","who":"bai","name":"白先生","por":"bai","text":"钝刀是给不懂的人用的。我这把，神都认。"}]},
           {"id":"incense","x":170,"y":145,"w":60,"h":40,"label":"香和符","script":[
             {"t":"narr","text":"一叠黄纸，上面印着看不懂的字。旁边一小包香，闻着像旧柜子。"},
             {"t":"say","who":"bai","name":"白先生","por":"bai","text":"买书送符三张。开过光的，贴门上挡邪。"},
             {"t":"think","text":"书里说香是给神看的，也说别用香去吓人。"}]},
           {"id":"crowd","x":60,"y":115,"w":55,"h":60,"label":"围观的人","script":[
             {"t":"narr","text":"两个人蹲着看。左边那个掏了钱，右边那个把手插在袖子里，一直没说话。"},
             {"t":"narr","text":"掏钱的那个把书抱在怀里，走的时候回头看了一眼，像是怕人反悔。"},
             {"t":"think","text":"白先生没骗他。他只是没说全。"}]},
           {"id":"bowl","x":150,"y":200,"w":60,"h":45,"label":"旧铜碗","script":[
             {"t":"narr","text":"布角上摆着几个小铜圈和一只旧铜碗，碗底有一圈黑，摸上去有细划痕。"},
             {"t":"say","who":"bai","name":"白先生","por":"bai","text":"这些是搭头，不值钱。看上哪个，说一声。"},
             {"t":"narr","text":"碗比书和刀都旧。它不像摆给人看的。"}]}
         ]},

        {"t":"say","who":"he","name":"阿禾","por":"he","text":"你别不说话啊。他那些到底行不行？"},
        {"t":"say","who":"player","name":"你","text":"书在我包里。我们一样一样对。"},
        {"t":"narr","text":"你想起守灯人那句话：你别问我，你翻到那一页看看。"},

        {"t":"trial","id":"t4_fake"},

        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"小姑娘，你懂行。"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"懂行的人，我更愿意交朋友。"},
        {"t":"narr","text":"他一点不生气，反而把书翻过来，让你看里面的印字。"},
        {"t":"think","text":"他不是坏人。他只是把价钱和故事捆在一处卖。"},

        {"t":"choice","prompt":"阿禾还看着你。你怎么回白先生？","options":[
          {"text":"「每一派都说自己那本是原版。」","reply":"他笑了一下：「话是这么说。可你手上那两页，也是别人抄的。」","insight":1,"flags":["c4_bai_callout"]},
          {"text":"「这本多少钱？我先翻两页。」","reply":"他把书往你这边推了推：「翻，随便翻。做生意的怕什么看。」","rel":{"bai":1},"flags":["c4_bai_check"]},
          {"text":"把阿禾拉到一边，小声说别买。","reply":"她哼了一声，跟着你退了两步，眼睛还盯着那本书。","rel":{"he":1},"flags":["c4_bai_quiet"]}]},

        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"这只铜碗算搭头。旧的，正经铜，你拿回去养着。"},
        {"t":"say","who":"player","name":"你","text":"多少钱？"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"不要钱。你以后要买什么，记得来找我。"},
        {"t":"narr","text":"你把碗接过来。它比看上去沉，碗沿有一处磕掉的缺口。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"他白送你东西？为什么。"},
        {"t":"say","who":"player","name":"你","text":"因为他想让我下次还来找他。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"……那也是本事。"},
        {"t":"narr","text":"回屋的时候，守灯人把那只碗翻过来看了一眼，没说话，先把它放在了窗台上。"},
        {"t":"think","text":"碗底那圈黑，看着像是有人长年用手指摩出来的。"},
        {"t":"scene","id":"c4_clean"}
      ]
    },

    /* ===================== 旧东西怎么养 ===================== */
    "c4_clean": {
      "title": "第四章 · 旧东西", "bg": "cottage", "music": "cottage",
      "script": [
        {"t":"narr","text":"碗放在窗台上，谁也没碰。天光慢慢斜过去，铜色由亮变暗。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"旧东西要先把前头的关联和力气剥掉。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你不知道上一个用它的人是谁，也不知道他拿它做过什么。"},
        {"t":"say","who":"player","name":"你","text":"怎么剥？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"先洗干净，晾干。然后挑一个办法。别拿它喝水试。"},
        {"t":"narr","text":"她起身去灶间提了半桶水，又端来一小碟盐，两样都放在桌上。"},

        {"t":"trial","id":"t4_purify"},

        {"t":"quote","text":"别把一块好木头泡水泡坏；同样，也别让别的东西接触盐而毁了表面。每件工具用最合适的办法。",
         "en":"Don't ruin a good piece of wood by wetting it; similarly, don't mar the finish of some other object by allowing it to contact salt.","cite":"Chapter 4 · p.38"},
        {"t":"codex","ids":["c4_purify"]},
        {"t":"say","who":"player","name":"你","text":"那这只碗呢？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"铜不怕水，也不怕盐。你自己挑，别问我。"},

        {"t":"choice","prompt":"这只旧铜碗，你打算怎么净化？","options":[
          {"text":"埋进盐里，放几天再说。","reply":"你去灶间拿了个旧盆，把碗埋进去，盐面抹平，像埋一颗种子。","insight":1,"flags":["c4_purify_bury"]},
          {"text":"泡进加了盐的水里，几小时。","reply":"你提来半桶水，撒了三撮盐，把碗沉下去。水面晃了几下就不动了。","flags":["c4_purify_water"]}]},

        {"t":"narr","text":"做完这件事，屋里就没什么可做的了。窗外有狗叫了一声，很远。"},
        {"t":"narr","text":"守灯人把你那把歪扫帚拿起来掂了掂，又挂回墙上。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"挂通风的地方。别靠灶，烤干了枝就脆。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"十一件你看完了。工具是配件，手才是要紧的。"},
        {"t":"say","who":"player","name":"你","text":"那我到底需要几件？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里没规定。有人用一辈子，只用得上三件。"},
        {"t":"say","who":"player","name":"你","text":"那要是买不起呢。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"攒工具是难事。书里说，这份难本身也算一道考验。"},
        {"t":"quote","text":"收集它们是件难事，但这可以看作对你威卡兴趣是否认真的一场魔法考验。",
         "en":"Gathering them is a problem, but this can be seen as a magical test of the seriousness of your Wiccan interest.","cite":"Chapter 4 · p.38"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"我再补一句。书的第三章里有一行，比这一章所有工具都重。"},
        {"t":"quote","text":"所以不管用哪一套体系，个人力量都必须先注入需要，然后被释放。",
         "en":"So no matter the magical system, personal power must be infused with the need and then released.","cite":"Chapter 3 · p.25"},
        {"t":"think","text":"桌上摊着十一件。可我手里最像工具的东西，是这根甘草根和那把歪扫帚。"},
        {"t":"narr","text":"阿禾在门外喊了一声，说白先生要走了，问她要不要那本书。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"她要买就让她买。钱是她的，主意也该是她的。"},
        {"t":"say","who":"player","name":"你","text":"那她要是后悔呢。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"后悔也是她自己的。你只能把你看到的那一页告诉她。"},
        {"t":"sfx","name":"chime"},
        {"t":"achv","id":"c4_eleven"},

        {"t":"journal","id":"j_c4","title":"第四章 · 本章笔记","lines":[
          "守灯人的桌上摊着十一件工具。我看了一下午，最记得的是那把不切东西的黑柄刀。",
          "书里说工具用来祈请、驱散、导引力气，靠的是触碰和意图。工具不替你做事。",
          "三种木头：梣木护人，桦木净人，柳条是女神的。砍枝前要谢谢那棵树的牺牲。",
          "我自己扎了一把扫帚，扫头削得一头长一头短。她说认得出手印才好。",
          {"when":"c4_first_wand","text":"我先伸手碰的是那根直木条。她说它还没决定跟不跟我。"},
          {"when":"c4_first_book","text":"我先翻开的是那本影之书。第一页只有一行字，让我重抄一遍。"},
          {"when":"c4_first_besom","text":"我先伸手拿的是那把旧扫帚。她说先会扫，再学别的。"},
          {"when":"c4_bai_callout","text":"村口的白先生说他的影之书是唯一的原版。我跟他说，每一派都这么说。"},
          {"when":"c4_bai_check","text":"白先生的书我没买，但我翻了两页。他倒是让我随便翻。"},
          {"when":"c4_bai_quiet","text":"我把阿禾拉到一边，让她别买。她嘴上不服，还是跟我退了。"},
          "旧东西要剥掉前一个主人的东西：先洗净晾干，再埋进土、沙或盐里，或者浸在加了盐的水里。",
          "书里提醒别把好木头泡水，也别让盐伤了器物的表面。每件工具用最合适的办法。",
          {"when":"c4_purify_water","text":"我把那只旧铜碗泡在盐水里。水面晃了几下就不动了。"},
          {"when":"c4_purify_bury","text":"我把那只旧铜碗埋进盐里，要等几天再看它。"},
          "我还没想明白：没有工具的时候，我到底算不算在做仪式。"
        ]},

        {"t":"fx","kind":"flash"},
        {"t":"finishChapter","id":"c4"},
        {"t":"chapter","title":"第五章","sub":"鼓 、 舞 与 手","en":"MUSIC, DANCE, AND GESTURE"},
        {"t":"scene","id":"c5_dance"}
      ]
    }
  },

  codex: {
    "c4_tools": {"cat":"第四章","title":"工具","en":"These tools invoke the deities...","text":"工具用来祈请诸神、驱散负面、靠触碰与意图导引能量。它们是配件，不是主人；用得舒服就一直用。","src":"p.27"},
    "c4_broom": {"cat":"第四章","title":"扫帚","en":"The Broom","text":"对男神和女神都神圣。属水，因为它是净化者，所以也用于爱情和灵视一类的咒语。","src":"p.27-29"},
    "c4_wand": {"cat":"第四章","title":"魔杖","en":"Wand","text":"用了数千年，是祈请的工具；也用来导引能量、在地上画圈。对部分威卡人代表风，献给男神。","src":"p.29-30"},
    "c4_censer": {"cat":"第四章","title":"香炉","en":"Censer","text":"可以是教堂那种吊炉，也可以是一枚贝壳。买不到就用碗装半满的沙或盐；室内仪式没有香就不完整。","src":"p.30-31"},
    "c4_cauldron": {"cat":"第四章","title":"大釜","en":"Cauldron","text":"女巫最典型的工具，象征女神、水、转世与灵感。理想形制是铁制、三足、开口小于最宽处。","src":"p.31-33"},
    "c4_athame": {"cat":"第四章","title":"魔法刀","en":"Magic Knife","text":"不用于切割，而是导引仪式中唤起的能量；很少拿来祈请诸神，因为它是命令与操纵力量的工具。属火。","src":"p.33"},
    "c4_boline": {"cat":"第四章","title":"白柄刀","en":"White-Handled Knife","text":"干活的刀：割魔杖、刻符号、剪绳。白柄是为了跟魔法刀分开；作者认为只要用于仪式目的就够了。","src":"p.33-34"},
    "c4_crystal": {"cat":"第四章","title":"水晶球","en":"Crystal Sphere","text":"用于沉思式占卜。球形属女神。真的石英球靠高价、内含物和冰冷的触感分辨；定期晒月光或用艾草擦。","src":"p.34-35"},
    "c4_cup": {"cat":"第四章","title":"杯","en":"Cup","text":"就是带脚的大釜，象征女神与丰饶，属水。可以盛水，也可以盛仪式上喝的饮料。","src":"p.35"},
    "c4_pentacle": {"cat":"第四章","title":"五芒星盘","en":"Pentacle","text":"一块扁平的黄铜、木或蜡，刻上五芒星。属土，用来放待祝圣的护符，也挂在门窗上保护家。","src":"p.36"},
    "c4_bos": {"cat":"第四章","title":"影之书","en":"The Book of Shadows","text":"记录祈请文、仪式、咒语和规则的本子。今天绝大多数由个人自己编写，用三孔活页夹也很常见。","src":"p.37"},
    "c4_bell": {"cat":"第四章","title":"铃","en":"Bell","text":"女性的象征，常用来请女神；也用来驱邪、止住风暴、标示仪式的段落。任何种类的铃都可以。","src":"p.38"},
    "c4_purify": {"cat":"第四章","title":"旧物净化","en":"preparing old tools","text":"旧的工具要剥掉旧的关联：先洗净晾干，再埋进土、沙或盐里几天，或浸在加了盐的水里几小时。","src":"p.38"}
  },

  trials: {
    "t4_tools": {
      "kind":"match",
      "title":"第四章 · 试炼 · 一件一件对",
      "pairs":[
        {"left":"扫帚","right":"扫掉场地上的积垢","note":"刷毛不必真的碰地，扫的是星光层的积垢。"},
        {"left":"魔杖","right":"举起来祈请、导引","note":"祈请的工具，也能在地上画圈。"},
        {"left":"香炉","right":"烧香，看烟慢慢散","note":"室内仪式没有香就不完整。"},
        {"left":"大釜","right":"装水占卜、象征女神","note":"转化发生的地方；也象征水、转世、灵感。"},
        {"left":"魔法刀","right":"导引力气，绝不切割","note":"它是命令与操纵力量的工具，所以很少用来祈请。"},
        {"left":"影之书","right":"自己抄的仪式本子","note":"不是自古流传的孤本，各派都说自己那本是原版。"}],
      "explain":"十一件里，每一件管的都不是同一件事。分清楚它们各自管什么，比记住名字有用得多。",
      "src":"Chapter 4 · p.27-37"
    },

    "t4_besom": {
      "kind":"quiz",
      "title":"第四章 · 试炼 · 扎一把扫帚",
      "questions":[
        {"q":"书里那个做魔法扫帚的老配方是什么？",
         "options":["梣木柄、桦木细枝、柳条捆扎","橡木柄、松针、麻绳","柳木柄、梣枝、桦树皮","竹柄、棕毛、铁丝"],
         "answer":0,
         "explain":"梣木主保护，桦木主净化，柳木献给女神。","src":"p.29"},
        {"q":"砍下那根枝条的时候，书里要你做哪件事？",
         "options":["谢谢这棵树作出的牺牲","先在树皮上刻自己的名字","只砍朝北的那一根","砍完把树桩烧掉"],
         "answer":0,
         "explain":"书里说，砍的时候要感谢树的牺牲；用别的树或灌木的枝条也行。","src":"p.29"},
        {"q":"扫帚在书里被归到哪个元素？",
         "options":["水","火","风","土"],
         "answer":0,
         "explain":"因为它是净化者，所以跟水相连，也用在爱情和灵视这类水系的咒语里。","src":"p.28"},
        {"q":"仪式前扫场子，扫帚的刷毛必须扫到地上吗？",
         "options":["不必，扫的是积下来的东西","必须扫到地上没有灰","要在地上扫出九道痕","只有满月那晚才扫"],
         "answer":0,
         "explain":"书里说刷毛不必触地：一边扫一边观想，把住人的地方积下来的东西扫出去。","src":"p.28"}],
      "explain":"一把扫帚要用三种木头：硬的做柄，软的做扫头，韧的做捆绳。这不是讲究，是老配方里各自的分工。",
      "src":"Chapter 4 · p.28-29"
    },

    "t4_fake": {
      "kind":"sort",
      "title":"第四章 · 试炼 · 祖传与开光",
      "hint":"白先生说的话，书里站得住脚吗？",
      "bins":[
        {"id":"yes","label":"书里说得通","tip":"作者写过"},
        {"id":"no","label":"书里没这回事","tip":"听着像生意"}],
      "items":[
        {"text":"有一本唯一的、自古传下来的原版影之书","bin":"no","why":"书里叫人别信这种故事：每个派别都说自己那本是原版，而它们全都不一样。","src":"p.37"},
        {"text":"魔法刀开过光，切草药一刀就灵","bin":"no","why":"魔法刀不用于切割，也很少用来祈请；切草药、刻符号是白柄刀的活。","src":"p.33"},
        {"text":"旧工具要先把前一个主人的关联和力气剥掉","bin":"yes","why":"你不知道前主人是谁、拿它做过什么，所以要净化。","src":"p.38"},
        {"text":"木头工具泡在水里几天最干净","bin":"no","why":"书里特意提醒：别把一块好木头泡水泡坏。","src":"p.38"},
        {"text":"工具用得舒服就一直用，不必非用到不用为止","bin":"yes","why":"作者说，也许只要你用得舒服，就一直用下去更好。","src":"p.27"},
        {"text":"买不到香炉，用碗装半满的沙或盐也行","bin":"yes","why":"沙或盐吸热；线香插进盐里，塔香放在表面上。","src":"p.30"},
        {"text":"大釜最好是铁的、三只脚、口比肚子窄","bin":"yes","why":"书里就是这么写理想形制的，还承认它难找。","src":"p.32"},
        {"text":"影之书要买贵的、开过光的才灵","bin":"no","why":"任何空白本都能做；用三孔活页夹、随时增删都很常见。","src":"p.37"}],
      "explain":"白先生的货不是假的，他的话有一半是真的。分辨的办法不是看他的脸，是翻书：书里写过什么，没写过什么。",
      "src":"Chapter 4 · p.27-38"
    },

    "t4_purify": {
      "kind":"multi",
      "title":"第四章 · 试炼 · 旧物净化",
      "q":"一件旧工具要净化。书里认可哪几种做法？",
      "options":["先用合适的方法洗干净，晾干","埋进土里或沙、盐里放几天","浸在海、河、湖或加了盐的水里几小时","把好木头泡在水里几天","用盐把每件器物的表面都搓一遍","挖出来擦干净，必要就重做一次","先在火里烧红再浸水"],
      "answers":[0,1,2,5],
      "explain":"书里给了两条路：埋几天，或者浸几小时。木头别泡水，盐也可能伤某些器物的表面，所以每件工具挑最合适的办法，不够就重做。",
      "src":"Chapter 4 · p.38"
    }
  },

  sigils: {
    "pent": {"name":"五芒星","icon":"pentacle","desc":"黄铜圆盘，刻着五条线连成的星。","src":"p.36"},
    "besom": {"name":"扫帚","icon":"wand","desc":"自己扎的：梣木柄、桦枝、柳条捆。","src":"p.29"}
  },

  achv: {
    "c4_eleven": {"name":"十一件","desc":"把十一件工具都看了一遍"}
  }
});
