import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import { GetAccessToken } from "../models/access_token.model.js";

export const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        const get_access_token = req.headers.accesstoken
        if(!get_access_token){
            return res.json(new ApiError(401, { },`Please Verify Your Email And Mobile No`));
        }
        try{
        jwt.verify(get_access_token,process.env.ACCESS_TOKEN_SECRET);
        }catch(err){
            return  res.json(new ApiError(401, { },`Please Verify Your Email And Mobile No`));
        }
        const check_access_token = await GetAccessToken.findOne({
            $and: [
                { token: get_access_token},
                { token_status: true },
                { device_type:"app"}
            ]
        });
        if(check_access_token.token_status!=true){
            return  res.status(200).json(new ApiError(401, {} ,"Please Verify Your Email And Mobile No"))
      
        }
        next()
    } catch (error) {
        return res.status(200).json(new ApiError(401, {error} ,"Please Verify Your Email And Mobile No"))
    }    
});


export const VerfiyUser = asyncHandler(async(req, res, next) => {
    try {
        const get_refresh_token = req.headers.refreshtoken;
        if(!get_refresh_token){
            return res.json(new ApiError(401, {},`Invalid Refresh Token`));
        } 
        try{
            jwt.verify(get_refresh_token,process.env.REFRESH_TOKEN_SECRET);
        }catch(err){
            res.json(new ApiError(401, req.body,`Invalid Refresh Token`));
           }
        next()
    } catch (error) {
        throw new ApiError(401, {error} , "Invalid Refresh Token")
    }
    
})