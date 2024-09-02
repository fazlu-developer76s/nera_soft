import { Router  } from "express";
import { kyc_process } from "../controllers/kyc_process.controller.js"
import { VerfiyUser } from "../middlewares/auth.middleware.js"

const router = new Router()

// router.route("/kyc-process").post(VerfiyUser,kyc_process);
router.route("/kyc-process/").get(kyc_process);

export default router;