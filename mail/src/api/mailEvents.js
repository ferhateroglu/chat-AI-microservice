const MailService = require("../services/MailService");

module.exports = (app) => {
  const service = new MailService();

  app.use("/mailEvents", async (req, res, next) => {
    const { payload } = req.body;

    service.SubscribeEvents(payload);

    console.log("=============== Mail Service Received Event ============ ");
    return res.status(200).json(payload);
  });
};
