/**
 * Simple Environment Detection Script
 * Add this to any page to auto-fix paths for local vs production
 */

(function() {
    // Detect if we're running locally
    const isLocal = window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1' ||
                   window.location.port === '8000';

    // Only run fixes if we're local
    if (!isLocal) return;

    console.log('🔧 Local development detected - fixing paths...');

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixLocalPaths);
    } else {
        fixLocalPaths();
    }

    function fixLocalPaths() {
        // Fix relative links that need adjustment
        const links = document.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            // Fix back to index links
            if (href === '/index.html' || href === '/') {
                link.href = '../index.html';
            }
            
            // Fix absolute bot links
            if (href.startsWith('/bots/')) {
                link.href = href.replace('/bots/', '../bots/');
            }
        });

        // Fix asset links if needed
        const assetLinks = document.querySelectorAll('link[href*="/assets/"]');
        assetLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('/assets/')) {
                link.href = '.' + href;
            }
        });

        // Fix script sources
        const scripts = document.querySelectorAll('script[src*="/assets/"]');
        scripts.forEach(script => {
            const src = script.getAttribute('src');
            if (src.startsWith('/assets/')) {
                script.src = '.' + src;
            }
        });

        console.log('✅ Local paths fixed');
    }
})();