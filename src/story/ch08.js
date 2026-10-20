/* 第八章 · 一年之轮（The Days of Power）
 * 作者 D。资料：notes_ch8_10.md（第8章 p.65-71 + 第三部分节日习俗 p.137-150）。
 * 一条主线：从冬至走到萨温，八个节日各一个场景，人物的线穿过这一整年。
 */
STORY_ADD({

  scenes: {

    /* ===================== 冬至 · Yule ===================== */
    "c8_wheel": {
      title: "第八章 · 冬至", bg: "winter", music: "wheel",
      script: [
        {"t":"intro", "chapter":"第八章", "title":"一 年 之 轮", "book":"第八章 The Days of Power · 原书 p.65-71 与第三部分节日习俗",
         "points":["十三个满月加八个节日，一共二十一次","从冬至走到萨温，每个节日都有手上的事","阿禾的这一年，会在萨温那天拐一个弯","年轮不是背下来的，是过出来的"]},
        {"t":"narr","text":"雪停了三天。石圈里的雪被扫出一条路，从南边那块石头一直通到中间。"},
        {"t":"narr","text":"守灯人蹲在大釜边往里添木柴。火很小，但在雪地里亮得刺眼。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"手套戴上。今天先不读书，我们点一把火。"},
        {"t":"say","who":"player","name":"你","text":"冬至？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"冬至。一年里最长的一个夜，也是最短的一个白天。"},
        {"t":"narr","text":"她把一根粗木头架进釜里，火星往上跳了一下，又落下。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你先看看这儿的东西。看完了我再跟你算一笔账。"},

        {"t":"explore","id":"c8_yule","prompt":"雪地里摆着几样东西。先看哪个？","need":3,"exitLabel":"看完了",
         "spots":[
           {"id":"cauldron","x":300,"y":140,"w":56,"h":48,"label":"大釜","script":[
             {"t":"narr","text":"釜是黑的，边上有一圈被火燎过很多年的痕迹。"},
             {"t":"narr","text":"里面垫着一层灰，灰上架着一块还没烧透的松木。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"今晚它是女神的。火生在它里面，就是生在女神里面。"},
             {"t":"codex","ids":["yulebirth"]}]},
           {"id":"log","x":128,"y":150,"w":56,"h":44,"label":"柴堆","script":[
             {"t":"narr","text":"柴堆里有橡木，也有松木，都劈得差不多长。"},
             {"t":"narr","text":"最上面一根的侧面用粉笔画了半个圈——画到一半，雪把粉擦掉了一角。"},
             {"t":"narr","text":"那是一个太阳。守灯人蹲下去，把那半个圈补齐了。"}]},
           {"id":"pine","x":130,"y":100,"w":60,"h":60,"label":"松枝","script":[
             {"t":"narr","text":"松枝是刚从坡上折下来的，针叶上还挂着雪。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"常青的东西放在祭坛上，因为它一年到头都不肯死。"},
             {"t":"narr","text":"她说这话的时候没抬头，语气像在讲一件很普通的事。"}]},
           {"id":"moon","x":208,"y":20,"w":64,"h":64,"label":"月亮","script":[
             {"t":"narr","text":"月亮很薄，边缘发毛，像被雪擦过一遍。"},
             {"t":"think","text":"冬至前的那次满月，就在几天前。"},
             {"t":"narr","text":"你想起了那晚的小饼和柠檬水，还有你站在圈里时手心的汗。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"满月是另一条线，今晚不算它。今晚算太阳。"}]},
           {"id":"road","x":40,"y":130,"w":60,"h":50,"label":"来路","script":[
             {"t":"narr","text":"坡下的雪面上有一串脚印，从村口一直连到这儿。"},
             {"t":"narr","text":"脚印不大，踩得很急，有两步几乎踩到一起。"},
             {"t":"think","text":"像是有人跑上来的。"}]}
         ]},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"现在算账。这一年，我们要做几次仪式？"},
        {"t":"say","who":"player","name":"你","text":"……满月一次，加上今天这种？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"十三个满月，八个节日。二十一次。"},
        {"t":"quote","text":"威卡的宗教历包含十三个满月庆典和八个 sabbat，即「力量之日」。",
         "en":"The Wiccan religious calendar contains thirteen full moon celebrations and eight sabbats or days of power.","cite":"Chapter 8 · p.65"},
        {"t":"codex","ids":["wheel21"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"八个里面，四个按至日和分日定。另外四个，是更老的民俗节。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"名字是凯尔特的名字。不是只有这一种叫法，书里也这么写。"},
        {"t":"codex","ids":["sabbat","esbat"]},
        {"t":"say","who":"player","name":"你","text":"为什么都在夜里？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"一半是实际原因，一半是神秘感。作者原话。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"他还说，sabbat 本来是太阳的节日，正午或黎明更自然——但今天很少有人这么做。"},
        {"t":"quote","text":"这些仪式为威卡之年带来结构与秩序，也提醒我们那无尽的循环在我们离去后仍将长久延续。",
         "en":"The rituals give structure and order to the Wiccan year, and also remind us of the endless cycle that will continue long after we're gone.","cite":"Chapter 8 · p.65"},
        {"t":"narr","text":"坡下传来脚步声。有人踩着雪往上跑，跑得不太稳。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我在家就看见火了。你们在这儿烧什么？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你自己的手套呢？"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"……忘了。"},
        {"t":"say","when":["c6_invite_he","!c7_he_sent"],"who":"he","name":"阿禾","por":"he","text":"上次看你们做满月，我回去想了好久。这次我不捣乱，我就在边上看。"},
        {"t":"narr","text":"她把手伸到火上面，隔着半尺，不敢再近。"},
        {"t":"choice","prompt":"阿禾问：「一年真有八个这样的日子？」","options":[
          {"text":"「对。下一个是二月二，点灯的日子。」","reply":"她掰着手指头数了一遍，数到第八个的时候停住了，又从头数。","flags":["c8_he_count"]},
          {"text":"「你先过来烤火，我慢慢说。」","reply":"她挪近半步，两只手都伸出来了，指尖还是白的。","rel":{"he":1}},
          {"text":"「书在我包里。你自己翻。」","reply":"她真的翻了，翻到一半就开始念下一句，念错了两个名字。","insight":1,"flags":["c8_he_read_bos"]}]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"别背。背下来的东西，到时候你认不出来。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"今天是第一个。名字叫 Yule，冬至。"},
        {"t":"quote","text":"女神在 Yule（约 12 月 21 日）生下一个儿子——男神。",
         "en":"The Goddess gives birth to a son, the God, at Yule (circa December 21).","cite":"Chapter 8 · p.67"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"这一夜最长，所以古时候的人就点火，催太阳回来。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"那太阳就是那个儿子？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，男神也是太阳。所以这一天，太阳和他一起重生。"},
        {"t":"quote","text":"对当代威卡而言，它提醒我们：死亡的最终产物是重生——在这动荡的日子里，这是令人安慰的想法。",
         "en":"To contemporary Wiccans it is a reminder that the ultimate product of death is rebirth, a comforting thought in these days of unrest.","cite":"Chapter 8 · p.67"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"……死亡的最终产物是重生。"},
        {"t":"narr","text":"她把这句话重复了一遍，声音比刚才低，像是在记什么别的东西。"},
        {"t":"think","text":"她今天不太一样。"},

        {"t":"bg","name":"yule"},
        {"t":"narr","text":"回到屋里，壁炉里已经架好了那根松木。侧面一个粉笔画的太阳。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"冬至木。刻一道太阳，黄昏点它。你画，还是我画？"},
        {"t":"narr","text":"你把粉笔接过来，把刚才被雪擦掉的半个圈补齐了。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"点吧。用长火柴，别烫着手。"},
        {"t":"narr","text":"火是从木头中间烧起来的。松脂噼啪响，太阳那一道亮得最快。"},
        {"t":"sfx","name":"chime"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"点着之后，心里想一件事就行。想春天。"},
        {"t":"codex","ids":["yulelog"]},
        {"t":"narr","text":"阿禾蹲在壁炉前面，一直看到那半个圈烧成了黑边。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"下一个是二月二号，圣烛节。到那天，村里会有事。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"回去吧。路上踩亮的地方，那是冰。"},
        {"t":"scene","id":"c8_imbolc"}
      ]
    },

    /* ===================== 圣烛节 · Imbolc ===================== */
    "c8_imbolc": {
      title: "第八章 · 圣烛节", bg: "cottage", music: "cottage",
      script: [
        {"t":"narr","text":"二月二号，天刚擦黑。有人拍门，拍得很急，一下接一下。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"你在不在？牛要生了。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"……兽医在镇上。雪把路封了。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"你那个老师，她在不在家。"},
        {"t":"think","text":"他连「守灯人」这三个字都不肯说出口。"},
        {"t":"narr","text":"你披上衣服跟他走。半路上，守灯人已经提着灯在前面等了。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"我听见了。走吧。"},
        {"t":"narr","text":"牛棚在他家灶间外头。他让你先进去坐着，别站在门口挡风。"},

        {"t":"explore","id":"c8_barn","prompt":"灶间里点着一盏灯。你先看什么？","need":3,"exitLabel":"去看牛",
         "spots":[
           {"id":"stove","x":0,"y":90,"w":80,"h":160,"label":"灶火","script":[
             {"t":"narr","text":"灶膛里的火压得很低，上面坐着一壶水，壶盖一直在抖。"},
             {"t":"narr","text":"老陈往里面添了两块柴，又把壶往火边挪了挪。"},
             {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"烧着水，一会儿要洗手。你别嫌烟大。"}]},
           {"id":"lamp","x":300,"y":55,"w":110,"h":110,"label":"油灯","script":[
             {"t":"narr","text":"窗台上有一盏玻璃油灯，灯芯剪得很齐，玻璃擦得没有灰。"},
             {"t":"think","text":"这盏灯平时应该不点吧。"},
             {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"……今晚特殊。你别说出去。"}]},
           {"id":"herb","x":95,"y":25,"w":200,"h":90,"label":"挂的草","script":[
             {"t":"narr","text":"房梁上吊着几把干草，颜色发灰，捆得整整齐齐。"},
             {"t":"narr","text":"最靠里那把，叶子上还有细小的白花。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"他媳妇生前挂的。他一直没取下来。"},
             {"t":"think","text":"屋里安静了一下，只有水壶在响。"}]},
           {"id":"calf","x":290,"y":170,"w":130,"h":60,"label":"草堆","script":[
             {"t":"narr","text":"靠墙堆着一人高的干草，边上铺了一块洗过的旧毡子。"},
             {"t":"narr","text":"毡子上压着几个发黄的印子，是很久以前留下的。"},
             {"t":"narr","text":"今晚，这块毡子会有新的用处。"}]}
         ]},

        {"t":"narr","text":"忙到后半夜。守灯人卷着袖子，老陈一直蹲在牛旁边，一句话不说。"},
        {"t":"narr","text":"小牛出来的时候是一团湿的。它趴了十分钟，试着往前一顶，又摔下去。"},
        {"t":"narr","text":"第二次它站住了，四条腿全在抖，但站住了。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"……站起来了。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"我盯了一晚上，就为看这个。"},
        {"t":"narr","text":"他伸手想摸小牛的背，摸到一半又收回去，先在裤子上把手擦干净了。"},
        {"t":"rel","who":"chen","n":1},
        {"t":"set","flags":["c8_imbolc_birth"]},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"今天是产犊的节。名字叫 Imbolc，老话的意思是「在肚子里」。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里写，这时候女神刚生完，在休息。白天变长了，她在慢慢醒。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"所以老规矩是：日落的时候，把家里每一盏灯都点亮。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"哪怕就亮一会儿。为的是迎太阳回来。"},
        {"t":"quote","text":"在这里，火既代表光与温暖，也同样代表我们自身的启迪与灵感。",
         "en":"Fire here represents our own illumination and inspiration as much as light and warmth.","cite":"Chapter 8 · p.68"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"全点？那得费多少油。"},
        {"t":"narr","text":"他嘴上这么说，手已经开始动了。"},
        {"t":"narr","text":"灶台上的点上，窗台上的点上，他自己房里那盏也点上。"},
        {"t":"narr","text":"最后只剩炕头一盏。他站在那儿，手搭在灯罩上，没动。"},
        {"t":"choice","prompt":"灯都亮着。老陈站在门口问：「这些东西，真有用？」","options":[
          {"text":"「没用。但今晚我不想让它黑着。」","reply":"他看了你一眼，回头把那最后一盏也点上了。","rel":{"chen":1},"flags":["c8_honest"]},
          {"text":"「书里说，今晚点亮的每一盏都算给太阳的。」","reply":"他从鼻子里哼了一声。灯没吹。","flags":["c8_bookanswer"]},
          {"text":"什么也不说，把最后一盏灯点上，递给他。","reply":"他接过去，往炕头一放，说了句「行吧」。","rel":{"chen":1},"flags":["c8_lampquiet"]}]},
        {"t":"codex","ids":["imbolclamp"]},
        {"t":"narr","text":"满屋子的光，其实没比刚才亮多少。但屋里的墙看着不一样了。"},
        {"t":"narr","text":"守灯人推开门，门口一片白，雪还在下，很细。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"出来。用你写字的那只手，在雪上画一个太阳。"},
        {"t":"narr","text":"你从肩膀起手，一笔一笔往外推，雪面上留下一道凹下去的圈。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"别描。推出去。这是给太阳的，不是给你自己看的。"},
        {"t":"narr","text":"画完之后，那个圈开始慢慢塌。雪还在下，它撑不了多久。"},
        {"t":"say","when":"c8_honest","who":"chen","name":"老陈","por":"skeptic","text":"……你画的这个，明天早上就没了。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"还有一句，你记着就行。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，圣烛节是传统的入会时节。自我献身这种事，可以挑这一天做，也可以重做。"},
        {"t":"say","who":"player","name":"你","text":"入会……我能吗？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"不是今天的事。今天只是让你知道，一年里有这么一天。"},
        {"t":"think","text":"她说完就进屋了，好像那句话并不重要。"},
        {"t":"codex","ids":["imbolcdoor"]},
        {"t":"scene","id":"c8_ostara"}
      ]
    },

    /* ===================== 春分 · Ostara ===================== */
    "c8_ostara": {
      title: "第八章 · 春分", bg: "spring", music: "forest",
      script: [
        {"t":"narr","text":"三月底。雪化透了，路边翻出黑土，踩上去会陷下去半寸。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"今天白天和夜里一样长。从现在起，光在压过黑。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，女神从睡里迸出来了，把整个大地铺满。"},
        {"t":"say","who":"player","name":"你","text":"那男神呢？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"他醒了，伸了个懒腰，急着往外长。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"今天是春分，Ostara。第一步：去采花。"},

        {"t":"explore","id":"c8_flowers","prompt":"林边小路上，花开得到处都是。先看哪儿？","need":3,"exitLabel":"动手采",
         "spots":[
           {"id":"light","x":140,"y":40,"w":60,"h":140,"label":"光柱","script":[
             {"t":"narr","text":"树缝里落下一道光，正好斜切在小路边那丛花上。"},
             {"t":"narr","text":"光里的浮尘一直在动，好像有人把水搅了一下。"},
             {"t":"think","text":"守灯人往那边点了点头，没说话。"}]},
           {"id":"fern","x":10,"y":215,"w":60,"h":50,"label":"蕨叶","script":[
             {"t":"narr","text":"蕨叶还卷着，一圈一圈没展开，像攥紧的拳头。"},
             {"t":"narr","text":"你碰了一下，它弹回来，凉丝丝的。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"再过十天，它就摊平了。现在它是攒着的。"}]},
           {"id":"mush","x":80,"y":205,"w":40,"h":30,"label":"蘑菇","script":[
             {"t":"narr","text":"一小簇棕色的蘑菇，长在烂木头边上，帽子上还带着水。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"不认识的就别采。这条比什么节日都硬。"},
             {"t":"narr","text":"她说完，把蘑菇旁边的枯叶拨开了些，让它们透透气。"}]},
           {"id":"path","x":190,"y":190,"w":110,"h":70,"label":"小路","script":[
             {"t":"narr","text":"小路一直通向林子深处，被去年的叶子盖着，看不太清。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，春天该走一走这样的路。不为什么，就当它本身是一场仪式。"},
             {"t":"think","text":"不为什么的一次散步，居然也算。"}]}
         ]},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"采之前，先谢过花。谢它把命让出来。"},
        {"t":"narr","text":"你弯下腰，说了一句很短的话，短到你自己都有点不好意思。"},
        {"t":"narr","text":"然后你采了三枝：一枝黄的，一枝白的，一枝说不上什么颜色。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"回家查它们的含义。用书也行，用直觉也行，用灵摆也行。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里有一句挺有意思：你随手挑的花，露的是你自己心里的事。"},
        {"t":"codex","ids":["ostaraflower"]},
        {"t":"think","text":"我挑的那枝白花，是什么意思？"},
        {"t":"narr","text":"阿禾从坡上下来，怀里抱着一个粗陶盆，盆里是黑土。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我种三颗。一颗香草，一颗花，还有一颗我不告诉你。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"……你别问，问了我也不会说。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"今天种下去的东西，是留给以后收的。"},
        {"t":"choice","prompt":"阿禾把一把种子倒在手心里，分你一半。你种什么？","options":[
          {"text":"一盆罗勒。能吃，也能用。","reply":"你把种子按进土里，按得很浅。阿禾说太浅了，又帮你盖上一层。","flags":["c8_plant_herb"]},
          {"text":"一盆花。不开也不亏，开了更好。","reply":"你挑了颜色最深的那几颗。阿禾说，你挑得像在挑衣服。","flags":["c8_plant_flower"]},
          {"text":"先不种，看她种完再说。","reply":"她种得很慢，一颗一颗地摆，摆得比谁都认真。","insight":1,"flags":["c8_plant_none"]}]},
        {"t":"narr","text":"你们把三个盆并排放在墙根下。太阳斜过来，盆沿上有一条亮线。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我今天没许愿。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"上次我想让人帮我做一件事，后来我想了想，觉得不对。"},
        {"t":"narr","text":"她说完就低头看土，好像那句话是种下去的第四颗种子。"},
        {"t":"rel","who":"he","n":1},
        {"t":"scene","id":"c8_beltane"}
      ]
    },

    /* ===================== 五朔节 · Beltane ===================== */
    "c8_beltane": {
      title: "第八章 · 五朔节", bg: "beltane", music: "dawn",
      script: [
        {"t":"narr","text":"四月三十，天还没亮透。山谷里的花开了一层，白得像撒了盐。"},
        {"t":"narr","text":"坡下的空地上立着一根新削的木杆，比房梁还高，顶上还带着树皮。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"花和绿叶是女神，杆子是男神。"},
        {"t":"quote","text":"花与绿叶象征女神，五月柱象征男神。Beltane 标志着活力、激情与得以实现的希望的回归。",
         "en":"The flowers and greenery symbolize the Goddess; the May pole the God. Beltane marks the return of vitality, of passion and hopes consummated.","cite":"Chapter 8 · p.69"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"故事讲到这儿：男神成年了，他想要女神，两个人在一起。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，花和绿枝是黎明去采的。现在去还来得及。"},

        {"t":"explore","id":"c8_may","prompt":"空地上一片忙。你先看哪儿？","need":3,"exitLabel":"去编彩带",
         "spots":[
           {"id":"pole","x":230,"y":30,"w":50,"h":150,"label":"五月柱","script":[
             {"t":"narr","text":"木杆上缠着几条彩带，缠得还不匀，有的紧有的松。"},
             {"t":"narr","text":"杆底压着一圈石头，防止风把它吹倒。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，今天更常见的其实不是杆子，是圈里放一口大釜。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"都是象征。喜欢哪个用哪个。"},
             {"t":"codex","ids":["beltane"]}]},
           {"id":"basket","x":20,"y":80,"w":200,"h":80,"label":"花篮","script":[
             {"t":"narr","text":"篮子里是刚采的花，带着露水，重的在下，轻的在上。"},
             {"t":"narr","text":"有一个人把整枝的绿枝插在篮边上，那是给门框留的。"},
             {"t":"think","text":"去年的这个时候，我大概还在嫌这些事没意思。"}]},
           {"id":"sun","x":330,"y":130,"w":60,"h":50,"label":"日出","script":[
             {"t":"narr","text":"太阳从东边的山口里出来，先照到的是那根杆子的顶。"},
             {"t":"narr","text":"一整条山谷被光扫过去，花先亮，草后亮。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"看一会儿。这个不用我讲。"}]},
           {"id":"lake","x":150,"y":180,"w":250,"h":45,"label":"湖面","script":[
             {"t":"narr","text":"坡下的湖面很平，把光摊成一片。"},
             {"t":"narr","text":"水边站着两个人，正在往水里丢花瓣，丢一下，看一会儿。"},
             {"t":"think","text":"谁都没在赶时间。"}]}
         ]},

        {"t":"narr","text":"空地边上有人摆了个摊。蓝布，箱子，一只招手的木牌。"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"哟，是你。我这儿有新到的货。"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"标准五月柱套装，还有开过光的彩带。带子上的颜色是有讲究的。"},
        {"t":"narr","text":"他把一捆彩带抖开。颜色很亮，亮得有点刺眼。"},
        {"t":"choice","prompt":"他把彩带递到你面前。你怎么回？","options":[
          {"text":"「书里说，今天更常见的是大釜。」","reply":"他愣了半秒，马上说大釜他也有，就是贵一点，要预定。","flags":["c8_bai_schooled"]},
          {"text":"「我今年自己编，不买。」","reply":"他把彩带收回去，笑了一下，笑得并不难看。","flags":["c8_bai_refuse"]},
          {"text":"拉着阿禾走开，不接他的话。","reply":"走出去十步，他还在后面喊「价钱好商量」。","rel":{"bai":-1}}]},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"你们这些人啊，什么都自己来。"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"行吧。要什么想清楚了再来找我，我这两天都在。"},

        {"t":"narr","text":"阿禾坐在石头上编彩带。手很快，但一直在返工。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"第三遍了。它就是会自己散。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，编织和编辫子是这几天的传统手艺。散是正常的。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"散是正常的……」"},
        {"t":"narr","text":"她低头又编了一遍。这一遍编得很慢，编到最后没有散。"},
        {"t":"narr","text":"她把彩带举起来看，看得有点久。"},
        {"t":"rel","who":"he","n":1},
        {"t":"set","flags":["c8_he_braid"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"再做一个小信物，挂到那棵树上去。给谁都行，给自己也行。"},
        {"t":"choice","prompt":"你手边有这几样东西。拿什么做信物？","options":[
          {"text":"香花袋。装一把刚才采的花。","reply":"你把花按进布里，扎口的时候用力过猛，袋口有点歪。","flags":["c8_token_bag"]},
          {"text":"木片。用白柄刀刻两个字。","reply":"刻到第二个字的时候刀滑了一下，那一撇刻深了。你没重刻。","flags":["c8_token_wood"]},
          {"text":"一串珠子。按颜色排队。","reply":"你排了三次，最后放弃了颜色，随手串上。串完发现也挺好看。","flags":["c8_token_bead"]}]},
        {"t":"narr","text":"你踮起脚，把信物挂在树杈上——比够得着的地方再高一点。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"挂上去之后，就别老回头看它了。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"下一个是夏至。那天晚上火很大，你穿旧衣服来。"},
        {"t":"scene","id":"c8_midsummer"}
      ]
    },

    /* ===================== 夏至 · Midsummer ===================== */
    "c8_midsummer": {
      title: "第八章 · 夏至", bg: "midsummer", music: "wheel",
      script: [
        {"t":"narr","text":"六月二十一。一年里最长的一个白天。天黑下来的时候，已经快九点了。"},
        {"t":"narr","text":"坡上的火堆比上次大得多，隔着半个村子都能看见。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"今晚要烧两样东西。先烧你自己写的。"},
        {"t":"narr","text":"她递给你一个粗布小袋，里面有干的薰衣草和洋甘菊，闻起来发甜。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里的做法是：把烦恼、病痛、难过的事，往这个袋子里倒。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"不用说出来。心里倒就行——但手要做个动作，往袋子里倒。"},
        {"t":"quote","text":"仲夏是施行各种魔法的经典时节。",
         "en":"Midsummer is a classic time for magic of all kinds.","cite":"Chapter 8 · p.69"},
        {"t":"choice","prompt":"你把袋子撑开，往里倒。你倒进去的是什么？","options":[
          {"text":"「我总怕自己做得不够好。」","reply":"你在袋口上捏了一下，把它扎紧了。","flags":["c8_burn_perfect"]},
          {"text":"「老陈那天那句话，我还记着。」","reply":"你倒得很慢，像在装很重的东西。","flags":["c8_burn_chen"]},
          {"text":"「我不知道我为什么在学这个。」","reply":"倒完之后你发现袋子没变沉，这让你有点意外。","flags":["c8_burn_why"]},
          {"text":"什么也没倒，只是把袋口扎上了。","reply":"守灯人看了一眼，没问。","flags":["c8_burn_empty"]}]},
        {"t":"narr","text":"阿禾也在倒。她的袋子比你的鼓，扎口的时候扎了三个结。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"别问。","toneNote":""},
        {"t":"say","who":"player","name":"你","text":"没问。"},

        {"t":"explore","id":"c8_fire","prompt":"火边放着今晚要用的东西。","need":3,"exitLabel":"开始",
         "spots":[
           {"id":"bonfire","x":200,"y":140,"w":90,"h":70,"label":"火堆","script":[
             {"t":"narr","text":"火从底下往上卷，卷到一人高就散开，火星子往树那边飘。"},
             {"t":"narr","text":"离三步就烫脸，离五步刚好。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"一会儿要从火上跳过去。看着吓人，其实中间那段是凉的。"}]},
           {"id":"cauldron","x":300,"y":150,"w":60,"h":50,"label":"大釜","script":[
             {"t":"narr","text":"大釜摆在火的右边，底下垫了三块砖，免得烫坏草皮。"},
             {"t":"narr","text":"釜口上横着一根铁条，是给袋子准备的。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"烧完的东西掉进去，就不要再捡出来了。"}]},
           {"id":"tree","x":60,"y":20,"w":80,"h":190,"label":"老树","script":[
             {"t":"narr","text":"最近的那棵树，朝火的一面被烤得发黑，背面还是绿的。"},
             {"t":"narr","text":"树根那里压着一块平石头，是平时坐着看火的位置。"},
             {"t":"think","text":"这块石头被坐得有点亮了。"}]},
           {"id":"sky","x":180,"y":0,"w":140,"h":60,"label":"夜空","script":[
             {"t":"narr","text":"九点多了，天还没全黑，北边是一片灰蓝。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，这一天太阳的力量最大。所以火是给它的。"},
             {"t":"narr","text":"你抬头的时候，看见第一颗星，很淡。"}]}
         ]},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"袋子给我。先念三句，再丢进去。"},
        {"t":"narr","text":"她把袋子在火上点着，火苗从布角爬上来，然后她把袋子丢进大釜。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"看着它烧完。别急着说话。"},
        {"t":"narr","text":"布烧得很快。灰往上飘了一下，被风压在釜里，没出去。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"……真的会变轻吗？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"不会。事情还是那些事情。你今晚只是换了个拿它们的手法。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，跳火是为了净化、健康、丰饶和爱情。跳吧。"},
        {"t":"codex","ids":["midsummer"]},
        {"t":"bgm","name":"trial"},
        {"t":"trial","id":"t8_jump"},
        {"t":"bgm","name":"wheel"},
        {"t":"narr","text":"你跳过去了。落地的时候脚下一软，但站住了。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我跳了两次。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"第一次是我自己想跳。第二次是……算了。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"前半年到这儿就过完了。你还记得它们各自做什么吗？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"桌上的东西我给你摆出来了，你归归类。"},
        {"t":"trial","id":"t8_sort_front"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"记住这些不是为了考试。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"是为了到了那天，你的手知道该做什么。"},
        {"t":"scene","id":"c8_lughnasadh"}
      ]
    },

    /* ===================== 收获节 · Lughnasadh ===================== */
    "c8_lughnasadh": {
      title: "第八章 · 收获节", bg: "harvest", music: "dawn",
      script: [
        {"t":"narr","text":"八月一号。天是黄的，地也是黄的。麦子熟到一碰就掉。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"来了？就你们俩？"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"这半亩是我最好的地。头一茬，我先割这里。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"……不是叫你们来看我割麦子。是书上说的那种日子，对吧。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"对。今天是第一次收成。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，这一天原来的日子不是死的，它本来是跟着头一次收割走的。"},
        {"t":"quote","text":"女神悲喜交集地注视着，她意识到男神正在死去，却又作为她的孩子在她体内延续生命。",
         "en":"The Goddess watches in sorrow and joy as she realizes that the God is dying, and yet lives on inside her as her child.","cite":"Chapter 8 · p.70"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"……这话听着像我们种地的说的。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"麦子割了，地里才有明年的麦子。就这么回事。"},

        {"t":"explore","id":"c8_grain","prompt":"地头上摆着刚收下来的东西。","need":3,"exitLabel":"动手做",
         "spots":[
           {"id":"sheaf","x":20,"y":150,"w":80,"h":60,"label":"麦捆","script":[
             {"t":"narr","text":"麦捆用草绳扎着，穗子朝上，扎口的地方勒得很紧。"},
             {"t":"narr","text":"你把手伸进去搓了一把，谷粒掉在手心里，还是温的。"},
             {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"别搓太多，掉地上就收不回来了。"}]},
           {"id":"bread","x":130,"y":90,"w":70,"h":50,"label":"面包","script":[
             {"t":"narr","text":"守灯人带来一块面包，还没切片，表面有一道裂口。"},
             {"t":"narr","text":"她用手把那道裂口掰开，让里面透出来。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"一会儿要捏一个人形。用面包捏，捏成太阳也行。"}]},
           {"id":"doll","x":330,"y":150,"w":70,"h":60,"label":"麦草","script":[
             {"t":"narr","text":"地上摊着一小把麦草，是刚才割麦时特意留下的，比别的都长。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，麦草编的娃娃是女神的。面包捏的人是男神的。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"两个都摆上，这一天就齐了。"},
             {"t":"codex","ids":["lughdoll"]}]},
           {"id":"field","x":150,"y":0,"w":200,"h":70,"label":"远处","script":[
             {"t":"narr","text":"地那头还有一大片没割，风过去的时候，金浪一直推到山脚。"},
             {"t":"narr","text":"再往东是果园，苹果还青着，树下落了一地小的。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，这几天适合去看一看田、果园、湖和水井。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"不是去干活，就是去看。"}]}
         ]},

        {"t":"narr","text":"你在麦捆边上坐下来，开始编那个娃娃。"},
        {"t":"narr","text":"头一次编成一团。第二次编成了个歪的。第三次勉强有个形状。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"你这个……你这是我去年编鸡窝的手艺。"},
        {"t":"narr","text":"他嘴上嫌弃，还是蹲过来，把最乱的那一根抽出来，替你重新绕了一道。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"现在说吃的。书里有一句我很喜欢。"},
        {"t":"quote","text":"每一餐都是与自然协调的行为，我们也因此被提醒：宇宙中没有什么是恒常不变的。",
         "en":"Every meal is an act of attunement with nature, and we are reminded that nothing in the universe is constant.","cite":"Chapter 8 · p.70"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"没有什么是恒常不变的。这句话我认。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"她妈走的那年，麦子也是这天割的。"},
        {"t":"narr","text":"他说完就低头去捆草绳，好像刚才那句不是他说的。"},
        {"t":"think","text":"阿禾今天没来。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"面朝地的人，是不太会说这些的。他说一句，你就收一句。"},
        {"t":"narr","text":"临走的时候，老陈从麦捆里抽出两把，塞给你。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"拿回去。插在瓶子里也行，别扔。"},
        {"t":"rel","who":"chen","n":1},
        {"t":"set","flags":["c8_chen_wheat"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"下一个是秋分。到那天，我们把叶子撒回地上。"},
        {"t":"scene","id":"c8_mabon"}
      ]
    },

    /* ===================== 秋分 · Mabon ===================== */
    "c8_mabon": {
      title: "第八章 · 秋分", bg: "forest", music: "wheel",
      script: [
        {"t":"narr","text":"九月二十一。白天和黑夜又一样长了，只是这回，是往下走。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"收获从收获节那天开始，到今天算完。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，男神准备离开他的身体，往看不见的地方去了。"},
        {"t":"say","who":"player","name":"你","text":"……去哪儿？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"去女神那里。等冬至，他会以孩子的样子回来。"},

        {"t":"explore","id":"c8_seed","prompt":"林子里到处是掉下来的东西。","need":3,"exitLabel":"收够了",
         "spots":[
           {"id":"tree","x":0,"y":40,"w":110,"h":180,"label":"老树","script":[
             {"t":"narr","text":"这棵树的叶子已经落了一半，剩下的卷着边。"},
             {"t":"narr","text":"你在树皮上摸到一道旧的刻痕，很浅，看不清刻的是什么。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"树不说话。但它每年这个时候都在做同一件事。"}]},
           {"id":"mush","x":80,"y":205,"w":40,"h":30,"label":"蘑菇","script":[
             {"t":"narr","text":"蘑菇比春天那会儿老，帽沿往上翻，边上裂了口。"},
             {"t":"narr","text":"它也在收——把自己收回去，等明年。"},
             {"t":"think","text":"原来这一天连蘑菇都在做同一件事。"}]},
           {"id":"fern","x":10,"y":215,"w":60,"h":50,"label":"蕨叶","script":[
             {"t":"narr","text":"春天卷着的蕨叶，现在摊平了，边上开始发黄。"},
             {"t":"narr","text":"你把最平的那一片摘下来，夹进本子里。"}]},
           {"id":"light","x":140,"y":40,"w":60,"h":140,"label":"光柱","script":[
             {"t":"narr","text":"光斜进来了，比春天的沉，落在叶子上的颜色偏橙。"},
             {"t":"narr","text":"地上摊着好几个空的种荚，被风吹得挤在一起。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"捡种荚。一部分摆家里，一部分留着以后用。"},
             {"t":"codex","ids":["mabonleaves"]}]}
         ]},

        {"t":"narr","text":"回来的路上，守灯人一句话没说。快出林子的时候她停下来了。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"这一年走到这儿，故事你也听了一半。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"我考考你。哪一句对哪一个日子，你自己配。"},
        {"t":"bgm","name":"trial"},
        {"t":"trial","id":"t8_myth"},
        {"t":"bgm","name":"wheel"},
        {"t":"narr","text":"她把对错说了一遍，没有打分，也没说你好不好。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"神话有很多版本。书里说，它给的是「相当常见的一种」。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"所以配错了不算错，只要你知道自己配的是哪一种。"},

        {"t":"bg","name":"stones"},
        {"t":"narr","text":"傍晚，你们回到石圈。守灯人手里提着一个小篮子，装着一整年攒下来的干叶。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，秋分这一天，把一篮各色的叶子慢慢撒在圈里。"},
        {"t":"narr","text":"你把篮子举高，一片一片放下去。叶子落得很慢，有一片挂在了石头上。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"撒完就收圈。这一年的收成，到这儿就算交出去了。"},
        {"t":"narr","text":"阿禾在圈外站着，手里攥着那把五朔节的彩带，已经洗得发白了。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"……我问一件事。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"十月三十一号那天，我想做点事。到时候你们别拦我。"},
        {"t":"say","who":"player","name":"你","text":"什么事？"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"到时候说。"},
        {"t":"narr","text":"她说完就往下走了，走得很快，彩带在她手里晃。"},
        {"t":"think","text":"我大概知道是什么事。我一直没敢问她。"},
        {"t":"set","flags":["c8_he_hint"]},
        {"t":"scene","id":"c8_samhain"}
      ]
    },

    /* ===================== 萨温 · Samhain ===================== */
    "c8_samhain": {
      title: "第八章 · 萨温", bg: "samhain", music: "moon",
      script: [
        {"t":"narr","text":"十月三十一号。雾从湖上上来，贴着地走，走到石圈里就不动了。"},
        {"t":"narr","text":"守灯人在圈里点了一小堆火。火不大，雾在它周围散开一圈。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"今晚我不讲道理。今晚你看着就行。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，今天要向男神道别。这是暂时的道别。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"他不是掉进黑里去了。他是准备在冬至，从女神那里回来。"},
        {"t":"quote","text":"威卡认为，在这一夜，物质现实与灵性现实之间的分隔变得稀薄。",
         "en":"The Wicca feel that on this night the separation between the physical and spiritual realities is thin.","cite":"Chapter 8 · p.71"},
        {"t":"codex","ids":["samhainveil"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"这一夜也用来纪念先行的人。所有先走一步的人。"},
        {"t":"codex","ids":["samhainnocall"]},

        {"t":"explore","id":"c8_altar_night","prompt":"石头上摆着今晚的东西。","need":3,"exitLabel":"回到火边",
         "spots":[
           {"id":"wheelplate","x":280,"y":150,"w":60,"h":40,"label":"轮盘","script":[
             {"t":"narr","text":"一块扁平的浅盘，上面画着一个大圈，圈里从中心伸出八根线。"},
             {"t":"narr","text":"八根线分得很匀，像是用尺子量过。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"八根辐条的轮子。这是年轮的符号，也是永远的符号。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"八条线，就是八个日子。"}]},
           {"id":"pom","x":110,"y":160,"w":60,"h":50,"label":"石榴","script":[
             {"t":"narr","text":"石榴的表皮被划开了一道，露出里面挤着的籽，红得发暗。"},
             {"t":"narr","text":"书里让你用白柄刀挑几颗出来，放在轮盘上。"},
             {"t":"narr","text":"你挑了三颗。咬开一颗，又酸又甜，甜在后头。"}]},
           {"id":"cauldron","x":190,"y":185,"w":90,"h":50,"label":"大釜","script":[
             {"t":"narr","text":"大釜里垫着沙，沙上插着一支矮蜡烛，还没点。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，釜在这天就是女神。写了字的纸，丢在它的火里。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"想摆脱什么，就写下来。今晚写什么都算数。"}]},
           {"id":"stone","x":225,"y":60,"w":45,"h":50,"label":"北石","script":[
             {"t":"narr","text":"北边那块石头上落着雾水，摸上去是湿的。"},
             {"t":"narr","text":"石头根下有一小块地方没有草，被人坐过很多次。"},
             {"t":"think","text":"再过三个月，这里会是雪。"}]}
         ]},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"一年的事，先归拢一下。后半年的东西你还记得吗？"},
        {"t":"bgm","name":"trial"},
        {"t":"trial","id":"t8_sort_back"},
        {"t":"bgm","name":"moon"},
        {"t":"narr","text":"雾里有人踩过来。脚步很轻，像怕被听见。"},
        {"t":"narr","text":"是阿禾。她没戴手套，手很凉。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"你听我说完再骂我。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我查过了。书上说，今晚这道墙最薄。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我想把她叫回来。就一次。"},
        {"t":"think","text":"她说「她」的时候，声音比平时轻一半。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你想清楚了吗。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"想了三年了。"},
        {"t":"narr","text":"守灯人没有再说。她往后退了半步，把火边的位置让出来。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"这不是我的事。书在你手里，那一段你自己看。"},
        {"t":"choice","prompt":"阿禾看着你。火在她眼睛里晃。你说什么？","options":[
          {"text":"「我们一起给她做点吃的，摆在门外。」","reply":"她没说话，先点了点头，然后才反应过来自己在点头。","rel":{"he":1},"flags":["c8_he_remember"]},
          {"text":"「那就试。我陪你站着。」","reply":"她抓住你的手腕，抓得很紧，紧到你有点疼。","rel":{"he":2},"flags":["c8_he_call"]},
          {"text":"「那一段在你手上。你读完再决定。」","reply":"她低头去翻，翻页的手在抖。翻到那一段，她停住了。","insight":2,"flags":["c8_he_read"]}]},

        {"t":"narr","when":"c8_he_call","text":"你们点了火，念了她写在纸上的名字。念到第三遍，风停了一下。"},
        {"t":"narr","when":"c8_he_call","text":"然后什么都没有。火照着的是雾，雾后面还是雾。"},
        {"t":"say","when":"c8_he_call","who":"he","name":"阿禾","por":"he","text":"……她不在那儿。"},
        {"t":"narr","when":"c8_he_call","text":"她蹲下去了，很久没起来。守灯人站在旁边，一句话没说，也没走开。"},
        {"t":"set","when":"c8_he_call","flags":["c8_he_chose_call"]},

        {"t":"narr","when":"c8_he_remember","text":"你们回到屋里，煮了一碗面。阿禾说，她妈吃面要放很多醋。"},
        {"t":"narr","when":"c8_he_remember","text":"她把碗端到门外，摆正，退后两步看了看，又上前挪了一指宽。"},
        {"t":"say","when":"c8_he_remember","who":"he","name":"阿禾","por":"he","text":"……就这样吧。"},
        {"t":"set","when":"c8_he_remember","flags":["c8_he_chose_remember"]},

        {"t":"narr","when":"c8_he_read","text":"她读得很慢，一个字一个字地读。读完她坐着不动，火小了一圈。"},
        {"t":"say","when":"c8_he_read","who":"he","name":"阿禾","por":"he","text":"……「让亡者安息」。"},
        {"t":"say","when":"c8_he_read","who":"he","name":"阿禾","por":"he","text":"那我还是给她做碗面吧。她爱吃面。"},
        {"t":"narr","when":"c8_he_read","text":"她说这句的时候是笑着的，眼睛不是。"},
        {"t":"set","when":"c8_he_read","flags":["c8_he_chose_remember"]},
        {"t":"rel","when":"c8_he_read","who":"he","n":1},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里这一句，是给今晚写的。"},
        {"t":"quote","text":"但让亡者安息。以你的记忆尊崇他们，但不要把他们召唤到你身边。",
         "en":"But leave the dead in peace. Honor them with your memories but do not call them to you.","cite":"Section III · p.149"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"不是怕。是作者觉得，如果灵魂已经在别处活着，你叫它，是给它添麻烦。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"这只是他的看法。但你今晚做的选择，是你自己的。"},

        {"t":"set","flags":["c8_door_plate"]},
        {"t":"bg","name":"cottage"},
        {"t":"narr","text":"回到小屋。守灯人从锅里盛出一份饭，放在灶台上，没动筷子。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，今晚要在屋外放一盘食物，给先行的人。窗边点一支蜡烛，给他们照路。"},

        {"t":"explore","id":"c8_door","prompt":"门口和屋后，今晚还有三件事要做。","need":2,"exitLabel":"回屋",
         "spots":[
           {"id":"plate","x":120,"y":140,"w":150,"h":90,"label":"盘子","script":[
             {"t":"narr","text":"你把盘子端出去，放在门外的石阶上，让它的边和门槛对齐。"},
             {"t":"narr","text":"夜里的风把饭上的热气吹歪了，一会儿就看不见了。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"不用守在这儿。摆好了就回屋。"},
             {"t":"think","text":"门外的台阶上，多了一小片不属于任何人的晚饭。"}]},
           {"id":"candle","x":300,"y":55,"w":110,"h":110,"label":"窗台","script":[
             {"t":"narr","text":"窗台上那支蜡烛烧得很稳，火苗一直朝着同一个方向。"},
             {"t":"narr","text":"透过玻璃，能看见它在雾里划出一小块暖色。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，这是引他们去「永恒夏日之地」。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"那是书里的说法。你可以先记着。"}]},
           {"id":"apple","x":290,"y":170,"w":130,"h":60,"label":"硬土","script":[
             {"t":"narr","text":"屋后的地冻上了，表面一层硬壳。你用白柄刀刨开一个浅坑。"},
             {"t":"narr","text":"把苹果放进去，埋上土，拍了两下。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，这是给路上的人吃的。埋苹果，是喂他们一程。"},
             {"t":"codex","ids":["mabonleaves"]}]}
         ]},

        {"t":"narr","text":"坡下有人提着灯站着，站了很久。是老陈。"},
        {"t":"say","when":["c6_invite_chen","!c7_chen_left"],"who":"chen","name":"老陈","por":"skeptic","text":"去年你们做满月那回，我在底下看着。我没上来。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"我来接她。她妈走那几年，这一天她都睡不着。"},
        {"t":"say","when":"c6_alone","who":"chen","name":"老陈","por":"skeptic","text":"你们做你们的事。我在这儿等着就行。"},
        {"t":"narr","text":"他看见阿禾下来，就把灯抬高了一点，照着路，什么也没问。"},
        {"t":"narr","text":"两个人一前一后往回走，雾把他们的影子收得很快。"},

        {"t":"bg","name":"samhain"},
        {"t":"narr","text":"守灯人把火压小，让你把今天摘的那个轮盘拿出来。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"最后一件。把这八个日子摆回圈上。摆完了，这一年就合上了。"},
        {"t":"bgm","name":"trial"},
        {"t":"trial","id":"t8_arrange"},
        {"t":"bgm","name":"moon"},
        {"t":"narr","text":"八个日期，围着圆心站成一圈。你从冬至那一点开始看过去。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"过了萨温，就是冬至。所以这个圈没有开头，也没有结尾。"},
        {"t":"scene","id":"c8_year"}
      ]
    },

    /* ===================== 章末 · 本章笔记 ===================== */
    "c8_year": {
      title: "第八章 · 本章笔记", bg: "cottage", music: "cottage",
      script: [
        {"t":"narr","text":"夜里你回到自己的屋子。本子摊在桌上，翻到年初那几页都是空白的。"},
        {"t":"narr","text":"这一年的东西太多，你想按顺序写一遍，写了两行就写乱了。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"别急着写字。先把顺序排对，剩下的自己就顺了。"},
        {"t":"trial","id":"t8_order"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"还有一个问题，从冬至那天就埋着，我一直没问。"},
        {"t":"say","who":"player","name":"你","text":"什么？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"男神先是女神的儿子，后来又是她的爱人。这一年你看了两遍，你想过没有。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"作者自己先把话说了。"},
        {"t":"quote","text":"为什么男神先是女神的儿子，后又成为她的爱人？这不是乱伦，这是象征。",
         "en":"Why is the God the son, and then the lover of the Goddess? This isn't incest, this is symbolism.","cite":"Chapter 8 · p.71"},
        {"t":"codex","ids":["mythsymbol"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，这是许多威卡神话里的一个，讲的是生死和重生。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"它还讲了一件很实在的事：人靠地、靠太阳、靠月亮活着。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"所以这一年的二十一次，不是为了把它们背下来。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"是为了让你在过到某一天的时候，停下来，看一眼天。"},
        {"t":"shard","id":"wheel"},
        {"t":"achv","id":"c8_years"},
        {"t":"journal","id":"j_c8","title":"第八章 · 本章笔记","lines":[
          "一年走完了：冬至、圣烛节、春分、五朔节、夏至、收获节、秋分、萨温。",
          {"when":"c8_imbolc_birth","text":"二月二那晚，我在老陈家守到小牛站起来。他把最后一盏灯也点了。"},
          {"when":"c8_chen_wheat","text":"收获节那天，老陈塞给我两把麦穗。他说别扔。"},
          {"when":"c8_he_remember","text":"萨温那天，我和阿禾给她母亲做了一碗面，摆在门外。"},
          {"when":"c8_he_call","text":"萨温那天，阿禾试了一次。什么也没来。她蹲了很久。"},
          {"when":"c8_he_read","text":"萨温那天，我把那一段指给阿禾，让她自己读。她最后选了记住。"},
          "十三个满月，八个节日，二十一次。这个数我记住了，但记住不算数。",
          "还有一件事没弄明白：给男神道别这件事，为什么也算是往前走。"
        ]},
        {"t":"say","who":"player","name":"你","text":"明年呢？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"明年从头再来一遍。但你不是今年这个人了。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"先别想着明年。这几天你还会碰到一些事——跟这一年不一样的事。"},
        {"t":"think","text":"她说「一些事」的时候，看的是萨温那堆火的方向。"},
        {"t":"finishChapter","id":"c8"},
        {"t":"fx","kind":"flash"},
        {"t":"chapter","title":"第九章","sub":"重 生 的 螺 旋","en":"THE SPIRAL OF REBIRTH"},
        {"t":"scene","id":"c9_spiral"}
      ]
    }

  },

  /* ===================== 图鉴 ===================== */
  codex: {
    "wheel21":      {"cat":"第八章","title":"二十一","en":"Twenty-one","text":"十三个满月，八个节日。合起来是威卡一年的二十一次仪式场合。","src":"p.65"},
    "sabbat":       {"cat":"第八章","title":"太阳节","en":"Sabbat","text":"Sabbat 是太阳仪式，标记太阳一年周期里的节点，只占威卡仪式年的一半。","src":"p.66"},
    "esbat":        {"cat":"第八章","title":"满月夜","en":"Esbat","text":"Esbat 是威卡的满月庆典，崇拜「她」。男神通常也一样受尊崇。","src":"p.66"},
    "yulebirth":    {"cat":"第八章","title":"最长的夜","en":"Yule","text":"女神在冬至生下男神。男神也是太阳，所以太阳在这一天重生。","src":"p.67"},
    "yulelog":      {"cat":"第八章","title":"冬至木","en":"Yule log","text":"在橡木或松木上刻、或用粉笔画一个太阳，黄昏时放进壁炉点燃。","src":"p.137-139"},
    "imbolclamp":   {"cat":"第八章","title":"每盏灯","en":"Every lamp","text":"日落时把家里每一盏灯点亮，哪怕只亮一会儿。有雪就在雪上画个太阳。","src":"p.139-140"},
    "imbolcdoor":   {"cat":"第八章","title":"献身之时","en":"A time for dedication","text":"作者说，圣烛节是传统的入会时节，自我献身可以在这天做，也可以重做。","src":"p.68"},
    "ostaraflower": {"cat":"第八章","title":"野花占卜","en":"Wildflowers","text":"到野地随手采花，回家用书、直觉或灵摆查含义。采之前先谢过花。","src":"p.141-142"},
    "beltane":      {"cat":"第八章","title":"五月柱","en":"May pole","text":"花与绿叶象征女神，五月柱象征男神。今天更常见的焦点其实是那口大釜。","src":"p.69"},
    "midsummer":    {"cat":"第八章","title":"跳火","en":"Leap the fire","text":"从前人们跳过篝火，求丰饶、净化、健康与爱情。火仍然代表太阳。","src":"p.69"},
    "lughdoll":     {"cat":"第八章","title":"麦草娃娃","en":"Corn dolly","text":"麦捆和面包捏的人形代表男神，麦草娃娃代表女神，两个都摆上才算齐。","src":"p.145-146"},
    "mabonleaves":  {"cat":"第八章","title":"撒叶子","en":"Scattering the leaves","text":"祭坛上放一小篮各色的干叶，仪式里把它们慢慢撒在圈内。","src":"p.147-148"},
    "samhainveil":  {"cat":"第八章","title":"薄的一夜","en":"A thin night","text":"威卡觉得这一夜物质与灵性的分隔变薄，因此用来纪念所有先行的人。","src":"p.71"},
    "samhainnocall":{"cat":"第八章","title":"不要召唤","en":"Leave the dead in peace","text":"「让亡者安息。以你的记忆尊崇他们，但不要把他们召唤到你身边。」","src":"p.149"},
    "mythsymbol":   {"cat":"第八章","title":"这是象征","en":"This is symbolism","text":"男神先是女神的儿子，后是她的爱人。作者说：这不是乱伦，这是象征。","src":"p.71"}
  },

  /* ===================== 试炼 ===================== */
  trials: {

    "t8_jump": {
      kind: "rhythm", title: "第八章 · 试炼 · 跳火堆",
      caption: "火最矮的那一下，从它上面过去",
      explain: "跳火堆求的是净化与新气力，不是勇气。跟不上就再跳一次，没人给你记分。",
      src: "Chapter 8 · p.69, p.145",
      speed: 118, lead: 1.6, window: 30,
      notes: [1250, 1900, 2550, 3200, 3850, 4500, 5150, 5800, 6450, 7100, 7750, 8400]
    },

    "t8_sort_front": {
      kind: "sort", title: "第八章 · 试炼 · 前半年",
      explain: "上半年的四个日子，各有各的做派。分错了不要紧，书上都写着。",
      src: "Section III · p.137-144",
      bins: [
        {"id":"yule","label":"冬至","tip":"最长的夜"},
        {"id":"imbolc","label":"圣烛节","tip":"点灯的日子"},
        {"id":"ostara","label":"春分","tip":"昼夜等长"},
        {"id":"beltane","label":"五朔节","tip":"花与五月柱"}
      ],
      items: [
        {"text":"在壁炉里烧一根刻着太阳的橡木","bin":"yule","why":"冬至木，代表男神在母神的圣火里重生。","src":"p.137-139"},
        {"text":"坚果、梨、浸过苹果酒的葛缕子蛋糕","bin":"yule","why":"冬至的传统吃食。","src":"p.139"},
        {"text":"把家里每一盏灯都点亮，哪怕只亮一会儿","bin":"imbolc","why":"圣烛节的习俗，为的是迎太阳重生。","src":"p.139-140"},
        {"text":"乳制品、咖喱、洋葱和蒜","bin":"imbolc","why":"这是产犊的节，书里说要吃点辣的、有力气的。","src":"p.140"},
        {"text":"到野地里随手采一把花，回家查它是什么意思","bin":"ostara","why":"春分的野花占卜，采之前先谢过花。","src":"p.141-142"},
        {"text":"葵花子、南瓜子、芽菜和绿叶菜","bin":"ostara","why":"种子类的食物对应「开头」与「播种」。","src":"p.142"},
        {"text":"天亮前去采花和绿枝，装饰门口和自己","bin":"beltane","why":"花与绿叶象征女神，五月柱象征男神。","src":"p.69, 143"},
        {"text":"乳品、万寿菊卡士达、燕麦饼","bin":"beltane","why":"五朔节的传统吃食。","src":"p.144"}
      ]
    },

    "t8_myth": {
      kind: "match", title: "第八章 · 试炼 · 故事配日子",
      explain: "这是书里给的「相当常见的一种」讲法。别的版本也存在，配错了不算错。",
      src: "Chapter 8 · p.67-71",
      pairs: [
        {"left":"女神生下男神","right":"冬至 Yule","note":"太阳也在这一天重生。"},
        {"left":"女神醒来，种子发芽","right":"圣烛节 Imbolc","note":"白天变长，她被光唤醒。"},
        {"left":"男神成年，二者结合","right":"五朔节 Beltane","note":"女神怀上了男神。"},
        {"left":"自然力量到顶点","right":"夏至 Midsummer","note":"大地浸满丰饶。"},
        {"left":"第一次收获","right":"收获节 8月1日","note":"女神悲喜交集。"},
        {"left":"向男神暂时道别","right":"萨温 10月31日","note":"他将在冬至回来。"}
      ]
    },

    "t8_sort_back": {
      kind: "sort", title: "第八章 · 试炼 · 后半年",
      explain: "下半年的四个日子。越往后，火越小，但手上的事一点没少。",
      src: "Section III · p.144-150",
      bins: [
        {"id":"midsummer","label":"夏至","tip":"力量的顶点"},
        {"id":"lugh","label":"收获节","tip":"第一茬麦"},
        {"id":"mabon","label":"秋分","tip":"收获收尾"},
        {"id":"samhain","label":"萨温","tip":"道别的夜"}
      ],
      items: [
        {"text":"跳过篝火，求净化、健康与新气力","bin":"midsummer","why":"火代表太阳，跳过它是为了净化与更新。","src":"p.69, 145"},
        {"text":"把写满烦恼的草药袋点着，丢进大釜","bin":"midsummer","why":"书里说夏至是施行各种魔法的经典时节。","src":"p.144-145"},
        {"text":"用面包捏一个太阳，或者一个人形","bin":"lugh","why":"面包做的太阳或人形代表男神。","src":"p.145-146"},
        {"text":"编一个麦草娃娃，摆在祭坛上","bin":"lugh","why":"麦草娃娃代表女神。","src":"p.145"},
        {"text":"把一小篮各色的干叶慢慢撒在圈里","bin":"mabon","why":"秋分仪式的做法，撒完才收圈。","src":"p.147"},
        {"text":"去野地采种荚和干草，一部分留着以后用","bin":"mabon","why":"秋分的传统：走野地、收种子。","src":"p.147-148"},
        {"text":"夜里在屋外放一盘食物，给先行的人","bin":"samhain","why":"萨温的传统习俗之一。","src":"p.150"},
        {"text":"在窗边放一支蜡烛，给他们照路","bin":"samhain","why":"据说这能引他们前往「永恒夏日之地」。","src":"p.150"}
      ]
    },

    "t8_arrange": {
      kind: "arrange", title: "第八章 · 试炼 · 一年之轮",
      caption: "把八个日子放回它自己的日期上",
      explain: "四个由至日和分日定，四个是老民俗节。摆完这一圈，一年就合上了。",
      src: "Chapter 8 · p.65-71",
      items: [
        {"id":"yule","icon":"snow","label":"冬至","why":"约 12 月 21 日。最长的夜，女神生下男神。","src":"p.67"},
        {"id":"imbolc","icon":"candle","label":"圣烛节","why":"2 月 2 日。点灯、产犊，也是自我献身的老时节。","src":"p.67-68"},
        {"id":"ostara","icon":"flower","label":"春分","why":"约 3 月 21 日。昼夜等长，采花、播种。","src":"p.68"},
        {"id":"beltane","icon":"leaf","label":"五朔节","why":"4 月 30 日或 5 月 1 日。花与绿枝、五月柱。","src":"p.69"},
        {"id":"midsummer","icon":"flame","label":"夏至","why":"约 6 月 21 日。自然的力量到顶点。","src":"p.69"},
        {"id":"lugh","icon":"bread","label":"收获节","why":"8 月 1 日。第一茬麦，本来跟着收割走。","src":"p.70"},
        {"id":"mabon","icon":"seed","label":"秋分","why":"约 9 月 21 日。收获收尾，昼夜再度等长。","src":"p.70"},
        {"id":"samhain","icon":"cauldron","label":"萨温","why":"10 月 31 日。向男神暂时道别，纪念先行的人。","src":"p.70-71"}
      ],
      slots: [
        {"x":240,"y":76, "label":"12/21","item":"yule"},
        {"x":325,"y":91, "label":"2/2",  "item":"imbolc"},
        {"x":360,"y":128,"label":"3/21", "item":"ostara"},
        {"x":325,"y":165,"label":"4/30", "item":"beltane"},
        {"x":240,"y":180,"label":"6/21", "item":"midsummer"},
        {"x":155,"y":165,"label":"8/1",  "item":"lugh"},
        {"x":120,"y":128,"label":"9/21", "item":"mabon"},
        {"x":155,"y":91, "label":"10/31","item":"samhain"}
      ]
    },

    "t8_order": {
      kind: "order", title: "第八章 · 试炼 · 排回一圈",
      caption: "把这一年按顺序摆回来（从冬至开始）",
      explain: "从冬至到萨温，一圈走完，年轮就合上了。过了萨温，又是冬至。",
      src: "Chapter 8 · p.65-71",
      items: [
        {"id":"yule",   "label":"冬至 · 最长的夜","why":"一年的开头，也是结尾。"},
        {"id":"imbolc", "label":"圣烛节 · 点灯","why":"2 月 2 日，产犊的节。"},
        {"id":"ostara", "label":"春分 · 采花播种","why":"昼夜等长，光正在压过黑。"},
        {"id":"beltane","label":"五朔节 · 五月柱","why":"男神成年，二者结合。"},
        {"id":"midsummer","label":"夏至 · 跳火","why":"自然的力量到顶点。"},
        {"id":"lugh",   "label":"收获节 · 第一茬麦","why":"8 月 1 日，男神开始衰微。"},
        {"id":"mabon",  "label":"秋分 · 撒干叶","why":"收获收尾，他准备离开肉身。"},
        {"id":"samhain","label":"萨温 · 道别","why":"暂时的道别，他将在冬至回来。"}
      ]
    }

  },

  /* ===================== 符印与成就 ===================== */
  sigils: {
    "wheel": {"name":"年轮","icon":"circle","desc":"十三个满月，八个节日。转一圈，一年就回来了。","src":"第八章 · p.65"}
  },

  achv: {
    "c8_years": {"name":"转过一整圈","desc":"跟着太阳走完八个力量之日。"}
  }

});
