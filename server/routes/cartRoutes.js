import express from "express";
import { addToCart, getCartProducts, moveCartProductToSaveLatter, removeCartProduct, updateCartProduct } from "../controllers/cartControllers.js";
const router=express.Router();

router.post("/addtocart",addToCart);

router.get("/getcartproducts/:userId",getCartProducts);

router.put("/updatecart",updateCartProduct);

router.post("/removecartproduct",removeCartProduct);

router.post("/carttosave",moveCartProductToSaveLatter)

export default router;