/* =========================================================
   M I K Developers — script.js
   All interactive logic for the premium portfolio
========================================================= */

/* ---------------------------------------------------------
   1. MOBILE NAV TOGGLE
--------------------------------------------------------- */
const navToggle = document.getElementById('navToggle');
const navbar    = document.querySelector('.navbar');

if (navToggle && navbar) {
    const applyMobileNavState = () => {
        const isMobile = window.innerWidth <= 768;
        const navLinks = navbar.querySelector('.nav-links');
        const desktopNavCta = navbar.querySelector('.nav-cta-desktop');
        const isOpen = navbar.classList.contains('open');

        if (!isMobile) {
            navbar.style.display = '';
            navbar.style.flexDirection = '';
            navbar.style.alignItems = '';
            if (navLinks) {
                navLinks.style.display = '';
                navLinks.style.flexDirection = '';
                navLinks.style.width = '';
                navLinks.style.maxHeight = '';
                navLinks.style.overflowY = '';
                navLinks.style.order = '';
            }
            if (desktopNavCta) {
                desktopNavCta.style.display = '';
                desktopNavCta.style.position = '';
                desktopNavCta.style.width = '';
                desktopNavCta.style.order = '';
            }
            return;
        }

        navbar.style.display = 'flex';
        navbar.style.flexDirection = isOpen ? 'column' : 'row';
        navbar.style.alignItems = isOpen ? 'stretch' : '';

        if (navLinks) {
            navLinks.style.display = isOpen ? 'flex' : 'none';
            navLinks.style.flexDirection = isOpen ? 'column' : '';
            navLinks.style.width = isOpen ? '100%' : '';
            navLinks.style.maxHeight = isOpen ? 'min(72vh, 480px)' : '';
            navLinks.style.overflowY = isOpen ? 'auto' : '';
            navLinks.style.order = isOpen ? '1' : '';
        }

        if (desktopNavCta) {
            desktopNavCta.style.display = isOpen ? 'none' : 'none';
            desktopNavCta.style.position = isOpen ? 'static' : '';
            desktopNavCta.style.width = isOpen ? '100%' : '';
            desktopNavCta.style.order = isOpen ? '2' : '';
        }
    };

    navToggle.addEventListener('click', () => {
        navbar.classList.toggle('open');
        applyMobileNavState();
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('open');
            applyMobileNavState();
        });
    });

    const navHireBtn = navbar.querySelector('a.btn');
    if (navHireBtn) {
        navHireBtn.addEventListener('click', () => {
            navbar.classList.remove('open');
            applyMobileNavState();
        });
    }

    window.addEventListener('resize', applyMobileNavState);
    applyMobileNavState();
}

/* ---------------------------------------------------------
   2. FOOTER YEAR
--------------------------------------------------------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------------------------------------------------------
   3. PRELOADER
--------------------------------------------------------- */
const preloader = document.getElementById('preloader');
window.addEventListener('load', () => {
    if (preloader) setTimeout(() => preloader.classList.add('hidden'), 300);
});
setTimeout(() => { if (preloader) preloader.classList.add('hidden'); }, 3500);

/* ---------------------------------------------------------
   4. SCROLL: PROGRESS BAR + NAVBAR + BACK TO TOP
--------------------------------------------------------- */
const scrollProgress = document.getElementById('scrollProgress');
const backToTop      = document.getElementById('backToTop');

function handleScroll() {
    const scrollTop  = window.scrollY || document.documentElement.scrollTop;
    const docHeight  = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = progress + '%';
    if (navbar)         navbar.classList.toggle('scrolled', scrollTop > 40);
    if (backToTop)      backToTop.classList.toggle('show', scrollTop > 400);
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------------------------------------------------------
   5. SMOOTH SCROLL FOR ANCHOR LINKS
--------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId.length > 1) {
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

/* ---------------------------------------------------------
   6. HERO TYPING ANIMATION
--------------------------------------------------------- */
const typedRoleEl = document.getElementById('typedRole');
const rolesToType = [
    'Frontend & WordPress Developer',
    'Responsive Website Builder',
    'SEO-Friendly Web Developer',
    'UI/UX Focused Developer'
];

if (typedRoleEl) {
    let roleIndex = 0, charIndex = 0, isDeleting = false;
    function typeLoop() {
        const current = rolesToType[roleIndex];
        if (!isDeleting) {
            charIndex++;
            typedRoleEl.textContent = current.slice(0, charIndex);
            if (charIndex === current.length) { isDeleting = true; setTimeout(typeLoop, 1600); return; }
        } else {
            charIndex--;
            typedRoleEl.textContent = current.slice(0, charIndex);
            if (charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % rolesToType.length; }
        }
        setTimeout(typeLoop, isDeleting ? 35 : 70);
    }
    typeLoop();
}

/* ---------------------------------------------------------
   7. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
--------------------------------------------------------- */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal-section, .reveal-up, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
});

