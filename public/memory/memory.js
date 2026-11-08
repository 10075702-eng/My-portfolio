import {RAD,clamp,wrap,damp,direction,distance,rayAt,traceStrength,pickFocus} from './memory-math.mjs';

const $=id=>document.getElementById(id);
const canvas=$('panorama'), body=document.body;
const memories=[
  {id:'thames-boat',yaw:-72,pitch:-1,title:['停泊','Mooring'],text:['河水一直向前，船在这里停了一会儿。','The water keeps moving. The boat stays, for a while.']},
  {id:'thames-bridge',yaw:74,pitch:-2,title:['彼岸','The other bank'],text:['那座桥还在。你记得的，是哪一次经过？','The bridge is still there. Which crossing do you remember?']},
  {id:'thames-canal',yaw:62,pitch:-4,title:['分流','A different course'],text:['水流转了一个弯，有些细节留在画面之外。','The water turns. Some details remain outside the frame.']}
].map((m,i)=>({...m,index:i,dir:direction(m.yaw,m.pitch),video:`/r2/postcard/video/${m.id}.mp4`,seen:false,at:0,strength:0}));
let lang='zh';try{lang=localStorage.getItem('what-remains-language')==='en'?'en':'zh';}catch{}
const t=(zh,en)=>lang==='zh'?zh:en;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let gentle=reduced.matches,mode='intro',ready=false,gl,program,texture,uniforms={},yaw=-88,pitch=1.5,targetYaw=yaw,targetPitch=pitch,lens=.52,targetLens=.52,active=-1,dwell=0,elapsed=0,exploreTime=0,fade=.28,opening=0,lastTime=0,lastMoved=-10,transitionId=0,toastTimer,loadGeneration=0,videoIndex=-1,videoTime=0,posterURL='',savedURL='',savedBlob=null;
const keys=new Set(),pointers=new Map();let drag=null,pinchDistance=0,pinchLens=0,lastUi=0;
const video=$('memoryVideo');

