import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import userRoutes from "./route/User.js";
import NewCourses from "./route/NewCourses.js";
import feedbackRoutes from './route/Feedback.js'
import courseRoutes from "./route/Course.js";
/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(cors({ origin: "*" }));
cloudinary.v2.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
app.use("upload", express.static("upload"));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(cookieParser());
/* ROUTES */
app.use("/user", userRoutes);
app.use("/new-courses", NewCourses);
app.use("/course", courseRoutes);
app.use("/feedback", feedbackRoutes);
/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGODBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
