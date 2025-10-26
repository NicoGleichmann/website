document.addEventListener('DOMContentLoaded', () => {
    const authModal = document.getElementById('auth-modal');
    const authModalContent = document.getElementById('auth-modal-content');
    const closeAuthModal = document.getElementById('close-auth-modal');

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');

    // Links from the dropdown
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const logoutLink = document.getElementById('logout-link');
    const accountLink = document.getElementById('account-link');
    const settingsLink = document.getElementById('settings-link');

    const API_URL = 'http://localhost:5000/api';

    function updateUI() {
        const token = localStorage.getItem('token');
        const authLinks = document.getElementById('auth-links');
        const userLinks = document.getElementById('user-links');

        if (token) {
            if (authLinks) authLinks.classList.add('hidden');
            if (userLinks) userLinks.classList.remove('hidden');
        } else {
            if (authLinks) authLinks.classList.remove('hidden');
            if (userLinks) userLinks.classList.add('hidden');
        }
    }

    function showModal() {
        authModal.classList.remove('hidden');
        authModal.classList.add('flex');
        setTimeout(() => {
            authModalContent.classList.remove('scale-95', 'opacity-0');
        }, 50);
    }
    window.showAuthModal = showModal;

    function hideModal() {
        authModalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            authModal.classList.add('hidden');
            authModal.classList.remove('flex');
        }, 300);
    }

    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        showModal();
    });

    registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        showModal();
    });

    closeAuthModal.addEventListener('click', hideModal);
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
            hideModal();
        }
    });

    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                updateUI();
                hideModal();
            } else {
                loginError.textContent = data.error || 'Ein Fehler ist aufgetreten.';
                loginError.classList.remove('hidden');
            }
        } catch (err) {
            loginError.textContent = 'Verbindung zum Server fehlgeschlagen.';
            loginError.classList.remove('hidden');
        }
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        try {
            const res = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();

            if (res.ok) {
                // Automatically log in the user after registration
                const loginRes = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const loginData = await loginRes.json();
                if (loginRes.ok) {
                    localStorage.setItem('token', loginData.token);
                    localStorage.setItem('user', JSON.stringify(loginData.user));
                    updateUI();
                    hideModal();
                }
            } else {
                registerError.textContent = data.message || 'Ein Fehler ist aufgetreten.';
                registerError.classList.remove('hidden');
            }
        } catch (err) {
            registerError.textContent = 'Verbindung zum Server fehlgeschlagen.';
            registerError.classList.remove('hidden');
        }
    });

    logoutLink.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        updateUI();
    });

    updateUI();

    // Check for login query parameter on page load
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('login') === 'true') {
        showModal();
    }
});