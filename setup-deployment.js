#!/usr/bin/env node

/**
 * Deployment Setup Script
 * This script helps configure environment variables for deployment
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setupDeployment() {
  console.log('🚀 Fake Products - Deployment Setup\n');
  
  // Get backend URL
  const backendUrl = await question('Enter your backend URL (e.g., https://your-app.onrender.com): ');
  
  // Get frontend URL
  const frontendUrl = await question('Enter your frontend URL (e.g., https://your-app.netlify.app): ');
  
  // Create frontend .env file
  const frontendEnvPath = path.join(__dirname, 'frontend', '.env');
  const frontendEnvContent = `REACT_APP_API_URL=${backendUrl}/api\n`;
  
  try {
    fs.writeFileSync(frontendEnvPath, frontendEnvContent);
    console.log('✅ Frontend .env file created successfully');
  } catch (error) {
    console.error('❌ Error creating frontend .env file:', error.message);
  }
  
  // Create backend config.env file
  const backendEnvPath = path.join(__dirname, 'backend', 'config.env');
  const backendEnvContent = `NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_production_jwt_key
CORS_ORIGIN=${frontendUrl}
`;
  
  try {
    fs.writeFileSync(backendEnvPath, backendEnvContent);
    console.log('✅ Backend config.env file created successfully');
  } catch (error) {
    console.error('❌ Error creating backend config.env file:', error.message);
  }
  
  // Update CORS origins in server.js
  const serverPath = path.join(__dirname, 'backend', 'server.js');
  try {
    let serverContent = fs.readFileSync(serverPath, 'utf8');
    
    // Update the allowedOrigins array
    const corsUpdate = `const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      '${frontendUrl}',
    ];`;
    
    serverContent = serverContent.replace(
      /const allowedOrigins = \[[\s\S]*?\];/,
      corsUpdate
    );
    
    fs.writeFileSync(serverPath, serverContent);
    console.log('✅ Backend CORS configuration updated');
  } catch (error) {
    console.error('❌ Error updating CORS configuration:', error.message);
  }
  
  console.log('\n📋 Next Steps:');
  console.log('1. Update the MONGODB_URI in backend/config.env with your actual MongoDB Atlas connection string');
  console.log('2. Update the JWT_SECRET in backend/config.env with a strong secret key');
  console.log('3. Deploy your backend to Render/Railway/Heroku');
  console.log('4. Deploy your frontend to Netlify/Vercel');
  console.log('5. Set the environment variables in your hosting platforms');
  
  rl.close();
}

setupDeployment().catch(console.error);
