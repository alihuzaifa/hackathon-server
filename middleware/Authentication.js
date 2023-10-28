import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const Authentication = async (req, res, next) => {
    const token = req.body.token;

    if (!token) {
        return res.status(401).json({ message: "Session has been expired" })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ message: "Invalid token." });
    }
};
export default Authentication;
