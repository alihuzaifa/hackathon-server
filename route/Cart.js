import express from "express";
import {
    AddtoCart,
    CartItemById,
    allCartItems,
    completeCartItem,
    deleteCartItem
} from "../controllers/Cart.js";
const router = express.Router();
router.post('/addToCart', AddtoCart)
router.get('/getCartItemsById/:id', CartItemById)
router.get('/allOrder', allCartItems)
router.delete('/delete', deleteCartItem)
router.post('/complete', completeCartItem)
export default router;