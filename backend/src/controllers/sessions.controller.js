import MongoUserManager from "../dao/mongo/managers/users.manager.js";
import { generateToken, validatePassword, verifyGoogleToken, verifyToken } from "../utils.js";

const userManager = new MongoUserManager

export const login = async(req, res) =>{
    try {
        const {email, password} = req.body

        const existingUser = await userManager.getUserByEmail(email)
        
        if(!existingUser || !validatePassword(password, existingUser)){
            return res.status(401).json({status: "fail", message:"Invalid Credentials"})
        }

        const token = generateToken(existingUser)
        res.cookie('jwt', token, {httpOnly: true, sameSite: "none", secure: true});
        
        const { password: _, ...userWithoutPassword } = existingUser;
        res.status(200).json({ status: "success", message: "Login successful", payload: userWithoutPassword });

    } catch (error) {
        console.error("Internal server error. Couldn't login");
        res.status(500).json({status:"fail", message:"Internal server error. Couldn't login"})
    }
}

export const logout = async(req, res) =>{
    try {
        res.clearCookie('jwt')
        res.status(200).json({status:"success", message:"Logout successful"})
    } catch (error) {
        console.error("Internal server error. Couldn't logout");
        res.status(500).json({status:"fail", message:"Internal server error. Couldn't logout"})
    }
}

export const checkToken = async(req, res) =>{
    try {
        const token = req.cookies.jwt
        console.log(token);
        
        if (!token) {
            return res.status(401).json({ status: "fail", message: "User needs to login" });
        }

        const userData = verifyToken(token);
        
        const { password: _, ...user } = userData.user;
        res.status(200).json({ status: "success", payload: user });
    } catch (error) {
        console.error("Internal server error. Couldn't check token");
        res.status(500).json({status:"fail", message:"Internal server error. Couldn't check token"})
      
    }
}

export const googleLogin = async (req, res) =>{
    const {googleToken} = req.body 
    try {
        const { first_name, last_name, email, picture } = await verifyGoogleToken(googleToken);

        let existingUser = await userManager.getUserByEmail(email)
        if(!existingUser){
            const newUser = {
                first_name,
                last_name,
                email,
                password: '',
                picture,
            }
            await userManager.createUser(newUser)
            existingUser = await userManager.getUserByEmail(email)
        }

        const jwtCookie = generateToken(existingUser)
        res.cookie('jwt', jwtCookie, {httpOnly: true, sameSite: "none", secure: true});

        const { password: _, ...userWithoutPassword } = existingUser;
        res.status(200).json({ status: "success", message: "Login successful", payload: userWithoutPassword });

    } catch (error) {
        console.error("Internal server error. Couldn't login with google: ", error);
        res.status(500).json({status:"fail", message:"Internal server error. Couldn't login with google"})
    }
}