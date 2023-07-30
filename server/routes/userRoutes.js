import express from "express";
import {changePassword,checkOtp,createAccount,createAdmin,getAdmins,getUserProfile,getUsers,login,updateUserProfile,verifyToken} from "../controllers/userController.js";
import {userExists} from "../middlewares/auth.js";
import { sendMail } from "../utils/sendEmail.js";

const router=express.Router();

router.post("/createaccount",createAccount);

router.post("/login",login);

router.post("/getusers",getUsers);

router.post("/verifytoken",verifyToken);

router.post("/createadmin",createAdmin);

router.post("/getadmins",getAdmins);

router.post("/sendemail",userExists,sendMail);

router.post("/checkotp",userExists,checkOtp);   // we have to send email and otp in body from client

router.put("/changepassword",changePassword);// we have to send email and new password in body from client

router.get("/profile/:userId",getUserProfile);

router.put("/profile",updateUserProfile);


export default router;