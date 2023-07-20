import mongoose from 'mongoose'

mongoose.set("strictQuery", false);

const connectDB = async (): Promise<void> => {
  try {
    // Connect to MongoDB using mongoose
    const dbString = process.env.DB_STRING || "";
    const conn = await mongoose.connect(dbString)

    console.log(`MongoDB Connected: ${conn.connection.host}`)

  } catch (error:any) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB