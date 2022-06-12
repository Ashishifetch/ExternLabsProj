const User= require("../model/user.js");
const catchAsync= require("../utils/catchAsync.js");
const ExpressError=require("../utils/ExpressError.js");

//Register new User

module.exports.registerUser=catchAsync(async(req,res)=>
{  
 
  const {username,password}=req.body; 
  const user=  new User({username});
  const registeredUser= await User.register(user,password);
  
 
 
  
  res.send("successfully registered");
 

 
})
//login existing uer

module.exports.loginPost=(req,res)=>
{
  res.send("successfully logged in");
}

//logout current user
module.exports.logoutPost=(req,res)=>
{
 
  req.logout();
  res.send("successfully logged out");
 
 
}