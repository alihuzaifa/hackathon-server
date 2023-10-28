import mongoose from "mongoose";
const dishSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    discription: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: String, required: true },
    image: {
      public_id: String,
      url: String,
    },
  }, { timestamps: true }
);
const Dish = mongoose.model("Dish", dishSchema);
export default Dish;