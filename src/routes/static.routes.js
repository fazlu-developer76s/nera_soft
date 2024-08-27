import { Router } from "express";
import { encrypted,decrypted,dashboard } from "../controllers/static.controller.js";
import { verifyJWT,VerfiyUser } from "../middlewares/auth.middleware.js";

const router = new Router();

router.route("/encrypt").post(encrypted)
router.route("/decrypt").post(decrypted)
router.route("/dashboard",verifyJWT,VerfiyUser).post(dashboard)

export default router