const jwt = require("jsonwebtoken");

const { SECRET } = require("../config");
const { APIError, STATUS_CODES } = require('./appErrors');
const axios = require("axios");

//Utility functions

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

module.exports.JwtPolicy = async (req,res,next)=>{
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
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

module.exports.PublishAccountEvents = async(payload) => {   
  try{
    axios.post('http://localhost:8080/accountEvents', {payload})
  }catch(err){
    throw err
  }
}





