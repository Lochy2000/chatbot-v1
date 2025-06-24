# Deployment Guide for Bot Playground

## 🚀 Quick Deployment to Vercel

### 1. Install Vercel CLI (if not already installed)
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy from project directory
```bash
cd C:\Users\User\blogs\easywebs\ai-blogs\aitchattbot\chatbot-v1
vercel
```

### 4. Set Environment Variables
After deployment, go to your Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add: `GEMINI_API_KEY` with your actual API key value
4. Redeploy: `vercel --prod`

## 🔧 What Works Locally vs Deployed

### ✅ **Works Locally (Python server)**
- Beautiful landing page with animations
- Bot interface designs
- Navigation and responsive layout
- All visual elements

### ⚠️ **Requires Deployment**
- AI chat functionality
- Real Gemini API responses
- Token counting
- Actual conversation with bots

## 📁 File Structure
```
/
├── index.html              # Landing page (complete)
├── public/bots/
│   └── ecommerce.html      # Shopping bot (complete)
├── api/
│   └── chat.js             # Serverless function
├── package.json            # Dependencies
└── vercel.json             # Deployment config
```

## 🎯 Next Steps
1. **Deploy to see full functionality**
2. **Create remaining 3 bots** (education, minimal, foundation)
3. **Test all features** in production environment

## 💡 Development Workflow
- **Local**: Design, styling, UI/UX testing
- **Deployed**: AI functionality, API integration, full user testing