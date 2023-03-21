const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./user.routes");
const cors = require("cors");
const app = express();
require("./db");

app.use(bodyParser.json());
app.use(cors());

app.get("/ping", (req, res, next) => {
  res.send({ status: true, message: "PONG" });
});

app.use(userRoutes);
app.listen(4000, () => {
  console.log("server started and running");
});
