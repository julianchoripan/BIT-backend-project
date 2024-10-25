import { body } from "express-validator";

const orderValidation = {
  create: [
    body("products[0].quantity")
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
