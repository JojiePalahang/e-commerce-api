const config = require("../config/index");
const swaggerConfig = require("../config/swagger");

const express = require("express");
const app = express();

const expressSwagger = require("express-swagger-generator")(app);
const bodyParser = require("body-parser");

const { errorLog, profileLog } = require("./middlewares/logger")();
const preValidator = require("./middlewares/pre-validator");

const paymentRoutes = require("./routes/payment.routes")(express.Router());

const db = require("./data/index");

async function boot() {
    app.use(profileLog);
    app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use("/api/payment", paymentRoutes);
    app.use(errorLog);
    app.use(preValidator);

    if (config.APP_ENV === "dev") {
        expressSwagger(swaggerConfig);
    }

    await db.connect();

    app.listen(config.APP_PORT, () => console.log(`App is running on port ${config.APP_PORT}!`));
}

boot();
