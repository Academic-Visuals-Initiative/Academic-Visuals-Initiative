/* ============================================
    AURA // NEXUS - MANIFESTO PAGE SCRIPTS
    ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } });

    // --- Horizon Hero Animations (immediate) ---
    const sectionLabel = document.querySelector('.horizon-hero .section-label');
    if (sectionLabel) {
        tl.fromTo(sectionLabel,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, delay: 0.3 }
        );
    }

    tl.fromTo(".horizon-hero h1",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0 },
        sectionLabel ? "-=0.8" : ">"
    );

    tl.fromTo(".horizon-hero p",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        "-=0.6"
    );

    // =============================================
    // SECTION 1: Longevity Grid
    // =============================================

    gsap.from(".longevity-grid .longevity-text h2", {
        scrollTrigger: {
            trigger: ".longevity-grid",
            start: "top 42%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".longevity-grid .longevity-text p", {
        scrollTrigger: {
            trigger: ".longevity-grid",
            start: "top 42%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".longevity-grid .year-ticker", {
        scrollTrigger: {
            trigger: ".longevity-grid",
            start: "top 35%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out"
    });

    // =============================================
    // SECTION 2: Literacy Grid
    // =============================================

    gsap.from(".hub-header", {
        scrollTrigger: {
            trigger: ".literacy-grid",
            start: "top 50%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out"
    });

    gsap.set(".guide-card", { clearProps: "all" });

    gsap.from(".guide-card", {
        scrollTrigger: {
            trigger: ".literacy-grid",
            start: "top 35%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".literacy-grid .preview-panel", {
        scrollTrigger: {
            trigger: ".literacy-grid",
            start: "top 35%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out"
    });

    // =============================================
    // SECTION 3: Gap Box & Data Rows
    // =============================================

    gsap.from(".l02-header", {
        scrollTrigger: {
            trigger: ".gap-box",
            start: "top 55%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".l02-row", {
        scrollTrigger: {
            trigger: ".gap-box",
            start: "top 50%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".data-row", {
        scrollTrigger: {
            trigger: ".gap-box",
            start: "top 50%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out"
    });

}); // End of DOMContentLoaded

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});