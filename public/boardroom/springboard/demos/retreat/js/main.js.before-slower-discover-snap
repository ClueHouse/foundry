
const header=document.querySelector('.header');
window.addEventListener('scroll',()=>{ header.classList.toggle('scrolled', scrollY>40); });
document.querySelectorAll('.menu-btn').forEach(b=>b.addEventListener('click',()=>document.querySelector('.nav').classList.toggle('open')));
const obs=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); }),{threshold:.15});
document.querySelectorAll('.reveal,.img-reveal').forEach(el=>obs.observe(el));
document.querySelector('.hero')?.classList.add('loaded');
// discover parallax
const scenes=document.querySelectorAll('.d-bg img');
const sceneBlocks=document.querySelectorAll('.d-scene');
const progress=document.querySelector('.progress');
const updateDiscoverMotion=()=>{
  const sc=scrollY/(document.body.scrollHeight-innerHeight);
  if(progress) progress.style.width=sc*100+'%';
  sceneBlocks.forEach((scene,index)=>{
    const rect=scene.getBoundingClientRect();
    const viewportCenter=innerHeight * .5;
    const sceneCenter=rect.top + rect.height * .5;
    const distance=(sceneCenter-viewportCenter)/(innerHeight * .9);
    const depth=1 + ((index % 4) * .03);
    const floatOffset=Math.max(-14,Math.min(14,distance * -14 * depth));
    const textLift=Math.max(-8,Math.min(8,distance * -8));
    scene.style.setProperty('--scene-depth', depth.toFixed(2));
    scene.style.setProperty('--scene-shift', `${floatOffset * 0.08}px`);
    scene.style.setProperty('--scene-float', `${floatOffset * 0.05}px`);
    scene.style.setProperty('--scene-scale', `${Math.max(.02,Math.min(.07,Math.abs(distance) * .03 + (index % 3) * .004))}`);
    scene.style.setProperty('--text-lift', `${textLift}px`);
  });
  scenes.forEach(img=>{
    const rect=img.closest('.d-scene').getBoundingClientRect();
    const viewportCenter=innerHeight * .5;
    const sceneCenter=rect.top + rect.height * .5;
    const distance=(sceneCenter-viewportCenter)/(innerHeight * .75);
    const grow=Math.max(1.02,Math.min(1.08,1.03 + Math.abs(distance) * .03));
    const fade=Math.max(.86,Math.min(1,1 - Math.abs(distance) * .07));
    img.style.setProperty('--img-scale', grow.toFixed(3));
    img.style.setProperty('--img-opacity', fade.toFixed(3));
  });
};
updateDiscoverMotion();
window.addEventListener('scroll',updateDiscoverMotion,{passive:true});
window.addEventListener('resize',updateDiscoverMotion,{passive:true});
// reduced motion
if(matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
  scenes.forEach(img=>{
    img.style.setProperty('--img-scale','1.02');
    img.style.setProperty('--img-opacity','1');
  });
  sceneBlocks.forEach(scene=>{
    scene.style.setProperty('--scene-shift','0px');
    scene.style.setProperty('--scene-float','0px');
    scene.style.setProperty('--scene-scale','.03');
    scene.style.setProperty('--text-lift','0px');
  });
}

const thumbButtons=[...document.querySelectorAll('.retreat-thumb-btn')];
const lightbox=document.querySelector('#retreat-lightbox');
if(thumbButtons.length && lightbox){
  const lightboxImage=lightbox.querySelector('.lightbox-image');
  const lightboxCaption=lightbox.querySelector('.lightbox-caption');
  const closeBtn=lightbox.querySelector('.lightbox-close');
  const prevBtn=lightbox.querySelector('.lightbox-prev');
  const nextBtn=lightbox.querySelector('.lightbox-next');
  let activeIndex=0;
  let activeGallery=[];
  let lastTrigger=null;

  const setNavState=()=>{
    const atStart=activeIndex<=0;
    const atEnd=activeIndex>=activeGallery.length-1;
    prevBtn.disabled=atStart;
    nextBtn.disabled=atEnd;
    prevBtn.setAttribute('aria-disabled',String(atStart));
    nextBtn.setAttribute('aria-disabled',String(atEnd));
  };

  const showImage=(index)=>{
    if(!activeGallery.length) return;
    activeIndex=Math.max(0,Math.min(index,activeGallery.length-1));
    const item=activeGallery[activeIndex];
    lightboxImage.src=item.src;
    lightboxImage.alt=item.alt;
    lightboxCaption.textContent=item.alt;
    setNavState();
  };

  const openLightbox=(gallery,index,trigger)=>{
    lastTrigger=trigger;
    activeGallery=gallery;
    showImage(index);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    closeBtn.focus();
  };

  const closeLightbox=()=>{
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    lightboxImage.src='';
    activeGallery=[];
    if(lastTrigger) lastTrigger.focus();
  };

  thumbButtons.forEach((btn)=>{
    btn.addEventListener('click',()=>{
      const retreat=btn.closest('.retreat-full');
      if(!retreat) return;
      const groupButtons=[...retreat.querySelectorAll('.retreat-thumb-btn')];
      const groupGallery=groupButtons.map((thumbBtn)=>{
        const img=thumbBtn.querySelector('img');
        return { src:img?.getAttribute('src')||'', alt:img?.getAttribute('alt')||'' };
      });
      const index=groupButtons.indexOf(btn);
      openLightbox(groupGallery,Math.max(0,index),btn);
    });
  });

  prevBtn.addEventListener('click',()=>showImage(activeIndex-1));
  nextBtn.addEventListener('click',()=>showImage(activeIndex+1));
  closeBtn.addEventListener('click',closeLightbox);

  lightbox.addEventListener('click',(e)=>{
    if(e.target===lightbox) closeLightbox();
  });

  document.addEventListener('keydown',(e)=>{
    if(!lightbox.classList.contains('open')) return;
    if(e.key==='Escape') closeLightbox();
    if(e.key==='ArrowLeft' && !prevBtn.disabled) showImage(activeIndex-1);
    if(e.key==='ArrowRight' && !nextBtn.disabled) showImage(activeIndex+1);
  });
}
