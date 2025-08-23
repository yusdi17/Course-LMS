import mongoose from "mongoose";
export default function connectDB(){
  const DATABSE_URL = process.env.DATABASE_URL;
  
  try {
    mongoose.connect(DATABSE_URL)
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  const dbConn = mongoose.connection;

  dbConn.once("open", () => {
    console.log(`MongoDB Connected: ${DATABSE_URL}`);
  });
  dbConn.on("error", (err) => {
    console.log(`MongoDB connection error: ${err}`);
  });
}