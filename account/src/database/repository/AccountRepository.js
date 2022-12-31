const { UserModel } = require("../models");
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../../utils/appErrors");

// DB operations

class AccountRepository {
  async createUser({ email, password, salt, username, score }) {
    try {
      const user = new UserModel({
        email,
        password,
        salt,
        username,
        score
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
  async addLike({story,userId}){
    try {
        const responseUser = await UserModel.findById(userId);
        const {likes} = JSON.parse(JSON.stringify(responseUser));
        let isAlredyLiked = false
        for(let like of likes){
          if(like._id === story._id){
            isAlredyLiked = true;
            break;
          }
        }
        if(!isAlredyLiked){
          responseUser.likes.push({...story})
          await responseUser.save()
        }
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
        return responseUser;
      } catch (err) {
        throw err;
      }
  }
  async getLikedStories({user}){
    try {
        const responseUser = await UserModel.findById(user._id);
        const {likes} = JSON.parse(JSON.stringify(responseUser));
        return likes;
      } catch (err) {
        throw err;
      }
  }
  async getLeaderBoard(){
    try {
        const users = await UserModel.find({}).sort({score: -1}).limit(5).select(["username","score"])
        return users;
      } catch (err) {
        throw err;
      }
  }

}

module.exports = AccountRepository;
