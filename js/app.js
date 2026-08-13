(() => {
  const menu = document.getElementById('site-menu');
  const trigger = document.getElementById('menu-trigger');
  const menuClose = document.querySelector('.menu-close');
  const scrim = document.getElementById('menu-scrim');
  const panel = document.getElementById('detail-panel');
  const panelClose = document.querySelector('.detail-close');
  const views = [...document.querySelectorAll('.detail-view')];
  const sectionButtons = [...document.querySelectorAll('[data-section]')];

  function setMenu(open) {
    menu.classList.toggle('open', open);
    scrim.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    trigger.setAttribute('aria-expanded', String(open));
    if (open) menu.querySelector('[data-section]')?.focus({preventScroll:true});
  }

  function openSection(name) {
    const target = views.find(view => view.dataset.view === name);
    if (!target) return;
    setMenu(false);
    views.forEach(view => view.classList.toggle('active', view === target));
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    panelClose.focus({preventScroll:true});
  }

  function closeSection() {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    views.forEach(view => view.classList.remove('active'));
  }

  trigger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menuClose.addEventListener('click', () => { setMenu(false); trigger.focus(); });
  scrim.addEventListener('click', () => setMenu(false));
  panelClose.addEventListener('click', closeSection);

  sectionButtons.forEach(button => {
    button.addEventListener('click', () => openSection(button.dataset.section));
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (panel.classList.contains('open')) closeSection();
    else if (menu.classList.contains('open')) { setMenu(false); trigger.focus(); }
  });

  document.getElementById('quote-form')?.addEventListener('submit', event => {
    event.preventDefault();
    event.currentTarget.querySelector('.form-status').textContent = 'Project brief captured — ready to connect to your email or CRM.';
  });
})();
