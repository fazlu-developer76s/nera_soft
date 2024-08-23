import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import CryptoJS from "crypto-js";
import {encrypt ,  decrypt} from "../utils/Encrypt_decrypt.js"


const userSchema = new Schema(
    {
        
        name: {
            type: String,
            required: true,
            trim: true, 
            index:true
        },
        email: {
            type: String,
            required: true,
            index:true,
            unique: true,
            trim: true, 
        },
        mobile: {
            type: String,
            required: true,
            index:true,
            unique: true,
            trim: true, 
        },
        user_id: {
            type: String,
            index:true,
            unique: true,
            trim: true, 
            // required:true
            
        },
        password: {
            type: String,
            index:true,
            // required: true,
            
        },
        security_pin: {
            type: String,
            default:'0124',
            index :true,
            // trim: true

            
        },
    },
    {
        timestamps: true
    }
)

userSchema.pre('save', function(next){
  
    this.name = encrypt(this.name,);
    this.email = encrypt(this.email);
    this.mobile = encrypt(this.mobile);
    let create_password = '#' + this.name + '@' + this.mobile.substring(0,4);
    this.password = encrypt(create_password);
    this.user_id = encrypt(create_password);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
         {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)