const express = require('express');
const authenticateUser = require("../middlewares/authenticate");
const profilepictureauthenticate = require("../middlewares/profilepictureauthenticate")
const registerdata = require("../controllers/registration");
const login = require("../controllers/login")
const bookdata = require("../controllers/bookfetch");
const authenticateUser = require("../middlewares/authenticate");
const routers = express.Router();

routers.post("/register",registerdata)
routers.post("/login",login)
routers.get("/bookget",authenticateUser,bookdata)
module.exports = routers;