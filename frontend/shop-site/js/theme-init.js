(function() {
    // If 'theme' is 'dark' in localStorage, apply dark mode.
    // Otherwise (if it's 'light' or not set at all), default to light mode.
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
})();
