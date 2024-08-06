import MongoUserManager from "../dao/mongo/managers/users.manager.js";

const MongoManager = new MongoUserManager

export const login = async (req, res) =>{
    try {
        if (!req.user) return res.status(401).json({status: "fail", message: "Invalid Credentials"})
        console.log(req.user);
        const {first_name, last_name, email, role, token } = req.user
        return res.cookie("jwtCookie", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }).status(200).json({
            status: "success", jwt: token, first_name, last_name, email, role})
    } catch (error) {
        console.error("Backend login Error: " + error)
        return res.status(500).json({status: "critic fail", message: "Internal server error. Couldnt login."})
    }
}

export const register = async (req, res) =>{
    try {
        return res.status(201).json({status: "success"})
    } catch (error) {
        console.log("Register Error: "+error);
        return res.status(500).json({status: "critic fail", message: "Internal server error. Couldnt login."})
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie('jwtCookie')
        return res.status(200).json({status: "success"})    
    } catch (error) {
        return res.status(500).json({status:"fail", message: "Internal server error. Logout failure"})
    }
}

export const session = (req, res) => {
    try {
        const userData = req.user
        if (!userData) return res.status(401).json({status: "fail", message: "Session expired"})
        
        return res.status(200).json({status: "success", userData})    
    } catch (error) {
        return res.status(500).json({status:"fail", message: "Internal server error. Session failure"})
    }
}

export const getUserById = async (req, res) => {
    console.log(req.user);
    const userId = req.params
    console.log("User ID: ", userId);    
    return res.send("llegamos aca")
    
}
export const updateUser = async (req, res) => {

}
export const deleteUserById = async (req, res) => {

}