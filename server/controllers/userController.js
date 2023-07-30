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
const getUserProfile=async(req,res,next)=>{
    try{
        const user=await student.findById(req.params.userId);
    
        if(!user) return res.status(200).json({success:false,message:"User Not Found"});

        res.status(200).json({success:true,user:user});
    }
    catch(error){
        res.status(200).json({success:false,message:"Error in getting profile"})
    }
}
const updateUserProfile=async(req,res)=>{
    try{
        const {userId,name,email,password}=req.body;

        const user=await student.findById(userId);
    
        if(!user) return res.status(200).json({success:false,message:"User Not Found"});
    
        user.name=name || user.name;
        user.password=password || user.password;
        user.email=email || user.email;
    
        const updateUser=await user.save();
    
        res.status(200).json({success:true,user:{
            _id:updateUser._id,
            name:updateUser.name,
            email:updateUser.email
        }});
    }
    catch(error){
        res.status(200).json({success:false,message:"Erorr in updating profile"});
    }
}

export {
    createAccount,
    login,
    getUsers,
    verifyToken,
    createAdmin,
    getAdmins,
    checkOtp,
    changePassword,
    getUserProfile,
    updateUserProfile
};