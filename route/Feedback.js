import express from "express";
import { addFeedback, deleteFeedback, getAllFeedbacks } from "../controllers/Feedback.js";
const router = express.Router();
router.post('/addFeedback', addFeedback)
router.delete('/deleteFeedback', deleteFeedback)
router.get('/getFeedbacks', getAllFeedbacks)
export default router;