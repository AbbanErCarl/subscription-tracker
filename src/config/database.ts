import mongoose from "mongoose";

export async function connectToDatabase(uri: string): Promise<void> {
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });
  console.log(`Connected to MongoDB (${mongoose.connection.name})`);
}

export async function disconnectFromDatabase(): Promise<void> {
  await mongoose.disconnect();
  console.log(`Disconnected from MongoDB (${mongoose.connection.name})`);
}
