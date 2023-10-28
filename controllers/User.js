import User from "../model/User.js";
import Dish from "../model/Course.js";
import Offer from "../model/NewCourses.js";
import Feedback from "../model/Feedback.js";
import Order from "../model/Cart.js";
import Delivered from "../model/CompleteOrder.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import generateToken from "../util/GenerateToken.js";
dotenv.config();
const Login = async (req, res) => {
    try {
        const { email, password } = req?.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "All data is required",
            });
        }
        const LoginUser = await User.findOne({ email });
        if (LoginUser) {
            const comparePassword = await bcrypt.compare(
                password,
                LoginUser?.password
            );
            if (comparePassword) {
                const token = generateToken(LoginUser);
                LoginUser.token = token;
                await LoginUser.save();
                const { _id, name, email, role, createdAt, updatedAt, __v } = LoginUser;
                return res.status(200).json({
                    _id,
                    name,
                    email,
                    role,
                    createdAt,
                    updatedAt,
                    __v,
                    token
                });
            } else {
                res.status(404).json({
                    message: "Invalid email or password",
                });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};
const Signup = async (req, res) => {

    try {
        const { name, email, password, role } = req?.body;
        if (!email || !password || !role || !name) {
            return res.status(401).json({ message: "All data is required" });
        }
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(401).json({ message: "User already exist" });
        } else {
            const convertPasswordIntoHash = await bcrypt.hash(password, 10);
            const userObj = { email, password: convertPasswordIntoHash, name, role, cart: [], token: '' };
            let newUser = await User.create(userObj);
            if (newUser) {
                const { _id, email, role, name } = newUser;
                const token = generateToken({ _id, email, name, role });
                newUser.token = token;
                await newUser.save();
                return res.status(200).json(newUser);
            }
        }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};
const GetAllUser = async (req, res) => {
    try {
        const allUser = await User.find({ role: "user" }).select("-password");
        if (allUser) {
            return res.status(200).json(allUser);
        }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};
const GetAllAdmin = async (req, res) => {
    try {
        const allAdmin = await User.find({ role: "admin" }).select("-password");
        if (allAdmin) {
            return res.status(200).json(allAdmin);
        }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};
const checkEmail = async (req, res) => {
    const { email } = req?.body
    try {
        if (!email) { return res.status(401).json({ message: "All data is required" }) }
        const checkUser = await User.find({ email })
        if (checkUser) { return res.status(200).json({ message: "User is authorized" }) }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }

}
const UpdatePass = async (req, res) => {
    const { password, confirmPassword, email } = req?.body
    try {
        if (!password || !confirmPassword, !email) return res.status(400).json({ message: "All data is required" })
        if (password.toLowerCase() === confirmPassword.toLowerCase()) {
            const user = await User.findOne({ email })
            const convertPasswordIntoHash = await bcrypt.hash(password, 10);
            user.password = convertPasswordIntoHash
            await user.save()
            return res.status(200).json(user)

        } else {
            return res.status(400).json({ message: "Password is matching" });

        }
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};
const getDashboardData = async (req, res) => {
    try {
        const allUserLength = await User.find({ role: "user" }).select("-password");
        const allAdmin = await User.find({ role: "admin" }).select("-password");
        const allDish = await Dish.find({});
        const allOffer = await Offer.find({});
        const allFeedback = await Feedback.find({});
        const allOrder = await Order.find({});
        const allDelivered = await Delivered.find({});
        const dishArray = []?.concat(...allOrder?.map(item => item?.dish));
        const completeOrder = []?.concat(...allDelivered?.map(item => item?.complete));
        return res.status(200).json({ user: allUserLength?.length, dish: allDish?.length, offer: allOffer?.length, admin: allAdmin?.length, feedback: allFeedback?.length, order: dishArray?.length, deliver: completeOrder });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};
export {
    Login,
    Signup,
    GetAllUser,
    GetAllAdmin,
    getDashboardData,
    UpdatePass,
    checkEmail
};