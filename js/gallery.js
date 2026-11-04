/* ============================================
   AVI - GALLERY PAGE SCRIPTS
   Hero entrance only: the cards themselves are
   rendered by gallery-data.js from the manifest.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    if (!window.gsap) return;

    // ── Hero entrance (GSAP timeline for gallery/blog) ──
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

    // Animate filter tags
    const filterBar = document.querySelector('.hero .filter-bar');
    if (filterBar) {
        tl.fromTo(filterBar.querySelectorAll('.filter-tag'),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 },
            "-=0.7"
        );
    }

    // Hold the template cards back until the hero has finished animating,
    // so the designs never pop in ahead of the title.
    if (window.__aviGalleryGate) {
        let released = false;
        let release;
        const gate = new Promise(resolve => { release = resolve; });
        window.__aviGalleryGate(gate);

        const finish = () => {
            if (released) return;
            released = true;
            release();
        };

        tl.eventCallback('onComplete', finish);
        setTimeout(finish, 3000);
    }

});
