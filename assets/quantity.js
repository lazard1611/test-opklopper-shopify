const quantity = () => {
    const SELECTORS = {
        qty: '.js-quantity',
        value: '.js-quantity-value',
        input: '.js-quantity-input',
        increase: '.js-quantity-increase',
        decrease: '.js-quantity-decrease',
    };

    const $qtyAll = document.querySelectorAll(SELECTORS.qty);
    $qtyAll.forEach(($qty) => {
        const $input = $qty.querySelector(SELECTORS.input);
        const $value = $qty.querySelector(SELECTORS.value);
        const $decrease = $qty.querySelector(SELECTORS.decrease);
        const $increase = $qty.querySelector(SELECTORS.increase);

        if (!$input || !$value || !$decrease || !$increase) return;

        const maxVal = Number($input.getAttribute('max')) || 99999;
        const minVal = Number($input.getAttribute('min')) || 1;
        let currentVal = Number($input.value);

        const isMod = () => {
            if ($qty.classList.contains('js-quantity-mod')) {
                return true;
            } else {
                return false;
            }
        }

        $value.textContent = isMod() ? `${currentVal}”` : currentVal;

        const updateContent = () => {
            $value.textContent = isMod() ? `${currentVal}”` : currentVal;
            $input.value = currentVal;
        };

        const handleDecrease = () => {
            if (currentVal === minVal) return;
            currentVal -= 1;
            updateContent();
        };
        const handleIncrease = () => {
            if (currentVal === maxVal) return;
            currentVal += 1;
            updateContent();
        };

        $increase.addEventListener('click', handleIncrease);
        $decrease.addEventListener('click', handleDecrease);
    });
};

quantity();
