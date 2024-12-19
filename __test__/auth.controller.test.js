import { jest } from "@jest/globals";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Mock de los datos del usuario
const mockUser = {
  _id: "userId",
  id: "userId",
  username: "mockUser",
  firstName: "Mock",
  lastName: "User",
  email: "mockuser@example.com",
  password: "$2a$10$mockhashedpassword", // contraseña hasheada para comparación
  age: 25,
  address: "123 Street, City, Country",
  phoneNumber: "1234567890",
  deletedAt: null,
  image: "mockImage.jpg",
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock de los modelos de Mongoose
jest.unstable_mockModule("../models/User.js", () => {
  return {
    default: {
      findOne: jest.fn(),
    },
  };
});

// Importar los módulos después de los mocks
const { default: User } = await import("../models/User.js");
const authControllerModule = await import("../controllers/authController.js");
const authController = authControllerModule.default;

// Función mock para el objeto `req` (request) de Express
const mockReq = (data = {}) => ({
  body: { ...data },
});

// Función mock para el objeto `res` (response) de Express
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Auth Controller with Mocks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("debería retornar un token si el login es exitoso", async () => {
      User.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
      jest.spyOn(jwt, "sign").mockReturnValue("mockToken");

      const req = mockReq({
        email: "mockuser@example.com",
        password: "password",
      });
      const res = mockRes();

      await authController.login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({
        email: req.body.email.toLowerCase(),
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        req.body.password,
        mockUser.password
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { prueba: "123", id: mockUser.id },
        process.env.JWT_SECRET
      );
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ token: "mockToken" });
    });

    it("debería retornar 501 si las credenciales son incorrectas", async () => {
      User.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

      const req = mockReq({
        email: "mockuser@example.com",
        password: "wrongpassword",
      });
      const res = mockRes();

      await authController.login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({
        email: req.body.email.toLowerCase(),
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        req.body.password,
        mockUser.password
      );
      expect(res.status).toHaveBeenCalledWith(501);
      expect(res.json).toHaveBeenCalledWith("Las credenciales son incorrectas");
    });

    it("debería retornar 500 si hay un error del servidor", async () => {
      User.findOne.mockRejectedValue(new Error("Server error"));

      const req = mockReq({
        email: "mockuser@example.com",
        password: "password",
      });
      const res = mockRes();

      await authController.login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({
        email: req.body.email.toLowerCase(),
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });
});
