#!/bin/bash

echo "🚀 Fake Products Deployment Script"
echo "=================================="

# Check if backend URL is provided
if [ -z "$1" ]; then
    echo "❌ Please provide your backend URL as an argument"
    echo "Usage: ./deploy.sh https://your-backend-url.com"
    exit 1
fi

BACKEND_URL=$1

echo "📦 Backend URL: $BACKEND_URL"
echo ""

# Update frontend environment
echo "🔧 Updating frontend environment..."
cd frontend
echo "REACT_APP_API_URL=$BACKEND_URL/api" > .env
echo "✅ Frontend environment updated"

# Build frontend
echo "🏗️  Building frontend..."
npm run build
echo "✅ Frontend built successfully"

echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Deploy backend to your chosen platform"
echo "2. Deploy frontend to your chosen platform"
echo "3. Update environment variables in your deployment platform"
echo ""
echo "Backend URL: $BACKEND_URL"
echo "Frontend API URL: $BACKEND_URL/api"
