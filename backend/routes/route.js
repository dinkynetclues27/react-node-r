const express = require('express');
const authenticateUser = require("../middlewares/authenticate");
const registerdata = require("../controllers/registration");
const routers = express.Router();

routers.post("/register",registerdata)

module.exports = routers;