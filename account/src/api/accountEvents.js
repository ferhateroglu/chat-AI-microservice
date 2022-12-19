const AccountService = require('../services/accountServices');

module.exports = (app) => {

    const service = new AccountService();

    app.use('/accountEvents', async (req,res,next) => {

        const { payload } = req.body;

        service.SubscribeEvents(payload);

        console.log("===============  Account Service Received Event ====== ");
        return res.status(200).json(payload);

    });

}