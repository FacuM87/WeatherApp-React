import { Router} from "express";
import { login, register, logout, session, getUserById, updateUser, deleteUserById, googleLogin } from "../controllers/users.controllers.js";
import passport from "passport";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router()

// SESSIONS //
router.post("/login", passport.authenticate("login", {session: false}), login)
router.post("/logout", logout)
router.post("/register", passport.authenticate("register", {session: false}), register)
router.get("/session", passport.authenticate("jwt", {session: false}), session)

// OAUTH //
router.get("/auth/google", passport.authenticate("google", {scope: ["profile", "email"]}, {session: false}))
router.get("/auth/google/callback", passport.authenticate("google", {session: false}), googleLogin)

// USERS CRUD (admin only) //
router.get("/:uid", passport.authenticate("jwt", {session: false}), auth, getUserById)
router.patch("/:uid", updateUser)
router.delete("/:uid", deleteUserById)

export default router