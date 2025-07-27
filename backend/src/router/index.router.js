import { Router } from 'express'
import usersRouter from './users.router.js'
import sessionsRouter from './sessions.router.js'

const router = Router()

router.use('/api/users', usersRouter)
// router.use('/api/users', ()=>{console.log('paso por aca');
router.use('/api/sessions', sessionsRouter)

export default router