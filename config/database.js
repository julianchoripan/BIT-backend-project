import mongoose from "mongoose";

async function connectDB() {
  try {
    const connection = await mongoose.connect("mongodb://localhost:27017");
    console.log("Se ha establecido conexión con la base de datos");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDB;
