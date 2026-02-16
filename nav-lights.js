(function () {
    'use strict';

    var NOTES = ['\u266A', '\u266B', '\u266C', '\u2669', '\u266A', '\u266B'];
    var notes = [];
    var container = null;
    var headerInner = null;
    var rafId = null;
    var startTime = 0;

    function randomIn(min, max) {
        return min + Math.random() * (max - min);
    }

    function createNote(index, total) {
        var el = document.createElement('span');
        el.className = 'nav-note';
        el.setAttribute('aria-hidden', 'true');
        el.textContent = NOTES[index % NOTES.length];
        var size = 14 + Math.floor(Math.random() * 10);
        el.dataset.size = size;
        el.style.fontSize = size + 'px';
        return el;
    }

    var stageColors = [
        { r: 255, g: 220, b: 50 },
        { r: 180, g: 200, b: 180 },
        { r: 80, g: 140, b: 255 },
        { r: 140, g: 200, b: 255 },
        { r: 255, g: 255, b: 255 },
        { r: 255, g: 200, b: 200 },
        { r: 255, g: 80, b: 80 },
        { r: 255, g: 180, b: 100 }
    ];
    var cycleDuration = 20;

    function lerp(a, b, t) {
        return Math.round(a + (b - a) * t);
    }

    function getColorAtPhase(phase) {
        var n = stageColors.length;
        var seg = phase * n;
        var i0 = Math.floor(seg) % n;
        var i1 = (i0 + 1) % n;
        var t = seg - Math.floor(seg);
        t = t * t * (3 - 2 * t);
        return {
            r: lerp(stageColors[i0].r, stageColors[i1].r, t),
            g: lerp(stageColors[i0].g, stageColors[i1].g, t),
            b: lerp(stageColors[i0].b, stageColors[i1].b, t)
        };
    }

    function animate(t) {
        if (!container || !headerInner) return;
        if (!startTime) startTime = t;
        var time = (t - startTime) * 0.001;
        var rect = headerInner.getBoundingClientRect();
        var width = rect.width;
        var height = rect.height;

        var cyclePhase = (time / cycleDuration) % 1;
        var c = getColorAtPhase(cyclePhase);
        var rs = c.r + ',' + c.g + ',' + c.b;
        var colorStr = 'rgb(' + rs + ')';
        var glowStr = '0 0 12px rgba(' + rs + ',0.7), 0 0 24px rgba(' + rs + ',0.4)';

        for (var i = 0; i < notes.length; i++) {
            var note = notes[i];
            var state = note._state;
            if (!state) continue;

            state.x += state.vx;
            state.y += state.vy;

            if (state.x < -20 || state.x > width + 20) {
                state.vx = -state.vx;
                state.x = state.x < 0 ? -20 : width + 20;
            }
            if (state.y < -10 || state.y > height + 10) {
                state.vy = -state.vy;
                state.y = state.y < 0 ? -10 : height + 10;
            }

            if (Math.random() < 0.008) {
                state.vx += randomIn(-0.6, 0.6);
                state.vy += randomIn(-0.6, 0.6);
                var maxSpeed = 2.8;
                state.vx = Math.max(-maxSpeed, Math.min(maxSpeed, state.vx));
                state.vy = Math.max(-maxSpeed, Math.min(maxSpeed, state.vy));
            }

            state.angle = (state.angle + state.rotSpeed) % 360;
            if (state.canFlip && Math.random() < 0.006) state.flip = -state.flip;
            if (state.canTurn && Math.random() < 0.012) {
                state.rotSpeed += randomIn(-0.4, 0.4);
                state.rotSpeed = Math.max(-0.8, Math.min(0.8, state.rotSpeed));
            }

            note.style.left = state.x + 'px';
            note.style.top = state.y + 'px';
            note.style.transform = 'rotate(' + state.angle + 'deg) scaleX(' + state.flip + ')';
            note.style.color = colorStr;
            note.style.textShadow = glowStr;
        }

        rafId = requestAnimationFrame(animate);
    }

    function init() {
        headerInner = document.querySelector('.header-inner');
        if (!headerInner) return;

        container = document.createElement('div');
        container.className = 'nav-lights-container';
        container.setAttribute('aria-hidden', 'true');

        headerInner.insertBefore(container, headerInner.firstChild);

        var count = 26;
        for (var i = 0; i < count; i++) {
            var note = createNote(i, count);
            container.appendChild(note);
            notes.push(note);
        }

        startTime = 0;
        rafId = requestAnimationFrame(function run(t) {
            if (!container.parentNode) return;
            var rect = headerInner.getBoundingClientRect();
            var w = rect.width;
            var h = rect.height;
            for (var j = 0; j < notes.length; j++) {
                if (!notes[j]._state) {
                    var canFlip = Math.random() < 0.5;
                    var canTurn = Math.random() < 0.55;
                    notes[j]._state = {
                        x: Math.random() * w,
                        y: Math.random() * h,
                        vx: randomIn(0.8, 2.2) * (Math.random() > 0.5 ? 1 : -1),
                        vy: randomIn(0.5, 1.8) * (Math.random() > 0.5 ? 1 : -1),
                        angle: Math.random() * 360,
                        rotSpeed: canTurn ? randomIn(-0.35, 0.35) : randomIn(-0.12, 0.12),
                        flip: canFlip && Math.random() < 0.5 ? -1 : 1,
                        canFlip: canFlip,
                        canTurn: canTurn
                    };
                }
            }
            animate(t);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
