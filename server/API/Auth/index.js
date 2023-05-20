

import express from "express";
import { FoodModel,ImagesModel,MenuModel,OrderModel,RestaurantModel,ReviewModel,UserModel } from "../../database/allModels";

import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import passport from "passport";
const Router = express.Router();
import { ValidateSignup,ValidateSignin } from "../../validation/auth";


/*
Route      /signup
Desc       Signup with email and password
Params     None
Access     Public
Method     POST
*/

Router.post("/signup",async(req,res) => {
    try {
        await ValidateSignup(req.body.credentails)

        //chech if user aleardy exist
        await UserModel.findEmailAndPhone(req.body.credentails);
        
        //DB  :creating field in database
        const newUser = await UserModel.create(req.body.credentails)

        //JWT Auth token
        const token = newUser.generateJwtToken();

        //returning is successfull executed
        return res.status(200).json({token});

    } 
    catch(error) {
        return res.status(500).json({error:error.message})
    }
})



////////////////
/*
Route      /signin
Desc       Signin with email and password
Params     None
Access     Public
Method     POST
*/

Router.post("/signin",async(req,res) => {
    try {

        await ValidateSignin(req.body.credentails)


        const User = await UserModel.findByEmailAndPassword(req.body.credentails);

        //chech if user aleardy exist
      


        //JWT Auth token
        const token = User.generateJwtToken();


        //returning is successfull executed
        return res.status(200).json({token,status:"User Logged in Successfull"});



    } 
    catch(error) {
        return res.status(500).json({error:error.message})
    }
})


//////////////// GOOGLE AUTH
/*
Route      /google
Desc       google sign in
Params     None
Access     Public
Method     GET
*/

Router.get('/google',passport.authenticate('google',{
    scope:[
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ],
})
);


//////////////// GOOGLE AUTH callback
/*
Route      /google/callback
Desc       google sign in callback
Params     None
Access     Public
Method     GET
*/

Router.get('/google/callback',passport.authenticate("google",{failureRedirect:'/'}),
(req,res) => {
    return res.json({token:req.session.passport.user.token})
}
)








export default Router;