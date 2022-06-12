if(process.env.NODE_ENV !="production")
{
    require('dotenv').config();
}


const express = require("express");
const app= express();


const catchAsync= require("./utils/catchAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const mongoose = require('mongoose');
const {isLoggedIn} =require("./middleware/middleware.js");
var morgan = require('morgan');



const userRouter= require("./routes/users.js");
const fileRouter= require("./routes/file.js");
const passport = require("passport");
const localStrategy= require("passport-local");
const User = require("./model/user.js");
const  session = require('express-session');



let PORT=process.env.PORT || 3001;


//Databse connection

mongoose.connect('mongodb://localhost:27017/loginInfo', {useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify: false, useCreateIndex: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("connected to mongoDB");
});


app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true })) 
app.use(express.static('file'));


const sessionConfig={

    secret:"thisissecret",
    resave:false,
    saveUninitialized:true,
    cookie:{
     expires:Date.now()+1000*60*60*24*7,
       maxAge: 1000*60*60*24*7,
        httpOnly:true
    }

}


app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use("/user",userRouter);

app.use("/file",isLoggedIn,fileRouter);

// app.use("/file",fileRouter);




 app.use( "*",(req,res,next)=>
 {
    next(new ExpressError("page not found",404))

 })
 app.use( (err,req,res,next)=>
 {  const {statusCode=500}= err;
    // const {message="something went wrong",statusCode=500}=err;
    if(!err.message) err.message="something went wrong!";
    res.status(statusCode).send(err);
 })
app.listen(PORT,()=>
{
    console.log(`listeing on port ${PORT}`);
})


