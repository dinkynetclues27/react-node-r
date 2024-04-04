const express = require('express');
const authenticateUser = require("../middlewares/authenticate");
const profilepictureauthenticate = require("../middlewares/profilepictureauthenticate")
const registerdata = require("../controllers/registration");
const login = require("../controllers/login")
const routers = express.Router();

routers.post("/register",registerdata)
routers.get("/login",login)
module.exports = routers;