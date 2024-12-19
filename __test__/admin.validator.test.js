import { jest } from "@jest/globals";

// Mock a user with roleCode 900 (admin)
const adminUser = {
  _id: "adminId123",
  roleCode: 900,
};

// Mock de los modelos de Mongoose
jest.unstable_mockModule("../models/User.js", () => {
  return {
    default: {
      findById: jest.fn(),
    },
  };
});

// Importar después de los mocks
const { default: User } = await import("../models/User.js");
const adminValidatorModule = await import("../middleware/adminValidator.js");
const adminAccess = adminValidatorModule.default;

// Mock request, response, and next
const mockReq = (userId) => ({
  auth: { id: userId },
});

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = jest.fn();

describe("adminAccess Middleware", () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  it("should allow access to admin users (roleCode = 900)", async () => {
    User.findById.mockResolvedValue(adminUser); // Simulate successful user retrieval

    const req = mockReq("adminId123");
    const res = mockRes();

    // Call the middleware
    await adminAccess(req, res, mockNext);

    // Assert that next() was called (middleware allowed the request to pass)
    expect(mockNext).toHaveBeenCalled();
  });

  it("should deny access to non-admin users (roleCode != 900)", async () => {
    // Mock a non-admin user
    const nonAdminUser = {
      _id: "userId123",
      roleCode: 100, // Non-admin
    };

    User.findById.mockResolvedValue(nonAdminUser); // Simulate successful user retrieval

    const req = mockReq("userId123");
    const res = mockRes();

    // Call the middleware
    await adminAccess(req, res, mockNext);

    // Assert that the response status is 401 and the error message is sent
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith("No eres Administrador");
    expect(mockNext).not.toHaveBeenCalled(); // Ensure next() was not called
  });

  it("should return 500 on error when finding the user", async () => {
    // Simulate an error when fetching the user
    User.findById.mockRejectedValue(new Error("Database error"));

    const req = mockReq("userId123");
    const res = mockRes();

    // Call the middleware
    await adminAccess(req, res, mockNext);

    // Assert that the response status is 500 and the error message is sent
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith("Internal server error");
    expect(mockNext).not.toHaveBeenCalled();
  });
});
