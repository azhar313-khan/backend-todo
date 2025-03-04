const joi = require("joi");

exports.signUpValidator = (data) => {
  const schema = joi.object({
    name: joi.string().min(3).max(20).required(),
    password: joi
      .string()
      .min(6)
      .regex(/[A-Z]/, "uppercase letter")
      .regex(/[a-z]/, "lowercase letter")
      .regex(/[0-9]/, "digit")
      .regex(/[\W_]/, "special character")
      .messages({
        "string.base": "Password must be a string",
        "string.empty": "Password cannot be empty",
        "string.min": "Password must be at least 6 characters long",
        "string.pattern.name": "Password must contain at least one {#name}",
      }),
    email: joi.string().min(6).required().email(),
  });
  
  return schema.validate(data);
};

exports.loginValidator = (data) => {
  const schema = joi.object({
    email: joi.string().min(6).required().email(),
    password: joi
      .string()
      .min(6)
      .regex(/[A-Z]/, "uppercase letter")
      .regex(/[a-z]/, "lowercase letter")
      .regex(/[0-9]/, "digit")
      .regex(/[\W_]/, "special character")
      .messages({
        "string.base": "Password must be a string",
        "string.empty": "Password cannot be empty",
        "string.min": "Password must be at least 6 characters long",
        "string.pattern.name": "Password must contain at least one {#name}",
      }),
  });
  return schema.validate(data);
};
