const {FormatJoiMessage} = require("../../utils")
module.exports = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    let errorMessage = FormatJoiMessage(error.details[0].message);
    res.status(422).json({ message: errorMessage });
  } else {
    next();
  }
};
