(function () {
    'use strict';

    var id = window.KAT_TEAM_GA_MEASUREMENT_ID;
    if (!id || typeof id !== 'string' || !/^G-[A-Z0-9]+$/i.test(id.trim())) {
        return;
    }

    id = id.trim();

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
        window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', id, {
        anonymize_ip: true,
        send_page_view: true
    });

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(script);

    function track(eventName, params) {
        if (typeof window.gtag !== 'function') return;
        window.gtag('event', eventName, params || {});
    }

    function contactMethodFromLink(link) {
        var href = (link.getAttribute('href') || '').toLowerCase();
        if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp') !== -1) return 'whatsapp';
        if (href.indexOf('tel:') === 0) return 'phone';
        if (href.indexOf('facebook.com') !== -1) return 'facebook';
        if (href.indexOf('instagram.com') !== -1) return 'instagram';
        if (href.indexOf('google.com/maps') !== -1) return 'google_maps';
        return 'link';
    }

    document.addEventListener('click', function (e) {
        var link = e.target && e.target.closest ? e.target.closest('a[href]') : null;
        if (!link) return;

        var href = link.getAttribute('href') || '';
        if (
            href.indexOf('wa.me') !== -1 ||
            href.indexOf('tel:') === 0 ||
            link.classList.contains('contact-item') ||
            link.classList.contains('mobile-fab') ||
            link.classList.contains('reviews-cta__btn')
        ) {
            track('contact_click', {
                method: contactMethodFromLink(link),
                link_url: href,
                link_text: (link.textContent || '').trim().slice(0, 80)
            });
            return;
        }

        var langBtn = e.target.closest('.lang-btn[data-lang]');
        if (langBtn) {
            track('language_change', { language: langBtn.getAttribute('data-lang') });
        }
    });

    document.addEventListener('submit', function (e) {
        if (e.target && e.target.id === 'scheduleBookingForm') {
            track('booking_request_start', { form: 'schedule' });
        }
    });

    window.katTeamTrack = track;
})();
