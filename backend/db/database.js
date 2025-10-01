const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/2dish';

mongoose.set('strictQuery', true);

// Graceful connection handling
const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('⏳ Retrying connection in 5 seconds...');
    
    // Retry connection instead of crashing
    setTimeout(connectDB, 5000);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected');
});

module.exports = { connectDB };