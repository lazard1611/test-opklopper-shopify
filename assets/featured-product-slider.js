const slider = () => {
    const SELECTORS = {
        mainSlider: '.js-product-slider',
        nextBtn: '.js-product-btn-next',
        prevBtn: '.js-product-btn-prev',
        thumbSlider: '.js-product-thumb',
        nextBtnThumb: '.js-thumb-btn-next',
        prevBtnThumb: '.js-thumb-btn-prev',
    }

    const $mainSlider = document.querySelector(SELECTORS.mainSlider);
    const $thumbSlider = document.querySelector(SELECTORS.thumbSlider);
    if (!$mainSlider || !$thumbSlider) return;
    console.log('init slider');

    Fancybox.bind('[data-fancybox="gallery"]', {
        on: {
            'Carousel.change': (fancybox, carousel, slide) => {
                swiperMain.slideTo(slide);
            },
        },
    });

    const swiperThumb = new Swiper($thumbSlider, {
        loop: false,
        spaceBetween: 8,
        slideToClickedSlide: true,
        freeMode: true,
        direction: "vertical",
        slidesPerView: 3,
    });

    const swiperMain = new Swiper($mainSlider, {
        // modules: [Navigation, Thumbs],
        loop: false,
        freeMode: true,
        zoom: false,
        thumbs: {
            swiper: swiperThumb
        },

        navigation: {
            nextEl: SELECTORS.nextBtn,
            prevEl: SELECTORS.prevBtn,
        },
    });

    const $nextBtnThumb = document.querySelector(SELECTORS.nextBtnThumb);
    const $prevBtnThumb = document.querySelector(SELECTORS.prevBtnThumb);

    if ($nextBtnThumb && $prevBtnThumb) {
        $nextBtnThumb.addEventListener('click', () => swiperMain.slideNext());
        $prevBtnThumb.addEventListener('click', () => swiperMain.slidePrev());
    }
};

slider();
