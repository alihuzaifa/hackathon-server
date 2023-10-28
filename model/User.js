import mongoose from "mongoose";
const dishCartSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number,
    image: String,
});

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max: 100,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max: 50,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        role: {
            type: String,
            enum: ["user", "admin", "superadmin"],
            default: "user",
        },
        token: {
            type: String,
        },
        // image: {
        //     public_id: String,
        //     url: String,
        // },
        cart: [dishCartSchema],
    }, { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;