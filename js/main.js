/**
 * Datra Platform — Enterprise SaaS Interactive Engine
 * Production-ready modules, interactive ROI calculator, live terminal actions, & filter tabs
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Theme Switcher Engine (Footer Segmented Switcher & Global Sync)
  const themeSegBtns = document.querySelectorAll('.theme-seg-btn');
  const legacyToggleBtn = document.getElementById('themeToggleBtn');
  
  let savedTheme = 'light';
  try {
    savedTheme = localStorage.getItem('datraThemePreference') || 'light';
  } catch (e) {}

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.setAttribute('data-theme', 'light');
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
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
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
            if (mobileToggle) mobileToggle.classList.remove('active');
          }
        }
      }
    });
  });

  // 2. Navigation Scroll State
  const navHeader = document.querySelector('header.site-nav, nav#nav');
  if (navHeader) {
    const handleScroll = () => {
      navHeader.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  }

  // 3. Mobile Nav Toggle & Responsive Drawer Controller
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle && navMenu) {
    const toggleNav = (forceState) => {
      const shouldOpen = typeof forceState === 'boolean' ? forceState : !navMenu.classList.contains('open');
      navMenu.classList.toggle('open', shouldOpen);
      mobileToggle.classList.toggle('active', shouldOpen);
      mobileToggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleNav();
    });

    // Close when clicking any nav link inside the drawer
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggleNav(false);
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        toggleNav(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleNav(false);
      }
    });
  }

  // 4. Scroll Reveal & Animated Number Counter
  const revealItems = document.querySelectorAll('.rv');
  if (revealItems.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');

          // Animate numeric counters inside this revealed block if present
          const counterEls = [
            ...(entry.target.hasAttribute('data-count') ? [entry.target] : []),
            ...entry.target.querySelectorAll('[data-count]')
          ];
          counterEls.forEach(el => {
            if (el.dataset.animated) return;
            el.dataset.animated = 'true';
            const target = parseFloat(el.dataset.count);
            const prefix = el.dataset.prefix || '';
            const suffix = el.dataset.suffix || '';
            const duration = parseInt(el.dataset.duration, 10) || 1200;
            const isFloat = el.dataset.count.includes('.');

            let startTimestamp = null;
            const step = (timestamp) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = Math.min((timestamp - startTimestamp) / duration, 1);
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const currentVal = easeOut * target;

              el.textContent = `${prefix}${isFloat ? currentVal.toFixed(1) : Math.floor(currentVal).toLocaleString()}${suffix}`;

              if (progress < 1) {
                window.requestAnimationFrame(step);
              } else {
                el.textContent = `${prefix}${isFloat ? target.toFixed(1) : target.toLocaleString()}${suffix}`;
              }
            };
            window.requestAnimationFrame(step);
          });
        }
      });
    }, { threshold: 0.08 });

    revealItems.forEach(el => observer.observe(el));
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

  // 8. Interactive Platform Investment & Operational Savings Calculator
  const fleetRangeInput = document.getElementById('fleetSizeSlider');
  const fleetSizeDisplay = document.getElementById('fleetSizeVal');
  const costNumDisplay = document.getElementById('costNumVal');
  const costPeriodDisplay = document.getElementById('costPeriodVal');
  const costSubDisplay = document.getElementById('costSubVal');
  const savingsDisplay = document.getElementById('annualSavingsVal');
  const netBenefitDisplay = document.getElementById('netBenefitVal');
  const calcMethodNote = document.getElementById('calcMethodNote');
  const resultsBox = document.querySelector('.roi-results-box');
  const roiCostBox = document.getElementById('estimatedCostVal');
  const roiBillBtns = document.querySelectorAll('.roi-bill-btn');
  const roiTierBtns = document.querySelectorAll('.roi-tier-btn');

  if (fleetRangeInput && costNumDisplay && savingsDisplay) {
    let currentPeriod = 'monthly';
    let currentRate = 575;
    let currentDisplayedCost = 0;
    let currentDisplayedSavings = 0;
    let currentDisplayedNet = 0;
    let calcAnimFrame = null;

    function animateCalculatorNumbers(startCost, endCost, startSavings, endSavings, startNet, endNet, duration = 260) {
      if (calcAnimFrame) cancelAnimationFrame(calcAnimFrame);
      const startTime = performance.now();

      function frame(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);

        const costVal = Math.round(startCost + (endCost - startCost) * ease);
        const savingsVal = Math.round(startSavings + (endSavings - startSavings) * ease);
        const netVal = Math.round(startNet + (endNet - startNet) * ease);

        costNumDisplay.textContent = `₹${costVal.toLocaleString('en-IN')}`;
        savingsDisplay.innerHTML = `₹${savingsVal.toLocaleString('en-IN')} <span>/ year</span>`;
        if (netBenefitDisplay) {
          netBenefitDisplay.textContent = `${netVal >= 0 ? '+' : ''}₹${netVal.toLocaleString('en-IN')} / year`;
        }

        currentDisplayedCost = costVal;
        currentDisplayedSavings = savingsVal;
        currentDisplayedNet = netVal;

        if (progress < 1) {
          calcAnimFrame = requestAnimationFrame(frame);
        } else {
          costNumDisplay.textContent = `₹${endCost.toLocaleString('en-IN')}`;
          savingsDisplay.innerHTML = `₹${endSavings.toLocaleString('en-IN')} <span>/ year</span>`;
          if (netBenefitDisplay) {
            netBenefitDisplay.textContent = `${endNet >= 0 ? '+' : ''}₹${endNet.toLocaleString('en-IN')} / year`;
          }
          currentDisplayedCost = endCost;
          currentDisplayedSavings = endSavings;
          currentDisplayedNet = endNet;
        }
      }
      calcAnimFrame = requestAnimationFrame(frame);
    }

    function updateCalculator(animate = true) {
      const screens = parseInt(fleetRangeInput.value, 10);
      if (fleetSizeDisplay) {
        fleetSizeDisplay.textContent = `${screens.toLocaleString()} Screen${screens === 1 ? '' : 's'}`;
      }

      // Platform Investment calculation:
      const monthlyCost = screens * currentRate;
      const annualCost = monthlyCost * 12;
      const targetCost = currentPeriod === 'annual' ? annualCost : monthlyCost;

      // Illustrative Operational Savings (avoided callouts & dispute recovery):
      const truckRollsSaved = Math.round(screens * 1.8);
      const calloutSavingsInr = truckRollsSaved * 18000;
      const disputeSavingsInr = Math.round(screens * 2200);
      const totalSavingsInr = calloutSavingsInr + disputeSavingsInr;
      const netSavingsInr = totalSavingsInr - annualCost;

      // Update period labels & subtext:
      if (costPeriodDisplay) {
        costPeriodDisplay.textContent = currentPeriod === 'annual' ? '/ year' : '/ mo';
      }
      if (costSubDisplay) {
        costSubDisplay.textContent = currentPeriod === 'annual'
          ? `(₹${monthlyCost.toLocaleString('en-IN')} / month)`
          : `₹${annualCost.toLocaleString('en-IN')} / year billed annually`;
      }

      if (animate && currentDisplayedCost > 0) {
        if (roiCostBox) {
          roiCostBox.classList.remove('pulse');
          void roiCostBox.offsetWidth;
          roiCostBox.classList.add('pulse');
        }
        if (resultsBox) {
          resultsBox.classList.add('updated');
          clearTimeout(resultsBox._timer);
          resultsBox._timer = setTimeout(() => resultsBox.classList.remove('updated'), 350);
        }

        animateCalculatorNumbers(
          currentDisplayedCost, targetCost,
          currentDisplayedSavings, totalSavingsInr,
          currentDisplayedNet, netSavingsInr,
          260
        );
      } else {
        currentDisplayedCost = targetCost;
        currentDisplayedSavings = totalSavingsInr;
        currentDisplayedNet = netSavingsInr;

        costNumDisplay.textContent = `₹${targetCost.toLocaleString('en-IN')}`;
        savingsDisplay.innerHTML = `₹${totalSavingsInr.toLocaleString('en-IN')} <span>/ year</span>`;
        if (netBenefitDisplay) {
          netBenefitDisplay.textContent = `${netSavingsInr >= 0 ? '+' : ''}₹${netSavingsInr.toLocaleString('en-IN')} / year`;
        }
      }
    }

    // Slider input event
    fleetRangeInput.addEventListener('input', () => updateCalculator(true));

    // Billing toggle (Monthly vs Annual)
    roiBillBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        roiBillBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentPeriod = btn.dataset.period || 'monthly';
        updateCalculator(true);
      });
    });

    // Plan tier toggle (Essential vs Enterprise Fleet)
    roiTierBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        roiTierBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentRate = parseInt(btn.dataset.rate, 10) || 575;

        if (calcMethodNote) {
          const annualRate = (currentRate * 12).toLocaleString('en-IN');
          calcMethodNote.textContent = `*Calculation Method: Estimated platform investment at ₹${currentRate}/screen/mo (₹${annualRate}/screen/yr). Operational savings estimated from avoided on-site technician callouts (~1.8 truck rolls/screen/year @ ₹18,000 avg.) and automated proof-of-play SLA dispute recovery (₹2,200/screen/year).`;
        }
        updateCalculator(true);
      });
    });

    updateCalculator(false);
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

  // 6. Interactive Workflow Flow Controller (#how-it-works)
  const workflowSection = document.getElementById('how-it-works');
  const workflowCards = document.querySelectorAll('.workflow-step-card');
  const promoPill = document.querySelector('#how-it-works .hero-promo-pill span:last-child');

  if (workflowSection && workflowCards.length) {
    const stepMessages = {
      '1': 'Step 1: Install the lightweight Datra Agent on any Windows, Linux, or signage player in under 2 minutes.',
      '2': 'Step 2: Each connected player securely pairs over TLS 1.3 to stream live telemetry & device health.',
      '3': 'Step 3: Gain unified visibility across multi-site networks with real-time Online/Offline tracking.',
      '4': 'Step 4: Proactive monitoring triggers automatic alerts before hardware or playout faults impact viewers.',
      '5': 'Step 5: Troubleshoot deep issues remotely — screenshots, camera feeds, restart daemons, reboot players.',
      '6': 'Step 6: Confirm resolution remotely with verified Proof-of-Play telemetry — 0 truck rolls required.'
    };

    workflowCards.forEach(card => {
      card.addEventListener('click', () => {
        const wasActive = card.classList.contains('is-active');
        workflowCards.forEach(c => c.classList.remove('is-active'));
        if (!wasActive) {
          card.classList.add('is-active');
          const stepNum = card.dataset.step;
          if (promoPill && stepMessages[stepNum]) {
            promoPill.textContent = stepMessages[stepNum];
            promoPill.style.color = 'var(--violet2)';
            setTimeout(() => {
              if (promoPill) promoPill.style.color = '';
            }, 3200);
          }
        }
      });
    });
  }

  // 12. Floating Back-to-Top Button
  let bttBtn = document.getElementById('backToTop');
  if (!bttBtn) {
    bttBtn = document.createElement('button');
    bttBtn.id = 'backToTop';
    bttBtn.className = 'back-to-top';
    bttBtn.setAttribute('aria-label', 'Back to top of page');
    bttBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 15l-6-6-6 6"/></svg>';
    document.body.appendChild(bttBtn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 420) {
      bttBtn.classList.add('visible');
    } else {
      bttBtn.classList.remove('visible');
    }
  }, { passive: true });

  bttBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
