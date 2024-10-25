import { validationResult } from "express-validator";
import Product from "../models/Product.js";

async function getAllProducts(req, res) {
  try {
    const product = await Product.find({ deletedAt: { $eq: null } });
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getProductById(req, res) {
  try {
    const ProductId = req.params.id;
    console.log(ProductId);
    const ProductFound = await Product.findOne({
      _id: ProductId,
      deletedAt: { $eq: null },
    });
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
  const result = validationResult(req);
  if (result.isEmpty()) {
    const {
      cod,
      name,
      description,
      price,
      brand,
      model,
      category,
      dimensions,
      stock,
    } = req.body;
    const productCreated = await Product.findOne({ cod: cod });
    //console.log(productCreated);
    if (!productCreated) {
      const newProduct = await Product.create({
        cod,
        name,
        description,
        price,
        brand,
        model,
        category,
        dimensions,
        stock,
        image: req.file.filename,
      });
      return res.status(201).json(newProduct);
    } else {
      return res.json({
        message:
          "El producto ya está creado por favor ingresa a la opción de actualizar",
      });
    }
  }
  return res.json({ error: result.array() });
}

async function updateProduct(req, res) {
  try {
    const product = req.body;
    const productId = await Product.findById(req.params.id);

    if (productId !== null) {
      productId.name = product.name || productId.name;
      productId.descripcition = product.description || productId.description;
      productId.price = product.price || productId.price;
      productId.brand = product.brand || productId.brand;
      productId.model = product.model || productId.model;
      productId.category = product.category || productId.category;
      productId.dimensions = product.dimensions || productId.dimensions;
      productId.stock = product.stock || productId.stock;

      await productId.save();
      return res.json("el producto ha sido actualizada");
    } else {
      return res.json("el id del producto no existe");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function destroy(req, res) {
  try {
    const productDelete = await Product.findById(req.params.id);
    productDelete.deletedAt = Date.now();
    productDelete.save();

    return res.json("se ha eliminado el producto");
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
