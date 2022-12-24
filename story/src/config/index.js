const dotEnv = require("dotenv");
const path = require("path")
if(process.env.NODE_ENV !== "prod"){//
    const envPath = path.join(__dirname+ "/../../.env."+process.env.NODE_ENV);
    dotEnv.config({path: envPath})
}else{
    const envPath = path.join(__dirname+ "/../../.env");
    dotEnv.config({path:envPath});
}

module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.MONGO_URL,
    SECRET: process.env.JWT_SECRET,
    TIER1: process.env.TIER1,
    TIER2: process.env.TIER2,
    TIER3: process.env.TIER3,
    BUCKET_NAME: process.env.BUCKET_NAME,
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    REGION: process.env.REGION,
}