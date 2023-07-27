import mongoose from "mongoose";

const otpSchema=new mongoose.Schema({
    _id:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"student"
    },
    otpvalue:{
        type:String
    },
    createdAt:{
       type:Date,        
       default:Date.now
    },
})
otpSchema.index({createdAt:1},{expireAfterSeconds:60});

const Otp=new mongoose.model("Otp",otpSchema);

export default Otp;