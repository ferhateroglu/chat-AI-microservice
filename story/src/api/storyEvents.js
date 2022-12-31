const StoryService = require('../services/storyServices');

module.exports = (app) => {

    const service = new StoryService();

    app.use('/storyEvents', async (req,res,next) => {
        console.log("=============== Story Service Received Event ==============");
        try{
            const { payload } = req.body;

            service.SubscribeEvents(payload);
            
            return res.json({message:"OK"})
        }catch(err){
            next(err)
        }        
    });

}