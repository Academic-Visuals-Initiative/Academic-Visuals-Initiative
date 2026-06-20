/* ============================================
    AURA // NEXUS - CREDITS PAGE SCRIPTS
    ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    gsap.registerPlugin(ScrollTrigger);

    // ── Hero entrance ──
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } });
    const sectionLabel = document.querySelector('.hero .section-label');
    if (sectionLabel) {
        heroTl.fromTo(sectionLabel, { opacity: 0, y: 20 }, { opacity: 1, y: 0, delay: 0.3 });
    }
    heroTl.fromTo(".hero h1", { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, sectionLabel ? "-=0.8" : ">");

    // ── Credit groups entrance ──
    const creditGroups = document.querySelectorAll('.credit-group');
    if (creditGroups.length > 0) {
        gsap.fromTo(creditGroups,
            { y: 100, opacity: 0, scale: 0.9, filter: "blur(10px)" },
            {
                y: 0, opacity: 1, scale: 1, filter: "blur(0px)",
                duration: 1.8, stagger: 0.15, ease: "expo.out",
                scrollTrigger: { trigger: ".credits-section", start: "top 85%" }
            }
        );
    }

    // ── Contributor cards entrance + hover ──
    const contribCards = document.querySelectorAll('.contributor-card');
    if (contribCards.length > 0) {
        gsap.fromTo(contribCards,
            { y: 80, opacity: 0, scale: 0.9 },
            {
                y: 0, opacity: 1, scale: 1,
                duration: 1.5, stagger: 0.1, ease: "expo.out",
                scrollTrigger: { trigger: ".contributors-grid", start: "top 85%" }
            }
        );

        contribCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { y: -6, scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.08)", borderColor: "var(--accent)", duration: 0.4, ease: "power2.out" });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { y: 0, scale: 1, boxShadow: "none", borderColor: "var(--border)", duration: 0.4, ease: "power2.out" });
            });
        });
    }

});
