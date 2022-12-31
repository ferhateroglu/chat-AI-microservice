const { AccountRepository } = require("../database");
const {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
  VerifyResetToken,
} = require("../utils");
const {
  APIError,
  BadRequestError,
  ConflictError,
  STATUS_CODES,
} = require("../utils/appErrors");

// All bussiness logic is here

class AccountService {
  constructor() {
    this.repository = new AccountRepository();
  }

  async login(userInputs) {
    const { email, password } = userInputs;
    try {
      const existingUser = await this.repository.findUser({ email });
      if (existingUser) {
        const validPassword = await ValidatePassword(
          password,
          existingUser.password,
          existingUser.salt
        );
        if (validPassword) {
          const token = await GenerateSignature({
            email: existingUser.email,
            _id: existingUser._id,
            rights: existingUser.rights,
          });
          return FormateData({
            data: {
              id: existingUser._id,
              username: existingUser.username,
              token,
              image: existingUser.image,
            },
          });
        }
      }
      return FormateData({
        error: {
          statusCode: STATUS_CODES.UN_AUTHORISED,
          message: "EMAIL_OR_PASSWORD_INVALID",
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async signUp({ email, password, phone, username }) {
    try {
      if (await this.emailCheck(email)) {
        return FormateData({
          error: {
            statusCode: STATUS_CODES.CONFLICT,
            message: "EMAIL_ALREDY_EXIST",
          },
        });
      }
      // create salt
      let salt = await GenerateSalt();
      let userPassword = await GeneratePassword(password, salt);
      const existingUser = await this.repository.createUser({
        username,
        email,
        password: userPassword,
        phone,
        salt,
      });
      const token = await GenerateSignature({
        email,
        _id: existingUser._id,
      });
      return FormateData({
        data: { id: existingUser._id, username: existingUser.username, token },
      });
    } catch (err) {
      throw err;
    }
  }

  async emailCheck(email) {
    return await this.repository.findEmail({ email });
  }

  async resetPassword(token, newPassword) {
    try {
      //verify token
      const decoded = await VerifyResetToken(token);
      if (!decoded) {
        return {
          statusCode: STATUS_CODES.UN_AUTHORISED,
          message: "INVALID_TOKEN",
        };
      } else if (!decoded.resetPassword) {
        return {
          statusCode: STATUS_CODES.UN_AUTHORISED,
          message: "INVALID_TOKEN",
        };
      }

      // find user
      const user = await this.repository.findUser({ email: decoded.email });
      if (!user) {
        return {
          statusCode: STATUS_CODES.BAD_REQUEST,
          message: "USER_NOT_FOUND",
        };
      }

      // hashing
      const salt = await GenerateSalt();
      newPassword = await GeneratePassword(newPassword, salt);

      // update user
      const updatedUser = await this.repository.updateUser({
        id: user._id,
        user: { password: newPassword, salt: salt },
      });
      if (!updatedUser) {
        return {
          statusCode: STATUS_CODES.BAD_REQUEST,
          message: "USER_NOT_FOUND",
        };
      }
      return { statusCode: STATUS_CODES.OK, message: "OK" };
    } catch (err) {
      throw err;
    }
  }
  async deleteUser(_id, user) {
    try {
      if (user.rights.includes("ADMIN001")) {
        const user = await this.repository.deleteUser({ _id });
        return { data: user };
      }
      //delete
      return { data: { statusCode: STATUS_CODES.OK, message: "OK" } };
    } catch (err) {
      throw err;
    }
  }

  async addLike({user,story}){
    try {
      const response = await this.repository.addLike({story, user})
      //delete
      if(!response){
        return { error: { statusCode: STATUS_CODES.BAD_REQUEST, message: "BAD_REQ" } };
      }
      return { data: { statusCode: STATUS_CODES.OK, message: "OK" } };
    } catch (err) {
      throw err;
    }
  }
  
  async removeLike({user,_id}){
    try {
      const response = await this.repository.removeLike({_id, user})
      //delete
      if(!response){
        return { error: { statusCode: STATUS_CODES.BAD_REQUEST, message: "BAD_REQ" } };
      }
      return { data: { statusCode: STATUS_CODES.OK, message: "OK" } };
    } catch (err) {
      throw err;
    }
  }

  async SubscribeEvents(payload) {
    const { event, data } = payload;
    const { email } = data;
    switch (event) {
      case "EMAIL_CHECK":
        const isExist = await this.emailCheck(email);
        if (!isExist)
          return {
            message: "NO_SUCH_EMAIL_EXIST",
            statusCode: STATUS_CODES.NOT_FOUND,
          };
        return { message: "OK", statusCode: STATUS_CODES.OK };
        break;
    }
  }
}

module.exports = AccountService;
