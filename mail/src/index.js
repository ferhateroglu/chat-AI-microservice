const express = require("express");
const { PORT } = require("./config");
//const { databaseConnection } = require("./database");
const expressApp = require("./app"); //burda kaldık
const startServer = async () => {
  const app = express();

  //await databaseConnection();

  await expressApp(app);

  app.listen(PORT, () => {
      console.log("Mail listening to port: " + PORT);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

startServer();
