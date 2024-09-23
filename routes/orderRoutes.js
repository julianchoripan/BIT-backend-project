import orderController from "../controllers/orderController.js";
import express from "express";
import { expressjwt } from "express-jwt";
import Order from "../models/Order.js";
import adminValidation from "../middlewares/adminValidation.js";
import orderValidation from "../middlewares/orderValidator.js";
const router = express.Router();

// function checkJwt() {
//   expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] });
// }
router.get(
  "/api/orders/deleted",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  adminValidation,
  orderController.getAllOrderDeleted
);
router.get(
  "/api/orders",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  adminValidation,
  orderController.getAll
);
router.get(
  "/api/orders/:id",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  adminValidation,
  orderController.getOrderById
);
router.post(
  "/api/orders",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  orderValidation.create,
  orderController.createOrder
);
router.patch(
  "/api/orders/:id",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  adminValidation,
  orderController.updateOrder
);
router.delete(
  "/api/orders/:id",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  adminValidation,
  orderController.destroyOrder
);

export default router;