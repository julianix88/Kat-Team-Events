(function () {
    var videos = document.querySelectorAll(".artist-block__video[data-src]");
    if (!videos.length || !("IntersectionObserver" in window)) {
        videos.forEach(function (video) {
            var src = video.getAttribute("data-src");
            if (src && !video.getAttribute("src")) {
                video.src = src;
            }
        });
        return;
    }

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;

                var video = entry.target;
                var src = video.getAttribute("data-src");
                if (src) {
                    video.src = src;
                    video.removeAttribute("data-src");
                }
                observer.unobserve(video);
            });
        },
        { rootMargin: "240px 0px", threshold: 0.01 }
    );

    videos.forEach(function (video) {
        observer.observe(video);
    });
})();
