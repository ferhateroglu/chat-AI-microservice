const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET } = require("../config");

//Utility functions
(module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
}),
  (module.exports.GeneratePassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
  });

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

(module.exports.GenerateSignature = async (payload) => {
  return await jwt.sign(payload, SECRET, { expiresIn: "1d" });
}),
  (module.exports.ValidateSignature = async (req) => {
    try {
      const signature = req.get("Authorization");
      if (signature) {
        const payload = await jwt.verify(signature.split(" ")[1], SECRET);
        req.user = payload;
        return true;
      }

      return false;
    } catch (err) {
      throw err
    }
  });

module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};
