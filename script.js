// ── Case study filter tabs ──
const tabs  = document.querySelectorAll('.filter-tab');
const cards = document.querySelectorAll('.case-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    cards.forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

// ── Contact form ──
const form   = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  // Basic validation
  if (!name || !email || !message) {
    showStatus('Please fill in all fields.', true);
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showStatus('Please enter a valid email address.', true);
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending…';
  showStatus('');

  try {
    const res = await fetch('https://formspree.io/f/xjgayjpl', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form),
    });

    if (res.ok) {
      form.reset();
      showStatus('Message sent! I\'ll get back to you soon.');
    } else {
      showStatus('Something went wrong. Please try again.', true);
    }
  } catch {
    showStatus('Network error. Please try again.', true);
  }

  btn.disabled = false;
  btn.textContent = 'Send message';
});

function showStatus(msg, isError = false) {
  status.textContent = msg;
  status.className = 'form-status' + (isError ? ' error' : '');
}
