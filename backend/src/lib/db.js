import mongoose from "mongoose";

async function connectDataBase() {
  try {
    const connect = await mongoose.connect(process.env.MONGO_DB_URI);

    connect.connection.on("connected", () =>
      console.log("Database connect successfully"),
    );
  } catch (error) {
    console.error("Failed to connect database!!", error);
    process.exit(1);
  }
}

export default connectDataBase;
