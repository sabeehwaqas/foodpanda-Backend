import express from "express"
import passport from "passport"

//DB
import { FoodModel } from "../../database/food"

import { ValidateRestaurantId,ValidateCategory } from "../../validation/food";

const Router = express.Router();

/*
Route       /
Desc        getting all the foods based on particualr restaurant
Params      NONE
Access      PUBLIC
Method      GET
*/

Router.get('/:_id',async(req,res) => {
    try{

        await ValidateRestaurantId(req.params)
        const {_id} = req.params;

        const foods = await FoodModel.find({restaurant:_id});

        return res.json({foods})

    }
    catch(error){
        return res.status(500).json({error:error.message})
    }
});

/*
Route       /r/
Desc        getting all the foods based on particualr restaurant
Params      category
Access      PUBLIC
Method      GET
*/

Router.get("/r/:category",async(req,res) =>{
    try{
        await ValidateCategory(req.params)
        const {category} = req.params;
        const foods = await FoodModel.find({
            category : { $regex:category , $options:"i"}
        })
    }
    catch(error) {
        return res.status(500).json({error:error.message})
    }
})





export default Router;