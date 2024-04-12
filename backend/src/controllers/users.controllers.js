

export const login = async (req, res) =>{
    try {
        if (!req.user) return res.status(401).send("Invalid Credentials")
        console.log(req.user);
        const { token } = req.user
        return res.cookie("jwtCookie", token).status(200).json({status: "login success"})
    } catch (error) {
        console.log("Login Error: " + error)
        return res.status(500).send("Internal server error. Couldnt login.")
    }
}

export const register = async (req, res) =>{
    try {
        return res.status(201).json({status: "success"})
    } catch (error) {
        console.log("Register Error: "+error);
        return res.status(500).send("Internal server error. Couldnt register")
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie('jwt')
        return res.redirect("/")      
    } catch (error) {
        return res.status(500).send("Internal server error. Logout failure")
    }
}