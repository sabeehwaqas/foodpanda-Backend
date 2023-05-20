import express from "express"

import { MenuModel } from "../../database/menu"
import { ImagesModel } from "../../database/images";

const Router = express.Router();

/*
Route       /list
Desc        getting list of menu based on id
Params      _id
Access      PUBLIC
Method      GET
*/

Router.get("/list/:_id",async(req,res) =>{
   try{
    const {_id} = req.params;
    const menus = await MenuModel.findOne(_id);

    return res.json({menus});
   }
   catch(error){
    return res.status(500).json({error:error.message});
   }
})

export default Router;

/*
Route       /image
Desc        get iamges based on id
Params      _id
Access      PUBLIC
Method      GET
*/

Router.get("/image/:id",async(req,res) =>{
    try{
        const {_id} = req.params;
        const menus = await ImagesModel.findOne(_id);

        return res.json({menus})
    }
    catch(error){
        return res.status(500).json({error:error.message});
    }
})