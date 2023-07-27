import student from "../models/studentData.js";
import { decodeToken, generateToken } from "../utils/manageToken.js";
import bcrypt from "bcryptjs";
import Otp from "../models/Otp.js";

const createAccount=async(request,res)=>{
    try{
        const {name,email,password}=request.body;
        const userFind=await student.findOne({email});
        if(!userFind){
            const registerStudent=new student({
                name:name,
                email:email,
                password:password
            })
            const registered=await registerStudent.save();
            res.status(200).send({success:true,message:"Account Created Successfully",data:generateToken({_id:registered._id})});
        }
        else{
            res.send({success:false,message:"User Already Exists"});
        }
    }
    catch(error){
        res.status(500).send({success:false,message:"Eror in Creating Account"})
    }
}
const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
    
        const findUserByEmail=await student.findOne({email});
    
        if(!findUserByEmail) return res.status(200).send({success:false,message:"User Does not Exists"});
    
        const matchPassword=await bcrypt.compare(password,findUserByEmail.password);
    
        if(!matchPassword) return res.status(200).send({success:false,message:"Wrong Password"});
    
        res.status(200).send({success:true,data:generateToken({_id:findUserByEmail._id})});
    }
    catch(error){
        res.status(200).send({success:false,message:"Error in Logged In User"});
    }
}

const checkOtp=async(req,res,next)=>{
    try{
        const {otp}=req.body;
    
        const otpFind=await Otp.findById(req.user._id);
    
        if(!otpFind) return res.status(200).send({success:false,message:"Otp expired"});
    
        if(otpFind.otpvalue!==otp) return res.status(200).send({success:false,message:"Otp Is Incorrect"});
    
        res.status(200).json({success:true,message:"Otp is correct"});
    }
    catch(error){
        res.status(200).send({success:false,message:"Otp Not verified successfully"});
    }
}
const changePassword=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        
        const user=await student.findOne({email});
    
        if(!user) return res.status(200).send({success:false,message:"User Does not Exists"});
    
        user.password=password || user.password;
    
        await user.save();
    
        res.status(200).json({success:true,message:"Password Changed Successfully",user:generateToken({_id:user._id})});
    }
    catch(error){
        res.status(200).send({success:false,message:"Password Not changed successfully"});
    }
}



// const enterEmailToForgotPassword=async(request,res)=>{
//     const useremail=request.body.email;
//     const documentFindByEmail=await student.findOne({email:useremail});
//     if(documentFindByEmail!=null){
//         console.log("the email is correct");
//         res.send(documentFindByEmail);
//         const otpOnEmail=Math.round(Math.random()*(192356-123457)+123457);
//         const subject=`Forgot password`
//         const html=`<!doctype html>
//         <html lang="en">
//           <head>
//             <meta charset="utf-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1">
//             <title>Bootstrap demo</title>
//             <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
//           </head>
//           <body>
//           <div class="card">
//           <div class="card-body">
//             <h5 class="card-title">Forgot Password</h5>
//             <p class="card-text">Otp to forgot the password is :</p>
//             <button type="button" class="btn btn-primary" style="background-color:green;color:white;border-radius:20px;border:none">${otpOnEmail}</button>
//             </div>
//             </div>
//             <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
//           </body>
//         </html>`
//         let mailTransporter=nodemailer.createTransport({
//             service:"gmail",
//             auth:{
//                 user:process.env.FROM_EMAIL,
//                 pass:process.env.FROM_EMAIL_PASSWORD
//             }
//         })
//         let details={
//             from:process.env.FROM_EMAIL,
//             to:useremail,
//             subject:subject,
//             html:html
//         }   
//         mailTransporter.sendMail(details,(error)=>{
//             if(error){
//                 res.send(error)
//             }
//             else{
//                 console.log("email has send successfully")
//                 app.post("/getotponemail",async(request,res)=>{
//                     const userTypedOtp=request.body.otp;
//                     if(userTypedOtp!=otpOnEmail){
//                         console.log("you entered invalid otp")
//                         res.send({otpPhase:"error"});
//                     }
//                     else{
//                         console.log(useremail)
//                         console.log("otp is correct")
//                         res.send({otpPhase:"success"})
//                         app.put("/createnewpassword",async(request,res)=>{
//                         try{
//                                 let userPassword=request.body.password;
//                                 let hashedUserPassword=await bcrypt.hash(userPassword,10)
//                                 let updateStudentData=await student.findOneAndUpdate({email:useremail},{$set:{password:hashedUserPassword}},{new:true})
//                                 res.send({success:true,user:updateStudentData._id});
//                                 // console.log("updated data :",updateStudentData);
//                             }
//                         catch(error){
//                                 res.send({success:false,message:"sorry password not updated"});
//                             }
//                         })
//                     }
//                 })
//             }
//         })
//     }
//     else{
//         console.log("email not in our database");
//         res.send(null);
//     }
// }
const getUsers=async(req,res)=>{
    try{
        const users=await student.find();
        res.send(users);
    }
    catch(err){
        console.log("error in fetching users :",err);
        res.send(err);
    }
}
const verifyToken=async(req,res)=>{
    try{
        const token=req.body.token;
    
        const decodedToken=decodeToken(token);
    
        const findUserById=await student.findById(decodedToken.data._id);
    
        if(!findUserById) return res.send({success:false,message:"Login First"});
    
        const {admin,name,email}=findUserById;
    
        res.send({success:true,data:{admin,name,email,_id:decodedToken.data._id}});
    }
    catch(error){
        res.status(500).send({success:false,message:"Incorrect Token"})
    }
}
const createAdmin=async(req,res)=>{
    try{
        const {name,email,password}=request.body;
        const userFind=await student.findOne({email});
        if(!userFind){
            const registerStudent=new student({
                name:name,
                email:email,
                password:password,
                admin:true
            })
            const registered=await registerStudent.save();
            res.status(200).send({success:true,message:"Account Created Successfully",data:generateToken({_id:registered._id})});
        }
        else{
            res.status(200).send({success:false,message:"User Already Exists"});
        }
    }
    catch(error){
        res.status(500).send({success:false,message:"Eror in Creating Account"})
    }
}
const getAdmins=async(req,res)=>{
    try{
        const owners=await student.find({admin:true});
        
        res.send(owners);
    }
    catch(error){
        console.log("error in fetching owner");
    }
}



export {createAccount,login,getUsers,verifyToken,createAdmin,getAdmins,checkOtp,changePassword};