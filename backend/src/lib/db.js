import mongoose from "mongoose";
import { ENV } from "./env.js";

async function connectDataBase() {
  try {
    const connectionInstance = await mongoose.connect(ENV.MONGO_DB_URI);

    console.log(
      "Database connect successfully",
      connectionInstance.connection.host,
    );
  } catch (error) {
    console.error("Failed to connect database!!", error);
    process.exit(1);
  }
}

export default connectDataBase;
