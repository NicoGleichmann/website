
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('input[type="text"][placeholder="Suche nach Produkten..."]');

    if (searchInput) {
        searchInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent any default form submission

            }
        });
    }
});
