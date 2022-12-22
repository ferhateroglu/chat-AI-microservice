const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET } = require("../config");
const { APIError, STATUS_CODES } = require('./appErrors');

//Utility functions
module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};
module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
  return await jwt.sign(payload, SECRET, { expiresIn: "30d" });
};
module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    if (signature) {
      const payload = await jwt.verify(signature.split(" ")[1], SECRET);
      req.user = payload;
      return true;
    }

    return false;
  } catch (err) {
    throw err;
  }
};

module.exports.VerifyResetToken = async (token) =>{
  try{
    return await jwt.verify(token, SECRET);
  }catch(err){
    console.log(err)
    return null
  }
}

module.exports.FormateData = ({data, error}) => {
  if (data) {
    return { data };
  }else if(error){
    return {error}
  } else {
    throw new Error("Data Not found!");
  }
};
module.exports.FormatJoiMessage = (message)=>{
    try{
      const regexSpace = new RegExp(" ", "g");
      const regexApostrophe = new RegExp('"', "g");
    
      message = message.replace(regexSpace, "_");
      message = message.replace(regexApostrophe, "");
      return message.toUpperCase();
    }catch(err){
      throw err
    }
}

module.exports.PublishMailEvent = async(payload) => {   
  axios.post('http://localhost:8000/mail/mailEvents', {payload})
}


