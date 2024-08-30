import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import os from 'os';
import { sendEmail, sendmobileOTP } from "../utils/EmailMobileAPI.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { GetAccessToken } from "../models/access_token.model.js";
import { json } from "express";
import { encrypt, decrypt } from "../utils/Encrypt_decrypt.js";
import { sendWelcomeTemplate, sendLoginInformation } from "../utils/Welcome.js";
import { Expire_link_schema } from "../models/expire_link.model.js";
import jwt from "jsonwebtoken"



const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new Error(error.message)
        // res.json(new ApiError(500, user, "Something went wrong while generating referesh and access token"));
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
    const device_type = "app"
    const { name, email, mobile, type, email_verify, mobile_verify } = req.body;
    if ([name, email, mobile, type].some((field) => field?.trim() === "")) {
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
        return res.json(new ApiError(401, { }, errorMessage));
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(decrypt(email))) {
        return res.json(new ApiError(401, { }, "Invalid email format"));
    }

    // Mobile number validation (10 digits)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(decrypt(mobile))) {
        return res.json(new ApiError(401, { }, "Mobile number must be 10 digits long"));
    }

    const exits_email = decrypt(email);
    const exits_mobile = decrypt(mobile);
    const allUser = await User.find();

    if (allUser) {
        for (let val of allUser) {
            if (decrypt(val.email) === exits_email || decrypt(val.mobile) === exits_mobile) {
                return res.json(new ApiError(401, { }, "User with email or mobile already exists"));
            }
        }
    }

    const create_user_id = '#' + decrypt(name) + '@' + decrypt(mobile).substring(0, 4);
    const create_password = '#' + decrypt(name) + '@123' + decrypt(mobile).substring(0, 4);
    const user_id = create_user_id;
    const password = create_password;
    const security_pin = getRandomFourDigit();
    const status = "active";

    const user = await User.create({
        name,
        email,
        mobile,
        type,
        device_type,
        user_id,
        password,
        security_pin,
        status
    });

    if (email_verify == true && mobile_verify == true) {
        const createdUser = await User.findById(user._id);
        if (!createdUser) {
            return res.json(new ApiError(500, { }, "Something went wrong while registering the user"));
        }

        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(createdUser._id);
        if (!accessToken && !refreshToken) {
            return res.json(new ApiError(500, { }, "Something went wrong while registering the user"));
        }

        const saveAccesstoken = await GetAccessToken.create({
            user_id: createdUser._id,
            token: accessToken,
            device_type: device_type
        });

        if (!saveAccesstoken) {
            return res.json(new ApiError(500, { }, "Access Token not Save In Db"));
        }

        const options = {
            httpOnly: true,
            secure: true
        };

        sendWelcomeTemplate(createdUser);

        return res
            .status(200)
            .json(new ApiResponse(200, { user_id: createdUser._id, accessToken, refreshToken }, "User registered Successfully"));
    }
});


const loginUser = asyncHandler(async (req, res) => {
    const device_type = "app"
    const { email, mobile, user_id, password, email_verify, mobile_verify, type } = req.body;

    // Check if password is provided
    if (decrypt(type) != "google" || decrypt(type) != "apple") {
        if (!password || decrypt(password).length <= 8) {
            return res.json(new ApiError(401, { }, "Password must be at least 8 characters long"));
        }
    }

    // Check if at least one of email, mobile, or user_id is provided
    if (!email && !mobile && !user_id) {
        return res.json(new ApiError(401, { }, "Please provide either an email, mobile number, or user ID"));
    }

    // Validate email if provided
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(decrypt(email))) {
            return res.json(new ApiError(401, { }, "Invalid email format"));
        }
    }

    // Validate mobile if provided
    if (mobile) {
        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(decrypt(mobile))) {
            return res.json(new ApiError(401, { }, "Mobile number must be 10 digits long"));
        }
    }
    // Validate user_id if provided
    if (user_id) {
        if (decrypt(user_id).length <= 5) {
            return res.json(new ApiError(401, { }, "User ID must be at least 6 characters long"));
        }
    }
    const getAllUser = await User.find();

    const getUser = [];
    if (getAllUser) {
        for (let val of getAllUser) {
            if (decrypt(type) != "google" || decrypt(type) != "apple") {
                if ((decrypt(val.email) === decrypt(email) && decrypt(val.password) === decrypt(password)) || (decrypt(val.mobile) === decrypt(mobile) && decrypt(val.password) === decrypt(password)) || (decrypt(val.user_id) === decrypt(user_id) && decrypt(val.password) === decrypt(password))) {
                    getUser.push(val);
                }
            } else {
                if (decrypt(val.email) === decrypt(email)) {
                    getUser.push(val);
                }
            }
        }
    }
    if (decrypt(getUser[0].status) === "inactive") {
        return res.json(new ApiError(401, { }, "Your Account has been inactive"));
    }
    if (decrypt(getUser[0].status) === "deleted") {
        return res.json(new ApiError(401, { }, "Your Account has been deleted"));
    }
    if (!getUser) {
        return res.json(new ApiError(401, { }, "Please Check Your Credential "));
    }

    if (mobile_verify == true && email_verify == true && getUser !== null) {
        
        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(getUser[0]._id)

        if (!accessToken && !refreshToken) {
            return res.json(new ApiError(500, { } , "Something went wrong while Login the user"))
        }
        const UpdateTokenStatus = await GetAccessToken.updateMany(
            { user_id: getUser[0]._id, device_type: device_type }, // Filter: find documents that match these conditions
            { $set: { token_status: false } }                      // Update: set `token_status` to false
        );
        
      
        if (UpdateTokenStatus.modifiedCount > 0) {
            console.log(`${UpdateTokenStatus.modifiedCount} records updated.`);
        } else {
            console.log('No records found to update.');
        }
        const saveAccesstoken = await GetAccessToken.create(
            {
                user_id: getUser[0]._id,
                token: accessToken,
                device_type: device_type
            }
        );
        if (!saveAccesstoken) {
            res.json(new ApiError(500, { }, "Access Token not Save In Db"));
        }
        const current_date = new Date();
        const expire_date = new Date(current_date.getTime() + 10 * 60000);

        try {
            const update_expire_status = await Expire_link_schema.updateMany(
                { user_id: getUser[0]._id },
                { $set: { status: false } }
            );
            const create_link_data = await Expire_link_schema.create({
                user_id: getUser[0]._id,
                expireAt: expire_date,
            });

        } catch (error) {
            return res.json(new ApiError(500, { }, "Expire Link Not Created"));
        }
        sendLoginInformation(getUser[0], device_type);
        const options = {   
            httpOnly: true,
            secure: true
        }
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        user_id:  getUser[0]._id, accessToken,refreshToken
                    },
                    "User Login Successfully"
                )
            )
    }
  
    // verify access token 
    const get_access_token = req.headers.accesstoken;
    
    if (!get_access_token) {
        return res.json(new ApiError(401, { user_email: getUser[0].email, user_mobile: getUser[0].mobile }, `Please Verify Your Email And Mobile No`));
    }
    try {
        jwt.verify(get_access_token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
        return res.json(new ApiError(401, { user_email: getUser[0].email, user_mobile: getUser[0].mobile }, `Please Verify Your Email And Mobile No`));
    }
    const check_access_token = await GetAccessToken.findOne({
        $and: [
            { token: get_access_token },
            { token_status: true },
            { device_type: device_type }
            
        ]
    });
    if (check_access_token.token_status != true) {
        const options = {
            httpOnly: true,
            secure: true
        }
        return res
            .status(200)
            .json(new ApiError(200, {}, "Please Verify Your Email And Mobile No"));
    }
    if (check_access_token.token_status == true && get_access_token != '') {
        return res.json(new ApiResponse(200, { security_pin: getUser[0].security_pin, user_id: getUser[0].id }, "Please Verify Your Security Pin"));
    }
    // verify access token 

});

