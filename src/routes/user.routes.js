import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser,
    sendotpRequest
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").get(registerUser)
router.route("/login").post(loginUser)
router.route("/get-otp").post(sendotpRequest)

//secured routes
router.route("/logout").post(verifyJWT,  logoutUser)

export default router