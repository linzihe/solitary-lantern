/* 第六章 · 仪式之前（Ritual and Preparation for Ritual）
 * 作者 C。资料：notes_ch5_7.md（第6章 p.47–55；原书第48页 OCR 整页缺失）。
 * 一条线：雨天的小屋 —— 泡烂的第48页 → 沐浴与着装 → 阿禾丢手链 → 邀请谁。
 */
STORY_ADD({

  scenes: {

    /* ===================== 满月前三天 · 泡烂的一页 ===================== */
    "c6_prep": {
      title: "第六章 · 雨里的那本书", bg: "rainy", music: "cottage",
      script: [
        {"t":"intro","chapter":"第六章","title":"仪 式 之 前","book":"第六章 Ritual and Preparation for Ritual · 原书 p.47-55（第48页缺失）",
         "points":["满月还有三天，雨一直没停","书里少了一页，谁也没见过它","洗、穿、戴、请谁——每一步都可以不选","独修不是二流"]},

        {"t":"narr","text":"雨下了三天。坡上的路变成了泥，踩一脚要甩两下。"},
        {"t":"narr","text":"你抱着伞走到守灯人的小屋前。灯是亮的，门关着。"},
        {"t":"narr","text":"敲了两下，没人应。第三下的时候，门从里面开了。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"进来。别在门口站着，湿气往里灌。"},
        {"t":"say","who":"player","name":"你","text":"再过三天就是满月。我要自己做一场。"},
        {"t":"narr","text":"她把书翻到第 47 页，用手指按住，又往后翻了一下。"},
        {"t":"narr","text":"第 48 页泡烂了。纸发黄，从中间鼓起来，一碰就往下掉渣。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"去年秋天，屋顶漏了一夜。就这一页毁得最彻底。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"那一页说的，大概是准备仪式的头几步。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"时间、地点、心里得先有数。就这一页，我补不上。"},
        {"t":"think","text":"书能借，页不能借。她自己也没打算编。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"别盯着我看。先在这屋里走一圈，看看那些东西。"},

        {"t":"explore","id":"c6_cottage","prompt":"屋里挂着、摊着、摆着好些东西。先看哪个？","need":3,"exitLabel":"回到桌前",
         "spots":[
           {"id":"page48","x":200,"y":140,"w":130,"h":55,"label":"泡烂的书","script":[
             {"t":"narr","text":"那一页的纸已经粘成一块。边上能看清的只有两个半字：一个「的」，一个「或」。"},
             {"t":"quote","text":"仪式是「一种特定形式的动作、对物品的操作，或一系列内在过程，旨在产生期望的效果」。",
              "en":"I have defined ritual as a specific form of movement, manipulation of objects, or series of inner processes designed to produce desired effects.","cite":"Chapter 6 · p.47"},
             {"t":"narr","text":"后一页说的是沐浴。也就是说，缺的那一页只管开头。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"前面这几步，每一步都可以不做。书里后来都写了。"}]},
           {"id":"herbs","x":95,"y":25,"w":200,"h":90,"label":"挂的草","script":[
             {"t":"narr","text":"房梁下吊着一排干草，每一把都用细绳分开捆着，标签是用铅笔记的。"},
             {"t":"narr","text":"最右边那一把颜色最深，叶子碎，闻起来苦里发闷。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"缬草根。磨碎的。就一点点，多一点整桶水都是它的味。"}]},
           {"id":"robe","x":290,"y":170,"w":130,"h":60,"label":"旧袍子","script":[
             {"t":"narr","text":"草床边上搭着一件深色的布袍，洗得发软，袖口磨白了。"},
             {"t":"narr","text":"下摆有一小块补丁，针脚很挤，是后来自己缝的。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"穿了十几年。今晚你不用挑样式，先把颜色想明白。"}]},
           {"id":"tub","x":0,"y":90,"w":80,"h":160,"label":"木桶","script":[
             {"t":"narr","text":"灶间角落里立着一只大木桶，桶箍是铁的，被水泡出一层黑锈。"},
             {"t":"narr","text":"桶底还留着上次的水，浅得照不出人。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"热水我烧好了。今晚先洗，再谈穿。"}]},
           {"id":"window","x":300,"y":55,"w":110,"h":110,"label":"窗","script":[
             {"t":"narr","text":"窗玻璃上流着雨，外面的坡和林子全被搅成一团灰绿。"},
             {"t":"narr","text":"你想起那天夜里在篝火边上的自己，觉得像另一个人。"},
             {"t":"quote","text":"学习威卡最好的方法就是去实践它。",
              "en":"The best way to learn Wicca is to practice it.","cite":"Chapter 6 · p.47"}]}
         ]},

        {"t":"say","who":"player","name":"你","text":"……这一页缺着，我心里不踏实。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你怕漏掉一步，仪式就不算数。是不是这个意思。"},
        {"t":"think","text":"她一句话就说到了。我确实是这么想的。"},
        {"t":"quote","text":"这些仪式不必事先计划、排练或遵循传统，也不必死板地照搬某一种模式。",
         "en":"These rituals need not be preplanned, rehearsed, or traditional, nor must they slavishly adhere to one particular pattern or form.","cite":"Chapter 6 · p.47"},
        {"t":"codex","ids":["c6_notpreplanned"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"作者跟好多人聊过这个事。他们说，当场编出来的仪式往往最有力。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"外在的形式不重要。重要的是你有没有真的觉出神在那儿。"},
        {"t":"codex","ids":["c6_outerform"]},
        {"t":"say","who":"player","name":"你","text":"那我们为什么还要洗、还要挑衣服？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"因为人是要靠身体才肯认真起来的。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，很多人想做仪式，最后坐在那儿告诉自己：我没老师，没人给我入门，我不知道怎么弄。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里写：仪式是庆祝、也是加强我们与女神、男神和大地的关系。"},
        {"t":"codex","ids":["c6_ritualdef"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，即兴创造的仪式，可能是最有力、最有效的。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你看，正好是缺了一页的那一章说的。"},
        {"t":"narr","text":"她把那本泡坏的书往你面前推了推，手还压在书脊上。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"这一页你自己补吧。"},
        {"t":"say","who":"player","name":"你","text":"我补？我又没读过。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你补的不是那一页的字。是你自己那三步。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"先在纸上写四行。写完了我们再动手。"},
        {"t":"choice","prompt":"你把笔尖悬在纸上。第一行写什么？","options":[
          {"text":"「我为什么要做这一场。」","reply":"写完这行，你停了好一会儿。后面三行反而快了。","flags":["c6_wrote_why"]},
          {"text":"「不做会怎样。」","reply":"守灯人从你背后看了一眼，什么也没说，去添了块柴。","flags":["c6_wrote_cost"]},
          {"text":"先空着，等洗完再写。","reply":"你把纸压在灯下。守灯人点了下头：「也行。别急着给答案。」","insight":1,"flags":["c6_wrote_later"]}]},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"现在挑一样东西出来，我们要用。"},
        {"t":"narr","text":"她从架子上取下三样：一块干布，一把晒过的草，一根红蜡。"},
        {"t":"trial","id":"t6_prep"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"是这个顺序。洗、穿、戴。做完再想请谁。"},
        {"t":"codex","ids":["c6_bathtime"]},
        {"t":"sfx","name":"page"},
        {"t":"scene","id":"c6_dress"}
      ]
    },

    /* ===================== 沐浴 · 着装 · 饰品 ===================== */
    "c6_dress": {
      title: "第六章 · 洗、穿、戴", bg: "rainy", music: "cottage",
      script: [
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"水开了。你先把浴桶旁边的东西看一遍。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"用什么、放什么，我不管。你自己挑。"},

        {"t":"explore","id":"c6_bath","prompt":"浴桶旁边摆着几样东西。看哪个？","need":3,"exitLabel":"开始洗",
         "spots":[
           {"id":"bucket","x":60,"y":150,"w":70,"h":60,"label":"木桶","script":[
             {"t":"narr","text":"木桶里已经放了半桶热水，水面冒着一层薄汽。"},
             {"t":"narr","text":"守灯人把灶门掩了一半，说：「水别兑凉。凉了就不是洗，是忍。」"}]},
           {"id":"herbbag","x":140,"y":120,"w":80,"h":50,"label":"草药","script":[
             {"t":"narr","text":"簸箕里摊着八小堆干草，颜色从灰绿到深褐，各自分开。"},
             {"t":"narr","text":"旁边一只小碟，装着磨好的粉末，颜色最暗。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"八样等份，最后加一点这个。少一样也不算错，只是味会变。"}]},
           {"id":"candle","x":200,"y":130,"w":50,"h":60,"label":"蜡烛头","script":[
             {"t":"narr","text":"窗台上立着一个很短的蜡烛头，烛芯剪得齐，火苗不动。"},
             {"t":"narr","text":"旁边点着一小段线香，烟贴着天花板走。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，洗澡水里可以加香、加油、加草包。也可以就点根蜡。"}]},
           {"id":"well","x":300,"y":170,"w":120,"h":70,"label":"井水","script":[
             {"t":"narr","text":"墙角有一只水缸，缸口盖着木板，水上漂着一片葫芦做的舀子。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"要是在湖边、溪边做仪式，跳下去游一圈，就算洗过了。"}]},
           {"id":"mirror","x":380,"y":60,"w":70,"h":80,"label":"铜镜","script":[
             {"t":"narr","text":"墙上挂着一面小铜镜，照出来的人影是黄的，边上发黑。"},
             {"t":"narr","text":"你看见自己的头发湿了一半，肩往下缩着。"},
             {"t":"think","text":"我好像一直是这样站着的。"}]}
         ]},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里给了一个方子，我念给你，你记着怎么配。"},
        {"t":"quote","text":"我最喜欢的净化浴香包，是等份的迷迭香、茴香、薰衣草、罗勒、百里香、牛膝草、马鞭草和薄荷，再加一点磨碎的缬草根。",
         "en":"My favorite purification bath sachet consists of equal parts of rosemary, fennel, lavender, basil, thyme, hyssop, vervain, mint, with a touch of ground valerian root.","cite":"Chapter 6 · p.49"},
        {"t":"codex","ids":["c6_sachet"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"这个方子不是她自己想的，是从《所罗门之钥》来的。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"用布包住，两头扎紧，别让渣漏出来。然后丢进桶里。"},
        {"t":"trial","id":"t6_bathherbs"},
        {"t":"narr","text":"你把药包按进水里，水一下变成了浅浅的茶色。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，浴室里点蜡烛和香，水里加油或草药包，洗澡常常自己就成了仪式。"},
        {"t":"codex","ids":["c6_bathritual"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"现在你告诉我：这一步，你是不是非做不可。"},
        {"t":"say","who":"player","name":"你","text":"……不是吧。你说每一步都能不做。"},
        {"t":"quote","text":"如果你觉得沐浴舒服，就沐浴吧。如果你觉得没必要，那就没必要。",
         "en":"If you feel comfortable bathing, do so. If you don't feel it's necessary, it isn't.","cite":"Chapter 6 · p.49"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"对。有人还说，仪式前根本没必要洗。作者也没反对。"},
        {"t":"narr","text":"她出去了，把门带上，门缝里还留着一条白汽。"},
        {"t":"narr","text":"你在水里坐了很久。草药的味道先是冲，后来变平。"},

        {"t":"bg","name":"cottage"},
        {"t":"narr","text":"洗完出来，你站在火边擦干头发。守灯人把三样东西并排放在桌上。"},
        {"t":"narr","text":"一件深色的旧袍，一件干净的棉衬衫，还有一只手在袍子上按着。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"三样：什么都不穿，穿只为仪式穿的袍子，穿干净便服。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，很多威卡信徒觉得裸身更容易召请自然的神。它确实是身体最自然的状态。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"不过——那种状态并不适合每个人。这一句书里跟着就写了。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"也有人说，穿着衣服，力量就发不出去。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"作者根本不吃这一套。他说，衣服不是力量传递的障碍。"},
        {"t":"quote","text":"穿衣服的威卡信徒产生的魔法，和裸身的威卡信徒一样有效。衣服不是力量传递的障碍。",
         "en":"If clothed, Wiccans produce magic just as effective as that produced by naked Wiccans. Clothing is no barrier to the transference of power.","cite":"Chapter 6 · p.49"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"他自己讲的道理更实在：这是象征。在神面前彻底坦白，不留遮掩。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"作为独修者，选择权在你。这话是书里原话。"},
        {"t":"choice","prompt":"满月那天，你穿什么？","options":[
          {"text":"什么都不穿。屋里门窗都关严。","reply":"你说出口的时候耳朵有点热，但还是说清楚了。守灯人只应了一声「嗯」。","flags":["c6_nude"]},
          {"text":"穿那件只为仪式穿的旧袍子。","reply":"袍子太长，你踩了一下下摆。守灯人说：「裁两寸，别在蜡烛边上晃。」","flags":["c6_robe"]},
          {"text":"穿干净的棉布衣服。反正神不看我穿什么。","reply":"守灯人笑了一声：「这句是作者的异端话。他写的时候就知道会挨骂。」","rel":{"keeper":1},"flags":["c6_street"]}]},

        {"t":"narr","text":"袍子的事还没完。守灯人把架子上几条不同颜色的旧布抽出来，搭在椅背上。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"要是穿袍子，就得挑颜色。书里说，颜色有各自的振动。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你最缺哪一样，就先穿哪一样。别按好看挑。"},
        {"t":"narr","text":"黄的、紫的、蓝的、绿的、棕的、白的、橙红的、黑的，一字排开。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"黄管占卜。紫是给用纯神圣力量的人，或者想更深地觉知神的人。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"蓝是疗愈和灵能，还有跟海相的女神调谐。绿给草药师，也用于护生态的事。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"棕是跟动物打交道的。白管净化、冥想、满月，还有跟女神调谐。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"橙和红用在太阳节、保护仪式，还有跟火焰般的男神调谐。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"黑的先用不着提。有人一见黑就说邪门。"},
        {"t":"quote","text":"与流行的误解相反，黑色并不象征邪恶。它是颜色的缺席。",
         "en":"Contrary to popular misconceptions, black doesn't symbolize evil. It is the absence of color.","cite":"Chapter 6 · p.51"},
        {"t":"codex","ids":["c6_blackrobe"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，黑是保护色，代表夜、宇宙，还有「没有假话」。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"穿上黑袍，就等于披上了外太空的黑——那是神圣能量最终来的地方。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"挑之前，先把颜色对一遍。别挑错，也别嘴上说知道。"},
        {"t":"trial","id":"t6_dress"},
        {"t":"choice","prompt":"你伸手要拿一条。","options":[
          {"text":"白色。这一场是满月，我想干净一点。","reply":"她把白布抖开，在你肩上比了比，又收回去叠好。","flags":["c6_color_white"]},
          {"text":"蓝色。我想让脑子里安静下来。","reply":"她说：「蓝是给疗愈和灵能的。你要安静，不是要能力。」但她还是递给了你。","flags":["c6_color_blue"]},
          {"text":"绿色。地里的事我熟。","reply":"她点头：「草药师和护生态的人穿绿。这个挑得不亏。」","insight":1,"flags":["c6_color_green"]},
          {"text":"黑色。只为那句「没有假话」。","reply":"她把黑袍搭在你手臂上，比别的都重一些。","flags":["c6_color_black"]}]},
        {"t":"narr","text":"你把布搭在椅背上，忽然想到还剩一样没做。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，穿好之后，自然是挑饰品。这一步也可以跳。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"新月、安卡、五芒星。戴一两件舒服的就够，别的都是奢侈品。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"还有一句你别忘了：护身符是挡东西的，法宝是招东西的。两回事。"},
        {"t":"codex","ids":["c6_jewelry"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"我自己戴过银五芒星、女神像、埃及安卡，还有一只夏威夷的鱼钩。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"戴上它们，脑子会自己转到该在的位置上。就这么点用处。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"戴什么、不戴什么，你自己定。我只看你有没有想清楚。"},
        {"t":"sfx","name":"select"},
        {"t":"scene","id":"c6_hand"}
      ]
    },

    /* ===================== 阿禾的幸运手链 ===================== */
    "c6_hand": {
      title: "第六章 · 幸运手链", bg: "rainy", music: "cottage",
      script: [
        {"t":"narr","text":"门外有人踩着水跑过来，跑得很急，鞋底在门槛上滑了一下。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"你们在不在——"},
        {"t":"narr","text":"她推门进来，浑身是水，头发贴在额头上。她站着，两只手在自己袖子里翻。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我的手链不见了。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"今天早上还在。我摸了一遍，又摸了一遍。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"……我在坡上来回走了四趟。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"先坐下。你手上还在滴水。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"那条是我妈留给我的。"},
        {"t":"narr","text":"她说这句话的时候声音是平的，眼睛却开始红了。"},
        {"t":"narr","text":"守灯人没说话，往灶里塞了根柴，然后转头看你。"},

        {"t":"explore","id":"c6_heroom","prompt":"阿禾的东西摊了一桌。看哪个？","need":2,"exitLabel":"回过身",
         "spots":[
           {"id":"hand","x":200,"y":140,"w":120,"h":50,"label":"她的手","script":[
             {"t":"narr","text":"她的手很小，指甲修得很短，手腕内侧有一道白印，是被绳子勒久了的痕迹。"},
             {"t":"narr","text":"那道印子还在。东西不在了。"},
             {"t":"think","text":"她说的手链，是戴了很多年的那种。"}]},
           {"id":"pouch","x":300,"y":90,"w":60,"h":60,"label":"小布袋","script":[
             {"t":"narr","text":"她随身的小布袋也湿了，里面翻出来一颗玻璃珠、一张药方、两根断了的发绳。"},
             {"t":"narr","text":"没有手链。"},
             {"t":"say","who":"he","name":"阿禾","por":"he","text":"我把能装东西的地方都翻过了。"}]},
           {"id":"note","x":95,"y":25,"w":90,"h":70,"label":"一张纸","script":[
             {"t":"narr","text":"桌上压着一张折了三折的纸。你瞥见上面写着两行字，字很用力，纸都透了。"},
             {"t":"narr","text":"落款是「小满」。你没往下看，把纸放回原处，压上那颗玻璃珠。"},
             {"t":"think","text":"她急的不只是手链。"}]},
           {"id":"door","x":380,"y":55,"w":90,"h":110,"label":"门口","script":[
             {"t":"narr","text":"门口的水泥地上有一串湿脚印，从外面一直连到桌子底下。"},
             {"t":"narr","text":"脚印在桌边转了两圈，又折回去。"},
             {"t":"narr","text":"你顺着往外看：雨还在下，院子里的泥地被踩得乱七八糟。"}]}
         ]},

        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我明天要去镇上找。贴个条子，问一声。"},
        {"t":"narr","text":"她说完自己也知道不现实：镇上那么大，一张纸条算什么。"},
        {"t":"choice","prompt":"阿禾坐在灶前，两只手攥着自己手腕上那道印子。","options":[
          {"text":"先陪她坐一会儿，递块干布。","reply":"她接了布，没擦脸，先把手腕擦了。过了一会儿她说：「我是不是很傻。」","rel":{"he":1},"flags":["c6_he_comfort"]},
          {"text":"「戴上才是好运、摘了就不是——这是手链在说。」","reply":"她抬眼看你，眼神一下变硬了。「你跟我叔一个口气。」","rel":{"he":-1},"flags":["c6_he_lecture"]},
          {"text":"「走，我陪你出去找一趟。」","reply":"她愣了半秒，抓起你的袖子就往外冲，连伞都没拿。","rel":{"he":1},"flags":["c6_he_search"]},
          {"text":"「你会做一条新的吗？你妈的手艺你记得多少。」","reply":"她张了张嘴，说不会，然后开始哭，这次哭出来了。","rel":{"he":1},"flags":["c6_he_remember"]}]},

        {"t":"narr","text":"守灯人从灶间出来，手里端着一碗热水，放在阿禾面前。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"我十七八岁的时候，也丢过一件东西。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"丢完那半年，我干什么都先摸摸脖子。你说那算什么。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"……算什么呢。"},
        {"t":"quote","text":"把我们的希望、梦想和能量寄托在物质对象上，是不明智的。",
         "en":"It isn't wise to put our hopes, dreams, and energies into physical objects.","cite":"Chapter 6 · p.52"},
        {"t":"codex","ids":["c6_noluck"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，作者自己就没有幸运符，也没有随身的力量物件。别人问他，他就一个字：没有。"},
        {"t":"quote","text":"不容易看到的是：我们所需要的一切力量和运气，都在我们自身之内。",
         "en":"What isn't easy to see is that all the power and luck we need is within ourselves.","cite":"Chapter 6 · p.52"},
        {"t":"codex","ids":["c6_powerwithin"]},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"那我妈给我的东西，就什么都不是了？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里没这么说。它说，这种东西可以是提醒，是我们自己亲近什么的记号。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"它不该变成别的东西。它一变成保证，你就得听它的。"},
        {"t":"codex","ids":["c6_reminder"]},
        {"t":"narr","text":"阿禾低头看着碗里的水。热气把她的脸照得模糊。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"那我今晚不找了。明天再说。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"……你别跟我叔说。他肯定要说我命都不在自己手里。"},
        {"t":"sfx","name":"chime"},
        {"t":"scene","id":"c6_alone"}
      ]
    },

    /* ===================== 邀请谁 · 独修不是二流 ===================== */
    "c6_alone": {
      title: "第六章 · 请谁", bg: "rainy", music: "cottage",
      script: [
        {"t":"narr","text":"雨小了些。阿禾抱着碗坐在门口，看屋檐往下滴的水线。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"还有一件。书里说，洗完、穿好、戴完，还剩一个大问题。"},
        {"t":"say","who":"player","name":"你","text":"什么问题？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"同伴。你一个人做，还是叫人来。"},
        {"t":"quote","text":"书里说：沐浴、着装、佩戴饰品之后，你已经准备好了。还有别的考虑吗？有，一个大问题——同伴。",
         "en":"So, now you're bathed, clothed, adorned, and ready for ritual. Any other considerations? Yes, a big one--company.","cite":"Chapter 6 · p.53"},
        {"t":"narr","text":"你没有立刻回答。屋子外面是雨，屋里是柴火偶尔爆一下。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"有朋友想邀请，就可以请。没有也没事，刚开始一个人做很好。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"但志同道合的人在场，也会让人拘束。这两句书里都写着。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"有些仪式就是不能有别人。比如一抬头,忽然看见半遮在云里的满月。"},
        {"t":"quote","text":"神灵不拘礼节；他们像大自然本身一样不可预测、自在流动。",
         "en":"Deities don't stand on ceremony; they're as unpredictable and flowing as nature herself.","cite":"Chapter 6 · p.53"},
        {"t":"codex","ids":["c6_company"]},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"要请人，就只请真的认同这件事的人。"},
        {"t":"quote","text":"如果你要和朋友们一起做仪式，那就只和那些真正认同你对威卡感受的人一起。",
         "en":"If you wish to gather with friends for your rituals, do so only with those who are truly in tune with your feelings concerning Wicca.","cite":"Chapter 6 · p.53"},
        {"t":"codex","ids":["c6_onlytune"]},
        {"t":"say","who":"player","name":"你","text":"那我怎么知道谁真认同？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你自己心里有数。你认识的人里，谁会笑话，谁会陪着不说话。"},
        {"t":"narr","text":"她顿了一下。「偷笑和走神，对你一点用都没有。这句是书里说的。」"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里还提醒一句：光因为你感兴趣才感兴趣的人，过一阵子你就会发现他不顶用。"},
        {"t":"quote","text":"也要当心恋人——那个只因为你感兴趣才感兴趣的男/女朋友或配偶。",
         "en":"Also beware the love interest-the boyfriend or girlfriend, husband or wife who takes an interest only because you're interested.","cite":"Chapter 6 · p.54"},
        {"t":"think","text":"她这话是说给谁听的？阿禾还坐在门口，没抬眼。"},

        {"t":"explore","id":"c6_invite","prompt":"灶火边这个位置，就是明天要画圈的中间。看哪儿？","need":2,"exitLabel":"转过身来",
         "spots":[
           {"id":"stool","x":80,"y":205,"w":60,"h":50,"label":"凳子","script":[
             {"t":"narr","text":"门槛边摆着一张很矮的木凳，凳面被坐得发亮。"},
             {"t":"narr","text":"阿禾刚才就是坐在这儿，把湿鞋朝火那边伸着。"},
             {"t":"think","text":"她要是来，就坐这儿。她要是来了不说话，也算来了。"}]},
           {"id":"papers","x":310,"y":190,"w":80,"h":45,"label":"那张纸","script":[
             {"t":"narr","text":"你写的那四行还压在灯台下，边角被灶间的潮气抿软了。"},
             {"t":"narr","text":"第二行还空着。你盯着它看了一会儿，还是没写。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里那句话我一直记着：你可以自由地写属于你自己的仪式。"}]},
           {"id":"rain","x":300,"y":55,"w":110,"h":110,"label":"雨","script":[
             {"t":"narr","text":"窗外雨线斜着落，坡下的石圈方向只剩一团灰。"},
             {"t":"narr","text":"明晚要是还这样，就只能在屋里做。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"屋里也行。书里说，摆不下的东西就留给下一次。"}]},
           {"id":"chenroad","x":0,"y":90,"w":80,"h":160,"label":"去村口","script":[
             {"t":"narr","text":"灶间那扇小门的玻璃上，雨痕把村口的路拉成了一条条竖线。"},
             {"t":"narr","text":"那条路上，老陈的牛棚在更外面一点。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你要是想叫他，我也不拦。他骂归骂，眼睛不瞎。"}]}
         ]},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"我知道你还有一个问题，你不好意思问。"},
        {"t":"say","who":"player","name":"你","text":"……一个人做，算不算偷工减料。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里有一段，专门写给问这个问题的人。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说得很直：独修威卡不该被看作次于「真东西」的二流选择。"},
        {"t":"codex","ids":["c6_nosecond"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"作者说，今天敬拜古神的人里，一个人做的比团体成员多得多。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"其中不少人是有得选，却选了独自一个。他自己也是。"},
        {"t":"quote","text":"永远不要因为你不是在老师或成熟 coven 的指导下修习，就觉得自己不如人。",
         "en":"Never feel inferior because you're not working under the guidance of a teacher or an established coven.","cite":"Chapter 6 · p.54"},
        {"t":"say","who":"player","name":"你","text":"那没有人承认我，怎么办。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说得很干脆：承认这件事，只在给的人和拒的人眼里重要，否则它什么都不是。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你只要对自己有交代，跟神有关系。仪式自己写。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，威卡是个还在长的宗教。它的心是对自然和神的爱。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"不是没完没了的传统和古礼。这两句是连着的。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"那我算认同的人吗。"},
        {"t":"narr","text":"她不知什么时候转过身来，坐在门槛上，两条腿泡在雨里。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"这得问你自己。你刚才在门口坐了半个钟头，没走。"},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里还有一个比喻，说完我就不说了。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"每个传统都像一片花瓣。没有哪一片是整朵花，但少一片花就不成。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"独修这条也一样，是这朵花的一部分。"},
        {"t":"narr","text":"她把笔和那张黄纸推到你面前，纸上的第二行还是空的。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"写两样。你想从这路上得到什么。你能给出去什么。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"第二样不许写钱，也不许写东西。"},
        {"t":"choice","prompt":"第二样你写什么？","options":[
          {"text":"「我肯花时间。哪怕一年也看不出变化。」","reply":"她看了很久，说：「这一条最难，也最真。」","flags":["c6_give_time"],"insight":1},
          {"text":"「我不拿它去换钱、换名声。」","reply":"她点头：「书里最反对的就是这一条。你先写上，省得以后自己忘了。」","rel":{"keeper":1},"flags":["c6_give_nomoney"]},
          {"text":"「我肯从头学，从头错。」","reply":"她笑了一声：「那你这行字写得太省了。错是要一样一样错的。」","flags":["c6_give_learn"]}]},
        {"t":"trial","id":"t6_check"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"好。现在只剩最后一件事。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"明晚满月，地点我来定。人来不来，你定。"},
        {"t":"narr","text":"她把那件旧袍子从椅背上拿起来，搭在你手臂上，转身去关门挡风。"},

        {"t":"choice","prompt":"你走到门口。阿禾还在门槛上坐着。这件事你得现在说。","options":[
          {"text":"「明晚你来吧。就在坡上。」","reply":"她点头点得太快，快得像是早就等着这一句。","flags":["c6_invite_he"],"rel":{"he":1}},
          {"text":"「我去问问老陈。他要来就来。」","reply":"守灯人在灶边哼了一声，没回头，但嘴角动了一下。","flags":["c6_invite_chen"],"rel":{"chen":1}},
          {"text":"「两个都叫上。」","reply":"你说完自己都愣了一下。守灯人说：「行。人多，我就不说话了。」","flags":["c6_invite_he","c6_invite_chen"]},
          {"text":"「这一次我自己来。」","reply":"阿禾「哦」了一声，把腿从雨里收回来，站起来穿鞋。","flags":["c6_alone"]}]},

        {"t":"narr","text":"阿禾先走了。她走之前回头看了一眼桌上那张纸，没问上面写了什么。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我明天来不来，看天。"},
        {"t":"say","when":"c6_invite_he","who":"keeper","name":"守灯人","por":"keeper","text":"她会来。她说看天，其实就是看自己敢不敢。"},
        {"t":"say","when":"c6_alone","who":"keeper","name":"守灯人","por":"keeper","text":"一个人做也好。明晚我在坡下等着，不上来。"},
        {"t":"say","when":"c6_invite_chen","who":"keeper","name":"守灯人","por":"keeper","text":"老陈要是真来了，你一句话都别劝他。让他自己站。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"回去把头发擦干。明天你要是感冒了，仪式得改成熬姜汤。"},
        {"t":"shard","id":"robe"},
        {"t":"achv","id":"c6_ready"},
        {"t":"journal","id":"j_c6","title":"第六章 · 本章笔记","lines":[
          "满月前三天，我去了小屋。书里第 48 页被雨泡烂了，守灯人说这一页我自己补。",
          "书里说准备的头几步是：沐浴、着装、饰品，然后决定一个人还是叫人。全是可选的。",
          {"when":"c6_robe","text":"我挑了一件只为仪式穿的袍子。"},
          {"when":"c6_nude","text":"我决定满月那天什么都不穿。说出口的时候耳朵是热的。"},
          {"when":"c6_street","text":"我决定穿干净的棉布衣服。守灯人说这是作者挨骂的那一段。"},
          "浴草包：迷迭香、茴香、薰衣草、罗勒、百里香、牛膝草、马鞭草、薄荷各等份，再加一点磨碎的缬草根。",
          "阿禾丢了她妈留下的手链。作者说他从来没有幸运符——力量和运气都在自己身上。",
          {"when":"c6_he_lecture","text":"我对阿禾说了句硬话，她生气了。我到现在还觉得我说得对，但话说早了。"},
          {"when":"c6_he_comfort","text":"我陪阿禾坐了一会儿。她问自己是不是很傻。我没答。"},
          "独修不是二流。承认这件事，只在给的人和拒的人眼里重要。",
          "明天满月。我还没想好第一句要说什么。"
        ]},
        {"t":"say","who":"player","name":"你","text":"守灯人。"},
        {"t":"say","who":"player","name":"你","text":"明天……我该先做什么？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"先站在那儿，等心静下来。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"然后你会发现，你还缺一样东西——一个圈。"},
        {"t":"say","who":"player","name":"你","text":"圈？地上画一个？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"不是画在地上。是画在你站的那一块地方。"},
        {"t":"think","text":"她说得含糊。但我知道明天她会讲这一章。"},
        {"t":"finishChapter","id":"c6"},
        {"t":"fx","kind":"flash"},
        {"t":"chapter","title":"第七章","sub":"圈 与 祭 坛","en":"THE MAGIC CIRCLE AND THE ALTAR"},
        {"t":"scene","id":"c7_circle"}
      ]
    }

  },

  /* ===================== 图鉴 ===================== */
  codex: {
    "c6_ritualdef":   {"cat":"第六章","title":"什么是仪式","en":"Ritual","text":"书里把仪式定义为一类动作、对物品的操作，或一系列内在过程，用来产生想要的效果。","src":"p.47"},
    "c6_notpreplanned": {"cat":"第六章","title":"不用排练","en":"No rehearsal","text":"仪式不必事先计划、排练或依传统；当场编出来的，往往最有力。","src":"p.47"},
    "c6_outerform":   {"cat":"第六章","title":"形式不重要","en":"Outer form","text":"外在形式不重要，只要它真让你觉知到内在的神。","src":"p.47"},
    "c6_bathtime":    {"cat":"第六章","title":"先洗再穿","en":"Bath, then dress","text":"可见的准备顺序：沐浴、着装、佩戴饰品，最后考虑同伴。每一步都可以不做。","src":"p.49-53"},
    "c6_bathritual":  {"cat":"第六章","title":"洗澡即仪式","en":"The bath as ritual","text":"浴室里点蜡烛和香，水里加芳香油或草药包——洗澡常常本身就成了仪式。","src":"p.49"},
    "c6_sachet":      {"cat":"第六章","title":"浴草包","en":"Bath sachet","text":"迷迭香、茴香、薰衣草、罗勒、百里香、牛膝草、马鞭草、薄荷各等份，加磨碎的缬草根。","src":"p.49"},
    "c6_blackrobe":   {"cat":"第六章","title":"黑袍","en":"Black robe","text":"黑色不象征邪恶，它是颜色的缺席；是保护色，代表夜、宇宙和「没有假话」。","src":"p.51"},
    "c6_jewelry":     {"cat":"第六章","title":"饰品","en":"Jewelry","text":"新月、安卡、五芒星，戴一两件舒服的就够。护身符挡东西，法宝招东西。","src":"p.51-52"},
    "c6_noluck":      {"cat":"第六章","title":"没有幸运符","en":"No lucky charm","text":"作者说自己没有幸运符，也没有随身的力量物件。别人问他，他答：我没有。","src":"p.52"},
    "c6_powerwithin": {"cat":"第六章","title":"力量在内","en":"Within ourselves","text":"我们所需要的一切力量和运气都在自身之内，除非我们自己允许，否则它不会被包在外物里。","src":"p.52"},
    "c6_reminder":    {"cat":"第六章","title":"只是提醒","en":"A reminder","text":"力量物件和饰品可以是神的提醒、自己亲和的记号，但不该变成更多的东西。","src":"p.53"},
    "c6_company":     {"cat":"第六章","title":"同伴","en":"Company","text":"有朋友就请，没有也没事；有人在场很好，也可能让人拘束。有些仪式只能一个人做。","src":"p.53"},
    "c6_onlytune":    {"cat":"第六章","title":"只请认同的","en":"Only the in-tune","text":"只和真正认同你对威卡感受的人一起。偷笑和走神帮不了你。","src":"p.53"},
    "c6_nosecond":    {"cat":"第六章","title":"不是二流","en":"Not second best","text":"独修威卡不该被看成次于「真东西」的二流选择；今天独修的人远比团体成员多。","src":"p.54"}
  },

  /* ===================== 试炼 ===================== */
  trials: {

    "t6_prep": {
      kind: "sort", title: "第六章 · 试炼 · 准备的四步",
      explain: "沐浴、着装、饰品、同伴。书里第 48 页泡烂了，但这一页的顺序看得见——每一步都能不做。",
      src: "Chapter 6 · p.49-53",
      bins: [
        {"id":"before","label":"前面三步","tip":"按书上的次序"},
        {"id":"last","label":"最后一步","tip":"洗完穿完才轮到"}
      ],
      items: [
        {"text":"沐浴——书里说，觉得舒服就洗，觉得没必要就不必","bin":"before","why":"可见准备的第一步。原文：洗完就该着装。","src":"p.49"},
        {"text":"着装——裸身、专用袍子、干净的天然纤维，三样都行","bin":"before","why":"沐浴之后才是着装，原文写得很直。","src":"p.49-51"},
        {"text":"挑选并佩戴仪式饰品","bin":"before","why":"原文：挑选和佩戴仪式饰品，自然跟着装之后。","src":"p.51-52"},
        {"text":"考虑同伴：一个人做，还是邀请人","bin":"last","why":"原文：洗完、穿好、戴完，还有一个大问题——同伴。","src":"p.53"}
      ]
    },

    "t6_bathherbs": {
      kind: "sort", title: "第六章 · 试炼 · 浴草包里的东西",
      explain: "八样各等份，最后加一点磨碎的缬草根。作者说方子来自《所罗门之钥》。",
      src: "Chapter 6 · p.49",
      bins: [
        {"id":"herb","label":"八样之一","tip":"各等份"},
        {"id":"root","label":"另外加的","tip":"只一点点"},
        {"id":"no","label":"方子里没有"}
      ],
      items: [
        {"text":"迷迭香","bin":"herb","why":"方子里八样之一，各等份。","src":"p.49"},
        {"text":"茴香","bin":"herb","why":"方子里八样之一。","src":"p.49"},
        {"text":"薰衣草","bin":"herb","why":"方子里八样之一。","src":"p.49"},
        {"text":"罗勒","bin":"herb","why":"方子里八样之一。","src":"p.49"},
        {"text":"百里香","bin":"herb","why":"方子里八样之一。","src":"p.49"},
        {"text":"牛膝草","bin":"herb","why":"方子里八样之一（hyssop）。","src":"p.49"},
        {"text":"马鞭草","bin":"herb","why":"方子里八样之一（vervain）。","src":"p.49"},
        {"text":"薄荷","bin":"herb","why":"方子里八样之一，八样到此齐了。","src":"p.49"},
        {"text":"磨碎的缬草根","bin":"root","why":"八样之外，「再加一点」。加多了整桶水都是它的味。","src":"p.49"},
        {"text":"一把干茶叶","bin":"no","why":"方子里没有这一样。","src":"p.49"},
        {"text":"一撮盐","bin":"no","why":"书里的这个方子没提盐。","src":"p.49"},
        {"text":"几滴松脂油","bin":"no","why":"方子里没有松脂油。","src":"p.49"}
      ]
    },

    "t6_check": {
      kind: "multi", title: "第六章 · 试炼 · 哪些是真的",
      q: "下面这些说法，哪些书里真的这么说？",
      options: [
        "衣服会阻挡力量的传递",
        "黑色象征邪恶",
        "洗完穿好之后，就该考虑请谁了",
        "独修是次于团体修习的二流选择",
        "力量物件可以当提醒，但不该变成更多",
        "仪式必须事先排练、按传统来",
        "只和真正认同的人一起做仪式",
        "所有的力量和运气都在我们自己之内"
      ],
      answers: [2, 4, 6, 7],
      explain: "衣服不是障碍；黑色不象征邪恶；作者没有幸运符；仪式不必排练；独修不是二流。",
      src: "Chapter 6 · p.47-55"
    },

    "t6_dress": {
      kind: "match", title: "第六章 · 试炼 · 袍子的颜色",
      explain: "颜色有各自的振动。书里说，按你需要什么来挑，不按好看挑。",
      src: "Chapter 6 · p.50-51",
      pairs: [
        {"left":"黄","right":"占卜","note":"书里排在第一位的颜色。"},
        {"left":"紫","right":"运用纯粹神圣力量的人","note":"或者想更深地觉知女神和男神的人。"},
        {"left":"蓝","right":"疗愈与灵能","note":"也用于跟海相的女神调谐。"},
        {"left":"绿","right":"草药师与护生态者","note":"作者举例：草药魔法，或阻止核扩散的仪式。"},
        {"left":"棕","right":"与动物调谐","note":"或者为动物施咒的时候穿。"},
        {"left":"白","right":"净化与满月","note":"也用于冥想、净化，以及与女神调谐。"}
      ]
    }

  },

  /* ===================== 符印与成就 ===================== */
  sigils: {
    "robe": {"name":"袍子","icon":"cord","desc":"洗过、穿好、戴妥，然后决定一个人还是叫人。","src":"第六章 · p.49-53"}
  },

  achv: {
    "c6_ready": {"name":"准备好的人","desc":"把第一次满月仪式的准备从头做了一遍。"}
  }

});
