(() => {
  const stage = document.getElementById('stage');
  const overlays = [...document.querySelectorAll('.overlay')];
  let lastTrigger = null;

  function scaleStage() {
    if (window.innerWidth <= 900) return;
    const scale = Math.min(window.innerWidth / 1536, window.innerHeight / 1024);
    stage.style.transform = `scale(${scale})`;
  }

  function closeAll() {
    overlays.forEach(o => o.hidden = true);
    document.body.classList.remove('overlay-open');
    if (lastTrigger) lastTrigger.focus({ preventScroll: true });
  }

  function openOverlay(name, trigger) {
    closeAll();
    const overlay = document.getElementById(`overlay-${name}`);
    if (!overlay) return;
    lastTrigger = trigger || null;
    overlay.hidden = false;
    document.body.classList.add('overlay-open');
    overlay.querySelector('.overlay-close')?.focus({ preventScroll: true });
  }

  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-overlay]');
    if (trigger) openOverlay(trigger.dataset.overlay, trigger);
    if (e.target.closest('.overlay-close')) closeAll();
    if (e.target.classList.contains('overlay')) closeAll();
    if (e.target.closest('[data-open-book]')) openOverlay('book', e.target.closest('[data-open-book]'));
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAll();
  });

  document.getElementById('booking-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const status = e.currentTarget.querySelector('.form-status');
    status.textContent = 'Thanks — your booking request is ready to be connected to your preferred booking service.';
    e.currentTarget.querySelector('button[type="submit"]').disabled = true;
  });

  window.addEventListener('resize', scaleStage);
  scaleStage();
})();
