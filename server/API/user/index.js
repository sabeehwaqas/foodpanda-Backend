import express from "express"

//DB
import { UserModel } from "../../database/user";

const Router = express.Router();

/*
Route       /
Desc        get an user data
Params      _id
Access      PUBLIC
Method      GET
*/

Router.get('/:_id',async(req,res) => {
    try{
        const {_id} = req.params;

        const getUser = await UserModel.findById(_id);

        return res.json({user:getUser})

    }
    catch(error){
        return res.status(500).json({error:error.message})
    }
});

/*
Route       /update
Desc        update an user data
Params      _usersId
Access      PUBLIC
Method      GET
*/

Router.put('/update/:_userId',async(req,res) => {
    try{
        const {userId} = req.params;

        const {userData} = req.body;
        
        const updateUserData = await UserModel.findByIdAndUpdate(
            userId,
            {
                $set:userData
            },
            
            {
                new:true
            }
            
        );

        return res.json({user:updateUserData})

    }
    catch(error){
        return res.status(500).json({error:error.message})
    }
});

export default Router;
