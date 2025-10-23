import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    // For development, we'll use a mock database connection
    // In production, uncomment the mongoose.connect line below
    
    if (process.env.USE_MONGODB === 'true') {
      const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/incubez-talent')
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
    } else {
      console.log('✅ Running in mock database mode (no MongoDB required)')
    }
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`)
    console.log('⚠️  Continuing without database connection...')
  }
}

export default connectDB
