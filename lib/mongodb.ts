// ============================================
// Raw MongoClient for NextAuth MongoDB Adapter
// ============================================
// This is separate from Mongoose. NextAuth's adapter
// requires a raw MongoClient promise, NOT Mongoose.

import { MongoClient, MongoClientOptions } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

const uri: string = process.env.MONGODB_URI;
const options: MongoClientOptions = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// In development, use a global variable to preserve
// the MongoClient across hot-reloads
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client for each instance
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
