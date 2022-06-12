const express= require("express");
const User=require("../model/user.js");
const catchAsync= require("../utils/catchAsync.js");
const passport = require("passport");
const userController  = require("../controllers/user.js");

const router = express.Router();

router.route("/register") //register new user
     
      .post(userController.registerUser)

router.route("/login") // login existing user
      
      .post(passport.authenticate('local', { failureMessage: true }),userController.loginPost)

router.post("/logout",userController.logoutPost); //logout current user

module.exports= router;