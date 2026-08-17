
// Nav show/hide on home
const nav = document.querySelector('.nav');
const hero = document.querySelector('.hero');
if(hero && nav){
  nav.classList.add('hidden');
}
// Trifold scroll
const wrap = document.querySelector('.trifold-wrap');
if(wrap){
  const triggerTarget = wrap.querySelector('.trifold-sticky') || wrap;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealDurationMs = prefersReducedMotion ? 0 : 800;
  const downwardThresholdPx = 60;
  const settleDelayMs = 180;
  let revealStarted = false;
  let sectionActive = false;
  let inputArmed = false;
  let accumulatedDownward = 0;
  let settleTimer = null;
  let touchStartY = null;

  function revealNow(){
    if(revealStarted) return;
    revealStarted = true;
    detachInputListeners();
    clearSettleTimer();

    wrap.classList.add('cards-revealed');

    window.setTimeout(()=>{
      if(hero && nav){
        nav.classList.remove('hidden');
      }
    }, revealDurationMs);
  }

  function clearSettleTimer(){
    if(settleTimer){
      window.clearTimeout(settleTimer);
      settleTimer = null;
    }
  }

  function armInputAfterSettle(){
    clearSettleTimer();
    accumulatedDownward = 0;
    inputArmed = false;
    settleTimer = window.setTimeout(()=>{
      if(!sectionActive || revealStarted) return;
      accumulatedDownward = 0;
      inputArmed = true;
    }, settleDelayMs);
  }

  function registerDownward(delta){
    if(!sectionActive || !inputArmed || revealStarted) return;
    if(delta <= 0) return;
    accumulatedDownward += delta;
    if(accumulatedDownward >= downwardThresholdPx){
      revealNow();
    }
  }

  function onWheel(event){
    registerDownward(event.deltaY);
  }

  function onTouchStart(event){
    if(!event.touches || event.touches.length === 0) return;
    touchStartY = event.touches[0].clientY;
  }

  function onTouchMove(event){
    if(!event.touches || event.touches.length === 0 || touchStartY === null) return;
    const currentY = event.touches[0].clientY;
    const delta = touchStartY - currentY;
    touchStartY = currentY;
    registerDownward(delta);
  }

  function onKeyDown(event){
    if(event.key === 'ArrowDown'){
      registerDownward(60);
    }
    if(event.key === 'PageDown' || event.key === ' ' || event.key === 'Spacebar'){
      registerDownward(80);
    }
  }

  function attachInputListeners(){
    window.addEventListener('wheel', onWheel, { passive:true });
    window.addEventListener('touchstart', onTouchStart, { passive:true });
    window.addEventListener('touchmove', onTouchMove, { passive:true });
    window.addEventListener('keydown', onKeyDown);
  }

  function detachInputListeners(){
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('keydown', onKeyDown);
    inputArmed = false;
    accumulatedDownward = 0;
    touchStartY = null;
  }

  function setSectionActive(active){
    if(revealStarted) return;
    if(sectionActive === active) return;
    sectionActive = active;
    if(sectionActive){
      attachInputListeners();
      armInputAfterSettle();
    } else {
      clearSettleTimer();
      detachInputListeners();
    }
  }

  if('IntersectionObserver' in window){
    const observer = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        setSectionActive(entry.isIntersecting && entry.intersectionRatio >= 0.98);
      });
    }, { threshold:[0, 0.98, 1] });

    observer.observe(triggerTarget);
  } else {
    function getVisibleRatio(element){
      const rect = element.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
      const normalizer = Math.max(Math.min(rect.height, vh), 1);
      return Math.max(0, Math.min(visible / normalizer, 1));
    }

    const onScroll = ()=>{
      setSectionActive(getVisibleRatio(triggerTarget) >= 0.98);
    };

    window.addEventListener('scroll', onScroll, { passive:true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }
}
// FAQ
document.querySelectorAll('.faq-q').forEach(q=>{
  q.addEventListener('click',()=>{
    const a = q.nextElementSibling;
    if(a) a.style.display = a.style.display==='none' ? 'block' : 'none';
  });
});
