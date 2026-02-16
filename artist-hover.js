(function () {
    'use strict';

    function playClickSound() {
        try {
            var C = typeof AudioContext !== 'undefined' ? AudioContext : (window.webkitAudioContext || window.AudioContext);
            if (!C) return;
            var ctx = new C();
            var now = ctx.currentTime;
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.start(now);
            osc.stop(now + 0.05);
        } catch (e) {}
    }

    var ARTIST_VISUALS = {
        dj: function () {
            var wrap = document.createElement('div');
            wrap.className = 'artist-hover-visual artist-hover-visual--dj';
            wrap.setAttribute('aria-hidden', 'true');
            wrap.innerHTML = '<svg class="artist-hover-djboard" viewBox="0 0 80 36" xmlns="http://www.w3.org/2000/svg">' +
                '<ellipse cx="18" cy="18" rx="14" ry="14" fill="none" stroke="currentColor" stroke-width="2" class="artist-hover-deck"/>' +
                '<circle cx="18" cy="18" r="4" fill="currentColor" class="artist-hover-deck-center"/>' +
                '<ellipse cx="62" cy="18" rx="14" ry="14" fill="none" stroke="currentColor" stroke-width="2" class="artist-hover-deck"/>' +
                '<circle cx="62" cy="18" r="4" fill="currentColor" class="artist-hover-deck-center"/>' +
                '<rect x="34" y="8" width="12" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="2" class="artist-hover-mixer"/>' +
                '<circle cx="40" cy="14" r="1.5" fill="currentColor"/>' +
                '<circle cx="40" cy="20" r="1.5" fill="currentColor"/>' +
                '<circle cx="40" cy="26" r="1.5" fill="currentColor"/>' +
                '</svg>';
            return wrap;
        },
        singer: function () {
            var wrap = document.createElement('div');
            wrap.className = 'artist-hover-visual artist-hover-visual--singer';
            wrap.setAttribute('aria-hidden', 'true');
            var notes = ['\u266A', '\u266B', '\u266A', '\u266B', '\u266C'];
            notes.forEach(function (note, i) {
                var span = document.createElement('span');
                span.className = 'artist-hover-note';
                span.style.setProperty('--i', i);
                span.textContent = note;
                wrap.appendChild(span);
            });
            return wrap;
        },
        mc: function () {
            var wrap = document.createElement('div');
            wrap.className = 'artist-hover-visual artist-hover-visual--mc';
            wrap.setAttribute('aria-hidden', 'true');
            for (var i = 0; i < 3; i++) {
                var face = document.createElement('span');
                face.className = 'artist-hover-smile';
                face.style.setProperty('--i', i);
                face.innerHTML = '<svg viewBox="0 0 24 24" class="artist-hover-smile-svg"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="10" r="1.2" fill="currentColor" class="artist-hover-eye artist-hover-eye--left"/><circle cx="16" cy="10" r="1.2" fill="currentColor" class="artist-hover-eye artist-hover-eye--right"/><path d="M8 15 Q12 19 16 15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
                wrap.appendChild(face);
            }
            return wrap;
        }
    };

    function onEnter(ev) {
        var link = ev.currentTarget;
        var role = link.getAttribute('data-artist');
        if (!role) return;
        /* Remove any hover visual from other buttons so only this one shows */
        var container = link.parentNode;
        if (container) {
            var siblings = container.querySelectorAll('.artist-link');
            siblings.forEach(function (other) {
                if (other !== link) {
                    var otherVisual = other.querySelector('.artist-hover-visual');
                    if (otherVisual) otherVisual.remove();
                }
            });
        }
        if (link.querySelector('.artist-hover-visual')) return;
        var fn = ARTIST_VISUALS[role];
        if (!fn) return;
        var el = fn();
        link.insertBefore(el, link.firstChild);
    }

    function onLeave(ev) {
        var link = ev.currentTarget;
        var visual = link.querySelector('.artist-hover-visual');
        if (visual) visual.remove();
    }

    function pauseAllArtistVideos() {
        var section = document.getElementById('artists');
        if (!section) return;
        var videos = section.querySelectorAll('.artist-block__video');
        videos.forEach(function (video) {
            if (!video.paused) {
                video.pause();
            }
        });
    }

    function setupArtistVideoPauseOnLeave() {
        var section = document.getElementById('artists');
        if (!section || typeof IntersectionObserver === 'undefined') return;
        var videos = section.querySelectorAll('.artist-block__video');
        var sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.intersectionRatio <= 0.15) {
                    pauseAllArtistVideos();
                }
            });
        }, { threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.5, 1] });
        sectionObserver.observe(section);
        videos.forEach(function (video) {
            var videoObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting && !video.paused) {
                        video.pause();
                    }
                });
            }, { threshold: 0 });
            videoObserver.observe(video);
        });
    }

    function init() {
        var links = document.querySelectorAll('.artist-link[data-artist]');
        links.forEach(function (a) {
            a.addEventListener('mouseenter', onEnter);
            a.addEventListener('mouseleave', onLeave);
            a.addEventListener('click', function () { playClickSound(); });
        });
        setupArtistVideoPauseOnLeave();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
