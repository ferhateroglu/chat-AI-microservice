const { AccountRepository } = require("../database");
const {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
  VerifyResetToken,
  PublishMailEvent,
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
              role: existingUser.role,
              score: existingUser.score,
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

  async signUp({ email, password, username }) {
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

      const score = Math.ceil(Math.random() * 100);

      const existingUser = await this.repository.createUser({
        username,
        email,
        password: userPassword,
        salt,
        score,
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

  async forgotPassword({ email }) {
    try {
      const isExist = await this.emailCheck(email);
      if(!isExist){
        return {error:{statusCode: STATUS_CODES.BAD_REQUEST, message:"EMAIL_DOES_NOT_EXIST"}}
      }

      //create token
      const token = await GenerateSignature({                          
        email,
        resetPassword: true
      },"5m");

      // publish mail event
      const payload = {event:"SEND_TOKEN_MAIL", data: {email, token}}

      PublishMailEvent(payload)

      return {data:{statusCode: STATUS_CODES.OK, message:"OK"}}

    } catch (err) {
      throw err;
    }
  }

  async deleteUser(_id, user) {
    try {
      const user = await this.repository.deleteUser({ _id });
      return { data: user };
      //delete
      return { data: { statusCode: STATUS_CODES.OK, message: "OK" } };
    } catch (err) {
      throw err;
    }
  }

  async addLike({ userId, story }) {
    try {
      this.repository.addLike({ story, userId });
    } catch (err) {
      throw err;
    }
  }

  async removeLike({ user, _id }) {
    try {
      const response = await this.repository.removeLike({ _id, user });
      //delete
      if (!response) {
        return {
          error: { statusCode: STATUS_CODES.BAD_REQUEST, message: "BAD_REQ" },
        };
      }
      return { data: { statusCode: STATUS_CODES.OK, message: "OK" } };
    } catch (err) {
      throw err;
    }
  }

  async getLikedStories({ user }) {
    try {
      const response = await this.repository.getLikedStories({ user });
      //delete
      if (!response) {
        return {
          error: { statusCode: STATUS_CODES.BAD_REQUEST, message: "BAD_REQ" },
        };
      }
      return { data: response };
    } catch (err) {
      throw err;
    }
  }

  async getLeaderBoard(){
    try{
      const response = await this.repository.getLeaderBoard();
      if(!response){
        return {
          error: { statusCode: STATUS_CODES.INTERNAL_ERROR, message: "INTERNAL_ERROR" },
        };
      }
      return { data: response };
    }catch(err){
      throw err
    }
  }

  async SubscribeEvents(payload) {
    const { event, data } = payload;

    switch (event) {
      case "ADD_LIKE":
        try {
          const { story, userId } = data;
          this.addLike({ story, userId });
        } catch (err) {
          throw err;
        }
        break;
    }
  }

}

module.exports = AccountService;
