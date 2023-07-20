import { coaches } from "../data/data";
import { Request, Response } from "express";

// @desc  verify user
// @route POST /api/coaches
// @access Public
const getCoaches = async (req: Request, res: Response) => {
  console.log('hit')
  res.json(coaches);
};


export {getCoaches}