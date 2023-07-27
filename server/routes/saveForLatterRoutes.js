import express from "express";
import { 
    removeSaveLaterProduct,
    getSaveForLatterProducts,
    moveSaveLatterProductToCart
} from "../controllers/saveForLatterController.js";
const router=express.Router();

router.get("/getsaveforlaterproduct/:userId",getSaveForLatterProducts);

router.post("/savetocart",moveSaveLatterProductToCart);

router.post("/removesaveforlaterproduct",removeSaveLaterProduct);

export default router;