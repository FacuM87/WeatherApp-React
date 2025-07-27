import { Router } from 'express'
import { checkToken, login, logout } from '../controllers/sessions.controller.js'

const router = Router()

router.get('/', checkToken)
router.post('/login', login)
router.post('/logout', logout)

export default router