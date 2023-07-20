import { Request, Response, NextFunction } from "express";

// This function handles 404 errors by creating a new error object with a message
const notFound = (req:Request, res:Response, next: NextFunction):void => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  // passes error object to next error-handling middleware
  next(error)
}

// This function is an error-handling middleware that takes an error object as an argument.
const errorHandler = (err: Error, req: Request, res: Response, next:NextFunction) => {
  //check whether the status code is === 200
  //if it is change it to 500 else keep existing status code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  // sets response status
  res.status(statusCode)
  // sends error message as JSON in response
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
  // calls next middleware
  next()
}

export { notFound, errorHandler }