/* Stagger children inside sections */
document.querySelectorAll('.reveal-up').forEach((el, i) => {
    el.style.transitionDelay = (i % 6) * 0.08 + 's';
});

/* ---------------------------------------------------------
   8. EXPERIENCE COUNTERS
--------------------------------------------------------- */
function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-target'), 10) || 0;
    const duration = 1800;
    const start    = performance.now();
    function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
    }
    requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

/* ---------------------------------------------------------
   9. SKILLS — TABS / FILTER
--------------------------------------------------------- */
const skillsTabs  = document.querySelectorAll('.skills-tab');
const skillCards  = document.querySelectorAll('.skill-card');

skillsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        skillsTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.getAttribute('data-tab');
        skillCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden-card');
            } else {
                card.classList.add('hidden-card');
            }
        });
        // Re-run skill bar animations for visible cards
        setTimeout(animateVisibleSkillBars, 50);
    });
});

/* ---------------------------------------------------------
   10. SKILLS — ANIMATED PROGRESS BARS + CIRCULAR INDICATORS
--------------------------------------------------------- */
// SVG gradient definition (injected once)
const svgDefs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svgDefs.setAttribute('style', 'position:absolute;width:0;height:0');
svgDefs.innerHTML = `<defs>
  <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%"   stop-color="#3B82F6"/>
    <stop offset="100%" stop-color="#93C5FD"/>
  </linearGradient>
</defs>`;
document.body.prepend(svgDefs);

function animateVisibleSkillBars() {
    document.querySelectorAll('.skill-card:not(.hidden-card) .skill-bar-fill').forEach(bar => {
        const percent = bar.getAttribute('data-percent') || 0;
        bar.style.width = percent + '%';
    });
    // Circular progress
    document.querySelectorAll('.skill-card:not(.hidden-card) .circle-fill').forEach(circle => {
        const percent    = parseFloat(circle.getAttribute('data-percent')) || 0;
        const radius     = 42;
        const circumference = 2 * Math.PI * radius; // ~264
        const offset     = circumference - (percent / 100) * circumference;
        circle.style.strokeDasharray  = circumference;
        circle.style.strokeDashoffset = circumference; // start hidden
        circle.style.stroke           = 'url(#blueGrad)';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                circle.style.transition   = 'stroke-dashoffset 1.5s cubic-bezier(.16,1,.3,1)';
                circle.style.strokeDashoffset = offset;
            });
        });
    });
}

// Observe skills section to trigger once visible
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateVisibleSkillBars();
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    skillObserver.observe(skillsSection);
}

/* ---------------------------------------------------------
   11. PORTFOLIO FILTER
--------------------------------------------------------- */
const filterBtns  = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const cat = card.getAttribute('data-category');
            if (filter === 'all' || cat === filter) {
                card.classList.remove('hidden-card');
                card.classList.add('filter-in');
                card.addEventListener('animationend', () => card.classList.remove('filter-in'), { once: true });
            } else {
                card.classList.add('filter-out');
                card.addEventListener('animationend', () => {
                    card.classList.add('hidden-card');
                    card.classList.remove('filter-out');
                }, { once: true });
            }
        });
    });
});

