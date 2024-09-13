import express from "express";
import productController from "../controllers/productController.js";

const router = express.Router();

router.get("/api/products", productController.getAllProducts);
router.get("/api/products/:id", productController.getProductById);
router.post("/api/products", productController.create);
router.patch("/api/products/:id", productController.updateProduct);
router.delete("/api/products/:id", productController.destroy);

export default router;
