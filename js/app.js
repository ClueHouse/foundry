const track = document.getElementById('track');
const progress = document.getElementById('progress');
const chapterInd = document.getElementById('chapter-ind');
const counter = document.getElementById('counter');
const wheelHint = document.getElementById('wheel-hint');
const boutiqueScroll = document.getElementById('boutique-scroll');
const chapters = track ? Array.from(track.querySelectorAll('.chapter')) : [];
const total = chapters.length || 5;
let currentIndex = 0;
let targetIndex = 0;
let isAnimating = false;
let currentX = 0;
let targetX = 0;
const chaptersMeta = [
  {n:'01', name:'Arrival'},
  {n:'02', name:'Atelier'},
  {n:'03', name:'Collection'},
  {n:'04', name:'Details'},
  {n:'05', name:'Boutiques'}
];

function isMobile(){ return window.innerWidth <= 900 }
function pad(n){ return String(n).padStart(2,'0') }

function updateUI(idx){
  const m = chaptersMeta[idx];
  if(chapterInd && m) chapterInd.innerHTML = `<div class="cur">${m.n}</div><div class="meta">${m.name}<br>${pad(idx+1)} / ${pad(total)}</div>`;
  if(counter) counter.textContent = `${pad(idx+1)} — ${pad(total)}`;
  if(progress){
    const p = total > 1 ? idx/(total-1) : 1;
    progress.style.setProperty('--p', p);
    progress.style.transform = `scaleX(${p})`;
  }
  chapters.forEach((ch,i)=>{
    ch.classList.toggle('active', i===idx);
    if(i===idx){
      ch.querySelectorAll('.reveal').forEach((el,j)=>setTimeout(()=>el.classList.add('in'),j*120));
      ch.querySelectorAll('.img-reveal').forEach((el,j)=>setTimeout(()=>el.classList.add('in'),j*150+200));
    }
  });
}

function goTo(index){
  if(!track) return;
  index = Math.max(0, Math.min(total-1, index));
  if(isMobile()){
    chapters[index]?.scrollIntoView({behavior:'smooth'});
    return;
  }
  if(index===targetIndex && isAnimating) return;
  targetIndex=index;
  targetX=-index*window.innerWidth;
  isAnimating=true;
  wheelHint?.classList.add('hide');
}

function lerp(a,b,t){ return a+(b-a)*t }
function animate(){
  if(track && !isMobile()){
    currentX=lerp(currentX,targetX,0.08);
    if(Math.abs(currentX-targetX)<0.5){
      currentX=targetX;
      if(isAnimating){ currentIndex=targetIndex; updateUI(currentIndex); isAnimating=false; }
    }
    track.style.transform=`translate3d(${currentX}px,0,0)`;
  }
  requestAnimationFrame(animate);
}
function getInitialChapterIndex(){
  if(location.hash==='#boutiques') return total-1;
  if(location.hash==='#collection') return 2;
  return 0;
}
if(track){
  const initialIndex = getInitialChapterIndex();
  currentIndex = initialIndex;
  targetIndex = initialIndex;
  if(!isMobile()){
    currentX = -initialIndex * window.innerWidth;
    targetX = currentX;
    track.style.transform = `translate3d(${currentX}px,0,0)`;
  }
  animate();
  updateUI(initialIndex);
  if(isMobile() && initialIndex>0){
    setTimeout(()=>chapters[initialIndex]?.scrollIntoView({behavior:'auto'}),0);
  }
}

let wheelAcc=0;
let wheelTimeout=null;
function handleWheel(e){
  if(!track || isMobile()) return;
  const delta=e.deltaY;
  const onBoutiques=targetIndex===total-1 && boutiqueScroll;

  if(onBoutiques){
    const atTop=boutiqueScroll.scrollTop<=1;
    const atBottom=boutiqueScroll.scrollTop+boutiqueScroll.clientHeight>=boutiqueScroll.scrollHeight-1;
    if(delta<0 && atTop){
      e.preventDefault();
      if(!isAnimating) goTo(total-2);
      return;
    }
    if(delta>0 && atBottom){
      e.preventDefault();
      return;
    }
    // Let the final chapter scroll naturally.
    return;
  }

  e.preventDefault();
  if(isAnimating) return;
  wheelAcc+=delta;
  clearTimeout(wheelTimeout);
  wheelTimeout=setTimeout(()=>{wheelAcc=0},300);
  if(Math.abs(wheelAcc)<40) return;
  goTo(wheelAcc>0 ? targetIndex+1 : targetIndex-1);
  wheelAcc=0;
}
window.addEventListener('wheel',handleWheel,{passive:false});

let touchStartX=0,touchStartY=0;
window.addEventListener('touchstart',e=>{touchStartX=e.touches[0].clientX;touchStartY=e.touches[0].clientY},{passive:true});
window.addEventListener('touchend',e=>{
  if(!track || isMobile()) return;
  const dx=e.changedTouches[0].clientX-touchStartX;
  const dy=e.changedTouches[0].clientY-touchStartY;
  if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>60) goTo(dx<0 ? targetIndex+1 : targetIndex-1);
},{passive:true});

document.querySelectorAll('[data-goto]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();goTo(parseInt(a.dataset.goto,10))}));
window.addEventListener('keydown',e=>{
  if(!track || isMobile()) return;
  const onBoutiques=targetIndex===total-1 && boutiqueScroll;
  if(onBoutiques && (e.key==='ArrowDown'||e.key==='PageDown')) return;
  if(onBoutiques && (e.key==='ArrowUp'||e.key==='PageUp') && boutiqueScroll.scrollTop>1) return;
  if(e.key==='ArrowRight'||e.key==='ArrowDown'||e.key==='PageDown') goTo(targetIndex+1);
  if(e.key==='ArrowLeft'||e.key==='ArrowUp'||e.key==='PageUp') goTo(targetIndex-1);
});

document.querySelectorAll('.boutique-static').forEach(a=>a.addEventListener('click',e=>{
  if(a.getAttribute('href')==='#') e.preventDefault();
}));
window.addEventListener('resize',()=>{
  if(track && !isMobile()){
    targetX=-targetIndex*window.innerWidth;
    currentX=targetX;
    track.style.transform=`translate3d(${currentX}px,0,0)`;
  }
});

