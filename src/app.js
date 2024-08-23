import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { verifyJWT } from "./middlewares/auth.middleware.js"

const app = express()

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

//routes declaration
import ipRouter from "./routes/ip.routes.js";

//routes declaration
app.use("/api/v1/ip", ipRouter)

app.use("/api/v1/users", userRouter)


app.get("/dashboard", verifyJWT ,function(req, res) {
    // const cookies = req.cookies;
    // res.json(cookies);
});

export { app }