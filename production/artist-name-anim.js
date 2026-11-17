(function () {
    var names = document.querySelectorAll('.artist-name');
    names.forEach(function (el) {
        el.addEventListener('mouseenter', function () {
            el.classList.remove('artist-name--animating');
            el.offsetHeight;
            el.classList.add('artist-name--animating');
        });
        el.addEventListener('mouseleave', function () {
            el.classList.remove('artist-name--animating');
        });
    });
})();
