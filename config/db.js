import { configDotenv } from 'dotenv';
import mongoose from 'mongoose';

configDotenv();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("DataBase connection is successful'");
  } catch (error) {
    console.error('DataBase is not successfully connected:', error);
    process.exit(1);
  }
};
