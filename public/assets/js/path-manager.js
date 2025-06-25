// Base Path Utility - Works for both local and Vercel
class PathManager {
    constructor() {
        this.isLocal = this.detectLocalEnvironment();
        this.basePath = this.getBasePath();
    }

    detectLocalEnvironment() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.port === '8000';
    }

    getBasePath() {
        if (this.isLocal) {
            // Local development - Python server from root
            return '';
        } else {
            // Vercel deployment
            return '';
        }
    }

    // Get correct asset path
    getAssetPath(path) {
        // Remove leading slash if present
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return `${this.basePath}${cleanPath}`;
    }

    // Get correct API path
    getApiPath(endpoint) {
        return `/api/${endpoint}`;
    }

    // Get correct bot path
    getBotPath(botName) {
        return `bots/${botName}.html`;
    }

    // Get correct asset URL for CSS/JS
    getAssetUrl(assetPath) {
        if (assetPath.startsWith('http') || assetPath.startsWith('//')) {
            return assetPath; // External URL
        }
        
        // For local development, check if we're in a bot subdirectory
        const isInBotDirectory = window.location.pathname.includes('/bots/');
        
        if (this.isLocal && isInBotDirectory) {
            return `../${assetPath}`;
        }
        
        return assetPath;
    }
}

// Global path manager instance
const pathManager = new PathManager();

// Utility functions for easy use
function getAssetPath(path) {
    return pathManager.getAssetPath(path);
}

function getApiPath(endpoint) {
    return pathManager.getApiPath(endpoint);
}

function getBotPath(botName) {
    return pathManager.getBotPath(botName);
}

function getAssetUrl(assetPath) {
    return pathManager.getAssetUrl(assetPath);
}

// Debug info
console.log('Path Manager:', {
    isLocal: pathManager.isLocal,
    basePath: pathManager.basePath,
    currentPath: window.location.pathname,
    hostname: window.location.hostname
});