import express from 'express'
import { getCoaches } from '../controllers/coachController'
import asyncHandler from 'express-async-handler'
import { protect } from '../middleware/authMiddleware'

// Create a new Express router
const router = express.Router()



router.get('/',protect, asyncHandler(getCoaches))



export default router
