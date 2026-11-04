/* ============================================
   AVI - GALLERY RENDERER
   Builds template cards from gallery/manifest.json
   Used by index.html and pages/gallery/
   ============================================ */

(function () {
    'use strict';

    // Cards wait for this promise before revealing, so they never appear
    // before the page's hero animation has finished.
    var gate = Promise.resolve();

    window.__aviGalleryGate = function (promise) {
        gate = promise;
    };

    function esc(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
        });
    }

    function cardHtml(item, root) {
        var category = esc(item.category || 'all');
        var meta = '<div class="meta-id">' + esc(item.ref || '') + '</div>';

        if (item.upcoming) {
            return '<div class="card gallery-card is-upcoming" data-category="' + category + '">' +
                '<div class="upcoming-body">' +
                    '<span class="upcoming-label">In progress</span>' +
                    '<span class="upcoming-title">' + esc(item.title || '') + '</span>' +
                '</div>' +
            '</div>';
        }

        var image = item.image
            ? '<img src="' + esc(root + item.image) + '" alt="' + esc(item.title || '') + '" class="card-img" loading="lazy">'
            : '';

        return '<div class="card gallery-card" data-category="' + category + '">' +
            meta + image +
            '<div class="drawer">' +
                '<a href="' + esc(item.demo || '#') + '" class="btn" target="_blank" rel="noopener">View Demo</a>' +
                '<a href="' + esc(item.repo || '#') + '" class="btn" target="_blank" rel="noopener">Use This</a>' +
            '</div>' +
        '</div>';
    }

    function reveal(container) {
        var cards = container.querySelectorAll('.gallery-card');
        Array.prototype.forEach.call(cards, function (card, index) {
            setTimeout(function () { card.classList.add('visible'); }, 40 + index * 60);
        });
    }

    function render(container) {
        var src = container.getAttribute('data-gallery');
        var root = container.getAttribute('data-root') || '';
        var featuredOnly = container.getAttribute('data-featured') === 'true';

        fetch(src, { cache: 'no-store' })
            .then(function (response) {
                if (!response.ok) throw new Error('manifest not found');
                return response.json();
            })
            .then(function (data) {
                var items = (data.items || []).filter(function (item) {
                    return !featuredOnly || item.featured;
                });
                container.innerHTML = items.map(function (item) {
                    return cardHtml(item, root);
                }).join('');
                gate.then(function () { reveal(container); });
            })
            .catch(function () {
                container.innerHTML = '';
            });
    }

    function initFilters() {
        document.addEventListener('click', function (event) {
            var tag = event.target.closest('.filter-tag');
            if (!tag) return;

            var bar = tag.closest('.filter-bar');
            var gridId = bar && bar.getAttribute('data-target');
            var grid = gridId ? document.getElementById(gridId) : null;
            if (!grid) return;

            bar.querySelectorAll('.filter-tag').forEach(function (btn) {
                btn.classList.remove('active');
            });
            tag.classList.add('active');

            var filter = tag.getAttribute('data-filter');
            grid.querySelectorAll('[data-category]').forEach(function (card) {
                var show = filter === 'all' || card.getAttribute('data-category') === filter;
                card.style.display = show ? '' : 'none';
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('[data-gallery]').forEach(render);
        initFilters();
    });
})();
