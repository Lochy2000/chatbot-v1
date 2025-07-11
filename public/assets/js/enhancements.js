/**
 * Bot Playground - UI Enhancements
 * Adds interactive features and animations
 */

class BotPlaygroundEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupBotCardInteractions();
        this.setupAnimatedCounters();
        this.setupMobileOptimizations();
        this.setupLoadingStates();
    }

    // Smooth scrolling for navigation links
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Enhanced bot card interactions
    setupBotCardInteractions() {
        const botCards = document.querySelectorAll('.bot-card');
        
        botCards.forEach(card => {
            // Add ripple effect on click
            card.addEventListener('click', this.createRipple);
            
            // Mobile touch interactions
            if ('ontouchstart' in window) {
                card.addEventListener('touchstart', () => {
                    card.classList.add('mobile-preview');
                });
                
                card.addEventListener('touchend', () => {
                    setTimeout(() => {
                        card.classList.remove('mobile-preview');
                    }, 3000);
                });
            }
        });
    }

    // Create ripple effect
    createRipple(event) {
        const card = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(card.clientWidth, card.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - card.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - card.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = card.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        card.appendChild(circle);
    }

    // Animated counters for statistics
    setupAnimatedCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const displayValue = Math.floor(current);
            if (element.textContent.includes('%')) {
                element.textContent = displayValue + '%';
            } else {
                element.textContent = displayValue;
            }
        }, 16);
    }

    // Mobile-specific optimizations
    setupMobileOptimizations() {
        // Add touch feedback
        const touchElements = document.querySelectorAll('.btn, .bot-card, .nav-link');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.style.transform = '';
                }, 150);
            });
        });

        // Optimize scroll performance
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollEffects();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const navbar = document.querySelector('.nav');
        
        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Loading states for better UX
    setupLoadingStates() {
        const botLinks = document.querySelectorAll('.bot-link, .try-button');
        
        botLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const button = e.target;
                const originalText = button.textContent;
                
                button.textContent = 'Loading...';
                button.style.opacity = '0.7';
                button.style.pointerEvents = 'none';
                
                // Reset after navigation (in case of slow loading)
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.opacity = '';
                    button.style.pointerEvents = '';
                }, 2000);
            });
        });
    }
}

// Mobile menu functionality
function setupMobileMenu() {
    const burgerMenu = document.getElementById('burger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    // Toggle mobile menu
    if (burgerMenu) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close menu when clicking overlay
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Performance optimization: Load enhancements after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new BotPlaygroundEnhancements();
    setupMobileMenu();
    
    // Initialize scroll effects immediately
    const navbar = document.querySelector('.nav');
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    }
});

// Additional CSS for ripple effect and enhancements
const additionalStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 600ms linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .nav {
        transition: all 0.3s ease;
    }

    .bot-card {
        position: relative;
        overflow: hidden;
    }

    @media (hover: none) {
        .bot-card.mobile-preview .bot-preview {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
