import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get("/api/users", userController.getAllUsers);
router.get("/api/users/:id", userController.getUserById);
router.post("/api/users", userController.createUser);
router.patch("/api/users/:id", userController.updateUser);
router.delete("/api/users/:id", userController.deleteUser);

export default router;
