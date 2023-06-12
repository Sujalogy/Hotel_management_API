const express = require("express");
const { signUp, logIn, logOut } = require("../controller/owner.controller");
const ownerRouter = express.Router();

ownerRouter.post("/signup", signUp).post("/login", logIn).post("/logout", logOut);

module.exports = {
    ownerRouter
}