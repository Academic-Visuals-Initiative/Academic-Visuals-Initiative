function formatText(t) {
    if (!t) return t;
    return t
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*\*([^\*]+)\s*\*\s*([^\*]+)\*\*/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
        .replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^\*]+)\*/g, '<strong class="blog-semibold">$1</strong>')
        .replace(/==([^=]+)==/g, '<mark class="blog-highlight">$1</mark>')
        .replace(/~([^~]+)~/g, '<span class="blog-accent">$1</span>')
        .replace(/:(\d):/g, function(m, d) { return '<span class="keycap">' + d + '</span>'; });
}

function renderContent(block) {
    if (typeof block === "string") return '<p class="blog-p">' + formatText(block) + '</p>';
    switch (block.type) {
        case "lead":
            return '<p class="blog-lead">' + formatText(block.text) + '</p>';
        case "p":
            return '<p class="blog-p' + (block.level > 1 ? ' blog-p-level' + block.level : '') + '">' + formatText(block.text) + '</p>';
        case "h1":
            return '<h1 class="blog-h1">' + formatText(block.text) + '</h1>';
        case "h2":
            return '<h2 class="blog-h2">' + formatText(block.text) + '</h2>';
        case "h3":
            return '<h3 class="blog-h3">' + formatText(block.text) + '</h3>';
        case "h4":
            return '<h4 class="blog-h4">' + formatText(block.text) + '</h4>';
        case "hc":
            return '<h2 class="blog-hc" style="font-weight:' + (block.weight || 700) + (block.size ? ';font-size:' + block.size : '') + (block.top ? ';margin-top:' + block.top : '') + (block.bot ? ';margin-bottom:' + block.bot : '') + '">' + formatText(block.text) + '</h2>';
        case "ul":
            return '<ul class="blog-ul' + (block.level > 1 ? ' blog-ul-level' + block.level : '') + '">' + block.items.map(function(i) { return '<li>' + formatText(i) + '</li>'; }).join("") + '</ul>';
        case "ol":
            return '<ol class="blog-ol' + (block.level > 1 ? ' blog-ol-level' + block.level : '') + '">' + block.items.map(function(i) { return '<li>' + formatText(i) + '</li>'; }).join("") + '</ol>';
        case "small":
            return '<p class="blog-small">' + formatText(block.text) + '</p>';
        case "hero":
            return '<div class="blog-hero">' + (block.src ? '<img alt="' + (block.alt || "") + '" src="' + block.src + '" loading="lazy" />' : "") + (block.credit ? '<span class="blog-img-credit">' + formatText(block.credit) + '</span>' : '') + '</div>';
        case "image-full":
            return '<figure class="blog-image-full' + (block.size ? ' img-size-' + block.size : '') + '">' + (block.src ? '<div class="blog-img-wrap"><img alt="' + (block.alt || "") + '" src="' + block.src + '" loading="lazy" />' + (block.credit ? '<span class="blog-img-credit">' + formatText(block.credit) + '</span>' : '') + '</div>' : "") + (block.caption ? '<figcaption>' + formatText(block.caption) + '</figcaption>' : "") + '</figure>';
        case "image-left":
            return '<figure class="blog-image-left' + (block.size ? ' img-size-' + block.size : '') + '">' + (block.src ? '<div class="blog-img-wrap"><img alt="' + (block.alt || "") + '" src="' + block.src + '" loading="lazy" />' + (block.credit ? '<span class="blog-img-credit">' + formatText(block.credit) + '</span>' : '') + '</div>' : "") + (block.caption ? '<figcaption>' + formatText(block.caption) + '</figcaption>' : "") + '</figure>';
        case "image-right":
            return '<figure class="blog-image-right' + (block.size ? ' img-size-' + block.size : '') + '">' + (block.src ? '<div class="blog-img-inner"><div class="blog-img-wrap"><img alt="' + (block.alt || "") + '" src="' + block.src + '" loading="lazy" />' + (block.credit ? '<span class="blog-img-credit">' + formatText(block.credit) + '</span>' : '') + '</div>' + (block.caption ? '<figcaption>' + formatText(block.caption) + '</figcaption>' : '') + '</div>' : "") + '</figure>';
        case "image-caption":
            return '<figure class="blog-image-caption' + (block.size ? ' img-size-' + block.size : '') + '">' + (block.src ? '<div class="blog-img-wrap"><img alt="' + (block.alt || "") + '" src="' + block.src + '" loading="lazy" />' + (block.credit ? '<span class="blog-img-credit">' + formatText(block.credit) + '</span>' : '') + '</div>' : "") + (block.caption ? '<figcaption>' + formatText(block.caption) + '</figcaption>' : "") + '</figure>';
        case "gallery":
            return '<div class="blog-gallery">' + (block.images || []).map(function(img) {
                return '<div class="blog-gallery-item"><img alt="' + (img.alt || "") + '" src="' + img.src + '" loading="lazy" /></div>';
            }).join("") + '</div>';
        case "video":
            return '<div class="blog-video">' + (block.src ? '<iframe src="' + block.src + '" frameborder="0" allowfullscreen></iframe>' : "") + '</div>';
        case "blockquote":
            return '<blockquote class="blog-blockquote"><p>' + formatText(block.text) + '</p>' + (block.source ? '<cite>— ' + formatText(block.source) + '</cite>' : "") + '</blockquote>';
        case "pullquote":
            return '<blockquote class="blog-pullquote"><p>' + formatText(block.text) + '</p></blockquote>';
        case "code":
            return '<div class="blog-code"><pre><code>' + block.code + '</code></pre><button class="blog-copy-btn" onclick="var btn=this;navigator.clipboard.writeText(this.parentElement.querySelector(\'code\').textContent);btn.textContent=\'Copied!\';setTimeout(function(){btn.textContent=\'Copy\'},2000)">Copy</button></div>';
        case "table":
            return '<div class="blog-table"><table>' + ((block.headers || []).length ? '<thead><tr>' + block.headers.map(function(h) { return '<th>' + formatText(h) + '</th>'; }).join("") + '</tr></thead>' : "") + '<tbody>' + (block.rows || []).map(function(row) {
                return '<tr>' + row.map(function(c) { return '<td>' + formatText(c) + '</td>'; }).join("") + '</tr>';
            }).join("") + '</tbody></table></div>';
        case "divider":
            return '<hr class="blog-divider" />';
        case "spacer":
            return '<div class="blog-spacer" style="height:' + (block.height || "2rem") + '"></div>';
        case "callout":
            return '<div class="blog-callout blog-callout-' + (block.variant || "note") + '"><span class="blog-callout-icon material-symbols-outlined">' + (block.icon || "info") + '</span><p>' + formatText(block.text) + '</p></div>';
        case "button":
            return '<div style="text-align:center;margin:32px 0"><a class="card-btn" href="' + (block.url || "#") + '" target="_blank">' + block.label + ' <span class="material-symbols-outlined" style="font-size:1rem;vertical-align:middle">' + (block.icon || "arrow_forward") + '</span></a></div>';
        default:
            return "";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var params = new URLSearchParams(window.location.search);
    var postId = params.get("id");
    var hero = document.getElementById("blog-hero");
    var filterBar = document.getElementById("blog-filter-bar");
    var blogContent = document.getElementById("blog-content");
    var heroTitle = document.getElementById("hero-title");

    if (postId) {
        fetch('../../blog/' + postId + '.json')
            .then(function(r) { if (!r.ok) throw new Error("Not found"); return r.json(); })
            .then(function(post) {
                document.title = post.title;
                hero.style.display = 'none';
                var alignClass = post.align === "center" ? ' style="text-align:center"' : post.align === "right" ? ' style="text-align:right"' : "";
                blogContent.innerHTML =
                    '<article class="blog-wrapper"' + alignClass + '>' +
                        '<a href="./" class="blog-back-link">← Back to Blog</a>' +
                        '<header class="blog-header">' +
                            (post.date ? '<span class="blog-meta">' + post.date + '</span>' : '') +
                            '<h1>' + formatText(post.title) + '</h1>' +
                            (post.author ? '<p class="blog-author">By ' + post.author + '</p>' : '') +
                        '</header>' +
                        '<div class="blog-body">' + (post.content || []).map(renderContent).join("") + '</div>' +
                    '</article>';
            })
            .catch(function() {
                hero.style.display = 'none';
                blogContent.innerHTML =
                    '<div class="blog-wrapper" style="text-align:center;padding-top:120px">' +
                        '<p style="color:var(--muted);font-size:1.1rem">Post not found.</p>' +
                        '<a href="./" class="card-btn" style="display:inline-block;margin-top:24px">Back to Journal</a>' +
                    '</div>';
            });
    } else {
        fetch('../../blog/manifest.json')
            .then(function(r) { if (!r.ok) throw new Error("Not found"); return r.json(); })
            .then(function(manifest) {
                renderListing(manifest);
            })
            .catch(function() {
                blogContent.innerHTML = '<p style="color:var(--muted);text-align:center;padding:60px 0">No blog posts yet.</p>';
            });
    }

    function renderListing(manifest) {
        var list = document.getElementById("blog-list");
        list.className = "updates-grid";
        list.innerHTML = manifest.items.map(function(post) {
            return '<article class="blog-card" data-category="' + post.category + '">' +
                '<div class="update-img">' +
                    '<img src="' + (post.image || '') + '" alt="" loading="lazy" />' +
                '</div>' +
                '<div class="update-body">' +
                    '<span class="update-tag">' + post.category.charAt(0).toUpperCase() + post.category.slice(1) + '</span>' +
                    '<h3>' + post.title + '</h3>' +
                    '<p>' + post.summary + '</p>' +
                    '<a href="./?id=' + post.id + '" class="update-link">Read More</a>' +
                '</div>' +
            '</article>';
        }).join("");

        var tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } });
        var sectionLabel = document.querySelector('.hero .section-label');
        if (sectionLabel) {
            tl.fromTo(sectionLabel, { opacity: 0, y: 20 }, { opacity: 1, y: 0, delay: 0.3 });
        }
        tl.fromTo(".hero h1", { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, sectionLabel ? "-=0.8" : ">");
        var filterTags = filterBar ? filterBar.querySelectorAll('.filter-tag') : [];
        if (filterTags.length) {
            tl.fromTo(filterTags, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 }, "-=0.7");
        }

        var cards = list.querySelectorAll('.blog-card');
        if (cards.length) {
            gsap.registerPlugin(ScrollTrigger);
            gsap.fromTo(cards,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: list, start: "top 85%" } }
            );
        }

        gsap.utils.toArray(".blog-card").forEach(function(card) {
            card.addEventListener('mouseenter', function() {
                gsap.to(card, { scale: 1.02, duration: 0.5, ease: "power2.out" });
            });
            card.addEventListener('mouseleave', function() {
                gsap.to(card, { scale: 1, duration: 0.5, ease: "power2.out" });
            });
        });

        filterBar.addEventListener('click', function(e) {
            var tag = e.target.closest('.filter-tag');
            if (!tag) return;
            filterBar.querySelectorAll('.filter-tag').forEach(function(t) { t.classList.remove('active'); });
            tag.classList.add('active');
            var filter = tag.dataset.filter;
            cards.forEach(function(card) {
                card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
            });
        });
    }
});
