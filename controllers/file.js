const fs = require('fs');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const path = require('path');
const catchAsync= require("../utils/catchAsync.js");
const ExpressError=require("../utils/ExpressError.js");

//Read File Asynchronously From "example.txt"

module.exports.fileReadController=catchAsync(async(req,res)=>
{
   
    fs.readFile('example.txt','utf8',(err,fileData)=>{
       if(err) {
           console.log('Some Error Occurred While Reading The File')
           next(err)
       } else {
           console.log('File Data Is Read Successfully')
      
           res.send(fileData);
       }
    })
            

})


//File Uploading 
module.exports.fileUploadController=(req,res)=>
{
      
        res.send("files uploaded successfully")

}

//File Downloading To Local Sys 

module.exports.fileDownloadController=async(req,res)=>
{   
    let file = req.params.file;
   
  
    let fileLocation = path.join('./file',file);
    
    res.download(fileLocation, file,function(err) {
        if(err){
            res.send("something wrong");
        
        }
      });

  
}