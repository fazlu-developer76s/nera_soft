import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser,
    sendotpRequest,
    genRateLoginToken
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").get(registerUser)
router.route("/login").get(loginUser)
router.route("/genrate_token").get(verifyJWT,genRateLoginToken)
router.route("/get-otp").post(sendotpRequest)

//secured routes
router.route("/logout").post(verifyJWT,  logoutUser)

export default router