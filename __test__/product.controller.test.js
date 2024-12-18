import { jest } from "@jest/globals";
//import { validationResult } from "express-validator";
//import ProductController from "../controllers/productController.js";

//Mock de los datos del producto
const mockProduct = {
  cod: "001",
  name: "Test Product",
  description: "Test Description",
  price: 100,
  brand: "Test Brand",
  model: "Test Model",
  category: "Test Category",
  dimensions: "Test Dimensions",
  stock: 10,
  image: "mockImage.jpg",
  deletedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock de los modelos de Mongoose
jest.unstable_mockModule("../models/Product.js", () => {
  const find = jest.fn().mockReturnThis();
  const findOne = jest.fn().mockReturnThis();
  return { default: { find, findOne, create: jest.fn(), findById: jest.fn() } };
});
// Mock de express-validator
// jest.mock("express-validator", () => ({
//   validationResult: jest.fn(),
// }));

// Importar los módulos después de los mocks
const { default: Product } = await import("../models/Product.js");
const productControllerModule = await import(
  "../controllers/productController.js"
);
const productController = productControllerModule.default;

// Función mock para el objeto `req` (request) de Express
const mockReq = (data = {}, file = { filename: "test.jpg" }) => ({
  body: { ...data },
  params: { id: "productId" },
  file,
});

// Función mock para el objeto `res` (response) de Express
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res); // mock de status
  res.json = jest.fn().mockReturnValue(res); // mock de json
  return res;
};

describe("Product Controller with Mocks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  }); //

  describe("getAllProducts", () => {
    it("should return all products", async () => {
      Product.find.mockResolvedValue([mockProduct]);
      const req = mockReq();
      const res = mockRes();
      await productController.getAllProducts(req, res);
      expect(Product.find).toHaveBeenCalledWith({ deletedAt: { $eq: null } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([mockProduct]);
    });
    it("should handle server errors", async () => {
      Product.find.mockRejectedValue(new Error("Server error"));
      const req = mockReq();
      const res = mockRes();
      await productController.getAllProducts(req, res);
      expect(Product.find).toHaveBeenCalledWith({ deletedAt: { $eq: null } });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  ///
  describe("getProductById", () => {
    it("should return a product by ID", async () => {
      Product.findOne.mockResolvedValue(mockProduct);
      const req = mockReq();
      const res = mockRes();
      await productController.getProductById(req, res);
      expect(Product.findOne).toHaveBeenCalledWith({
        _id: req.params.id,
        deletedAt: { $eq: null },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });
    it("should return 404 if product not found", async () => {
      Product.findOne.mockResolvedValue(null);
      const req = mockReq();
      const res = mockRes();
      await productController.getProductById(req, res);
      expect(Product.findOne).toHaveBeenCalledWith({
        _id: req.params.id,
        deletedAt: { $eq: null },
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "product not found" });
    });
    it("should handle server errors", async () => {
      Product.findOne.mockRejectedValue(new Error("Server error"));
      const req = mockReq();
      const res = mockRes();
      await productController.getProductById(req, res);
      expect(Product.findOne).toHaveBeenCalledWith({
        _id: req.params.id,
        deletedAt: { $eq: null },
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "internal server error",
      });
    });
  });
  //
  describe("create", () => {
    it("should create a new product", async () => {
      Product.findOne.mockResolvedValue(null);
      Product.create.mockResolvedValue(mockProduct);
      const req = mockReq({
        cod: "P002",
        name: "New Product",
        description: "New Description",
        price: 150,
        brand: "New Brand",
        model: "New Model",
        category: "New Category",
        dimensions: "New Dimensions",
        stock: 20,
      });
      const res = mockRes();
      await productController.create(req, res);
      expect(Product.create).toHaveBeenCalledWith({
        cod: req.body.cod,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        brand: req.body.brand,
        model: req.body.model,
        category: req.body.category,
        dimensions: req.body.dimensions,
        stock: req.body.stock,
        image: req?.file?.filename,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });
    it("should return an error if product already exists", async () => {
      Product.findOne.mockResolvedValue(mockProduct);
      const req = mockReq({ cod: "P001" });
      const res = mockRes();
      await productController.create(req, res);
      expect(res.json).toHaveBeenCalledWith({
        message:
          "El producto ya está creado por favor ingresa a la opción de actualizar",
      });
    });
    it("should handle server errors", async () => {
      Product.findOne.mockRejectedValue(new Error("Server error"));
      const req = mockReq({ cod: "P002" });
      const res = mockRes();
      await productController.create(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "internal server error",
      });
    });
  });
  //
  describe("updateProduct", () => {
    it("should update a product", async () => {
      const updatedProduct = { ...mockProduct, name: "Updated Product" };
      Product.findById.mockResolvedValue(mockProduct);
      mockProduct.save = jest.fn().mockResolvedValue(updatedProduct);
      const req = mockReq({ name: "Updated Product" });
      const res = mockRes();
      await productController.updateProduct(req, res);
      expect(Product.findById).toHaveBeenCalledWith(req.params.id);
      expect(mockProduct.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith("el producto ha sido actualizada");
    });
    it("should return an error if product ID does not exist", async () => {
      Product.findById.mockResolvedValue(null);
      const req = mockReq();
      const res = mockRes();
      await productController.updateProduct(req, res);
      expect(res.json).toHaveBeenCalledWith("el id del producto no existe");
    });
    it("should handle server errors", async () => {
      Product.findById.mockRejectedValue(new Error("Server error"));
      const req = mockReq();
      const res = mockRes();
      await productController.updateProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });
  //
  describe("updateProduct", () => {
    it("should update a product", async () => {
      const updatedProduct = { ...mockProduct, name: "Updated Product" };
      Product.findById.mockResolvedValue(mockProduct);
      mockProduct.save = jest.fn().mockResolvedValue(updatedProduct);
      const req = mockReq({ name: "Updated Product" });
      const res = mockRes();
      await productController.updateProduct(req, res);
      expect(Product.findById).toHaveBeenCalledWith(req.params.id);
      expect(mockProduct.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith("el producto ha sido actualizada");
    });
    it("should return an error if product ID does not exist", async () => {
      Product.findById.mockResolvedValue(null);
      const req = mockReq();
      const res = mockRes();
      await productController.updateProduct(req, res);
      expect(res.json).toHaveBeenCalledWith("el id del producto no existe");
    });
    it("should handle server errors", async () => {
      Product.findById.mockRejectedValue(new Error("Server error"));
      const req = mockReq();
      const res = mockRes();
      await productController.updateProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });
  //
  describe("destroy", () => {
    it("should delete a product", async () => {
      Product.findById.mockResolvedValue(mockProduct);
      mockProduct.save = jest.fn().mockResolvedValue(mockProduct);
      const req = mockReq();
      const res = mockRes();
      await productController.destroy(req, res);
      expect(Product.findById).toHaveBeenCalledWith(req.params.id);
      expect(mockProduct.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith("se ha eliminado el producto");
    });
    it("should handle server errors", async () => {
      Product.findById.mockRejectedValue(new Error("Server error"));
      const req = mockReq();
      const res = mockRes();
      await productController.destroy(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });
  //
});
