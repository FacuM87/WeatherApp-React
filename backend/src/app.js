import express from 'express'
import cookieParser from 'cookie-parser'
import config from "./config/config.js"
import { connectToMongo } from './dao/mongo/mongo.connect.js'
import cors from 'cors'
import indexRouter from './router/index.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin: config.origin,
    credentials: true
}))
await connectToMongo()

app.use('/', indexRouter)

app.listen(config.port, async ()=>{
    console.log("Server running in ", config.port);
})