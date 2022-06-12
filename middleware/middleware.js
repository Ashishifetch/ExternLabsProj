
// Checks User logged in or not

module.exports.isLoggedIn=(req,res,next)=>
{ 
   
        if(!req.isAuthenticated())
        {
           
        
        res.send("please login");
        }
        else{
            next();
        }
}
