(() => {
  const site = document.getElementById('site');
  const triggers = [...document.querySelectorAll('[data-overlay]')];
  const reveals = [...document.querySelectorAll('.overlay')];
  let lastTrigger = null;

  function openReveal(name, trigger) {
    const reveal = document.getElementById(`overlay-${name}`);
    if (!reveal) return;

    closeAll(false);
    lastTrigger = trigger;
    reveal.hidden = false;
    reveal.classList.add('is-entering');
    site.classList.add('reveal-open');
    site.dataset.reveal = name;
    trigger?.classList.add('is-active');
    trigger?.setAttribute('aria-pressed', 'true');

    requestAnimationFrame(() => {
      reveal.classList.remove('is-entering');
      reveal.querySelector('.overlay-close')?.focus();
    });
  }

  function closeAll(restoreFocus = true) {
    reveals.forEach(reveal => {
      reveal.hidden = true;
      reveal.classList.remove('is-entering');
    });

    triggers.forEach(trigger => {
      trigger.classList.remove('is-active');
      trigger.removeAttribute('aria-pressed');
    });

    site.classList.remove('reveal-open');
    delete site.dataset.reveal;

    if (restoreFocus && lastTrigger) lastTrigger.focus();
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const name = trigger.dataset.overlay;
      const alreadyOpen = site.dataset.reveal === name;
      alreadyOpen ? closeAll() : openReveal(name, trigger);
    });
  });

  reveals.forEach(reveal => {
    reveal.querySelector('.overlay-close')?.addEventListener('click', () => closeAll());
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeAll();
  });

  document.getElementById('catering-enquiry')?.addEventListener('click', event => {
    const button = event.currentTarget;
    button.classList.remove('is-sending');
    void button.offsetWidth;
    button.classList.add('is-sending');

    setTimeout(() => {
      window.location.href = 'mailto:aholein1@rkdb.nz?subject=Catering%20Enquiry&body=Hi%20there%2C%0A%0AI%27d%20like%20to%20make%20a%20catering%20enquiry.%0A%0A';
    }, 320);
  });

  document.getElementById('order-form')?.addEventListener('submit', event => {
    event.preventDefault();
    const status = event.currentTarget.querySelector('.form-status');
    status.textContent = 'Thank you — an agent will be in touch within the next 20 minutes.';
  });

  site.querySelector('.brand')?.addEventListener('click', event => {
    event.preventDefault();
    closeAll(false);
  });
})();
