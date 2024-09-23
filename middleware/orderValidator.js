import { body } from "express-validator";

const orderValidation = {
  create: [
    body("user")
      .notEmpty()
      .withMessage("El campo user  es obligatorio")
      .isString("El valor user debe ser un string"),
    body("products[0].product")
      .notEmpty()
      .withMessage("El campo id es obligatorio")
      .isString("El valor id debe ser un string"),
    body("products[1].quantity")
      .notEmpty()
      .withMessage("El campo id es obligatorio")
      .isNumeric("El valor id debe ser un número"),
    body("shippingAdress")
      .notEmpty()
      .withMessage("El campo dirección de envío es obligatorio")
      .isString("El valor dirección de enviódebe ser un string"),
  ],
};
export default orderValidation;
