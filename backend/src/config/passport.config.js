import passport from "passport"
import passportJWT from "passport-jwt"
import passportGoogle from "passport-google-oauth2"
import local from "passport-local"
import { createHash, generateToken, validatePassword } from "../utils.js"
import config from "./config.js"
import MongoUserManager from "../dao/mongo/managers/users.manager.js"



const LocalStrategy = local.Strategy
const JWTStrategy = passportJWT.Strategy
const GoogleStrategy = passportGoogle.Strategy;
const MongoManager = new MongoUserManager

const initializePassport = () => {
     
    passport.use("login", new LocalStrategy ({
        usernameField: "email"
    }, async (username, password, done) => {
        try {
            const user = await MongoManager.getUserByEmail(username)
            if (!user) {
                console.log("No users registered with that email address");
                return done(null, false)
            }

            if(!validatePassword(password, user)){
                console.log("Invalid Credentials");
                return done(null, false)
            }

            const token = generateToken(user)
            user.token = token

            done(null, user)
            
        } catch (error) {
            return done("Passport Login Error: " + error)
        }
    }))

    
    passport.use("register", new LocalStrategy({
        passReqToCallback: true,
        usernameField: "email"
    }, async (req, username, password, done) =>{
        console.log("entraste acá");
        const { first_name, last_name, email, age } = req.body
        try {
            const user = await MongoManager.getUserByEmail(username)
            console.log(user); 
            if(user) {
                console.log("That email address is already registered");
                return done(null, false)
            }
            
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }

            console.log(newUser);
    
            const result = await MongoManager.createUser(newUser)
            console.log(result);
            return done(null, result)
        } catch (error) {
            return done("Passport Register Error: " + error)
        }        
    }) )

    
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([req => req?.cookies?.jwtCookie ?? null]),
        secretOrKey: config.jwtSign
      }, (payload, done) => {
        done(null, payload)
      })
    )

    
    passport.use("google", new GoogleStrategy({
        clientID: config.googleClientID,
        clientSecret: config.googleClientSecret,
        callbackURL: "http://yourdomain:3000/auth/google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
        });
    }
    ));

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async(id, done) =>{

        const user = await MongoUserManager.getUserById(id)
        done(null, user)
    })
}

export default initializePassport