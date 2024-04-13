import dotenv from "dotenv"

dotenv.config()

export default {
    port: process.env.PORT || 8080,
    mongoUrl: process.env.MONGO_URL,
    mongoDB: process.env.MONGO_DB,
    jwtSign: process.env.JWT_SIGN,
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    origin: process.env.ALLOWED_ORIGIN,
    mailService: process.env.MAIL_SERVICE,
    mailUser: process.env.MAIL_USER,
    mailPass: process.env.MAIL_PASS,
    mailPort: process.env.MAIL_PORT
}