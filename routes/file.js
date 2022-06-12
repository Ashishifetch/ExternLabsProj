const multer  = require('multer');
const express=require(`express`);
const fileController=require(`../controllers/file.js`);
const router=express.Router();
const upload = multer({ dest: 'uploads/' });
const catchAsync= require("../utils/catchAsync.js");
const ExpressError=require("../utils/ExpressError.js");

router.get("/read",fileController.fileReadController)    // read file
      
      .post("/upload",upload.array("image"),fileController.fileUploadController ) // upload file(while testing use image field name in body) 
 
      router.get("/download/:file",fileController.fileDownloadController) //download file

      module.exports=router;