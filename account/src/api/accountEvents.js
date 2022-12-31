const AccountService = require('../services/accountServices');

module.exports = (app) => {

    const service = new AccountService();

    app.use('/accountEvents', async (req,res,next) => {
        console.log("===============  Account Service Received Event ====== ");
        try{
            const { payload } = req.body;

            service.SubscribeEvents(payload);
            
            return res.status(200).json({message:"OK"});
        }catch(err){
            next(err)
        }        
    });

}