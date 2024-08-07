import {fileURLToPath} from 'url'
import { dirname } from 'path'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from './config/config.js'

/* DIRNAME */

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export default __dirname


/* BCRYPT */

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const validatePassword = (password, user) => {
    return bcrypt.compareSync(password, user.password)
}

/* JWT */

const PRIVATE_KEY = config.jwtSign
export const generateToken = (user) => {
    return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "24h" })
}

export const verifyToken = (token) =>{
    try {
        const tokenData = jwt.verify(token, PRIVATE_KEY)
        return tokenData
    } catch (error) {
        console.log(error);
        return null
    }

}