const port = process.env.APP_PORT || 3001;
const address = process.env.APP_ADDRESS || "localhost";
const env = process.env.APP_ENV || "dev";

const dbHost = process.env.DB_HOST || "192.168.99.100";
const dbPort = process.env.DB_PORT || "27017";
const dbName = process.env.DB_NAME || "payment-data";
// const dbUsername = process.env.DB_Username || "dev";
// const dbPassword = process.env.DB_Password || "dev";



module.exports = {
    APP_PORT: port,
    APP_ENV: env,
    APP_ADDRESS: address,
    DB_HOST: dbHost,
    DB_PORT: dbPort,
    DB_NAME: dbName,
};