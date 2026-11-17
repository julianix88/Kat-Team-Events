(function () {
    var TARGET_VOLUME = 0.22;

    function fadeIn(audio) {
        if (window.KatTeamAudioFade) {
            window.KatTeamAudioFade.fadeIn(audio, { volume: TARGET_VOLUME });
            return;
        }
        audio.volume = TARGET_VOLUME;
        audio.play().catch(function () {});
    }

    function fadeOut(audio) {
        if (window.KatTeamAudioFade) {
            window.KatTeamAudioFade.fadeOut(audio);
            return;
        }
        audio.pause();
        try { audio.currentTime = 0; } catch (e) {}
    }

    function setupHeroBackgroundAudio() {
        var audio = document.getElementById('heroBackgroundAudio');
        var section = document.getElementById('home');
        if (!audio || !section) return;
        audio.volume = TARGET_VOLUME;
        audio.dataset.fadeTargetVolume = String(TARGET_VOLUME);

        function tryPlay() {
            if (window.KatTeamSound && !window.KatTeamSound.isEnabled()) return;
            var rect = section.getBoundingClientRect();
            var inView = rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;
            if (inView) fadeIn(audio);
        }
        function startOnInteraction() {
            tryPlay();
        }
        section.addEventListener('click', startOnInteraction);
        section.addEventListener('touchstart', startOnInteraction, { passive: true });
        section.addEventListener('keydown', startOnInteraction);

        function removeDocAutoplayUnlock() {
            document.removeEventListener('click', onDocClick);
            document.removeEventListener('touchstart', onDocTouch);
            document.removeEventListener('keydown', onDocKey);
        }
        function onDocClick() {
            removeDocAutoplayUnlock();
            tryPlay();
        }
        function onDocTouch() {
            removeDocAutoplayUnlock();
            tryPlay();
        }
        function onDocKey() {
            removeDocAutoplayUnlock();
            tryPlay();
        }
        document.addEventListener('click', onDocClick, { once: true });
        document.addEventListener('touchstart', onDocTouch, { once: true, passive: true });
        document.addEventListener('keydown', onDocKey, { once: true });

        if (typeof IntersectionObserver !== 'undefined') {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        if (window.KatTeamSound && !window.KatTeamSound.isEnabled()) return;
                        fadeIn(audio);
                    } else {
                        fadeOut(audio);
                    }
                });
            }, { threshold: 0.2 });
            observer.observe(section);
        }

        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState !== 'visible') return;
            tryPlay();
        });

        document.addEventListener('soundchange', function (e) {
            if (e.detail && e.detail.enabled) tryPlay();
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupHeroBackgroundAudio);
    } else {
        setupHeroBackgroundAudio();
    }
})();
