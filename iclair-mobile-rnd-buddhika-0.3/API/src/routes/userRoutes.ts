import express from 'express'
import {register, verifyOTP,authorization} from '../controllers/userController'
import asyncHandler from 'express-async-handler'
import { protect } from '../middleware/authMiddleware'

// Create a new Express router
const router = express.Router()


// register a new user
router.post('/', asyncHandler(register))

router.post('/auth', asyncHandler(authorization))

router.post('/verify', asyncHandler(verifyOTP))


export default router
