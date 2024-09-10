import express from "express";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/database.js";

const app = express();
const port = 3000;

app.use(express.json());

connectDB();

app.use(userRoutes);

//servidor en escucha
app.listen(port, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
