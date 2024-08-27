import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import os from 'os';
import { sendEmail, sendmobileOTP } from "../utils/EmailMobileAPI.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { GetAccessToken } from "../models/access_token.model.js";
import { json } from "express";
import { encrypt, decrypt } from "../utils/Encrypt_decrypt.js";
import { sendWelcomeTemplate } from "../utils/Welcome.js";


const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        res.json(new ApiError(500, user, "Something went wrong while generating referesh and access token"));
    }
}

const genRateRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)        
        const refreshToken = user.generateRefreshToken()
        return { refreshToken }
    } catch (error) {
        res.json(new ApiError(500, user, "Can't Genrate Refresh Token"));
    } 
}

const registerUser = asyncHandler(async (req, res) => {
    
    const { name, email, mobile, type , email_verify , mobile_verify } = req.body;

    if (
        [name, email, mobile , type].some((field) => field?.trim() === "")
    ) {
        const missingFields = [name, email, mobile, type]
            .map((field, index) => {
                if (field?.trim() === "") {
                    return ["Name", "Email", "Mobile", "Type"][index];
                }
            })
            .filter(Boolean)
            .join(", ");
        const errorMessage = missingFields
            ? `${missingFields} field(s) are required`
            : "All fields are required";
        res.json(new ApiError(401, req.body, errorMessage));
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.json(new ApiError(401, req.body, "Invalid email format"));
    }

    // Mobile number validation (10 digits)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
        return res.json(new ApiError(401, req.body, "Mobile number must be 10 digits long"));
    }
    const exits_email = email;
    const exits_mobile = mobile;
    const allUser = await User.find();
    const get_exists_user = allUser.map((val)=>{
        if(decrypt(val.email)==exits_email){
          return res.json(new ApiError(401, req.body, "User with email or mobile already exists"));
        }
        if(decrypt(val.mobile)==exits_mobile){
          return res.json(new ApiError(401, req.body, "User with email or mobile already exists"));
        }
    })
    const create_user_id = '#' + name + '@' + mobile.substring(0, 4);
    const create_password = '#' + name + '@123' + mobile.substring(0, 4);
    const user_id = create_user_id;
    const password = create_password;
    const security_pin = getRandomFourDigit();
    const status = "true";
    const user = await User.create({
        name,
        email,
        mobile,
        type,
        user_id,
        password,
        security_pin,
        status
    })
    
    if (email_verify == true && mobile_verify == true) {
        const createdUser = await User.findById(user._id)
        if (!createdUser) {
            return res.json(new ApiError(500, req.body, "Something went wrong while registering the user"));
        }
        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(createdUser._id)
        if (!accessToken && !refreshToken) {
            return res.json(new ApiError(500, req.body, "Something went wrong while registering the user"));
        }
        const saveAccesstoken = await GetAccessToken.create(
            {
                user_id: createdUser._id,
                token: accessToken
            }
        );
        if (!saveAccesstoken) {
            return res.json(new ApiError(500, saveAccesstoken, "Access Token not Save In Db"));
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
                        data: createdUser, refreshToken
                    },
                    "User registered Successfully"
                )
            )
    }
})
const loginUser = asyncHandler(async (req, res) => {
    let email_verify = true;
    let mobile_verify = true;
    req = {
        "email": "c2a26c20ce10c0454577558516403abf608dfacbe249d1d4b4088db0c962efa9",
        "mobile": "73d288f3a673635898449312bb53024c499e78897206406d042091ecbbdf52b2",
        "user_id": "7de136605e8ea98818c223d99ce66c7420a639c41b5d68f9eb361bca011f8b3b",
        "password": "7de136605e8ea98818c223d99ce66c7420a639c41b5d68f9eb361bca011f8b3b"
    };

    const { email, mobile, user_id, password } = req
    // if (email) {
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if (!emailRegex.test(email)) {
    //         return res.json(new ApiError(401, req.body, "Invalid email format"));
    //     }
    // }
    // if (mobile) {
    //     const mobileRegex = /^\d{10}$/;
    //     if (!mobileRegex.test(mobile)) {
    //         return res.json(new ApiError(401, req.body, "Mobile number must be 10 digits long"));
    //     }
    // }
    // if (password) {
    //     if (password.length >= 8) {
    //         return res.json(new ApiError(401, req.body, "Password  must be 8 digits"));
    //     }
    // }
    // if (user_id) {
    //     if (user_id.length >= 5 && user_id != '') {
    //         return res.json(new ApiError(401, req.body, "User Id Field Is Required"));
    //     }
    // }

    const getUser = await User.findOne({
        $or: [{ email: email }, { mobile: mobile }, { password: password }, { user_id: user_id }]
    });
    
    if (mobile_verify == true && email_verify == true && getUser !== null) {
        

        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(getUser._id)
        if (!accessToken && !refreshToken) {
            return res.json(new ApiError(500, getUser, "Something went wrong while Login the user"))
        }
        const UpdateTokenStatus = await GetAccessToken.updateMany(
            { user_id: getUser._id }, 
            { $set: { token_status: false } } 
        );
        // return res.json({message : getUser._id});
       
        if (UpdateTokenStatus.modifiedCount > 0) {
            console.log(`${UpdateTokenStatus.modifiedCount} records updated.`);
        } else {
            console.log('No records found to update.');
        }
        const saveAccesstoken = await GetAccessToken.create(
            {
                user_id: getUser._id,
                token: accessToken
            }
        );
        if (!saveAccesstoken) {
            res.json(new ApiError(500, accessToken, "Access Token not Save In Db"));
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
                        data: getUser, refreshToken
                    },
                    "User Login Successfully"
                )
            )
    }


    
    const get_access_token = req.cookies?.accessToken;
    if (!get_access_token) {
        res.json(new ApiError(401, getUser, `Please Verify Your Email And Mobile No`));
    }
    try {
        jwt.verify(get_access_token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
        res.json(new ApiError(401, req.body, `Your Access Token Is Invalid Please Verify Your Email And Mobile No`));
    }
    const check_access_token = await GetAccessToken.findOne({
        $and: [
            { token: get_access_token },
            { token_status: true }
        ]
    });
    if (check_access_token.token_status != true) {
        const options = {
            httpOnly: true,
            secure: true
        }
        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new ApiResponse(200, {}, "User logged Out"));
    }

    if(check_access_token.token_status == true && get_access_token != ''){
        return res.json(new ApiResponse(200, getUser, "Please Verify Your Security Pin"));
    }
});

