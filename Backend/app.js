import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { dbConnection } from './database/dbConnection.js';
import messageRouter from './route/message.route.js';
import userRouter from './route/user.route.js';
import { errormiddleware } from './middleware/error.js';

dotenv.config(); // Load .env variables

const app = express(); // Define app first

// CORS setup
app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

// Routes
app.use('/api/v1/message', messageRouter);     // correct route
app.use('/api', userRouter);           // user routes

// Error handler
app.use(errormiddleware);

// Connect to DB
dbConnection();

export default app;
