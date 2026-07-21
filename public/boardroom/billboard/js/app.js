(() => {
  const action = document.querySelector('.hero-action');
  const target = document.querySelector('#demonstrations');
  if (!action || !target) return;

  action.addEventListener('click', (event) => {
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();
