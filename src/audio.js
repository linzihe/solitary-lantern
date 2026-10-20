/* Original 16-bar chamber-folk scores in 3/4. Soft additive harp/flute voices.
 * No random pitches, harsh waveforms, drum loops or noise beds.
 * No external recordings or network dependencies. */
var Sound=(function(){
 'use strict';
 var ctx,master,music,effects,active,timer,current=null,pending=null,beat=0,next=0;
 var volMaster=.72,volBgm=.34,volSfx=.55,muted=false,hidden=false,waves={},voices=new Set();
 var chords={C:[48,55,60,64],Am:[45,52,57,60],F:[41,48,57,60],G:[43,50,55,59],Dm:[50,57,62,65],Em:[40,47,55,59],D:[50,57,62,66],Bm:[47,54,59,62]};
 // Three quarter notes per bar; 0=rest, -1=tie. Deliberate phrases and cadences.
 var TRACKS={
 title:{title:'石圈里的灯',bpm:66,ch:'Am F C G Am F Dm G F C Dm Am F G Am Am',mel:'69 72 76|77 -1 76|74 72 67|71 -1 0|69 72 76|77 76 72|74 72 69|67 -1 0|72 77 76|76 74 72|74 77 76|72 -1 69|69 72 77|74 71 67|69 -1 -1|0 0 0'},
 forest:{title:'林间小径',bpm:78,ch:'C G Am F C Em F G Am Em F C Dm G C C',mel:'72 76 79|74 -1 71|72 69 72|77 -1 76|76 74 72|71 67 0|69 72 77|74 -1 0|76 79 81|79 76 71|72 77 76|76 74 72|74 77 69|71 74 67|72 -1 -1|0 0 0'},
 cottage:{title:'烛光与书页',bpm:68,ch:'C Am F G C Em Dm G Am Em F C Dm G C C',mel:'64 67 72|72 71 69|69 72 65|67 -1 0|64 67 72|71 -1 67|65 69 74|71 -1 0|72 76 72|71 67 64|65 69 72|67 -1 64|65 69 74|71 69 67|72 -1 -1|0 0 0'},
 moon:{title:'水上的月光',bpm:60,ch:'Am Dm F Em Am C Dm Em F C Dm Am F G Am Am',mel:'76 -1 72|74 -1 69|72 69 65|67 -1 0|69 72 76|79 -1 76|77 74 69|71 -1 0|77 -1 76|76 72 67|74 77 76|72 -1 69|72 77 76|74 71 67|69 -1 -1|0 0 0'},
 dawn:{title:'山谷初晴',bpm:72,ch:'G D Em C G Bm C D Em Bm C G Am D G G',mel:'67 71 74|78 -1 74|76 74 71|72 -1 0|71 74 79|78 -1 74|76 72 67|69 -1 0|71 76 79|78 74 71|72 76 79|74 -1 71|72 76 69|74 78 81|79 -1 -1|0 0 0'},
 trance:{title:'余烬',bpm:64,ch:'Am Am F F C C G G Am Am Dm Dm F G Am Am',mel:'69 -1 0|72 -1 0|69 -1 0|65 -1 0|67 -1 0|72 -1 0|71 -1 0|67 -1 0|69 72 76|72 -1 0|74 -1 69|65 -1 0|69 -1 72|71 -1 67|69 -1 -1|0 0 0'},
 ending:{title:'带着灯回家',bpm:68,ch:'C G Am F C Em Dm G F C Dm Am F G C C',mel:'72 76 79|79 77 74|76 -1 72|77 -1 76|76 74 72|71 -1 67|69 74 77|74 -1 0|77 79 81|79 -1 76|77 74 69|72 -1 69|72 77 76|74 71 67|72 -1 -1|0 0 0'}
 };
 Object.keys(TRACKS).forEach(function(k){var t=TRACKS[k];t.ch=t.ch.split(' ');t.mel=t.mel.split('|').map(function(b){return b.split(' ').map(Number);});});
 TRACKS.vision=Object.assign({},TRACKS.moon,{title:'月影',bpm:56});
 TRACKS.wheel=Object.assign({},TRACKS.forest,{title:'季节之轮',bpm:72});
 TRACKS.trial=Object.assign({},TRACKS.cottage,{title:'小小练习',bpm:76});
 function clamp(v){v=Number(v);return Number.isFinite(v)?Math.max(0,Math.min(1,v)):0;}
 function level(g,v,t){if(!g||!ctx)return;g.gain.cancelScheduledValues(ctx.currentTime);g.gain.setTargetAtTime(v,ctx.currentTime,t||.1);}
 function wave(p){var a=new Float32Array(p.length+1),b=new Float32Array(a.length);p.forEach(function(v,i){b[i+1]=v;});return ctx.createPeriodicWave(a,b);}
 function wire(c){ctx=c;master=c.createGain();music=c.createGain();effects=c.createGain();
  var limiter=c.createDynamicsCompressor();limiter.threshold.value=-14;limiter.knee.value=12;limiter.ratio.value=4;limiter.attack.value=.01;limiter.release.value=.25;
  music.connect(master);effects.connect(master);master.connect(limiter);limiter.connect(c.destination);
  master.gain.value=muted||hidden?0:volMaster;music.gain.value=volBgm;effects.gain.value=volSfx;
  waves.harp=wave([1,.24,.10,.035,.012]);waves.flute=wave([1,.10,.06,.015]);}
 function init(){if(ctx){if(ctx.state==='suspended')ctx.resume().catch(function(){});return true;}
  try{var AC=window.AudioContext||window.webkitAudioContext;if(!AC)return false;wire(new AC());if(ctx.state==='suspended')ctx.resume().catch(function(){});if(pending)playBgm(pending);return true;}catch(e){return false;}}
 function note(midi,when,dur,amp,kind,bus,pan){if(!ctx)return;
  var o=ctx.createOscillator(),g=ctx.createGain(),p=ctx.createStereoPanner();o.setPeriodicWave(waves[kind]);o.frequency.value=440*Math.pow(2,(midi-69)/12);p.pan.value=pan||0;o.connect(g);g.connect(p);p.connect(bus);
  var a=kind==='flute'?.12:.016;g.gain.setValueAtTime(0,when);g.gain.linearRampToValueAtTime(amp,when+a);
  if(kind==='flute'){g.gain.linearRampToValueAtTime(amp*.78,when+Math.max(a,dur*.65));g.gain.linearRampToValueAtTime(0,when+dur+.20);}
  else{g.gain.exponentialRampToValueAtTime(.0001,when+Math.max(.08,dur));g.gain.linearRampToValueAtTime(0,when+dur+.04);}
  voices.add(o);o.onended=function(){voices.delete(o);o.disconnect();g.disconnect();p.disconnect();};o.start(when);o.stop(when+dur+.24);}
 function schedule(tr,index,when,bus){var bar=Math.floor(index/3)%16,b=index%3,c=chords[tr.ch[bar]],q=60/tr.bpm;
  if(b===0)note(c[0],when,q*2.7,.12,'harp',bus,-.18);
  note(c[b===0?1:b===1?2:3],when+.015,q*1.8,.075,'harp',bus,b===1?-.32:.28);
  if(b===1&&bar%4!==3)note(c[1]+12,when+q*.5,q*1.1,.025,'harp',bus,.36);
  var m=tr.mel[bar][b];if(m>0){var ties=0;for(var k=b+1;k<3&&tr.mel[bar][k]===-1;k++)ties++;note(m,when,q*(ties+1)*.87,.095,'flute',bus,.08);}}
 function tick(){if(!ctx||!active||hidden||ctx.state!=='running')return;if(next<ctx.currentTime-.25)next=ctx.currentTime+.05;
  while(next<ctx.currentTime+.16){schedule(TRACKS[current],beat++,next,active);next+=60/TRACKS[current].bpm;}}
 function retire(){if(!active)return;var old=active;level(old,0,.18);active=null;setTimeout(function(){try{old.disconnect();}catch(e){}},1500);}
 function playBgm(name){if(!TRACKS[name])return;pending=name;if(!ctx)return;if(current===name&&active)return;retire();current=name;active=ctx.createGain();active.gain.value=0;active.connect(music);level(active,1,.6);beat=0;next=ctx.currentTime+.08;if(timer)clearInterval(timer);timer=setInterval(tick,50);tick();}
 function stopBgm(){pending=null;current=null;retire();if(timer)clearInterval(timer);timer=null;}
 var cues={select:[72],tick:[72],confirm:[72,76],correct:[72,76,79],wrong:[62],fail:[62],chime:[72,76,79,84],unlock:[69,72,76],shard:[72,79,84],magic:[69,72,76,81],spark:[55],drum:[43],page:[67],step:[43],whoosh:[60],
   /* 这三个原来在引擎里被调用、cues 里却没有，等于静音：
      cancel 按到无效操作时、codex 解锁图鉴时、scribble 引文卡逐字浮现时。 */
   cancel:[60,55]};
 var lastType=-1;
 function sfx(name){
  if(!ctx||muted||hidden)return;
  var now=ctx.currentTime;
  if(name==='blip'){
   /* 打字机：原来 amp=0.018（只有其他音效的 1/4）＋每 3 个字才响一次＋60ms 冷却，
      合起来基本听不见，玩家会以为音效没了。现在提到 0.055、55ms 冷却，
      触发间隔交给引擎按"每 2 个字"来叫。 */
   if(now-lastType<.055)return;
   lastType=now;note(62,now,.07,.055,'harp',effects,0);return;
  }
  if(name==='scribble'){
   /* 引文卡的"笔尖沙沙"：三个很近的高音短音，模拟笔在纸上的摩擦 */
   note(79,now,.05,.03,'harp',effects,-.2);
   note(84,now+.035,.04,.022,'harp',effects,.18);
   note(81,now+.07,.05,.026,'harp',effects,0);
   return;
  }
  if(name==='codex'){ cues.unlock.forEach(function(n,i){note(n,now+i*.09,.3,.06,'harp',effects,0);});return; }
  if(!cues[name])return;
  cues[name].forEach(function(n,i){note(n,now+i*.11,name==='drum'||name==='spark'?.17:.38,name==='select'||name==='page'?.023:.075,'harp',effects,0);});
 }
 if(typeof document!=='undefined')document.addEventListener('visibilitychange',function(){hidden=document.hidden;level(master,hidden||muted?0:volMaster,.08);if(!hidden&&ctx){next=ctx.currentTime+.12;tick();}});
 return {init:init,isReady:function(){return !!ctx;},playBgm:playBgm,stopBgm:stopBgm,currentBgm:function(){return current;},sfx:sfx,
  amb:function(){},stopAllAmb:function(){},listAmb:function(){return [];},
  setMuted:function(v){muted=!!v;level(master,muted||hidden?0:volMaster);return muted;},isMuted:function(){return muted;},toggleMute:function(){return this.setMuted(!muted);},
  setVolume:function(v){volMaster=clamp(v);level(master,muted||hidden?0:volMaster);},getVolume:function(){return volMaster;},
  setBgmVolume:function(v){volBgm=clamp(v);level(music,volBgm);},getBgmVolume:function(){return volBgm;},
  setSfxVolume:function(v){volSfx=clamp(v);level(effects,volSfx);},getSfxVolume:function(){return volSfx;},
  duck:function(sec){if(!ctx)return;level(music,volBgm*.4,.08);music.gain.setTargetAtTime(volBgm,ctx.currentTime+(sec||1),.3);},
  listBgm:function(){return Object.keys(TRACKS);},listSfx:function(){return ['blip'].concat(Object.keys(cues));},_tracks:TRACKS,
  __ctxState:function(){return ctx?ctx.state:'none';},__voiceCount:function(){return voices.size;},
  __renderScore:function(c,name,bars){stopBgm();wire(c);var tr=TRACKS[name];for(var i=0;i<(bars||16)*3;i++)schedule(tr,i,.15+i*60/tr.bpm,music);},
  /* 测试面：把某个音效渲染进同一个（离屏）音频图。__renderScore 只管音乐，
     音效没有入口，音频台架就没法断言"每个音效都真的出声"。 */
  __renderSfx:function(c,name){
    if(!cues[name])return false;
    wire(c);
    var t0=.15;
    cues[name].forEach(function(n,i){note(n,t0+i*.11,name==='drum'||name==='spark'?.17:.38,name==='select'||name==='page'?.023:.075,'harp',effects,0);});
    return true;
  }
 };
})();
if(typeof module!=='undefined')module.exports=Sound;
