// Add a shadow to the nav once the page is scrolled.
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20));

// Reveal-on-scroll: fade elements in as they enter the viewport.
const obs = new IntersectionObserver(
  e => e.forEach(el => { if (el.isIntersecting) el.target.classList.add('in'); }),
  { threshold: 0.10 }
);
document.querySelectorAll('.rv').forEach(el => obs.observe(el));

// Logo carousel: duplicate the set once so the marquee can loop seamlessly.
// The CSS animation scrolls the track to -50%, i.e. exactly one full set.
const logoTrack = document.getElementById('logoTrack');
if (logoTrack) {
  logoTrack.setAttribute('aria-label', 'Some of our customers');
  const clone = logoTrack.cloneNode(true);
  // Append the clone's children (the duplicate set) so it's one continuous strip.
  // Mark duplicates aria-hidden so assistive tech reads each logo only once.
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
  try { saved = localStorage.getItem('unityView') || 'owners'; } catch (e) {}

  function setView(view) {
    document.body.setAttribute('data-view', view);
    btns.forEach(b => {
      const on = b.dataset.viewSet === view;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    try { localStorage.setItem('unityView', view); } catch (e) {}
  }

  btns.forEach(b => b.addEventListener('click', () => setView(b.dataset.viewSet)));
  setView(saved);
})();

// Demo form: submit to contact.php via fetch, show inline status (no page reload).
(function () {
  const form = document.getElementById('demoForm');
  if (!form) return;
  const statusEl = document.getElementById('df-status');
  const submitBtn = document.getElementById('df-submit');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
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

    submitBtn.disabled = true;
    const original = submitBtn.innerHTML;
    submitBtn.textContent = 'Sending…';

    try {
      const fd = new FormData(form);

      // reCAPTCHA v3: fetch a fresh token and attach it to the submission.
      const siteKey = '6LfSTSotAAAAACTJwLagvMDpEk5xTFxiuYc4uATH';
      if (window.grecaptcha && siteKey) {
        const token = await new Promise((resolve) => {
          grecaptcha.ready(() => {
            grecaptcha.execute(siteKey, { action: 'demo_request' })
              .then(resolve).catch(() => resolve(''));
          });
        });
        fd.set('recaptcha_token', token);
      }

      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: fd
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        form.reset();
        statusEl.className = 'df-status ok';
        statusEl.textContent = data.message || 'Thanks — we’ll be in touch shortly to book your demo.';
      } else {
        statusEl.className = 'df-status bad';
        statusEl.textContent = data.message || 'Something went wrong. Please try again or call us.';
      }
    } catch (err) {
      statusEl.className = 'df-status bad';
      statusEl.textContent = 'Network error. Please try again, or email digital@astragroup.co.uk.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = original;
    }
  });
})();

// Cookie consent + consent-gated Google Analytics.
// GA only loads AFTER the user accepts. Choice persists in localStorage.
(function () {
  const GA_ID = 'G-FSHW2ZKZKW';
  const KEY = 'unityCookieConsent'; // 'accepted' | 'rejected'

  const banner   = document.getElementById('cookieBanner');
  const reopen   = document.getElementById('cookieReopen');
  const acceptBtn = document.getElementById('cookieAccept');
  const rejectBtn = document.getElementById('cookieReject');
  if (!banner) return;

  let gaLoaded = false;
  function loadGA() {
    if (gaLoaded || !GA_ID || GA_ID.indexOf('G-') !== 0) return;
    gaLoaded = true;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function showBanner(show) {
    banner.classList.toggle('show', show);
    if (reopen) reopen.hidden = show;
  }

  function setConsent(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
    showBanner(false);
    if (value === 'accepted') loadGA();
  }

  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}

  if (saved === 'accepted') { loadGA(); showBanner(false); }
  else if (saved === 'rejected') { showBanner(false); }
  else {
    // First visit: float the consent bar at the bottom until the user chooses.
    showBanner(true);
  }

  acceptBtn && acceptBtn.addEventListener('click', () => setConsent('accepted'));
  rejectBtn && rejectBtn.addEventListener('click', () => setConsent('rejected'));
  reopen   && reopen.addEventListener('click', () => showBanner(true));
})();
