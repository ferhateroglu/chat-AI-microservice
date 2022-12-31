const MailService = require("../services/MailService");

module.exports = (app) => {
  const service = new MailService();

  app.use("/mailEvents", async (req, res, next) => {
    try {
      const { payload } = req.body;

      service.SubscribeEvents(payload);

      console.log("=============== Mail Service Received Event ============ ");
      return res.json({ message: "OK" });
      
    } catch (err) {
      throw err;
    }
  });
};
