import express from "express";
import productController from "../controllers/productController.js";
import productController from "../controllers/productController.js";

const router = express.router();

router.get("/api/products", productController.getAllProducts);
router.get("/api/products/:id", productController.getProductById);
router.post("/api/products", productController.createProductById);
router.patch("/a[i/products/id", productController.updateProduct);
router.delete("/api/products/:id", productController.deleteProduct);

export default router;