import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
import colors from "colors";
import connectDB from "./config/db";
import cors from "cors";
import session from "express-session";

import userRoutes from "./routes/userRoutes";
import coachRoutes from "./routes/coachRoutes";

//twilio config
import twilio from "twilio";
const accountSid = "ACcd31af34bbb4c46b9cfe5ba73591f47a";
const authToken = "8134a9d527fdfe838cb49f3e61181525";
const client = twilio(accountSid, authToken);

const app = express();


// Load environment variables from .env file
dotenv.config();

connectDB();

app.use(morgan("dev"));

// Use express.json to parse incoming request body as json
app.use(express.json());

// cors config
app.use(cors());

//session config
const sessionSecret: any = process.env.SESSION_SECRET;
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

// define routes for the server
app.use("/api/users", userRoutes);
app.use("/api/coaches", coachRoutes);

app.post("/", async (req: Request, res: Response) => {
  res.send("wats up bro!");
});

// Use the notFound middleware for 404 errors
app.use(notFound);
// Use the errorHandler middleware for other errors
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `[server🤖]: Beep Boop Bop, I am Running at http://localhost:${PORT}⚡️`
  );
});
