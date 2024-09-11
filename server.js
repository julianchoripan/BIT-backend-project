import express from "express";
import fs from "fs";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/database.js";

const app = express();
const port = 3000;

app.use(express.json());

const newavatar = path.join(import.meta.dirname, "avatar/ImgUser");

if (!fs.existsSync(newavatar)) {
  fs.mkdirSync(newavatar, { recursive: true });
};

connectDB();

app.use(userRoutes);

//servidor en escucha
app.listen(port, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
