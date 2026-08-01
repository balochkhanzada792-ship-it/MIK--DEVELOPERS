// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navbar = document.querySelector('.navbar');

if (navToggle && navbar) {
    navToggle.addEventListener('click', () => {
        navbar.classList.toggle('open');
    });

    // Close menu after clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('open');
        });
    });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

/* =========================================================
   STEP 1: UI/UX Foundation
========================================================= */

// Preloader — hide once the page has fully loaded
const preloader = document.getElementById('preloader');
window.addEventListener('load', () => {
    if (preloader) {
        setTimeout(() => preloader.classList.add('hidden'), 300);
    }
});
// Fallback in case 'load' already fired or takes too long
setTimeout(() => {
    if (preloader) preloader.classList.add('hidden');
}, 3000);

// Scroll Progress Bar + Navbar scroll state + Back to Top visibility
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');

function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgress) {
        scrollProgress.style.width = progress + '%';
    }

    if (navbar) {
        navbar.classList.toggle('scrolled', scrollTop > 40);
    }

    if (backToTop) {
        backToTop.classList.toggle('show', scrollTop > 400);
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// Back to Top click
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Smooth scroll for all in-page anchor links (extra safety on top of CSS scroll-behavior)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId.length > 1) {
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

/* =========================================================
   STEP 2: Hero Section — Typing Animation
========================================================= */

const typedRoleEl = document.getElementById('typedRole');
const rolesToType = [
    'Frontend & WordPress Developer',
    'Responsive Website Builder',
    'SEO-Friendly Web Developer',
    'UI/UX Focused Developer'
];

if (typedRoleEl) {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        const currentRole = rolesToType[roleIndex];

        if (!isDeleting) {
            charIndex++;
            typedRoleEl.textContent = currentRole.slice(0, charIndex);

            if (charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(typeLoop, 1600);
                return;
            }
        } else {
            charIndex--;
            typedRoleEl.textContent = currentRole.slice(0, charIndex);

            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % rolesToType.length;
            }
        }

        setTimeout(typeLoop, isDeleting ? 35 : 70);
    }

    typeLoop();
}

/* =========================================================
   STEP 3: About Section — Experience Counter
========================================================= */

const counters = document.querySelectorAll('.counter');

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    const duration = 1500;
    const startTime = performance.now();

    function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        el.textContent = value;

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            el.textContent = target;
        }
    }

    requestAnimationFrame(step);
}

if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

/* =========================================================
   STEP 4: Skills Section — Animated Progress Bars
========================================================= */

const skillBars = document.querySelectorAll('.skill-bar-fill');

if (skillBars.length) {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percent = entry.target.getAttribute('data-percent') || 0;
                entry.target.style.width = percent + '%';
            } else {
                entry.target.style.width = '0%';
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => skillObserver.observe(bar));
}
