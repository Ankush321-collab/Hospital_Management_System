import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middleware/error.js";
import messageRouter from "./route/message.route.js";
import userRouter from "./route/user.route.js";
import appointrouter from './route/appointment.route.js'
import activityRouter from './route/activity.route.js';

const app = express();
config({ path: "./.env" }); // Updated to match .env file

// CORS middleware should be at the very top
console.log('Allowed CORS origins:', process.env.FRONTED_URL, process.env.DASHBOARD_URL);
app.use(
  cors({
    origin: [process.env.FRONTED_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//router for message
app.use("/api/v1/message", messageRouter);

//router for users
app.use("/api", userRouter);

//router for appointment_date
app.use('/api', appointrouter)

//router for activity
app.use("/api/v1/activity", activityRouter);

dbConnection();

app.use(errorMiddleware);
export default app;