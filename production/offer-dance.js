(function () {
    'use strict';
    function init() {
        var cardDj = document.getElementById('offerCardDj');
        if (cardDj) {
            cardDj.addEventListener('mouseenter', function () { cardDj.classList.add('is-hovered'); });
            cardDj.addEventListener('mouseleave', function () { cardDj.classList.remove('is-hovered'); });
        }
        var cardSinger = document.getElementById('offerCardSinger');
        if (cardSinger) {
            cardSinger.addEventListener('mouseenter', function () { cardSinger.classList.add('is-hovered'); });
            cardSinger.addEventListener('mouseleave', function () { cardSinger.classList.remove('is-hovered'); });
        }
        var cardMc = document.getElementById('offerCardMc');
        if (cardMc) {
            cardMc.addEventListener('mouseenter', function () { cardMc.classList.add('is-hovered'); });
            cardMc.addEventListener('mouseleave', function () { cardMc.classList.remove('is-hovered'); });
        }
        var cardSound = document.getElementById('offerCardSound');
        if (cardSound) {
            cardSound.addEventListener('mouseenter', function () { cardSound.classList.add('is-hovered'); });
            cardSound.addEventListener('mouseleave', function () { cardSound.classList.remove('is-hovered'); });
        }
        var cardLights = document.getElementById('offerCardLights');
        if (cardLights) {
            cardLights.addEventListener('mouseenter', function () { cardLights.classList.add('is-hovered'); });
            cardLights.addEventListener('mouseleave', function () { cardLights.classList.remove('is-hovered'); });
        }
        var offerSection = document.getElementById('offer');
        if (offerSection) {
            offerSection.addEventListener('mouseenter', function () { offerSection.classList.add('is-section-hovered'); });
            offerSection.addEventListener('mouseleave', function () { offerSection.classList.remove('is-section-hovered'); });
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
