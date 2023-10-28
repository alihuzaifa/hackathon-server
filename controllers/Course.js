import getDataUri from "../middleware/DataUri.js";
import Course from "../model/Course.js";
import cloudinary from "cloudinary";
const CreateCourse = async (req, res) => {
  try {
    const file = req?.file;
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri?.content);
    const { courseName, courseCategory, discription, price, discount } =
      req?.body;
    if (!courseName || !courseCategory || !discription || !price || !discount)
      return res.status(401).json({ message: "Data is missing" });
    const course = {
      image: {
        public_id: myCloud?.public_id,
        url: myCloud?.url,
      },
      courseName,
      courseCategory,
      discription,
      price,
      discount,
    };
    await Course.create(course);
    return res.status(200).json({ message: "Course Added Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
};
const getCourses = async (req, res) => {
  try {
    const getAllCourses = await Course.find({});
    if (getAllCourses) {
      return res.status(200).json(getAllCourses);
    }
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
};
const deleteCourse = async (req, res) => {
  try {
    const { _id } = req?.body;
    const findCourse = await Course.findOne({ _id });
    const cloudinaryId = findCourse?.image?.public_id;
    const { result } = await cloudinary.uploader.destroy(cloudinaryId);
    if (result == "ok") {
      await Course.deleteOne({ _id });
      return res.status(200).json({ message: "Course Deleted Successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
};
const updateCourse = async (req, res) => {
  if (req?.body?.isUpload == false) {
    try {
      const { courseName, courseCategory, discription, price, discount, _id } =
        req?.body;

      if (
        (!courseName || !courseCategory || !discription || !price || !discount,
        !_id)
      ) {
        return res.status(401).json({ message: "Data is missing" });
      }
      await Course.findByIdAndUpdate(
        _id,
        {
          courseName,
          courseCategory,
          discription,
          price,
          discount,
        },
        { new: true }
      ).exec();
      return res.status(200).json({ message: "Course update successfully" });
    } catch (error) {
      return res.status(500).json({ message: error?.message });
    }
  } else {
    try {
      const file = req?.file;
      const fileUri = getDataUri(file);
      const myCloud = await cloudinary.v2.uploader.upload(fileUri?.content);
      const { courseName, courseCategory, discription, price, discount, _id } =
        req?.body;
      if (
        (!courseName || !courseCategory || !discription || !price || !discount,
        !_id)
      ) {
        return res.status(401).json({ message: "Data is missing" });
      }
      const dindCourseById = await Course.findOne({ _id });
      const public_id = dindCourseById?.image?.public_id;
      const { result } = await cloudinary.uploader.destroy(public_id);
      if (result == "ok") {
        await Course.findByIdAndUpdate(
          _id,
          {
            courseName,
            courseCategory,
            discription,
            price,
            discount,
            image: {
              public_id: myCloud?.public_id,
              url: myCloud?.url,
            },
          },
          { new: true }
        ).exec();
        return res.status(200).json({ message: "Course update successfully" });
      }
    } catch (error) {
      return res.status(500).json({ message: error?.message });
    }
  }
};
const AllCategories = async (req, res) => {
  try {
    const categories = await Course.distinct("courseCategory");
    if (categories) {
      return res.status(200).json(categories);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export { CreateCourse, getCourses, deleteCourse, updateCourse, AllCategories };
