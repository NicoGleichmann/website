document.addEventListener('DOMContentLoaded', () => {
    // Load favorites and product data from localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let favoritedProductsData = JSON.parse(localStorage.getItem('favoritedProductsData')) || {};

    /**
     * Updates the entire UI related to favorites
     */
    const updateFavoritesUI = () => {
        updateFavoriteButtons();
        updateFavoriteCount();
        renderFavoritesPage();
        renderInspirationFavorites();
    };

    /**
     * Toggles a product in the favorites list
     * @param {string} productId - The ID of the product to toggle
     * @param {HTMLElement} productCard - The product card element
     */
    const toggleFavorite = (productId, productCard) => {
        const index = favorites.indexOf(productId);
        if (index > -1) {
            // Remove from favorites
            favorites.splice(index, 1);
            // Optional: remove product data if no longer favorited anywhere
            // delete favoritedProductsData[productId];
        } else {
            // Add to favorites
            favorites.push(productId);
            // Store product data if it doesn't exist
            if (!favoritedProductsData[productId] && productCard) {
                favoritedProductsData[productId] = {
                    id: productId,
                    name: productCard.dataset.productName,
                    price: productCard.dataset.productPrice,
                    image: productCard.querySelector('img').src,
                    description: productCard.querySelector('p').textContent.trim()
                };
            }
        }
        // Save updated data to localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
        localStorage.setItem('favoritedProductsData', JSON.stringify(favoritedProductsData));
        
        // Update the UI
        updateFavoritesUI();
    };

    /**
     * Updates the appearance of all favorite buttons on the page
     */
    const updateFavoriteButtons = () => {
        document.querySelectorAll('.favorite-btn').forEach(button => {
            const productCard = button.closest('.card-product');
            if (productCard) {
                const productId = productCard.dataset.productId;
                if (favorites.includes(productId)) {
                    button.classList.add('favorited');
                    button.innerHTML = `
                        <svg class="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"/>
                        </svg>`;
                } else {
                    button.classList.remove('favorited');
                    button.innerHTML = `
                        <svg class="w-4 h-4 text-secondary-600 dark:text-secondary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>`;
                }
            }
        });
    };

    /**
     * Updates the favorite count in the header
     */
    const updateFavoriteCount = () => {
        const favoriteCount = document.getElementById('favorite-count');
        if (favoriteCount) {
            favoriteCount.textContent = favorites.length;
            if (favorites.length > 0) {
                favoriteCount.classList.remove('hidden');
            } else {
                favoriteCount.classList.add('hidden');
            }
        }
    };

    /**
     * Renders the favorited products on the favorites page
     */
    const renderFavoritesPage = () => {
        const favoritesContainer = document.getElementById('favorites-container');
        if (!favoritesContainer) return;

        if (favorites.length === 0) {
            favoritesContainer.innerHTML = '<div class="col-span-full text-center"><p class="text-secondary-600 dark:text-secondary-300">Du hast noch keine Favoriten gespeichert.</p></div>';
            return;
        }

        favoritesContainer.innerHTML = '';
        for (const productId of favorites) {
            const productData = favoritedProductsData[productId];
            if (productData) {
                favoritesContainer.innerHTML += createProductCardHTML(productData);
            }
        }
        // After rendering, update the button states within this container
        updateFavoriteButtons();
    };

    /**
     * Renders a selection of favorited products on the inspiration page
     */
    const renderInspirationFavorites = () => {
        const inspirationContainer = document.getElementById('inspiration-favorites-container');
        if (!inspirationContainer) return;

        if (favorites.length === 0) {
            inspirationContainer.innerHTML = '<p class="text-center text-secondary-600 dark:text-secondary-300 col-span-full">Deine Favoriten erscheinen hier, sobald du welche speicherst.</p>';
            return;
        }

        inspirationContainer.innerHTML = '';
        // Show up to 4 favorites
        for (const productId of favorites.slice(0, 4)) {
            const productData = favoritedProductsData[productId];
            if (productData) {
                inspirationContainer.innerHTML += createProductCardHTML(productData);
            }
        }
        // After rendering, update the button states within this container
        updateFavoriteButtons();
    };

    /**
     * Creates the HTML for a product card
     * @param {object} productData - The data for the product
     * @returns {string} - The HTML string for the product card
     */
    const createProductCardHTML = (productData) => {
        return `
        <div class="group card-product bg-white dark:bg-secondary-800 rounded-lg overflow-hidden shadow-subtle hover:shadow-product-card dark:shadow-none dark:border dark:border-transparent dark:hover:border-primary-500 transition-all duration-300" data-product-id="${productData.id}" data-product-name="${productData.name}" data-product-price="${productData.price}">
            <div class="relative overflow-hidden">
                <img src="${productData.image}" alt="${productData.name}" class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                <div class="absolute top-3 right-3">
                    <button class="favorite-btn bg-white/90 dark:bg-secondary-900/80 p-2 rounded-full hover:bg-white dark:hover:bg-secondary-700 transition-colors">
                        <!-- SVG will be inserted by updateFavoriteButtons -->
                    </button>
                </div>
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-secondary-900 dark:text-white mb-2">${productData.name}</h3>
                <p class="text-secondary-600 dark:text-secondary-400 text-sm mb-3">${productData.description}</p>
                <div class="flex items-center justify-between">
                    <span class="font-bold text-lg text-secondary-900 dark:text-white">€${productData.price}</span>
                    <button class="add-to-cart-btn bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                        In den Warenkorb
                    </button>
                </div>
            </div>
        </div>
        `;
    };

    // --- Event Listeners ---

    // Global click listener for favorite buttons
    document.body.addEventListener('click', (e) => {
        const favoriteButton = e.target.closest('.favorite-btn');
        if (favoriteButton) {
            const productCard = favoriteButton.closest('.card-product');
            if (productCard && productCard.dataset.productId) {
                toggleFavorite(productCard.dataset.productId, productCard);
            }
        }
    });

    // --- Initial Load ---
    updateFavoritesUI();
});