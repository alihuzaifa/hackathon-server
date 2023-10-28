import express from "express";
import {
    GetAllAdmin,
    GetAllUser,
    Login,
    Signup,
    UpdatePass,
    checkEmail,
    getDashboardData,
} from "../controllers/User.js";
const router = express.Router();
router.post("/login", Login);
router.post("/signup", Signup);
router.get("/allUser", GetAllUser);
router.get("/allAdmin", GetAllAdmin);
router.get("/dashboardData", getDashboardData);
router.put("/updatePass", UpdatePass);
router.post("/checkEmail", checkEmail);
export default router;