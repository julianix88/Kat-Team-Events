(function () {
    function setupHeroBackgroundAudio() {
        var audio = document.getElementById('heroBackgroundAudio');
        var section = document.getElementById('heroSection');
        if (!audio || !section) return;
        audio.volume = 0.22;
        function tryPlay() {
            var rect = section.getBoundingClientRect();
            var inView = rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;
            if (inView) audio.play().catch(function () {});
        }
        function startOnInteraction() {
            tryPlay();
        }
        section.addEventListener('click', startOnInteraction);
        section.addEventListener('touchstart', startOnInteraction);
        section.addEventListener('keydown', startOnInteraction);
        document.addEventListener('click', function docClick() {
            document.removeEventListener('click', docClick);
            document.removeEventListener('touchstart', docTouch);
            document.removeEventListener('keydown', docKey);
            tryPlay();
        }, { once: true });
        function docTouch() {
            document.removeEventListener('click', docClick);
            document.removeEventListener('touchstart', docTouch);
            document.removeEventListener('keydown', docKey);
            tryPlay();
        }
        function docKey() {
            document.removeEventListener('click', docClick);
            document.removeEventListener('touchstart', docTouch);
            document.removeEventListener('keydown', docKey);
            tryPlay();
        }
        document.addEventListener('touchstart', docTouch, { once: true });
        document.addEventListener('keydown', docKey, { once: true });
        if (typeof IntersectionObserver !== 'undefined') {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        audio.play().catch(function () {});
                    } else {
                        audio.pause();
                        audio.currentTime = 0;
                    }
                });
            }, { threshold: 0.2 });
            observer.observe(section);
        }
        }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupHeroBackgroundAudio);
    } else {
        setupHeroBackgroundAudio();
    }
})();
