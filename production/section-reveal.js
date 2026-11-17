(function () {
    'use strict';

    function init() {
        var sections = document.querySelectorAll('main .section[id]');
        if (!sections.length) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            sections.forEach(function (section) {
                section.classList.add('reveal-on-scroll', 'is-revealed');
            });
            return;
        }

        sections.forEach(function (section) {
            section.classList.add('reveal-on-scroll');
        });

        if (typeof IntersectionObserver === 'undefined') {
            sections.forEach(function (section) {
                section.classList.add('is-revealed');
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -6% 0px'
        });

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
