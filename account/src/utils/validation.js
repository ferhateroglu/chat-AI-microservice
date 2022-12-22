const Joi = require("joi");

exports.deleteUser = Joi.object().keys({
  _id: Joi.string().length(24).required(),
});
