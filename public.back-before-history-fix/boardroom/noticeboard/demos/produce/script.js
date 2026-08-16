const boardZone = document.querySelector('.board-zone');
const scrim = document.querySelector('.scrim');
const panels = document.querySelectorAll('.side-panel');

function closePanels() {
  panels.forEach((panel) => {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
  });
  scrim.classList.remove('active');
}

function openPanel(id) {
  closePanels();
  const panel = document.getElementById(id);
  panel.classList.add('open');
  panel.setAttribute('aria-hidden', 'false');
  scrim.classList.add('active');
}

boardZone.addEventListener('click', () => {
  boardZone.classList.toggle('active');
});

boardZone.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    boardZone.classList.toggle('active');
  }
});

document.querySelectorAll('[data-panel]').forEach((button) => {
  button.addEventListener('click', () => openPanel(button.dataset.panel));
});

document.querySelectorAll('.panel-close').forEach((button) => {
  button.addEventListener('click', closePanels);
});

scrim.addEventListener('click', closePanels);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closePanels();
});
