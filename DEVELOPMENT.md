# Development Setup - Local vs Production Paths

## 🚀 Quick Start

### Method 1: Python Server (Recommended for Simple Testing)
```bash
# Serve from public directory
npm run dev:local
# or manually:
cd public && python -m http.server 8000
```

### Method 2: Vercel Development (Recommended for Full Testing)
```bash
# Full Vercel simulation with API routes
npm run dev
```

### Method 3: Express Server (Alternative)
```bash
# Custom Express server
npm install
npm run dev:express
```

## 🔧 Path Management

### Current Structure
```
public/
├── index.html
├── bots/
│   ├── ecommerce.html
│   ├── education.html
│   └── ...
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
└── api/ (handled by Vercel)
```

### Path Solutions Implemented

1. **Dynamic Path Detection** (`path-manager.js`)
   - Automatically detects local vs production
   - Provides utilities for consistent paths
   - Use: `getAssetPath()`, `getApiPath()`, etc.

2. **Auto Path Fix** (`local-path-fix.js`)
   - Automatically fixes paths on local development
   - Just include the script and it works
   - Zero configuration needed

3. **Development Scripts**
   - `npm run dev:local` - Python server from public/
   - `npm run dev` - Full Vercel simulation
   - `npm run dev:express` - Custom Express server

### Local Development URLs
- **Main site**: `http://localhost:8000/`
- **Bots**: `http://localhost:8000/bots/ecommerce.html`
- **Assets**: `http://localhost:8000/assets/...`

### Production URLs (Vercel)
- **Main site**: `https://your-domain.vercel.app/`
- **Bots**: `https://your-domain.vercel.app/bots/ecommerce.html`
- **API**: `https://your-domain.vercel.app/api/chat`

## 🛠️ Adding Path Support to New Pages

### Option 1: Use Path Manager
```html
<script src="../assets/js/path-manager.js"></script>
<script>
  // Use dynamic paths
  fetch(getApiPath('chat'), { ... })
</script>
```

### Option 2: Use Auto-Fix Script
```html
<script src="../assets/js/local-path-fix.js"></script>
<!-- Paths automatically fixed on local development -->
```

### Option 3: Manual Detection
```javascript
const isLocal = window.location.hostname === 'localhost';
const apiPath = isLocal ? '/api/chat' : '/api/chat';
const backPath = isLocal ? '../index.html' : '/index.html';
```

## 🧪 Testing Both Environments

1. **Test Local**:
   ```bash
   npm run dev:local
   # Check http://localhost:8000
   ```

2. **Test Production Simulation**:
   ```bash
   npm run dev
   # Check http://localhost:3000 (Vercel dev)
   ```

3. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

## 📝 Best Practices

- **Always test both environments** before deploying
- **Use relative paths** when possible (`../assets/...`)
- **Include path-manager.js** for dynamic path handling
- **Check console** for path-related errors
- **Use npm scripts** for consistent development experience