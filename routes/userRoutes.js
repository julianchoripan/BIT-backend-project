import express from "express";
import userController from "../controllers/userController.js";
import { upload, handleUploadSupabase } from "../config/multer.js";
import { expressjwt } from "express-jwt";

import caractherValidatorUser from "../middlewares/caractherValidatorUser.js";
import adminValidation from "../middlewares/adminValidation.js";
const router = express.Router();

router.get(
  "/api/users",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  adminValidation,
  userController.getAllUsers
);
router.get(
  "/api/users/:id",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  adminValidation,
  userController.getUserById
);
router.post(
  "/api/users",
  upload.single("imgUser"),
  handleUploadSupabase,
  caractherValidatorUser.create,
  userController.createUser
);
router.patch(
  "/api/users/:id",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  adminValidation,
  userController.updateUser
);
router.delete(
  "/api/users/:id",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  adminValidation,
  userController.deleteUser
);
router.get(
  "/api/getOwnUser/:password",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  userController.getOwnUser
);

export default router;
