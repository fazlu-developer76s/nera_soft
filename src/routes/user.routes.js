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

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/genrate_token").post(verifyJWT,genRateLoginToken)
router.route("/get-otp").post(sendotpRequest)
router.route("/logout").post(verifyJWT,  logoutUser)

export default router