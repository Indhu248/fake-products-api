#!/bin/bash

echo "🚀 Starting build process..."

# Check if frontend directory exists
if [ ! -d "frontend" ]; then
    echo "❌ Frontend directory not found!"
    exit 1
fi

echo "📦 Installing frontend dependencies..."
cd frontend
npm install

echo "🏗️ Building frontend..."
npm run build

echo "✅ Build completed successfully!"
