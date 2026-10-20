/* 第一章 · 萨满的鼓 —— 作者 A。入口 c1_forest，末页跳到第二章 c2_moon。
 * 资料：notes_ch1_4.md 第 1 章 Wicca and Shamanism（p.4–8），引文逐字取自 OCR。
 * 一条主线：老陈的母牛丢了，你在林子里学会「鼓点不是音乐」，也听懂了守灯人的信条。
 */
STORY_ADD({

  scenes: {

    /* ===================== 林间 · 鼓与出神 ===================== */
    "c1_forest": {
      title: "第一章 · 萨满的鼓", bg: "forest", music: "forest",
      script: [
        {"t":"intro", "chapter":"第一章", "title":"萨 满 的 鼓", "book":"第一章 Wicca and Shamanism · 原书 p.4–8",
         "points":["鼓不是乐器，是一条进去的路","老陈的母牛丢了，他不想求你","夜里篝火边，你会自己数一数信条","分清楚书里写的和外面传的"]},
        {"t":"narr","text":"十一月末，林子还没全秃。落叶松黄得发亮，路边的草已经躺平了。"},
        {"t":"narr","text":"守灯人坐在一棵倒树上面等你，膝盖上横着一只旧鼓。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你来晚了。不是催你——是这鼓晒了一上午太阳，再不放它就凉了。"},
        {"t":"say","who":"player","name":"你","text":"这是鼓？我还以为是一本讲巫术的书。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书在包里。鼓在手上。今天先讲手上这个。"},
        {"t":"narr","text":"她用指节在鼓面上敲了一下。声音不高，闷闷的，像从地底下传上来。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你先别听我讲。这片林子里的东西你都看看，看完了我们再说话。"},

        {"t":"explore","id":"c1_woods","prompt":"林子边放着几样东西。先看哪个？","need":3,"exitLabel":"回到倒树边",
         "spots":[
           {"id":"drum","x":292,"y":178,"w":48,"h":30,"label":"旧鼓","script":[
             {"t":"narr","text":"鼓面绷得很紧，边上用的是一种灰白的皮，缝口已经发黑。"},
             {"t":"narr","text":"鼓腔是木头挖出来的，内壁还留着刀痕，一圈一圈不整齐。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"这是我老师的手艺。她挖了十天，挖完手指头都僵了。"}]},
           {"id":"bark","x":30,"y":90,"w":36,"h":56,"label":"树干刻痕","script":[
             {"t":"narr","text":"左边那棵大树的皮上刻着几个记号，刻得很浅，被树自己长过来了。"},
             {"t":"think","text":"刻的时候它应该很新。现在这些口子都封上了一半。"},
             {"t":"narr","text":"最下面那个像一只鸟，也可能是个人张开手。"},
             {"t":"codex","ids":["c1_aware"]}]},
           {"id":"deer","x":366,"y":196,"w":80,"h":56,"label":"蹄印","script":[
             {"t":"narr","text":"小路拐弯的地方有一片踩翻的泥。不是人的脚印，是蹄子。"},
             {"t":"narr","text":"印子很深，边缘还立着，说明踩下去没多久。"},
             {"t":"think","text":"两头。一头大，一头小。往林子深处去了。"}]},
           {"id":"mush","x":80,"y":205,"w":40,"h":30,"label":"蘑菇","script":[
             {"t":"narr","text":"烂木头边上长着一小簇棕色的蘑菇，帽子湿亮。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"不认识就别碰。这条比什么都硬。"},
             {"t":"narr","text":"她说完把枯叶往旁边拨了拨，让蘑菇透一口气。"}]},
           {"id":"path","x":190,"y":190,"w":86,"h":70,"label":"小路","script":[
             {"t":"narr","text":"小路往林子里去，被去年的叶子盖住了大半。"},
             {"t":"narr","text":"往上是石圈，往下是村子和坡底那条溪。"},
             {"t":"think","text":"两头都通。走哪头，得看我要去哪。"}]}
         ]},

        {"t":"sfx","name":"step"},
        {"t":"narr","text":"坡下有人上来。脚步很重，踩断了两根枯枝。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"……你在啊。"},
        {"t":"think","text":"老陈。他平时见了我能绕就绕。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"我不找你。我找我的牛。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"昨天傍晚还在坡下，今天早上圈里空的。绳子是断的。"},
        {"t":"narr","text":"他说话的时候眼睛看着守灯人，又赶紧挪开，像怕人看出来在看谁。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你儿子呢？让他去找。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"在镇上干活。牛不能丢。一头牛顶我半个冬天。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"我们自己找。你先看蹄印，别急着往深处冲。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"……你找你的。我跟着看看。"},
        {"t":"narr","text":"他把手背在身后，站得远远的，但没走。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"先说一句你别急着反驳的话——你怕我，是怕我这本书。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"那本黑书。招惹坏东西。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"坏的都招不来。书里没有撒旦。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"怎么没有。你们不就是拜那个的。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"那是别人说的。不是撒旦——这四个字，你自己去书上找。"},
        {"t":"quote","text":"我们不能指着一个邪神（比如撒旦）的像，把我们的过失和软弱怪到它头上。也不能怪命运。",
         "en":"We can't point at an image of an evil god, such as Satan, and blame it for our faults and weaknesses. We can't blame fate.","cite":"Chapter 1 · p.7"},
        {"t":"codex","ids":["c1_satan"]},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"……那你刚才敲那一下鼓，是干什么。"},
        {"t":"choice","prompt":"老陈盯着那只鼓。你怎么答他？","options":[
          {"text":"「他问得不算没道理。你先说。」","reply":"守灯人看了你一眼，像是记住了你这句话。老陈也没想到你会站他这边。","rel":{"keeper":1},"flags":["c1_fair"]},
          {"text":"「鼓是叫人安静的东西，不是招东西的。」","reply":"老陈哼了一声，没接话，但往这边挪了半步。","flags":["c1_calm"]},
          {"text":"不接话，把鼓往他那边推了推。","reply":"他没碰。可他看鼓的时间，比看你们两个加起来都长。","flags":["c1_show"]}]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"蹄印往溪边走。那边泥深，牛要是卧在那儿，自己也起不来。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你先看。看着不对就喊我。别一个人钻进去。"},
        {"t":"scene","id":"c1_brook"}
      ]
    },

    /* ===================== 溪边 · 找一头牛 ===================== */
    "c1_brook": {
      title: "第一章 · 溪边", bg: "forest", music: "forest",
      script: [
        {"t":"narr","text":"溪边的地是软的，一脚下去陷半寸，鞋帮上立刻糊了一圈泥。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"从这儿开始，你走前面。我看你怎么看。"},
        {"t":"think","text":"她跟着来，却让我走前面。"},

        {"t":"explore","id":"c1_bank","prompt":"溪边有几处痕迹。先看哪一处？","need":3,"exitLabel":"把线索说给他们听",
         "spots":[
           {"id":"print","x":40,"y":150,"w":60,"h":48,"label":"泥里蹄印","script":[
             {"t":"narr","text":"泥里一排蹄印，往上游去。两头并着走，前面那头步子大。"},
             {"t":"narr","text":"蹄印里有水，水面比周围高一点点——是刚渗上来的，不是下雨积的。"},
             {"t":"think","text":"刚走过去不久。而且它没跑，是在慢慢走。"}]},
           {"id":"grass","x":226,"y":140,"w":110,"h":60,"label":"压过的草","script":[
             {"t":"narr","text":"溪弯里有一片草是倒的，倒得整整齐齐，像被什么重的身子压平过。"},
             {"t":"narr","text":"倒的方向都朝着下游，没有挣扎的乱痕。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"它在这儿躺过。躺下的东西才这么整齐。"}]},
           {"id":"sound","x":130,"y":196,"w":60,"h":44,"label":"水声","script":[
             {"t":"narr","text":"水声在左，混着一点很低的东西，断断续续。"},
             {"t":"narr","text":"你停下来听。是牛叫。很轻，像怕费力气。"},
             {"t":"think","text":"它在叫。说明它还醒着。"}]},
           {"id":"broken","x":350,"y":150,"w":80,"h":60,"label":"断绳","script":[
             {"t":"narr","text":"一丛灌木上挂着半截绳子，扣子是自己松开的形状。"},
             {"t":"narr","text":"绳头没有磨断，也没有被咬断——它是挣松了走出来的。"},
             {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"……那是我的绳。"}]},
           {"id":"fern","x":120,"y":26,"w":60,"h":50,"label":"蕨叶","script":[
             {"t":"narr","text":"蕨叶还卷着，攥成一个拳头的样子。"},
             {"t":"narr","text":"你碰了一下，它弹回来，凉丝丝的。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"别管它。今天不是它的日子。"}]}
         ]},

        {"t":"narr","text":"你把这四样指给他们看：蹄印、倒草、水声、还有那半截绳。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"好。现在分一分：哪一样是牛留下的，哪一样是你自己想的。"},
        {"t":"say","who":"player","name":"你","text":"我……分不清。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"分不清就试。想错不要紧，想错了还不承认，才要紧。"},
        {"t":"trial","id":"t1_clue"},

        {"t":"narr","text":"上游的芦苇丛动了一下。你们过去，把草拨开——母牛侧卧在水边，头抬着。"},
        {"t":"narr","text":"它前腿卡在两块石头中间，挣不出来。看见你们，它叫了一声，力气比刚才大。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"你别动它！它认生——"},
        {"t":"narr","text":"守灯人已经蹲下去了，一只手按住牛的脖子，一只手去搬石头。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你也来。手放它背上，慢一点。它认得慢，不认生。"},
        {"t":"narr","text":"你把掌心贴在牛背上。毛是湿的，底下很烫。"},
        {"t":"narr","text":"石头搬开的时候它蹬了两下，站了起来，腿抖得像刚学走路。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"……它站起来了。"},
        {"t":"narr","text":"他伸手去牵绳，手停在半空，先在自己裤子上擦了两下。"},
        {"t":"set","flags":["helped_chen"]},
        {"t":"rel","who":"chen","n":1},
        {"t":"achv","id":"c1_cow"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"牛是我丢的。这一顿我记着。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"……我不是谢你。我是说，牛是我丢的。"},
        {"t":"narr","text":"他牵着牛往回走，走了十几步，回头看了一眼那只鼓。"},
        {"t":"think","text":"他嘴上不认，眼睛倒是老实。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你刚才分得不错。这事跟鼓有关系。"},
        {"t":"say","who":"player","name":"你","text":"找牛跟鼓有什么关系？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你把四样东西分开的时候，脑子里有一件事是稳的。稳的那件，才是线索。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"鼓也是干这个的。它把你的注意力按到一个地方，按久了，人就进得去。"},
        {"t":"quote","text":"萨满用稳定的鼓点引出出神状态，鼓也可以用来掌握魔法之舞的节奏。",
         "en":"Shamans use a steady drum beat to induce trance, and a drum can be used to control the pace of magical dance.","cite":"Chapter 5 · p.41"},
        {"t":"codex","ids":["c1_drumbeat"]},
        {"t":"say","who":"player","name":"你","text":"那守灯人……你是萨满吗？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"我教过书，卖过鱼，跟一个老太太学过十年鼓。你要给我按个头衔，我也不拦。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说萨满是最早有知识的人。有男有女，不是什么穿兽皮跳大神的。"},
        {"t":"quote","text":"萨满是最早拥有知识的人，男女都有。他们施行魔法，与自然的灵交谈。知识就是力量。",
         "en":"The shamans were the medicine people, the power wielders, male and female. They wrought magic and spoke to the spirits of nature. The shamans were the first humans with knowledge. They created discovered, nurtured, and used it. Knowledge is power.","cite":"Chapter 1 · p.5"},
        {"t":"codex","ids":["c1_shaman"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"他们怎么拿到那种状态？不吃不喝、自己弄疼自己、吃毒蘑菇、死盯着一个点——什么狠招都用过。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里也直说了：今天的威卡不用这些。改用吟唱、冥想、专注、观想、音乐、舞蹈。"},
        {"t":"quote","text":"今天的威卡已舍弃痛苦的考验与致幻物，改用吟唱、冥想、专注、观想、音乐、舞蹈、祈请和仪式剧。",
         "en":"Today, Wicca has dropped the ordeals of pain and the use of hallucinogens in favor of chanting, meditation, concentration, visualization, music, dance, invocation, and ritual drama.","cite":"Chapter 1 · p.5"},
        {"t":"codex","ids":["c1_notpain"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"天要黑了。今晚在你屋后那片空地烧一堆火，把鼓带上。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"先把书里那几句自己划一划。划不划得对，晚上再说。"},
        {"t":"scene","id":"c1_cottage"}
      ]
    },

    /* ===================== 灯下 · 信条 ===================== */
    "c1_cottage": {
      title: "第一章 · 灯下", bg: "cottage", music: "cottage",
      script: [
        {"t":"narr","text":"天黑了。屋里点了一盏灯，书摊在桌上，页边全是铅笔道。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"第一章后面有几段，作者自己叫它「威卡的基本信条」。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你读。我不替你读。读完把你划的指给我看。"},

        {"t":"explore","id":"c1_tenets","prompt":"书上有几段被折了角。先看哪一段？","need":4,"exitLabel":"合上书",
         "spots":[
           {"id":"two","x":203,"y":143,"w":60,"h":46,"label":"神为二","script":[
             {"t":"narr","text":"这一段说：威卡承认神是双的，女神和男神，平等、温暖，不住在天上。"},
             {"t":"quote","text":"威卡与许多宗教一样，承认神是双生的。它敬奉女神与男神。他们平等、温暖、有爱，不远在天上，而是遍在于整个宇宙。",
              "en":"Wicca, in common with many other religions, recognizes deity as dual. It reveres both the Goddess and the God. They are equal, warm, and loving, not distant or resident in heaven, but omnipresent throughout the universe.","cite":"Chapter 1 · p.6"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"一男一女，不是主仆。书里反复说这两个字：平等。"},
             {"t":"codex","ids":["c1_twin"]}]},
           {"id":"here","x":336,"y":90,"w":58,"h":62,"label":"神不远","script":[
             {"t":"narr","text":"页角折得很深，折痕上有一行小字，是铅笔写的：「在你手上」。"},
             {"t":"narr","text":"原文说：女神和男神既在我们之内，也显现在整个自然里。"},
             {"t":"think","text":"「没有什么不属于诸神」——那石头也算，牛也算，我也算。"},
             {"t":"codex","ids":["c1_twin"]}]},
           {"id":"rebirth","x":150,"y":124,"w":70,"h":40,"label":"轮回","script":[
             {"t":"narr","text":"这一页讲轮回。作者说，威卡不认为人会转世成别的东西。"},
             {"t":"quote","text":"与某些东方哲学不同，威卡不教导说我们死后灵魂会转世成人类以外的任何东西。",
              "en":"Unlike some eastern philosophies, however, Wicca doesn't teach that upon physical death our souls will reincarnate in anything other than a human body.","cite":"Chapter 1 · p.6"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"石头、树、蜗牛也有某种魂。但不是我们这种。"},
             {"t":"narr","text":"你还想问下去，她已经把这一页翻过去了，手指按在下一段的开头。"},
             {"t":"codex","ids":["c1_rebirth"]}]},
           {"id":"harm","x":230,"y":32,"w":56,"h":66,"label":"勿伤害","script":[
             {"t":"narr","text":"这一段只有几句，被铅笔圈了两遍。"},
             {"t":"quote","text":"威卡的道德理想很简单：做你想做的，只要不伤害任何人。这条规矩里还有一个不成文的条件：不做任何伤害你自己的事。",
              "en":"The Wiccan ideal of morality is simple: do what you want, as long as you harm none. This rule contains another unwritten condition: do nothing that will harm yourself.","cite":"Chapter 1 · p.6"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"后半个条件最容易漏。饿着自己、冻着自己，也算伤人。"},
             {"t":"codex","ids":["c1_harm"]}]},
           {"id":"temple","x":375,"y":167,"w":82,"h":46,"label":"神殿","script":[
             {"t":"narr","text":"这一页的边上画了一片草地，画得很潦草，底下写着「这儿」。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"还有一段讲：生活在自然里让每一刻都成为仪式。他们跟草木兽说话，觉得石头和沙里也有能量。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"所以书里说，一个威卡人站在户外，就等于走进了一座教堂。"},
             {"t":"codex","ids":["c1_temple"]}]}
         ]},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"合上书。刚才那些，你不用背。你只要记住你刚才信了几分。"},
        {"t":"say","who":"player","name":"你","text":"……「不做伤害你自己的事」，我没想过。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"没想过就对了。想过的人，一般已经把这条弄丢过一遍。"},
        {"t":"quote","text":"不要为了灵性或魔法的领域，把物质世界关在外面；只有通过自然，我们才能经验这些实相。我们在地球上是有原因的。",
         "en":"Don't shut out the physical world in favor of the spiritual or magical realms, for only through nature can we experience these realities. We are here on the earth for a reason.","cite":"Chapter 1 · p.8"},
        {"t":"codex","ids":["c1_matter"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"还有两条你可能不服：多数威卡人不信宿命；威卡是宗教，不是魔法本身。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里那句我念给你听：「如果我们只想练魔法，威卡多半不是你要的答案。」"},
        {"t":"quote","text":"很多人把威卡和魔法混为一谈，好像两个词可以互换。威卡是一门包含魔法的宗教。如果你只想练魔法，威卡多半不是你要的答案。",
         "en":"Many people confuse Wicca and magic as if the two words were interchangeable. Wicca is a religion that embraces magic. If you seek only to practice magic, Wicca probably isn't the answer for you.","cite":"Chapter 1 · p.7"},
        {"t":"codex","ids":["c1_notmagic"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"我知道你没背下来。所以来点硬的——这几句话，哪些是书里写的，哪些是外面传的。"},
        {"t":"trial","id":"t1_creed"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"错的地方我不罚你。罚你的是你自己以为懂的那部分。"},
        {"t":"say","who":"player","name":"你","text":"那魔法到底算什么？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"这个话题明天讲。今天你只需要知道：它不是超自然，也不是逼自然听你的话。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，祷告就是一种宗教魔法——专注久了，念头会把能量一起送出去。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说得更直：魔法是把自然能量移动起来去促成变化，不是逼自然服从你的意志。"},
        {"t":"codex","ids":["c1_magicnatural"]},
        {"t":"narr","text":"她把你划过的页数了一遍，用铅笔在最前面那页角上又补了一个小记号。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"这几条你带走。以后哪一条你觉得不对，就拿回来跟我吵。"},
        {"t":"shard","id":"tenets"},
        {"t":"narr","text":"窗外的月亮升到树梢上。守灯人把书合上，扣好，站起来。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"走吧。屋后空地，火已经架好了。鼓带上。"},
        {"t":"scene","id":"c1_fire"}
      ]
    },

    /* ===================== 火边 · 鼓点 ===================== */
    "c1_fire": {
      title: "第一章 · 火边", bg: "fire", music: "trance",
      script: [
        {"t":"narr","text":"空地上一堆火烧得正旺，火苗把四周的树照成一片一片的黑影。"},
        {"t":"narr","text":"守灯人把鼓放在膝盖上，先用指腹试了两下。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你先别急着把它当音乐。它不表演给谁听。"},
        {"t":"say","who":"player","name":"你","text":"那它是干什么的？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"它把你的心跳换成它自己的。你听着听着，就走到别的地方去了。"},

        {"t":"explore","id":"c1_camp","prompt":"火边摊着几样东西。先看哪样？","need":3,"exitLabel":"坐下来敲",
         "spots":[
           {"id":"fire","x":196,"y":136,"w":96,"h":74,"label":"火堆","script":[
             {"t":"narr","text":"火堆架成一个小棚子，底下垫了石头，火舌从缝里往上钻。"},
             {"t":"narr","text":"守灯人往里面推了一根柴，火星子飞得比人还高。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"风在响，海在响，火在响。萨满的仪式就是拿这些压住你的耳朵。"},
             {"t":"narr","text":"她放慢速度，一个字一个字往外说：叹息的风、咆哮的海、摇曳的火光、稳定的鼓点、摇铃的嘶声。"},
             {"t":"narr","text":"「把感官压过去，人就往里面走了一步。」"}]},
           {"id":"drum","x":132,"y":178,"w":54,"h":32,"label":"旧鼓","script":[
             {"t":"narr","text":"鼓面中间有一小块颜色更深，是常年被敲的地方。"},
             {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"先慢，再快。快起来的时候别跟着急，跟着它的呼吸。"}]},
           {"id":"hook","x":126,"y":148,"w":52,"h":40,"label":"木钩","script":[
             {"t":"narr","text":"火边插着一根弯木钩，上面挂着鼓的背带，皮子磨得起了毛。"},
             {"t":"narr","text":"背带很长，能斜挎到胯上——不是为了背，是为了边走边敲。"},
             {"t":"think","text":"这东西是走路用的。"}]},
           {"id":"stones","x":196,"y":210,"w":112,"h":40,"label":"石围","script":[
             {"t":"narr","text":"火堆围着一圈石头，大小不一，有几块明显是从别处搬来的。"},
             {"t":"narr","text":"你摸了一块。热的，里外都热，像刚从土里醒过来。"}]},
           {"id":"night","x":180,"y":6,"w":140,"h":56,"label":"夜空","script":[
             {"t":"narr","text":"树梢上面是黑的。星星有几颗，不多。"},
             {"t":"think","text":"月亮在屋子那一边，这儿只看得到它照亮的一角树。"}]},
           {"id":"pine","x":62,"y":22,"w":76,"h":96,"label":"松树","script":[
             {"t":"narr","text":"左边那棵松树的影子被火拉得很长，一直伸到鼓上面。"},
             {"t":"narr","text":"风一吹，影子就晃，鼓面上就跟着暗一下亮一下。"}]}
         ]},

        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"看完了？把手放上去。不用敲得对，先跟上。"},
        {"t":"trial","id":"t1_rhythm"},
        {"t":"narr","text":"你停下来的时候，火已经小了一圈。手心里全是汗。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"刚才那几分钟，你听见的是什么？"},
        {"t":"choice","prompt":"说实话。","options":[
          {"text":"「一开始我在数拍子，后来不数了。」","reply":"「不数了就是进去了。」她把你手里的鼓接过去，摆在自己膝上。","insight":1,"flags":["c1_counted"]},
          {"text":"「心跳跟鼓点撞到一起了，有点吓人。」","reply":"「吓人是对的。它本来就不是给人舒服的。」她说得挺平静。","insight":1,"flags":["c1_scared"]},
          {"text":"「我没进去，就一直在想别的事。」","reply":"「第一次都这样。」她用袖子擦了擦鼓面，「能知道自己没进去，也是本事。」","rel":{"keeper":1},"flags":["c1_missed"]}]},
        {"t":"say","who":"player","name":"你","text":"守灯人，这算不算……请神上身？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"不算。它只是把你带到门口。进不进，你自己走。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，萨满靠这些「觉知转换」跟灵、神、草木、兽说话。所有魔法知识都是这么来的。"},
        {"t":"quote","text":"通过这种「觉知转换」，一切魔法知识得以获得。与灵、神、植物、动物的会谈，打开了新的学习天地。",
         "en":"Through such awareness shifts, all magical knowledge was obtained. Conference with spirits and deities, plants and animals opened up new vistas of learning.","cite":"Chapter 1 · p.5"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你也别把这事想得太神。作者自己说过，那些状态并不反常，只是跟我们平常的清醒不一样。"},
        {"t":"quote","text":"我特意用了「另类意识状态」这个词。这些改变了的意识状态并非不自然，只是偏离了「正常」的清醒意识。",
         "en":"I deliberately used the term alternate states of consciousness. Such changed consciousness states aren't unnatural, but are a deviation from the normal waking consciousness.","cite":"Chapter 1 · p.5"},
        {"t":"codex","ids":["c1_altstate"]},
        {"t":"narr","text":"她敲了三下很慢的鼓点。最后一下之后，她把手按在鼓面上，声音立刻就断了。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你明天去老陈家看看牛。蹄子伤了，最好上点药。"},
        {"t":"say","who":"player","name":"你","text":"他会让我进院子？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"他不会说让你进。但他会站在门口不关门。"},
        {"t":"quote","text":"我们不需要中介：不需要祭司、告解神父或萨满。我们自己就是萨满。",
         "en":"No intermediaries are needed; no priests or confessors or shamans. We are the shamans.","cite":"Chapter 2 · p.14"},
        {"t":"codex","ids":["c1_self"]},
        {"t":"shard","id":"drum"},
        {"t":"narr","text":"火快灭了。她站起来，把鼓斜挎在身上，背带正好落在腰上。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"这只鼓你先拿着。不用还。什么时候你自己敲得比它好，它就不响了。"},
        {"t":"think","text":"这话我琢磨了一路，到现在也没想明白。"},
        {"t":"journal","id":"j_c1","title":"第一章 · 本章笔记","lines":[
          "第一天下午，我在林子里见到了守灯人的鼓。她说鼓不是乐器，是把注意力按到一个地方的工具。",
          "老陈的母牛卡在溪边的石头缝里。蹄印、倒草、水声、半截绳——我把真的和我想的分了开来。",
          {"when":"helped_chen","text":"牛站起来了。老陈说牛是他丢的，这一顿他记着——嘴上不认，眼睛倒是老实。"},
          "书里第一章讲的是萨满：最早的医者和有力量的人，男女都有。今天的威卡不用痛苦考验和致幻物，改用吟唱、冥想、音乐和舞蹈。",
          "信条我记住几条：神是双的、平等的；轮回只为人；不害人也不害己；魔法是自然的；不信宿命。",
          {"when":"c1_fair","text":"老陈问那只鼓时我站了他那边。守灯人看了我一眼，像记住了这件事。"},
          {"when":"c1_scared","text":"鼓点跟我的心跳撞在一起的时候我有点怕。她说吓人是对的。"},
          "还有一件事没问出口：她说「我们自己就是萨满」——那我算什么？明天去老陈家，顺便想想。"
        ]},
        {"t":"bgm","name":"forest"},
        {"t":"fx","kind":"flash"},
        {"t":"finishChapter","id":"c1"},
        {"t":"chapter","title":"第二章","sub":"三 面 之 神","en":"THE DEITIES"},
        {"t":"scene","id":"c2_moon"}
      ]
    }
  },

  /* ===================== 图鉴 ===================== */
  codex: {
    "c1_shaman": {
      cat: "第一章", title: "萨满", en: "the shamans",
      text: "最早的医者与有力量的人，男女都有。他们施行魔法、与自然的灵交谈；后来的仪式工具与魔法知识都从他们那儿来。",
      src: "p.5"
    },
    "c1_aware": {
      cat: "第一章", title: "觉知转换", en: "awareness shifts",
      text: "出神时发生的意识转换。书里说一切魔法知识都由此获得：与灵、神、植物、动物的会谈。",
      src: "p.5"
    },
    "c1_altstate": {
      cat: "第一章", title: "另类意识状态", en: "alternate states of consciousness",
      text: "作者特意选的词：这些状态并非不自然，只是偏离了「正常」的清醒意识。序章那次静坐就属于这一类。",
      src: "p.4-5"
    },
    "c1_notpain": {
      cat: "第一章", title: "不用苦刑", en: "dropped the ordeals",
      text: "今天的威卡舍弃了痛苦考验与致幻物，改用吟唱、冥想、专注、观想、音乐、舞蹈、祈请和仪式剧。",
      src: "p.5"
    },
    "c1_drumbeat": {
      cat: "第一章", title: "鼓点", en: "a steady drum beat",
      text: "萨满用稳定的鼓点引出出神，鼓也用来掌握仪式的节奏。作者在第五章单独写了音乐与乐器。",
      src: "p.42"
    },
    "c1_twin": {
      cat: "第一章", title: "神为二", en: "deity is dual",
      text: "威卡承认神是双生的：女神与男神，平等、温暖、有爱，不住在天上，而是遍在于整个宇宙。",
      src: "p.6"
    },
        "c1_rebirth": {
      cat: "第一章", title: "轮回只为人", en: "reincarnation",
      text: "威卡不教导灵魂会转世成人类以外的任何东西。石头树木也有某种魂，但不是我们这种；转世不是拿来「信」的，是慢慢接受的。",
      src: "p.6"
    },
    "c1_harm": {
      cat: "第一章", title: "勿伤人伤己", en: "harm none",
      text: "道德理想：做你想做的，只要不伤害任何人。还有个不成文的条件——不做任何伤害你自己的事：虐待身体、剥夺必需品都算违背。",
      src: "p.6"
    },
    "c1_magicnatural": {
      cat: "第一章", title: "魔法是自然的", en: "magic is natural",
      text: "魔法是移动自然（虽然少有人理解）的能量去促成需要的变化，不是逼自然服从你的意志。祷告就是一种宗教魔法。",
      src: "p.7"
    },
    "c1_matter": {
      cat: "第一章", title: "别关上物质世界", en: "don't shut out the physical world",
      text: "不要为了灵性或魔法的领域把物质世界关在外面，只有通过自然才能经验这些实相。「我们在地球上是有原因的。」",
      src: "p.8"
    },
    "c1_temple": {
      cat: "第一章", title: "神殿", en: "Wicca's temples",
      text: "威卡的神殿是繁花点缀的草地、森林、海滩和沙漠。威卡人站在户外，就等于走进了一座教堂。",
      src: "p.7"
    },
    "c1_notmagic": {
      cat: "第一章", title: "威卡≠魔法", en: "Wicca is a religion that embraces magic",
      text: "很多人把两个词当成一回事。威卡是包含魔法的宗教；只想练魔法的人，威卡多半不是他要的答案。",
      src: "p.7"
    },
    "c1_satan": {
      cat: "第一章", title: "不是撒旦", en: "not Satan",
      text: "书里直接否认：「我们不能指着撒旦的像把过失怪到它头上，也不能怪命运。」要为今生与前世的一切负责。",
      src: "p.7"
    },
    "c1_self": {
      cat: "第一章", title: "无须中介", en: "we are the shamans",
      text: "威卡人不需要祭司、告解神父或萨满做中介：力量在每个修行者手里。「我们自己就是萨满。」",
      src: "p.14"
    }
  },

  /* ===================== 试炼 ===================== */
  trials: {
    "t1_clue": {
      kind: "sort", title: "第一章 · 试炼 · 线索", src: "Chapter 1 · p.5",
      explain: "分清「牛真的留下的」和「我自己想出来的」——这一手练熟了，鼓点和符印才骗不了你。",
      bins: [
        {"id": "seen", "label": "看得见的", "tip": "痕迹本身"},
        {"id": "guess", "label": "我推的", "tip": "猜测"}
      ],
      items: [
        {"text": "泥里两头并排的蹄印，往上游去", "bin": "seen", "why": "印子边缘还立着，是刚踩的。", "src": "p.5"},
        {"text": "溪弯里一片倒得整整齐齐的草", "bin": "seen", "why": "重东西躺过，不是挣扎出来的。", "src": "p.5"},
        {"text": "灌木上挂着半截松开的绳扣", "bin": "seen", "why": "扣是自己挣松的，绳没断。", "src": "p.5"},
        {"text": "左前方那点断断续续的牛叫", "bin": "seen", "why": "水声里混着的一声叫，你停下来才听见。", "src": "p.5"},
        {"text": "牛是被人牵走的", "bin": "guess", "why": "现场没有任何人的脚印，这是你自己补的。", "src": "p.5"},
        {"text": "它一定快不行了", "bin": "guess", "why": "能叫、能卧、能慢慢走，说明它还醒着有力气。", "src": "p.5"},
        {"text": "它往上游去了", "bin": "guess", "why": "蹄印指向上游，但牛可能是绕回来的——这是推断，不是看见的。", "src": "p.5"},
        {"text": "绳子是它自己咬断的", "bin": "guess", "why": "绳头没有断口，这个说法被现场否掉了。", "src": "p.5"}
      ]
    },
    "t1_creed": {
      kind: "quiz", title: "第一章 · 试炼 · 书里书外", src: "Chapter 1 · p.4-8",
      explain: "这六句里，一半是作者写的，一半是外面传的。分不清它们的区别，往后每章都会被自己的预设绊一下。",
      questions: [
        {"q": "「神是双的：女神与男神，平等、互补。」这句话是——",
         "options": ["书里写的", "外面传的", "书里明确反对", "书里没提过"],
         "answer": 0, "explain": "原文：「威卡承认神是双生的。它敬奉女神与男神。他们平等、温暖、有爱。」", "src": "p.6"},
        {"q": "「做你想做的，只要不伤害任何人。」这条规矩还有后半句——",
         "options": ["你可以随意伤害自己", "不做任何伤害你自己的事", "只要对方同意就不算伤害", "只对自己负责就行"],
         "answer": 1, "explain": "书里写着另一个不成文的条件：不做任何伤害你自己的事。虐待身体、剥夺必需品都算违背。", "src": "p.6"},
        {"q": "「威卡人靠不吃不喝、自己弄疼自己来进入仪式状态。」——",
         "options": ["书里说这是今天的做法", "书里说今天的威卡已经舍弃这些", "书里说只有入门的人才能用", "这是作者推荐的办法"],
         "answer": 1, "explain": "作者明说：今天的威卡改用吟唱、冥想、专注、观想、音乐、舞蹈、祈请和仪式剧。", "src": "p.5"},
        {"q": "「威卡和魔法是一回事，会念咒就是威卡人。」——",
         "options": ["书里同意", "书里说威卡是包含魔法的宗教，只想练魔法的人该另找答案", "书里说魔法比宗教高级", "书里没写"],
         "answer": 1, "explain": "「许多人把威卡和魔法混为一谈……如果你只想练魔法，威卡多半不是你要的答案。」", "src": "p.7"},
        {"q": "「人的灵魂死后会转世成石头、树或者鸟。」——",
         "options": ["书里说会", "书里说不会：威卡不教导转世成人类以外的任何东西", "书里说看运气", "书里说只有坏人才会"],
         "answer": 1, "explain": "原文：威卡不教导我们死后会转世成人类以外的任何东西。草木也有某种魂，但不是我们这种。", "src": "p.6"},
        {"q": "「魔法是一种超自然的力量。」——",
         "options": ["书里说它是超自然的", "书里说它是自然的：移动自然能量去促成需要的变化", "书里说它是一种祈祷的替代品", "书里说它是科学已经证实的"],
         "answer": 1, "explain": "「魔法是移动自然（虽然少有人理解）的能量去促成需要的变化」，还必须忘掉超自然的想法。", "src": "p.7"}
      ]
    },
    "t1_rhythm": {
      kind: "rhythm", title: "第一章 · 试炼 · 跟着鼓", src: "Chapter 5 · p.42",
      explain: "鼓点先慢后快，最后收在三下很慢的敲击上。跟不上不要紧——守灯人看的是你有没有停下来。",
      caption: "鼓面经过标记时敲击（空格 / 鼠标）",
      speed: 110, lead: 1.3,
      notes: [0, 700, 1400, 2100, 2800, 3400, 3850, 4600, 5300, 6000, 6600, 7250]
    }
  },

  /* ===================== 符印与成就 ===================== */
  sigils: {
    "drum": {"name": "鼓", "icon": "circle", "desc": "守灯人给你的旧鼓：不表演给谁听，只把你带到门口。", "src": "第一章 · p.5, p.42"},
    "tenets": {"name": "信条", "icon": "scale", "desc": "书里第一章折了角的那几页：神为二、勿伤人伤己、别关上物质世界。", "src": "第一章 · p.6-8"}
  },

  achv: {
    "drummer": {"name": "三下慢鼓", "desc": "在火边跟上了守灯人的鼓点"},
    "c1_cow": {"name": "找回一头牛", "desc": "在溪边把老陈的母牛拉起来"}
  }
});
