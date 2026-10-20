/* 第十章 · 无人授予（Ch10 Concerning Initiation, p.79–82 + Ch12 Self-Dedication, p.95–100）+ 尾声 */
STORY_ADD({
  scenes: {
    "c10_init": {
      title: "雪后", bg: "winter", music: "cottage",
      script: [
        {"t":"intro","chapter":"第十章","title":"无人授予","book":"Chapter 10 · Concerning Initiation · p.79–82","points":[
          "白先生开价两百，卖你「三重入会」",
          "七句话，一句一句驳回去——用书里的原话",
          "两张清单：想从威卡得到什么、能给它什么",
          "阿禾自己决定：接着学，还是不学"
        ]},
        {"t":"narr","text":"雪下了三天，把石圈埋成一个一个白包。屋檐下的冰挂有半尺长。"},
        {"t":"narr","text":"老陈家的牛棚里，去年圣烛节出生的小牛已经长到人腰高。他见了你，会点点头。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"开春要耕地了。到时候你来不来帮忙？","when":"helped_chen","relMin":{"chen":2}},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"……路过就进来烤火。别站雪地里看书，眼睛要看坏的。"},
        {"t":"narr","text":"守灯人的屋里冷，只烧了一小炉火。她在补一只旧灯罩。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"再过十来天就是圣烛节。那天我什么也不给你，你自己去。"},
        {"t":"say","who":"player","name":"你","text":"自己去？去哪儿？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"哪儿都行。山顶，林子，湖边那块石头。只要是你一个人的野外。"},
        {"t":"think","text":"我以为她会跟着。她连圈都是手把手教的。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"圣烛节传统上就是入门和献身的时节。书里原话在下面这句。"},
        {"t":"quote","text":"这是传统上加入 coven 的入会时节之一，所以像第十二章那样的自我献身仪式，可以在此时进行或更新。","en":"This is one of the traditional times for initiations into covens, and so self-dedication rituals, such as the one outlined in chapter 12, can be performed or renewed at this time.","cite":"Chapter 8 · p.68"},
        {"t":"codex","ids":["c10_imbolcm"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"在那之前，你先把一件事办了。去集上给我买灯油——顺便，看看白先生的新买卖。"},
        {"t":"say","who":"player","name":"你","text":"他还在啊。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"他一直在。这次别躲着走。你要说什么，自己掂量。"},
        {"t":"scene","id":"c10_market"}
      ]
    },

    "c10_market": {
      title: "三重入会", bg: "village", music: "forest",
      script: [
        {"t":"narr","text":"雪停了，集上的路踩得稀烂。老槐树底下的红布招牌换过了，更大，镶了金边。"},
        {"t":"narr","text":"上面八个字：「威卡入会 · 三阶传承 · 名额有限」。"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"小友！来得正好！我这次是正经买卖，不卖符了。"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"入会。第一阶收你，第二阶过继，第三阶坐堂。两百块，三次仪式，包你成了正式的。"},
        {"t":"think","text":"两百块。够买半头猪。"},
        {"t":"say","who":"player","name":"你","text":"白先生，我这一年读了些书。"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"读书好，读书好。可书上那些是给外人看的。真东西在会里，得有人给你点。"},
        {"t":"narr","text":"他拉开架势，一连说了好几条。你不急，一条一条往回顶。"},
        {"t":"trial","id":"t10_debate"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"……你这些话，是从哪儿学的。"},
        {"t":"say","who":"player","name":"你","text":"第七十九页到八十二页。你要不要翻翻？"},
        {"t":"narr","text":"白先生不接书。他把摊子上的铜牌摆正，那块牌子刻着「祖传三阶」，字是新刻的，木屑还粘在缝里。"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"……我跟你讲句实在话。"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"我年轻时候在城里，有人收了我三百块，说给我开天眼。开完我什么也没看见。"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"后来我就学会了。既然他们要「有人说了算」，那我就当那个说了算的人。生意而已。"},
        {"t":"think","text":"他说得很平静。这大概是今天第一句不用顶回去的话。"},
        {"t":"choice","prompt":"白先生等着你笑他，或者在书里找一句话压他。","options":[
          {"text":"「你要真信，这本书送你。」","reply":"他愣了。翻了两页，塞进包袱：「……回头我看看。」他的耳根有点红。","rel":{"bai":1},"flags":["c10_gift"]},
          {"text":"「那你也可以不当那个人。」","reply":"白先生笑了一声：「小友，你有地有亲戚。我只有一辆车。」","rel":{"bai":1}},
          {"text":"「书里说，入会不是一个人给另一个人的。」","reply":"「知道，知道。」他摆摆手，把「祖传三阶」那块牌子翻过去，扣在桌上。"}
        ]},
        {"t":"quote","text":"许多人告诉我，他们迫切地需要接受威卡的入会。他们似乎相信，没有这个「批准印章」，就没法修习威卡。如果你读到了这里，你就知道并非如此。","en":"Many people have told me that they desperately need to undergo Wiccan initiation. They seem to believe that one cannot practice Wicca without this stamp of approval. If you've read this far, you know that such isn't the case.","cite":"Chapter 10 · p.80"},
        {"t":"codex","ids":["c10_stamp"]},
        {"t":"narr","text":"散集以后，白先生蹲在摊子后面收东西。忽然有个声音从你们背后插进来。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"白先生，你那三阶，第一阶收我吗？"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我攒了九十块。不够的话，我过年再攒。"},
        {"t":"say","who":"player","name":"你","text":"阿禾？"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"你别管。你有人教。我没人。"},
        {"t":"narr","text":"她攥着一个小布包，手指冻得通红。钱是一毛一块攒的，布包角上还缝着一块补丁。"},
        {"t":"think","text":"去年这时候，她还在问我能不能教她魔法。现在她在花钱买一个名分。"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"小姑娘，钱先收着。你这位朋友懂得多，你问他不就得了。"},
        {"t":"narr","text":"白先生把最后一块铜牌扔进木箱，扛起来上车。他朝你们俩各看了一眼。"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"我明天往南边去了。这村里，冬天太冷，人又太会念书。"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"小友，你把那条「谁给第一个威卡入的门」留着。以后遇上有谁开门收钱，你就替他问一句。"},
        {"t":"rel","who":"bai","n":1},
        {"t":"narr","text":"车轮压着雪渣往村口去了，一路吱呀响，没有回头。","when":"c10_gift"},
        {"t":"narr","text":"车轮压着雪渣往村口去了，一路吱呀响。","when":"!c10_gift"},
        {"t":"codex","ids":["c10_noconvert","c10_fewsecrets","c10_trueinit"]},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"你刚才那些话，我全听懂了。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"可听懂归听懂。我到底还要不要接着学？"},
        {"t":"narr","text":"雪地上一串脚印通向村外，一串通向守灯人的坡上。"},
        {"t":"scene","id":"c10_list"}
      ]
    },

    "c10_list": {
      title: "两张纸", bg: "cottage", music: "cottage",
      script: [
        {"t":"narr","text":"回到小屋，守灯人把灯罩放下来。桌上铺着两张空白纸。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里让人熬夜写，或者起个大早写。你在屋里写也一样。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"第一张，写你想从威卡这里得到什么。作者的原话很不好听。"},
        {"t":"quote","text":"具体些，狠一点，写全。如果你不满意这清单，觉得它不够诚实，就重写一遍。没有谁需要看到它。","en":"Be specific, be ruthless, be complete. If you're not satisfied with this list, if it doesn't feel truthful, start over again. No one need ever see it.","cite":"Chapter 12 · p.96"},
        {"t":"think","text":"狠一点。那就是不能写「我想变得更好」这种话。"},
        {"t":"trial","id":"t10_gain"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"第二张，写你能给威卡什么。"},
        {"t":"say","who":"player","name":"你","text":"给钱？"},
        {"t":"narr","text":"她笑了一声，是她这一年里笑得最响的一次。"},
        {"t":"quote","text":"威卡不要你的钱，所以别写「我月收入的十分之一」。这不是因为威卡认为钱低贱、不属灵，而是因为钱被多数既有宗教滥用得太厉害。威卡人不是靠威卡过日子的。","en":"Unlike most orthodox religions, Wicca doesn't want your money, so don't write down \"10 percent of my monthly income.\" This isn't because Wicca views money as debased or nonspiritual, but because money has been so abused and misused by most established religions. Wiccans don't live off Wicca.","cite":"Chapter 12 · p.96"},
        {"t":"codex","ids":["c10_nomoney"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"还有一条，跟今天上午那位白先生正好相反。"},
        {"t":"quote","text":"由于威卡不主张传教，没有领袖、没有神殿、没有中央组织，你也许会想：那我能为威卡做什么？","en":"Since Wicca doesn't condone proselytizing, has no leading figure, temples or central organizations, you may begin to wonder what you can do for Wicca.","cite":"Chapter 12 · p.96"},
        {"t":"codex","ids":["c10_noproselytizing"]},
        {"t":"trial","id":"t10_give"},
        {"t":"quote","text":"提示：你为大地、或为大地上与我们同在的众生所做的一切，都是为威卡而做。","en":"A hint: anything you do for the earth, or for our fellow creatures on it, you do for Wicca.","cite":"Chapter 12 · p.98"},
        {"t":"codex","ids":["c10_forearth"]},
        {"t":"narr","text":"你写完了。守灯人没看你那两张纸，把它们折起来，压进你的本子。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"收好。等你哪天想放弃，就翻出来看看。这两张纸会比你的记性靠得住。"},
        {"t":"narr","text":"第二天早上，阿禾来了。她没带那个小布包，兜里露出你那本书的一角。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我把书借走了三天。你不生气吧？"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"第八十一页那段我看了好几遍：真正的入会，可能你根本不知道它发生了。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我在想，去年我编彩带、跳火堆、在门外放吃的——那时候算不算已经开始了。"},
        {"t":"quote","text":"你也许甚至没有察觉到它。你的生活可能渐渐转移了重心，直到你发现自己在注意鸟和云。","en":"You may even be unaware of it. Your life may gradually shift in focus until you realize that you notice the birds and clouds.","cite":"Chapter 10 · p.81"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"那我问你一件事。你别劝我，也别说「都行」。"},
        {"t":"narr","text":"她把围巾往下拉，露出整张脸。她今天没有笑，也没有急。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我要是决定了不接着学，你会不会觉得我白折腾一年？"},
        {"t":"choice","prompt":"阿禾在等一个真的回答。","options":[
          {"text":"「不白折腾。你去年学会的那些，谁也拿不走。」","reply":"阿禾长出一口气，眼睛有点红：「你总算说句人话。」","rel":{"he":1},"flags":["c10_respect"]},
          {"text":"「我劝不了你。这是你的事。」","reply":"「对。」她说，「所以我自己想。」","rel":{"he":1},"flags":["c10_respect"]},
          {"text":"「你要是不学，就太可惜了。」","reply":"阿禾把围巾又拉回鼻子上：「我就知道你会这么说。」她转身走了。","rel":{"he":-1},"flags":["c10_push"]}
        ]},
        {"t":"jump","when":"c10_push","to":"c10_he_stop"},
        {"t":"narr","text":"阿禾在门槛上坐了很久，看着雪从屋檐上掉下来，一小块一小块。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我想接着学。不过我不用你教，也不用她教我什么「三阶」。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我要自己认认真真读一遍这本书。读完，我自己决定信什么。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书可以借你。别抄我的话，抄书，抄完自己试。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"还有一件事。灯节那天镇上放灯，我打算去问小满。","when":"c9_he_gentle"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"还有一件事。开春我想去找小满，把话说明白。","when":"!c9_he_gentle"},
        {"t":"set","flags":["c10_he_learn"]},
        {"t":"goto","to":"c10_he_done"},
        {"t":"label","name":"c10_he_stop"},
        {"t":"narr","text":"阿禾在门槛上坐了很久。她没有再说书的事。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我想了一个冬天。我一想起那些仪式，心口就沉，不是喜欢，是怕漏了什么。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"也许我要的不是魔法，是我妈。那件事，烧纸也烧不掉。"},
        {"t":"narr","text":"守灯人只回了一句。她连头都没抬。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"那就先不学。路又不是只有这一条，我也不是非要有个徒弟。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"那我以后还能来烤火吗？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你来不来，跟书没关系。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"灯节那天镇上放灯。我想去问小满，去不去看。","when":"c9_he_gentle"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"灯节那天镇上放灯。我一个人去也行。","when":"!c9_he_gentle"},
        {"t":"set","flags":["c10_he_stop"]},
        {"t":"label","name":"c10_he_done"},
        {"t":"codex","ids":["c10_depth","c10_who"]},
        {"t":"narr","text":"她走的时候，在雪地上踩出一条新的路，从门口直往坡下去。","when":"c10_he_learn"},
        {"t":"narr","text":"她走的时候沿着别人踩过的脚印，没有开新路。","when":"c10_he_stop"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"再过三天是圣烛节。书里那个仪式，你今晚抄一遍，抄明白了再说。"},
        {"t":"scene","id":"c10_dawn"}
      ]
    },

    "c10_dawn": {
      title: "圣烛节黎明", bg: "dawn", music: "dawn",
      script: [
        {"t":"narr","text":"圣烛节的凌晨，天还黑着。山道上的雪冻硬了，踩上去咔嚓响。"},
        {"t":"narr","text":"出门前，守灯人只交代了三件事，然后就回屋去了。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"第一，洗个热水澡，水里放一勺盐、几滴香油。没浴缸，就把盐包在毛巾里擦身。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"第二，只带一小瓶油。别带书，别带灯。今晚不认路，认地。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"第三，仪式完了回家，好好吃一顿。这是书里的最后一条，别省。"},
        {"t":"say","who":"player","name":"你","text":"你不来吗？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"我去干什么？看着你扮女祭司？书里正好有一句讲这个。"},
        {"t":"quote","text":"如果你决定邀请朋友和感兴趣的人参加你的仪式，别让他们缩在后面，看你演「女祭司」或「女巫」。让他们参与进来。","en":"If you decide to invite friends and interested people to join your rites, don't make them hang back and watch while you play \"priestess\" or \"Witch.\" Involve them.","cite":"Chapter 10 · p.82"},
        {"t":"codex","ids":["c10_involve"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"所以你一个人去。这不是我赶你，是这件事本来就只跟你们三位有关。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里还说：仪式不是让你「成为」威卡。那要靠时间和投入，不是靠一个仪式。别指望今晚就变个人。"},
        {"t":"quote","text":"下面这个自我献身仪式并非要让你「成为」威卡——那要靠时间和投入（而不是入会仪式）。它是在神秘意义上，把你个人的能量与女神和男神的能量连起来的一步。","en":"The following self-dedication rite isn't designed to make you a Wicca---that comes with time and devotion (and not through initiation ceremonies). It is, in a mystical sense, a step toward linking your personal energies with those of the Goddess and God.","cite":"Chapter 12 · p.98"},
        {"t":"codex","ids":["c10_notmake"]},
        {"t":"bgm","name":"moon"},
        {"t":"narr","text":"你走到坡下的湖边。冰面结到了岸边，只有中间一条黑水在动。"},
        {"t":"narr","text":"你脱了鞋，光脚踩在雪上。脚心先是疼，然后是麻，最后是热。你坐下来，等心跳慢下来。"},
        {"t":"trial","id":"t10_breath"},
        {"t":"say","who":"player","name":"你","text":"书里说，接下来要站起来，单脚慢慢转圈，找那个地方。"},
        {"t":"narr","text":"你站起来，一只脚抵着地，另一只脚蹬着，慢慢地转。眼前的景色一圈一圈转过去。"},
        {"t":"narr","text":"书里说：不要刻意去找，而是向这个地方敞开觉知。"},
        {"t":"bg","name":"dawn"},
        {"t":"explore","id":"c10_spot","prompt":"转到某一圈，你会停下来。往哪里走？","spots":[
          {"id":"shoreline","x":150,"y":180,"w":250,"h":45,"label":"湖岸边","script":[
            {"t":"narr","text":"岸边的冰碎成一排薄片，一层层叠着。脚下是冻硬的泥。"},
            {"t":"think","text":"这里太潮。书里说要能明显感觉到大地的地方。"}
          ]},
          {"id":"stone","x":65,"y":130,"w":45,"h":90,"label":"立石","script":[
            {"t":"narr","text":"东边立着一块石头，一个人高，向阳的那面雪化了，露着干草。"},
            {"t":"narr","text":"你把手放上去。石头是温的。这不合常理，太阳还没出来。"},
            {"t":"think","text":"……就这里了。"}
          ]},
          {"id":"path","x":270,"y":215,"w":60,"h":55,"label":"小路","script":[
            {"t":"narr","text":"小路通往村子。走两步就看得见炊烟。"},
            {"t":"think","text":"太近了。有人会经过。"}
          ]},
          {"id":"mountain","x":20,"y":80,"w":200,"h":80,"label":"远山","script":[
            {"t":"narr","text":"远处的山脊上，天边开始泛青。太阳还有一个钟头。"},
            {"t":"think","text":"太远。今天走不到，天黑前回不来。"}
          ]},
          {"id":"circle","x":330,"y":130,"w":60,"h":50,"label":"日出处","script":[
            {"t":"narr","text":"东边的山缺了一个口，每年圣烛节的太阳，正好从那个缺口升起来。"},
            {"t":"narr","text":"守灯人从来没提过这件事。也许她只是想让你自己看见。"},
            {"t":"think","text":"原来「迎太阳重生」不是一句好听话。"}
          ]}
        ],"need":3,"exitLabel":"选定地方"},
        {"t":"narr","text":"你在立石下面坐下。不是站着——书里那句话说得很短。"},
        {"t":"quote","text":"不要站着——去接触大地。","en":"Don't stand--contact the earth.","cite":"Chapter 12 · p.99"},
        {"t":"narr","text":"你把装油的小瓶放在身边的雪地上。瓶子很小，只够润湿一根手指。"},
        {"t":"say","who":"player","name":"你","text":"书说，这时候该念那几句。念错了，也可以自己编。"},
        {"t":"trial","id":"t10_rite"},
        {"t":"narr","text":"你按顺序做完了。最后一句是三次同样的祈请："},
        {"t":"quote","text":"噢，伟大的女神，噢，伟大的男神，让我与你的本质合一，让我与你的本质合一，让我与你的本质合一。","en":"O great Goddess, O great God, make me one with your essence, make me one with your essence, make me one with your essence.","cite":"Chapter 12 · p.99"},
        {"t":"fx","kind":"visionOn"},
        {"t":"narr","text":"第三遍念完，你停下来。"},
        {"t":"narr","text":"没有雷，没有光柱。什么都没有发生。"},
        {"t":"narr","text":"有一段时间，只有风。然后你发现风向不对——它从湖面往坡上吹，一直吹，没停。"},
        {"t":"narr","text":"湖中间那条黑水动了动，像谁翻了个身。你没有回头，也没有睁眼。"},
        {"t":"say","who":"goddess","name":"女神","por":"goddess","text":"……"},
        {"t":"say","who":"god","name":"男神","por":"god","text":"……"},
        {"t":"think","text":"书里说，无论发生什么，要知道你已经敞开，他们已经听见了。"},
        {"t":"narr","text":"你蘸了油，先画女神的符号，再画男神的符号。你选了手腕，因为那里最常露在外面。"},
        {"t":"narr","text":"你观想它们沉进肉里，发着光，散成无数个小小的亮点，顺着血管往上走。"},
        {"t":"fx","kind":"visionOff"},
        {"t":"say","who":"player","name":"你","text":"谢谢你们听我说完。"},
        {"t":"narr","text":"太阳从山脊的缺口里出来了。光线横着扫过湖面，冰上的雪亮得发白。"},
        {"t":"narr","text":"你坐着没动，看了很久。回家的时候，脚还是凉的，可后背是热的。"},
        {"t":"choice","prompt":"临走前，你回头看了那块立石一眼。你想记住什么？","options":[
          {"text":"它其实是温的。这一点没法解释。","reply":"你把这句话记在心里，没写在纸上，也没告诉人。","flags":["c10_warmstone"]},
          {"text":"我跟它说了什么，只有我自己知道。","reply":"有些事说出来就变了味。这句话你只对自己讲。","flags":["c10_secret"]},
          {"text":"我还会来。不是今天这种日子也来。","reply":"你决定以后常来。不为仪式，就为坐一会儿。","flags":["c10_return"]}
        ]},
        {"t":"shard","id":"dawnoath"},
        {"t":"achv","id":"c10_dawn"},
        {"t":"bg","name":"cottage"},
        {"t":"narr","text":"回到小屋，守灯人已经生好了火，桌上摆着热汤和白面饼，还有一小碟乳酪。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"圣烛节原本叫「产犊节」。这碟乳酪不是给你吃的。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"是给你庆祝用的。书里最后一句：回家以后，用某种特别的方式庆祝。"},
        {"t":"quote","text":"正式的自我献身仪式到此结束。感谢女神与男神垂听。离开前坐下冥想。回到家后，以某种特别的方式庆祝。","en":"The formal self-dedication is ended. Thank the Goddess and God for their attention. Sit and meditate before leaving the place of dedication. Once home, celebrate in some special way.","cite":"Chapter 12 · p.100"},
        {"t":"codex","ids":["c10_celebrate"]},
        {"t":"say","who":"player","name":"你","text":"我还是不觉得我「成了」什么。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"那就对了。书里说过，那要靠时间和投入。今天只是迈了一步。"},
        {"t":"narr","text":"她给自己也盛了一碗，坐下来。窗户外面，村里凡是有灯的人家，都点着灯。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"圣烛节的规矩，就是日落以后把家里的灯都点起来，哪怕只点一会儿。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"那是给往回走的太阳照路。"},
        {"t":"narr","text":"去年这一天，老陈家的母牛生了犊，他亮了一夜的灯。今年他不用点那么多盏。"},
        {"t":"say","who":"player","name":"你","text":"我算入门了吗？","when":"c10_he_learn"},
        {"t":"say","who":"player","name":"你","text":"那我以后该叫你什么？","when":"!c10_he_learn"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"我说了不算。第十章最后一句，你自己念。"},
        {"t":"quote","text":"有人说：「只有威卡能造就威卡。」我说，只有女神和男神能造就威卡。谁更有资格？","en":"Some say, \"Only a Wiccan can make a Wiccan.\" I say only the Goddess and God can make a Wiccan. Who's better qualified?","cite":"Chapter 10 · p.82"},
        {"t":"codex","ids":["c10_qualified"]},
        {"t":"journal","id":"j_c10","title":"第十章 · 本章笔记","lines":[
          "白先生开价两百块的「三重入会」，我用书里的话一句一句顶了回去。",
          "他说的是「交了钱才算」，书上说的是「谁给第一个威卡入的门」。",
          "真正的入门，是个人与女神男神调谐的过程，不是别人给你的仪式。",
          "入会不是皈依，不用背弃以前的神；今天威卡是秘密很少的宗教。",
          "我写了两张纸：想从威卡得到什么，能给它什么。不是钱。",
          "圣烛节黎明，盐浴、光脚踩雪、单脚转圈、坐着接触大地、三次祈请。",
          {"when":"c10_he_learn","text":"阿禾自己选了接着学。她说要自己读一遍书。不是跟着我。"},
          {"when":"c10_he_stop","text":"阿禾自己选了先不学。她说她要的不是魔法。我听了她的。"},
          {"when":"c10_gift","text":"白先生收下了那本书，往南边去了。他收摊的时候没回头。"},
          {"when":"c10_warmstone","text":"疑问：那块石头的温度，我到现在也没想明白。"}
        ]},
        {"t":"finishChapter","id":"c10"},
        {"t":"chapter","title":"尾声","sub":"黎 明","en":"DAYBREAK"},
        {"t":"scene","id":"ending"}
      ]
    },

    "ending": {
      title: "黎明", bg: "dawn", music: "ending",
      script: [
        {"t":"narr","text":"灯节过后的清晨。你上坡的时候，天已经在亮了，雪面是淡青色的。"},
        {"t":"narr","text":"石圈中间没有人。石头还是那些石头，中间那块顶上落了一小片雪。"},
        {"t":"narr","text":"你把那盏灯放在她常坐的石头上。石头缝里夹着一个信封，上面没写名字。"},
        {"t":"think","text":"她昨晚还在，炉子上还煨着汤。"},
        {"t":"narr","text":"信封里是一张纸，字细密整齐，和她本子上的字迹一样。"},
        {"t":"multiline","lines":[
          "今晚我要下山一趟，去还去年借的灯油钱。",
          "有一件事，我一直没跟你说：我年轻的时候，也等着谁给我入门。等了七年。",
          "后来我明白，七年里我一直在做的事，就是入门本身。"
        ]},
        {"t":"narr","text":"纸的下半部分写着："},
        {"t":"multiline","lines":[
          "灯送给你。它本来就是你的——第一夜你提着它上坡，我就这么想了。",
          "书也留给你。第48页还是烂的，你自己补。",
          "往后没有课了。你要读什么、练什么，自己记在本子上。",
          "遇到不明白的，就回到书里查；书里也没有的，就自己试。"
        ]},
        {"t":"narr","text":"纸的背面只有一行小字，比别处用力。"},
        {"t":"think","text":"「你不需要被允许。」"},
        {"t":"bgm","name":"dawn"},
        {"t":"narr","text":"你没有马上走。这一年的事都堆在这圈石头里，你绕着它走了一圈。"},
        {"t":"explore","id":"c10_lastlook","prompt":"石圈里外都是这一年的痕迹。看哪一处？","spots":[
          {"id":"stone","x":65,"y":130,"w":45,"h":90,"label":"中间立石","script":[
            {"t":"narr","text":"立石顶上的雪化了一半。第一夜你坐的地方，就是这块石头下面。"},
            {"t":"think","text":"那天我提着灯上坡，是因为睡不着。现在我知道，那个理由不重要了。"},
            {"t":"narr","text":"石头上还剩一小片干的地方，是你坐着压出来的。"}
          ]},
          {"id":"sun","x":330,"y":130,"w":60,"h":50,"label":"太阳","script":[
            {"t":"narr","text":"太阳离山脊有一人高了。圣烛节的太阳，一年里最不会骗人的一次日出。"},
            {"t":"narr","text":"圣烛节之后是春分，然后五朔节。轮子还在转，你已经在上面待过一整圈。"},
            {"t":"think","text":"下一圈，不知道会是什么样子。"}
          ]},
          {"id":"path","x":270,"y":215,"w":60,"h":55,"label":"小路","script":[
            {"t":"narr","text":"小路往村里去。坡下第一户就是老陈家的院子，烟囱冒着烟。"},
            {"t":"narr","text":"去年这时候，他看见你从这条路上去，会叫人。今年他只是点点头，多问一句吃了没。"},
            {"t":"think","text":"他没有信我的东西。我们也能好好说话。"}
          ]},
          {"id":"lake","x":150,"y":180,"w":250,"h":45,"label":"湖面","script":[
            {"t":"narr","text":"湖面结了一层薄冰，中间一条黑水。黎明时的风从那边过来，和今天早上一样。"},
            {"t":"narr","text":"你就是在那边的岸上，光着脚转圈找出地方的。"},
            {"t":"think","text":"那块石头是温的。这件事我没跟任何人讲。"}
          ]},
          {"id":"hills","x":20,"y":80,"w":200,"h":80,"label":"远山","script":[
            {"t":"narr","text":"远山白得发亮。山那边是镇上，灯节那天，阿禾应该是在那儿。"},
            {"t":"say","who":"he","name":"阿禾","por":"he","text":"不管我学不学，柿子饼我还是要吃的。","when":"c10_he_stop"},
            {"t":"say","who":"he","name":"阿禾","por":"he","text":"我读完第一章了。你别问我读懂了没有。","when":"c10_he_learn"},
            {"t":"narr","text":"她说了一句就跑了，围巾在背后甩来甩去。"}
          ]},
          {"id":"letter","x":208,"y":20,"w":64,"h":64,"label":"天空","script":[
            {"t":"narr","text":"天很干净，一点云都没有。这样的早餐，晒在雪上会晃眼。"},
            {"t":"narr","text":"你想起信上那句：往后没有课了。"},
            {"t":"think","text":"没有课，也没有人批改。这个我能接受。"}
          ]}
        ],"need":3,"exitLabel":"坐回石头上"},
        {"t":"narr","text":"你在她常坐的那块石头上坐下，把这一年从头到尾想了一遍。有些场面已经很远了。"},
        {"t":"narr","text":"你把日记摊在膝盖上，从冬至那页翻起。"},
        {"t":"journal","id":"j_end","title":"尾声 · 一年之轮","lines":[
          "冬至：木头上画了太阳，点火的那一晚，手冻得握不住火折子。",
          {"when":"helped_chen","text":"老陈：牛找到了，小牛也生了。他现在跟你说话，会先递烟。"},
          {"when":"!helped_chen","text":"老陈：起初见了你就绕道，后来愿意跟你站在一处烤火。"},
          {"when":"c9_karma_clear","text":"集上那回，你替他说清了「业不是报应」。他记住了。"},
          {"when":"c9_karma_dodge","text":"集上那回你没接话。他后来的态度，还是没变多少。"},
          {"when":"c8_he_remember","text":"阿禾：萨温那晚，她最后没有召唤母亲，只在门外放了一盘柿饼。"},
          {"when":"c8_he_call","text":"阿禾：萨温那晚她还想叫回母亲。她后来慢慢放下了，用了很久。"},
          {"when":["c6_invite_he","!c7_he_sent"],"text":"阿禾：满月那晚，她看你做完了第一次满月仪式。"},
          {"when":["c6_invite_chen","!c7_chen_left"],"text":"老陈：满月那晚他来过一次，站得远远的，没进来。"},
          {"when":"c6_alone","text":"第一次满月仪式是你一个人做的。没人看，也就没人打分。"},
          {"when":"c10_he_learn","text":"阿禾：她自己选了接着学——不跟人学，自己读书。"},
          {"when":"c10_he_stop","text":"阿禾：她自己选了先停下。她还是会来烤火。"},
          {"when":"c10_gift","text":"白先生：收了你的书，第二天就往南边去了。"},
          {"when":"!c10_gift","text":"白先生：第二天往南边去了，还是那副嗓门，没回头。"},
          {"relMin":{"keeper":3},"text":"守灯人：她没说过一句「你该信」。她只是每次都在。"},
          {"relMax":{"keeper":2},"text":"守灯人：她话少，肯陪你走完一年，已经够少见的了。"},
          "一年的轮子转完了，起点和终点是同一天，也是两个日子。"
        ]},
        {"t":"narr","text":"太阳从山脊的缺口里出来。雾从山谷里往上爬，爬到一半就化了。"},
        {"t":"narr","text":"坡下传来一阵很轻的响声，像是木杖敲在冻土上。你循声望去。"},
        {"t":"narr","text":"守灯人正沿着那条小路往村外走。她背着一个旧包袱，走得不快。"},
        {"t":"narr","text":"走到拐弯处，她停下来，回过头，朝你举了一下手。不是告别，像招呼你一起走。"},
        {"t":"choice","prompt":"在你自己的本子上，第一页写下：接下来要练什么？","options":[
          {"text":"每天记一次月相，满月那天做一次仪式。","reply":"你写下第一行：今晚月相。以后每晚都写。","flags":["path_moon"]},
          {"text":"写一份自己的仪式计划，写明目的和步骤。","reply":"你翻开新的一页，写下「目的」，然后停了一下，开始想。","flags":["path_plan"]},
          {"text":"把书里的说法和自己的体验分两栏记。","reply":"你在纸上划了一条竖线。左边写书，右边写我。","flags":["path_journal"]}
        ]},
        {"t":"narr","text":"写完，你合上本子，提起那盏灯。"},
        {"t":"sfx","name":"chime"},
        {"t":"narr","text":"灯罩上有一道细裂纹，是去年冬至那晚冻出来的。"},
        {"t":"think","text":"这盏灯我提了一年。今晚开始，它放在我自己的桌上。"},
        {"t":"narr","text":"雪地上有两行脚印，一行往村外，一行往坡下。你跟着往下走。"},
        {"t":"quote","text":"就在此刻，威卡信息被公开得比以往任何时候都多。它曾经也许是秘密的宗教，而今天，威卡是一个秘密很少的宗教。","en":"At this moment, more Wiccan information has been released than ever before. While it once may have been a secret religion, today Wicca is a religion with few secrets.","cite":"Chapter 10 · p.80"},
        {"t":"think","text":"灯是我的了。路一直是我自己的。"},
        {"t":"ending"}
      ]
    }
  },

  codex: {
    "c10_imbolcm":     {"cat":"第十章","title":"圣烛节","en":"Imbolc","text":"书里说，圣烛节传统上是举行入会的时节，因此也是自我献身或更新献身的时节。","src":"p.68"},
    "c10_noconvert":   {"cat":"第十章","title":"非皈依","en":"Not Conversion","text":"外人以为入会是皈依，其实不是，威卡不需要这样的仪式。我们不谴责修习威卡之前所协调的神祇，也不必背弃它们。","src":"p.79"},
    "c10_stamp":       {"cat":"第十章","title":"批准印章","en":"The Stamp","text":"许多人以为没有入会这个「批准印章」就不能修习威卡。如果你读到这里，就知道并非如此。","src":"p.80"},
    "c10_fewsecrets":  {"cat":"第十章","title":"秘密很少","en":"Few Secrets","text":"威卡的秘密只是具体的仪式形式、咒语、神名等，而且每一样都有几十上百个已公开的替代。","src":"p.80"},
    "c10_trueinit":    {"cat":"第十章","title":"真正的入会","en":"True Initiation","text":"真正的入会不是一个人施于另一个人的仪式，而是个人与女神男神调谐的过程，或渐进或瞬间。","src":"p.80"},
    "c10_depth":       {"cat":"第十章","title":"可能没察觉","en":"Unaware","text":"你完全可能没见过任何同道，就已经历了真正的入会，甚至自己都没察觉。生活渐渐换了重心。","src":"p.81"},
    "c10_involve":     {"cat":"第十章","title":"请人参与","en":"Involve Them","text":"若要请朋友参加仪式，别让他们缩在后面看你演「女祭司」。让他们参与进来，成为仪式的一部分。","src":"p.82"},
    "c10_who":         {"cat":"第十章","title":"谁有资格","en":"Who's Qualified","text":"有人说只有威卡能造就威卡。作者说：只有女神与男神能造就威卡。谁更有资格？","src":"p.82"},
    "c10_nomoney":     {"cat":"第十章","title":"不要你的钱","en":"Not Your Money","text":"别写「月收入的十分之一」。不是钱不属灵，而是钱被多数既有宗教滥用得太厉害。威卡人不是靠威卡过日子的。","src":"p.96"},
    "c10_noproselytizing": {"cat":"第十章","title":"不传教","en":"No Proselytizing","text":"威卡不主张传教，没有领袖、神殿和中央组织。所以你能给的不是拉人来信，而是别的东西。","src":"p.96"},
    "c10_forearth":    {"cat":"第十章","title":"为大地","en":"For the Earth","text":"作者的原话：你为大地、或为大地上与我们同在的众生所做的一切，都是为威卡而做。","src":"p.98"},
    "c10_notmake":     {"cat":"第十章","title":"不让你成为","en":"Doesn't Make You","text":"自我献身仪式不是要让你「成为」威卡——那要靠时间与投入。它只是把个人能量与神连结的一步。","src":"p.98"},
    "c10_celebrate":   {"cat":"第十章","title":"结束之后","en":"Afterwards","text":"仪式结束：先谢神，坐下冥想，再离开。回到家后，用某种特别的方式庆祝。","src":"p.100"},
    "c10_qualified":   {"cat":"第十章","title":"回家的路","en":"The Path Home","text":"若你找到的老师风格不合，或性格相冲，不要沮丧，你仍有自己的威卡。这条路可以一直走下去。","src":"p.81"}
  },

  trials: {
    "t10_debate": {
      "kind":"quiz","title":"第十章 · 七句话","src":"Chapter 10 · p.79–82",
      "explain":"白先生的每条说法，书里都有对应的回应。入会不是别人给你的批准印章，而是你与神的调谐。",
      "questions":[
        {"q":"白先生：「不入会你就是野的，白修一场。两百块，三重仪式。」","options":["「那谁给第一个威卡入的门？」","「两百块能分三次交吗？」","「三重仪式都干什么？」","「我先考虑考虑。」"],"answer":0,"explain":"书里就着一句反问：Who initiated the first Wiccan？","src":"p.79"},
        {"q":"「入会就是皈依。进了我的门，以前拜的都得放下。」","options":["「我本来也没拜过什么。」","「威卡不需要皈依仪式。」","「放下就放下吧。」","「皈依要另外加钱吗？」"],"answer":1,"explain":"外人以为入会是皈依，书里说不是；修习威卡前所协调的神祇不必背弃。","src":"p.79"},
        {"q":"「真东西都在会里。书上那些是给外人看的。」","options":["「那你卖的书算不算白卖了？」","「秘密少是不是就不灵？」","「今日威卡是秘密很少的宗教。」","「那你再多告诉我点。」"],"answer":2,"explain":"每个秘密的仪式或神名，都有几十上百个已公开的替代。","src":"p.80"},
        {"q":"「女神男神只听带法刀的会里人。你在外面喊，没人应。」","options":["「那我去买把法刀。」","「你确定吗？」","「那我以后不喊了。」","「书里就一句：不是这样运作的。」"],"answer":3,"explain":"作者对这类说法只有一个回答：It doesn't work this way.","src":"p.80"},
        {"q":"「真正的入门，是我这样的人在仪式上给你的。」","options":["「真正的入门是你与神的调谐过程。」","「那你给我调一下试试。」","「那得修多少年才成？」","「先记账，回头给你钱。」"],"answer":0,"explain":"入会或渐进或瞬间，是个人与女神男神协调的过程；仪式只是外在形式。","src":"p.80"}
      ]
    },
    "t10_gain": {
      "kind":"multi","title":"第十章 · 你想得到什么","src":"Chapter 12 · p.96",
      "q":"第一张纸（要狠一点）：哪些是你真正想从威卡这里得到的？",
      "options":["与女神男神更深的关系","对自己在这个世界上的位置看得更清楚","把生活理出一个秩序","跟季节和大地合上拍子","让某个人爱上我","知道明天会发生什么","让村里人都高看我一眼","当一个能收钱开门的人"],
      "answers":[0,1,2,3],
      "explain":"书里举的是灵性满足、与神更深的关系、对自身位置的洞见、生活秩序、与季节和大地协调。后面几条，是白先生的生意，不是你想要的。"
    },
    "t10_give": {
      "kind":"multi","title":"第十章 · 你能给它什么","src":"Chapter 12 · p.96–98",
      "q":"第二张纸：你能给威卡什么？（不是钱）",
      "options":["时间和精力","认认真真读到读不懂为止","参加公开的异教聚会","捐给做环保的组织","捐给反对饥饿的团体","回收和少用塑料","月收入的十分之一","拉亲戚朋友都来信"],
      "answers":[0,1,2,3,4,5],
      "explain":"书里说别写「月收入的十分之一」，威卡人不是靠威卡过日子的；它也不主张传教。为大地和众生做的事，就是为威卡做的事。"
    },
    "t10_breath": {
      "kind":"breath","title":"第十章 · 坐下之前",
      "src":"Chapter 12 · p.98–99",
      "caption":"吸气时按住，呼气时松开。把心跳放慢，再去转圈找地方。",
      "cycles":4,"inhale":4,"hold":4,"exhale":6,
      "explain":"书里说：静坐片刻，平复心跳，深呼吸，让心摆脱杂念，对周围的自然能量敞开。"
    },
    "t10_rite": {
      "kind":"order","title":"第十章 · 圣烛节黎明","src":"Chapter 12 · p.98–100",
      "caption":"把书里的自我献身仪式排成正确的顺序。",
      "explain":"先净身，再去野外；只带一小瓶油；脱鞋静坐，单脚转圈找地方，坐下接触大地，祈请，涂油，感谢冥想，回家庆祝。",
      "items":[
        {"id":"bath","label":"温水浴，加盐与香油","why":"一勺盐，几滴檀香之类的香油；没有浴缸就用淋浴加盐擦身。"},
        {"id":"wild","label":"去一个人不会来的野外","why":"山顶、密林、临海的岩石都行，要能明显感到大地与元素。"},
        {"id":"oil","label":"只带一小瓶浓香油","why":"檀香、乳香、肉桂，任何香气都可以。"},
        {"id":"shoes","label":"脱鞋静坐，深呼吸","why":"平复心跳，清掉杂念，对周围的能量敞开。"},
        {"id":"pivot","label":"单脚慢慢转圈找地方","why":"不要刻意找，向这个地方敞开觉知。"},
        {"id":"earth","label":"坐、跪或躺下，接触大地","why":"书里那句话说：不要站着。"},
        {"id":"invoke","label":"祈请女神与男神三次","why":"中间的静默算在内；结尾三遍「让我与你的本质合一」。"},
        {"id":"anoint","label":"用油画神符，谢神冥想","why":"观想符号沉入肉体、发光、散成光点。回家后再庆祝。"}
      ]
    }
  },

  sigils: {
    "dawnoath": {"name":"晨誓","icon":"sun","desc":"没人授予你。圣烛节黎明，你自己把话说完。","src":"第十章 · p.95–100"}
  },

  achv: {
    "c10_dawn": {"name":"光脚踩雪的人","desc":"在圣烛节黎明，独自完成自我献身"}
  }
});
