document.addEventListener('DOMContentLoaded', () => {

    // Mobile-Menü-Funktionalität
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const headerIcons = document.querySelector('.header-icons');

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        headerIcons.classList.toggle('active');
    });

    // Warenkorb-Funktionalität (Client-seitig, speichert im localStorage)
    const cartCountElement = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    let cart = JSON.parse(localStorage.getItem('lumio_cart')) || [];

    const updateCartCount = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    };

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            const productName = e.target.dataset.name;
            const productPrice = parseFloat(e.target.dataset.price);

            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            localStorage.setItem('lumio_cart', JSON.stringify(cart));
            updateCartCount();
            alert(`${productName} wurde in den Warenkorb gelegt!`);
        });
    });

    updateCartCount();

    // Neuer Code für den Bilder-Slider auf den Produktkarten
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const imageTrack = card.querySelector('.image-track');
        const navDots = card.querySelectorAll('.nav-dot');
        const images = card.querySelectorAll('.image-track img');
        
        let currentImageIndex = 0;
        const imageWidth = images[0].clientWidth;

        navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentImageIndex = index;
                updateImageSlider();
            });
        });

        const updateImageSlider = () => {
            imageTrack.style.transform = `translateX(-${currentImageIndex * imageWidth}px)`;
            navDots.forEach(dot => dot.classList.remove('active'));
            navDots[currentImageIndex].classList.add('active');
        };

        // Klick-Events für den Wechsel (z.B. per Pfeil, wenn du welche hinzufügst)
        // Hier werden die Punkte als Navigation verwendet, was die minimalistische Ästhetik unterstützt.
    });

    // Neuer Code für den automatischen Hero-Slider
    const heroSliderTrack = document.querySelector('.hero-slider-track');
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentHeroIndex = 0;

    const autoSlide = () => {
        currentHeroIndex++;
        if (currentHeroIndex >= heroSlides.length) {
            currentHeroIndex = 0;
        }
        heroSliderTrack.style.transform = `translateX(-${currentHeroIndex * 100}vw)`;
    };

    setInterval(autoSlide, 5000); // Wechselt alle 5 Sekunden
});