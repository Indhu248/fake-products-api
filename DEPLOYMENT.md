# 🚀 Deployment Guide

This guide will help you deploy your fake-products application with separate frontend and backend.

## 📋 Prerequisites

- Backend deployed on Render/Railway/Heroku
- Frontend ready for Netlify/Vercel deployment
- MongoDB Atlas database (for production)

## 🔧 Backend Deployment (Render/Railway/Heroku)

### 1. Environment Variables
Set these in your backend hosting platform:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fake-products
JWT_SECRET=your-super-secret-production-jwt-key
CORS_ORIGIN=https://your-frontend.netlify.app,https://your-frontend.vercel.app
```

### 2. Build Settings
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Node Version**: 18.x or higher

### 3. Get Your Backend URL
After deployment, note your backend URL:
- Render: `https://your-app.onrender.com`
- Railway: `https://your-app.railway.app`
- Heroku: `https://your-app.herokuapp.com`

## 🌐 Frontend Deployment (Netlify/Vercel)

### ⚠️ Important: Subdirectory Configuration

Since your frontend is in the `frontend/` subdirectory, you need special configuration:

#### **For Vercel:**

**Option 1: Use vercel.json (Recommended)**
The `vercel.json` file is already configured in your repo root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": { 
        "distDir": "build",
        "installCommand": "cd frontend && npm install",
        "buildCommand": "cd frontend && npm run build"
      }
    }
  ],
  "routes": [
    { 
      "src": "/(.*)", 
      "dest": "/frontend/$1" 
    }
  ],
  "outputDirectory": "frontend/build"
}
```

**Option 2: Vercel Dashboard Settings**
1. Go to your project in Vercel
2. Open **Settings → Build & Development Settings**
3. Set:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

#### **For Netlify:**

**Option 1: Use netlify.toml (Recommended)**
The `netlify.toml` file is already configured in your repo root:

```toml
[build]
  base = "frontend"
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Option 2: Netlify Dashboard Settings**
1. Go to your project in Netlify
2. Open **Site settings → Build & deploy**
3. Set:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `build`

### 1. Environment Variables
Set these in your frontend hosting platform:

```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

### 2. Build Settings
- **Build Command**: `npm run build`
- **Publish Directory**: `build`
- **Node Version**: 18.x or higher

### 3. Update CORS Origins
In your backend `server.js`, update the `allowedOrigins` array with your actual frontend URL:

```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://your-actual-frontend.netlify.app',  // Replace with your URL
  'https://your-actual-frontend.vercel.app',   // Replace with your URL
];
```

## 🔍 Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Check that your frontend URL is in the backend's allowed origins
   - Verify the backend URL in frontend environment variables

2. **API Not Found (404)**
   - Ensure backend URL ends with `/api`
   - Check that backend is running and accessible

3. **Build Failures**
   - Verify all environment variables are set
   - Check Node.js version compatibility

4. **Database Connection Issues**
   - Verify MongoDB Atlas connection string
   - Check network access and IP whitelist

5. **Vercel/Netlify Build Issues**
   - **Error**: "Could not find index.html"
   - **Solution**: Make sure you've configured the subdirectory correctly
   - **For Vercel**: Use the `vercel.json` file or set root directory to `frontend`
   - **For Netlify**: Use the `netlify.toml` file or set base directory to `frontend`

### Testing Your Deployment:

1. **Backend Health Check**:
   ```bash
   curl https://your-backend-url.com/health
   ```

2. **API Endpoints**:
   ```bash
   curl https://your-backend-url.com/api/products
   curl https://your-backend-url.com/api/categories
   ```

3. **Frontend**:
   - Visit your frontend URL
   - Check browser console for API errors
   - Test CRUD operations

## 📝 Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend environment variables configured
- [ ] CORS origins updated with actual frontend URL
- [ ] Database connected and working
- [ ] All API endpoints responding
- [ ] Frontend build successful (with subdirectory config)
- [ ] CRUD operations working in production

## 🆘 Need Help?

If you encounter issues:
1. Check browser console for errors
2. Verify all environment variables
3. Test backend endpoints directly
4. Check hosting platform logs
5. Ensure subdirectory configuration is correct
