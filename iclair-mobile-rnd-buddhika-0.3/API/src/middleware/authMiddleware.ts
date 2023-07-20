import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'

interface JwtPayload {
  id: string
}

// Middleware function to handle JWT authentication and authorization
const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    
    let token: string | undefined

    // Check if the authorization header starts with 'Bearer' and extract the token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1]

        // Verify the token and decode the payload
        let secret: any = process.env.JWT_SECRET

        const id = (jwt.verify(token, secret) as JwtPayload).id

        // Find the user by their ID and exclude the password field
        const user = await User.findById(id)

        if (user) {
          req.user = user
        }

        // Call the next middleware or route
        next()
      } catch (error) {
        // If the token is invalid or has expired, throw an error
        console.error(error)
        res.status(401)
        throw new Error('Not Authorized, token failed')
      }
    }

    // If no token is provided,  throw an error
    if (!token) {
      res.status(401)
      throw new Error('Not Authorized, no token')
    }
  }
)



export { protect }