/* ---------------------------------------------------------
   12. PORTFOLIO MODAL
--------------------------------------------------------- */
const projectData = [
    {
        icon:   '🌾',
        title:  'Khan Traders & Al Shahbaaz Zarai Allaat',
        desc:   'A modern and responsive website built for a Pakistan-based agricultural machinery dealer, showcasing their products, gallery and contact details. Built with semantic HTML, CSS3 and vanilla JavaScript for maximum performance and SEO.',
        tags:   ['Responsive', 'Modern Design', 'Fast & Optimized', 'SEO'],
        live:   '#'
    },
    {
        icon:   '💼',
        title:  'Business Portfolio Website',
        desc:   'A sleek and professional portfolio website design for a business consultant. Features glassmorphism UI, smooth animations, dark theme, and mobile-first responsive layout. Designed in Figma and built with HTML/CSS/JS.',
        tags:   ['UI/UX', 'Figma', 'Glassmorphism', 'Dark Theme'],
        live:   '#'
    },
    {
        icon:   '🛒',
        title:  'E-Commerce Store',
        desc:   'A fully functional WooCommerce-powered online store with custom product pages, cart, checkout, and payment integration. Optimized for speed and SEO with mobile-first responsive design and custom WordPress theme.',
        tags:   ['WordPress', 'WooCommerce', 'E-Commerce', 'SEO'],
        live:   '#'
    },
    {
        icon:   '🎨',
        title:  'Brand Identity Design',
        desc:   'Complete brand identity package including logo design, color palette, typography system, business card design, social media kit and brand guidelines document. Designed in Figma with a modern minimalist aesthetic.',
        tags:   ['Branding', 'Logo', 'Figma', 'Identity'],
        live:   '#'
    }
];

const modal       = document.getElementById('projectModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose  = document.getElementById('modalClose');
const modalIcon   = document.getElementById('modalIcon');
const modalTitle  = document.getElementById('modalTitle');
const modalDesc   = document.getElementById('modalDesc');
const modalTags   = document.getElementById('modalTags');
const modalLive   = document.getElementById('modalLive');

function openModal(index) {
    const data = projectData[index];
    if (!data || !modal) return;
    modalIcon.textContent  = data.icon;
    modalTitle.textContent = data.title;
    modalDesc.textContent  = data.desc;
    modalTags.innerHTML    = data.tags.map(t => `<span>${t}</span>`).join('');
    modalLive.href   = data.live;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal(parseInt(btn.getAttribute('data-index'), 10)));
});

if (modalClose)   modalClose.addEventListener('click', closeModal);
if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ---------------------------------------------------------
   13. TESTIMONIALS AUTO-SLIDING CAROUSEL
--------------------------------------------------------- */
const carousel    = document.getElementById('testimonialsCarousel');
const dotsWrap    = document.getElementById('carouselDots');
const prevBtn     = document.getElementById('carouselPrev');
const nextBtn     = document.getElementById('carouselNext');

if (carousel && dotsWrap) {
    const cards        = carousel.querySelectorAll('.testimonial-card');
    const totalCards   = cards.length;
    let currentIndex   = 0;
    let autoSlideTimer = null;

    // Determine how many cards are visible based on viewport
    function visibleCount() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 900) return 2;
        return 3;
    }

    function totalSlides() {
        return Math.max(0, totalCards - visibleCount() + 1);
    }

    // Build dots
    function buildDots() {
        dotsWrap.innerHTML = '';
        const slides = totalSlides();
        for (let i = 0; i < slides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(dot);
        }
    }

    function updateDots() {
        dotsWrap.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function goTo(index) {
        const slides = totalSlides();
        currentIndex = Math.max(0, Math.min(index, slides - 1));

        // Calculate card width including gap
        const cardEl  = cards[0];
        const gap     = 26;
        const cardWidth = cardEl.offsetWidth + gap;
        carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        updateDots();
    }

    function goNext() { goTo(currentIndex + 1 < totalSlides() ? currentIndex + 1 : 0); }
    function goPrev() { goTo(currentIndex > 0 ? currentIndex - 1 : totalSlides() - 1); }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideTimer = setInterval(goNext, 4500);
    }
    function stopAutoSlide() {
        if (autoSlideTimer) clearInterval(autoSlideTimer);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { goPrev(); stopAutoSlide(); startAutoSlide(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goNext(); stopAutoSlide(); startAutoSlide(); });

    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    // Touch swipe support
    let touchStartX = 0;
    carousel.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
    });

    // Init
    buildDots();
    startAutoSlide();

    // Rebuild on resize
    window.addEventListener('resize', () => {
        buildDots();
        goTo(0);
    });
}

