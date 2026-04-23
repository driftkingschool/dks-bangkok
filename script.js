/* ==========================================================
   DRIFT KING SCHOOL BANGKOK — SCRIPT
   Language switching (EN/HE), nav, particles, counters, reveal
   ========================================================== */

(function () {
    'use strict';

    const STORAGE_KEY = 'dks-bangkok-lang';
    const DEFAULT_LANG = 'en';

    /* ---------- LANGUAGE SWITCHING ---------- */
    function applyLanguage(lang) {
        const html = document.documentElement;
        html.lang = lang;
        html.dir = lang === 'he' ? 'rtl' : 'ltr';

        // Update every element with data-en / data-he
        document.querySelectorAll('[data-en]').forEach((el) => {
            const val = el.getAttribute('data-' + lang);
            if (val === null) return;
            if (el.tagName === 'META') {
                el.setAttribute('content', val);
            } else if (el.tagName === 'TITLE') {
                document.title = val;
            } else {
                // Support HTML content inside the attribute (e.g. highlight spans)
                el.innerHTML = val;
            }
        });

        // Update toggle buttons
        document.querySelectorAll('.lang-btn').forEach((btn) => {
            const active = btn.getAttribute('data-lang') === lang;
            btn.classList.toggle('active', active);
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });

        // Update floating button text — shows the OTHER language
        const floatText = document.getElementById('langFloatText');
        if (floatText) {
            floatText.textContent = lang === 'en' ? 'עברית' : 'English';
        }

        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    }

    function initLanguage() {
        let saved = DEFAULT_LANG;
        try { saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; } catch (e) { /* ignore */ }

        applyLanguage(saved);

        document.querySelectorAll('.lang-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                applyLanguage(lang);
            });
        });

        const float = document.getElementById('langFloat');
        if (float) {
            float.addEventListener('click', () => {
                const current = document.documentElement.lang === 'he' ? 'he' : 'en';
                applyLanguage(current === 'en' ? 'he' : 'en');
            });
        }
    }

    /* ---------- NAVBAR SCROLL STATE ---------- */
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        const onScroll = () => {
            if (window.scrollY > 20) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ---------- MOBILE MENU ---------- */
    function initMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const menu = document.getElementById('mobileMenu');
        if (!hamburger || !menu) return;
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            menu.classList.toggle('open');
        });
    }

    window.closeMobile = function () {
        const hamburger = document.getElementById('hamburger');
        const menu = document.getElementById('mobileMenu');
        if (hamburger) hamburger.classList.remove('open');
        if (menu) menu.classList.remove('open');
    };

    /* ---------- HERO PARTICLES ---------- */
    function initParticles() {
        const container = document.getElementById('heroParticles');
        if (!container) return;
        const count = 22;
        for (let i = 0; i < count; i++) {
            const s = document.createElement('span');
            s.style.left = Math.random() * 100 + '%';
            s.style.animationDelay = Math.random() * 8 + 's';
            s.style.animationDuration = 6 + Math.random() * 8 + 's';
            s.style.opacity = (0.35 + Math.random() * 0.5).toString();
            container.appendChild(s);
        }
    }

    /* ---------- STATS COUNTERS ---------- */
    function animateCounters() {
        const els = document.querySelectorAll('.stat-num');
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'), 10) || 0;
                const duration = 1500;
                const start = performance.now();
                function step(now) {
                    const progress = Math.min((now - start) / duration, 1);
                    const ease = 1 - Math.pow(1 - progress, 3);
                    const value = Math.floor(target * ease);
                    el.textContent = value.toLocaleString();
                    if (progress < 1) requestAnimationFrame(step);
                    else el.textContent = target.toLocaleString();
                }
                requestAnimationFrame(step);
                io.unobserve(el);
            });
        }, { threshold: 0.4 });
        els.forEach((el) => io.observe(el));
    }

    /* ---------- REVEAL ON SCROLL ---------- */
    function initReveal() {
        const candidates = document.querySelectorAll('.adv-card, .signature-card, .section-header');
        candidates.forEach((el) => el.classList.add('reveal'));
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        candidates.forEach((el) => io.observe(el));
    }

    /* ---------- LOGO INTRO HIDE ---------- */
    function initIntro() {
        const intro = document.getElementById('logoIntro');
        if (!intro) return;
        setTimeout(() => { intro.style.display = 'none'; }, 2600);
    }

    /* ---------- INIT ---------- */
    function init() {
        initLanguage();
        initNavbar();
        initMobileMenu();
        initParticles();
        animateCounters();
        initReveal();
        initIntro();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
