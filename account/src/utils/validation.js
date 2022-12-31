const Joi = require("joi");

exports.deleteUserSchema = Joi.object().keys({
  _id: Joi.string().length(24).required(),
});

exports.loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});
exports.registerSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  username: Joi.string().min(6).required()  
});

exports.resetPassSchema = Joi.object().keys({
  token: Joi.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/),
  newPassword: Joi.string().min(6).required(),
});

exports.forgotPassSchema = Joi.object().keys({
  email: Joi.string().email().required(),
});

exports.addLikeSchema = Joi.object().keys({
  storyId: Joi.string().length(24).required(),
});

exports.delLikeSchema = Joi.object().keys({
  _id: Joi.string().length(24).required(),
});