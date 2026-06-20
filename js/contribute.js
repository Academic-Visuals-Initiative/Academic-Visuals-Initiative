/* ============================================
    AURA // NEXUS - CONTRIBUTE PAGE SCRIPTS
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

    // ── Contribute cards entrance + hover ──
    const contribCards = document.querySelectorAll('.contrib-card');
    if (contribCards.length > 0) {
        gsap.fromTo(contribCards,
            { y: 100, opacity: 0, scale: 0.9, filter: "blur(10px)" },
            {
                y: 0, opacity: 1, scale: 1, filter: "blur(0px)",
                duration: 1.8, stagger: 0.15, ease: "expo.out",
                scrollTrigger: { trigger: ".contribute-grid", start: "top 85%" }
            }
        );

        contribCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { y: -8, scale: 1.01, boxShadow: "0 20px 40px rgba(0,0,0,0.08)", borderColor: "var(--accent)", duration: 0.4, ease: "power2.out" });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { y: 0, scale: 1, boxShadow: "none", borderColor: "var(--border)", duration: 0.4, ease: "power2.out" });
            });
        });
    }

    // ── Reward section entrance ──
    gsap.fromTo(".contrib-reward",
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "expo.out",
          scrollTrigger: { trigger: ".contrib-reward", start: "top 85%" }
        }
    );

    // ── Contact Modal ──
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
        emailjs.init('XvEyqyn9armH2UceH');
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
                setTimeout(() => { submitBtn.textContent = 'Send Message'; }, 3000);
            });
        });
    }

});
