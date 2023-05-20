import express from "express"

import passport from "passport";

//DB
import { OrderModel } from "../../database/order";

const Router = express.Router();

/*
Route       /
Desc        getting all the orders based on particualr id
Params      _id
Access      PUBLIC
Method      GET
*/

Router.get('/:_id',passport.authenticate("jwt",{sessions:false}),async(req,res) => {
    try{
        const {_id} = req.params;

        const getOrders = await OrderModel.findOne({user:_id});


        if(!getOrders) {
            return res.status(404).json({error:"User not found"});
        }
        return res.json({getOrders})

    }
    catch(error){
        return res.status(500).json({error:error.message})
    }
});


/*
Route       /new
Desc        add new order
Params      _id
Access      PUBLIC
Method      POST
*/

Router.post("/new/:_id",async(req,res) =>{
    try{
        const {_id} = req.params;
        const {orderDetails} = req.body;
        const addNewOrder = await OrderModel.findOneAndUpdate(
            {
                user:_id
            },
            {
                $push:{orderDetails:orderDetails}
            },
            {
                new:true
            }
        );

        return res.json({order:addNewOrder});

    }catch(error){
        return res.status(500).json({error:error.message})
    }
})

export default Router;
