(function () {
    var titles = document.querySelectorAll('.gallery-section__title[data-typing-text]');
    
    if (!titles.length) return;
    
    // Create audio context for elegant typing sounds
    var audioContext = null;
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.log('Web Audio API not supported');
    }
    
    // Check if Gallery section is visible
    function isGallerySectionVisible() {
        var gallerySection = document.getElementById('gallery');
        if (!gallerySection) return false;
        
        var rect = gallerySection.getBoundingClientRect();
        var windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Check if gallery section is in viewport
        return rect.top < windowHeight && rect.bottom > 0;
    }
    
    // Generate mechanical typewriter typing sound
    function playTypingSound() {
        // Only play sound if Gallery section is visible
        if (!audioContext || !isGallerySectionVisible()) return;
        
        try {
            var now = audioContext.currentTime;
            var oscillator = audioContext.createOscillator();
            var gainNode = audioContext.createGain();
            var noise = audioContext.createBufferSource();
            
            // Create a short noise burst for the mechanical click
            var bufferSize = audioContext.sampleRate * 0.01; // 10ms
            var buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
            var data = buffer.getChannelData(0);
            
            for (var i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            
            // Sharp click sound with noise
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Typewriter-like frequency (lower, more mechanical)
            oscillator.frequency.setValueAtTime(120 + Math.random() * 40, now);
            oscillator.type = 'square'; // More mechanical sound
            
            // Sharp attack and quick decay for typewriter click
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.075, now + 0.002);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.015);
            
            oscillator.start(now);
            oscillator.stop(now + 0.015);
            
            // Add subtle noise layer for mechanical feel
            var noiseGain = audioContext.createGain();
            noiseGain.gain.setValueAtTime(0, now);
            noiseGain.gain.linearRampToValueAtTime(0.015, now + 0.001);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.01);
            
            noise.buffer = buffer;
            noise.connect(noiseGain);
            noiseGain.connect(audioContext.destination);
            noise.start(now);
            noise.stop(now + 0.01);
        } catch (e) {
            // Silently fail if audio can't be played
        }
    }
    
    // Store title data and observers
    var titleData = [];
    
    titles.forEach(function (title, index) {
        var text = title.getAttribute('data-typing-text');
        var typingText = title.querySelector('.typing-text');
        var cursor = title.querySelector('.typing-cursor');
        
        if (!typingText || !cursor) return;
        
        var duration = 2500; // 2.5 seconds
        var charCount = text.length;
        var baseDelay = duration / charCount;
        var timeoutIds = [];
        var observer = null;
        var titleState = {
            currentIndex: 0,
            hasAnimated: false,
            timeoutIds: []
        };
        
        // Variable delay for more natural typing rhythm
        function getCharDelay(char, index) {
            // Slightly longer delay for spaces
            if (char === ' ') {
                return baseDelay * 1.5;
            }
            // Slightly longer delay for uppercase letters
            if (char === char.toUpperCase() && char !== char.toLowerCase()) {
                return baseDelay * 1.1;
            }
            // Random variation for natural feel (±10%)
            return baseDelay * (0.9 + Math.random() * 0.2);
        }
        
        function resetAnimation() {
            // Clear any ongoing timeouts
            titleState.timeoutIds.forEach(function(id) {
                clearTimeout(id);
            });
            titleState.timeoutIds = [];
            
            // Reset state
            titleState.currentIndex = 0;
            titleState.hasAnimated = false;
            typingText.textContent = '';
            cursor.style.opacity = '1';
            cursor.style.display = 'inline-block';
            cursor.style.transition = '';
            title.style.opacity = '1';
        }
        
        function typeText() {
            if (titleState.hasAnimated) return;
            titleState.hasAnimated = true;
            
            typingText.textContent = '';
            cursor.style.opacity = '1';
            cursor.style.display = 'inline-block';
            title.style.opacity = '0';
            title.style.transition = 'opacity 0.3s ease';
            
            // Fade in title
            var fadeTimeout = setTimeout(function() {
                title.style.opacity = '1';
            }, 100);
            titleState.timeoutIds.push(fadeTimeout);
            
            function typeChar() {
                // Stop typing if Gallery section is no longer visible
                if (!isGallerySectionVisible()) {
                    return;
                }
                
                if (titleState.currentIndex < charCount) {
                    var char = text[titleState.currentIndex];
                    typingText.textContent += char;
                    
                    // Play typing sound only if Gallery is visible (skip for spaces)
                    if (char !== ' ' && isGallerySectionVisible()) {
                        playTypingSound();
                    }
                    
                    titleState.currentIndex++;
                    var delay = getCharDelay(char, titleState.currentIndex - 1);
                    var charTimeout = setTimeout(typeChar, delay);
                    titleState.timeoutIds.push(charTimeout);
                } else {
                    // Keep cursor visible briefly, then fade out smoothly
                    var cursorTimeout = setTimeout(function() {
                        cursor.style.transition = 'opacity 0.4s ease-out';
                        cursor.style.opacity = '0';
                    }, 800);
                    titleState.timeoutIds.push(cursorTimeout);
                }
            }
            
            // Start typing after a brief pause
            var startTimeout = setTimeout(typeChar, 300);
            titleState.timeoutIds.push(startTimeout);
        }
        
        // Store title data for reuse
        titleData.push({
            title: title,
            text: text,
            typingText: typingText,
            cursor: cursor,
            index: index,
            resetAnimation: resetAnimation,
            typeText: typeText,
            observer: null,
            state: titleState
        });
    });
    
    // Check if Gallery section is visible
    function isGallerySectionVisible() {
        var gallerySection = document.getElementById('gallery');
        if (!gallerySection) return false;
        
        var rect = gallerySection.getBoundingClientRect();
        var windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Check if gallery section is in viewport
        return rect.top < windowHeight && rect.bottom > 0;
    }
    
    // Function to start animations only if Gallery section is visible
    function startAnimations() {
        // Only start if Gallery section is visible
        if (!isGallerySectionVisible()) {
            return;
        }
        
        titleData.forEach(function(data) {
            data.resetAnimation();
            
            // Disconnect old observer if exists
            if (data.observer) {
                data.observer.disconnect();
            }
            
            // Create new observer for this title
            data.observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    // Double check Gallery section is still visible
                    if (entry.isIntersecting && !data.state.hasAnimated && isGallerySectionVisible()) {
                        var delay = data.index * 500; // Stagger animations for multiple titles
                        setTimeout(function() {
                            // Check again before starting animation
                            if (isGallerySectionVisible()) {
                                data.typeText();
                            }
                        }, delay);
                    }
                });
            }, { threshold: 0.3 });
            
            data.observer.observe(data.title);
            
            // Also trigger if already visible and Gallery section is visible
            var rect = data.title.getBoundingClientRect();
            var isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible && isGallerySectionVisible()) {
                var delay = data.index * 500;
                setTimeout(function() {
                    if (isGallerySectionVisible()) {
                        data.typeText();
                    }
                }, delay);
            }
        });
    }
    
    // Stop animations when leaving Gallery section
    function stopAnimations() {
        titleData.forEach(function(data) {
            // Clear all timeouts
            data.state.timeoutIds.forEach(function(id) {
                clearTimeout(id);
            });
            data.state.timeoutIds = [];
            data.state.hasAnimated = false;
            data.state.currentIndex = 0;
            
            // Reset text
            data.typingText.textContent = '';
            data.cursor.style.opacity = '0';
        });
    }
    
    // Monitor Gallery section visibility
    var gallerySection = document.getElementById('gallery');
    if (gallerySection) {
        var galleryObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    // Gallery section is visible, start animations
                    setTimeout(function() {
                        startAnimations();
                    }, 200);
                } else {
                    // Gallery section is not visible, stop animations
                    stopAnimations();
                }
            });
        }, { threshold: 0.1 });
        
        galleryObserver.observe(gallerySection);
    }
    
    // Start animations on page load only if Gallery is visible
    if (isGallerySectionVisible()) {
        startAnimations();
    }
    
    // Restart animations when page becomes visible again, only if Gallery is visible
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden && isGallerySectionVisible()) {
            // Reset and restart animations when user comes back
            setTimeout(function() {
                startAnimations();
            }, 100);
        } else if (document.hidden) {
            // Stop animations when page is hidden
            stopAnimations();
        }
    });
    
    // Also restart on focus (when user switches back to tab), only if Gallery is visible
    window.addEventListener('focus', function() {
        if (isGallerySectionVisible()) {
            setTimeout(function() {
                startAnimations();
            }, 100);
        }
    });
})();
