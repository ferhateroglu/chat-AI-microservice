const { UserModel } = require("../models");
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../../utils/appErrors");

// DB operations

class AccountRepository {
  async createUser({ email, password, phone, salt, username }) {
    try {
      const user = new UserModel({
        email,
        password,
        salt,
        phone,
        username,
      });
      const userResult = await user.save();
      return userResult;
    } catch (err) {
      throw err;
    }
  }
  async findEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user ? true : false;
  }
  async findUser({ email }) {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (err) {
      throw err;
    }
  }
  async updateUser({ id, user }) {
    try {
      return await UserModel.findByIdAndUpdate(id, { ...user });
    } catch (err) {
      throw err;
    }
  }
  async deleteUser({ _id }) {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(_id);
      return deletedUser;
    } catch (err) {
      throw err;
    }
  }

  async addLike({story,user}){
    try {
        const responseUser = await UserModel.findById(user._id);
        const {likes} = JSON.parse(JSON.stringify(responseUser));
        let isAlredyLiked = false
        for(let like of likes){
          if(like._id === story._id){
            isAlredyLiked = true;
            break;
          }
        }
        if(isAlredyLiked){
          return null
        }
        responseUser.likes.push({...story})
        await responseUser.save()
        console.log(responseUser)
        return responseUser;
      } catch (err) {
        throw err;
      }
  }
  async removeLike({_id,user}){
    try {
        const responseUser = await UserModel.findById(user._id);
        const {likes} = JSON.parse(JSON.stringify(responseUser));
        let isMatch = false
        for(let like of likes){
          if(like._id === _id){
            isMatch = true;
            break;
          }
        }
        if(!isMatch){
          return null
        }
        responseUser.likes.pull({_id:_id})
        await responseUser.save()
        console.log(responseUser)
        return responseUser;
      } catch (err) {
        throw err;
      }
  }
}

module.exports = AccountRepository;
