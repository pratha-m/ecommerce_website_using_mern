import express from "express";
const router=express.Router();
import {createProduct, deleteProduct, editProduct, getEachProduct, getFilteredProducts, getProducts} from "../controllers/productsController.js";

router.post("/createproduct",createProduct);

router.get("/getproducts",getProducts);

router.post("/geteachproduct",getEachProduct);

router.post("/deleteproduct",deleteProduct);

router.put("/editproduct",editProduct);

router.post("/filterproducts",getFilteredProducts)

export default router;