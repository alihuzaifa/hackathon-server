import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default function generateToken(user) {
  const { _id, name, email, role } = user;
  const payload = { _id, name, email, role };
  const options = { expiresIn: "30d" };
  const token = jwt.sign(payload, process.env.SECRET, options);
  return token;
}