import { Schema, model, connect, Document } from 'mongoose';
import bcrypt from 'bcryptjs'


// Create an interface for the user document
export interface IUser extends Document {
  phone: string;
  firstName: string,
  lastName: string,
  email: string,
  status: number, // weather the user busy or idle 
  currentCredits: number,
  currentMinutes: number,
  currency: string,
  language: string,
  country: string,
  avatar: string,
  isVerified: boolean,
}


// Create a new Mongoose schema for a user
const userSchema = new Schema<IUser>(
  {
    phone: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
       unique: true
    },
    status: {
      type: Number,
      required: true,
      default: 0
    },
    currentCredits: {
      type: Number,
      required: true,
      default:0,
    },
    currentMinutes: {
      type: Number,
      required: true,
      default:0,
    },
    currency: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
)


// This creates users doucment in mongodb
const User = model<IUser>('User', userSchema);

export default User


