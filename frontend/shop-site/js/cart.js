document.addEventListener('DOMContentLoaded', () => {
    const cartCountElement = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    let cart = []; // This local 'cart' variable is only used by addToCart

    // Safely load cart from localStorage for initial setup
    try {
        cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    } catch (e) {
        console.error("Error parsing shopping cart from localStorage", e);
        cart = [];
    }

    const updateCartCountHeader = () => {
        // Always read the latest cart from localStorage
        let currentCart = [];
        try {
            currentCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        } catch (e) {
            console.error("Error parsing shopping cart from localStorage for header update", e);
            currentCart = [];
        }

        const totalItems = currentCart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
            cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    };

    // Make updateCartCountHeader globally accessible
    window.updateCartCountHeader = updateCartCountHeader;

    const addToCart = (productId, productName, productPrice) => {
        // Ensure 'cart' variable in this scope is up-to-date before modifying
        try {
            cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        } catch (e) {
            console.error("Error parsing shopping cart from localStorage for addToCart", e);
            cart = [];
        }

        const existingProductIndex = cart.findIndex(item => item.id === productId);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }
        
        console.log(`${productName} was added to the cart.`);
        localStorage.setItem('shoppingCart', JSON.stringify(cart)); // Save changes
        updateCartCountHeader(); // Update header after saving
    };

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const token = localStorage.getItem('token');
            if (!token) {
                if (window.showAuthModal) {
                    window.showAuthModal();
                } else {
                    alert('Bitte melden Sie sich an, um Artikel zum Warenkorb hinzuzufügen.');
                }
                return;
            }

            const productCard = event.target.closest('.card-product');
            if (productCard) {
                const productId = productCard.dataset.productId;
                const productName = productCard.dataset.productName;
                const productPrice = parseFloat(productCard.dataset.productPrice);

                if (productId && productName && productPrice) {
                    addToCart(productId, productName, productPrice);
                }
            }
        });
    });

    // Initial update of the cart count when the page loads
    updateCartCountHeader();
});
