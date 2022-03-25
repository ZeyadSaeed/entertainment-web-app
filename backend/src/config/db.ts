import mongoose from "mongoose";
import winston from "winston";

export default async () => {
  if (process.env.MONGO_URI) {
    await mongoose.connect(process.env.MONGO_URI);
    winston.info("Connected to MongoDb...");
  }
};
