import jwt from 'jsonwebtoken'

// Function to generate a JSON web token
const generateToken = (id: string): string => {
  // Create the token using the user's id and the JWT_SECRET as the secret
  // Set the token to expire in 30 days

  let secret: any = process.env.JWT_SECRET

  return jwt.sign({ id }, secret, {
    expiresIn: '30d',
  })
}

export default generateToken
