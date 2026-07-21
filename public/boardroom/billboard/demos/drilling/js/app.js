(() => {
  const roots = [...document.querySelectorAll('[data-menu-root]')];
  const buttons = roots.map(root => root.querySelector('.hotspot'));

  function closeAll(except = null) {
    roots.forEach(root => {
      if (root === except) return;
      root.classList.remove('open');
      root.querySelector('.hotspot')?.setAttribute('aria-expanded', 'false');
    });
  }

  roots.forEach(root => {
    const button = root.querySelector('.hotspot');
    const menu = root.querySelector('.dropdown');

    button.addEventListener('click', event => {
      event.stopPropagation();
      const opening = !root.classList.contains('open');
      closeAll(root);
      root.classList.toggle('open', opening);
      button.setAttribute('aria-expanded', String(opening));
      if (opening) menu.querySelector('a, input, button')?.focus({preventScroll:true});
    });

    root.addEventListener('mouseenter', () => {
      closeAll(root);
      root.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
    });

    root.addEventListener('mouseleave', () => {
      root.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
    });

    menu.addEventListener('click', event => event.stopPropagation());
  });

  document.addEventListener('click', () => closeAll());
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      const openRoot = roots.find(root => root.classList.contains('open'));
      closeAll();
      openRoot?.querySelector('.hotspot')?.focus();
    }
  });

  document.querySelectorAll('.dropdown a').forEach(link => {
    link.addEventListener('click', event => event.preventDefault());
  });

  document.getElementById('quote-form')?.addEventListener('submit', event => {
    event.preventDefault();
    event.currentTarget.querySelector('.form-status').textContent = 'Request captured — ready to connect to your email or CRM.';
  });

  document.querySelector('.brand-replacement')?.addEventListener('click', event => {
    event.preventDefault();
    closeAll();
  });
})();
