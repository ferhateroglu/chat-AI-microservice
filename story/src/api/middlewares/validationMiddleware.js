const {FormatJoiMessage} = require("../../utils")
module.exports = (schema) => (req, res, next) => {
  try{
    const keys =  {...req.query, ...req.body, ...req.params}
    const { error } = schema.validate(keys);
    if (error) {
      let errorMessage = FormatJoiMessage(error.details[0].message);
      res.status(422).json({ message: errorMessage });
    } else {
      next();
    }
  }catch(err){
    throw err
  }
};
