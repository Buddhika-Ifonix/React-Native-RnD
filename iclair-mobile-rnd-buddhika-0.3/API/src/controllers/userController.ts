import User, { IUser } from "../models/userModel";
import generateOtp from "../Utils/generateOtp";
import generateToken from "../Utils/generateToken";
import { Request, Response } from "express";

// @desc  Register a new User
// @route POST /api/users/auth
// @access Public
const authorization = async (req: Request, res: Response) => {
  const { phone } = req.body;

  const phoneRegex = new RegExp(
    /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm
  );

  if (phoneRegex.test(phone)) {
    // Generating a new OTP token for the user
    const tokenObj = generateOtp();
    // Storing the OTP token in the user's session for future verification.
    req.session.otp = `${tokenObj.otp},${phone}`;

    // Check if the user with the given phone number already exists in the database

    res.status(200).json({
      phone: phone,
      otp: tokenObj.otp,
    });
  } else {
    res.status(400);
    throw new Error("Nice Try!");
  }
};

// @desc  verify user
// @route POST /api/users/verify
// @access Public
const verifyOTP = async (req: Request, res: Response) => {
  const { phone, otp } = req.body;

  if (otp && otp === req.session.otp.split(',')[0] ) {
    const userExists = await User.findOne({ phone });

    if (userExists) {
      res.status(200).json({user: userExists, token: generateToken(userExists._id)});
    } else {
      const isRegisterd = false;
      res.status(200).json({ isRegisterd, phone, otp });
    }
  } else {
    res.status(400);
    throw new Error("Bugger offf");
  }
};

// @desc  verify user
// @route POST /api/users/verify
// @access Public
const register = async (req: Request, res: Response) => {
  const {
    phone,
    firstName,
    lastName,
    email,
    status,
    currentCredits,
    currentMinutes,
    currency,
    language,
    country,
    avatar,
    isVerified,
    otp,
  } = req.body;

  if (otp && otp === req.session.otp.split(',')[0]) {
    const newUser: IUser = await User.create({
      phone,
      firstName,
      lastName,
      email,
      status,
      currentCredits,
      currentMinutes,
      currency,
      language,
      country,
      avatar,
      isVerified,
    });

    res.status(201).json({user: newUser, token: generateToken(newUser._id)});
  }else{
    res.status(400).json('Authentication failed')
  }
};

export { register, verifyOTP, authorization };
