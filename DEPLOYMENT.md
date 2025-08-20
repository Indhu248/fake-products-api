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
- [ ] Frontend build successful
- [ ] CRUD operations working in production

## 🆘 Need Help?

If you encounter issues:
1. Check browser console for errors
2. Verify all environment variables
3. Test backend endpoints directly
4. Check hosting platform logs
