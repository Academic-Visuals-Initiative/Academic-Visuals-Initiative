/* ============================================
   AURA // NEXUS - GALLERY & BLOG SCRIPTS
   JavaScript for gallery.html and blog.html
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

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

    // Animate filter tags (gallery/blog pages)
    const filterBar = document.querySelector('.hero .filter-bar');
    if (filterBar) {
        tl.fromTo(filterBar.querySelectorAll('.filter-tag'),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 },
            "-=0.7"
        );
    }

    // ── Gallery/Blog card entrance (GSAP stagger) ──
    const galleryCards = document.querySelectorAll('.gallery-card, .blog-card');
    if (galleryCards.length > 0) {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(galleryCards,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power3.out" },
            "-=0.3"
        );
    }

    // ── Gallery & Blog card hover (GSAP scale) ──
    gsap.utils.toArray(".gallery-card, .blog-card").forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.02,
                duration: 0.5, ease: "power2.out"
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.5, ease: "power2.out"
            });
        });
    });

    // ── Filter functionality ──
    document.querySelectorAll('.filter-bar').forEach(bar => {
        const gridId = bar.dataset.target;
        const grid = document.getElementById(gridId);
        if (!grid) return;
        const cards = grid.querySelectorAll('[data-category]');
        const tags = bar.querySelectorAll('.filter-tag');

        tags.forEach(tag => {
            tag.addEventListener('click', () => {
                tags.forEach(t => t.classList.remove('active'));
                tag.classList.add('active');
                const filter = tag.dataset.filter;
                cards.forEach(card => {
                    card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
                });
            });
        });
    });

});
