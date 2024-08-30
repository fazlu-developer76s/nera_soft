import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import { verifyJWT,VerfiyUser } from "./middlewares/auth.middleware.js"
import { encrypt,decrypt } from "./utils/Encrypt_decrypt.js"
import { ApiResponse } from "./utils/ApiResponse.js"


const app = express()
app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
import ipRouter from "./routes/ip.routes.js";
import StaticRoute from "./routes/static.routes.js"
import KycProcess from "./routes/kyc.routes.js"


//routes declaration
app.use("/api/v1/ip", ipRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/",StaticRoute)
app.use("/api/v1/kyc/",KycProcess);




export { app }