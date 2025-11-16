import mongoose, { connect } from 'mongoose'
import { configDotenv } from 'dotenv'
configDotenv()

async function connectDatabase () {
  try {
    await connect(process.env.MONGO_URI)

    console.log('Connected to the MongoDB database successfully!')
  } catch (error) {
    console.error('Error: ', error.message)

    process.exit(1)
  }
  const dbConnection = mongoose.connection
  
  
  dbConnection.once('open', _ => {
    console.log('Database connected: ', dbConnection.name)
  })

  dbConnection.on('error', err => {
    console.error('Connection error: ', err.message)
  })

  return dbConnection
}

export default connectDatabase
