/**
 * BAJARANGEE KUMAR JAISWAL - EHS PORTFOLIO
 * Vanilla JavaScript Interactive Engine with Smooth Executive Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* -------------------------------------------------------------------------
     0. Scroll Progress Bar (Top)
     ------------------------------------------------------------------------- */
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const updateScrollProgress = () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollProgressBar && height > 0) {
      const scrolled = (winScroll / height) * 100;
      scrollProgressBar.style.width = scrolled + '%';
    }
  };
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  /* -------------------------------------------------------------------------
     1. Scroll Reveal Animations (Intersection Observer)
     ------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: activate immediately
    revealElements.forEach((el) => el.classList.add('active'));
  }

  /* -------------------------------------------------------------------------
     2. Sticky Navbar & Active Link Scroll Spy
     ------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    // Sticky Navbar background
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Spy
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    // Back to top button visibility
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    // Close mobile menu on link click
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });
  }

  /* -------------------------------------------------------------------------
     3. Animated Number Counters
     ------------------------------------------------------------------------- */
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const runCounters = () => {
    counters.forEach((counter) => {
      const target = +counter.getAttribute('data-target');
      const duration = 1400;
      const increment = target / (duration / 25);

      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.innerText = target;
          clearInterval(timer);
        } else {
          counter.innerText = Math.floor(current);
        }
      }, 25);
    });
  };

  const statsSection = document.getElementById('statistics');
  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          runCounters();
          animated = true;
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(statsSection);
  }

  /* -------------------------------------------------------------------------
     4. Core Expertise Filter Tabs
     ------------------------------------------------------------------------- */
  const expFilterBtns = document.querySelectorAll('.exp-filter-btn');
  const expCards = document.querySelectorAll('.expertise-card');

  expFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      expFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      expCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.classList.add('active');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* -------------------------------------------------------------------------
     5. Infrastructure Projects Filter
     ------------------------------------------------------------------------- */
  const projFilterBtns = document.querySelectorAll('.proj-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      projFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.classList.add('active');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* -------------------------------------------------------------------------
     6. Specialized Structure Safety Switcher
     ------------------------------------------------------------------------- */
  const structureData = {
    'rob-flyover': {
      title: 'ROB & Flyover Structural Safety',
      summary: 'Safety governance for elevated structures spanning live electrified railway lines, major national highways, and urban intersections.',
      directives: [
        'Overhead electric clearance verification (minimum 2m safe distance).',
        'Night work lighting standards (minimum 150 lux for structural operations).',
        'Mandatory dual-action safety harness connection for all edge workers.'
      ],
      checklist: [
        'Structure-specific EHS and HIRA plan preparation for multi-span flyover superstructures.',
        'Coordination with Railway Safety Authorities for electrified OHE line power shutdowns.',
        'Pre-pour and pre-erection safety checklists for pier caps, crash barriers, and deck slabs.',
        'Under-deck protection screens to prevent falling tools or debris over active carriageways.'
      ]
    },
    'vup-lvup': {
      title: 'VUP, LVUP & Underpass Safety',
      summary: 'Risk management protocols for sub-surface vehicular, cattle, and pedestrian underpass structures built through active alignments.',
      directives: [
        'Safe heavy plant entry ramps with non-skid aggregates.',
        'Daily toxic gas monitoring for boxed subterranean sections prior to workforce entry.',
        'Positive ventilation units installed when welding inside confined culvert sections.'
      ],
      checklist: [
        'Deep approach excavation protection and batter slope stabilization.',
        'Trench shoring and dewatering controls during monsoon high water table conditions.',
        'Barricading and high-intensity LED illuminated night warning markers on public approach tracks.',
        'Confined space atmospheric testing and emergency standby rescue teams.'
      ]
    },
    'bridge-girder': {
      title: 'Major Bridge & Box Girder Erection',
      summary: 'Engineering safety controls for river bridges, multi-stage prestressed box girders, and segment launching systems.',
      directives: [
        'High-wind anemometer threshold: structural lifting halts at wind speeds > 25 knots.',
        'Dual crane tandem lifting requires third-party certified tandem lift calculation sheet.',
        'Continuous life-buoy and safety boat standby for all work over flowing river channels.'
      ],
      checklist: [
        'Launching truss and gantry girder structural stability inspection before each shift.',
        'Exclusion zone marking under all girder transport routes and launching bays.',
        'Hydraulic jacking equipment load certification and pressure line safety checks.',
        'Secondary safety tie-offs for workers on open box segment cantilever decks.'
      ]
    },
    'pile-foundation': {
      title: 'Pile Foundation & Deep Excavation Safety',
      summary: 'Preventive safety controls for rotary hydraulic rig operations, bentonite slurry management, and deep pile cap excavations.',
      directives: [
        'Bentonite handling PPE: chemical goggles, nitrile gloves, and breathing masks.',
        'Pile cage lowering: 100% rigid spreader beam and tested guide ropes only.',
        'Borehole cover protocol: all open drilled holes covered with steel plates instantly.'
      ],
      checklist: [
        'Hydraulic rotary piling rig ground bearing pressure testing and outrigger mats verification.',
        'Borehole temporary steel casing driving and edge fall barrier establishment.',
        'Deep pile cap excavation benching, slope angle adherence (minimum 1:1), and ladder access.',
        'Tremie concrete pouring line pressure safety chains and hopper tie-downs.'
      ]
    },
    'scaffolding-formwork': {
      title: 'Formwork, Staging & Cup-Lock Scaffolding Safety',
      summary: 'Rigorous structural stability controls for heavy falsework, bridge pier staging, and suspended formwork systems.',
      directives: [
        'Red tag = strict no access under construction; Green tag = fully inspected & safe.',
        'Base plate protocol: 100% steel sole plates on compacted ground with zero settlement.',
        'Top working platform: 3-part guardrail system (1m top rail, 0.5m mid rail, 150mm toe board).'
      ],
      checklist: [
        'Structural engineer design approval and load calculation check for heavy staging.',
        'Cup-lock scaffolding component inspection: discarding bent ledgers, deformed cups, and rusted pins.',
        'Daily scaffold tagging system (Scafftag) managed exclusively by certified inspectors.',
        'Pre-pour structural load check and safety handover sign-off with the civil manager.'
      ]
    },
    'lifting-girder': {
      title: 'Heavy Crane, Hydra & Girder Launching Safety',
      summary: 'Rigid crane engineering safety, lifting tackle certification, and tandem launching controls on active alignments.',
      directives: [
        'Outrigger rule: 100% full extension with certified heavy hardwood/steel load spreader pads.',
        'Anti-Two-Block (A2B) switch and Safe Load Indicator (SLI) calibrated and functional.',
        'Rigging rule: taglines mandatory on every suspended load regardless of weight or size.'
      ],
      checklist: [
        'Third-party statutory examination (Form 11/Certificate) for all cranes, hydras, and lifting gear.',
        'Detailed Engineered Lifting Plan with swing radius, ground load, and boom clearance math.',
        'Competent rigger, certified crane operator, and designated single banksman communication.',
        'Strict 360-degree perimeter barricading with zero unauthorized human presence under loads.'
      ]
    },
    'height-safety': {
      title: 'Working at Height & Fall Prevention',
      summary: 'Zero-tolerance fall management protocols on elevated bridge piers, abutments, flyover decks, and retaining structures.',
      directives: [
        'Anchor point requirement: minimum 22.2 kN (5,000 lbs) certified structural anchor.',
        'Full body harness: EN 361 certified with energy-absorbing twin lanyards.',
        'Edge protection rule: mandatory within 2 meters of any open structural drop > 1.8 meters.'
      ],
      checklist: [
        'Static life-line wire ropes (8mm galvanized steel) installed across all pier caps and girder decks.',
        'Fall arrestor inertia reels installed on vertical access tower ladders.',
        'Secondary safety nets installed underneath major bridge span formwork.',
        'Daily pre-use physical inspection of full-body harnesses, snap hooks, and karabiners.'
      ]
    },
    'traffic-management': {
      title: 'High-Speed Traffic Diversion & Highway Safety',
      summary: 'Work zone road safety engineering across active National Highways and expressway expansions (IRC:SP:55 guidelines).',
      directives: [
        'Night work visibility: retroreflective signage (Class 3/Type XI microprismatic sheeting).',
        'Warning zone distance: minimum 1.0 km advance warning for 100 km/h expressway sectors.',
        'Crash attenuators: water/sand-filled energy absorbing crash barriers at critical diversion tapers.'
      ],
      checklist: [
        'Comprehensive Traffic Management Plan (TMP) approved by NHAI / Independent Engineer.',
        'Standard multi-stage traffic tapers: Advance warning zone, transition zone, and buffer zone.',
        'Deployment of solar blinkers, illuminated arrow boards, and high-visibility cone arrays.',
        'Trained traffic marshals in Class 3 reflective vests equipped with red/green flags and batons.'
      ]
    }
  };

  const structButtons = document.querySelectorAll('.struct-btn, .struct-tab');
  const structDetailTitle = document.getElementById('structDetailTitle');
  const structDetailSummary = document.getElementById('structDetailSummary');
  const structDirectives = document.getElementById('structDirectives');
  const structChecklist = document.getElementById('structChecklist');
  const structContent = document.getElementById('structContent');

  structButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      structButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const id = btn.getAttribute('data-id') || btn.getAttribute('data-structure');
      const data = structureData[id];

      if (!data) return;

      // Update via individual elements if present
      if (structDetailTitle) structDetailTitle.innerText = data.title;
      if (structDetailSummary) structDetailSummary.innerText = data.summary;

      if (structDirectives) {
        structDirectives.innerHTML = data.directives
          .map((d) => `<div class="directive-item">${d}</div>`)
          .join('');
      }

      if (structChecklist) {
        structChecklist.innerHTML = data.checklist
          .map(
            (c) => `
            <li>
              <i data-lucide="check-circle" style="color:#168C8C;width:18px;height:18px;"></i>
              <span>${c}</span>
            </li>
          `
          )
          .join('');
      }

      // Or update via container element if present
      if (structContent) {
        structContent.innerHTML = `
          <div class="struct-content-inner" style="animation: fadeIn 0.4s ease-out;">
            <div class="struct-detail-header">
              <span class="struct-badge">SPECIALIZED EHS PROTOCOL</span>
              <h3 class="struct-detail-title">${data.title}</h3>
              <p class="struct-detail-summary">${data.summary}</p>
            </div>
            <div class="struct-detail-grid">
              <div>
                <h4 class="struct-section-title">
                  <i data-lucide="check-square" style="color:#168C8C;width:18px;height:18px;"></i>
                  Mandatory EHS Responsibilities
                </h4>
                <ul class="struct-checklist">
                  ${data.checklist.map((item) => `
                    <li>
                      <i data-lucide="shield-check" style="color:#168C8C;width:16px;height:16px;flex-shrink:0;"></i>
                      <span>${item}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
              <div>
                <h4 class="struct-section-title">
                  <i data-lucide="alert-triangle" style="color:#F28C28;width:18px;height:18px;"></i>
                  Critical Site Risk Directives
                </h4>
                <ul class="struct-directives">
                  ${data.directives.map((dir) => `
                    <li>
                      <i data-lucide="alert-circle" style="color:#F28C28;width:16px;height:16px;flex-shrink:0;"></i>
                      <span>${dir}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          </div>
        `;
      }

      if (window.lucide) window.lucide.createIcons();
    });
  });

  /* -------------------------------------------------------------------------
     7. Contact Form Mailto Handler & Validation
     ------------------------------------------------------------------------- */
  const contactForm = document.getElementById('portfolioContactForm') || document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName') || document.getElementById('senderName');
      const email = document.getElementById('contactEmail') || document.getElementById('senderEmail');
      const subject = document.getElementById('contactSubject') || document.getElementById('senderSubject');
      const message = document.getElementById('contactMessage') || document.getElementById('senderMessage');

      let isValid = true;

      // Validate Name
      if (!name || !name.value.trim() || name.value.trim().length < 2) {
        if (name) showError(name, 'Please enter your full name');
        isValid = false;
      } else {
        clearError(name);
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !email.value.trim() || !emailRegex.test(email.value.trim())) {
        if (email) showError(email, 'Please enter a valid email address');
        isValid = false;
      } else {
        clearError(email);
      }

      // Validate Subject
      if (!subject || !subject.value.trim()) {
        if (subject) showError(subject, 'Please enter a subject');
        isValid = false;
      } else {
        clearError(subject);
      }

      // Validate Message
      if (!message || !message.value.trim() || message.value.trim().length < 10) {
        if (message) showError(message, 'Please provide a message of at least 10 characters');
        isValid = false;
      } else {
        clearError(message);
      }

      if (!isValid) return;

      // Construct verified mailto link
      const mailtoUrl = `mailto:bkjaiswal3399@gmail.com?subject=${encodeURIComponent(
        `[EHS Inquiry] ${subject.value.trim()} - from ${name.value.trim()}`
      )}&body=${encodeURIComponent(
        `Sender: ${name.value.trim()}\nEmail: ${email.value.trim()}\n\nMessage:\n${message.value.trim()}`
      )}`;

      // Open email client
      window.location.href = mailtoUrl;

      // Display realistic status
      if (formStatus) {
        formStatus.style.display = 'flex';
        formStatus.className = 'form-status success';
        formStatus.innerHTML = `
          <i data-lucide="check-circle" style="color:#059669;width:20px;height:20px;"></i>
          <div>
            <strong>Opening your default email client...</strong><br>
            If your email application does not launch, send your message directly to <strong>bkjaiswal3399@gmail.com</strong> or reach out via WhatsApp (+91-7310181309).
          </div>
        `;
        if (window.lucide) window.lucide.createIcons();
      }
    });
  }

  function showError(input, msg) {
    input.classList.add('error');
    const parent = input.parentElement;
    let errEl = parent.querySelector('.error-msg');
    if (!errEl) {
      errEl = document.createElement('div');
      errEl.className = 'error-msg';
      errEl.style.color = '#EF4444';
      errEl.style.fontSize = '0.75rem';
      errEl.style.marginTop = '4px';
      parent.appendChild(errEl);
    }
    errEl.innerText = msg;
  }

  function clearError(input) {
    input.classList.remove('error');
    const parent = input.parentElement;
    const errEl = parent.querySelector('.error-msg');
    if (errEl) {
      errEl.remove();
    }
  }

  /* -------------------------------------------------------------------------
     8. Back to Top Smooth Scroll
     ------------------------------------------------------------------------- */
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* -------------------------------------------------------------------------
     9. On-Site EHS Gallery Filtering & Lightbox Modal
     ------------------------------------------------------------------------- */
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const galleryModal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('modalImg');
  const modalCategory = document.getElementById('modalCategory');
  const modalLocation = document.getElementById('modalLocation');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  // Filter Buttons
  galleryFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.classList.add('active');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Open Modal on Card Click
  galleryCards.forEach((card) => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-img');
      const title = card.getAttribute('data-title');
      const cat = card.getAttribute('data-cat-label');
      const loc = card.getAttribute('data-location');
      const desc = card.getAttribute('data-caption');

      if (modalImg) modalImg.src = src;
      if (modalTitle) modalTitle.innerText = title;
      if (modalCategory) modalCategory.innerText = cat;
      if (modalLocation) modalLocation.innerHTML = `<i data-lucide="map-pin" style="width:14px;height:14px;"></i> ${loc}`;
      if (modalDesc) modalDesc.innerText = desc;

      if (galleryModal) {
        galleryModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }

      if (window.lucide) window.lucide.createIcons();
    });
  });

  // Close Modal
  const closeModal = () => {
    if (galleryModal) {
      galleryModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (galleryModal) {
    galleryModal.addEventListener('click', (e) => {
      if (e.target === galleryModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && galleryModal && galleryModal.classList.contains('open')) {
      closeModal();
    }
  });
});