function announce(s){$('announcement').textContent=s;}
function toast(s){$('toast').textContent=s;$('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),3000);announce(s);}
function setMode(value){mode=value;body.dataset.mode=value;canvas.tabIndex=value==='explore'?0:-1;}
function locale(){
  document.documentElement.lang=lang==='zh'?'zh-CN':'en';
  document.querySelectorAll('[data-zh][data-en]').forEach(e=>e.textContent=e.dataset[lang]);
  $('language').textContent=lang==='zh'?'EN':'中文';$('language').ariaLabel=lang==='zh'?'Switch to English':'切换中文';
  $('beginLabel').textContent=ready?t('走进这段记忆','Enter the memory'):t('正在唤起这片风景','Recalling the landscape');
  $('loadNote').textContent=ready?t('戴上耳机，慢慢看。','Headphones on. Take your time.'):t('载入原始全景，稍候片刻。','Loading the panorama. A moment, please.');
  canvas.ariaLabel=t('拖动或用方向键转动全景；停留后点击清晰区域，或按回车进入记忆','Drag or use arrow keys to turn. Linger, then click a clear area or press Enter to enter a memory.');
  $('quietLine').textContent=memories.some(m=>m.seen)?t('你停留过的地方，还留有一点痕迹。','Where you stayed, a little remains.'):t('转过身，停留在你还记得的地方。','Turn. Stay with something you remember.');
  $('gentleButton').ariaPressed=String(gentle);
  $('accessibleMemories').replaceChildren(...memories.map(m=>{const b=document.createElement('button');b.textContent=m.title[lang==='zh'?0:1]+' ↗';b.onclick=()=>{closeSheet($('helpDialog'));targetYaw=yaw+wrap(m.yaw-yaw);targetPitch=m.pitch;lastMoved=elapsed;canvas.focus({preventScroll:true});};return b;}));
  if(videoIndex>=0){const m=memories[videoIndex];$('memoryTitle').textContent=m.title[lang==='zh'?0:1];$('memoryText').textContent=m.text[lang==='zh'?0:1];}
}
$('language').onclick=()=>{lang=lang==='zh'?'en':'zh';try{localStorage.setItem('what-remains-language',lang);}catch{}locale();};
locale();

const vertex=`attribute vec2 a;varying vec2 v;void main(){v=a;gl_Position=vec4(a,0.,1.);}`;
const fragment=`precision highp float;
varying vec2 v;uniform sampler2D tex;uniform float yaw,pitch,aspect,lens,fade,time,gentle,opening;
uniform vec4 memory0,memory1,memory2;
const float PI=3.14159265359;
vec2 uvFor(vec3 d){return vec2(fract(.5+atan(d.x,d.z)/(2.*PI)),clamp(.5-asin(clamp(d.y,-1.,1.))/PI,.002,.998));}
vec3 sampleAt(vec2 p){return texture2D(tex,vec2(fract(p.x),clamp(p.y,.002,.998))).rgb;}
float island(vec3 d,vec4 m){float a=acos(clamp(dot(d,m.xyz),-1.,1.));float edge=sin(d.x*43.+d.y*31.)*.014+sin(d.z*27.-d.y*51.)*.009;return (1.-smoothstep(.105,.33,a+edge))*m.w;}
vec3 blurAt(vec2 uv,float r){vec3 c=sampleAt(uv)*.24;c+=sampleAt(uv+vec2(r,0.))*.12;c+=sampleAt(uv-vec2(r,0.))*.12;c+=sampleAt(uv+vec2(0.,r*2.))*.12;c+=sampleAt(uv-vec2(0.,r*2.))*.12;c+=sampleAt(uv+vec2(r,r*2.))*.07;c+=sampleAt(uv-vec2(r,r*2.))*.07;c+=sampleAt(uv+vec2(r,-r*2.))*.07;c+=sampleAt(uv+vec2(-r,r*2.))*.07;return c;}
void main(){
 vec3 d=normalize(vec3(v.x*aspect*lens,v.y*lens,1.));float cp=cos(pitch),sp=sin(pitch);d=vec3(d.x,d.y*cp+d.z*sp,d.z*cp-d.y*sp);float cy=cos(yaw),sy=sin(yaw);d=vec3(d.x*cy+d.z*sy,d.y,d.z*cy-d.x*sy);
 vec2 uv=uvFor(d);float clarity=max(island(d,memory0),max(island(d,memory1),island(d,memory2)));
 clarity=max(clarity,opening);float lost=fade*(1.-clarity);lost*=mix(1.,.62,gentle);
 vec3 sharp=sampleAt(uv);vec3 soft=blurAt(uv,mix(.00035,.0065,lost));
 vec2 grid=vec2(400.,200.);vec2 q=(floor(uv*grid)+.5)/grid;vec2 cell=abs(fract(uv*grid)-.5);float seams=smoothstep(.42,.5,max(cell.x,cell.y));
 vec3 blocks=blurAt(q,.0016);vec3 aged=mix(soft,blocks,smoothstep(.26,.92,lost)*.73*(1.-seams*.35));
 vec3 col=mix(sharp,aged,smoothstep(0.,.92,lost));float gray=dot(col,vec3(.299,.587,.114));col=mix(col,vec3(gray*.87,gray*.94,gray*.91),lost*.25);col*=1.-lost*.16;
 float vignette=smoothstep(.3,1.65,length(v*vec2(.8,1.)));col*=1.-vignette*.17;
 gl_FragColor=vec4(col,1.);
}`;
function shader(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;}
function initGL(){
 gl=canvas.getContext('webgl',{alpha:false,antialias:false,preserveDrawingBuffer:true,powerPreference:'default'});if(!gl)throw Error('WebGL unavailable');
 program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));gl.useProgram(program);
 const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);const a=gl.getAttribLocation(program,'a');gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
 for(const key of ['tex','yaw','pitch','aspect','lens','fade','time','gentle','opening','memory0','memory1','memory2'])uniforms[key]=gl.getUniformLocation(program,key);
 texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
}
async function loadPanorama(){
 const generation=++loadGeneration;$('retry').hidden=true;$('begin').disabled=true;
 let timeout;try{
  if(!gl||gl.isContextLost())initGL();
  const image=await new Promise((resolve,reject)=>{const img=new Image();timeout=setTimeout(()=>reject(Error('timeout')),45000);img.onload=()=>resolve(img);img.onerror=()=>reject(Error('image load'));img.src='/r2/postcard/pano/scene-a-riverside.jpg';});clearTimeout(timeout);if(generation!==loadGeneration)return;
  let source=image;const max=gl.getParameter(gl.MAX_TEXTURE_SIZE);if(image.width>max){const c=document.createElement('canvas');c.width=max;c.height=Math.round(image.height*max/image.width);c.getContext('2d').drawImage(image,0,0,c.width,c.height);source=c;}
  gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,source);if(gl.getError()!==gl.NO_ERROR)throw Error('texture upload');
  ready=true;body.dataset.ready='true';body.dataset.texture=`${source.width}x${source.height}`;$('begin').disabled=false;locale();
 }catch(error){clearTimeout(timeout);ready=false;body.dataset.ready='false';$('loadNote').textContent=t('这片风景暂时没有载入。检查网络后，可以再试一次。','The landscape could not load. Check your connection and try again.');$('retry').hidden=false;console.error('Panorama:',error);}
}
$('retry').onclick=loadPanorama;
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();ready=false;toast(t('画面暂时中断，正在恢复。','The image paused. Restoring it.'));});
canvas.addEventListener('webglcontextrestored',()=>{gl=null;loadPanorama();});
function viewLens(){const aspect=canvas.clientWidth/canvas.clientHeight;return aspect<1?.73:.50;}
function render(width,height){
 if(!ready||gl.isContextLost())return;
 if(width&&height){canvas.width=width;canvas.height=height;}else{const ratio=Math.min(devicePixelRatio||1,1.75),w=Math.min(2560,Math.round(canvas.clientWidth*ratio)),h=Math.round(w*canvas.clientHeight/canvas.clientWidth);if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}}
 gl.viewport(0,0,canvas.width,canvas.height);gl.useProgram(program);
 for(const [k,value] of Object.entries({yaw:yaw*RAD,pitch:pitch*RAD,aspect:canvas.width/canvas.height,lens,fade,time:elapsed,gentle:gentle?1:0,opening}))gl.uniform1f(uniforms[k],value);
 memories.forEach((m,i)=>gl.uniform4f(uniforms['memory'+i],...m.dir,m.strength));gl.drawArrays(gl.TRIANGLES,0,6);
}
function tick(ms){
 const dt=Math.min(.05,(ms-lastTime)/1000||0);lastTime=ms;
 if(!document.hidden){elapsed+=dt;
  if(mode==='explore'){
   exploreTime+=dt;if(keys.has('ArrowLeft'))targetYaw-=dt*25;if(keys.has('ArrowRight'))targetYaw+=dt*25;if(keys.has('ArrowUp'))targetPitch+=dt*18;if(keys.has('ArrowDown'))targetPitch-=dt*18;targetPitch=clamp(targetPitch,-60,60);if(keys.size)lastMoved=elapsed;
   const angles=memories.map(m=>distance(direction(yaw,pitch),m.dir));const choice=pickFocus(angles,active);if(choice!==active){active=choice;dwell=0;}else dwell+=dt;
   const still=elapsed-lastMoved>.18;fade=damp(fade,1,.55,dt);
   memories.forEach((m,i)=>{const trace=m.seen?traceStrength(exploreTime-m.at):0;const attention=i===active?(.3+(still?.7:.2))*clamp(dwell/1.2,0,1):0;m.strength=damp(m.strength,Math.max(trace,attention),i===active?2.1:.8,dt);});
  }else if(mode==='intro'){fade=damp(fade,.30,.4,dt);memories[0].strength=.40;}
  yaw=damp(yaw,targetYaw,gentle?9:6,dt);pitch=damp(pitch,targetPitch,6,dt);lens=damp(lens,targetLens,4,dt);opening=damp(opening,mode==='entering'?1:0,mode==='entering'?4:1.5,dt);
  render();
  if(elapsed-lastUi>.2){lastUi=elapsed;body.dataset.focus=active>=0?memories[active].id:'';body.dataset.dwell=dwell.toFixed(2);body.dataset.yaw=yaw.toFixed(2);body.dataset.pitch=pitch.toFixed(2);body.dataset.traces=memories.filter(m=>m.seen).map(m=>m.id).join(',');body.dataset.strengths=memories.map(m=>m.strength.toFixed(3)).join(',');$('focusWhisper').classList.toggle('visible',mode==='explore'&&active>=0&&dwell>.8&&dwell<4&&!memories.some(m=>m.seen));}
 }
 requestAnimationFrame(tick);
}
$('begin').onclick=()=>{if(!ready)return;setMode('explore');$('introduction').inert=true;$('exploreUI').hidden=false;fade=.15;exploreTime=0;targetLens=viewLens();canvas.focus({preventScroll:true});announce(t('拖动探索，点击清晰的景物进入记忆。','Drag to explore. Click a clear place to enter a memory.'));};

