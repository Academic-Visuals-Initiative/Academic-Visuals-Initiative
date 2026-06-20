/* ============================================
    AURA // NEXUS - DOCS PAGE SCRIPTS
    Shared across docs.html and docs/*.html
    ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Theme toggle icon ──
    const docsIcon = document.querySelector('.theme-float svg');
    const sun = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>';
    const moon = '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>';
    if (localStorage.getItem('theme') === 'dark' && docsIcon) {
        docsIcon.innerHTML = sun;
    }

    // ── Hamburger toggle ──
    document.querySelector('.docs-nav-sidebar .back-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.docs-nav-sidebar .nav-links')?.classList.toggle('open');
    });

});
