import { Router } from 'express'
import { createAdminUser, createUser, deleteUser, getUserById, getUsers } from '../controllers/users.controllers.js'
import { auth } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', auth(['admin']), getUsers)
router.get('/:id', getUserById)
router.post('/register', createUser)
router.post('/createAdmin', auth(['admin']), createAdminUser)
router.post('/delete/:id', auth(['admin']), deleteUser)

export default router