function pointerDirection(e){const r=canvas.getBoundingClientRect();return rayAt(e.clientX-r.left,e.clientY-r.top,r.width,r.height,yaw,pitch,lens);}
function hitMemory(e){const ray=pointerDirection(e);return memories.map(m=>({m,d:distance(ray,m.dir)})).filter(o=>o.d<12&&o.m.strength>.40).sort((a,b)=>a.d-b.d)[0]?.m;}
canvas.addEventListener('pointerdown',e=>{if(mode!=='explore')return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});canvas.setPointerCapture(e.pointerId);if(pointers.size===1)drag={id:e.pointerId,x:e.clientX,y:e.clientY,prevX:e.clientX,prevY:e.clientY,moved:0,pinched:false};if(pointers.size===2){const p=[...pointers.values()];pinchDistance=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);pinchLens=targetLens;if(drag)drag.pinched=true;}});
canvas.addEventListener('pointermove',e=>{
 if(mode!=='explore')return;
 if(!pointers.has(e.pointerId)){canvas.classList.toggle('can-enter',!!hitMemory(e));return;}
 pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
 if(pointers.size===2){const p=[...pointers.values()],n=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);if(n>10)targetLens=clamp(pinchLens*pinchDistance/n,.28,.9);lastMoved=elapsed;return;}
 if(drag&&e.pointerId===drag.id){const dx=e.clientX-drag.prevX,dy=e.clientY-drag.prevY;drag.moved=Math.max(drag.moved,Math.hypot(e.clientX-drag.x,e.clientY-drag.y));drag.prevX=e.clientX;drag.prevY=e.clientY;targetYaw-=dx*.13;targetPitch=clamp(targetPitch+dy*.11,-60,60);lastMoved=elapsed;}
});
function endPointer(e){const click=drag&&drag.id===e.pointerId&&drag.moved<7&&!drag.pinched&&e.type!=='pointercancel';pointers.delete(e.pointerId);if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);if(!pointers.size)drag=null;if(click&&mode==='explore'){const m=hitMemory(e);if(m)openMemory(m);}}
canvas.addEventListener('pointerup',endPointer);canvas.addEventListener('pointercancel',endPointer);
canvas.addEventListener('wheel',e=>{if(mode!=='explore')return;e.preventDefault();targetLens=clamp(targetLens+e.deltaY*.00035,.28,.9);lastMoved=elapsed;},{passive:false});
canvas.addEventListener('keydown',e=>{if(mode!=='explore')return;if(e.key.startsWith('Arrow')){e.preventDefault();keys.add(e.key);}if(e.key==='Enter'&&active>=0&&memories[active].strength>.4){e.preventDefault();openMemory(memories[active]);}});
window.addEventListener('keyup',e=>keys.delete(e.key));window.addEventListener('blur',()=>{keys.clear();pointers.clear();drag=null;});
window.addEventListener('resize',()=>{targetLens=viewLens();});
$('gentleButton').onclick=()=>{gentle=!gentle;locale();toast(gentle?t('轻柔模式：减少模糊与动画。','Gentle mode: softer blur and less motion.'):t('已恢复完整的记忆变化。','The full memory treatment is restored.'));};

