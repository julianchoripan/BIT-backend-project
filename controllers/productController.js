import Product from "../models/Product.js";

async function getAllProducts(req, res) {
  try {
    const Product = await Product.find({ deletedAt: { $eq: null } }).select(
      " "
    );
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getProductById(req, res) {
  try {
    const ProductId = req.params.id;
    const ProductFound = await user
      .findOne({
        _id: ProductId,
        deletedAt: { $eq: null },
      })
      .select(" ");
    if (!ProductFound) {
      return res.status(404).json({ message: "product not found" });
    }
    return res.status(200).json(ProductFound);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
}

async function create(req, res) {
  try {
    const newProduct = await Product.create({
      name: req.body.name,
      description: req.body.detail,
      price: req.body.price,
      brand: req.body.brand,
      model: req.body.model,
      category: req.body.category,
      stock: req.body.stock,
    });
    return res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updateProduct(req, res) {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function destroy(req, res) {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default {
  getAllProducts,
  create,
  getProductById,
  destroy,
  updateProduct,
};
