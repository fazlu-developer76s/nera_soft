import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import os from 'os';
import { sendEmail,sendmobileOTP } from "../utils/EmailMobileAPI.js"
import { User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { GetAccessToken } from "../models/access_token.model.js";
import { json } from "express";
import { encrypt,decrypt } from "../utils/Encrypt_decrypt.js";
import { sendWelcomeTemplate } from "../utils/Welcome.js";


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
        "email":"fazlu.developer@gmail.com",
        "mobile":"7428059960"
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
    res
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
    const welcome_message = sendWelcomeTemplate(createdUser,res);

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

const sendotpRequest = asyncHandler(async(req, res) => {
    try {
        const type  = req.body.type;
        const name = req.body.name;
        if(type == 'Email') {
        const email_req = req.body.email;
        if(!req.body.email)
        {
            return res.status(202).json(new ApiError(500, req.body , `Email Field Not Found`));  
        }
        if(validateEmail(email_req)==false)
        {
            return res.status(202).json(new ApiError(500, req.body ,`Invalid Email Id ${email_req}. Please Enter Valid Email Id`));

        }
        if(email_req)
            {
                
                let randomFourDigit = getRandomFourDigit();
                const htmlContent = '<html><head></head><body><h1>Your OTP is ' + randomFourDigit + '</h1></body></html>';
                const subject = "OTP for Email verification - Nera Soft";
                 if(sendEmail(email_req, name, subject, htmlContent)){
                 return res.status(201).json(new ApiResponse(200, randomFourDigit,"OK"));
                 }else{
                 return res.status(202).json(new ApiError(500, "OTP on email not sent. Please try again"));
                 }
            }

        }
        else if(type == 'Mobile') {
            if(!req.body.mobile)
                {
                    return res.status(202).json(new ApiError(500, req.body , `Mobile Field Not Found`));  
                }
            const mobile = req.body.mobile;
            const name  = req.body.name;
            if(typeof(mobile)!='number')
            {
                return res.status(202).json(new ApiError(500, mobile,`Invalid Mobile No ${mobile}. Mobile should be number`));
            }
            else
            {
        if(mobile.toString().length==10 && typeof(mobile)=='number')
        {
            
    
            try {
                let randomFourDigit = getRandomFourDigit();
                sendmobileOTP(mobile, randomFourDigit,name);
                return res.status(200).json(new ApiResponse(200, randomFourDigit,`OTP Send to  Mobile No ${mobile}`));
              } catch (error) {
                return res.status(202).json(new ApiError(500, mobile, error));

              }
            }
            else
            {
                return res.status(203).json(new ApiError(500, mobile,`Invalid Mobile No ${mobile}. Mobile should be 10 digit`));

        
            }
          }
        }

    } catch (error) {
        throw new ApiError(500, error.message);
        
    }
})

function getRandomFourDigit() {
    return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  }


  function  validateEmail(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
function serverIPs(){
    const networkInterfaces = os.networkInterfaces();
    const addresses = [];

    for (const interfaceName in networkInterfaces) {
        for (const iface of networkInterfaces[interfaceName]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                addresses.push(iface.address);
            }
        }
    }

    return addresses;
}
export {
    registerUser,
    loginUser,
    logoutUser,
    sendotpRequest
}