(function () {
    'use strict';

    // Update `google` with your "Ask for reviews" link from Google Business Profile
    // (looks like https://g.page/r/XXXXX/review) when the listing is live.
    var REVIEW_LINKS = {
        facebook: 'https://www.facebook.com/kat.team.events/reviews',
        google: 'https://www.google.com/maps/search/?api=1&query=Kat+Team+Events+London'
    };

    function applyReviewLinks() {
        var facebookLink = document.getElementById('reviewLinkFacebook');
        var googleLink = document.getElementById('reviewLinkGoogle');

        if (facebookLink && REVIEW_LINKS.facebook) {
            facebookLink.href = REVIEW_LINKS.facebook;
        }
        if (googleLink && REVIEW_LINKS.google) {
            googleLink.href = REVIEW_LINKS.google;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyReviewLinks);
    } else {
        applyReviewLinks();
    }
})();
