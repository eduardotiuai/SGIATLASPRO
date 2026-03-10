/* ================================================
   SGI ATLAS - Theme Manager (Light/Dark Mode)
   ================================================ */

class ThemeManager {
    constructor() {
        this.defaultTheme = 'light';
        this.storageKey = 'sgiatlas-theme';
        this.init();
    }

    init() {
        // Use saved theme, otherwise default to light mode
        // (ignore system preference for consistency)
        const savedTheme = localStorage.getItem(this.storageKey);
        const theme = savedTheme || this.defaultTheme;
        this.setTheme(theme);
        this.attachToggleListener();
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(this.storageKey, theme);
        this.updateToggleIcon();
    }

    toggle() {
        const current = document.documentElement.getAttribute('data-theme') || this.defaultTheme;
        const next = current === 'dark' ? 'light' : 'dark';
        this.setTheme(next);
    }

    attachToggleListener() {
        const toggleBtn = document.querySelector('.theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggle());
        }

        // Update when system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(this.storageKey)) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    updateToggleIcon() {
        const toggleBtn = document.querySelector('.theme-toggle');
        if (!toggleBtn) return;

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        toggleBtn.innerHTML = isDark ? '☀️' : '🌙';
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});
