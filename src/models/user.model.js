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
            required:true
            
        },
        password: {
            type: String,
            index:true,
            required: true,
        
        },
        security_pin: {
            type: String,
            // default:'0124',
            index :true,
            required: true
        },
        type:{
            type: String,
            // default:'Individual',
            index :true,
            required: true
        },
        device_type:{
            type: String,
            index :true,
            required: true
        },
        status:{
            type:String,
            // default:false,
            index :true,
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre('save', function(next) {

    if (this.isModified('name')) {
        this.name = this.name;
    }
    
    if (this.isModified('email')) {
        this.email = this.email;
    }
    
    if (this.isModified('mobile')) {
        this.mobile = this.mobile;
    }
    if (this.isModified('user_id')) {
        this.user_id = encrypt(this.user_id);
    }
    if (this.isModified('password')) {
        this.password = encrypt(this.password);
    }
    if (this.isModified('security_pin')) {
        this.security_pin = encrypt(this.security_pin);
    }
    if (this.isModified('status')) {
        this.status = encrypt(this.status);
    }
    if (this.isModified('type')) {
        this.type = this.type;
    }
    if (this.isModified('device_type')) {
        this.device_type = this.device_type;
    }
    next();
});



userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            datetime:new Date()
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
            name: this.name,
            email: this.email,
            user_id: this.user_id,
            datetime:new Date()
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("users", userSchema)