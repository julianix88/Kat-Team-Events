(function () {
    'use strict';

    var MENU_CLOSE_WAIT = 460;

    function getHeaderHeight() {
        var header = document.querySelector('.site-header');
        return header ? Math.ceil(header.getBoundingClientRect().height) : 80;
    }

    function syncHeaderOffset() {
        var height = getHeaderHeight();
        document.documentElement.style.setProperty('--header-offset', height + 'px');
        return height;
    }

    function resolveScrollTarget(id) {
        if (id === 'home') {
            return { mode: 'top' };
        }

        var section = document.getElementById(id);
        if (section && section.classList.contains('section')) {
            var bar = section.querySelector('.section-bar');
            return { element: bar || section, mode: 'under-header' };
        }

        var block = document.getElementById(id);
        if (block) {
            return { element: block, mode: 'under-header' };
        }

        return null;
    }

    function scrollToUnderHeader(element, behavior) {
        if (!element) return;

        var headerHeight = getHeaderHeight();
        var top = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
            top: Math.max(0, top),
            behavior: behavior || 'smooth'
        });
    }

    function scrollToTarget(targetInfo, behavior) {
        if (!targetInfo) return;

        var scrollBehavior = behavior || 'smooth';

        if (targetInfo.mode === 'top') {
            window.scrollTo({ top: 0, behavior: scrollBehavior });
            return;
        }

        scrollToUnderHeader(targetInfo.element, scrollBehavior);
    }

    function scrollToHash(hash, behavior) {
        if (!hash || hash === '#') return;
        scrollToTarget(resolveScrollTarget(hash.slice(1)), behavior);
    }

    function handleHashLinkClick(e) {
        var link = e.target.closest('a[href^="#"]');
        if (!link) return;

        var hash = link.getAttribute('href');
        if (!hash || hash.length < 2) return;
        if (!resolveScrollTarget(hash.slice(1))) return;

        e.preventDefault();

        var menuWasOpen = document.querySelector('.site-header').classList.contains('nav-open');
        var fromSiteNav = !!link.closest('#site-nav');
        var waitForMenu = fromSiteNav && menuWasOpen;

        if (hash !== window.location.hash) {
            try {
                history.pushState(null, '', hash);
            } catch (err) {
                window.location.hash = hash;
            }
        }

        function runScroll() {
            syncHeaderOffset();
            scrollToHash(hash, 'smooth');
        }

        if (waitForMenu) {
            setTimeout(runScroll, MENU_CLOSE_WAIT);
        } else {
            requestAnimationFrame(function () {
                requestAnimationFrame(runScroll);
            });
        }
    }

    function init() {
        syncHeaderOffset();
        window.addEventListener('resize', syncHeaderOffset, { passive: true });

        document.addEventListener('click', handleHashLinkClick, true);

        window.addEventListener('hashchange', function () {
            syncHeaderOffset();
            scrollToHash(window.location.hash, 'smooth');
        });

        if (window.location.hash) {
            requestAnimationFrame(function () {
                syncHeaderOffset();
                scrollToHash(window.location.hash, 'auto');
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
