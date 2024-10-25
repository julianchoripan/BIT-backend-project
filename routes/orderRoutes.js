import orderController from "../controllers/orderController.js";
import express from "express";
import { expressjwt } from "express-jwt";
import adminAccess from "../middleware/adminValidator.js";
import orderValidation from "../middleware/orderValidator.js";
const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;

// function checkJwt() {
//   expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] });
// }
router.get(
  "/api/orders/deleted",
  expressjwt({ secret: jwtSecret, algorithms: ["HS256"] }),
  adminAccess,
  orderController.getAllOrderDeleted
);
router.get(
  "/api/orders",
  expressjwt({ secret: jwtSecret, algorithms: ["HS256"] }),
  adminAccess,
  orderController.getAll
);
router.get(
  "/api/orders/:id",
  expressjwt({ secret: jwtSecret, algorithms: ["HS256"] }),
  adminAccess,
  orderController.getOrderById
);
router.post(
  "/api/orders",
  expressjwt({ secret: jwtSecret, algorithms: ["HS256"] }),
  //orderValidation.create,
  orderController.createOrder
);
router.patch(
  "/api/orders/:id",
  expressjwt({ secret: jwtSecret, algorithms: ["HS256"] }),
  adminAccess,
  orderController.updateOrder
);
router.delete(
  "/api/orders/:id",
  expressjwt({ secret: jwtSecret, algorithms: ["HS256"] }),
  adminAccess,
  orderController.destroyOrder
);

export default router;
