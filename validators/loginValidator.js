const { body } = require("express-validator");

const validator = [
  body("password").notEmpty().withMessage("Password required."),
];

module.exports = validator;
