import mongoose from "mongoose";

let cachedDb = null; // Declare cachedDb outside the function to persist across function calls
const url = process.env.MONGODB_URL;
const dbName = process.env.MONGODB_DB_NAME;
export async function connectToDatabase() {
  if (cachedDb) {
    // Return the cached connection
    return cachedDb;
  }

  // Set a default if not provided in env

  if (!url) {
    throw new Error("MONGODB_URL is not defined in .env.local");
  }

  // Create a new connection to the database
  try {
    await mongoose.connect(url, { dbName }); // Connect using the URL and optional database name

    // Cache the mongoose connection object
    cachedDb = mongoose.connection;
    return cachedDb; // Return the cached connection
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
