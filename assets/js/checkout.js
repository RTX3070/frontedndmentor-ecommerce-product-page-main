export const createCheckout = () => {
    const cartCounter = document.querySelector('header .user-cart .cart .cart-counter');
    const quantityInput = document.querySelector('main .product .add-cart .cart-input .quantity input[type="number"]');
    const cartEl = document.querySelector('header .user-cart .cart');
    const newPrice = document.querySelector('main .product .add-cart .price .new');

    const checkoutEl = document.createElement('div');
    checkoutEl.classList.add('checkout');

    const headerEl = document.createElement('header');
    const cartTitle = document.createElement('h4');
    cartTitle.textContent = 'Cart';
    headerEl.appendChild(cartTitle);

    const checkoutInfosEl = document.createElement('div');
    checkoutInfosEl.classList.add('checkout-infos');

    if (cartCounter.textContent !== '') {
        const itemEl = document.createElement('div');
        itemEl.classList.add('item');

        const thumbnailImage = document.createElement('img');
        thumbnailImage.classList.add('item-thumbnail');
        thumbnailImage.src = './assets/images/image-product-1-thumbnail.jpg';
        thumbnailImage.alt = 'item thumbnail';

        const descriptionEl = document.createElement('div');
        descriptionEl.classList.add('description');
        const excerpt = document.createElement('p');
        excerpt.textContent = 'autumn limited edition...';
        const priceQty = document.createElement('p');
        priceQty.classList.add('price-quantity');
        priceQty.innerHTML = `
            ${newPrice.textContent} &times; ${quantityInput.value} <span class="total">&dollar;${parseFloat(newPrice.textContent.split('$')[1]).toFixed(2) * +quantityInput.value}</span>
        `;
        descriptionEl.append(excerpt, priceQty);

        const deleteBtn = document.createElement('span');
        deleteBtn.classList.add('delete-btn');
        const deleteIcon = document.createElement('img');
        deleteIcon.classList.add('icon-delete');
        deleteIcon.src = './assets/images/icon-delete.svg';
        deleteIcon.alt = 'delete icon';
        deleteBtn.appendChild(deleteIcon);

        const checkoutBtn = document.createElement('button');
        checkoutBtn.classList.add('checkout-btn');
        checkoutBtn.textContent = 'Checkout';

        itemEl.append(thumbnailImage, descriptionEl, deleteBtn, checkoutBtn);
        checkoutInfosEl.appendChild(itemEl);
    } else {
        const emptyCart = document.createElement('p');
        emptyCart.textContent = 'Your cart is empty.';

        checkoutInfosEl.appendChild(emptyCart);
    }

    checkoutEl.append(headerEl, checkoutInfosEl);
    cartEl.insertAdjacentElement('beforebegin', checkoutEl);
};