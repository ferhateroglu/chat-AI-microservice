const mongoose = require("mongoose");
const {DB_URL} = require("../config");

module.exports = async () => {
    try{
        mongoose.set("strictQuery", false);
        await mongoose.connect(DB_URL);
        console.log("connected to mongodb")
    } catch (err){
        console.log("db connection err")
        console.log(err)
    }
}