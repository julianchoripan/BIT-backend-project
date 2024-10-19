import express from "express";
import fs from "fs";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/database.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import "dotenv/config";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
connectDB();
app.use(
  "/api/avatars",
  express.static(path.join(import.meta.dirname, "avatar"))
);

app.use(authRoutes);
app.use(orderRoutes);
app.use(userRoutes);
app.use(productRoutes);

//servidor en escucha
app.listen(process.env.APP_PORT, () => {
  console.log(`[Server] Server running at ${process.env.APP_PORT} port`);
});
