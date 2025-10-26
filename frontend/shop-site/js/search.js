document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('input[type="text"][placeholder="Suche nach Produkten..."]');
    const mainContent = document.getElementById('main-content');
    const searchResultsContainer = document.getElementById('search-results-container');
    const productCards = Array.from(document.querySelectorAll('.card-product'));

    // Don't run if essential elements are missing
    if (!searchInput || !mainContent || !searchResultsContainer) {
        return;
    }

    const allProducts = productCards.map(card => {
        const name = card.querySelector('h3')?.textContent || '';
        const description = card.querySelector('p')?.textContent || '';
        const dataName = card.dataset.productName || '';

        // Clone the card to modify it for search results, removing animation classes
        const tempCard = card.cloneNode(true);
        tempCard.classList.remove('reveal-on-scroll', 'is-visible', 'delay-1', 'delay-2', 'delay-3');

        return {
            html: tempCard.outerHTML,
            searchText: `${dataName} ${name} ${description}`.toLowerCase()
        };
    });

    function performSearch(searchTerm) {
        searchTerm = searchTerm.toLowerCase().trim();

        if (searchTerm.length > 1) {
            mainContent.classList.add('hidden');
            searchResultsContainer.classList.remove('hidden');

            const filteredProducts = allProducts.filter(product => {
                return product.searchText.includes(searchTerm);
            });

            searchResultsContainer.innerHTML = ''; // Clear previous results

            if (filteredProducts.length > 0) {
                const resultsTitle = document.createElement('h2');
                resultsTitle.className = 'font-headline font-bold text-3xl lg:text-4xl text-secondary-900 dark:text-white mb-12 text-center';
                resultsTitle.textContent = `Suchergebnisse für "${searchTerm}"`;
                searchResultsContainer.appendChild(resultsTitle);

                const resultsGrid = document.createElement('div');
                resultsGrid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8';

                resultsGrid.innerHTML = filteredProducts.map(product => product.html).join('');
                searchResultsContainer.appendChild(resultsGrid);
            } else {
                const noResultsMessage = document.createElement('p');
                noResultsMessage.className = 'text-center text-secondary-600 dark:text-secondary-300 text-lg';
                noResultsMessage.textContent = 'Keine Produkte gefunden, die deiner Suche entsprechen.';
                searchResultsContainer.appendChild(noResultsMessage);
            }
        } else {
            mainContent.classList.remove('hidden');
            searchResultsContainer.classList.add('hidden');
            searchResultsContainer.innerHTML = '';
        }
    }

    // Event listener for live search
    searchInput.addEventListener('input', function () {
        performSearch(searchInput.value);
    });

    // Check for search query in URL on page load
    const urlParams = new URLSearchParams(window.location.search);
    const searchquery = urlParams.get('search');
    if (searchquery) {
        searchInput.value = searchquery;
        performSearch(searchquery);
    }
});