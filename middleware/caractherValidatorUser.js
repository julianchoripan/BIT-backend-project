// import { body } from "express-validator";

// const caractherValidatorUser = {
//   create: [
//     body("username")
//       .notEmpty()
//       .withMessage("El campo userName  es obligatorio")
//       .isString("El valor userName debe ser un string"),
//     body("firstName")
//       .notEmpty()
//       .withMessage("El campo firstName es obligatorio")
//       .isString("El valor firstName debe ser un string"),
//     body("lastName")
//       .notEmpty()
//       .withMessage("El campo lastName  es obligatorio")
//       .isString("El valor lastName debe ser un string"),
//     body("email", "Ups!! Email is required").not().isEmpty(),
//     body("email", "Email is invalid!!").normalizeEmail().isEmail(),
//     body(
//       "password",
//       "Hey!! pasword must contain at least, uppercase, lowercase, numbers and characters"
//     ).isStrongPassword(),
//     body("age", "Ups!!  is required").not().isEmpty(),
//     body("address", "Ups!! Address is required").not().isEmpty(),
//     body("phoneNumber", "Ups!! Phone number is required").not().isEmpty(),
//   ],
// };
// export default caractherValidatorUser;

import { body, validationResult } from "express-validator";

const caractherValidatorUser = {
  create: [
    body("username")
      .notEmpty()
      .withMessage("El campo userName es obligatorio")
      .isString()
      .withMessage("El valor userName debe ser un string"),
    body("firstName")
      .notEmpty()
      .withMessage("El campo firstName es obligatorio")
      .isString()
      .withMessage("El valor firstName debe ser un string"),
    body("lastName")
      .notEmpty()
      .withMessage("El campo lastName es obligatorio")
      .isString()
      .withMessage("El valor lastName debe ser un string"),
    body("email", "Ups!! Email is required").not().isEmpty(),
    body("email", "Email is invalid!!").normalizeEmail().isEmail(),
    body(
      "password",
      "Hey!! pasword must contain at least, uppercase, lowercase, numbers and characters"
    ).isStrongPassword(),
    body("age", "Ups!! is required").not().isEmpty(),
    body("address", "Ups!! Address is required").not().isEmpty(),
    body("phoneNumber", "Ups!! Phone number is required").not().isEmpty(),
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
};

export default caractherValidatorUser;
