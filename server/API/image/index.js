import express from "express";
import { ImagesModel } from "../../database/allModels"
import AWS from "aws-sdk"
import multer from "multer"

import {s3Upload} from "../../Utilities/AWS/s3"

const Router = express.Router();


//multer config

const storage = multer.memoryStorage();
const upload = multer({storage});


/*
Route       /
Desc        Uploading given image to s3 bucket, and then saving 
Params      NONE
Access      PUBLIC
Method      POST
*/

Router.post("/",upload.single("file"),async(req,res)=>{
    try{
        const file = req.file;

        //s3 bukcet options
        const bucketOptions = {
            Bucket: "foodpandacloneimages",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL:"public-read"
          };
          


        //calling fn to uplaod
        const uploadImage = await s3Upload(bucketOptions);

        return res.status(200).json({ uploadImage });

    }catch(error){
        return res.status(500).json({error:error.message})
    }
})


export default Router;




