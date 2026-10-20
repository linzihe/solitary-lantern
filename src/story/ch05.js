/* 第五章 · 鼓、舞与手（Music, Dance, and Gesture）
 * 作者 C。资料：notes_ch5_7.md（第5章 p.39–46）。
 * 一条线：篝火夜 —— 音乐分四元素 → 老陈拎二胡来 → 鼓点 → 舞与手势。
 */
STORY_ADD({

  scenes: {

    /* ===================== 篝火夜 · 音乐与四元素 ===================== */
    "c5_dance": {
      title: "第五章 · 篝火夜", bg: "fire", music: "trance",
      script: [
        {"t":"intro","chapter":"第五章","title":"鼓 、 舞 与 手","book":"第五章 Music, Dance, and Gesture · 原书 p.39-46",
         "points":["乐器分成四类，各归一个元素","鼓点、转圈和手势都能提升力量","阿禾站在火边不敢动，老陈提着琴来了","你不是在给观众表演"]},

        {"t":"narr","text":"天黑了以后，坡下的空地上升起一堆火。火不大，但够亮。"},
        {"t":"narr","text":"来的人比你想象的多。有人带了凳子，有人就坐在石头上。"},
        {"t":"say","who":"player","name":"你","text":"今晚做什么？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"玩。但你别把它想得太轻。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"先把火边那几样东西看一遍，回来再问我。"},

        {"t":"explore","id":"c5_campfire","prompt":"火边摆着几样东西。先看哪个？","need":3,"exitLabel":"回到火边",
         "spots":[
           {"id":"drum","x":130,"y":150,"w":70,"h":50,"label":"手鼓","script":[
             {"t":"narr","text":"一面单面手鼓，鼓面绷得发亮，边上有一圈手指按旧的印子。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"萨满用它把人送进另一种意识。稳的鼓声，慢的鼓声。"},
             {"t":"quote","text":"萨满用稳定的鼓声诱导出神状态，鼓也可以用来控制魔法舞蹈的节奏。",
              "en":"Shamans use a steady drum beat to induce trance, and a drum can be used to control the pace of magical dance.","cite":"Chapter 5 · p.41"},
             {"t":"codex","ids":["c5_drum"]}]},
           {"id":"coals","x":200,"y":140,"w":90,"h":70,"label":"篝火","script":[
             {"t":"narr","text":"火心里烧的是松木，噼一下，火星往上跳一层。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"听见没有。这声音比鼓老。"},
             {"t":"think","text":"她说音乐是从自然的声音里来的，火自己就在响。"}]},
           {"id":"stones","x":190,"y":190,"w":110,"h":30,"label":"石头","script":[
             {"t":"narr","text":"火堆外圈摆了十几块石头，围成不太圆的圈，都晒过火。"},
             {"t":"narr","text":"你捡起两块，轻轻一对，它们发出一声很脆的响。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"不会音乐的人也能这么玩。拍手、摇沙锤、绕圈走，都算。"},
             {"t":"codex","ids":["c5_unmusical"]}]},
           {"id":"sky","x":180,"y":0,"w":140,"h":60,"label":"夜空","script":[
             {"t":"narr","text":"云散了，天上一片星星，边缘冷得发蓝。"},
             {"t":"think","text":"村里老人说这种天不能敲锣，会把东西招下来。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你信那个？"},
             {"t":"narr","text":"她没等你答，自己先笑了一下。"}]},
           {"id":"tree","x":60,"y":20,"w":80,"h":190,"label":"老树","script":[
             {"t":"narr","text":"火左边是一棵老树，树皮上有一道旧刀痕，快长平了。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"风吹过它的声音，也是乐器。人只是学着做一遍。"},
             {"t":"codex","ids":["c5_naturemusic"]}]}
         ]},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"音乐和舞，是最早的魔法，也是最早的宗教动作。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"它有三个用处。你先把这三个词记住，别的不急。"},
        {"t":"quote","text":"这些技巧用于提升力量、改变意识，以及与女神和男神合一——达到狂喜。",
         "en":"These techniques are used to raise power, alter consciousness, and to unite with the Goddess and Godto achieve ecstasy.","cite":"Chapter 5 · p.39"},
        {"t":"codex","ids":["c5_threepower"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"作者说，这样的仪式可能最有力——有些仪式整场只有手势。"},
        {"t":"say","who":"player","name":"你","text":"一句话都不说？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"一句话都不说。第三部分里就有一场。"},
        {"t":"quote","text":"音乐魔法真的就是你决定让它成为的样子。",
         "en":"Music magic is truly what you decide to make it.","cite":"Chapter 5 · p.41"},
        {"t":"choice","prompt":"守灯人问：「所以，音乐是什么？」","options":[
          {"text":"「是人模仿自然的声音，再还回去。」","reply":"她把一根柴往里推了推。「这句可以记着。」","insight":1,"flags":["c5_natureanswer"]},
          {"text":"「我还没想好。我就觉得它在我身上起作用。」","reply":"她点头。「不知道，也是回答。你比急着下结论的人稳。」","flags":["c5_honest"]},
          {"text":"「是提升力量、改变意识、跟神合一。」","reply":"「背得挺快。」她把鼓推给你。「就是别只背。」","flags":["c5_memorized"]}]},
        {"t":"say","when":"c5_honest","who":"player","name":"你","text":"——但我不知道它为什么有用。"},
        {"t":"say","when":"c5_honest","who":"keeper","name":"守灯人","por":"keeper","text":"先知道它在你身上起了什么作用。道理在后面。"},
        {"t":"say","when":"c5_memorized","who":"keeper","name":"守灯人","por":"keeper","text":"你背的这三个词，你身上哪个地方起了作用？"},
        {"t":"say","when":"c5_memorized","who":"player","name":"你","text":"……说不上来。"},
        {"t":"say","when":"c5_memorized","who":"keeper","name":"守灯人","por":"keeper","text":"那就先别背。会背的人最容易在火边站着不动。"},
        {"t":"rel","when":"c5_memorized","who":"keeper","n":-1},
        {"t":"say","when":"c5_natureanswer","who":"keeper","name":"守灯人","por":"keeper","text":"你刚才那句，比你背的那三个词有用。记住这句。"},
        {"t":"narr","text":"坡上传来脚步声。阿禾跑下来，跑到火边又突然停下。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"你们……要跳舞？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"我跳。你想不想跳，是你的事。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"这么多人看着。我腿都不会动了。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"谁看？"},
        {"t":"narr","text":"阿禾愣了一下，环顾了一圈，发现没有一个人在看火以外的地方。"},
        {"t":"quote","text":"然而在威卡中，舞蹈和音乐只在神灵面前进行。你不是在为人群表演，所以不必担心唱错一个音或绊到自己的脚。",
         "en":"In Wicca, however, dance and music occur before the deities alone. You aren't performing for a crowd, so don't worry about missing a note or tripping over your feet.","cite":"Chapter 5 · p.40"},
        {"t":"codex","ids":["c5_nocrowd"]},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"……那我可以先站在旁边？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"站着也是在里面。你比那些不肯来的人快一步。"},
        {"t":"scene","id":"c5_instruments"}
      ]
    },

    /* ===================== 乐器与四元素 ===================== */
    "c5_instruments": {
      title: "第五章 · 四类乐器", bg: "fire", music: "trance",
      script: [
        {"t":"narr","text":"守灯人从麻袋里一件件往外掏东西，摆在火前的布上。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"只靠音乐和舞，就能做完整场仪式。别的可以不要。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"但你得先知道，每一件家伙归哪个元素。归错了，用处也就错了。"},
        {"t":"quote","text":"这四类乐器各有特定的力量。鼓、沙锤、木琴，以及所有打击乐器（叉铃除外）归土元素。",
         "en":"Four distinct types of instruments have specific powers. The drum, rattle, xylophone, and all percussion instruments (save for the sistrum) are ruled by the element of earth.","cite":"Chapter 5 · p.41"},

        {"t":"explore","id":"c5_instrumentbag","prompt":"布上摊着几件乐器。先摸哪个？","need":3,"exitLabel":"心里有数了",
         "spots":[
           {"id":"drum2","x":120,"y":160,"w":60,"h":44,"label":"手鼓","script":[
             {"t":"narr","text":"鼓敲一下，声音闷，落地就没了，像往土里按了一下。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"土。生育、钱、找活干，都归它。「敲出」能量送给大地。"},
             {"t":"codex","ids":["c5_sortearth"]}]},
           {"id":"flute","x":300,"y":170,"w":50,"h":30,"label":"竹笛","script":[
             {"t":"narr","text":"一支竹笛，几个音孔边被吹得发暗。"},
             {"t":"narr","text":"你吹了一下，不出声。守灯人把手腕往下按了按，再吹就响了。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"风。练脑筋、练观想、找古老的知识。也叫男神。"},
             {"t":"quote","text":"长笛、竖笛，以及所有管乐器归风元素——理智的元素。",
              "en":"The flute, recorder, and all wind instruments are under the dominion of air, the intellectual element.","cite":"Chapter 5 · p.42"}]},
           {"id":"bell","x":370,"y":150,"w":40,"h":40,"label":"小铃","script":[
             {"t":"narr","text":"一只小铜铃，一摇，声音细细的，很久都不散。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"共鸣金属。这一类的，多半跟疗愈、友谊、灵性之爱有关。"},
             {"t":"narr","text":"她说伊西斯手里那件叉铃也在这一类——所以敲得响，也不都算土。"},
             {"t":"codex","ids":["c5_resonant"]}]},
           {"id":"water","x":60,"y":190,"w":60,"h":40,"label":"水碗","script":[
             {"t":"narr","text":"布角上摆着两只玻璃杯，都装了水，深浅不一样。"},
             {"t":"narr","text":"守灯人拿刀背敲了一下杯沿，一声清响，水面抖出细纹。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"家里没有乐器，就拿这个。刀背敲杯口，声音干净得很。"}]},
           {"id":"book","x":230,"y":150,"w":60,"h":44,"label":"笔记本","script":[
             {"t":"narr","text":"火边摊着一本自己钉的册子，页边画着四行小记号。"},
             {"t":"narr","text":"四行后面各写着不同的字：钱、知识、勇气、快乐。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"这是我给自己记的。你可以照记一份，也可以不记。"}]}
         ]},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"考你一遍。答错我不骂你，只是你以后会对不上号。"},
        {"t":"trial","id":"t5_instruments"},
        {"t":"narr","text":"你把木琴放回土那一堆，又单把一只叉铃拎出来，放在水那一边。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"对。叉铃敲得响，可它归水。书上专门把这一条单拿出来说。"},
        {"t":"say","who":"player","name":"你","text":"那——它会替人治病？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，金属的水音归疗愈、友谊、爱、慈悲这些东西。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"弦乐归火。净化、勇气、激情、改掉坏习惯，都算它。"},
        {"t":"codex","ids":["c5_stringfire"]},
        {"t":"quote","text":"弦乐器可以在仪式前用来净化场地和参与者：沿顺时针绕圈弹奏，直到这里随着你的振动嗡鸣。",
         "en":"They are also excellent tools to use before ritual to purify the area in question, and also the celebrant. Play a particular song, sing with the instrument, or just strum around the area in a clockwise circle until the place is humming with your vibrations.","cite":"Chapter 5 · p.42"},
        {"t":"say","who":"player","name":"你","text":"那没有乐器的人呢？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"拍手。书里说拍手到现在还有人用来在仪式里放力量。"},

        {"t":"sfx","name":"step"},
        {"t":"narr","text":"坡下有人上来。脚步不快，但踩得很实，一根柴都没碰倒。"},
        {"t":"narr","text":"老陈站在火圈外，手里拎着一样用布裹着的东西。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"你们在敲什么。半里地外都听见了。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"敲鼓。你要不要坐？"},
        {"t":"narr","text":"他把布掀开一角，里面是一把二胡。琴杆擦得干净，弦上还留着松香的印。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"我车里有这个。年轻的时候……算了。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"弦乐属火。你还记得火是干什么的？"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"……那是你书上的话。我不认字那一套。"},
        {"t":"narr","text":"话是这么说，他人已经坐下了，把琴杵在膝盖上，调了一根弦。"},
        {"t":"quote","text":"我从前的仪式里没有冗长的讲话，也没有在空中挥舞工具。然而神灵就在那里，就在四周。",
         "en":"I used no lengthy speeches and brandished no tools in the air. Still, the deities were there, all around.","cite":"Chapter 7 · p.58"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"不用讲话。你拉吧。"},
        {"t":"narr","text":"他拉了一段。曲子很短，中间有一处明显跑了音，他自己皱了下眉。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"火这边本来就吵。没人给你记分。"},
        {"t":"choice","prompt":"老陈拉完，手还搭在弓上，眼睛看着火。","options":[
          {"text":"「再来一段。就这一段。」","reply":"他嘴上说「有什么好听的」，手已经动了。这一段比刚才稳。","rel":{"chen":1},"flags":["c5_chen_again"]},
          {"text":"「这个比我拍手好听。」","reply":"他哼了一声。「你那是不会拍。」过了两秒，他自己笑了。","rel":{"chen":1},"flags":["c5_chen_laugh"]},
          {"text":"不说话，把鼓往他脚边推了推。","reply":"他把二胡搁下，试着敲了两下，敲得太用力，把自己都吓了一跳。","insight":1,"flags":["c5_chen_drum"]}]},

        {"t":"narr","text":"守灯人往火里添了根柴，火苗一下子高了半尺。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"鼓点。一组一组地来，别抢。"},
        {"t":"trial","id":"t5_drumbeat"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"顺了。记住这个反应，转圈的时候你要靠它。"},
        {"t":"scene","id":"c5_hand"}
      ]
    },

    /* ===================== 舞与手势 ===================== */
    "c5_hand": {
      title: "第五章 · 舞与手", bg: "fire", music: "trance",
      script: [
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"现在说舞。它是最老的仪式，也是最实在的魔法。"},
        {"t":"quote","text":"舞蹈无疑是一种古老的仪式实践。它也是一种魔法行为，因为身体的运动会从体内释放能量，正是魔法中所用的同一种能量。",
         "en":"Dance is certainly an ancient ritual practice. It's also a magical act, for physical movement releases energy from the body, the same energy used in magic.","cite":"Chapter 5 · p.43"},
        {"t":"codex","ids":["c5_danceenergy"]},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"那得跳得好看吧？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里有一句话，正好是给你的。"},
        {"t":"quote","text":"尽可以按你想要的任何方式移动，不管它看起来多么孩子气或狂野。",
         "en":"Feel free to move in any manner you wish, no matter how child-like or wild it may seem.","cite":"Chapter 5 · p.43"},
        {"t":"narr","text":"阿禾把脚在地上蹭了蹭，还是没动。但她的肩膀先跟着鼓晃起来了。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"作者说，一个人做的时候，不受任何传统和编舞的拘束。"},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"魔法里的那一场舞，是有步骤的。顺序不能乱。"},
        {"t":"trial","id":"t5_thedance"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"到最后会有点难受——身体再也装不下了。就在那一刻放出去。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，有些人到那一下会直接倒在地上。名字叫得挺怪：The Dance。"},
        {"t":"narr","text":"阿禾「啊」了一声，像是没想到跳舞还能跳到倒下去。"},
        {"t":"quote","text":"舞蹈是通往神性的道路之一。",
         "en":"Dance is one of the paths to deity.","cite":"Chapter 5 · p.44"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"也可以跳成别的东西。像风，像溪水，像被雷劈着的树。"},
        {"t":"say","who":"player","name":"你","text":"这些我都做不到。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"做到的一半都算了。站着不动，才是真没做。"},
        {"t":"choice","prompt":"鼓还在响。你怎么办？","options":[
          {"text":"跟着敲，转圈，跳到自己喘不上气。","reply":"你转了十几圈，天地在你眼睛边上打转，胸口那股堵着的东西散了。","flags":["c5_danced"],"insight":1},
          {"text":"只站着，跟着拍手，把鼓点顶上去。","reply":"你把手拍得发麻。守灯人在圈里转，你的拍子一直没掉。","flags":["c5_clapped"]},
          {"text":"拉阿禾一起进圈。","reply":"她被你拽了两步，又退回去半步。第三次她没退，低着头跟上了鼓。","rel":{"he":1},"flags":["c5_hedanced"]}]},
        {"t":"narr","text":"火堆边上，老陈的脚也在地上一下一下地打拍子。他自己好像没发现。"},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"还剩一样东西，你得会。手势。"},
        {"t":"quote","text":"手势是语言的无声对应物。",
         "en":"Gestures are silent counterparts to words.","cite":"Chapter 5 · p.44"},
        {"t":"codex","ids":["c5_gestureword"]},
        {"t":"narr","text":"她把两只手举起来，手指张开，掌心朝天。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"这是请女神和男神的力量进来。手是能量的进出口。"},
        {"t":"narr","text":"然后她把拇指和食指弯成一个半圆，其余三指贴住掌心。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"这个叫新月。女神。"},
        {"t":"narr","text":"下一只手她换了：食指和中指竖起，拇指把剩下两指压向掌心。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"这个叫角。男神。书里说也可以食指配无名指。"},
        {"t":"codex","ids":["c5_goddesshand"]},
        {"t":"codex","ids":["c5_godhand"]},
        {"t":"quote","text":"在五根手指里藏着五芒星——最高的保护符号；四元素之和再加上 akasha，也就是宇宙的灵性力量。",
         "en":"But in their five digits lie the pentagram, the supreme protective magical symbol; the sum of the four elements coupled with akasha, the spiritual power of the universe.","cite":"Chapter 5 · p.45"},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"四个方向，四个手势。你现在把它们摆对。"},
        {"t":"trial","id":"t5_quarters"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"摆对了。记住一件事：手势不做观想，就是比划。"},
        {"t":"narr","text":"她拿手在火前的空气里划了一道五芒星，从下往上，一笔一笔，很慢。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"用刀、用魔杖、用食指都行。看你这一笔是赶谁走，还是请谁来。"},
        {"t":"quote","text":"手可以被看作大锅，因为它能捧住并盛水；看作 athame，因为它用来引导魔法能量；也可看作魔杖，因为它同样能召请。",
         "en":"The hand can be seen as a cauldron, since it can cup and contain water; an athame, since it is used to direct magical energy, and a wand, since it can also invoke.","cite":"Chapter 5 · p.46"},
        {"t":"narr","text":"阿禾在自己胸口偷偷比了一下那个新月。比完赶紧把手放下。"},
        {"t":"think","text":"她不是不想学。她是怕被人看见自己在学。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"……我明天能不能早点来。就我一个人来。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"来。别带别人。"},
        {"t":"scene","id":"c5_after"}
      ]
    },

    /* ===================== 火边剩下的三个人 ===================== */
    "c5_after": {
      title: "第五章 · 余火", bg: "fire", music: "trance",
      script: [
        {"t":"narr","text":"人陆续散了。火矮下去，剩下三个人和一层红炭。"},
        {"t":"narr","text":"老陈一直没走。他把二胡横放在膝盖上，手指在弦上蹭来蹭去。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"你们这个……到底是干什么用的。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你想问哪一样。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"琴。我拉了四十年，今天是头一回听人跟我说，这玩意儿属火。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，弦乐属火——能净化地方，也能净化拉琴的人。"},
        {"t":"narr","text":"她把手电关了。只剩火。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你拉的时候，我绕着这块地走了一圈。头一遍还乱，第三遍就顺了。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"……我没注意。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你不用注意。是它在做事，不是你在做事。"},
        {"t":"narr","text":"他没接话，把弓毛在裤腿上又擦了两下。松香掉在火里，噼了一响。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"我二十岁那年，替人拉过一场婚礼。"},
        {"t":"narr","text":"他说完这句就停了，像是不太确定要不要往下说。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"天冷，院子里烧了两堆火。我拉了一晚上，手指头冻得按不住弦。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"主家给了我一条肉。那年头一条肉不算少。"},
        {"t":"say","who":"player","name":"你","text":"后来呢？"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"后来就没怎么拉过。地里活多，家里事多，琴就搁在车上了。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里把音乐分成三个时候：仪式前、仪式中、仪式后。"},
        {"t":"codex","ids":["c5_musictime"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"前一种用来定气氛，中一种算给神的供奉，后一种就只是高兴。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"今晚你算哪一种？"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"……最后一种。剩我一个人高兴，不算高兴。"},
        {"t":"narr","text":"他说这话的时候没看你们，眼睛盯着炭。"},
        {"t":"choice","prompt":"老陈把琴往你这边递了半尺。","options":[
          {"text":"接过来，学着拉一个音。","reply":"你拉出的声音像猫被踩了尾巴。老陈笑得直咳嗽，说这琴明天得重新调。","rel":{"chen":1},"insight":1,"flags":["c5_tried_bow"]},
          {"text":"「我不碰。这琴跟了你四十年。」","reply":"他看了你一会儿，把琴收回去，抱在怀里。「你小子会说话。」","rel":{"chen":1},"flags":["c5_left_bow"]},
          {"text":"「下回你有空，教我一个调子。」","reply":"「教不了你。」他想了想，「……你来看我拉。就站边上看。」","rel":{"chen":1},"flags":["c5_watch_bow"]}]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"火也别浪费。今晚压住，留着。"},
        {"t":"narr","text":"你们三个用石头把红炭围了个小小的扇形，上面盖了一层湿灰。"},
        {"t":"narr","text":"明天早上拨开，里面还会有火。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"……那我回去了。牛圈还得查一遍。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"琴我留车上。反正本来就一直在车上。"},
        {"t":"narr","text":"他走的时候没提「那本黑书」这三个字。这在他身上很少见。"},
        {"t":"rel","who":"chen","n":1},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"看见没有。他不信神，但他信火边的这一晚。"},
        {"t":"scene","id":"c5_lake"}
      ]
    },

    /* ===================== 湖边 · 姿势与收束 ===================== */
    "c5_lake": {
      title: "第五章 · 湖边", bg: "moon", music: "trance",
      script: [
        {"t":"narr","text":"守灯人没有直接回去。她提了灯，往坡下走，一直走到湖边。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"刚才那几招，换块地方再试一次。地方换了，人就知道自己记没记住。"},
        {"t":"narr","text":"水面很平，月亮在里面碎成一小块一小块的银片。"},

        {"t":"explore","id":"c5_lake","prompt":"湖面上安静得只剩水声。看哪儿？","need":3,"exitLabel":"回到岸上",
         "spots":[
           {"id":"moonref","x":195,"y":8,"w":90,"h":90,"label":"月亮","script":[
             {"t":"narr","text":"月亮比昨晚更圆一点，边上还是缺着一条细边。"},
             {"t":"think","text":"再过几天就是满月。守灯人说我到时候要自己做一场。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"那一晚，你要自己站着。今晚算预习。"}]},
           {"id":"surface","x":60,"y":110,"w":360,"h":110,"label":"湖面","script":[
             {"t":"narr","text":"水面上有一层很薄的雾，贴着水皮走。"},
             {"t":"narr","text":"你把手伸进去，冷得指头发木。你忽然想试试那个新月手势。"},
             {"t":"narr","text":"手指在水里弯成半圆，被月光照亮了半个轮廓。"}]},
           {"id":"treeline","x":0,"y":215,"w":480,"h":55,"label":"林线","script":[
             {"t":"narr","text":"对岸的林子黑成一片，只有顶上的树枝分得清。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"风从那边过来。你听，这声音像不像管乐。"},
             {"t":"narr","text":"风穿过松枝，真的是长长的、带哨音的一口气。"}]},
           {"id":"cloud","x":140,"y":40,"w":100,"h":20,"label":"云缝","script":[
             {"t":"narr","text":"一条云从月亮下面横过去，月亮有一半被遮住了。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"这种时候，不用做什么。站着看一会儿就够了。"},
             {"t":"quote","text":"突然瞥见半掩在云里的满月，就该有片刻的静默、调谐、召请或冥想。这些仪式只与女神和男神分享。",
              "en":"An unexpected glimpse of the full moon half-shrouded in clouds calls for a few moments of silence or attunement, an invocation, or meditation. These are all rituals shared with the Goddess and God alone.","cite":"Chapter 6 · p.53"}]},
           {"id":"footprint","x":400,"y":190,"w":60,"h":60,"label":"脚印","script":[
             {"t":"narr","text":"岸边的湿泥上有两行脚印，一行大，一行小得多。"},
             {"t":"narr","text":"小的那一行在湖边站了很久，来回蹭出了一小片平的地方。"},
             {"t":"think","text":"阿禾刚才跟着我们下来了，我一直没注意。"}]}
         ]},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"还有两个姿势。今晚学完，这一章就完了。"},
        {"t":"narr","text":"她把双脚分开约两尺，双手向前伸出去，掌心朝外，肘微弯。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"女神姿势。你可以用它召请她，也可以只用来跟她的能量对齐。"},
        {"t":"narr","text":"然后她把脚并上，身子挺直，双臂交叉抱在胸前，双手握拳。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"男神姿势。书里说，古埃及的法老在断案的时候，手里握的角度差不多。"},
        {"t":"codex","ids":["c5_postures"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你站一个我看看。"},
        {"t":"choice","prompt":"你站在湖边，要选一个姿势。","options":[
          {"text":"站女神姿势。手伸出去，掌心朝外。","reply":"你站了不到一分钟，胳膊开始抖，但你一直没把手放下。","flags":["c5_goddesspose"]},
          {"text":"站男神姿势。脚并上，抱臂握拳。","reply":"你抱着手臂站在月光里，觉得自己像在跟谁对峙。","flags":["c5_godpose"]},
          {"text":"两个都站一遍，自己比一比。","reply":"先紧，后松。你分不清哪个更像你，倒是第一次发现自己站着时肩膀一直是耸着的。","insight":1,"flags":["c5_bothpose"]}]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书上说，在团体里这两个姿势通常由大祭司和祭司来站。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"一个人修的人，就用它来认自己里面的那两半。"},

        {"t":"trial","id":"t5_handquiz"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"对了。你要是全记住了，反而麻烦。用的时候想起来就行。"},
        {"t":"say","who":"player","name":"你","text":"那手势为什么有用？"},
        {"t":"quote","text":"手势是和任何其他工具一样有力的魔法工具，是我们随时都能带在身边、需要时便可使用的工具。",
         "en":"Gestures are magical tools as potent as any other, ones we can always take with us, to be used when needed.","cite":"Chapter 5 · p.46"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"因为带得走。刀、杖、盘子，都留在屋里。"},
        {"t":"shard","id":"hand"},
        {"t":"achv","id":"c5_bonfire"},
        {"t":"journal","id":"j_c5","title":"第五章 · 本章笔记","lines":[
          "这一章讲了三样东西：音乐、舞蹈、手势。都可以不用任何工具。",
          {"when":"c5_natureanswer","text":"我说音乐是人把自然的声音学一遍，再还回去。守灯人让我记着这句。"},
          {"when":"c5_memorized","text":"我把三个用处背出来了。她说别只背。这话我认。"},
          "乐器分四类，各归一个元素：土、风、火、水。叉铃敲得响，却归水。",
          "「The Dance」是有步骤的：先做一件小事，再转圈，到不归点，把力放出去。",
          {"when":"c5_chen_again","text":"老陈在火边拉了两段二胡。弦乐属火。他嘴上不认，手很稳。"},
          {"when":"c5_hedanced","text":"我把阿禾拉进圈里。她低着头，跟上了鼓。她说明天早点来，一个人来。"},
          "手势我学会了：新月是女神，角是男神，四个方向各一只手。",
          "还有一件没想明白：为什么一个人做，反而更容易把力量放出去。"
        ]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"走吧。满月还有几天。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"在那之前，你得先把自己洗一遍，再想清楚穿什么。"},
        {"t":"say","who":"player","name":"你","text":"这也要挑？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你自己翻到那一页看看。下一页。"},
        {"t":"finishChapter","id":"c5"},
        {"t":"fx","kind":"flash"},
        {"t":"chapter","title":"第六章","sub":"仪 式 之 前","en":"RITUAL AND PREPARATION"},
        {"t":"scene","id":"c6_prep"}
      ]
    }

  },

  /* ===================== 图鉴 ===================== */
  codex: {
    "c5_naturemusic": {"cat":"第五章","title":"自然之声","en":"Sounds of nature","text":"风声、浪声、雨声、雷火的噼啪、鸟鸣兽吼，就是大自然自己的乐器。","src":"p.40"},
    "c5_threepower":  {"cat":"第五章","title":"三个用处","en":"Three uses","text":"这些技巧用来提升力量、改变意识、与神合一。作者说全靠它们的仪式可能最有力。","src":"p.39"},
    "c5_drum":        {"cat":"第五章","title":"鼓与出神","en":"Drum and trance","text":"萨满用稳定的鼓声诱导出神；鼓还能控制魔法舞蹈的快慢。","src":"p.41"},
    "c5_unmusical":   {"cat":"第五章","title":"不会音乐","en":"Unmusical","text":"没有天分的人也能敲石头、摇沙锤、拍手、绕圈走。花哨的编舞不过如此。","src":"p.40"},
    "c5_nocrowd":     {"cat":"第五章","title":"不是表演","en":"No crowd","text":"威卡里的舞与乐只在神灵面前进行。唱错、绊脚都没关系，没人需要知道。","src":"p.40"},
    "c5_resonant":    {"cat":"第五章","title":"共鸣金属","en":"Resonant metal","text":"钹、叉铃、铃、锣属水，管疗愈、生育、友谊、灵性之爱与慈悲。叉铃敲得响，却单被划出来归水。","src":"p.41-42"},
    "c5_stringfire":  {"cat":"第五章","title":"弦乐属火","en":"Strings are fire","text":"里拉、竖琴、吉他、二胡这一类属火：性、健康体力、激情与意志、勇气。","src":"p.42"},
    "c5_danceenergy": {"cat":"第五章","title":"舞即魔法","en":"Dance is magic","text":"身体的运动会释放能量，正是魔法里用的同一种能量。独修不受编舞约束。","src":"p.43"},
    "c5_gestureword": {"cat":"第五章","title":"无声的话","en":"Silent words","text":"手势是语言的无声对应物，可以配合召请和舞蹈，也可以单独使用。","src":"p.44"},
    "c5_goddesshand": {"cat":"第五章","title":"新月手","en":"Crescent moon","text":"拇指与食指弯成半圆、其余手指贴掌，代表新月，用来召请女神。","src":"p.45"},
    "c5_godhand":     {"cat":"第五章","title":"角手","en":"Horns","text":"食指与中指竖起，或食指配无名指，拇指压住其余，代表角，用来召请男神。","src":"p.45"},
    "c5_postures":    {"cat":"第五章","title":"两个姿势","en":"Two positions","text":"女神：脚分开两尺、双手前伸掌心朝外。男神：脚并拢、抱臂握拳。","src":"p.45-46"},
    "c5_sortearth":   {"cat":"第五章","title":"打击乐","en":"Percussion","text":"鼓、沙锤、木琴等打击乐器属土，用来求生育、钱财、工作，也召请女神。","src":"p.41"},
    "c5_musictime":   {"cat":"第五章","title":"三个时机","en":"Before, during, after","text":"音乐用在仪式之前营造气氛，之中作为供奉或唤起能量，之后纯粹庆祝。","src":"p.41"}
  },

  /* ===================== 试炼 ===================== */
  trials: {

    "t5_instruments": {
      kind: "sort", title: "第五章 · 试炼 · 归哪一元素",
      explain: "乐器分四类，各归一个元素。分类不是死的规矩，是用来对准用处的地图。",
      src: "Chapter 5 · p.41-42",
      bins: [
        {"id":"earth","label":"土","tip":"打击乐"},
        {"id":"air","label":"风","tip":"管乐"},
        {"id":"fire","label":"火","tip":"弦乐"},
        {"id":"water","label":"水","tip":"共鸣金属"}
      ],
      items: [
        {"text":"鼓：求生育、增加钱财、找工作","bin":"earth","why":"打击乐器归土，也召请女神，可以「敲出」能量给大地。","src":"p.41"},
        {"text":"沙锤：一边摇一边绕圈提升力量","bin":"earth","why":"沙锤属打击乐，归土。","src":"p.41"},
        {"text":"木琴：用木头敲出的清响","bin":"earth","why":"木琴同样归打击乐一类。","src":"p.41"},
        {"text":"长笛：增强心智力量与观想","bin":"air","why":"管乐归风，也就是理智的元素，也召请男神。","src":"p.42"},
        {"text":"竖笛：发现古老的知识","bin":"air","why":"管乐属风，管心智、沟通、灵能。","src":"p.42"},
        {"text":"吉他：给勇气，仪式前净化场地","bin":"fire","why":"弦乐属火，沿顺时针弹一圈，直到地方随你的振动嗡鸣。","src":"p.42"},
        {"text":"竖琴：激情、意志与改变","bin":"fire","why":"里拉、竖琴、曼陀林、尤克里里都归火。","src":"p.42"},
        {"text":"铃：疗愈与友谊","bin":"water","why":"共鸣金属属水，管疗愈、生育、友谊、灵性之爱。","src":"p.42"},
        {"text":"钹与锣：快乐与慈悲","bin":"water","why":"钹、叉铃、铃、锣都属共鸣金属。","src":"p.42"},
        {"text":"叉铃：敲得响，却不算打击乐","bin":"water","why":"所有的打击乐器都归土——叉铃除外，它归水。","src":"p.41-42"}
      ]
    },

    "t5_drumbeat": {
      kind: "rhythm", title: "第五章 · 试炼 · 跟上鼓点",
      caption: "火边敲起鼓来，别抢，跟着走",
      explain: "鼓点是提升力量的老办法：慢了进不去，快了撑不住。错过一下不要紧，接着走。",
      src: "Chapter 5 · p.41, p.43",
      speed: 112, lead: 1.5, window: 28,
      notes: [1300, 1950, 2600, 3250, 3900, 4550, 5200, 5850, 6500, 7150, 7800, 8450]
    },

    "t5_thedance": {
      kind: "sort", title: "第五章 · 试炼 · 那场舞",
      explain: "「The Dance」分三段：先做一件小动作，再转圈把能量提上去，到了不归点就把力量放出去。",
      src: "Chapter 5 · p.43",
      bins: [
        {"id":"prep","label":"开头","tip":"先做一件小事"},
        {"id":"spin","label":"提升","tip":"转圈把力提上去"},
        {"id":"send","label":"放出去","tip":"不归点之后"}
      ],
      items: [
        {"text":"先刻一个符文、打个结，或者描一个图案","bin":"prep","why":"书里说，先做一个简短的咒语或仪式动作，才进入真正的魔法。","src":"p.43"},
        {"text":"开始提升并引导魔法能量","bin":"prep","why":"这是那一场舞真正的起点：能量从身体里出来。","src":"p.43"},
        {"text":"绕祭坛顺时针转圈，越转越快","bin":"spin","why":"独自一人或跟着团体都可以。","src":"p.43"},
        {"text":"盯着祭坛上的烛火，闻香，不停吟唱","bin":"spin","why":"用吟唱和强烈的观想把自己淹进去。","src":"p.43"},
        {"text":"到达身体再也装不下的那一刻","bin":"spin","why":"作者管它叫不归点：再也提升和引导不出更多能量了。","src":"p.43"},
        {"text":"把力量朝魔法目标放出去","bin":"send","why":"放出之前，目标要已经想清楚。","src":"p.43"},
        {"text":"倒在地上，标记这一场结束","bin":"send","why":"书里说这是部分威卡信徒的做法，他把这名字称作「相当奇特」。","src":"p.43"}
      ]
    },

    "t5_quarters": {
      kind: "arrange", title: "第五章 · 试炼 · 四方之手",
      caption: "把手势摆到它该在的方向上",
      explain: "北土平手，东风张指，南火握拳，西水成杯。摆完这一圈，四个方向就齐了。",
      src: "Chapter 5 · p.45",
      items: [
        {"id":"earth","icon":"salt","label":"平手","why":"北方：平伸的手，与地面平行，召请土。","src":"p.45"},
        {"id":"air","icon":"wind","label":"张指","why":"东方：举起的手，手指大大张开，召请风。","src":"p.45"},
        {"id":"fire","icon":"flame","label":"握拳","why":"南方：举起的拳头，邀请火。","src":"p.45"},
        {"id":"water","icon":"water","label":"成杯","why":"西方：弯成杯状的手，召请水。","src":"p.45"}
      ],
      slots: [
        {"x":240,"y":78, "label":"北 · 土","item":"earth"},
        {"x":330,"y":128,"label":"东 · 风","item":"air"},
        {"x":240,"y":178,"label":"南 · 火","item":"fire"},
        {"x":150,"y":128,"label":"西 · 水","item":"water"}
      ]
    },

    "t5_handquiz": {
      kind: "multi", title: "第五章 · 试炼 · 手上的事",
      q: "下面关于手势和姿势的说法，哪些是书里真说过的？",
      options: [
        "手是能量送出和接收的通道",
        "手势必须配上音乐才有用",
        "五根手指里藏着五芒星",
        "手势能召请男女神，也能在四方切出五芒星",
        "手势只有在团体仪式里才有效",
        "做手势时一定要用魔法刀",
        "手势是随时带得走的魔法工具",
        "手势要先背熟全部含义才能用"
      ],
      answers: [0, 2, 3, 6],
      explain: "手是通道，五指含五芒星，手势能召请也能驱逐。它不依赖任何工具和场地，所以最随身。",
      src: "Chapter 5 · p.45-46"
    }

  },

  /* ===================== 符印与成就 ===================== */
  sigils: {
    "hand": {"name":"手印","icon":"star","desc":"新月是女神，角是男神。五个指头里藏着五芒星。","src":"第五章 · p.45"}
  },

  achv: {
    "c5_bonfire": {"name":"火边的第一次","desc":"在篝火夜跳完、敲完、比完那一圈手势。"}
  }

});
