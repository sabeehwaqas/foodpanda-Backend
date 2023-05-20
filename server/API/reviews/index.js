import express from "express"

//DB
import { OrderModel } from "../../database/order";
import { ReviewModel } from "../../database/reviews";

const Router = express.Router();

/*
Route       /new
Desc        add new review
Params      NONE
Body        Review object
Access      PUBLIC
Method      POST
*/


Router.post("/new",async(req,res)=>{
    try{
        const {reviewData} = req.body;
        await ReviewModel.create(reviewData);
        return res.json({review:"Succeessfully created review"})  
    }
    catch(error){
        return res.status(500).json({error:error.message})

    }
});


/*
Route       /delete
Desc        delete a review
Params      _id
Access      PUBLIC
Method      DELETE
*/


Router.delete("/delete/:_id",async(req,res)=>{
    try{
        const {_id} = req.params;
        await ReviewModel.findByIdAndDelete(_id);
        return res.json({review:"Succeessfully deleted review"})  
    }
    catch(error){
        return res.status(500).json({error:error.message})

    }
});

export default Router;