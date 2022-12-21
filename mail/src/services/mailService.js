const {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
  PublisAccountEvent,
  SendEmail,
} = require("../utils");
const {
  APIError,
  BadRequestError,
  ConflictError,
  STATUS_CODES,
} = require("../utils/appErrors");
const { BASE_URL } = require("../config");

// All bussiness logic is here

class MailService {
  constructor() {
    //this.repository = new MailRepository();
  }
  async resetPassword(email) {
    try {
      // check is email exist
      const payload = { event: "EMAIL_CHECK", data: { email } };
      const { data } = await PublisAccountEvent(payload);
      if (data.statusCode !== 200) {
        return data;
      }
      //create token
      const token = await GenerateSignature({                          
        email,
        resetPassword: true
      });
      //send mail logic
      const RESET_LINK = BASE_URL + "/resetPassword/" + token;
      await SendEmail(email, "Password reset", RESET_LINK);

      return { message: "EMAIL_SENT_SUCCESSFULLY", statusCode: 200 };
    } catch (err) {
      throw err;
    }
  }
  async SubscribeEvents(payload) {
    const { event, data } = payload;

    const { email } = data;
    switch (event) {
      case "SEND_RESET_PASSWORD_MAIL":
        console.log("SEND_RESET_PASSWORD_MAIL");
        this.resetPassword(email);
        break;
    }
  }
}

module.exports = MailService;
