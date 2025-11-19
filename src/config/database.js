import { connect } from 'mongoose'
import { configDotenv } from 'dotenv'
configDotenv()

async function connectDatabase () {
  try {
    const mongoose = await connect(process.env.MONGO_URI)

    console.log('Connected to the MongoDB database successfully!')
    console.log('Database connected: ', mongoose.connection.name)

    return mongoose.connection
  } catch (error) {
    console.error('Error: ', error.message)

    process.exit(1)
  }
}

export default connectDatabase
