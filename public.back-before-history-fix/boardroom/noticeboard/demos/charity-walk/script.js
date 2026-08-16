document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('message-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('sender-name').value.trim();
    const email = document.getElementById('sender-email').value.trim();
    const message = document.getElementById('sender-message').value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please complete all three fields.';
      return;
    }

    const subject = encodeURIComponent(`A trail message for Kōkiri from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    status.textContent = 'Opening your email app…';
    window.location.href = `mailto:kokiri@ontheroad.nz?subject=${subject}&body=${body}`;
  });
});
