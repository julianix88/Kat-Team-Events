(function () {
    'use strict';

    var STORAGE_KEY = 'kat-team-sound';
    var HINT_STORAGE_KEY = 'kat-team-sound-hint';
    var enabled = true;
    var hintTimer = null;

    var LABELS = {
        ro: { aria: 'Comută sunetul', on: 'Sunet pornit', off: 'Sunet oprit', hint: 'Sunet pornit/oprit' },
        en: { aria: 'Toggle sound', on: 'Sound on', off: 'Sound off', hint: 'Sound on/off' }
    };

    function readStored() {
        try {
            var v = localStorage.getItem(STORAGE_KEY);
            if (v === 'off') return false;
            if (v === 'on') return true;
        } catch (e) {}
        return true;
    }

    function isEnabled() {
        return enabled;
    }

    function getLang() {
        return document.documentElement.lang === 'en' ? 'en' : 'ro';
    }

    function applyToAudioElements(on) {
        document.querySelectorAll('audio').forEach(function (audio) {
            audio.muted = !on;
            if (!on) {
                if (window.KatTeamAudioFade) {
                    window.KatTeamAudioFade.fadeOut(audio);
                } else {
                    audio.pause();
                    try { audio.currentTime = 0; } catch (e) {}
                }
            }
        });
    }

    function updateButton(btn) {
        if (!btn) return;
        var on = enabled;
        var labels = LABELS[getLang()];
        var icon = btn.querySelector('.sound-toggle__icon');
        if (icon) {
            icon.classList.remove('fa-volume-high', 'fa-volume-xmark');
            icon.classList.add(on ? 'fa-volume-high' : 'fa-volume-xmark');
        }
        btn.classList.toggle('sound-toggle--off', !on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        btn.setAttribute('aria-label', labels.aria);
        btn.setAttribute('title', on ? labels.on : labels.off);
    }

    function setEnabled(on, skipStore) {
        enabled = !!on;
        if (!skipStore) {
            try { localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off'); } catch (e) {}
        }
        applyToAudioElements(enabled);
        updateButton(document.getElementById('soundToggle'));
        try {
            document.dispatchEvent(new CustomEvent('soundchange', { detail: { enabled: enabled } }));
        } catch (e) {}
    }

    function dismissHint() {
        var tip = document.getElementById('soundToggleTip');
        if (hintTimer) {
            clearTimeout(hintTimer);
            hintTimer = null;
        }
        if (tip) {
            tip.classList.remove('is-visible');
            tip.setAttribute('hidden', '');
        }
        try { localStorage.setItem(HINT_STORAGE_KEY, 'seen'); } catch (e) {}
    }

    function showFirstVisitHint(btn) {
        var tip = document.getElementById('soundToggleTip');
        if (!tip || !btn) return;
        try {
            if (localStorage.getItem(HINT_STORAGE_KEY) === 'seen') return;
        } catch (e) {}

        var labels = LABELS[getLang()];
        tip.textContent = labels.hint;
        tip.removeAttribute('hidden');
        requestAnimationFrame(function () {
            tip.classList.add('is-visible');
        });

        hintTimer = setTimeout(dismissHint, 5200);
        btn.addEventListener('click', dismissHint, { once: true });
    }

    function init() {
        enabled = readStored();
        var btn = document.getElementById('soundToggle');
        if (!btn) return;

        setEnabled(enabled, true);
        btn.addEventListener('click', function () {
            setEnabled(!enabled);
        });

        document.addEventListener('languagechange', function () {
            updateButton(btn);
            var tip = document.getElementById('soundToggleTip');
            if (tip && tip.classList.contains('is-visible')) {
                tip.textContent = LABELS[getLang()].hint;
            }
        });

        setTimeout(function () {
            showFirstVisitHint(btn);
        }, 1400);
    }

    window.KatTeamSound = {
        isEnabled: isEnabled,
        setEnabled: setEnabled
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
