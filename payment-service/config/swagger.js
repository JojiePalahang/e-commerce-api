"use strict";
const config = require("./index");

module.exports = {
  swaggerDefinition: {
    info: {
      description: "Swagger Doc for the App",
      title: "Swagger",
      version: "1.0.0"
    },
    host: `${config.APP_ADDRESS}:${config.APP_PORT}`,
    basePath: "/api",
    produces: ["application/json"],
    schemes: ["http"],
  },
  basedir: __dirname,
  files: ["../src/routes/*.routes.js"]
};
