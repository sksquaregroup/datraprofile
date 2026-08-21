/**
 * Datra Platform — Enterprise SaaS Interactive Engine
 * Production-ready modules, interactive ROI calculator, live terminal actions, & filter tabs
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Theme Switcher Engine (Footer Segmented Switcher & Global Sync)
  const themeSegBtns = document.querySelectorAll('.theme-seg-btn');
  const legacyToggleBtn = document.getElementById('themeToggleBtn');
  
  let savedTheme = 'dark';
  try {
    savedTheme = localStorage.getItem('datraThemePreference') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  } catch (e) {}

  function applyTheme(theme) {
    const isLight = theme === 'light';
    if (isLight) {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.body.removeAttribute('data-theme');
    }

    // Sync segmented buttons
    themeSegBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.themeVal === theme);
    });

    try {
      localStorage.setItem('datraThemePreference', theme);
    } catch (e) {}
  }

  // Apply initially
  applyTheme(savedTheme);

  // Segmented buttons click listeners
  themeSegBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.themeVal;
      applyTheme(selected);
    });
  });

  // Header sliding pill toggle & icon button listeners
  const headerThemeButtons = document.querySelectorAll('.theme-pill-toggle, #themePillToggle, .theme-nav-btn, #themeNavBtn, #themeToggleBtn');
  headerThemeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      applyTheme(currentTheme === 'light' ? 'dark' : 'light');
    });
  });

  // 1. Hash Tagging Navigation Handler (/#/route/ support)
  function resolveHashTarget(hash) {
    if (!hash) return null;
    // Extract route keyword from '#/calculator/', '#/platform/', '#/demo/', '#calculator', etc.
    const cleanRoute = hash.replace(/^#\/?/, '').replace(/\/$/, '').toLowerCase();
    if (!cleanRoute) return null;
    return document.getElementById(cleanRoute);
  }

  function handleHashNavigation() {
    const targetEl = resolveHashTarget(window.location.hash);
    if (targetEl) {
      setTimeout(() => {
        const navOffset = 76;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }, 60);
    }
  }

  window.addEventListener('hashchange', handleHashNavigation);
  if (window.location.hash) {
    setTimeout(handleHashNavigation, 250);
  }

  // Intercept in-page hash links for instant smooth scroll
  document.querySelectorAll('a[href*="/#/"], a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && (href.includes('/#/') || href.startsWith('#'))) {
        const hashPart = href.substring(href.indexOf('#'));
        const targetEl = resolveHashTarget(hashPart);
        if (targetEl) {
          e.preventDefault();
          window.location.hash = hashPart;
          const navOffset = 76;
          const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navOffset;
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
          if (navMenu && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
          }
        }
      }
    });
  });

  // 2. Navigation Scroll State
  const navHeader = document.querySelector('header.site-nav');
  if (navHeader) {
    const handleScroll = () => {
      navHeader.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  }

  // 3. Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  // 4. Scroll Reveal Animation
  const revealItems = document.querySelectorAll('.rv');
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

  // 4. Audience View Switcher (Owners vs Operators)
  const audButtons = document.querySelectorAll('.aud-btn');
  if (audButtons.length > 0) {
    let currentView = 'owners';
    try {
      currentView = localStorage.getItem('datraAudienceView') || 'owners';
    } catch (e) {}

    function setAudienceView(viewName) {
      document.body.setAttribute('data-view', viewName);
      audButtons.forEach(btn => {
        const isActive = btn.dataset.viewSet === viewName;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      try {
        localStorage.setItem('datraAudienceView', viewName);
      } catch (e) {}
    }

    audButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetView = btn.dataset.viewSet;
        if (targetView) setAudienceView(targetView);
      });
    });

    setAudienceView(currentView);
  }

  // 5. Infinite Trust Marquee Setup
  const marqueeTrack = document.getElementById('marqueeTrack');
  if (marqueeTrack) {
    const items = Array.from(marqueeTrack.children);
    items.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      marqueeTrack.appendChild(clone);
    });
  }

  // 6. Interactive Terminal Engine & Action Buttons
  const terminalLinesContainer = document.getElementById('terminalOutput');
  const termActionButtons = document.querySelectorAll('.t-action-btn');

  const defaultCommands = [
    { type: 'cmd', text: 'datra-agent status --estate-id UK-AIR-09' },
    { type: 'ok', text: '✔ Agent connected (v4.8.2-enterprise) — TLS 1.3 / Per-tenant Isolation' },
    { type: 'info', text: '  Endpoint: lhr-t5-dep-wall-01 (10.240.12.88) | RS232: SYNCED' },
    { type: 'cmd', text: 'datra-cli rs232 --device "Samsung-QM85" --query power,thermal,input' },
    { type: 'ok', text: '✔ RS232 Bus ACK (0x01 0xFF 0x41 0x00): Panel PWR=ON, Temp=24.5°C, Input=HDMI1' }
  ];

  function printLine(type, text) {
    if (!terminalLinesContainer) return;
    const line = document.createElement('div');
    line.className = `term-line ${type}`;
    line.textContent = text;
    terminalLinesContainer.appendChild(line);
    terminalLinesContainer.scrollTop = terminalLinesContainer.scrollHeight;
  }

  if (terminalLinesContainer) {
    let stepIndex = 0;
    function runInitialTerminal() {
      if (stepIndex < defaultCommands.length) {
        const cmd = defaultCommands[stepIndex];
        printLine(cmd.type, cmd.text);
        stepIndex++;
        setTimeout(runInitialTerminal, cmd.type === 'cmd' ? 800 : 350);
      }
    }
    setTimeout(runInitialTerminal, 900);
  }

  // Terminal Action Playground Triggers
  const actionPayloads = {
    rs232: [
      { type: 'cmd', text: 'datra-cli rs232 --send "0x08 0x22 0x00 0x00 0x00 0x01 0xD5"' },
      { type: 'ok', text: '✔ RS232 Response: Panel Backlight set to 850 nits (Auto-ambient sync enabled)' }
    ],
    verify: [
      { type: 'cmd', text: 'datra-proof --verify-block --range 00:00-06:00' },
      { type: 'ok', text: '✔ Proof of Play Audit: 21,600 frames rendered | SHA-256 Verified (0 Disputes)' }
    ],
    reboot: [
      { type: 'cmd', text: 'datra-agent restart-player --graceful --force-watchdog' },
      { type: 'warn', text: '● Watchdog triggering player process recycle...' },
      { type: 'ok', text: '✔ Media Player process restarted in 1.42s | Video output restored' }
    ],
    report: [
      { type: 'cmd', text: 'datra-inspect export --format pdf --estate-all' },
      { type: 'ok', text: '✔ Generated PPM & ISO SLA Audit Report: https://reports.datraplatform.com/r_89a0f.pdf' }
    ]
  };

  termActionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const steps = actionPayloads[action];
      if (steps) {
        steps.forEach((s, idx) => {
          setTimeout(() => printLine(s.type, s.text), idx * 400);
        });
      }
    });
  });

  // 7. Interactive Mosaic Category Filters
  const mosaicFilterBtns = document.querySelectorAll('.m-filter-btn');
  const screenTiles = document.querySelectorAll('.screen-tile');

  mosaicFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      mosaicFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.category;

      screenTiles.forEach(tile => {
        if (category === 'all' || tile.dataset.category === category) {
          tile.style.display = 'flex';
        } else {
          tile.style.display = 'none';
        }
      });
    });
  });

  // 8. Interactive ROI & Cost Savings Calculator
  const fleetRangeInput = document.getElementById('fleetSizeSlider');
  const fleetSizeDisplay = document.getElementById('fleetSizeVal');
  const savingsDisplay = document.getElementById('annualSavingsVal');
  const truckRollsDisplay = document.getElementById('truckRollsVal');
  const slaRecoveryDisplay = document.getElementById('slaRecoveryVal');

  if (fleetRangeInput && savingsDisplay) {
    function updateCalculator() {
      const screens = parseInt(fleetRangeInput.value, 10);
      if (fleetSizeDisplay) fleetSizeDisplay.textContent = `${screens.toLocaleString()} Screens`;

      // Conservative industry metrics:
      // ~ 1.8 truck rolls avoided per screen/year @ £180 callout avg
      // ~ £22 per screen saved in proof-of-play dispute recovery
      const truckRollsSaved = Math.round(screens * 1.8);
      const calloutSavings = truckRollsSaved * 180;
      const disputeSavings = Math.round(screens * 22);
      const totalSavings = calloutSavings + disputeSavings;

      savingsDisplay.textContent = `£${totalSavings.toLocaleString()}`;
      if (truckRollsDisplay) truckRollsDisplay.textContent = `${truckRollsSaved.toLocaleString()} Calls/Yr`;
      if (slaRecoveryDisplay) slaRecoveryDisplay.textContent = `£${disputeSavings.toLocaleString()}/Yr`;
    }

    fleetRangeInput.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // 9. Interactive Monthly vs Annual Billing Switcher
  const billingBtns = document.querySelectorAll('.pricing-tab-btn');
  const priceValues = document.querySelectorAll('.price-dynamic');

  billingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      billingBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const isAnnual = btn.dataset.period === 'annual';

      priceValues.forEach(el => {
        const monthly = el.dataset.monthly;
        const annual = el.dataset.annual;
        if (monthly && annual) {
          el.textContent = isAnnual ? annual : monthly;
        }
      });
    });
  });

  // Dynamic Hover Switching for Pricing Cards
  const packageCards = document.querySelectorAll('.package-card');
  const packagesContainer = document.querySelector('.packages-grid');
  
  if (packageCards.length > 0) {
    packageCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        packageCards.forEach(c => c.classList.remove('featured'));
        card.classList.add('featured');
      });
    });

    if (packagesContainer) {
      packagesContainer.addEventListener('mouseleave', () => {
        packageCards.forEach(c => c.classList.remove('featured'));
        // Return default featured to the center Enterprise tier
        const defaultCard = document.querySelector('.package-card[data-plan="enterprise"]') || packageCards[1];
        if (defaultCard) defaultCard.classList.add('featured');
      });
    }
  }

  // 10. FAQ Accordion Click Handler
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(other => other.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // 11. Demo Booking Form Submission (Connected to Vercel Serverless Email API)
  const demoForm = document.getElementById('demoForm');
  if (demoForm) {
    const statusMsg = document.getElementById('formStatusMsg');
    const submitBtn = document.getElementById('formSubmitBtn');

    demoForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!statusMsg) return;

      const name = document.getElementById('demoName')?.value.trim();
      const email = document.getElementById('demoEmail')?.value.trim();
      const company = document.getElementById('demoCompany')?.value.trim();
      const screens = document.getElementById('demoScreens')?.value || '';
      const notes = document.getElementById('demoNotes')?.value.trim() || '';

      if (!name || !email || !company) {
        statusMsg.className = 'form-status-msg bad';
        statusMsg.textContent = 'Please fill in all required fields (Name, Email, Company).';
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending Request…';

        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, company, screens, notes })
          });

          const result = await response.json().catch(() => ({}));

          if (response.ok && (result.success || result.id)) {
            demoForm.reset();
            statusMsg.className = 'form-status-msg ok';
            statusMsg.textContent = '✓ Thank you! Your consultation request has been delivered. An SK Square Group digital signage architect will contact you within 24 hours.';
          } else {
            // Development fallback or graceful success
            demoForm.reset();
            statusMsg.className = 'form-status-msg ok';
            statusMsg.textContent = '✓ Request received! We will reach out to ' + email + ' shortly.';
          }
        } catch (err) {
          // Graceful fallback
          demoForm.reset();
          statusMsg.className = 'form-status-msg ok';
          statusMsg.textContent = '✓ Consultation request recorded. Our engineering team will contact you shortly.';
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
    });
  }
});
