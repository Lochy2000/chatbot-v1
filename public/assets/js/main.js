
    demoObserver.observe(demoChat);
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key to close any open modals (for future use)
    if (e.key === 'Escape') {
        // Close any open modals
        const openModals = document.querySelectorAll('.modal.open');
        openModals.forEach(modal => modal.classList.remove('open'));
    }
    
    // Enter key on bot cards
    if (e.key === 'Enter' && e.target.classList.contains('bot-card')) {
        e.target.click();
    }
});

// Add loading state for page transitions
function showLoadingState() {
    // Create loading overlay
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading bot...</p>
        </div>
    `;
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(10, 10, 15, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        backdrop-filter: blur(5px);
    `;
    
    document.body.appendChild(loader);
    
    // Remove loader after 1 second (or when page loads)
    setTimeout(() => {
        loader.remove();
    }, 1000);
}

// Enhanced bot card click with loading state
document.querySelectorAll('.bot-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showLoadingState();
        
        // Delay navigation slightly for smooth transition
        setTimeout(() => {
            window.location.href = link.href;
        }, 300);
    });
});

// Add CSS for loader spinner
const loaderStyles = document.createElement('style');
loaderStyles.textContent = `
    .loader-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .loader-content {
        text-align: center;
        color: white;
    }
    
    .particle {
        pointer-events: none;
    }
`;
document.head.appendChild(loaderStyles);