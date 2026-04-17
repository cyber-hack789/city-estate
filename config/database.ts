// ============================================
// Mongoose Connection with Connection Pooling
// ============================================
// Uses global caching to prevent connection storms
// in serverless/Next.js environments.

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

// Global cache interface for Mongoose connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Declare global cache to survive hot-reloads in dev
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Connect to MongoDB via Mongoose with connection pooling.
 * - Caches connection globally to prevent connection storms
 * - Uses maxPoolSize for connection pooling
 * - bufferCommands: false for fail-fast behavior
 */
async function dbConnect(): Promise<typeof mongoose> {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection if no pending promise
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 2,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log("✅ MongoDB connected successfully via Mongoose");
        return mongooseInstance;
      })
      .catch((error) => {
        cached.promise = null;
        console.error("❌ MongoDB connection error:", error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

// Connection event listeners (only attach once)
if (mongoose.connection.listenerCount("error") === 0) {
  mongoose.connection.on("error", (err) => {
    console.error("❌ Mongoose connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ Mongoose disconnected from MongoDB");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("🔄 Mongoose reconnected to MongoDB");
  });
}

export default dbConnect;
