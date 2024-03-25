function debounce(delay, fn) {
    let timerId;
    return (...args) => {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            fn(...args);
            timerId = null;
        }, delay);
    };
}

function isFunction(func) {
    return func instanceof Function;
}

const onWindowResize = (cb) => {
    if (!cb && !isFunction(cb)) return;

    const handleResize = () => {
        cb();
    };

    window.addEventListener('resize', debounce(15, handleResize));

    handleResize();
};


const showMoreAndLess = () => {
    const SELECTORS = {
        container: '.js-hidden-text-container',
        text: '.js-hidden-text',
        btn: '.js-hidden-text-btn',
    }

    const $containers = document.querySelectorAll(SELECTORS.container);
    if (!$containers.length) return;

    let isMobileScreen = false;
    let ellipsis = '...';

    $containers.forEach(container => {
        const $text = container.querySelector(SELECTORS.text);
        const $btn = container.querySelector(SELECTORS.btn);
        const firstTag = container.querySelector(`${SELECTORS.text} p:first-child`);
        if (!firstTag) return;

        let shortText = '';
        const getDataValue = parseInt($text.getAttribute('data-max-text'));
        const getDataPoint = parseInt($text.getAttribute('data-media-point'));
        const getDataEllipse = $text.getAttribute('data-ellipse-disable');

        const maxLength = getDataValue || 20;
        const mediaPoint = getDataPoint;
        ellipsis = getDataEllipse ? '' : '...';

        const longText = firstTag.textContent;
        $text.style.transition= 'all 0.25s ease-out';
        $text.style.overflow= 'hidden';

        if (longText.length > maxLength) {
            shortText = longText.substring(0, maxLength);
            shortText = shortText.substring(0, Math.min(shortText.length, shortText.lastIndexOf(' ')));
        } else {
            shortText = longText;
        }

        const clickHandler = (e) => {
            e.stopPropagation();
            container.classList.toggle('active');
            ellipsis = getDataEllipse ? '' : '...';

            if (e.target.textContent === 'Show more') {
                e.target.textContent = 'Show less';
                firstTag.textContent = longText;
                setTimeout(() => {
                    $text.style.height = `${$text.scrollHeight}px`
                }, 10);
            } else {
                e.target.textContent = 'Show more';
                firstTag.textContent = `${shortText}${ellipsis}`;
                setTimeout(() => {
                    $text.style.height = `${firstTag.scrollHeight}px`;
                }, 10);
            }
        };

        const handlerTextHidden = () => {
            firstTag.textContent = `${shortText}${ellipsis}`;

            $btn.addEventListener('click', clickHandler);
        }

        const killTextHidden = () => {
            firstTag.textContent = longText;
            $text.style.height = 'auto';

            $btn.removeEventListener('click', clickHandler);
        }

        if (mediaPoint) {
            const getRespons = () => {
                let windowWidth = window.innerWidth;
                if (windowWidth < mediaPoint) {
                    isMobileScreen = true;
                    handlerTextHidden();
                } else {
                    isMobileScreen = false;
                }
            };

            getRespons();

            onWindowResize(() => {
                let windowWidth = window.innerWidth;
                if (windowWidth < mediaPoint) {
                    $text.style.height = `${firstTag.scrollHeight}px`;

                    if (!isMobileScreen) {
                        isMobileScreen = true;
                        handlerTextHidden();
                    }
                } else {
                    if (isMobileScreen) {
                        isMobileScreen = false;
                        killTextHidden();
                    }
                }
            });
        } else {
            onWindowResize(() => {
                $text.style.height = `${firstTag.offsetHeight}px`;
            });
            handlerTextHidden();
        }
    });
}

showMoreAndLess();
