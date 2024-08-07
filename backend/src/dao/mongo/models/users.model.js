import mongoose from "mongoose"

const UserModel = mongoose.model("users", new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    role:
        {
            type: String,
            enum: ["admin", "user"],
            default: "user"
        },
    last_connection: 
        {
            type: Date,
            default: Date.now()
        }
    },{ timestamps:true }
))

export default UserModel