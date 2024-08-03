import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import config from "./config/config.js"
import usersRouter from "./router/users.router.js"
import passport from "passport"
import initializePassport from "./config/passport.config.js"
import cors from "cors"


/* Express and other middlewares setup */
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

/* CORS */
const allowedOrigin = config.origin
console.log(allowedOrigin);
//app.use(cors({credentials: true, origin: allowedOrigin}))
app.use(cors({credentials: true, origin: "https://my-weather-app-ashy.vercel.app/"}))

/* Mongo DB connection */
mongoose.connect(config.mongoUrl, {dbName: "weather-app"})
    .then(() => {
        console.log("Mongo DB connected")
    })
    .catch(e => {
        console.log("Couldnt connect with Mongo DB, error message: "+e);
        res.status(500).send(e)
    })


/* Passport */
initializePassport()
app.use(passport.initialize())


/* API Route */
app.get("/", (req, res) => {
    res.send("API is running...")
})
app.use("/api/users", usersRouter)

const port=config.port
app.listen(port, () => console.log("Server running on port "+port))
