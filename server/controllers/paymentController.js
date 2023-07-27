import Razorpay from "razorpay";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";

const payment=async(req,res)=>{
    const {amount}=req.params;

    var instance = new Razorpay({ key_id:process.env.RAZORPAY_KEY_ID, key_secret:process.env.RAZORPAY_KEY_SECRET})

    instance.orders.create({
      amount: amount,
      currency: "INR",
      receipt: "receipt#1"
    },function(err,order){
      if(err){
        res.send({success:false,message:"Erorr in creating order",error:err})
      }
      else{
        res.send({success:true,message:"Order created",order:order})
      }
    })
}

const verifyPayment=async(req,res)=>{
  try{
    const {razorpayPaymentId,razorpayOrderId,razorpaySignature}=req.body;

    var instance=new Razorpay({key_id:process.env.RAZORPAY_KEY_ID,key_secret:process.env.RAZORPAY_KEY_SECRET})   

    const isSignatureValid=validatePaymentVerification({"order_id": razorpayOrderId, "payment_id": razorpayPaymentId },razorpaySignature,process.env.RAZORPAY_KEY_SECRET);

    if(!isSignatureValid) res.send({success:false,message:"Erorr in Verifying Payment"});  

    res.status(200).send({success:true,message:"Payment Verified successfully"});
  }
  catch(error){
    res.status(200).send({success:true,message:"Payment Not verified successfully"}); 
  }
}
  
export {payment,verifyPayment};
