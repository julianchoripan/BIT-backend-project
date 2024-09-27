import mongoose from "mongoose";
import Product from "../models/Product.js";

const order = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    total: Number,
    shippingAdress: String,
    paymentMethod: {
      type: String,
      enum: ["creditCard", "cash", "savingsAccount", "currentAccount"],
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, //createdAt, updateAt
  }
);

const Order = mongoose.model("Order", order);

export default Order;
