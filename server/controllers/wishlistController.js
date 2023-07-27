import product from "../models/Product.js";
import student from "../models/studentData.js";

const addToWishlist=async(req,res)=>{
    try{
        const {userId,productId}=req.body;  

        const userFind=await student.findById(userId);   
      
        const productFind=await product.findById(productId);

        if(!productFind) return res.status(200).send({success:false,message:"Product Not Found"});  
      
        if(!userFind) return res.status(200).send({success:false,message:"User Not Found"});  

        const existingWishlistItem=userFind.wishlist.find(item=>item.product.toString()===productId)

        if(existingWishlistItem) return res.status(200).send({success:false,message:"Product Already in wishlist"});

        const {productprice,productname,productimage}=productFind;

        userFind.wishlist.push({
            product:productId,
            price:productprice,
            name:productname,
            image:productimage
        });

        await userFind.save();

        res.status(200).send({success:true,message:"Product Added To Wishlist",wishlist:userFind.wishlist});
    }
    catch(error){
        res.status(200).send({success:false,message:"Error in Adding Product To wishlist"});
    }
}
const removeWishlistProduct=async(req,res)=>{
    try{
        const {userId,wishlistProductId}=req.body;

        const userFind=await student.findById(userId);   

        if(!userFind) return res.status(200).send({success:false,message:"User Not Found"});  

        const wishlistItemIndex=userFind.wishlist.findIndex(item=>item.product.toString()===wishlistProductId);

        if(wishlistItemIndex==-1) return res.status(200).send({success:false,message:"This product is not in wishlist"});        

        userFind.wishlist.splice(wishlistItemIndex,1);

        await userFind.save();

        res.status(200).send({success:true,message:"Product Removed From Wishlist",wishlist:userFind.wishlist});
    }
    catch(error){
        res.status(200).send({success:false,message:"Error in Removing Product From wishlist"});
    }
}
const getAllWishlistProducts=async(req,res)=>{
    try{
        const {userId}=req.params;

        const userFind=await student.findById(userId);  

        if(!userFind) return res.status(200).send({success:false,message:"User Not Found"}); 

        res.status(200).send({success:true,message:"get all wishlist products",wishlist:userFind.wishlist});
    }
    catch(error){
        res.status(200).send({success:false,message:"Error in Getting all wishlist products",error:error.message});
    }
}

export {
    addToWishlist,
    removeWishlistProduct,
    getAllWishlistProducts
};