async function openMemory(m){
 if(mode!=='explore')return;keys.clear();pointers.clear();drag=null;setMode('entering');const request=++transitionId;videoIndex=m.index;videoTime=0;
 try{posterURL=canvas.toDataURL('image/jpeg',.92);}catch{posterURL='';}
 video.classList.remove('has-frame');video.src=m.video;video.poster=posterURL;video.muted=false;video.volume=1;video.load();
 $('memoryNumber').textContent=`FRAGMENT ${String(m.index+1).padStart(2,'0')} / THE THAMES`;$('videoMessage').textContent=t('记忆正在浮现…','A memory is returning…');$('resumeVideo').hidden=true;locale();
 // Start the media during the user's gesture; the visible reveal settles over it.
 const play=video.play();if(play)play.catch(()=>{if(request===transitionId)$('resumeVideo').hidden=false;});
 await new Promise(resolve=>setTimeout(resolve,gentle?120:760));if(request!==transitionId)return;
 setMode('video');$('memoryDialog').showModal();$('closeMemory').focus({preventScroll:true});
}
video.addEventListener('loadeddata',()=>{video.classList.add('has-frame');$('videoMessage').textContent='';});
video.addEventListener('playing',()=>{video.classList.add('has-frame');$('videoMessage').textContent='';$('resumeVideo').hidden=true;});
video.addEventListener('waiting',()=>{$('videoMessage').textContent=t('稍候，让声音和画面回来。','A moment, while picture and sound return.');});
video.addEventListener('error',()=>{if(videoIndex<0)return;$('videoMessage').textContent=t('片段暂时无法播放，可以重试或回到河边。','This fragment could not play. Retry, or return to the river.');$('resumeVideo').hidden=false;});
$('resumeVideo').onclick=()=>{if(video.error)video.load();video.play().catch(()=>toast(t('播放没有开始，请再点一次播放。','Playback did not start. Please try Play again.')));};
video.addEventListener('timeupdate',()=>{if(videoIndex<0)return;videoTime=Math.max(videoTime,video.currentTime);if(videoTime>1){const m=memories[videoIndex];m.seen=true;m.at=exploreTime;}const n=Number.isFinite(video.duration)&&video.duration>0?video.currentTime/video.duration:0;$('videoProgress').style.transform=`scaleX(${n})`;});
video.addEventListener('ended',()=>{const request=transitionId;setTimeout(()=>{if(request===transitionId)closeMemory();},gentle?200:900);});
function closeMemory(){if(videoIndex<0)return;++transitionId;const m=memories[videoIndex];if(videoTime>1){m.seen=true;m.at=exploreTime;m.strength=Math.max(m.strength,.78);}video.pause();video.removeAttribute('src');video.load();videoIndex=-1;videoTime=0;$('memoryDialog').close();setMode('explore');locale();canvas.focus({preventScroll:true});}
$('closeMemory').onclick=closeMemory;$('memoryDialog').addEventListener('cancel',e=>{e.preventDefault();closeMemory();});

