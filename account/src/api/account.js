const AccountServices = require("../services/accountServices");
const { APIError, BadRequestError, ConflictError,STATUS_CODES } = require('../utils/appErrors')
const  {authMiddleware, roleMiddleware} = require('./middlewares')
let {TIER1,TIER2,TIER3} = require("../config/index")


module.exports = (app) => {
  const service = new AccountServices();

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/dummy",authMiddleware, roleMiddleware(TIER1), async (req,res,next) =>{
    //next(new Error("hataaa"))
    res.status(200).json({msg:"hi"});
  })

  app.post("/login", async (req, res, next) => {
    try {
      const {email, password} = req.body;
      const {data} = await service.login({email, password})
      return res.json(data)
    } catch (err) {
      next(err);
    }
  });

  app.post("/signUp", async (req, res, next) => {
    try {
      const { email, password, phone } = req.body;
      const { data } = await service.signUp({ email, password, phone });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });
};
