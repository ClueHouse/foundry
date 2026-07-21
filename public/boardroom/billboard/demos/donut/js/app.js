(() => {
  const site = document.getElementById('site');
  const triggers = [...document.querySelectorAll('[data-overlay]')];
  const overlays = [...document.querySelectorAll('.overlay')];
  let lastTrigger = null;

  function openOverlay(name, trigger) {
    const overlay = document.getElementById(`overlay-${name}`);
    if (!overlay) return;
    closeAll(false);
    lastTrigger = trigger;
    overlay.hidden = false;
    document.body.classList.add('overlay-open');
    requestAnimationFrame(() => overlay.querySelector('.overlay-close')?.focus());
  }

  function closeAll(restoreFocus = true) {
    overlays.forEach(overlay => { overlay.hidden = true; });
    document.body.classList.remove('overlay-open');
    if (restoreFocus && lastTrigger) lastTrigger.focus();
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => openOverlay(trigger.dataset.overlay, trigger));
  });

  overlays.forEach(overlay => {
    overlay.querySelector('.overlay-close')?.addEventListener('click', () => closeAll());
    overlay.addEventListener('mousedown', event => {
      if (event.target === overlay) closeAll();
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeAll();
    if (event.key !== 'Tab') return;
    const active = overlays.find(overlay => !overlay.hidden);
    if (!active) return;
    const focusable = [...active.querySelectorAll('button,input,select,textarea,[href],[tabindex]:not([tabindex="-1"])')]
      .filter(el => !el.disabled && el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  document.getElementById('order-form')?.addEventListener('submit', event => {
    event.preventDefault();
    const status = event.currentTarget.querySelector('.form-status');
    status.textContent = 'Thank you — your request is ready to be connected to the ordering service.';
  });

  site.querySelector('.brand')?.addEventListener('click', event => {
    event.preventDefault();
    closeAll(false);
  });
})();
