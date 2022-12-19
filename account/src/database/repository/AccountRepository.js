const { UserModel } = require('../models');
const { APIError, BadRequestError, STATUS_CODES } = require('../../utils/appErrors')

// DB operations

class AccountRepository {
    async createUser({ email, password, phone, salt }){
        try{
            const user = new UserModel({
                email,
                password,
                salt,
                phone,
            })
            const userResult = await user.save();
            return userResult;
        }catch(err){
            throw err
        }
    }
    async findEmail({email}){
        const user = await UserModel.findOne({email});
        return user ? true : false;
    }
    async findUser({email}){
        try{
            const user = await UserModel.findOne({email});
            return user
        }catch(err){
            throw err
        }
    }

}

module.exports = AccountRepository;