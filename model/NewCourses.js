import mongoose from "mongoose";
const NewCoursesSchema = new mongoose.Schema(
    {
        image: {
            public_id: String,
            url: String,
        },
        expiryDate: { type: String, required: true },
    }, { timestamps: true }
);
const NewCourses = mongoose.model("NewCourses", NewCoursesSchema);
export default NewCourses;