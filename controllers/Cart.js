import Cart from "../model/Cart.js";
import CompleteOrder from "../model/CompleteOrder.js";
import cloudinary from "cloudinary";

const AddtoCart = async (req, res) => {
    try {
        const { userId, dish, total } = req?.body
        if (!userId || !dish || !total) { return res.status(401).json({ message: "Data is missing" }) }
        const findeUserCart = await Cart.find({ userId });
        if (findeUserCart && findeUserCart[0]) {
            let previousData = findeUserCart[0]?.dish
            for (var i = 0; i < dish?.length; i++) {
                previousData?.push(dish[i])
            }
            await Cart.deleteOne({ userId })
            const CartObj = { userId, dish: previousData, total }
            await Cart.create(CartObj)
            return res.status(200).json({ message: "Order has been recorded" });
        } else {
            const CartObj = { userId, dish, total }
            await Cart.create(CartObj)
            return res.status(200).json({ message: "Order has been recorded" });
        }

    } catch (error) {
        return res.status(500).json({ message: error?.message });
    }
}
const CartItemById = async (req, res) => {
    const id = req?.params?.id
    try {
        const getCartItems = await Cart.find({ userId: id })
        return res.status(200).json(getCartItems)
    } catch (error) {
        return res.status(500).json({ message: error?.message });
    }
}
const allCartItems = async (req, res) => {

    try {
        const getAllCartItems = await Cart.find({})
        return res.status(200).json(getAllCartItems)
    } catch (error) {
        return res.status(500).json({ message: error?.message });
    }
}
const deleteCartItem = async (req, res) => {
    try {
        const { userId, id } = req?.body
        const findCartItem = await Cart.findOne({ userId })
        if (findCartItem) {
            const removeDish = findCartItem?.dish?.filter((e) => e?.id != id);
            const deleteDish = findCartItem?.dish?.filter((e) => e?.id == id);
            const cloudinaryId = deleteDish[0]?.Image?.public_id
            const { result } = await cloudinary.uploader.destroy(cloudinaryId)
            if (result == "ok") {
                const total = removeDish?.reduce((acc, { price }) => acc + price, 0);
                findCartItem.total = total;
                findCartItem.dish = removeDish
                await findCartItem.save();
                return res.status(200).json({ message: 'Deleted Successfully' });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error?.message });
    }
}
const completeCartItem = async (req, res) => {
    try {
        const { userId, id } = req?.body
        const findCartItem = await Cart.findOne({ userId })
        if (findCartItem) {
            const removeDish = findCartItem?.dish?.filter((e) => e?.id != id);
            const pushData = findCartItem?.dish?.filter((e) => e?.id == id);
            const updateStatus = {
                Image: pushData[0]?.Image,
                discription: pushData[0]?.discription,
                id: pushData[0]?.id,
                name: pushData[0]?.name,
                orderStatus: 'Delivered',
                price: pushData[0]?.price,
                quantity: pushData[0]?.quantity,
                userId: pushData[0]?.userId,
                _id: pushData[0]?._id,

            }
            const total = removeDish?.reduce((acc, { price }) => acc + price, 0);
            findCartItem.total = total;
            findCartItem.dish = removeDish
            const findUserCompleteOrder = await CompleteOrder.findOne({ userId })
            if (findUserCompleteOrder) {
                const previousOrder = findUserCompleteOrder.complete;
                previousOrder?.push(updateStatus)
                findUserCompleteOrder.complete = previousOrder
                await findUserCompleteOrder.save()
                await findCartItem.save();
                return res.status(200).json({ message: 'Delivered Successfully', data: updateStatus });
            }
            else {
                const obj = { userId, complete: [updateStatus] }
                await CompleteOrder.create(obj)
                await findCartItem.save();
                return res.status(200).json({ message: 'Delivered Successfully' });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error?.message });
    }
}
export { AddtoCart, CartItemById, allCartItems, deleteCartItem, completeCartItem }