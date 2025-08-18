const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './config.env' });

console.log('Testing MongoDB Atlas connection...');
console.log('Connection string:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:');
    console.error('Error code:', err.code);
    console.error('Error message:', err.message);
    
    if (err.code === 8000) {
      console.log('\n🔑 This is an authentication error. Possible causes:');
      console.log('1. Username or password is incorrect');
      console.log('2. Database user doesn\'t exist');
      console.log('3. Database user doesn\'t have access to this database');
    } else if (err.code === 'ENOTFOUND') {
      console.log('\n🌐 Network error - check your internet connection');
    }
    
    process.exit(1);
  });
