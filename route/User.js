import express from "express";
import {
  GetAllAdmin,
  GetAllUser,
  Login,
  Signup,
  UpdatePass,
  checkEmail,
} from "../controllers/User.js";
const router = express.Router();
router.post("/login", Login);
router.post("/signup", Signup);
router.get("/allUser", GetAllUser);
router.get("/allAdmin", GetAllAdmin);
router.put("/updatePass", UpdatePass);
router.post("/checkEmail", checkEmail);
export default router;
