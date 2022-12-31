const Joi = require("joi");

exports.addStorySchema = Joi.object().keys({
  title: Joi.string().required(),
  body: Joi.string().required(),
  fileKey: Joi.string().required()
});

exports.getAllStoriesScema = Joi.object().keys({
  page:  Joi.string().regex(/^\d+$/),
  perPage:  Joi.string().regex(/^\d+$/),
})

exports.deleteStorySchema = Joi.object().keys({
  _id:  Joi.string().hex().length(24)
})
