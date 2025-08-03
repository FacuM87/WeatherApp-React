import MongoUserManager from "../dao/mongo/managers/users.manager.js"
import { createHash } from "../utils.js"

const userManager = new MongoUserManager

export const getUsers = async (req, res) =>{
    try {
        
        const users = await userManager.getUsers()
        res.status(200).json({status:'success', payload:users})
    } catch (error) {
        console.error('Couldnt get users from DB: ', error);
        res.status(500).json({status:'fail', message:'Internal server error. Couldnt get users from DB'})
    }
}

export const getUserById = async (req, res) =>{
    try {
        const id = req.params.id
        const user = await userManager.getUserById(id)

        user? res.status(200).json({status:"success", payload:user}) : res.status(404).json({status: "fail", message: "Couldn't found user by id"})

    } catch (error) {
        console.error("Internal server error. Couldn't get user by ID: ", error);
        res.status(500).json({status: "fail", message:"Internal server error. Couldn't get user by ID."})
    }
}

export const createUser = async (req,res) =>{
    try {
        const user = req.body

        if(!user.first_name || !user.last_name || !user.email || !user.password){
           return res.status(400).json({status:"fail", message:"All fields must be completed"})
        }

        const existingUser = await userManager.getUserByEmail(user.email);
        if (existingUser) {
            return res.status(409).json({ status: "fail", message: "That email has already been registered" });
        }

        const newUser = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: createHash(user.password)
        }

        await userManager.createUser(newUser)
        
        res.status(200).json({status: 'success', message:'User created'})
    } catch (error) {
        console.error('Couldnt create new user: ', error);
        res.status(500).json({status:'fail', message:'Internal server error. Couldn create new user'})
    }
}

export const createAdminUser = async (req,res) =>{
    try {
        const user = req.body

        const newUser = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: createHash(user.password),
            role: "admin"
        }

        await userManager.createUser(newUser)
        
        res.status(200).json({status: 'success', message:'Admin User created'})
    } catch (error) {
        console.error('Couldnt create new admin user: ', error);
        res.status(500).json({status:'fail', message:'Internal server error. Couldn create new admin user'})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = userManager.getUserById(id)

        user? await userManager.deleteUser(id) : res.status(404).json({status: "fail", message:"Couldn't delete user. It doesn't exist."})
        
        res.status(200).json({status:"success", message:"User has been deleted"})
    } catch (error) {
        console.error("Internal server error. Couldn't delete user");
        res.status(500).json({status:"fail", message:"Internal server error. Couldn't delete user"})
    }
}