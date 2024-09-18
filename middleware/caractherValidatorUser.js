import { body } from "express-validator";

const caractherValidatorUser = {
  create: [
    body("userName")
      .notEmpty()
      .withMessage("El campo userName  es obligatorio")
      .isString("El valor userName debe ser un string"),
    body("firstName")
      .notEmpty()
      .withMessage("El campo firstName es obligatorio")
      .isString("El valor firstName debe ser un string"),
    body("lastName")
      .notEmpty()
      .withMessage("El campo lastName  es obligatorio")
      .isString("El valor lastName debe ser un string"),
      body("email")
      .notEmpty()
      .withMessage("El campo email  es obligatorio")
      .isString("El valor email debe ser un string"),
      body("password")
      .notEmpty()
      .withMessage("El campo password  es obligatorio")
      .isString("El valor password debe ser un string"),
  ]
};
export default  caractherValidatorUser;