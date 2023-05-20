import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema({
    fullname: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String},
    address: [{details:{type:String}, for:{type:String}}],
    phoneNumber: [{type:Number}]
},
{
    timestamps:true,
}
);

//JWT token

UserSchema.methods.generateJwtToken = function() {
    return jwt.sign({user: this._id.toString()},"FoodPanda");

}


UserSchema.statics.findByEmailAndPassword = async({email,password}) => {

    //getting the user with email
    const user = await UserModel.findOne({email});

    

    //checking is user exist
    if(!user){
        throw new Error ("User Does Not Exist")
    }

    //comparing the passwords
    const doesPasswordMatch = await bcrypt.compare(password,user.password)


    if(!doesPasswordMatch){
        throw new Error ("Incorrect Password")
    }
    return user
}



//checking the alreadyexist case
UserSchema.statics.findEmailAndPhone = async({email,phoneNumber}) => {
    const checkUserByEmail = await UserModel.findOne({email});
    const checkUserbyPhone = await UserModel.findOne({phoneNumber});

    if(checkUserByEmail || checkUserbyPhone) {
        throw new Error("User Already Exist");
    };
    return false;
}

//encrypting password
UserSchema.pre("save",function(next){
    const user = this;

    //password isnot modified
    if(!user.isModified('password')) return next();

    //generating bcrypt salt
    bcrypt.genSalt(8,(error,salt) => {
        if(error) return next(error);

        //hashing the password
        bcrypt.hash(user.password, salt, (error,hash)=>{
            if(error) return next(error);

            //assigning hashed password
            user.password = hash;
            return next();
        })
    })
})

export const UserModel = mongoose.model("Users",UserSchema)