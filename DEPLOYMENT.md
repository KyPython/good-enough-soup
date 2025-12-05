# Deployment Guide

## Quick Deploy Options

### Option 1: Render (Recommended for MVP - Free tier available)

#### Backend Deployment:
1. Go to [Render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `good-enough-soup-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Health Check Path**: `/entries`
5. Click "Create Web Service"
6. Copy the deployed URL (e.g., `https://good-enough-soup-backend.onrender.com`)

#### Frontend Deployment:
1. In Render, click "New +" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `good-enough-soup-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Environment Variable**: 
     - Key: `REACT_APP_API_URL`
     - Value: `https://your-backend-url.onrender.com` (from step 6 above)
4. Click "Create Static Site"
5. Your app will be live!

---

### Option 2: Vercel (Frontend) + Railway (Backend)

#### Backend on Railway:
1. Go to [Railway.app](https://railway.app) and sign up/login
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Set root directory to `backend`
5. Railway auto-detects Node.js and deploys
6. Copy the deployed URL

#### Frontend on Vercel:
1. Go to [Vercel.com](https://vercel.com) and sign up/login
2. Click "Add New Project" → Import your GitHub repo
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Create React App
   - **Environment Variable**: 
     - Key: `REACT_APP_API_URL`
     - Value: Your Railway backend URL
4. Click "Deploy"

---

### Option 3: Netlify (Frontend) + Fly.io (Backend)

#### Backend on Fly.io:
1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. In `backend/` directory, run: `fly launch`
3. Follow prompts and deploy
4. Copy the deployed URL

#### Frontend on Netlify:
1. Go to [Netlify.com](https://netlify.com) and sign up/login
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub and select your repo
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
   - **Environment Variable**: 
     - Key: `REACT_APP_API_URL`
     - Value: Your Fly.io backend URL
5. Click "Deploy site"

---

## Environment Variables

Make sure to set `REACT_APP_API_URL` in your frontend deployment to point to your deployed backend URL.

## Notes

- Backend uses in-memory storage (data resets on restart)
- For production, consider migrating to a database (see README.md iteration ideas)
- Free tiers have cold starts - first request may be slow

