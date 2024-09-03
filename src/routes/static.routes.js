import { Router } from "express";
import { encrypted,decrypted,dashboard } from "../controllers/static.controller.js";
import { verifyJWT,VerfiyUser } from "../middlewares/auth.middleware.js";

const router = new Router();

router.route("/encrypt").post(VerfiyUser,encrypted)
router.route("/decrypt").post(VerfiyUser,decrypted)
router.route("/dashboard").post(VerfiyUser,dashboard)

export default router