const cors = require("cors");
const express = require("express");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

//====== microservices ======
app.use("/mail",proxy("http://localhost:8082"))//mail
app.use("/",proxy("http://localhost:8081"))//account


app.listen(8080,()=>{
    console.log("Gatway running on 8080")
})