/* ---------------------------------------------------------
   14. CONTACT FORM VALIDATION
--------------------------------------------------------- */
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');
const formErrorMsg = document.getElementById('formErrorMsg');
const formSubmit   = document.getElementById('formSubmit');

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setFieldError(inputEl, errorEl, message) {
    inputEl.closest('.form-group').classList.add('error');
    errorEl.textContent = message;
}

function clearFieldError(inputEl, errorEl) {
    inputEl.closest('.form-group').classList.remove('error');
    errorEl.textContent = '';
}

// Real-time field clearing
if (contactForm) {
    ['contactName', 'contactEmail', 'contactSubject', 'contactMessage'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => {
                el.closest('.form-group').classList.remove('error');
                const errId = id.replace('contact', '').toLowerCase();
                const errEl = document.getElementById(errId + 'Error') ||
                              document.getElementById(id.replace('contact','').charAt(0).toLowerCase() + id.replace('contact','').slice(1) + 'Error');
                if (errEl) errEl.textContent = '';
            });
        }
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let valid = true;

        const nameEl    = document.getElementById('contactName');
        const emailEl   = document.getElementById('contactEmail');
        const subjectEl = document.getElementById('contactSubject');
        const messageEl = document.getElementById('contactMessage');
        const nameErr   = document.getElementById('nameError');
        const emailErr  = document.getElementById('emailError');
        const subjectErr = document.getElementById('subjectError');
        const messageErr = document.getElementById('messageError');

        // Clear previous
        [nameEl, emailEl, subjectEl, messageEl].forEach((el, i) => {
            const errEl = [nameErr, emailErr, subjectErr, messageErr][i];
            clearFieldError(el, errEl);
        });
        if (formSuccess)  { formSuccess.classList.remove('show'); }
        if (formErrorMsg) { formErrorMsg.classList.remove('show'); }

        // Validate
        if (!nameEl.value.trim()) {
            setFieldError(nameEl, nameErr, 'Please enter your name.');
            valid = false;
        }
        if (!emailEl.value.trim()) {
            setFieldError(emailEl, emailErr, 'Please enter your email.');
            valid = false;
        } else if (!validateEmail(emailEl.value.trim())) {
            setFieldError(emailEl, emailErr, 'Please enter a valid email address.');
            valid = false;
        }
        if (!subjectEl.value.trim()) {
            setFieldError(subjectEl, subjectErr, 'Please enter a subject.');
            valid = false;
        }
        if (!messageEl.value.trim()) {
            setFieldError(messageEl, messageErr, 'Please enter your message.');
            valid = false;
        } else if (messageEl.value.trim().length < 10) {
            setFieldError(messageEl, messageErr, 'Message must be at least 10 characters.');
            valid = false;
        }

        if (!valid) return;

        // Simulate submission (replace with actual fetch/emailjs integration)
        if (formSubmit) {
            formSubmit.disabled = true;
            formSubmit.querySelector('span').textContent = 'Sending...';
        }

        setTimeout(() => {
            if (formSubmit) {
                formSubmit.disabled = false;
                formSubmit.querySelector('span').textContent = 'Send Message';
            }
            // Show success (in production: only show after actual API success)
            if (formSuccess) formSuccess.classList.add('show');
            contactForm.reset();
            // Scroll success into view
            formSuccess && formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 1500);
    });
}

/* =========================================================
   15. EXPERIENCE & JOURNEY SECTION
   — Tab filtering, animated timeline line, scroll reveal
========================================================= */

