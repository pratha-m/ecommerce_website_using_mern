import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import cookieParser from 'cookie-parser';
import connectDB from "./data/database.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import saveForLatterRouter from "./routes/saveForLatterRoutes.js";
import wishlistRouter from "./routes/wishlistRoutes.js";
import userRouter from "./routes/userRoutes.js";
import paymentRouter from "./routes/paymentRoute.js";
import fileUpload from "express-fileupload";
export const app=express();

dotenv.config();

connectDB();

app.use(fileUpload({
    useTempFiles:true
}))
app.set("trust proxy",1)
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({credentials:true}))
app.use(cookieParser())

app.use("",productRouter);
app.use("",cartRouter);
app.use("",saveForLatterRouter);
app.use("",wishlistRouter);
app.use("",userRouter);
app.use("",paymentRouter);

app.listen(3001,()=>{
    console.log(`listeing at port 3001`)
})