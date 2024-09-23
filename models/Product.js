import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    cod: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    dimensions: {
      type: String,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    avatar: {
      type: String,
      required: false, 
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)
const Product = mongoose.model("Product", productSchema);

export default Product;
