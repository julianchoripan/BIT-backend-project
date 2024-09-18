import express from "express";
import authControler from "./middleware/authController.js";

const router = express.Router();

router.post("/api/login", authControler.login);

export default router;