import express from "express";
import {
    AllCategories,
    CreateCourse,
    UpdateDish,
    deleteCourse,
    getCourses,
} from "../controllers/Course.js";
import singleUpload from "../middleware/Multer.js";
const router = express.Router();
router.post("/createCourse", singleUpload, CreateCourse);
router.get("/getCourses", getCourses);
router.delete("/deleteCourse", deleteCourse);
router.put("/updateDish", (req, res, next) => {
    if (req?.body?.isUpload == false) {
        next()
    } else {
        singleUpload(req, res, next);
    }
}, UpdateDish);
router.get("/categories", AllCategories);
export default router;