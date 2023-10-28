import mongoose from "mongoose";
const completeItemSchema = new mongoose.Schema({
    Image: {
        public_id: String,
        url: String
    },
    name: String,
    quantity: Number,
    price: Number,
    userId: String,
    id: String,
    description: String,
    orderStatus: String
});
const completeSchema = new mongoose.Schema({
    userId: String,
    complete: [completeItemSchema] 
});

const CompleteOrder = mongoose.model('completeOrder', completeSchema);
export default CompleteOrder
