import express from "express";
import upload from "../config/multer.js"
import adminAccess from "../middleware/adminValidator.js"
import productController from "../controllers/productController.js";
import productValidation from "../middleware/productsValidator.js"
const router = express.Router();

router.get("/api/products", productController.getAllProducts);
router.get("/api/products/:id", productController.getProductById);
router.post("/api/products", adminAccess, upload.single("avatar"), productValidation.create , productController.create);
router.patch("/api/products/:id", adminAccess, productController.updateProduct);
router.delete("/api/products/:id", adminAccess, productController.destroy);

export default router;
