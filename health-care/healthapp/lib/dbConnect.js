import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false
    }).then((mongoose) => {
      console.log("MongoDB connected");
      return mongoose;
    })
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;