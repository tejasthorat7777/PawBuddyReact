import mongoose from "mongoose";
import app from "../src/dataBase/app.js";

const connectionCache = (globalThis.mongooseConnectionCache ??= {
  connection: null,
  promise: null,
});

async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    connectionCache.connection = mongoose.connection;
    return connectionCache.connection;
  }

  if (!connectionCache.promise) {
    connectionCache.promise = mongoose.connect(process.env.MONGODB_URI);
  }

  try {
    connectionCache.connection = await connectionCache.promise;
    return connectionCache.connection;
  } catch (error) {
    connectionCache.promise = null;
    connectionCache.connection = null;
    throw error;
  }
}

export default async function handler(req, res) {
  await connectToDatabase();
  return app(req, res);
}