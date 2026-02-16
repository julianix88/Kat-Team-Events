(function () {
    'use strict';

    var lastPlayed = 0;
    var minInterval = 180;
    var audioContext = null;

    function getAudioContext() {
        if (audioContext) return audioContext;
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            return null;
        }
        return audioContext;
    }

    function playHoverTone() {
        var now = Date.now();
        if (now - lastPlayed < minInterval) return;
        lastPlayed = now;

        var ctx = getAudioContext();
        if (!ctx) return;

        try {
            var oscillator = ctx.createOscillator();
            var gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.frequency.value = 580;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.08);
        } catch (e) {
            // Ignore
        }
    }

    function unlockAudio() {
        var ctx = getAudioContext();
        if (ctx && ctx.state === 'suspended') {
            ctx.resume();
        }
    }

    function createWaveBars() {
        var waves = document.createElement('span');
        waves.className = 'nav-waves';
        waves.setAttribute('aria-hidden', 'true');
        var barCount = 7;
        for (var b = 0; b < barCount; b++) {
            var bar = document.createElement('span');
            bar.className = 'nav-wave-bar';
            bar.style.animationDelay = (b * 0.08) + 's';
            waves.appendChild(bar);
        }
        return waves;
    }

    function wrapLinkText(link) {
        var text = link.childNodes;
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < text.length; i++) {
            fragment.appendChild(text[i].cloneNode(true));
        }
        var span = document.createElement('span');
        span.className = 'nav-link-text';
        while (link.firstChild) {
            span.appendChild(link.firstChild);
        }
        link.appendChild(span);
    }

    function init() {
        var links = document.querySelectorAll('.site-nav a');
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            wrapLinkText(link);
            link.insertBefore(createWaveBars(), link.firstChild);
            link.addEventListener('mouseenter', playHoverTone);
        }
        document.body.addEventListener('click', unlockAudio, { once: true });
        document.body.addEventListener('keydown', unlockAudio, { once: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
