import { jest } from "@jest/globals";
import request from "supertest";

// // jest.mock("../models/User", () => {
// //   return {
// //     find: jest.fn(),
// //     // findOne: jest.fn(),
// //     // findByIdAndUpdate: jest.fn(),
// //     // findById: jest.fn(),
// //   };
// // });
// jest.mock("../models/User", () => {
//   return {
//     find: jest.fn().mockResolvedValueOnce([
//       {
//         _id: "test-user-id",
//         username: "yen87",
//         firstName: "Yeniffer",
//         lastName: "Ochoa",
//         email: "user@gmail.com",
//         age: 37,
//         address: "Cl 42 85 - 11",
//         phoneNumber: 3128739574,
//       },
//     ]),
//   };
// });

// describe("GET ALL USERS", () => {
//   let userId = "test-user-id",
//     username = "yen87",
//     firstName = "Yeniffer",
//     lastName = "Ochoa",
//     email = "user@gmail.com",
//     age = 37,
//     address = "Cl 42 85 - 11",
//     phoneNumber = 3128739574;

//   let mockUsers = {
//     _id: userId,
//     username: username,
//     firstName: firstName,
//     lastName: lastName,
//     email: email,
//     age: age,
//     address: address,
//     phoneNumber: phoneNumber,
//   };
//   let userMockArray = [mockUsers];

//   const urlGetAllUsers = "/api/users";
//   const getErrorResponse = { ok: false, msg: "Server error" };
//   // it("Trying to get a user, but he or she is not in the database.", async () => {
//   //   //Arrange -
//   //   User.find.mockResolvedValueOnce(null);
//   //   //Act - Llamar a la API
//   //   const response = await request(app).get(urlGetAllUsers);

//   //   //Assert
//   //   expect(response.statusCode).toBe(401);
//   //   console.log(response.body);
//   //   expect(response.body).toEqual({ ok: false, msg: "User not found" });
//   // });
//   it("Should get all users", async () => {
//     //Arrange - Be prepared to receive a list to call the model's find() method
//     User.find.mockResolvedValueOnce(userMockArray);

//     //Act - Call API
//     const response = await request(app).get(urlGetAllUsers);

//     //Assert
//     expect(response.statusCode).toBe(200);
//   });
// });

jest.unstable_mockModule("../models/User.js", () => {
  ({
    default: {
      find: jest.fn(),
    },
  });
});

jest.unstable_mockModule("../controllers/userController.js", () => ({
  default: {
    create: jest.fn(),
  },
}));

const { default: User } = await import("../models/User.js");
const app = (await import("../server.js")).default;
