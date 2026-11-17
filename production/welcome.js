(function () {
    'use strict';

    var WELCOME_DURATION_MS = 5000;
    var ENJOY_DURATION_MS = 15000;
    var LEAVE_ANIMATION_MS = 650;
    var REPEAT_DELAY_MS = 600;

    var wrap = document.getElementById('welcomeWrap');
    var heroEl = document.getElementById('home');
    var sparklesContainer = document.getElementById('welcomeSparkles');
    var welcomeLine = document.getElementById('welcomeLine');
    var enjoyLine = document.getElementById('enjoyLine');
    var fallingSparksEl = document.getElementById('fallingSparks');

    if (!wrap || !sparklesContainer || !welcomeLine || !enjoyLine || !fallingSparksEl) return;

    function prefersReducedMotion() {
        try {
            return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        } catch (e) {
            return false;
        }
    }

    function isMobileViewport() {
        return window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
    }

    var leaveTimeoutId = null;
    var enjoyTimeoutId = null;
    var fallingSparksAnimationId = null;
    var fallingParticles = [];

    function getHeroSize() {
        var el = heroEl || fallingSparksEl;
        var rect = el.getBoundingClientRect();
        return {
            width: rect.width || window.innerWidth,
            height: rect.height || window.innerHeight
        };
    }

    function createSparkles() {
        sparklesContainer.innerHTML = '';
        if (prefersReducedMotion()) {
            return;
        }
        var size = getHeroSize();
        var areaFactor = Math.max(1, (size.width * size.height) / (900 * 700));
        var count = Math.round((isMobileViewport() ? 55 : 110) * Math.min(areaFactor, 1.85));
        for (var i = 0; i < count; i++) {
            var dot = document.createElement('span');
            var r = Math.random();
            dot.className = 'sparkle-dot' +
                (r < 0.08 ? ' sparkle-dot--extra-bright' : r < 0.28 ? ' sparkle-dot--bright-blink' : '');
            dot.setAttribute('aria-hidden', 'true');
            var x = 2 + Math.random() * 96;
            var y = 2 + Math.random() * 96;
            dot.style.left = x + '%';
            dot.style.top = y + '%';
            dot.style.transformOrigin = 'center';
            var dotSize = 8 + Math.random() * 14;
            dot.style.width = dotSize + 'px';
            dot.style.height = dotSize + 'px';
            dot.style.marginLeft = '-' + (dotSize / 2) + 'px';
            dot.style.marginTop = '-' + (dotSize / 2) + 'px';
            dot.style.animationDelay = (Math.random() * 1.5) + 's';
            sparklesContainer.appendChild(dot);
        }
    }

    var FALLING_STAR_TAIL = 100;
    var FALLING_STAR_TAIL_LONG = 165;

    function createFallingSpark() {
        var spark = document.createElement('span');
        var r = Math.random();
        var longTail = r < 0.24;
        var tailLen = longTail ? FALLING_STAR_TAIL_LONG : FALLING_STAR_TAIL;
        var r2 = Math.random();
        spark.className = 'falling-spark' +
            (longTail ? ' falling-spark--long-tail' : '') +
            (r2 < 0.25 ? ' falling-spark--bright' : r2 < 0.5 ? ' falling-spark--dim' : '');
        spark.setAttribute('aria-hidden', 'true');
        var heroSize = getHeroSize();
        var w = heroSize.width;
        var x = Math.random() * w;
        var y = -tailLen - Math.random() * 60;
        var speed = longTail ? (0.75 + Math.random() * 0.5) : (1.4 + Math.random() * 2);
        var drift = (Math.random() - 0.5) * 0.5;
        spark.style.left = x + 'px';
        spark.style.top = (y - tailLen) + 'px';
        fallingSparksEl.appendChild(spark);
        return { el: spark, y: y, x: x, speed: speed, drift: drift, tailLength: tailLen };
    }

    function runFallingSparks() {
        function tick() {
            if (!wrap.classList.contains('is-enjoy') || !wrap.classList.contains('is-visible')) {
                return;
            }
            fallingSparksAnimationId = requestAnimationFrame(tick);

            var height = getHeroSize().height;
            var toRemove = [];
            for (var i = 0; i < fallingParticles.length; i++) {
                var p = fallingParticles[i];
                p.y += p.speed;
                p.x += p.drift;
                p.el.style.top = (p.y - p.tailLength) + 'px';
                p.el.style.left = p.x + 'px';
                var opacity = 1 - (p.y / height) * 0.92;
                p.el.style.opacity = opacity > 0 ? opacity : 0;
                if (p.y > height + p.tailLength) {
                    toRemove.push(i);
                    p.el.remove();
                }
            }
            for (var j = toRemove.length - 1; j >= 0; j--) {
                fallingParticles.splice(toRemove[j], 1);
            }
            var spawnChance = isMobileViewport() ? 0.16 : 0.28;
            if (Math.random() < spawnChance) {
                fallingParticles.push(createFallingSpark());
            }
        }
        tick();
    }

    function stopFallingSparks() {
        if (fallingSparksAnimationId) {
            cancelAnimationFrame(fallingSparksAnimationId);
            fallingSparksAnimationId = null;
        }
        fallingSparksEl.innerHTML = '';
        fallingParticles = [];
    }

    function showWelcome() {
        wrap.classList.remove('is-enjoy');
        wrap.setAttribute('aria-hidden', 'false');
        createSparkles();
        stopFallingSparks();
        wrap.offsetHeight;
        wrap.classList.add('is-visible');
    }

    function showEnjoy() {
        wrap.classList.add('is-enjoy');
        wrap.setAttribute('aria-hidden', 'false');
        sparklesContainer.innerHTML = '';
        wrap.offsetHeight;
        wrap.classList.add('is-visible');
        if (prefersReducedMotion()) {
            return;
        }
        var initialStars = isMobileViewport() ? 18 : 36;
        for (var i = 0; i < initialStars; i++) {
            fallingParticles.push(createFallingSpark());
        }
        runFallingSparks();
    }

    function hideAndSwitchToEnjoy() {
        wrap.classList.add('is-leaving');
        leaveTimeoutId = window.setTimeout(function () {
            wrap.classList.remove('is-visible', 'is-leaving');
            wrap.offsetHeight;
            showEnjoy();
            enjoyTimeoutId = window.setTimeout(function () {
                hideAndSwitchToWelcome();
            }, ENJOY_DURATION_MS);
        }, LEAVE_ANIMATION_MS);
    }

    function hideAndSwitchToWelcome() {
        stopFallingSparks();
        wrap.classList.add('is-leaving');
        leaveTimeoutId = window.setTimeout(function () {
            wrap.classList.remove('is-visible', 'is-leaving', 'is-enjoy');
            wrap.setAttribute('aria-hidden', 'true');
            wrap.offsetHeight;
            window.setTimeout(function () {
                showWelcome();
                leaveTimeoutId = window.setTimeout(hideAndSwitchToEnjoy, WELCOME_DURATION_MS);
            }, REPEAT_DELAY_MS);
        }, LEAVE_ANIMATION_MS);
    }

    function start() {
        wrap.setAttribute('aria-hidden', 'true');
        window.setTimeout(function () {
            showWelcome();
            leaveTimeoutId = window.setTimeout(hideAndSwitchToEnjoy, WELCOME_DURATION_MS);
        }, 800);
    }

    start();
})();
