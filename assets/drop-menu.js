const dropMenu = () => {
    const SELECTORS = {
        button: '.js-drop-menu',
        parentButton: '.drop',
    };

    const CLASSNAME = {
        activeClass: 'drop--active_state',
    };

    const $buttons = document.querySelectorAll(SELECTORS.button);
    if (!$buttons.length) return;
    let currentPopup = null;

    const handleOutsideClick = (e) => {
        if (!currentPopup?.contains(e.target)) {
            currentPopup.classList.remove(CLASSNAME.activeClass);
            document.documentElement.removeEventListener('click', handleOutsideClick);
        }
    };

    $buttons.forEach(($button) => {
        const $parentBtn = $button.closest(SELECTORS.parentButton);
        if (!$parentBtn) return;

        $button.addEventListener('click', (e) => {
            e.preventDefault();
            if ($parentBtn.classList.contains(CLASSNAME.activeClass)) {
                $parentBtn.classList.remove(CLASSNAME.activeClass);
                document.documentElement.removeEventListener('click', handleOutsideClick);
            } else {
                $parentBtn.classList.add(CLASSNAME.activeClass);
                document.documentElement.addEventListener('click', handleOutsideClick);
                if (currentPopup !== $parentBtn) {
                    currentPopup?.classList.remove(CLASSNAME.activeClass);
                }
                currentPopup = $parentBtn;
            }
        });
    });
};

dropMenu();
