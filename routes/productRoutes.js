import express from "express";
import upload from "../config/multer.js";
import adminAccess from "../middleware/adminValidator.js";
import productController from "../controllers/productController.js";
import productValidation from "../middleware/productsValidator.js";
import { expressjwt } from "express-jwt";
const router = express.Router();

router.get(
  "/api/products",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  productController.getAllProducts
);
router.get(
  "/api/products/:id",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  productController.getProductById
);
router.post(
  "/api/products",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  adminAccess,
  upload.single("avatar"),
  productValidation.create,
  productController.create
);
router.patch(
  "/api/products/:id",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  adminAccess,
  productController.updateProduct
);
router.delete(
  "/api/products/:id",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  adminAccess,
  productController.destroy
);

export default router;
