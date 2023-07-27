import {otpGenerator} from "./features.js"
import Otp from "../models/Otp.js";
import nodemailer from "nodemailer";

export const sendMail=async(req,res,next)=>{ 
    let otp=otpGenerator();

    const otpFind=await Otp.findById(req.user._id);

    if(otpFind) await Otp.findByIdAndDelete(req.user._id);

    await Otp.create({_id:req.user._id,otpvalue:otp}); 
    
    let transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
          user:process.env.FROM_EMAIL,
          pass:process.env.FROM_EMAIL_PASSWORD
        }
    })

    let mailOptions={
        from:process.env.FROM_EMAIL,
        to:req.user.email,
        subject:"Forgot Password ",
        html:`Otp to Forgot Password is : <b>${otp}</b>`
    }

    await transporter.sendMail(mailOptions);

    res.status(200).json({success:true,message:"Email Sent successfully"});
}