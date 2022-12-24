const cors = require("cors");
const express = require("express");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());

//====== microservices ======
app.use("/mail",proxy("http://localhost:8082"))//mail
app.use("/story",proxy("http://localhost:8083"))//story
app.use("/",proxy("http://localhost:8081"))//account


app.listen(8080,()=>{
    console.log("Gatway running on 8080")
})