import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import { GetAccessToken } from "../models/access_token.model.js";

export const verifyJWT = asyncHandler(async(req, res, next) => {

    try {
        
        const get_access_token = req.cookies?.accessToken;
        if(!get_access_token){
            res.json(new ApiError(401, req.body,`Please Verify Your Email And Mobile No`));
        }
        
        try{
        jwt.verify(get_access_token,process.env.ACCESS_TOKEN_SECRET);
        }catch(err){
            res.json(new ApiError(401, req.body,`Please Verify Your Email And Mobile No`));
        }
        const check_access_token = await GetAccessToken.findOne({
            $and: [
                { token: get_access_token},
                { token_status: true }
            ]
        });
        
        if(check_access_token.token_status!=true){
            const options = {
                httpOnly: true,
                secure: true
            }
            return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new ApiResponse(200, {}, "User logged Out"))
        }
        next()
    } catch (error) {
        const options = {
            httpOnly: true,
            secure: true
        }
        res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options).json(new ApiError(401, error?.message ,"Please Verify Your Email And Mobile No"))
    }    
});


export const VerfiyUser = asyncHandler(async(req, res, next) => {
    try {
        const get_refresh_token = req.cookies?.refreshToken;
        try{
            jwt.verify(get_refresh_token,process.env.REFRESH_TOKEN_SECRET);
        }catch(err){
            res.json(new ApiError(401, req.body,`Your Account Is Logout`));
           }
        if(!get_refresh_token){
            res.json(new ApiError(401, req.body,`Your Account Is Logout`));
        }
        next()
    } catch (error) {
    
        throw new ApiError(401, error?.message , "Invalid access token")
    }
    
})