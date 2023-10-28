import mongoose from "mongoose";
const CousreSchema = new mongoose.Schema(
  {
    courseName: { type: String, required: true },
    courseCategory: { type: String, required: true },
    discription: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: String, required: true },
    image: {
      public_id: String,
      url: String,
    },
    instructor: { type: String },
  },
  { timestamps: true }
);
const Course = mongoose.model("Course", CousreSchema);
export default Course;
