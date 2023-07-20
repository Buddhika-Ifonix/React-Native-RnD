import { Express } from 'express-serve-static-core'

//adding user property to express req object

interface userData {
  _id?: any
  phone: string
}

interface sessinData {
  otp: string
  secret: string
}

declare module 'express-serve-static-core' {
  interface Request {
    user: userData,
    session: sessinData
  }
}
