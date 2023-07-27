import student from "../models/studentData.js";

const getSaveForLatterProducts=async(req,res)=>{
    try{
        const userFind=await student.findById(req.params.userId);

        if(!userFind) return res.status(200).send({success:false,message:"Login First"});

        res.status(200).send({success:true,message:"fetched save for latter products",saveforlater:userFind.saveforlater});
    }
    catch(error){
        res.status(200).send({success:false,message:"Error in fetching save for latter products"});
    }
}
const removeSaveLaterProduct=async(req,res)=>{
    try{
        const {saveLaterProductId,userId}=req.body;

        const userFind=await student.findById(userId);

        if(!userFind) return res.status(200).send({success:false,message:"Login First"});

        const saveLaterItemIndex=userFind.saveforlater.findIndex(item=>item.product.toString()===saveLaterProductId);

        if(saveLaterItemIndex==-1) return res.status(200).send({success:false,message:"This product is not in Saved Later"});        

        userFind.saveforlater.splice(saveLaterItemIndex,1);

        await userFind.save();

        res.send({success:true,message:"save later item deleted Successfully",saveforlater:userFind.saveforlater});
    }
    catch(error){
        return res.status(200).send({success:false,message:"Error in deleting Product From Save Later",error:error.message});
    }
}
const moveSaveLatterProductToCart=async(req,res)=>{
    try{
        const {saveLaterProductId,userId}=req.body;
    
        const userFind=await student.findById(userId);
    
        if(!userFind) return res.status(200).send({success:false,message:"Login First"});
    
        const existingSaveLaterItem=userFind.saveforlater.find(item=>item.product.toString()===saveLaterProductId)
    
        if(!existingSaveLaterItem) return res.status(200).send({success:false,message:"Product is Not in Saved Later"});
    
        const saveLaterItemIndex=userFind.saveforlater.findIndex(item=>item.product.toString()===saveLaterProductId);
    
        if(saveLaterItemIndex==-1) return res.status(200).send({success:false,message:"This product is not in Saved later"});        
    
        userFind.cart.push(existingSaveLaterItem);
    
        userFind.saveforlater.splice(saveLaterItemIndex,1);
    
        await userFind.save();
    
        res.status(200).send({success:true,message:"save later item move to cart",cart:userFind.saveforlater});
    }
    catch(error){
        return res.status(200).send({success:false,message:"Error in move item from save for later to cart for latter"});
    }
}
export {getSaveForLatterProducts,moveSaveLatterProductToCart,removeSaveLaterProduct};
