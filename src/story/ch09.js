/* 第九章 · 重生的螺旋（Ch9 The Spiral of Rebirth, p.73–77） */
STORY_ADD({
  scenes: {
    "c9_spiral": {
      title: "萨温之后", bg: "samhain", music: "moon",
      script: [
        {"t":"intro","chapter":"第九章","title":"重生的螺旋","book":"Chapter 9 · The Spiral of Rebirth · p.73–77","points":[
          "萨温后的清晨：阿禾问，妈妈去了哪里",
          "白先生的「前世解读」摊子开张了",
          "业是不是报应？替老陈把话说清楚",
          "亏月之夜，烧掉一张写着旧错的纸"
        ]},
        {"t":"narr","text":"萨温过后的第一个早晨。雾还没散，石圈里的蜡烛头冻成了一个个白疙瘩。"},
        {"t":"narr","text":"昨晚放在门外给亡者的那盘吃的，空了。盘底有几道爪印，大概是狐狸。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"狐狸也算客人。吃的回到林子里，不算浪费。"},
        {"t":"think","text":"一整年。从冬至那根木头，到昨晚窗台上那支蜡烛。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"收拾吧。手上收拾，眼睛别闲着。"},
        {"t":"explore","id":"c9_morning","prompt":"萨温夜留下的东西都还在原地。先看哪个？","spots":[
          {"id":"moon","x":208,"y":20,"w":64,"h":64,"label":"亏月","script":[
            {"t":"narr","text":"月亮还挂在西边天上，左边缺了一小块。"},
            {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"从今晚起，它一天比一天瘦。"},
            {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"有些事，正适合在月亮变瘦的时候做。你先记着。"},
            {"t":"think","text":"什么事？她没往下说。"}
          ]},
          {"id":"stone","x":260,"y":150,"w":40,"h":90,"label":"立石下","script":[
            {"t":"narr","text":"中间那块立石脚下，压着一张烧了一半的纸片。昨晚有人写下想摆脱的事，丢进大釜时，它被热气掀了出来。"},
            {"t":"narr","text":"纸上的字露着半行。你把它翻过去，扣在地上，没有读。"},
            {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"好。别人的纸，不看。"}
          ]},
          {"id":"pines","x":130,"y":110,"w":60,"h":90,"label":"松林边","script":[
            {"t":"narr","text":"松林边的硬土被翻过，又拍平了。阿禾昨晚在这里埋了一个苹果。"},
            {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"老规矩。给还在路上的人一点吃的。"},
            {"t":"think","text":"「还在路上」。路通到哪里去？"}
          ]},
          {"id":"figure","x":320,"y":180,"w":24,"h":52,"label":"人影","script":[
            {"t":"narr","text":"石圈外面坐着一个人，抱着膝盖，围巾拉到鼻子。是阿禾。"},
            {"t":"narr","text":"她的鞋上全是露水。不是刚来的。"},
            {"t":"think","text":"她昨晚到底回没回家？"}
          ]},
          {"id":"mountain","x":40,"y":130,"w":60,"h":50,"label":"远山","script":[
            {"t":"narr","text":"远山的顶上已经白了。再过一个多月，又是冬至。"},
            {"t":"think","text":"年轮转了一圈，回到起点。可这个起点，好像不是原来那个了。"}
          ]}
        ],"need":3,"exitLabel":"走到阿禾身边"},
        {"t":"narr","text":"你在阿禾旁边坐下。石头冰凉，凉气透过裤子往上渗。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"昨晚我没叫她。就把她爱吃的柿饼放在门外，点了根蜡烛。","when":"c8_he_remember"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"昨晚你们不让我叫她，我听了。可我心里一直堵着。","when":"c8_he_call"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"昨晚我一直盯着窗台上那支蜡烛，盯到它烧完。","when":["!c8_he_remember","!c8_he_call"]},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我就想知道……我妈现在到底在哪儿？冷不冷？"},
        {"t":"choice","prompt":"阿禾没看你，在等你回答。","options":[
          {"text":"「我不知道。我们一起去翻那本书。」","reply":"她吸了吸鼻子，点头：「你不骗我就行。」","rel":{"he":1},"flags":["c9_honest"]},
          {"text":"「她肯定在天上看着你呢。」","reply":"阿禾看了你一眼：「你也是随便说说的吧。」她没生气，只是更安静了。"},
          {"text":"先陪她坐一会儿，什么也不说。","reply":"你们看着雾一点点退下山去。过了很久，她自己开口：「……那本书怎么说？」","rel":{"he":1}}
        ]},
        {"t":"narr","text":"守灯人走过来，把书递给你。她翻到一页，没念，只用指甲在一行字底下划了一道。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你念给她听。我念，听着像讲课。"},
        {"t":"quote","text":"有些威卡说，灵魂会前往一个有许多名字的领域：仙境之地、光明之地、青春之地。这个领域既不在天堂，也不在冥界。","en":"Some Wiccans say that it journeys to a realm variously known as the Land of the Faerie, the Shining Land, and the Land of the Young. This realm is neither in heaven nor the underworld.","cite":"Chapter 9 · p.75"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"光明之地，青春之地……听着像童话。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"底下还有一行小字。脚注。别跳过去。"},
        {"t":"quote","text":"这些是凯尔特的叫法。也有些威卡把这个地方叫作「夏日之地」，那是一个神智学的术语。","en":"These are Celtic terms. Some Wiccans call this place Summerland, which is a Theosophical term.","cite":"Chapter 9 · p.75 注"},
        {"t":"say","who":"player","name":"你","text":"所以「夏日之地」不是老说法，是后来的人起的名字？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书是这么注的。你再看它用的词——「有些威卡说」。不是「事实是」。"},
        {"t":"codex","ids":["c9_shining","c9_summerland"]},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"那……那里是什么样子的？"},
        {"t":"narr","text":"你往下读。书里给了两种说法：有的传统说那里是永远的夏天，有草地和甜的河，也许是人类出现以前的大地。"},
        {"t":"narr","text":"也有人说那里没有形状，只有能量在旋转。书没说哪一种对。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我妈怕冷。她要是去了夏天那边就好了。"},
        {"t":"think","text":"我没纠正她。书上也没说她不对。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"那她会被审吗？她打过我手心，也撒过谎，说药不苦。"},
        {"t":"narr","text":"守灯人没说话，把书往你这边推了推。你翻到下一页。"},
        {"t":"quote","text":"据说灵魂会回顾刚过去的那一生，或许是以某种神秘的方式，与神祇一起。这不是审判，不是称量一个人的灵魂，而是一次化身的回顾。","en":"The soul is said to review the past life, perhaps through some mysterious way with the deities. This isn't a judgment, a weighing of one's soul, but an incarnational review.","cite":"Chapter 9 · p.76"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"回顾……就像翻相册？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"也许像。学会的、没学会的，都摊开来看看。没人拿秤。"},
        {"t":"narr","text":"阿禾把下巴搁在膝盖上，过了好一会儿，笑了一下，很短。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"那她翻到「药不苦」那一页，肯定自己先笑。"},
        {"t":"codex","ids":["c9_review","c9_soul"]},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"看完了呢？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里说，时候到了，地上的条件合适了，再来一次。换一个身子，学另一门功课。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"再来一次……那她就不记得我了。"},
        {"t":"narr","text":"这句话落下来，雾好像又浓了一点。"},
        {"t":"choice","prompt":"你怎么接阿禾这句话？","options":[
          {"text":"「可你记得她。这件事谁也拿不走。」","reply":"阿禾愣了一下，手插进口袋，攥住了什么。「……嗯。」","rel":{"he":1},"flags":["c9_he_memory"]},
          {"text":"「书里说这一段一直很模糊。」","reply":"「模糊就好。」阿禾说，「模糊就还有余地。」","insight":1},
          {"text":"「别想了，走，下山吃早饭。」","reply":"阿禾站起来拍拍土：「你这人真会岔话。」不过她跟上来了。"}
        ]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里还说，修圆满的灵魂最后会离开这个轮子，和女神男神待在一起。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"「什么都不会丢。」这句是原话。别的，它自己承认一直说不清。"},
        {"t":"codex","ids":["c9_lastlife"]},
        {"t":"narr","text":"下山的路上，阿禾走在前头，一路踢着枯草。走到岔口，她回头喊："},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"对了！今天集上白先生又来了，摆了个新摊子，叫「前世解读」！"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"……又来了。"},
        {"t":"think","text":"白先生。祖传影之书，开光法刀，九尺铜圈。这回是前世。"},
        {"t":"scene","id":"c9_market"}
      ]
    },

    "c9_market": {
      title: "前世解读", bg: "village", music: "forest",
      script: [
        {"t":"narr","text":"十一月的集，人不多。卖的多是白菜、柿子和过冬的棉鞋。"},
        {"t":"narr","text":"最热闹的是老槐树底下。一块红布招牌：「前世解读 · 一次五元 · 不准不要钱」。"},
        {"t":"narr","text":"白先生坐在招牌后面，正和一个大婶说话。大婶在抹眼泪。"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"王婶，不是我说，你家小子这场病，是他前世欠下的业。业，懂吧？报应。"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"我这儿有「消业符」，一张二十。贴床头四十九天，债就清了。"},
        {"t":"narr","text":"人群后面有人重重咳了一声。是老陈。他把手里那捆葱往地上一扔。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"你这叫什么话！孩子发个烧，你说他上辈子造了孽？"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"哎，老陈，这可不是我编的。人家那本书上就讲业力。对吧，小友？"},
        {"t":"narr","text":"他朝你一扬下巴。一圈人都转过头来。老陈也看着你，脸色不太好。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"你们那本书，也讲这个？"},
        {"t":"think","text":"他在问书。也在问我：我这一年学的，是不是这种东西。"},
        {"t":"choice","prompt":"大家都在等你开口。","options":[
          {"text":"「书里说，业不是奖惩，不是报应。」","reply":"老陈的眉头松了一点：「那你给我说清楚。」","rel":{"chen":1},"flags":["c9_karma_clear"]},
          {"text":"「白先生，那段话在书的哪一页？」","reply":"白先生打了个哈哈：「这个嘛……大意，大意。」老陈看你的眼神缓了下来。","rel":{"chen":1},"flags":["c9_karma_clear"]},
          {"text":"「这事跟我们没关系。」","reply":"老陈哼了一声：「没关系？他拿你们的书说事。」你脸上有点烫。","flags":["c9_karma_dodge"]}
        ]},
        {"t":"narr","text":"你从挎包里掏出那本书。书角卷了，书脊上有一道雨水的印子。你翻到第七十四页。"},
        {"t":"quote","text":"业常被误解。它不是一套奖惩系统，而是一种引导灵魂走向进化性行为的现象。","en":"Karma is often misunderstood. It is not a system of rewards and punishments, but a phenomenon that guides the soul toward evolving actions.","cite":"Chapter 9 · p.74"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"说人话。"},
        {"t":"say","who":"player","name":"你","text":"不是有谁在记账、罚人。是你做的事会回到你身上，好让你学会点什么。"},
        {"t":"say","who":"player","name":"你","text":"而且下面还有一句，更要紧。"},
        {"t":"quote","text":"Karma 的意思是「行动」，它就是这样运作的。它是工具，不是惩罚。没有办法「抹掉」业；我们生命里每一件看似可怕的事，也并非都是业的产物。","en":"Karma means action, and that's how it works. It is a tool, not a punishment. There's no way one can \"wipe out\" karma, and neither is every seemingly terrible event in our lives a byproduct of karma.","cite":"Chapter 9 · p.74"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"「并非都是」。听见没？孩子发烧就是发烧，叫大夫去！"},
        {"t":"narr","text":"王婶抬起头，攥着二十块钱的手慢慢松开了。她看看白先生，又看看老陈，把钱塞回了兜里。"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"哎，哎……这年头，书都不让人好好卖了。"},
        {"t":"codex","ids":["c9_karma","c9_nowipe"]},
        {"t":"narr","text":"老陈让你把书里的意思，给王婶理成几句大白话。你把今天听到的说法分成两堆。"},
        {"t":"trial","id":"t9_karma"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"你这书……就这一段，还算人话。"},
        {"t":"say","who":"chen","name":"老陈","por":"skeptic","text":"去年我那头牛走丢，照他的说法，我是前世欠了牛的？哼。","when":"helped_chen"},
        {"t":"narr","text":"老陈捡起葱，说要送王婶去镇上卫生所。走了两步又回头，冲你点了一下头。","when":"c9_karma_clear"},
        {"t":"narr","text":"老陈捡起葱，送王婶去镇上卫生所了。他走的时候没看你。","when":"c9_karma_dodge"},
        {"t":"narr","text":"人群散了一半。白先生收起一脸委屈，眼珠一转，落在你身上。"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"小友别走！刚才的事不计较。来，我免费给你看一个。"},
        {"t":"narr","text":"他盯着你的脸看了半天，又掐着手指头算，最后一拍桌子。"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"了不得！你前世是埃及女王——克娄巴特拉！"},
        {"t":"narr","text":"旁边卖柿子的大爷笑出了声。"},
        {"t":"think","text":"克娄巴特拉。我低头看看自己沾泥的球鞋，和膝盖磨白的牛仔裤。"},
        {"t":"choice","prompt":"白先生满脸期待地看着你。","options":[
          {"text":"「那我这双球鞋，可委屈女王了。」","reply":"卖柿子的大爷笑得直拍腿。白先生愣了愣，也跟着笑：「行，你这张嘴比我还能说。」","flags":["c9_sneakers"],"rel":{"bai":1}},
          {"text":"「你今天说出去几个女王了？」","reply":"白先生咳嗽一声：「……三个。还有一个亚瑟王。」","flags":["c9_count"]},
          {"text":"「真的？那我前世还干过什么？」","reply":"白先生眼睛一亮：「详解要五块。」你鬼使神差地掏了钱。","flags":["c9_paid"]},
          {"text":"「我不看前世。这辈子还没看明白。」","reply":"白先生摊手：「年轻人，没意思。」可他多看了你一眼。","flags":["c9_thislife"],"insight":1}
        ]},
        {"t":"achv","id":"c9_queen","when":"c9_sneakers"},
        {"t":"narr","text":"你那五块钱换来一张纸条：「前世尊贵，今生多思，宜修身。」","when":"c9_paid"},
        {"t":"think","text":"这话放谁身上都对。五块钱，买了个教训。","when":"c9_paid"},
        {"t":"narr","text":"守灯人不知什么时候站到了你身后。她拿过书，在同一页往下数了几行，递回给你。"},
        {"t":"quote","text":"前世回溯可能是危险的事，因为这里充满自欺。我说不清自己遇到过多少位克娄巴特拉、亚瑟王、梅林、玛利亚、娜芙蒂蒂和其他古代名人——穿着高帮球鞋和牛仔裤到处走。","en":"Past-life regression can be a dangerous thing, for much self-delusion exists here. I can't tell you how many Cleopatras, King Arthurs, Merlins, Marys, Nefertitis, and other famous persons of the past I've met walking around in high-top tennis shoes and jeans.","cite":"Chapter 9 · p.74"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"作者没说前世是假的。他说的是：人想找前世，很容易抓住一个漂亮故事不放。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"白先生，你这一摊子，有谁前世是挑粪的？"},
        {"t":"say","who":"bai","name":"白先生","por":"bai","text":"……那谁花五块钱听这个。"},
        {"t":"narr","text":"这句倒是实话。连守灯人都笑了。"},
        {"t":"codex","ids":["c9_regress"]},
        {"t":"bg","name":"altar"},
        {"t":"narr","text":"白先生转身去招呼别的客人。他的摊桌就是一张折叠桌，铺着红布，摆得满满当当。"},
        {"t":"explore","id":"c9_stall","prompt":"趁他不注意，你仔细看看这个摊子。","spots":[
          {"id":"candle","x":170,"y":70,"w":25,"h":90,"label":"长明烛","script":[
            {"t":"narr","text":"一根粗蜡烛，贴着金纸：「照见前世」。"},
            {"t":"narr","text":"蜡烛底下压着一沓纸条，都写好了：女王、将军、状元、仙姑……没有一张写的是普通人。"},
            {"t":"think","text":"原来答案是先写好的。"}
          ]},
          {"id":"bowl","x":80,"y":140,"w":75,"h":45,"label":"签筒","script":[
            {"t":"narr","text":"一只碗里插满竹签。你抽出一支：「前世为情所困，今生必遇旧人」。"},
            {"t":"narr","text":"签的背面，用铅笔写着一个小小的「禾」字。"},
            {"t":"think","text":"阿禾来过？"}
          ]},
          {"id":"pent","x":285,"y":155,"w":100,"h":55,"label":"消业符","script":[
            {"t":"narr","text":"一摞黄纸符，盖着红印：「消业符 · 一张二十」。"},
            {"t":"think","text":"卖的是「抹掉」。可书里说抹不掉——它本来就是拿来学的。"}
          ]},
          {"id":"cloth","x":160,"y":215,"w":170,"h":45,"label":"价目","script":[
            {"t":"narr","text":"红布的边上用毛笔写着价目：解读五元，详解十元，「合婚前世签」十五元。"},
            {"t":"think","text":"合婚前世签。十五元。和签筒里那支对上了。"}
          ]},
          {"id":"censer","x":230,"y":30,"w":50,"h":130,"label":"开眼香","script":[
            {"t":"narr","text":"一炉香烧得正旺，烟很呛。白先生管它叫「开天眼香」。"},
            {"t":"narr","text":"你凑近闻了闻。镇上杂货铺两块钱一盒的那种。"}
          ]}
        ],"need":3,"exitLabel":"抬起头"},
        {"t":"bg","name":"village"},
        {"t":"narr","text":"你一抬头，正看见阿禾从人堆里挤过来，脸红扑扑的，手里攥着一支竹签。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"你们看！白先生说，我和小满前世就是一对，这辈子注定还要遇见！"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"他说这叫灵魂伴侣。难怪我第一次见小满，就觉得认识他好久了。"},
        {"t":"think","text":"早上她还在问，妈妈会不会忘了她。现在她想要一个永远忘不掉的人。"},
        {"t":"narr","text":"守灯人看了你一眼，没开口。意思很明白：你来。"},
        {"t":"choice","prompt":"阿禾眼睛亮亮的。你怎么说？","options":[
          {"text":"「那是骗你十五块钱的。」","reply":"阿禾的脸一下子垮了：「……你就不能让我高兴一会儿？」","rel":{"he":-1},"flags":["c9_he_hurt"]},
          {"text":"「你喜欢他，这事用不着前世来证明。」","reply":"阿禾张了张嘴，脸更红了：「谁说我喜欢他了。」可她把竹签攥得没那么紧了。","rel":{"he":1},"flags":["c9_he_gentle"]},
          {"text":"「书里有一页讲这个。你想自己看看吗？」","reply":"阿禾犹豫了一下，接过书：「你别盯着我看。」","flags":["c9_he_read"],"insight":1}
        ]},
        {"t":"narr","text":"你把书翻到第七十六页，指给她看。她读得很慢，嘴唇跟着字动。"},
        {"t":"quote","text":"虽然你与所爱的人之间也许有很强的联结，但要对「灵魂伴侣」这个想法保持警惕——就是那些你在别的生命里爱过、注定还会再爱的人。你的感受和信念也许是真诚的，但并不总是基于事实。","en":"Also, though there may be strong connections with loved ones, be wary of the idea of soul mates, i.e., people you've loved in other lives and are destined to love again. Though your feelings and beliefs may be sincere, they aren't always based on fact.","cite":"Chapter 9 · p.76"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"「真诚的，但不总是事实」……这话也太不客气了。"},
        {"t":"say","who":"player","name":"你","text":"后面还有。他说，要是我们总跟同样的灵魂一起转世，那就什么也学不到。"},
        {"t":"narr","text":"阿禾没吭声，往下翻。翻到页底一行小字脚注，她「扑哧」笑了出来。"},
        {"t":"quote","text":"我知道我又蹚进危险的水里了。不过，我见过很多很多宣布过这种事的人——后来又私下跟我说：「天哪，我真是错了。」","en":"I realize I'm in dangerous water here again. Still, I've met many, many people who've made such announcements---only to tell me privately, \"Boy, was I wrong.\"","cite":"Chapter 9 · p.77 注"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"这个作者还挺怂的，说之前先承认自己在蹚浑水。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"他是怕伤人。所以写在脚注里，小小的一行。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"你刚才那句，比这本书难听多了。","when":"c9_he_hurt"},
        {"t":"think","text":"她说得对。同一个意思，本来可以说得好听些。","when":"c9_he_hurt"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"那……我还喜欢他，行不行？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"喜欢一个人，用不着谁批准。前世也不用。"},
        {"t":"narr","text":"阿禾转身挤回摊子，把竹签往桌上一拍。白先生居然没争，退了她十五块，嘀咕了一句「现在的小孩」。"},
        {"t":"codex","ids":["c9_soulmate"]},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我想好了。过年我就直接问小满，去不去镇上看灯。这辈子的事，这辈子问。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"今晚到我那儿去。月亮瘦了，正好。"},
        {"t":"scene","id":"c9_vow"}
      ]
    },

    "c9_vow": {
      title: "亏月之夜", bg: "cottage", music: "cottage",
      script: [
        {"t":"narr","text":"守灯人的小屋里，壁炉烧着松木。窗外的月亮已经亏了一小半。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"前世、业，白天听够了。今晚不讲，今晚你干活。"},
        {"t":"say","who":"player","name":"你","text":"干什么活？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"往回看。不看上辈子，看这辈子。"},
        {"t":"quote","text":"通过审视今生，你可以了解关于前世的一切相关之事。如果你在以前的生命里已解决了某些问题，它们与今天的你无关；如果没有，同样的问题会再次出现。所以，看看今生吧。","en":"You can learn everything of relevance about your past lives by examining this life. If you've cleared up problems in previous existences, they're of no concern to you today. If you haven't, the same problems will reappear, so look at this life.","cite":"Chapter 9 · p.74"},
        {"t":"codex","ids":["c9_thislife"]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"书里的办法很笨：每晚把当天的事过一遍，好的坏的都看。然后看一周，一年，十年。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你有一整年的日记。翻吧。"},
        {"t":"explore","id":"c9_night","prompt":"屋里很暖。你一样一样翻看这一年留下的东西。","spots":[
          {"id":"books","x":395,"y":225,"w":85,"h":45,"label":"日记本","script":[
            {"t":"narr","text":"这一年的日记，三个本子。前面的字很工整，越往后越潦草。"},
            {"t":"narr","text":"冬至那页，圣烛节那页，五月柱那页，萨温那页……"},
            {"t":"think","text":"有一句话，我在不同的月份里写了好几遍：「下次一定早点说。」"}
          ]},
          {"id":"table","x":120,"y":140,"w":150,"h":90,"label":"红蜡烛","script":[
            {"t":"narr","text":"桌上放着一根红蜡烛，一张白纸，一支削好的铅笔。"},
            {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"红的。书里写的就是红的。别问我为什么不是白的。"}
          ]},
          {"id":"fire","x":0,"y":90,"w":80,"h":160,"label":"大釜","script":[
            {"t":"narr","text":"壁炉边蹲着那口铁大釜，肚子熏得乌黑。去年你第一次见它，还以为是煮猪食的。"},
            {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"女神的锅。今晚它装灰。"}
          ]},
          {"id":"window","x":300,"y":55,"w":110,"h":110,"label":"窗外","script":[
            {"t":"narr","text":"窗外，月亮挂在林梢上，缺口在左边。"},
            {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"亏月。月亮往回收的时候，适合让东西离开。"},
            {"t":"think","text":"原来早上她说的「有些事」，就是这件事。"}
          ]},
          {"id":"herbs","x":95,"y":25,"w":200,"h":90,"label":"草药","script":[
            {"t":"narr","text":"房梁下挂着一束束干草：薰衣草，洋甘菊，还有夏至剩下的马鞭草。"},
            {"t":"think","text":"夏至那晚，我们把烦恼装进草药包烧了。今晚是另一种烧法。"}
          ]}
        ],"need":4,"exitLabel":"坐到桌前"},
        {"t":"narr","text":"你把日记摊在膝盖上，一页一页往回翻。有些事几乎忘了，有些事一想起来，脸还会发烫。"},
        {"t":"think","text":"不是一件大事。是一件小事，反复发生。"},
        {"t":"choice","prompt":"翻完一整年，你发现自己反复犯的是什么？","options":[
          {"text":"该开口的时候，总憋着不说。","reply":"你想起老陈第一次说那本书招惹坏东西时，你心里有一肚子话。","flags":["c9_err_silent"]},
          {"text":"一着急就发火，说完又后悔。","reply":"你想起五月那天，你冲阿禾嚷了一句，后来一整天都没好意思看她。","flags":["c9_err_anger"]},
          {"text":"太在意别人怎么看，被人推着走。","reply":"你想起好几回，明明想说「不」，嘴里出来的却是「行吧」。","flags":["c9_err_others"]},
          {"text":"事情开了头，就撂下不管了。","reply":"你想起那片种了一半的仪式花园，还有半本没抄完的笔记。","flags":["c9_err_quit"]}
        ]},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"那就写下来。有个窍门：写成过去的事。「我曾经」，不是「我总是」。"},
        {"t":"think","text":"「我曾经……」写出来，像在说别人。"},
        {"t":"say","who":"player","name":"你","text":"书里还举了好几样。什么都能写进去吗？"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"你自己挑。哪些是你的错，哪些是别人的账，你分得清。"},
        {"t":"trial","id":"t9_paper"},
        {"t":"narr","text":"门外有人敲门。是阿禾，围巾裹到鼻子，眉毛上挂着霜。"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"我叔说你今晚在这儿烧东西。我……能不能也写一张？"},
        {"t":"choice","prompt":"阿禾站在门口，手里已经攥着一张纸。","options":[
          {"text":"「进来吧。你写你的，我不看。」","reply":"阿禾松了口气，在壁炉边找了块地方，背对着你坐下。","rel":{"he":1},"flags":["c9_he_vow"]},
          {"text":"「今晚我想一个人做，你回家烧吧。」","reply":"阿禾愣了愣：「……哦。好。」她把纸揣回兜里。门轻轻关上了。","flags":["c9_he_alone"]},
          {"text":"看守灯人，让她来定。","reply":"守灯人摆摆手：「问我干什么。屋子借你，事是你的。」你只好自己开口让阿禾进来。","flags":["c9_he_vow"]}
        ]},
        {"t":"narr","text":"屋里只剩铅笔的沙沙声，和松木的噼啪声。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"写好了？照书上的顺序来。顺序你自己排。"},
        {"t":"trial","id":"t9_vow"},
        {"t":"bgm","name":"trance"},
        {"t":"narr","text":"你划亮火柴，点着红蜡烛。火苗先是蓝的，然后黄了。"},
        {"t":"narr","text":"你把纸的一角伸进火里。纸卷起来，字一个一个变黑。你松手，让它落进大釜。"},
        {"t":"narr","text":"书里说，这时候可以大喊，也可以只是对自己确认：这些过去的行为，已经不再是你的一部分。"},
        {"t":"choice","prompt":"轮到你说那句话了。","options":[
          {"text":"小声对自己说：「那是以前的我。」","reply":"声音小得只有你自己听得见。可你听见了。"},
          {"text":"对着大釜，大声喊出来。","reply":"你喊得太响，窗外有只鸟扑棱棱飞走了。守灯人连眼皮都没抬。"},
          {"text":"什么也不说，看着它烧完。","reply":"守灯人点点头。书里写的是「或者只是对自己确认」。不出声，也算。"}
        ]},
        {"t":"narr","text":"你闭上眼睛，去想以后的日子——没有那件事的日子。想得很具体：哪天，在哪儿，你会怎么做。"},
        {"t":"narr","text":"纸烧完了，剩下一小撮灰，还保持着纸的形状。你吹了口气，它就散了。"},
        {"t":"narr","text":"阿禾也把她的纸丢了进去，火苗蹿了一下。她没说写了什么，你也没问。","when":"c9_he_vow"},
        {"t":"say","who":"he","name":"阿禾","por":"he","text":"……感觉好傻。可是也好轻松。","when":"c9_he_vow"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"一次不够就再来。书里说，或许就在亏月的晚上。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"下回老毛病又犯，就想想今晚这锅灰。书说，做成仪式的决心，会带着力量。"},
        {"t":"codex","ids":["c9_vow"]},
        {"t":"narr","text":"临走，守灯人往你手心里放了一样东西。一粒干瘪的苹果籽，是从萨温那盘苹果里抠出来的。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"种不种随你。开花，结果，落籽，再发芽。古人大概就是看着这个想明白的。"},
        {"t":"quote","text":"转世，大概最早是古人在观察自然时直觉到的。","en":"Reincarnation was probably first intuited by earlier peoples watching nature.","cite":"Chapter 9 · p.77"},
        {"t":"codex","ids":["c9_rebirth","c9_nodeath"]},
        {"t":"say","who":"player","name":"你","text":"你信吗？转世这些。"},
        {"t":"say","who":"keeper","name":"守灯人","por":"keeper","text":"我信不信，对你有什么用？"},
        {"t":"say","who":"player","name":"你","text":"至少……我知道自己该不该信。"},
        {"t":"narr","text":"她把灯递给你。灯罩上映出一小截火苗。她难得多说了一句：「书里有一段，你回去自己读。」"},
        {"t":"quote","text":"不要强迫自己相信转世。知识远胜于信仰，因为信仰是不知情者的方式。不经大量研究、看看它是否对你说话，就接受转世这样重要的教义，并不明智。","en":"Don't try to force yourself to believe in reincarnation. Knowledge is far superior to belief, for belief is the way of the uninformed. It isn't wise to accept a doctrine as important as reincarnation without a great deal of study to see if it speaks to you.","cite":"Chapter 9 · p.76"},
        {"t":"codex","ids":["c9_nobelief"]},
        {"t":"choice","prompt":"回家的路上，你对「转世」是怎么想的？","options":[
          {"text":"有点信了。它解释了不少事。","reply":"你把苹果籽攥在手心里。信了一点，也还要接着读。","flags":["c9_lean_yes"]},
          {"text":"还不知道。先放着，慢慢看。","reply":"放着也是一种态度。书里说的就是这个。","flags":["c9_lean_wait"]},
          {"text":"不太信。可「看今生」这一招我用得上。","reply":"你想，就算不信来世，每晚回头看一眼今天，也不吃亏。","flags":["c9_lean_no"]}
        ]},
        {"t":"narr","text":"月亮跟着你走了一路，缺口朝着左边。"},
        {"t":"shard","id":"spiral"},
        {"t":"journal","id":"j_c9","title":"第九章 · 本章笔记","lines":[
          "阿禾问妈妈去了哪里。书里只说「有些威卡说」，没打包票。",
          "凯尔特人叫光明之地、青春之地；「夏日之地」是神智学的叫法。",
          "死后不是审判，是回顾。没人拿秤。",
          "业不是报应，是工具。抹不掉，也不是每件坏事都是业。",
          {"when":"c9_sneakers","text":"白先生说我前世是克娄巴特拉。我穿着球鞋。"},
          {"when":"!c9_sneakers","text":"白先生的签筒里，前世全是女王将军，没有一个挑粪的。"},
          "阿禾的「灵魂伴侣」：感受是真的，但不一定是事实。",
          "亏月夜，我把反复犯的错写成过去式，烧进了大釜。",
          {"when":"c9_lean_wait","text":"疑问：转世我还没想好。书说不用逼自己信。"},
          {"when":"c9_lean_yes","text":"疑问：我有点信了。可我信的是书，还是我自己看见的？"},
          {"when":"c9_lean_no","text":"疑问：不信转世，还能走这条路吗？书说要先学，再决定。"}
        ]},
        {"t":"finishChapter","id":"c9"},
        {"t":"chapter","title":"第十章","sub":"无 人 授 予","en":"NO ONE GRANTS IT"},
        {"t":"scene","id":"c10_init"}
      ]
    }
  },

  codex: {
    "c9_rebirth":    {"cat":"第九章","title":"转世","en":"Reincarnation","text":"书里称转世是威卡最宝贵的教导之一：此生只是众多生命之一，身体死后我们并不停止存在，而是在另一个身体里重生。","src":"p.73"},
    "c9_soul":       {"cat":"第九章","title":"灵魂","en":"The Soul","text":"灵魂没有年龄、没有性别、不是物质，带着女神与男神的神圣火花。每一次化身都不同，否则灵魂会停滞。","src":"p.73"},
    "c9_karma":      {"cat":"第九章","title":"业","en":"Karma","text":"业常被误解。它不是奖惩系统，而是引导灵魂走向进化行为的现象：负面的会回来，善带来善。Karma 意为「行动」。","src":"p.74"},
    "c9_nowipe":     {"cat":"第九章","title":"抹不掉","en":"No Wiping Out","text":"业是工具，不是惩罚。没有办法「抹掉」业；生命中每件看似可怕的事，也并非都是业的产物。","src":"p.74"},
    "c9_regress":    {"cat":"第九章","title":"前世回溯","en":"Past-Life Regression","text":"作者提醒：前世回溯可能危险，充满自欺。他见过无数穿球鞋牛仔裤的克娄巴特拉和亚瑟王。","src":"p.74"},
    "c9_thislife":   {"cat":"第九章","title":"看今生","en":"Look at This Life","text":"审视今生，就能知道前世一切相关之事。每晚回顾当天，再看一周、一年、十年：是否一再犯同样的错？","src":"p.74–75"},
    "c9_vow":        {"cat":"第九章","title":"立誓仪式","en":"A Vow Ritual","text":"把反复的错写在纸上，想象那是过去的事；点红蜡烛，烧纸投入大釜；宣告它不再属于你。必要时亏月之夜重复。","src":"p.75"},
    "c9_shining":    {"cat":"第九章","title":"光明之地","en":"The Shining Land","text":"有些威卡说灵魂去往仙境之地、光明之地、青春之地。它既非天堂也非冥界，是比我们稀薄得多的非物质实在。","src":"p.75"},
    "c9_summerland": {"cat":"第九章","title":"夏日之地","en":"Summerland","text":"书中脚注：前面几个是凯尔特叫法；「夏日之地」是神智学术语。各传统描述不同：永恒夏日的草地，或无形的能量之域。","src":"p.75 注"},
    "c9_review":     {"cat":"第九章","title":"回顾","en":"Incarnational Review","text":"据说灵魂会回顾刚过去的一生，或许与神祇一起。这不是审判、不是称量灵魂，而是化身回顾。","src":"p.76"},
    "c9_lastlife":   {"cat":"第九章","title":"最后一次","en":"After the Last","text":"威卡对此一直模糊：大致说修圆满的灵魂离开循环，与女神男神同在。「什么都不会丢失。」","src":"p.76"},
    "c9_nodeath":    {"cat":"第九章","title":"通往出生","en":"Door to Birth","text":"因为接受转世，威卡不把死亡看作坠入虚无，而是通往出生的门。生命与季节的循环象征性地相连。","src":"p.76"},
    "c9_nobelief":   {"cat":"第九章","title":"不必强信","en":"Don't Force Belief","text":"不要强迫自己相信转世。知识胜于信仰；不经大量研究、看它是否对你说话，就接受它并不明智。","src":"p.76"},
    "c9_soulmate":   {"cat":"第九章","title":"灵魂伴侣","en":"Soul Mates","text":"作者提醒警惕灵魂伴侣之说：感受真诚，未必是事实。若总与同样的灵魂转世，我们就什么也学不到。","src":"p.76–77"}
  },

  trials: {
    "t9_karma": {
      "kind":"sort","title":"第九章 · 书里怎么说","src":"Chapter 9 · p.74",
      "explain":"书里的业是「行动」，是工具不是惩罚；抹不掉，也不是每件坏事都是业。想知道前世，就看今生。",
      "bins":[{"id":"yes","label":"书里这样说"},{"id":"no","label":"书里不这样说"}],
      "items":[
        {"text":"业不是奖惩系统，是引导灵魂学习的现象","bin":"yes","why":"原话：not a system of rewards and punishments。","src":"p.74"},
        {"text":"孩子生病，是他前世欠下的债","bin":"no","why":"书说并非每件看似可怕的事都是业的产物。","src":"p.74"},
        {"text":"贴一张符，就能把业消掉","bin":"no","why":"书说没有办法「抹掉」业。","src":"p.74"},
        {"text":"做负面的事，负面会回来；善带来善","bin":"yes","why":"书里就是这样描述业的运作。","src":"p.74"},
        {"text":"只有察觉到业，才能从中学到东西","bin":"yes","why":"We learn from karma only when we're aware of it.","src":"p.74"},
        {"text":"人生的难处，是神或诅咒安排的命运","bin":"no","why":"书说：我们决定自己人生的格局，不能推给神、诅咒或命运。","src":"p.74"},
        {"text":"想知道前世，好好看看今生就够了","bin":"yes","why":"审视今生能知道前世一切相关之事。","src":"p.74"},
        {"text":"前世回溯说出来的名人身份一定可靠","bin":"no","why":"作者说这里充满自欺。","src":"p.74"}
      ]
    },
    "t9_paper": {
      "kind":"multi","title":"第九章 · 写在纸上的","src":"Chapter 9 · p.75",
      "q":"书里举的例子：哪些可以写进立誓的那张纸？",
      "options":["负面情绪","恐惧","没有节制的放纵","让别人控制自己的生活","对冷漠之人没完没了的痴恋","别人对不起我的事","白先生说我前世欠的债","我的长相和出身"],
      "answers":[0,1,2,3,4],
      "explain":"书里列的都是自己反复犯的错：负面情绪、恐惧、失衡的放纵、让别人控制生活、对冷漠之人的痴恋。别人的错不归你烧。"
    },
    "t9_vow": {
      "kind":"order","title":"第九章 · 亏月立誓","src":"Chapter 9 · p.74–75",
      "caption":"按书里的顺序，排好这次立誓的步骤。",
      "explain":"先回顾，再写下（写成过去式），点红烛、烧纸入大釜，宣告并观想未来；必要时在亏月之夜重复。",
      "items":[
        {"id":"review","label":"每晚回顾当天言行","why":"好的坏的都看。"},
        {"id":"widen","label":"再看一周、一年、十年","why":"可以翻日记，看是否一再犯同样的错。"},
        {"id":"write","label":"把反复的错写在纸上","why":"写的时候想象那是过去做的事。"},
        {"id":"candle","label":"点燃红色蜡烛","why":"书里写的是红色蜡烛。"},
        {"id":"burn","label":"烛火点纸，投入大釜","why":"大釜或其他耐热容器。"},
        {"id":"affirm","label":"宣告：它不再属于我","why":"大喊，或只是对自己确认。"},
        {"id":"future","label":"观想没有它的未来","why":"想象未来生活里没有这些行为。"},
        {"id":"repeat","label":"必要时亏月夜重复","why":"或许在亏月之夜。"}
      ]
    }
  },

  sigils: {
    "spiral": {"name":"螺旋","icon":"seed","desc":"开花，落籽，再发芽。业是工具，不是账本。","src":"第九章 · p.73–77"}
  },

  achv: {
    "c9_queen": {"name":"穿球鞋的女王","desc":"用一句玩笑，接住了「你前世是克娄巴特拉」"}
  }
});