(function initExperience() {

    /* ── Element references ────────────────────────────── */
    const section      = document.getElementById('experience');
    if (!section) return;                          // guard: section must exist

    const tabs         = section.querySelectorAll('.exp-tab');
    const items        = section.querySelectorAll('.exp-item');
    const lineProgress = document.getElementById('expLineProgress');
    const wrap         = section.querySelector('.exp-timeline-wrap');

    /* ── 15-A  Tab switching with staggered fade-in ────── */
    function filterItems(category) {
        let visibleIndex = 0;

        items.forEach(item => {
            const cat = item.getAttribute('data-category');
            const match = (category === 'all' || cat === category);

            if (!match) {
                /* hide immediately */
                item.classList.add('exp-hidden');
                item.classList.remove('exp-filter-in', 'visible');
            } else {
                item.classList.remove('exp-hidden');
                /* remove old animation class so it can retrigger */
                item.classList.remove('exp-filter-in');
                /* force reflow so the animation restarts cleanly */
                void item.offsetWidth;
                /* stagger each visible card by 60 ms */
                item.style.animationDelay = (visibleIndex * 60) + 'ms';
                item.classList.add('exp-filter-in', 'visible');
                visibleIndex++;
            }
        });

        /* re-run the line progress for the new filtered set */
        updateLineProgress();
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            /* update active state */
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            filterItems(tab.getAttribute('data-tab'));
        });
    });

    /* ── 15-B  Animated timeline line ─────────────────── */
    /*
     *  The line fill height is driven by how far the user has
     *  scrolled through the timeline wrapper.
     *  Formula:
     *    0 %  → top of wrapper at bottom of viewport
     *    100% → bottom of wrapper at top of viewport
     */
    function updateLineProgress() {
        if (!lineProgress || !wrap) return;

        const wrapRect   = wrap.getBoundingClientRect();
        const vpHeight   = window.innerHeight;

        /* distance scrolled into the wrap relative to the full wrap height */
        const scrolled   = vpHeight - wrapRect.top;
        const total      = wrapRect.height + vpHeight;
        const pct        = Math.min(Math.max(scrolled / total, 0), 1) * 100;

        lineProgress.style.height = pct + '%';
    }

    window.addEventListener('scroll', updateLineProgress, { passive: true });
    updateLineProgress(); /* run once on load in case section is already visible */

    /* ── 15-C  Scroll reveal for each item ────────────── */
    /*
     *  The global revealObserver in section 7 picks up
     *  .reveal-left / .reveal-right automatically, but we
     *  also set up a dedicated observer here so newly
     *  un-hidden items (after filtering) are re-observed
     *  and revealed correctly.
     */
    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    function observeVisibleItems() {
        items.forEach(item => {
            if (!item.classList.contains('exp-hidden')) {
                itemObserver.observe(item);
            }
        });
    }

    observeVisibleItems();

    /* Re-observe after each filter so newly shown items animate in */
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            /* slight delay so DOM settles after filterItems() runs */
            setTimeout(observeVisibleItems, 80);
        });
    });

    /* ── 15-D  Keyboard accessibility for tab bar ──────── */
    /*
     *  Arrow-key navigation between tabs per ARIA authoring
     *  practices for tab widgets.
     */
    const tabList = section.querySelector('.exp-tabs');
    if (tabList) {
        tabList.addEventListener('keydown', (e) => {
            const allTabs  = [...tabs];
            const focused  = document.activeElement;
            const idx      = allTabs.indexOf(focused);
            if (idx === -1) return;

            let next = -1;
            if (e.key === 'ArrowRight') next = (idx + 1) % allTabs.length;
            if (e.key === 'ArrowLeft')  next = (idx - 1 + allTabs.length) % allTabs.length;
            if (e.key === 'Home')       next = 0;
            if (e.key === 'End')        next = allTabs.length - 1;

            if (next !== -1) {
                e.preventDefault();
                allTabs[next].focus();
                allTabs[next].click();   /* activate the focused tab */
            }
        });
    }

    /* ── 15-E  Dot hover glow — pointer-track effect ───── */
    /*
     *  When the cursor enters a timeline item the centre dot
     *  is already animated via CSS :hover on .exp-item,
     *  but we also briefly boost the line-progress glow.
     */
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (lineProgress) lineProgress.style.boxShadow = '0 0 12px rgba(59,130,246,.55)';
        });
        item.addEventListener('mouseleave', () => {
            if (lineProgress) lineProgress.style.boxShadow = 'none';
        });
    });

})(); /* end initExperience IIFE */
