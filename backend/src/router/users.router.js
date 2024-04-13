import { Router} from "express";
import { login, register, logout } from "../controllers/users.controllers.js";
import passport from "passport";

const router = Router()

router.post("/login", passport.authenticate("login", {session: false}), login)
router.post("/register", passport.authenticate("register", {session: false}), register)
router.get("/logout", logout)

// ADMIN CRUD //


export default router