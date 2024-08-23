 import mongoose from "mongoose";
 import {ApiError} from "../utils/ApiError.js"
 import {ApiResponse} from "../utils/ApiResponse.js"
 import {asyncHandler} from "../utils/asyncHandler.js";

export const addIP = asyncHandler(async(req, res) => {
     
    return res.status(201).json(new ApiResponse(200, req.body,"OK"));
 });

