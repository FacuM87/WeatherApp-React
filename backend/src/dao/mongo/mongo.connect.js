import mongoose from 'mongoose'
import config from "../../config/config.js"

export const connectToMongo = async () => {
    try {
        await mongoose.connect(config.mongoUrl, {dbName: config.mongoDB})
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Couldnt connect with Mongo DB, error message:", error)
        res.status(500).json({status:"fail", message:"Internal server error. Couldn't connect to DB"}) 
    }
}
 
