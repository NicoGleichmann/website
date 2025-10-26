const themeToggleButton = document.getElementById('theme-toggle');

function updateThemeIcon(isDark) {
    if (!themeToggleButton) return;
    const moonIcon = themeToggleButton.querySelector('.moon-icon');
    const sunIcon = themeToggleButton.querySelector('.sun-icon');
    if (moonIcon && sunIcon) {
        if (isDark) {
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        } else {
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
        }
    }
}

function toggleTheme() {
    const htmlElement = document.documentElement;
    const isDarkMode = htmlElement.classList.toggle('dark');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateThemeIcon(isDarkMode);
}

if (themeToggleButton) {
    themeToggleButton.addEventListener('click', toggleTheme);
}

// Set initial icon state on page load
// The theme is set by theme-init.js already.
const currentIsDark = document.documentElement.classList.contains('dark');
updateThemeIcon(currentIsDark);