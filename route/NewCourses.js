import express from "express";
import {
  AddOffers,
  DeleteOffer,
  GetAllOffers,
} from "../controllers/NewCourses.js";
import singleUpload from "../middleware/Multer.js";
const router = express.Router();
router.post("/addOffer", singleUpload, AddOffers);
router.delete("/deleteOffer", DeleteOffer);
router.get("/getAllOffer", GetAllOffers);
export default router;