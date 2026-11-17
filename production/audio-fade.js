(function () {
    'use strict';

    var DEFAULT_FADE_MS = 650;
    var fades = new WeakMap();

    function cancelFade(audio) {
        var state = fades.get(audio);
        if (!state) return;
        cancelAnimationFrame(state.raf);
        fades.delete(audio);
    }

    function getTargetVolume(audio) {
        var stored = audio.dataset.fadeTargetVolume;
        if (stored != null && stored !== '') {
            return parseFloat(stored);
        }
        return audio.volume;
    }

    function fadeAudio(audio, toVolume, options) {
        options = options || {};
        var duration = options.duration != null ? options.duration : DEFAULT_FADE_MS;
        var onComplete = options.onComplete;

        cancelFade(audio);

        var from = audio.volume;
        var start = performance.now();

        function step(now) {
            var t = Math.min(1, (now - start) / duration);
            var eased = t * (2 - t);
            audio.volume = from + (toVolume - from) * eased;

            if (t < 1) {
                var raf = requestAnimationFrame(step);
                fades.set(audio, { raf: raf });
                return;
            }

            fades.delete(audio);
            audio.volume = toVolume;
            if (onComplete) onComplete();
        }

        fades.set(audio, { raf: requestAnimationFrame(step) });
    }

    function fadeInAndPlay(audio, options) {
        options = options || {};
        if (window.KatTeamSound && !window.KatTeamSound.isEnabled()) return;

        var targetVol = options.volume != null ? options.volume : getTargetVolume(audio);
        audio.dataset.fadeTargetVolume = String(targetVol);

        cancelFade(audio);
        audio.volume = 0;

        if (audio.readyState < 2 && options.load !== false) {
            audio.load();
        }

        var playPromise = audio.play();
        if (playPromise && playPromise.catch) {
            playPromise.catch(function () {});
        }

        fadeAudio(audio, targetVol, { duration: options.duration });
    }

    function fadeOutAndPause(audio, options) {
        options = options || {};
        if (audio.paused) {
            cancelFade(audio);
            return;
        }

        cancelFade(audio);

        fadeAudio(audio, 0, {
            duration: options.duration,
            onComplete: function () {
                audio.pause();
                if (options.resetTime !== false) {
                    try { audio.currentTime = 0; } catch (e) {}
                }
                audio.volume = getTargetVolume(audio);
            }
        });
    }

    function fadeAllPlayingAudio(options) {
        document.querySelectorAll('audio').forEach(function (audio) {
            if (!audio.paused) {
                fadeOutAndPause(audio, options);
            }
        });
    }

    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden') {
            fadeAllPlayingAudio({ duration: 450, resetTime: false });
        }
    });

    window.addEventListener('pagehide', function () {
        fadeAllPlayingAudio({ duration: 300, resetTime: false });
    });

    window.KatTeamAudioFade = {
        fadeIn: fadeInAndPlay,
        fadeOut: fadeOutAndPause,
        cancel: cancelFade
    };
})();
