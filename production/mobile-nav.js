(function () {
    'use strict';
    var OPEN_CLASS = 'nav-open';
    var BODY_OPEN_CLASS = 'nav-menu-open';

    function init() {
        var toggle = document.getElementById('navToggle');
        var nav = document.getElementById('site-nav');
        var header = document.querySelector('.site-header');
        var backdrop = document.getElementById('navBackdrop');
        if (!toggle || !nav || !header) return;

        function open() {
            header.classList.add(OPEN_CLASS);
            document.body.classList.add(BODY_OPEN_CLASS);
            toggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
            if (backdrop) backdrop.removeAttribute('hidden');
        }
        function close() {
            header.classList.remove(OPEN_CLASS);
            document.body.classList.remove(BODY_OPEN_CLASS);
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            if (backdrop) backdrop.setAttribute('hidden', '');
        }
        function toggleNav() {
            if (header.classList.contains(OPEN_CLASS)) close();
            else open();
        }

        toggle.addEventListener('click', function () {
            toggleNav();
        });

        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                close();
            });
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && header.classList.contains(OPEN_CLASS)) {
                close();
            }
        });

        document.addEventListener('click', function (e) {
            if (!header.classList.contains(OPEN_CLASS)) return;
            if (nav.contains(e.target) || toggle.contains(e.target)) return;
            close();
        });

        if (backdrop) {
            backdrop.addEventListener('click', close);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
