document.addEventListener('DOMContentLoaded', () => {

    // ── Hero entrance (GSAP timeline) ──
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

    gsap.from(".initiative-statement .statement-main", {
        scrollTrigger: {
            trigger: ".initiative-statement",
            start: "top 45%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".initiative-statement .statement-dedication", {
        scrollTrigger: {
            trigger: ".initiative-statement",
            start: "top 40%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".initiative-statement .statement-body", {
        scrollTrigger: {
            trigger: ".initiative-statement",
            start: "top 35%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out"
    });

});
