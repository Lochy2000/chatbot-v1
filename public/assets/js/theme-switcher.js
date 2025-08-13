/**
 * Theme Switcher for Chatty
 * Provides dark/light mode toggle with smooth transitions
 */

class ThemeSwitcher {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        this.createThemeToggle();
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
    }

    createThemeToggle() {
        // Check if theme toggle already exists
        if (document.querySelector('.theme-toggle')) {
            return;
        }
        
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = this.currentTheme === 'dark' ? '🌙' : '☀️';
        themeToggle.title = `Switch to ${this.currentTheme === 'dark' ? 'light' : 'dark'} theme`;
        
        // Add to floating actions container (creates one if missing)
        const container = document.querySelector('.floating-actions') || this.createFloatingActionsContainer();
        container.appendChild(themeToggle);

        this.addThemeToggleStyles();
    }

    addThemeToggleStyles() {
        const styles = `
            .theme-toggle {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                padding: 0.6rem;
                cursor: pointer;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
                width: 44px;
                height: 44px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 8px 30px rgba(139, 92, 246, 0.3);
                font-size: 1.1rem;
            }

            .theme-toggle:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(139, 92, 246, 0.5);
                background: rgba(255, 255, 255, 0.15);
            }

            /* Light theme variables */
            [data-theme="light"] {
                --dark-bg: #f8fafc;
                --darker-bg: #f1f5f9;
                --text-primary: #1e293b;
                --text-secondary: #64748b;
                --text-muted: #94a3b8;
                --border-color: rgba(0, 0, 0, 0.1);
                --glass-bg: rgba(255, 255, 255, 0.8);
                --glass-border: rgba(0, 0, 0, 0.1);
            }

            /* Smooth theme transitions */
            *, *::before, *::after {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    setupEventListeners() {
        const themeToggle = document.querySelector('.theme-toggle');
        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        
        // Update button icon
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.innerHTML = this.currentTheme === 'dark' ? '🌙' : '☀️';
            themeToggle.title = `Switch to ${this.currentTheme === 'dark' ? 'light' : 'dark'} theme`;
        }
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        
        // Update button icon if it exists
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'dark' ? '🌙' : '☀️';
            themeToggle.title = `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`;
        }
    }

    createFloatingActionsContainer() {
        const container = document.createElement('div');
        container.className = 'floating-actions';
        document.body.appendChild(container);
        return container;
    }
}

// Initialize theme switcher when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a moment to ensure all styles are loaded
    setTimeout(() => {
        new ThemeSwitcher();
    }, 100);
});
