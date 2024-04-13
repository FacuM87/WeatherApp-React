

export const login = async (req, res) =>{
    try {
        if (!req.user) return res.status(401).json({status: "fail", message: "Invalid Credentials"})
        console.log(req.user);
        const { token } = req.user
        return res.cookie("jwtCookie", token, { httpOnly: true }).status(200).json({status: "success"})
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
        res.clearCookie('jwt')
        return res.status(200).json({status: "success"})    
    } catch (error) {
        return res.status(500).json({status:"fail", message: "Internal server error. Logout failure"})
    }
}

export const getUserById = async (req, res) => {
    
}
export const updateUser = async (req, res) => {

}
export const deleteUserById = async (req, res) => {

}