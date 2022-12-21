const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const nodemailer = require("nodemailer");

const { SECRET,EMAIL,EMAIL_PASSWORD } = require("../config");

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
  return await jwt.sign(payload, SECRET, { expiresIn: "1d" });
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

module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

module.exports.PublisAccountEvent = async (payload) => {
  try {
    return await axios({
      method: "POST",
      url: "http://localhost:8080/accountEvents",
      data: { payload },
      validateStatus: (status) => {
        return status < 500;
      },
    });
  } catch (err) {
    throw err;
  }
};

module.exports.SendEmail = async (email, subject, RESET_LINK) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false,
      auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: EMAIL,
      to: "ferhateroglu1907@gmail.com",
      subject: subject,
      text: RESET_LINK,
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};
