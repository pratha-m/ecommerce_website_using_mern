import student from "../models/studentData.js";

const userExists=async(req,res,next)=>{
    try{
        const {email}=req.body;
    
        let user=await student.findOne({email});
    
        if(!user) return res.status(200).send({success:false,message:"User Does not Exists"});
    
        req.user=user;
    
        next();
    }
    catch(error){
        res.status(200).send({success:false,message:"Error in verifying user"});
    }
}

export {userExists};