let sheetPrevious='intro';
function openSheet(dialog){if(mode==='entering'||mode==='video')return;sheetPrevious=mode;keys.clear();setMode('sheet');dialog.showModal();}
function closeSheet(dialog){dialog.close();setMode(sheetPrevious);if(mode==='explore')canvas.focus({preventScroll:true});}
for(const [button,dialog,close] of [['aboutButton','aboutDialog','closeAbout'],['helpButton','helpDialog','closeHelp']]){
 $(button).onclick=()=>openSheet($(dialog));$(close).onclick=()=>closeSheet($(dialog));$(dialog).addEventListener('cancel',e=>{e.preventDefault();closeSheet($(dialog));});
}
$('closeKeep').onclick=()=>closeSheet($('keepDialog'));$('keepDialog').addEventListener('cancel',e=>{e.preventDefault();closeSheet($('keepDialog'));});

async function saveMoment(){
 if(!ready||mode!=='explore')return;$('saveMoment').disabled=true;
 try{
  const c=document.createElement('canvas');c.width=1800;const imageHeight=Math.round(1680*canvas.clientHeight/canvas.clientWidth);c.height=imageHeight+260;const ctx=c.getContext('2d');
  render(1680,imageHeight);ctx.fillStyle='#1b2422';ctx.fillRect(0,0,c.width,c.height);ctx.drawImage(canvas,60,60,1680,imageHeight);render();
  ctx.strokeStyle='#7b847044';ctx.strokeRect(59.5,59.5,1681,imageHeight+1);ctx.fillStyle='#e9e4d4';ctx.font='38px Georgia';ctx.fillText('WHAT REMAINS',60,imageHeight+125);
  ctx.font='20px Arial';ctx.fillStyle='#bec6b8';ctx.fillText(t('此刻，还记得。','For now, remembered.'),60,imageHeight+168);
  ctx.font='14px Arial';ctx.fillText('THE THAMES, LONDON   /   JUNHANG ZHOU   /   2026',60,imageHeight+211);
  ctx.textAlign='right';ctx.fillText(t('一次停留的形状','THE SHAPE OF YOUR ATTENTION'),1740,imageHeight+211);
  savedBlob=await new Promise(resolve=>c.toBlob(resolve,'image/png'));if(!savedBlob)throw Error('empty image');if(savedURL)URL.revokeObjectURL(savedURL);savedURL=URL.createObjectURL(savedBlob);
  $('savedImage').src=savedURL;$('savedImage').width=c.width;$('savedImage').height=c.height;$('savedImage').alt=t('此刻的记忆图像，保留探索时的清晰与模糊','Your memory image, retaining the clarity and blur of this moment');$('downloadMoment').href=savedURL;
  $('keepDialog').dataset.exportSize=`${c.width}x${c.height}`;openSheet($('keepDialog'));
 }catch(error){toast(t('图像暂时没有保存成功，请重试。','The image could not be saved. Please try again.'));console.error('Save:',error);}finally{$('saveMoment').disabled=false;}
}
$('saveMoment').onclick=saveMoment;
document.addEventListener('visibilitychange',()=>{keys.clear();lastTime=performance.now();if(document.hidden&&videoIndex>=0){video.pause();$('resumeVideo').hidden=false;}});
window.addEventListener('pagehide',()=>{video.pause();if(savedURL)URL.revokeObjectURL(savedURL);});
targetLens=lens=viewLens();loadPanorama();requestAnimationFrame(tick);
