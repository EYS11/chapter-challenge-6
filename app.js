const express = require("express");
const app = express();
const swaggerJSON = require("./swagger.json");
const swaggerUI = require("swagger-ui-express");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.json());

const router = require("./router");
app.use(router);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJSON));

module.exports = app;
