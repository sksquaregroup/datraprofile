// Add a shadow to the nav once the page is scrolled.
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20));
}

// Reveal-on-scroll: fade elements in as they enter the viewport.
const obs = new IntersectionObserver(
  e => e.forEach(el => { if (el.isIntersecting) el.target.classList.add('in'); }),
  { threshold: 0.10 }
);
document.querySelectorAll('.rv').forEach(el => obs.observe(el));

// Logo carousel: duplicate the set once so the marquee can loop seamlessly.
const logoTrack = document.getElementById('logoTrack');
if (logoTrack) {
  logoTrack.setAttribute('aria-label', 'Trusted partners');
  const clone = logoTrack.cloneNode(true);
  while (clone.firstElementChild) {
    const item = clone.firstElementChild;
    item.setAttribute('aria-hidden', 'true');
    logoTrack.appendChild(item);
  }
}

// Audience toggle: switch the page between Owner and Operator emphasis.
// Default is "owners". Choice persists in localStorage across visits.
(function () {
  const btns = document.querySelectorAll('.aud-btn');
  if (!btns.length) return;
  let saved = 'owners';
  try { saved = localStorage.getItem('datraView') || 'owners'; } catch (e) {}

  function setView(view) {
    document.body.setAttribute('data-view', view);
    btns.forEach(b => {
      const on = b.dataset.viewSet === view;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    try { localStorage.setItem('datraView', view); } catch (e) {}
  }

  btns.forEach(b => b.addEventListener('click', () => setView(b.dataset.viewSet)));
  setView(saved);
})();

// Demo form: submit to demo handler, show inline status.
(function () {
  const form = document.getElementById('demoForm');
  if (!form) return;
  const statusEl = document.getElementById('df-status');
  const submitBtn = document.getElementById('df-submit');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!statusEl) return;
    statusEl.className = 'df-status';
    statusEl.textContent = '';

    // Basic required-field check with inline highlighting.
    let firstInvalid = null;
    form.querySelectorAll('[required]').forEach((el) => {
      const empty = el.type === 'checkbox' ? !el.checked : !el.value.trim();
      const wrap = el.closest('.df-field') || el.closest('.df-consent');
      if (wrap) wrap.classList.toggle('err', empty);
      if (empty && !firstInvalid) firstInvalid = el;
    });
    if (firstInvalid) {
      statusEl.className = 'df-status bad';
      statusEl.textContent = 'Please complete the highlighted fields.';
      firstInvalid.focus();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      const original = submitBtn.innerHTML;
      submitBtn.textContent = 'Sending…';

      setTimeout(() => {
        form.reset();
        statusEl.className = 'df-status ok';
        statusEl.textContent = 'Thanks — our SK Square Group specialist will be in touch shortly to schedule your Datra demo.';
        submitBtn.disabled = false;
        submitBtn.innerHTML = original;
      }, 800);
    }
  });
})();

// Cookie consent
(function () {
  const KEY = 'datraCookieConsent'; // 'accepted' | 'rejected'
  const banner    = document.getElementById('cookieBanner');
  const reopen    = document.getElementById('cookieReopen');
  const acceptBtn = document.getElementById('cookieAccept');
  const rejectBtn = document.getElementById('cookieReject');
  if (!banner) return;

  function showBanner(show) {
    banner.classList.toggle('show', show);
    if (reopen) reopen.hidden = show;
  }

  function setConsent(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
    showBanner(false);
  }

  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}

  if (saved === 'accepted' || saved === 'rejected') {
    showBanner(false);
  } else {
    showBanner(true);
  }

  acceptBtn && acceptBtn.addEventListener('click', () => setConsent('accepted'));
  rejectBtn && rejectBtn.addEventListener('click', () => setConsent('rejected'));
  reopen   && reopen.addEventListener('click', () => showBanner(true));
})();
