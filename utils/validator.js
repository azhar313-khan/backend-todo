const joi = require("joi");

exports.signUpValidator = (data) => {
  const schema = joi.object({
    name: joi.string().min(3).max(20).required(),
    password: joi.string().min(6).max(20).required(),
    email: joi.string().min(6).required().email(),
  });
  return schema.validate(data);
};

exports.loginValidator = (data) => {
  const schema = joi.object({
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).max(30).required(),
  });
  return schema.validate(data);
};
