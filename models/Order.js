import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    products: [
      {
        quantity: Number,
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
