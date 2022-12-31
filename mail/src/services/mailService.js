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

  async sendTokenMail({ email, token }) {
    try {
      // send mail logic
      const RESET_LINK = "http://localhost:3000/reset-password/" + token;
      SendEmail(email, "Password reset", RESET_LINK);
    } catch (err) {
      throw err;
    }
  }

  async SubscribeEvents(payload) {
    const { event, data } = payload;

    const { email } = data;
    switch (event) {
      case "SEND_TOKEN_MAIL":
        try {
          const { email, token } = data;
          this.sendTokenMail({ email, token });
        } catch (err) {
          throw err;
        }
        break;
    }
  }
}

module.exports = MailService;
