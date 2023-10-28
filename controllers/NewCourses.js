import getDataUri from "../middleware/DataUri.js";
import NewCourse from "../model/NewCourses.js";
import cloudinary from "cloudinary";
const AddNewCourse = async (req, res) => {
  try {
    const file = req?.file;
    const { expiryDate } = req?.body;
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri?.content);
    if (!expiryDate)
      return res.status(401).json({ message: "Data is missing" });
    const newCourse = {
      image: {
        public_id: myCloud?.public_id,
        url: myCloud?.url,
      },
      expiryDate,
    };
    await NewCourse.create(newCourse);
    return res.status(200).json({ message: "Course Added Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
};
const DeleteCourse = async (req, res) => {
  try {
    const { _id } = req?.body;
    if (!_id) return res.status(401).json({ message: "Data is missing" });
    const findCourse = await NewCourse.findOne({ _id: _id });
    const publicId = findCourse?.image?.public_id;
    await cloudinary?.uploader?.destroy(publicId);
    const removeCourses = await Offer.deleteOne({ _id: _id });
    if (removeCourses) {
      return res.status(200).json({ message: "Courses removed successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
};
const GetAllCourses = async (req, res) => {
  try {
    const AllCourses = await NewCourse.find({});
    if (AllCourses) {
      return res.status(200).json(AllCourses);
    }
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
};
export { AddNewCourse, DeleteCourse, GetAllCourses };
