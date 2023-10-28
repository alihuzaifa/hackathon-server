import express from "express";
import {
  AddNewCourse,
  DeleteOffer,
  GetAllCourses,
} from "../controllers/NewCourses.js";
import singleUpload from "../middleware/Multer.js";
const router = express.Router();
router.post("/addnewCouse", singleUpload, AddNewCourse);
router.delete("/deleteOffer", DeleteOffer);
router.get("/getAllCourses", GetAllCourses);
export default router;