const genRateLoginToken = asyncHandler(async (req,res) => {
    const { security_pin,user_id } = req.body;
    if(security_pin !=''){
        const findUser = await GetAccessToken.findOne({
            $and: [
                { _id: user_id },
                { security_pin: "0124" }
            ]
        });
      try{
        if(findUser.security_pin == security_pin){
            const { refreshToken } = await genRateRefreshToken(findUser._id)
            if (!refreshToken) {
                return res.json(new ApiError(500, findUser, "Can't Genrate Refresh Token"));
            }
            const options = {
                httpOnly: true,
                secure: true
            }
            return res
                .status(200)
                .cookie("refreshToken", refreshToken, options)
                .json(
                    new ApiResponse(
                        200,
                        {
                            data: findUser, refreshToken
                        },
                        "User Login Successfully"
                    )
                )
        }
        else{
            return res.json(new ApiError(401, findUser, "Invalid Security Pin"));
        }
      }catch(err){
        return res.json(new ApiError(401, findUser, "Invalid Security Pin"));

      }
    }
});






const logoutUser = asyncHandler(async (req, res) => {
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

const sendotpRequest = asyncHandler(async (req, res) => {
    try {
        const type = req.body.type;
        const name = req.body.name;
        if (type == 'Email') {
            const email_req = req.body.email;
            if (!req.body.email) {
                return res.status(202).json(new ApiError(500, req.body, `Email Field Not Found`));
            }
            if (validateEmail(email_req) == false) {
                return res.status(202).json(new ApiError(500, req.body, `Invalid Email Id ${email_req}. Please Enter Valid Email Id`));

            }
            if (email_req) {

                let randomFourDigit = getRandomFourDigit();
                const htmlContent = '<html><head></head><body><h1>Your OTP is ' + randomFourDigit + '</h1></body></html>';
                const subject = "OTP for Email verification - Nera Soft";
                if (sendEmail(email_req, name, subject, htmlContent)) {
                    return res.status(201).json(new ApiResponse(200, randomFourDigit, "OK"));
                } else {
                    return res.status(202).json(new ApiError(500, "OTP on email not sent. Please try again"));
                }
            }

        }
        else if (type == 'Mobile') {
            if (!req.body.mobile) {
                return res.status(202).json(new ApiError(500, req.body, `Mobile Field Not Found`));
            }
            const mobile = req.body.mobile;
            const name = req.body.name;
            if (typeof (mobile) != 'number') {
                return res.status(202).json(new ApiError(500, mobile, `Invalid Mobile No ${mobile}. Mobile should be number`));
            }
            else {
                if (mobile.toString().length == 10 && typeof (mobile) == 'number') {


                    try {
                        let randomFourDigit = getRandomFourDigit();
                        sendmobileOTP(mobile, randomFourDigit, name);
                        return res.status(200).json(new ApiResponse(200, randomFourDigit, `OTP Send to  Mobile No ${mobile}`));
                    } catch (error) {
                        return res.status(202).json(new ApiError(500, mobile, error));

                    }
                }
                else {
                    return res.status(203).json(new ApiError(500, mobile, `Invalid Mobile No ${mobile}. Mobile should be 10 digit`));


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


function validateEmail(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
function serverIPs() {
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
    sendotpRequest,
    genRateLoginToken
}