import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import { GetAccessToken } from "../models/access_token.model.js";

export const verifyJWT = asyncHandler(async(req, res, next) => {
    
    try {
        
        const get_access_token = req.cookies?.accessToken;
        const get_refresh_token = req.refreshToken;
        if(!get_access_token){
            throw new ApiError(401, "Unauthorized request 1")
        }
        const check_access_token = await User.findOne({
            $and: [
                { token: get_access_token },
                { token_status: true }
            ]
        });
        if(!check_access_token){
            throw new ApiError(401, "Unauthorized request 2 ")
        }
        if(!get_refresh_token){
            throw new ApiError(401, "Unauthorized request 3")
        }
        try{
         jwt.verify(get_access_token,process.env.ACCESS_TOKEN_SECRET);
        }catch(err){
            throw new ApiError(401, "Unauthorized request 4")
        }
        try{
         jwt.verify(get_refresh_token,process.env.REFRESH_TOKEN_SECRET);
        }catch(err){
            throw new ApiError(401, "Unauthorized requestInvalid Access Token 5")
        }
    
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})