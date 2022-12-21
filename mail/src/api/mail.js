const MailServices = require("../services/MailService");
const {
  APIError,
  BadRequestError,
  ConflictError,
  STATUS_CODES,
} = require("../utils/appErrors");
const { authMiddleware, roleMiddleware } = require("./middlewares");
const { TIER1, TIER2, TIER3 } = require("../config/index");

module.exports = (app) => {
  const service = new MailServices();

  app.use((req, res, next) =>{
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/sendMail", async (req, res, next) => {
    try {
      const { email } = req.body;
      const data = await service.resetPassword( email );
      return res.status(data.statusCode).json({message: data.message});
    } catch (err) {
      next(err);
    }
  });
}