import mongoose from "mongoose";

async function connectDataBase() {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_DB_URI);

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
