import express from "express";
import {  payment,verifyPayment } from "../controllers/paymentController.js";
const router=express.Router();

router.get("/order/:amount",payment);

router.post("/verifypayment",verifyPayment)

export default router;