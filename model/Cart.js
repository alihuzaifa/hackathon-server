import mongoose from "mongoose";
const cartSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        dish: [
            {
                name: { type: String, required: true },
                Image: {
                    public_id: { type: String, required: true },
                    url: { type: String, required: true },
                },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                userId: { type: String, required: true },
                id: { type: String, required: true },
                discription: { type: String, required: true },
                orderStatus: { type: String, required: true },
            },
        ],
        total: { type: Number, required: true },
    }, { timestamps: true }
);
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
