document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSubtotalElement = document.getElementById('cart-subtotal');
    const cartTotalElement = document.getElementById('cart-total');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const checkoutContainer = document.getElementById('checkout-container');
    const cartHeader = document.getElementById('cart-header');

    let cart = [];

    try {
        cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    } catch (e) {
        console.error("Error parsing shopping cart from localStorage", e);
        cart = [];
    }

    const saveCart = () => {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        // Removed: document.dispatchEvent(new CustomEvent('cartUpdated'));
        // Call global function to update header count
        if (window.updateCartCountHeader) {
            window.updateCartCountHeader();
        }
    };

    const renderCart = () => {
        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            if(emptyCartMessage) emptyCartMessage.classList.remove('hidden');
            if(checkoutContainer) checkoutContainer.classList.add('hidden');
            if(cartHeader) cartHeader.classList.add('hidden');
            updateTotals();
            return;
        }

        if(emptyCartMessage) emptyCartMessage.classList.add('hidden');
        if(checkoutContainer) checkoutContainer.classList.remove('hidden');
        if(cartHeader) cartHeader.classList.remove('hidden');

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'grid grid-cols-12 gap-2 sm:gap-4 items-center py-4 border-b border-secondary-200 dark:border-secondary-700';
            
            const imageUrl = item.id === '2' ? '../public/neon-nights-dress.jpg' : 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3';
            
            itemElement.innerHTML = `
                <div class="col-span-12 sm:col-span-6 flex items-center">
                    <img src="${imageUrl}" alt="${item.name}" class="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded-md shrink-0">
                    <div class="ml-4">
                        <h3 class="font-semibold text-base sm:text-lg text-secondary-900 dark:text-white break-words">${item.name}</h3>
                        <p class="text-sm text-secondary-600 dark:text-secondary-400">€${parseFloat(item.price).toFixed(2)}</p>
                        <button class="remove-item-btn text-sm font-medium text-red-600 bg-red-100 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900/80 px-2 py-1 rounded-md mt-2" data-product-id="${item.id}">Entfernen</button>
                    </div>
                </div>

                <div class="col-span-6 sm:col-span-3 flex justify-start sm:justify-center items-center">
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input w-20 text-center border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 rounded-md p-2" data-product-id="${item.id}">
                </div>

                <div class="col-span-6 sm:col-span-3 text-right font-semibold text-base sm:text-lg text-secondary-900 dark:text-white">
                    €${(item.price * item.quantity).toFixed(2)}
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        updateTotals();
    };

    const updateTotals = () => {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = 0;
        const total = subtotal + shipping;

        if (cartSubtotalElement) cartSubtotalElement.textContent = `€${subtotal.toFixed(2)}`;
        if (cartTotalElement) cartTotalElement.textContent = `€${total.toFixed(2)}`;
    };

    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (e) => {
            if (e.target.closest('.remove-item-btn')) {
                const productId = e.target.closest('.remove-item-btn').dataset.productId;
                cart = cart.filter(item => item.id !== productId);
                saveCart();
                renderCart();
            }
        });

        cartItemsContainer.addEventListener('change', (e) => {
            if (e.target.closest('.quantity-input')) {
                const input = e.target.closest('.quantity-input');
                const productId = input.dataset.productId;
                const newQuantity = parseInt(input.value, 10);
                const itemInCart = cart.find(item => item.id === productId);

                if (itemInCart && newQuantity > 0) {
                    itemInCart.quantity = newQuantity;
                    saveCart();
                    renderCart();
                } else if (itemInCart) {
                    input.value = itemInCart.quantity;
                }
            }
        });
    }

    renderCart();
});