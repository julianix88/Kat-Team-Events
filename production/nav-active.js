(function () {
    'use strict';

    var SECTION_IDS = ['home', 'artists', 'gallery', 'schedule', 'offer', 'contact'];

    function getHeaderOffset() {
        var header = document.querySelector('.site-header');
        return header ? header.getBoundingClientRect().height + 8 : 88;
    }

    function init() {
        var nav = document.getElementById('site-nav');
        if (!nav) return;

        var linkMap = {};
        nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
            var id = link.getAttribute('href').slice(1);
            if (id) linkMap[id] = link;
        });

        var sections = SECTION_IDS.map(function (id) {
            return document.getElementById(id);
        }).filter(Boolean);

        if (!sections.length) return;

        function setActive(id) {
            Object.keys(linkMap).forEach(function (key) {
                var link = linkMap[key];
                var active = key === id;
                link.classList.toggle('is-active', active);
                if (active) {
                    link.setAttribute('aria-current', 'true');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        }

        function updateFromScroll() {
            var marker = window.pageYOffset + getHeaderOffset() + 48;
            var current = sections[0].id;

            for (var i = 0; i < sections.length; i++) {
                if (sections[i].offsetTop <= marker) {
                    current = sections[i].id;
                }
            }

            var docBottom = window.pageYOffset + window.innerHeight;
            var pageBottom = document.documentElement.scrollHeight - 2;
            if (docBottom >= pageBottom && linkMap.contact) {
                current = 'contact';
            }

            setActive(current);
        }

        var ticking = false;
        function onScroll() {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(function () {
                updateFromScroll();
                ticking = false;
            });
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        updateFromScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
