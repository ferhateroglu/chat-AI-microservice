const { ValidateSignature } = require('../../utils');
const { APIError, STATUS_CODES } = require('../../utils/appErrors');

module.exports = async (req,res,next) => {
    try{
        const isAuthorized = await ValidateSignature(req);
        if(isAuthorized){
            return next();
        }
        return res.status(403).json({message: 'NOT_AUTHORIZED'})
    }catch(err){
        next(new APIError("message",STATUS_CODES.UN_AUTHORISED,"JWT_SIGNATURE_ERR"))
    }
}