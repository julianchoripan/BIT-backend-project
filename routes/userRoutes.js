import express from "express";
import userController from "../controllers/userController.js";
import upload from "../config/multer.js";
import { expressjwt } from "express-jwt";
import caractherValidatorUser from "../middleware/caractherValidatorUser.js";
import adminAccess from "../middleware/adminValidator.js";
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config()
const jwtSecret = process.env.JWT_SECRET;


router.get(
  "/api/users",
  expressjwt({ secret: jwtSecret, algorithms: ["HS256"] }),
  adminAccess,
  userController.getAllUsers
);
router.get(
  "/api/users/:id",
  expressjwt({ secret: jwtSecret, algorithms: ["HS256"] }),
  adminAccess,
  userController.getUserById
);
router.post(
  "/api/users",
  upload.single("imgUser"),
  caractherValidatorUser.create,
  userController.createUser
);
router.patch(
  "/api/users/:id",
  expressjwt({ secret: jwtSecret, algorithms: ["HS256"] }),
  adminAccess,
  userController.updateUser
);
router.delete(
  "/api/users/:id",
  expressjwt({ secret: jwtSecret, algorithms: ["HS256"] }),
  adminAccess,
  userController.deleteUser
);
router.get(
  "/api/getOwnUser/:password",
  expressjwt({ secret: jwtSecret, algorithms: ["HS256"] }),
  userController.getUserById
);

export default router;
