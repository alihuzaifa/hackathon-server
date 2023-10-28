import getDataUri from "../middleware/DataUri.js";
import Dish from "../model/Dish.js";
import cloudinary from "cloudinary";
const CreateDish = async (req, res) => {
    try {
        const file = req?.file;
        const fileUri = getDataUri(file);
        const myCloud = await cloudinary.v2.uploader.upload(fileUri?.content);
        const { name, category, discription, price, discount } = req?.body;
        if (!name || !category || !discription || !price || !discount)
            return res.status(401).json({ message: "Data is missing" });
        const newDish = {
            image: {
                public_id: myCloud?.public_id,
                url: myCloud?.url,
            },
            name,
            category,
            discription,
            price,
            discount,
        };
        await Dish.create(newDish);
        return res.status(200).json({ message: "Dish Added Successfully" });
    } catch (error) {
        return res.status(500).json({ message: error?.message });
    }
};
const getDish = async (req, res) => {
    try {
        const getAllDishes = await Dish.find({});
        if (getAllDishes) {
            return res.status(200).json(getAllDishes);
        }
    } catch (error) {
        return res.status(500).json({ message: error?.message });
    }
};
const deleteDish = async (req, res) => {
    try {
        const { _id } = req?.body;
        const findDish = await Dish.findOne({ _id })
        const cloudinaryId = findDish?.image?.public_id
        const { result } = await cloudinary.uploader.destroy(cloudinaryId)
        if (result == "ok") {
            await Dish.deleteOne({ _id });
            return res.status(200).json({ message: "Dish Deleted Successfully" });
        }
    } catch (error) {
        return res.status(500).json({ message: error?.message });
    }
};
const UpdateDish = async (req, res) => {
    if (req?.body?.isUpload == false) {
        try {
            const { name, category, discription, price, discount, _id } = req?.body;

            if ((!name || !category || !discription || !price || !discount, !_id)) {
                return res.status(401).json({ message: "Data is missing" });
            }
            await Dish.findByIdAndUpdate(
                _id,
                {
                    name,
                    category,
                    discription,
                    price,
                    discount,
                },
                { new: true }
            ).exec();
            return res.status(200).json({ message: "Dish update successfully" });
        } catch (error) {
            return res.status(500).json({ message: error?.message });
        }
    } else {
        try {
            const file = req?.file
            const fileUri = getDataUri(file);
            const myCloud = await cloudinary.v2.uploader.upload(fileUri?.content);
            const { name, category, discription, price, discount, _id } = req?.body;
            if ((!name || !category || !discription || !price || !discount, !_id)) {
                return res.status(401).json({ message: "Data is missing" });
            }
            const findDishId = await Dish.findOne({ _id })
            const public_id = findDishId?.image?.public_id
            const { result } = await cloudinary.uploader.destroy(public_id)
            if (result == "ok") {
                await Dish.findByIdAndUpdate(
                    _id,
                    {
                        name,
                        category,
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
                return res.status(200).json({ message: "Dish update successfully" });
            }
        } catch (error) {
            return res.status(500).json({ message: error?.message });
        }
    }

};
const AllCategories = async (req, res) => {
    try {
        const categories = await Dish.distinct("category");
        if (categories) {
            return res.status(200).json(categories);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
export {
    CreateDish,
    getDish,
    deleteDish,
    UpdateDish,
    AllCategories
};