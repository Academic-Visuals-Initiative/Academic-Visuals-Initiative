/* ============================================
   AURA // NEXUS - GLOBAL SCRIPTS
   Shared JavaScript used across all pages
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Disable Copy ──
    document.addEventListener('copy', (e) => e.preventDefault());

    // ── Theme Toggle ──
    const navBtn = document.querySelector('.nav-icon-btn');
    const floatBtn = document.querySelector('.theme-float');
    const sun = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
    const moon = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';

    function setTheme(theme) {
        const html = document.documentElement;
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
            if (navBtn) navBtn.innerHTML = sun;
            if (floatBtn) floatBtn.innerHTML = sun;
        } else {
            html.removeAttribute('data-theme');
            if (navBtn) navBtn.innerHTML = moon;
            if (floatBtn) floatBtn.innerHTML = moon;
        }
        localStorage.setItem('theme', theme);
    }

    // Use saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    if (navBtn) {
        navBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            setTheme(isDark ? 'light' : 'dark');
        });
    }
    if (floatBtn) {
        floatBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            setTheme(isDark ? 'light' : 'dark');
        });
    }

    // ── Hamburger menu ──
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    // ── Scroll reveal via IntersectionObserver ──
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    requestAnimationFrame(() => {
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-down').forEach(el => observer.observe(el));
    });

    // ── FAQ Accordion (Shared styles for split FAQ) ──
    const faqItems = document.querySelectorAll('.faq-split .faq-item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        if (!trigger) return;
        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // ── FAQ Page Accordion ──
    const faqPageItems = document.querySelectorAll('.faq-page .faq-item');
    faqPageItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');
        if (!trigger || !content) return;
        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqPageItems.forEach(i => {
                i.classList.remove('active');
                const c = i.querySelector('.faq-content');
                if (c) c.style.maxHeight = null;
            });
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

});
