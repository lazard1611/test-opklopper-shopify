function isFunction(func) {
    return func instanceof Function;
}

const pageLoad = (cb) => {
    if (!cb && !isFunction(cb)) return;
    window.addEventListener('load', cb);
};

pageLoad(() => {
    document.body.classList.add('body--loaded');
});

