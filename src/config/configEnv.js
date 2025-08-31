const proces = require("process");
const donEnv = require("dotenv").config();
const parseEnv = donEnv?.parsed;

const envConfig = {
    dataBaseURL: parseEnv.databaseURL,
    port: parseEnv.PORT,
}

module.exports = envConfig;