import mongoose from "mongoose";

async function connectDB() {
  try {
    const connection = await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Se ha establecido conexión con la base de datos");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDB;
