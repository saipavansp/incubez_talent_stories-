// Environment configuration
// This file provides default values when .env is not present

export const config = {
  // Server
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  
  // Database
  USE_MONGODB: process.env.USE_MONGODB === 'true',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/incubez-talent',
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-key-change-in-production',
  
  // Payment (Razorpay)
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || 'test_key_id',
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || 'test_key_secret',
  
  // Google APIs
  GOOGLE_DRIVE_CLIENT_EMAIL: process.env.GOOGLE_DRIVE_CLIENT_EMAIL || '',
  GOOGLE_DRIVE_PRIVATE_KEY: process.env.GOOGLE_DRIVE_PRIVATE_KEY || '',
  GOOGLE_DRIVE_FOLDER_ID: process.env.GOOGLE_DRIVE_FOLDER_ID || '',
  GOOGLE_SHEETS_ID: process.env.GOOGLE_SHEETS_ID || '',
}
