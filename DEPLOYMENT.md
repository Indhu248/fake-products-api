# Deployment Guide

This guide covers deploying both the backend API and frontend dashboard to various hosting platforms.

## 🚀 Backend Deployment

### Option 1: Heroku

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew install heroku/brew/heroku
   
   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd backend
   heroku create your-app-name
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_atlas_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy backend"
   git push heroku main
   ```

### Option 2: Railway

1. **Connect GitHub Repository**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub account
   - Select the repository

2. **Configure Environment**
   - Set environment variables in Railway dashboard
   - Add MongoDB connection string
   - Set JWT secret

3. **Deploy**
   - Railway automatically deploys on push to main branch

### Option 3: DigitalOcean App Platform

1. **Create App**
   - Go to DigitalOcean App Platform
   - Connect your GitHub repository
   - Select Node.js as runtime

2. **Configure Environment**
   - Set environment variables
   - Configure MongoDB connection

3. **Deploy**
   - DigitalOcean handles deployment automatically

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

3. **Configure Environment**
   - Set `REACT_APP_API_URL` to your backend URL
   - Redeploy if needed

### Option 2: Netlify

1. **Build the App**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop `build/` folder to Netlify
   - Or connect GitHub repository for auto-deploy

3. **Set Environment Variables**
   - Go to Site settings > Environment variables
   - Add `REACT_APP_API_URL`

### Option 3: GitHub Pages

1. **Install gh-pages**
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/your-repo-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

## 🗄️ Database Deployment

### MongoDB Atlas (Recommended)

1. **Create Cluster**
   - Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Create free cluster

2. **Configure Network Access**
   - Add your IP or `0.0.0.0/0` for all IPs

3. **Create Database User**
   - Username and password for database access

4. **Get Connection String**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/fake-products
   ```

### Alternative: Self-hosted MongoDB

1. **Install MongoDB**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install mongodb
   
   # macOS
   brew install mongodb-community
   ```

2. **Start Service**
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

## 🔧 Environment Configuration

### Backend (.env)
```bash
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fake-products
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
```

### Frontend (.env)
```bash
REACT_APP_API_URL=https://your-backend-url.com/api
```

## 📱 Domain & SSL

### Custom Domain Setup

1. **Add Domain in Hosting Platform**
   - Configure custom domain in your hosting platform
   - Point DNS to hosting provider

2. **SSL Certificate**
   - Most platforms provide free SSL
   - Enable HTTPS redirect

### DNS Configuration

```
Type    Name    Value
A       @       Your hosting IP
CNAME   www     yourdomain.com
```

## 🔒 Security Considerations

### Production Checklist

- [ ] Change default JWT secret
- [ ] Use strong MongoDB password
- [ ] Enable HTTPS everywhere
- [ ] Set up CORS properly
- [ ] Rate limiting (consider adding)
- [ ] Input validation
- [ ] Error logging (avoid exposing internals)

### Environment Variables

Never commit sensitive data:
```bash
# .gitignore
.env
config.env
*.env
```

## 📊 Monitoring & Logs

### Backend Logging

1. **Add Winston Logger**
   ```bash
   npm install winston
   ```

2. **Configure Logging**
   ```javascript
   const winston = require('winston');
   
   const logger = winston.createLogger({
     level: 'info',
     format: winston.format.json(),
     transports: [
       new winston.transports.File({ filename: 'error.log', level: 'error' }),
       new winston.transports.File({ filename: 'combined.log' })
     ]
   });
   ```

### Frontend Monitoring

1. **Add Error Boundary**
   ```typescript
   class ErrorBoundary extends React.Component {
     componentDidCatch(error: Error, errorInfo: ErrorInfo) {
       // Log error to monitoring service
       console.error('Error:', error, errorInfo);
     }
   }
   ```

2. **Performance Monitoring**
   - Use React DevTools
   - Lighthouse audits
   - Web Vitals monitoring

## 🚀 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: "your-app-name"
          heroku_email: "your-email@example.com"

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🔍 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check backend CORS configuration
   - Verify frontend API URL

2. **Database Connection**
   - Check MongoDB connection string
   - Verify network access settings

3. **Build Failures**
   - Check Node.js version compatibility
   - Clear node_modules and reinstall

4. **Environment Variables**
   - Verify variable names
   - Check hosting platform settings

### Debug Commands

```bash
# Backend
npm run dev
# Check logs for errors

# Frontend
npm start
# Check browser console for errors

# Database
mongo "your-connection-string"
# Test database connection
```

## 📈 Performance Optimization

### Backend
- Enable compression
- Add caching headers
- Optimize database queries
- Use PM2 for process management

### Frontend
- Enable gzip compression
- Optimize bundle size
- Use CDN for images
- Implement lazy loading

## 🔄 Updates & Maintenance

### Regular Tasks
- Update dependencies monthly
- Monitor error logs
- Check performance metrics
- Backup database regularly

### Update Process
1. Test locally
2. Deploy to staging
3. Run tests
4. Deploy to production
5. Monitor for issues

---

**Need help? Check the main README or create an issue in the repository.**
