import { jest } from "@jest/globals";

// Mock express-validator's validationResult to check for validation errors
jest.unstable_mockModule("express-validator", () => ({
  ...jest.requireActual("express-validator"),
  validationResult: jest.fn(),
}));
const { validationResult } = await import("express-validator");

// Simulating valid request data
const validData = {
  username: "testUser",
  firstName: "John",
  lastName: "Doe",
  email: "test@example.com",
  password: "StrongPass123!",
  age: 25,
  address: "123 Main St",
  phoneNumber: "1234567890",
};

// Simulating invalid request data (missing 'username')
const invalidData = {
  firstName: "John",
  lastName: "Doe",
  email: "test@example.com",
  password: "StrongPass123!",
  age: 25,
  address: "123 Main St",
  phoneNumber: "1234567890",
};

// Simulating invalid request data (invalid email)
const invalidData2 = {
  username: "testUser",
  firstName: "John",
  lastName: "Doe",
  email: "invalid-email",
  password: "StrongPass123!",
  age: 25,
  address: "123 Main St",
  phoneNumber: "1234567890",
};

// Simulating invalid request data (weak password)
const invalidData3 = {
  username: "testUser",
  firstName: "John",
  lastName: "Doe",
  email: "test@example.com",
  password: "weak", // Weak password
  age: 25,
  address: "123 Main St",
  phoneNumber: "1234567890",
};

// Simulating invalid request data (missing phoneNumber)
const invalidData4 = {
  username: "testUser",
  firstName: "John",
  lastName: "Doe",
  email: "test@example.com",
  password: "StrongPass123!",
  age: 25,
  address: "123 Main St",
};

// Definir comportamiento del mock después de importarlo
validationResult.mockImplementation(() => ({
  isEmpty: jest.fn().mockReturnValue(true),
  array: jest.fn().mockReturnValue([]),
}));

// Importar después de los mocks
const { default: User } = await import("../models/User.js");
const userValidatorModule = await import(
  "../middleware/caractherValidatorUser.js"
);
const caractherValidatorUser = userValidatorModule.default;

// Mock request, response, and next
const mockReq = (data = {}) => ({
  body: { ...data },
});

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = jest.fn();

describe("caractherValidatorUser Middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should pass validation for valid input data", async () => {
    const req = mockReq(validData);
    const res = mockRes();
    // Mocking validationResult manually
    validationResult.mockReturnValueOnce({
      isEmpty: jest.fn().mockReturnValue(true),
      array: jest.fn().mockReturnValue([]),
    });

    // Call the middleware
    await caractherValidatorUser.create[9](req, res, mockNext);

    // Assert that next() was called (no validation errors, so request passes through)
    expect(mockNext).toHaveBeenCalled();
  });

  it("should return validation errors for missing required fields", async () => {
    const req = mockReq(invalidData);
    const res = mockRes();
    validationResult.mockReturnValueOnce({
      isEmpty: jest.fn().mockReturnValue(false),
      array: jest
        .fn()
        .mockReturnValue([
          { msg: "El campo userName es obligatorio", param: "username" },
        ]),
    });

    // Call the middleware
    await caractherValidatorUser.create[9](req, res, mockNext);

    // Assert that the response status is 400 and the error message is returned
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: [{ msg: "El campo userName es obligatorio", param: "username" }],
    });

    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should return validation errors for invalid email", async () => {
    const req = mockReq(invalidData2);
    const res = mockRes();
    validationResult.mockReturnValueOnce({
      isEmpty: jest.fn().mockReturnValue(false),
      array: jest
        .fn()
        .mockReturnValue([{ msg: "Email is invalid!!", param: "email" }]),
    });

    // Call the middleware

    await caractherValidatorUser.create[9](req, res, mockNext);
    // Validate email field

    // Assert that the response status is 400 and the error message is returned

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: [{ msg: "Email is invalid!!", param: "email" }],
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should return validation errors for weak password", async () => {
    const req = mockReq(invalidData3);
    const res = mockRes();
    validationResult.mockReturnValueOnce({
      isEmpty: jest.fn().mockReturnValue(false),
      array: jest.fn().mockReturnValue([
        {
          msg: "Hey!! pasword must contain at least, uppercase, lowercase, numbers and characters",
          param: "password",
        },
      ]),
    });
    // Call the middleware
    await caractherValidatorUser.create[9](req, res, mockNext); // Validate password field

    // Assert that the response status is 400 and the error message is returned
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: [
        {
          msg: "Hey!! pasword must contain at least, uppercase, lowercase, numbers and characters",
          param: "password",
        },
      ],
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
  it("should return validation errors for missing phone number", async () => {
    const req = mockReq(invalidData4);
    const res = mockRes();
    validationResult.mockReturnValueOnce({
      isEmpty: jest.fn().mockReturnValue(false),
      array: jest
        .fn()
        .mockReturnValue([
          { msg: "Ups!! Phone number is required", param: "phoneNumber" },
        ]),
    });
    // Call the middleware
    await caractherValidatorUser.create[9](req, res, mockNext); // Validate phoneNumber field

    // Assert that the response status is 400 and the error message is returned
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: [{ msg: "Ups!! Phone number is required", param: "phoneNumber" }],
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
