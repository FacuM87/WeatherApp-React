import dotenv from "dotenv"

dotenv.config()

const config = {
    env: process.env.NODE_ENV || "production",
    port: process.env.PORT || 8080,
    mongoUrl: process.env.MONGO_URL,
    mongoDB: process.env.MONGO_DB,
    jwtSign: process.env.JWT_SIGN,
    mailService: process.env.MAIL_SERVICE,
    mailUser: process.env.MAIL_USER,
    mailPass: process.env.MAIL_PASS,
    mailPort: process.env.MAIL_PORT,
    origin: process.env.DEV_ALLOWED_ORIGIN,
    googleOAuth_id: process.env.GOOGLE_OAUTH_ID
}

if(config.env != "dev"){
    config.origin = process.env.PROD_ALLOWED_ORIGIN
}

export default config