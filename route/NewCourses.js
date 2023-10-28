import express from "express";
import {
  AddNewCourse,
  DeleteOffer,
  GetAllOffers,
} from "../controllers/NewCourses.js";
import singleUpload from "../middleware/Multer.js";
const router = express.Router();
router.post("/addnewCouse", singleUpload, AddNewCourse);
router.delete("/deleteOffer", DeleteOffer);
router.get("/getAllOffer", GetAllOffers);
export default router;