const { AccountRepository } = require("../database");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');
const { APIError, BadRequestError, ConflictError,STATUS_CODES } = require('../utils/appErrors')

// All bussiness logic is here

class AccountService {

  constructor() {
    this.repository = new AccountRepository();
  }

  async login(userInputs){
    const { email, password } = userInputs;  
    try {
        const existingUser = await this.repository.findUser({ email});
        if(existingUser){
            const validPassword = await ValidatePassword(password, existingUser.password, existingUser.salt);
            if(validPassword){
                const token = await GenerateSignature({ email: existingUser.email, _id: existingUser._id, rights:existingUser.rights});
                return FormateData({id: existingUser._id, token });
            } 
        }
        return FormateData(null);
    } catch (err) {
        throw new APIError('Data Not found', err)
    }

   
}

  async signUp(userInputs) {
       
    const { email, password, phone } = userInputs;
        
    try{
        if(await this.emailCheck(email)){
          throw new APIError("message",STATUS_CODES.CONFLICT,"EMAIL_ALREDY_EXIST");
        }
        // create salt
        let salt = await GenerateSalt();
        let userPassword = await GeneratePassword(password, salt); 
        const existingCustomer = await this.repository.createUser({ email, password: userPassword, phone, salt});        
        const token = await GenerateSignature({ email, _id: existingCustomer._id});
        return FormateData({id: existingCustomer._id, token });
    }catch(err){
        throw err
    }

  }

  async emailCheck(email){
    return await this.repository.findEmail({email})
  }
}

module.exports = AccountService;
