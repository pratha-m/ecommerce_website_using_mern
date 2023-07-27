import express from "express";
import { addToWishlist, 
    getAllWishlistProducts,
    removeWishlistProduct
} from "../controllers/wishlistController.js";
const router=express.Router();

router.post("/addtowishlist",addToWishlist);

router.post("/removewishlistproduct",removeWishlistProduct);

router.get("/getallwishlistproducts/:userId",getAllWishlistProducts);

export default router;