import { Router } from 'express'
import { checkToken, googleLogin, login, logout } from '../controllers/sessions.controller.js'

const router = Router()

router.get('/', checkToken)
router.post('/login', login)
router.post('/logout', logout)
router.post('/auth/google', googleLogin)

export default router