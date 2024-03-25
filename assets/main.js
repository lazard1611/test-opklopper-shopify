function isFunction(func) {
    return func instanceof Function;
}

const pageLoad = (cb) => {
    if (!cb && !isFunction(cb)) return;
    window.addEventListener('load', cb);
};

const fadeAnimation = () => {
    const SELECTORS = {
        el: '.js-fade-el',
    };

    gsap.registerPlugin(ScrollTrigger);

    const $fadeEl = document.querySelectorAll(SELECTORS.el);
    if ($fadeEl.length) {
        gsap.set($fadeEl, {
            y: 20,
            opacity: 0,
        });

        ScrollTrigger.batch($fadeEl, {
            start: 'top 85%',
            once: true,
            onEnter: (batch) =>
                gsap.to(batch, {
                    duration: 0.4,
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    ease: 'none',
                }),
        });
    }
};

pageLoad(() => {
    document.body.classList.add('body--loaded');
    fadeAnimation();
});

