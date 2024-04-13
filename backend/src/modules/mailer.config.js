import nodemailer from "nodemailer"
import config from "../config/config.js"

export default class Mail {
    constructor(){
        this.transport = nodemailer.createTransport({
            service: config.mailService,
            port: config.mailPort,
            auth:{
                user: config.mailUser,
                pass: config.mailPass
            }
    })}

    sendRegisterConfirmationMail = async (first_name, email, password) => {
        const options = {
            from: config.mailUser,
            to: email,
            subject: "My Weather App - Register Confirmation",
            html: `
                    <h1>Welcome ${first_name}!<h1>
                    <br>
                    <h2>Your registration process has been successful!</h2>
                    <br>
                    <h3>You can now login with your credentials: </h3>
                    <br>
                    <p><strong>User:</strong> ${email}</p>
                    <p><strong>Password:</strong> ${password}</p>
                    <br>
                    <p>Thanks for choosing <strong>My Weather App!</strong></p>
                    <small>Developed by Facu!</small>
                    `
        }

        const result = await this.transport.sendMail(options)

        return result
    }

    sendPasswordMail = async (email, url) => {
        const options = {
            from: config.mailUser,
            to: email,
            subject: "eCommerce - RESTABLISH YOUR PASSWORD",
            html: `<h1>Restablish your password</h1>
            <br>
            <br>
            <h3>Click on the following link in order to restablish your password. This link will expire after 1 hour:</h3>
            <br>
            <a href="${url}">Click here</a>
            <br>
            ` 
        }

        const result = await this.transport.sendMail(options)
        return result
    }

}
