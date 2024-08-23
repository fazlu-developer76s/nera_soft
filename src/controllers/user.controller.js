import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { GetAccessToken } from "../models/access_token.model.js";


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler( async (req, res) => {

    req = {

        "name":"fazlu",
        "email":"fazldu2@gmail.com",
        "mobile":"7428059961"
    };
    const {name, email , mobile } = req
    if (
        [name, email, mobile].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    const existedUser = await User.findOne({
        $or: [{ email }, { mobile }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with email or mobile already exists")
    }
    const user = await User.create({
        name,
        email, 
        mobile
    })
    const createdUser = await User.findById(user._id).select(
        "-password"
    )
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(createdUser._id)
    if(!accessToken && !refreshToken) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    const saveAccesstoken = await GetAccessToken.create(
        {
            user_id:createdUser._id,
            token: accessToken
        }
    ) ; 
 if(!saveAccesstoken){
    throw new ApiError(500, "Access Token not Save In Db")

 }
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                data: createdUser , refreshToken
            },
            "User registered Successfully"
        )
    )

} )
const loginUser = asyncHandler( async (req, res) => {

    req = {
        "email":"U2FsdGVkX1/2j25g8jaHjtKeoFBrjlfBHiBQBSu8vXvZIkt0o+UbrAZL57cAiVvdjQJRuw8smi0u0pNibRk72xetUzjMLwiw67TjoSTjlWwzjj7X6fMqMht+lWttyA5W",
        "mobile":"U2FsdGVkX1982RG88mQxFyI1aV2OCFgWm0Xn7vU+EViBOqmz2wKuoobR1nW9kaNcR+HCIn4TG9SWYXcTOPNnKdF2PmG7T6em/AHn4T6vFWmdEFDO/EYK/YX8O4jkFLA+oSEDxHZ2rRTgtIcdoFB5iQ=="
    };
    const {name, email , mobile } = req
    if (
        [name, email, mobile].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    const existedUser = await User.findOne({
        $or: [{ email }, { mobile }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with email or mobile already exists")
    }
    const user = await User.create({
        name,
        email, 
        mobile
    })
    const createdUser = await User.findById(user._id).select(
        "-password"
    )
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(createdUser._id)
    if(!accessToken && !refreshToken) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    const saveAccesstoken = await GetAccessToken.create(
        {
            user_id:createdUser._id,
            token: accessToken
        }
    ) ; 
 if(!saveAccesstoken){
    throw new ApiError(500, "Access Token not Save In Db")

 }
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                data: createdUser , refreshToken
            },
            "User registered Successfully"
        )
    )

} )



const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})


export {
    registerUser,
    loginUser,
    logoutUser
}