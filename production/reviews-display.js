(function () {
    'use strict';

    var FB_REVIEWS_URL = 'https://www.facebook.com/kat.team.events/reviews';

    function getLang() {
        return document.documentElement.getAttribute('lang') || 'ro';
    }

    function t(key) {
        var dict = window.KatTeamI18n && window.KatTeamI18n[getLang()];
        return (dict && dict[key]) || '';
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function formatReviewDate(isoDate) {
        if (!isoDate || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return '';
        var d = new Date(isoDate + 'T12:00:00');
        return d.toLocaleDateString(getLang() === 'ro' ? 'ro-RO' : 'en-GB', {
            year: 'numeric', month: 'short'
        });
    }

    function getReviewText(review) {
        if (getLang() === 'en' && review.textEn) return review.textEn;
        return review.text || review.textEn || '';
    }

    function getReviewEvent(review) {
        if (getLang() === 'en' && review.eventEn) return review.eventEn;
        return review.event || review.eventEn || '';
    }

    function renderStars() {
        var stars = '';
        for (var i = 0; i < 5; i++) {
            stars += '<i class="fa-solid fa-star reviews-card__star" aria-hidden="true"></i>';
        }
        return stars;
    }

    function renderReviews() {
        var container = document.getElementById('reviewsFeatured');
        var grid = document.getElementById('reviewsFeaturedGrid');
        var summary = document.getElementById('reviewsFeaturedSummary');
        if (!container || !grid) return;

        var reviews = (window.KAT_TEAM_FB_REVIEWS || []).filter(function (r) {
            return r && (r.text || r.textEn) && r.name;
        }).slice(0, 3);

        if (!reviews.length) {
            container.hidden = true;
            return;
        }

        container.hidden = false;
        grid.innerHTML = '';

        reviews.forEach(function (review, index) {
            var text = getReviewText(review);
            var card = document.createElement('article');
            card.className = 'reviews-card';
            card.setAttribute('itemscope', '');
            card.setAttribute('itemtype', 'https://schema.org/Review');

            var meta = '';
            if (review.event) {
                meta += '<span class="reviews-card__event">' + escapeHtml(getReviewEvent(review)) + '</span>';
            }
            var dateLabel = formatReviewDate(review.date);
            if (dateLabel) {
                meta += '<time class="reviews-card__date" datetime="' + escapeHtml(review.date || '') + '">' + escapeHtml(dateLabel) + '</time>';
            }

            card.innerHTML =
                '<div class="reviews-card__top">' +
                    '<div class="reviews-card__stars" aria-label="5 stars">' + renderStars() + '</div>' +
                    '<span class="reviews-card__source"><i class="fa-brands fa-facebook" aria-hidden="true"></i> Facebook</span>' +
                '</div>' +
                '<blockquote class="reviews-card__quote" itemprop="reviewBody"><p>' + escapeHtml(text) + '</p></blockquote>' +
                (meta ? '<p class="reviews-card__meta">' + meta + '</p>' : '') +
                '<footer class="reviews-card__author">' +
                    '<cite itemprop="author" itemscope itemtype="https://schema.org/Person">' +
                        '<span itemprop="name">' + escapeHtml(review.name) + '</span>' +
                    '</cite>' +
                '</footer>';

            grid.appendChild(card);
        });

        if (summary) {
            var viewAll = t('reviews_featured_view_all') || (getLang() === 'ro' ? 'Vezi toate pe Facebook' : 'View all on Facebook');
            summary.innerHTML =
                '<a href="' + FB_REVIEWS_URL + '" class="reviews-featured__link" target="_blank" rel="noopener noreferrer">' +
                    '<i class="fa-brands fa-facebook" aria-hidden="true"></i> ' + escapeHtml(viewAll) +
                '</a>';
        }

        injectReviewSchema(reviews);
    }

    function injectReviewSchema(reviews) {
        var old = document.getElementById('reviewsListSchema');
        if (old) old.remove();

        var business = document.getElementById('seoSchema');
        var businessData = null;
        if (business) {
            try { businessData = JSON.parse(business.textContent); } catch (e) {}
        }

        var schemaReviews = reviews.map(function (r) {
            return {
                '@type': 'Review',
                author: { '@type': 'Person', name: r.name },
                reviewBody: getReviewText(r),
                datePublished: r.date || undefined,
                reviewRating: {
                    '@type': 'Rating',
                    ratingValue: '5',
                    bestRating: '5'
                }
            };
        });

        var payload = {
            '@context': 'https://schema.org',
            '@type': 'EntertainmentBusiness',
            name: (businessData && businessData.name) || 'Kat Team Events',
            url: (businessData && businessData.url) || 'https://katteamevents.com/',
            review: schemaReviews
        };

        var script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'reviewsListSchema';
        script.textContent = JSON.stringify(payload);
        document.head.appendChild(script);
    }

    function init() {
        renderReviews();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    document.addEventListener('languagechange', renderReviews);
})();
