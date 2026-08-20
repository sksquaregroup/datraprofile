/**
 * Datra Platform — Interactive Logic
 * Proprietary to SK Square Group
 */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation Scroll Class
  const navHeader = document.querySelector('header.site-nav');
  if (navHeader) {
    window.addEventListener('scroll', () => {
      navHeader.classList.toggle('scrolled', window.scrollY > 15);
    });
  }

  // Scroll Reveal Animations
  const revealItems = document.querySelectorAll('.reveal-item');
  if (revealItems.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.08 });

    revealItems.forEach(el => observer.observe(el));
  }

  // Infinite Partner Marquee Duplication
  const marqueeStrip = document.getElementById('marqueeStrip');
  if (marqueeStrip) {
    const clone = marqueeStrip.cloneNode(true);
    while (clone.firstElementChild) {
      const node = clone.firstElementChild;
      node.setAttribute('aria-hidden', 'true');
      marqueeStrip.appendChild(node);
    }
  }

  // Audience View Switcher (For Operators vs For Asset Owners)
  const viewTabs = document.querySelectorAll('.view-tab');
  if (viewTabs.length > 0) {
    let savedView = 'owners';
    try {
      savedView = localStorage.getItem('datraAudienceView') || 'owners';
    } catch (e) {}

    function applyView(viewName) {
      document.body.setAttribute('data-view', viewName);
      viewTabs.forEach(tab => {
        const isCurrent = tab.dataset.view === viewName;
        tab.classList.toggle('active', isCurrent);
        tab.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
      });
      try {
        localStorage.setItem('datraAudienceView', viewName);
      } catch (e) {}
    }

    viewTabs.forEach(tab => {
      tab.addEventListener('click', () => applyView(tab.dataset.view));
    });

    applyView(savedView);
  }

  // Demo Booking Form Handler
  const demoForm = document.getElementById('demoForm');
  if (demoForm) {
    const statusMsg = document.getElementById('formStatusMsg');
    const submitBtn = document.getElementById('formSubmitBtn');

    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!statusMsg) return;

      statusMsg.className = 'form-status-msg';
      statusMsg.textContent = '';

      let firstError = null;
      demoForm.querySelectorAll('[required]').forEach(field => {
        const isEmpty = field.type === 'checkbox' ? !field.checked : !field.value.trim();
        const parentGroup = field.closest('.form-group') || field.closest('.form-consent-row');
        if (parentGroup) parentGroup.classList.toggle('error', isEmpty);
        if (isEmpty && !firstError) firstError = field;
      });

      if (firstError) {
        statusMsg.className = 'form-status-msg bad';
        statusMsg.textContent = 'Please fill out all required fields to proceed.';
        firstError.focus();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.textContent = 'Scheduling Demo…';

        setTimeout(() => {
          demoForm.reset();
          statusMsg.className = 'form-status-msg ok';
          statusMsg.textContent = '✓ Thank you! An SK Square Group digital signage architect will contact you within 24 hours to arrange your live Datra Platform walkthrough.';
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 800);
      }
    });
  }

  // Cookie Notice Banner
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAcceptBtn = document.getElementById('cookieAcceptBtn');
  const cookieRejectBtn = document.getElementById('cookieRejectBtn');
  const cookieReopenBtn = document.getElementById('cookieReopenBtn');

  if (cookieBanner) {
    const CONSENT_KEY = 'datraCookieSettings';

    function setCookieChoice(choice) {
      try {
        localStorage.setItem(CONSENT_KEY, choice);
      } catch (e) {}
      cookieBanner.classList.remove('show');
      if (cookieReopenBtn) cookieReopenBtn.hidden = false;
    }

    let savedChoice = null;
    try {
      savedChoice = localStorage.getItem(CONSENT_KEY);
    } catch (e) {}

    if (!savedChoice) {
      setTimeout(() => cookieBanner.classList.add('show'), 600);
    } else if (cookieReopenBtn) {
      cookieReopenBtn.hidden = false;
    }

    cookieAcceptBtn?.addEventListener('click', () => setCookieChoice('accepted'));
    cookieRejectBtn?.addEventListener('click', () => setCookieChoice('rejected'));
    cookieReopenBtn?.addEventListener('click', () => {
      cookieBanner.classList.add('show');
      cookieReopenBtn.hidden = true;
    });
  }
});
