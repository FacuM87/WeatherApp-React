import { Router} from "express";
import { login, register, logout, getUserById, updateUser, deleteUserById } from "../controllers/users.controllers.js";
import passport from "passport";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router()

// SESSIONS //
router.post("/login", passport.authenticate("login", {session: false}), login)
router.get("/logout", logout)
router.post("/register", passport.authenticate("register", {session: false}), register)

// USERS CRUD (admin only) //
router.get("/:uid", passport.authenticate("jwt", {session: false}), auth, getUserById)
router.patch("/:uid", updateUser)
router.delete("/:uid", deleteUserById)

export default router