const genRateLoginToken = asyncHandler(async (req, res) => {
     const device_type = "app"
    const { security_pin, user_id } = req.body;
    if (security_pin != '') {
        const findUser = await User.findById(user_id);
        if (!findUser) {
            return res.json(new ApiError(401, { }, "Envalid User Security Pin"));
        }
        try {
            if (decrypt(findUser.security_pin) === decrypt(security_pin)) {
                const { refreshToken } = await genRateRefreshToken(findUser._id)
                if (!refreshToken) {
                    return res.json(new ApiError(500, { }, "Can't Genrate Refresh Token"));
                }
                sendLoginInformation(findUser,device_type);
                const options = {
                    httpOnly: true,
                    secure: true
                }
                return res
                    .status(200)
                    .json(
                        new ApiResponse(
                            200,
                            {
                                user_id: findUser._id, refreshToken
                            },
                            "User Login Successfully"
                        )
                    )
            }
            else {
                return res.json(new ApiError(401, findUser, "Invalid Security Pin"));
            }
        } catch (err) {
            return res.json(new ApiError(401, findUser, "Invalid Security Pin"));
        }
    } else {
        return res.json(new ApiError(401, { }, "Please Enter Your Security Pin"));

    }
});



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

const Expire_link = asyncHandler(async (req, res) => {
    const { user_id } = req.body;
    if (!user_id) {
        return res.json(new ApiError(401, req.body, "User ID Not Found"));
    }
    try {
        const expire_link_data = await Expire_link_schema.findOne({
            $and: [
                { user_id: user_id },
                { status: true }
            ]
        });

        if (expire_link_data) {

            const current_date = new Date();
            const expire_date = new Date(expire_link_data.expireAt);
            const differenceInMilliseconds = current_date - expire_date;
            const differenceInMinutes = differenceInMilliseconds / 60000;
            if (differenceInMinutes <= 10) {
                return res.json(new ApiResponse(200, current_date, "Link Not Expire"));
            } else {
                const update_expire_status = await Expire_link_schema.updateMany(
                    { user_id: user_id },
                    { $set: { status: false } }
                );
                return res.json(new ApiError(200, current_date, "Link Expired"));
            }
        } else {
            return res.json(new ApiError(500, {}, "Link Expired"));
        }
    } catch (error) {
        return res.json(new ApiError(500, {}, "Link Expired"));
    }

});           

const destroyToken = asyncHandler(async (req, res) => {
    const { user_id,device_type } = req.body;
    if (!user_id) {
        return res.json(new ApiError(401, req.body, "User ID Not Found"));
    }
    try {
        const destroy_token = await GetAccessToken.updateMany({ user_id: user_id, device_type:device_type }, { $set: { token_status: false } });

        if (destroy_token.modifiedCount == 1) {
            return res.json(new ApiResponse(200, {}, "Token Destroyed Successfully"));
        } else {
            return res.json(new ApiError(500, {}, "Token Not Found"));
        }
    } catch (error) {
        return res.json(new ApiError(500, {}, "Error in Token Destroy"));
    }
});

export {
    registerUser,
    loginUser,
    sendotpRequest,
    genRateLoginToken,
    Expire_link,
    destroyToken
}