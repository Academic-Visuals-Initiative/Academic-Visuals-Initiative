/* ============================================
   AURA // NEXUS - HOME PAGE SCRIPTS
   JavaScript specific to index.html
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {

    // Register ScrollTrigger first
    gsap.ticker.lagSmoothing(0);
    gsap.registerPlugin(ScrollTrigger);

    // ── Hero entrance (GSAP timeline) ──
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } });

    // Animate section label first if it exists
    const sectionLabel = document.querySelector('.hero .section-label');
    if (sectionLabel) {
        tl.fromTo(sectionLabel,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, delay: 0.3 }
        );
    }

    // Animate hero h1
    tl.fromTo(".hero h1",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0 },
        sectionLabel ? "-=0.8" : ">"
    );

    // Animate hero paragraphs + buttons OR filter bar
    const heroPs = document.querySelectorAll('.hero p');
    const heroBtns = document.querySelector('.hero-btns');
    const filterBar = document.querySelector('.hero .filter-bar');

    if (heroPs.length && heroBtns) {
        tl.fromTo(heroPs,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, stagger: 0.15 },
            "-=0.9"
        )
        .fromTo(heroBtns,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0 },
            "-=0.9"
        );
    } else if (filterBar) {
        tl.fromTo(filterBar.querySelectorAll('.filter-tag'),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 },
            "-=0.7"
        );
    }

    // ── Bento grid entrance (GSAP stagger) ──
    const bentoCards = document.querySelectorAll('.bento-grid .card');
    if (bentoCards.length > 0) {
        gsap.fromTo(bentoCards,
            { y: 100, opacity: 0, scale: 0.9, filter: "blur(10px)" },
            {
                y: 0, opacity: 1, scale: 1, filter: "blur(0px)",
                duration: 1.8, stagger: 0.15, ease: "expo.out",
                scrollTrigger: {
                    trigger: ".bento-grid",
                    start: "top 85%"
                }
            }
        );
    }

    // ── Bento card hover (GSAP lift) ──
    bentoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -8, scale: 1.01,
                boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                borderColor: "var(--accent)",
                duration: 0.4, ease: "power2.out"
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0, scale: 1,
                boxShadow: "0 0px 0px rgba(0,0,0,0)",
                borderColor: "var(--border)",
                duration: 0.4, ease: "power2.out"
            });
        });
    });

    // ── Slideshow (CSS opacity transition) ──
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let current = 0;
        slides[0].classList.add('active');
        setInterval(() => {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
        }, 5000);
    }

    // ── Info-split entrance (GSAP split animation) ──
    const infoTl = gsap.timeline({
        scrollTrigger: { trigger: ".info-split", start: "top 85%" }
    });
    infoTl.fromTo(".col-left",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
    )
    .fromTo(".col-right p",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
        "-=0.8"
    )
    .fromTo(".help-link",
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
    )
    .fromTo(".info-btn-wrap",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
    );

    // ── Featured entrance ──
    const featuredTl = gsap.timeline({
        scrollTrigger: { trigger: ".featured", start: "top 85%" }
    });
    featuredTl.fromTo(".header-text",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 }
    )
    .fromTo(".featured .section-link",
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        "-=0.8"
    )
    .fromTo(".card-gallery .card:not(.gallery-card)",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15 },
        "-=0.6"
    );

    // ── "How to Use" button entrance ──
    gsap.from(".featured .btn-primary", {
        scrollTrigger: { trigger: ".featured .btn-primary", start: "top 90%" },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "transform"
    });

    // ── Featured card hover ──
    gsap.utils.toArray(".card-gallery .card:not(.gallery-card)").forEach(card => {
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

    // ── Updates card hover ──
    gsap.utils.toArray(".update-card, .blog-card").forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.02,
                borderColor: "var(--accent)",
                duration: 0.5, ease: "power2.out"
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                borderColor: "var(--border)",
                duration: 0.5, ease: "power2.out"
            });
        });
    });

    // ── Cards section entrance ──
    const cardsTl = gsap.timeline({
        scrollTrigger: { trigger: ".cards-section", start: "top 85%" }
    });
    cardsTl.fromTo(".cards-section .updates-header",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(".cards-section .featured-header + p",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.4"
    )
    .fromTo(".cards-section .contributor-card",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out" },
        "-=0.4"
    )
    .fromTo(".cards-section .avatar",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" },
        "-=0.3"
    )
    .fromTo(".cards-section .contributor-count",
        { x: -10, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6 },
        "-=0.3"
    );

    // ── Philosophy entrance ──
    const philoTl = gsap.timeline({
        scrollTrigger: { trigger: ".philosophy", start: "top 80%" }
    });
    philoTl.fromTo(".philosophy .section-label",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
    )
    .fromTo(".philosophy blockquote",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
        "-=0.4"
    )
    .fromTo(".philo-item",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
        "-=0.8"
    )
    .fromTo(".philosophy .btn-primary",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", clearProps: "transform" },
        "-=0.5"
    );

    // ── FAQ section entrance ──
    const faqTl = gsap.timeline({
        scrollTrigger: { trigger: ".faq-split", start: "top 85%" }
    });
    faqTl.fromTo(".faq-split .reveal:first-child",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(".faq-list .faq-item",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=0.6"
    );

    // ── Contributor card hover ──
    const contribCard = document.querySelector(".contributor-card");
    if (contribCard) {
        contribCard.addEventListener('mouseenter', () => {
            gsap.to(contribCard, {
                y: -10,
                borderColor: "var(--accent)",
                boxShadow: "0 30px 60px rgba(0,0,0,0.05)",
                duration: 0.5, ease: "power2.out"
            });
        });
        contribCard.addEventListener('mouseleave', () => {
            gsap.to(contribCard, {
                y: 0,
                borderColor: "var(--border)",
                boxShadow: "none",
                duration: 0.5, ease: "power2.out"
            });
        });
    }

    // ── Cards section card hover ──
    gsap.utils.toArray(".cards-container .contributor-card").forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                borderColor: "var(--accent)",
                boxShadow: "0 30px 60px rgba(0,0,0,0.05)",
                duration: 0.5, ease: "power2.out"
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                borderColor: "var(--border)",
                boxShadow: "none",
                duration: 0.5, ease: "power2.out"
            });
        });
    });

    // ── Contact Modal ──
    emailjs.init('XvEyqyn9armH2UceH');
    const modal = document.getElementById('contactModal');
    const openBtn = document.getElementById('sendMessageBtn');
    const closeBtn = document.getElementById('modalClose');
    const form = document.getElementById('contactForm');

    if (openBtn && modal) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('.modal-submit');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            emailjs.send('service_oz6dham', 'template_9i77taa', {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            })
            .then(() => {
                submitBtn.textContent = 'Sent';
                submitBtn.classList.add('sent');
                setTimeout(() => {
                    modal.classList.remove('open');
                    document.body.style.overflow = '';
                    form.reset();
                    submitBtn.textContent = 'Send Message';
                    submitBtn.classList.remove('sent');
                    submitBtn.disabled = false;
                }, 1500);
            })
            .catch(() => {
                submitBtn.textContent = 'Failed - Try Again';
                submitBtn.disabled = false;
                setTimeout(() => {
                    submitBtn.textContent = 'Send Message';
                }, 3000);
            });
        });
    }

    });
});
