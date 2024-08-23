import dotenv from "dotenv"

dotenv.config()

const config = {
    env: process.env.NODE_ENV || "production",
    port: process.env.PORT || 8080,
    mongoUrl: process.env.MONGO_URL,
    mongoDB: process.env.MONGO_DB,
    jwtSign: process.env.JWT_SIGN,
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleClientCallback: process.env.GOOGLE_CLIENT_CALLBACK_URL,
    mailService: process.env.MAIL_SERVICE,
    mailUser: process.env.MAIL_USER,
    mailPass: process.env.MAIL_PASS,
    mailPort: process.env.MAIL_PORT,
    origin: process.env.DEV_ALLOWED_ORIGIN
}

if (process.env.NODE_ENV === "production") {
    config.origin = process.env.PROD_ALLOWED_ORIGIN
    config.googleClientCallback = process.env.PROD_GOOGLE_CLIENT_CALLBACK_URL
}

export default config