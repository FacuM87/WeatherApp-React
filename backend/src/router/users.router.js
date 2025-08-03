import { Router } from 'express'
import { createAdminUser, createUser, deleteUser, getUserById, getUsers } from '../controllers/users.controllers.js'

const router = Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/register', createUser)
router.post('/createAdmin', createAdminUser)
router.post('/delete/:id', deleteUser)

export default router