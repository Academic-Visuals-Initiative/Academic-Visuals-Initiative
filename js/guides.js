/* ============================================
   AVI - GUIDES PAGE SCRIPTS
   Hero entrance, the live JSON preview demo,
   and the scroll reveals for the editorial +
   workspace sections.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    if (!window.gsap) return;

    // ── Hero entrance ──
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

    const heroText = document.querySelector('.hero p');
    if (heroText) {
        tl.fromTo(heroText,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0 },
            "-=0.9"
        );
    }

    // ── Workspace Grid: live preview ──
    const inputName = document.getElementById('inputName');
    const inputRole = document.getElementById('inputRole');
    const inputBio = document.getElementById('inputBio');
    const inputPubTitle = document.getElementById('inputPubTitle');
    const inputPubJournal = document.getElementById('inputPubJournal');

    const viewName = document.getElementById('viewName');
    const viewRole = document.getElementById('viewRole');
    const viewBio = document.getElementById('viewBio');
    const viewPubTitle = document.getElementById('viewPubTitle');
    const viewPubJournal = document.getElementById('viewPubJournal');

    const statusBadge = document.getElementById('statusBadge');
    const statusText = document.getElementById('statusText');
    const tryPrompt = document.getElementById('tryPrompt');

    const nameTargetText = "Dr. Clara Sterling";
    const roleTargetText = "Associate Professor, Biophysics";

    let nameIndex = 0;
    let roleIndex = 0;
    let compileTimeout;

    function updatePreview() {
        statusBadge.classList.add('compiling');
        statusText.textContent = "Compiling Changes...";
        clearTimeout(compileTimeout);
        compileTimeout = setTimeout(() => {
            viewName.textContent = inputName.value || "Untitled Scholar";
            viewRole.textContent = inputRole.value || "Field / Position";
            viewBio.textContent = inputBio.value || "Write a brief description here.";
            viewPubTitle.textContent = inputPubTitle.value || "Untitled Publication";
            viewPubJournal.textContent = inputPubJournal.value ? "Published in " + inputPubJournal.value : "In Review / Preprint";
            statusBadge.classList.remove('compiling');
            statusText.textContent = "Live Compiled";
        }, 300);
    }

    function typeName() {
        if (nameIndex < nameTargetText.length) {
            inputName.value += nameTargetText.charAt(nameIndex);
            inputName.setAttribute('size', Math.max(inputName.value.length, 1));
            updatePreview();
            nameIndex++;
            setTimeout(typeName, 120);
        } else {
            setTimeout(typeRole, 400);
        }
    }

    function typeRole() {
        if (roleIndex < roleTargetText.length) {
            inputRole.value += roleTargetText.charAt(roleIndex);
            inputRole.setAttribute('size', Math.max(inputRole.value.length, 1));
            updatePreview();
            roleIndex++;
            setTimeout(typeRole, 80);
        } else {
            completeSetup();
        }
    }

    function completeSetup() {
        inputName.classList.add('pulse-input');
        inputRole.classList.add('pulse-input');
        inputBio.classList.add('pulse-input');
        tryPrompt.classList.add('show');
    }

    const inputs = [inputName, inputRole, inputBio, inputPubTitle, inputPubJournal];
    inputs.forEach(input => {
        input.addEventListener('input', function (e) {
            e.target.setAttribute('size', Math.max(e.target.value.length || 1, 1));
            updatePreview();
        });
        input.addEventListener('focus', function () {
            tryPrompt.classList.remove('show');
            inputName.classList.remove('pulse-input');
            inputRole.classList.remove('pulse-input');
            inputBio.classList.remove('pulse-input');
        });
    });

    setTimeout(typeName, 800);

    // ── Scroll reveals ──
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

    gsap.from("#tryPrompt", {
        scrollTrigger: {
            trigger: "#tryPrompt",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out"
    });

    gsap.from(".workspace-grid .workspace-card", {
        scrollTrigger: {
            trigger: ".workspace-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2
    });

});
