(function () {
    'use strict';

    var flipAudio = null;
    var stopTimeout = null;

    function playFlipSound() {
        if (!flipAudio) return;
        try {
            if (stopTimeout) clearTimeout(stopTimeout);
            flipAudio.currentTime = 0;
            flipAudio.play();
            stopTimeout = setTimeout(function () {
                flipAudio.pause();
                flipAudio.currentTime = 0;
                stopTimeout = null;
            }, 3000);
        } catch (e) {}
    }

    function init() {
        var logoLink = document.querySelector('.logo-link');
        var logoImg = document.querySelector('.header-logo');
        if (!logoLink || !logoImg) return;

        flipAudio = new Audio('audio/36505577-smooth-simple-notification-274738.mp3');

        logoLink.addEventListener('mouseenter', function () {
            logoLink.classList.add('logo-link--flip');
            function onFlipStart(ev) {
                if (ev.animationName !== 'logoFlip') return;
                logoImg.removeEventListener('animationstart', onFlipStart);
                playFlipSound();
            }
            logoImg.addEventListener('animationstart', onFlipStart);
        });
        logoLink.addEventListener('mouseleave', function () {
            logoLink.classList.remove('logo-link--flip');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
