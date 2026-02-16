(function () {
    var carousels = document.querySelectorAll('.gallery-carousel');
    
    if (!carousels.length) return;

    carousels.forEach(function (carousel) {
        var galleryId = carousel.getAttribute('data-gallery');
        var track = carousel.querySelector('.gallery-carousel__track');
        var items = carousel.querySelectorAll('.gallery-carousel__item');
        var prevBtn = carousel.querySelector('.gallery-carousel__btn--prev[data-gallery="' + galleryId + '"]');
        var nextBtn = carousel.querySelector('.gallery-carousel__btn--next[data-gallery="' + galleryId + '"]');
        var currentSpan = carousel.querySelector('.gallery-carousel__current');
        var totalSpan = carousel.querySelector('.gallery-carousel__total');

        if (!track || !items.length) return;

        var currentIndex = 0;
        var totalItems = items.length;

        // Set total count
        if (totalSpan) {
            totalSpan.textContent = totalItems;
        }

        function updateCarousel() {
            // No horizontal translation - all items stay in the same position
            // Update stacked effect - add classes to items to show/hide images in stack
            items.forEach(function (item, index) {
                // Remove all stack classes and reset styles
                item.classList.remove('stack-current', 'stack-prev', 'stack-next', 'stack-behind');
                item.style.opacity = '';
                item.style.zIndex = '';
                item.style.pointerEvents = '';
                item.style.transform = '';

                var diff = index - currentIndex;
                
                if (diff === 0) {
                    // Current image - on top
                    item.classList.add('stack-current');
                } else if (diff === -1) {
                    // Previous image - behind left
                    item.classList.add('stack-prev');
                } else if (diff === 1) {
                    // Next image - behind right
                    item.classList.add('stack-next');
                } else if (Math.abs(diff) <= 3) {
                    // Show up to 3 images behind on each side
                    item.classList.add('stack-behind');
                    // Adjust opacity and scale based on distance
                    var isMobile = window.innerWidth <= 768;
                    var maxBehind = isMobile ? 2 : 3; // Show fewer on mobile
                    
                    if (Math.abs(diff) <= maxBehind) {
                        var scale = 1 - (Math.abs(diff) - 2) * 0.1;
                        var opacity = isMobile ? (0.2 - (Math.abs(diff) - 2) * 0.05) : (0.3 - (Math.abs(diff) - 2) * 0.1);
                        item.style.opacity = Math.max(0.1, opacity);
                        item.style.transform = 'translate(-50%, -50%) scale(' + Math.max(0.7, scale) + ')';
                    } else {
                        // Hide on mobile if beyond maxBehind
                        item.style.opacity = '0';
                        item.style.zIndex = '-1';
                        item.style.pointerEvents = 'none';
                    }
                } else {
                    // Hidden images - completely hidden
                    item.style.opacity = '0';
                    item.style.zIndex = '-1';
                    item.style.pointerEvents = 'none';
                }
            });
            
            if (currentSpan) {
                currentSpan.textContent = currentIndex + 1;
            }

            // Update button states
            if (prevBtn) {
                prevBtn.disabled = currentIndex === 0;
                prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
                prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
            }
            if (nextBtn) {
                nextBtn.disabled = currentIndex === totalItems - 1;
                nextBtn.style.opacity = currentIndex === totalItems - 1 ? '0.5' : '1';
                nextBtn.style.cursor = currentIndex === totalItems - 1 ? 'not-allowed' : 'pointer';
            }
        }

        function goToNext() {
            if (currentIndex < totalItems - 1) {
                currentIndex++;
                updateCarousel();
            }
        }

        function goToPrev() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }

        // Button event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                goToNext();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                goToPrev();
            });
        }

        // Keyboard navigation - only for the carousel in view
        var keyboardHandler = function (e) {
            var gallerySection = document.getElementById('gallery');
            if (!gallerySection) return;

            var rect = carousel.getBoundingClientRect();
            var isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (!isVisible) return;

            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                // Check if this carousel is the one in focus
                var activeCarousel = document.querySelector('.gallery-carousel[data-focused="true"]');
                if (activeCarousel !== carousel) return;

                e.preventDefault();
                if (e.key === 'ArrowRight') {
                    goToNext();
                } else if (e.key === 'ArrowLeft') {
                    goToPrev();
                }
            }
        };

        document.addEventListener('keydown', keyboardHandler);

        // Initialize
        updateCarousel();

        // Update on resize to adapt to mobile/desktop
        var resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                updateCarousel();
            }, 150);
        });

        // Auto-focus carousel when it comes into view
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    // Remove focus from other carousels
                    document.querySelectorAll('.gallery-carousel').forEach(function (c) {
                        c.removeAttribute('data-focused');
                    });
                    carousel.setAttribute('data-focused', 'true');
                }
            });
        }, { threshold: 0.3 });

        observer.observe(carousel);
    });
})();
