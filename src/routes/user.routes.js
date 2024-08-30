import { Router } from "express";
import { 
    loginUser, 
    registerUser,
    sendotpRequest,
    genRateLoginToken,
    Expire_link,
    destroyToken
} from "../controllers/user.controller.js";
import { verifyJWT,VerfiyUser } from "../middlewares/auth.middleware.js";
import { kyc_process } from "../controllers/kyc_process.controller.js";


const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/genrate-refresh-token").post(verifyJWT,genRateLoginToken)
router.route("/get-otp").post(sendotpRequest)
router.route("/destroy-token").post(destroyToken)
router.route("/expire-link").post(Expire_link)


router.route("/kyc-process").post(kyc_process)

export default router