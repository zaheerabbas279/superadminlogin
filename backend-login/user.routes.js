const express = require("express");
const route = express.Router();
const userController = require("./user.controller");

route.post("/login", userController.loginUser);
route.post("/register", userController.registerUser);
route.post("/test", userController.createAdminForDept);
route.post("/updateFields", userController.addFields);
route.post("/dropfields", userController.dropFields);
module.exports = route;
