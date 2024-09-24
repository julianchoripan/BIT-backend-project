import express from "express";
import fs from "fs";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/database.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
const app = express();
const port = 3000;

app.use(express.json());

const newavatar = path.join(import.meta.dirname, "avatar/imgUser/imgProducts");


if (!fs.existsSync(newavatar)) {
  fs.mkdirSync(newavatar, { recursive: true });
}

connectDB();
app.use(authRoutes);
app.use(orderRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(
  "/api/avatars",
  express.static(path.join(import.meta.dirname, "avatar/imgUser"))
);

//servidor en escucha
app.listen(process.env.APP_PORT, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
