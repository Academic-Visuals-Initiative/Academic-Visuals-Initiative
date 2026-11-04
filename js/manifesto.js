/* ============================================
   AVI - MANIFESTO PAGE SCRIPTS
   Same hero + statement reveals as the
   templates and guides pages.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    if (!window.gsap) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } });

    const sectionLabel = document.querySelector('.hero .section-label');
    if (sectionLabel) {
        tl.fromTo(sectionLabel,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, delay: 0.3 }
        );
    }

    tl.fromTo(".hero h1",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0 },
        sectionLabel ? "-=0.8" : ">"
    );

    gsap.registerPlugin(ScrollTrigger);

    // One trigger, staggered — the section sits near the top of this short
    // page, so it must reveal on load and stay revealed.
    gsap.from(".initiative-statement p", {
        scrollTrigger: {
            trigger: ".initiative-statement",
            start: "top 90%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15
    });
});

document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
});
