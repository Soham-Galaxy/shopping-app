import mongoose from 'mongoose';

/**
 * Database connection configuration
 * Handles MongoDB connection with error handling and retry logic
 */

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log('✓ Using existing MongoDB connection');
    return;
  }

  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping-app';
    
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });

    isConnected = true;
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
      isConnected = false;
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.error('\nPlease ensure:');
    console.error('1. MongoDB is installed');
    console.error('2. MongoDB service is running');
    console.error('3. Connection URI is correct in .env file');
    console.error('\nFor installation instructions, visit: https://www.mongodb.com/docs/manual/installation/\n');
    
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
