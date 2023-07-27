import student from "../models/studentData.js";
import product from "../models/Product.js";
const addToCart=async(req,res)=>{
       try{ 
           const {userId,productId,quantity}=req.body; 

           const userFind=await student.findById(userId);   

           const productFind=await product.findById(productId);

           if(!userFind)  return res.status(200).send({success:false,message:"User Not Found"});  

           if(!productFind) return res.status(200).send({success:false,message:"Product Not Found"});

           if(quantity>productFind.availablequantity) return res.status(200).send({success:false,message:"Decrease The Quantity"});

           const {productprice,productname,productimage}=productFind;

           const existingCartItem=userFind.cart.find(item=>item.product.toString()===productId)

           if(existingCartItem) return res.status(200).send({success:false,message:"Product Already in cart"});

           userFind.cart.push({
            product:productId,
            quantity:quantity,
            initialprice:productprice,
            price:(quantity*productprice),
            image:productimage,
            name:productname
           });

           await userFind.save();

           res.status(200).send({success:true,message:"Product Added To Card Successfully",cart:userFind.cart});
       }
       catch(error){
           res.status(200).send({success:false,message:error.message})
       }
}
// const addToCart=async(req,res)=>{
//         try{
//             const id=req.body.id;
//             const productname=req.body.productname;
//             const productprice=req.body.productprice;
//             const productimage=req.body.productimage;
//             const productquantity=req.body.productquantity;
//             const findDocumentId=await cartProduct.findById(id);
//             if(findDocumentId==null){
//                     const newCartProduct=new cartProduct({
//                     productname:productname,
//                     productprice:productprice,
//                     productimage:productimage,
//                     productquantity:productquantity,
//                     _id:id
//                 })
//                 const cartProductCreated=await newCartProduct.save();
//                 res.send(cartProductCreated)  
//             }
//             else{
//                 console.log("this product is already in cart");
//                 res.send();
//             }
//         }
//         catch(error){
//             console.log(error);
//             res.send("error in adding product to cart");
//         }
// }
const getCartProducts=async(req,res)=>{
        try{
            const userFind=await student.findById(req.params.userId);

            if(!userFind) return res.status(200).send({success:false,message:"Login First"});

            res.status(200).send({success:true,message:"fetched cart products",cart:userFind.cart});
        }
        catch(error){
            res.status(200).send({success:false,message:"Error in fetching cart products"});
        }
}
const updateCartProduct=async(req,res)=>{
    try{
       const {cartQuatity,cartProductId,userId}=req.body;

       const userFind=await student.findById(userId);

       if(!userFind) return res.status(200).send({success:false,message:"Login First"});

       const existingCartItem=userFind.cart.find(item=>item.product.toString()===cartProductId)

       if(!existingCartItem) return res.status(200).send({success:false,message:"Product is Not in Cart"});
       
       existingCartItem.quantity=cartQuatity;

       existingCartItem.price=cartQuatity*(existingCartItem.initialprice);

       await userFind.save();
       
       res.send({success:true,message:"Cart Updated Successfully",cart:userFind.cart});
    }catch(error){
        res.status(200).send({success:false,message:"Error in Updating cart Item",error:error.message});
    }
}
const removeCartProduct=async(req,res)=>{
    try{
        const {cartProductId,userId}=req.body;

        const userFind=await student.findById(userId);

        if(!userFind) return res.status(200).send({success:false,message:"Login First"});

        const cartItemIndex=userFind.cart.findIndex(item=>item.product.toString()===cartProductId);

        if(cartItemIndex==-1) return res.status(200).send({success:false,message:"This product is not in cart"});        

        userFind.cart.splice(cartItemIndex,1);

        await userFind.save();

        res.send({success:true,message:"cart item deleted Successfully",cart:userFind.cart});
    }
    catch(error){
        return res.status(200).send({success:false,message:"Error in deleting Product From Cart"});
    }
}
const moveCartProductToSaveLatter=async(req,res)=>{
    try{
        const {cartProductId,userId}=req.body;
    
        const userFind=await student.findById(userId);
    
        if(!userFind) return res.status(200).send({success:false,message:"Login First"});
    
        const existingCartItem=userFind.cart.find(item=>item.product.toString()===cartProductId)
    
        if(!existingCartItem) return res.status(200).send({success:false,message:"Product is Not in Cart"});
    
        const cartItemIndex=userFind.cart.findIndex(item=>item.product.toString()===cartProductId);
    
        if(cartItemIndex==-1) return res.status(200).send({success:false,message:"This product is not in cart"});        
    
        userFind.saveforlater.push(existingCartItem);
    
        userFind.cart.splice(cartItemIndex,1);
    
        await userFind.save();
    
        res.status(200).send({success:true,message:"cart item move to save for latter",cart:userFind.cart});
    }
    catch(error){
        return res.status(200).send({success:false,message:"Error in move item from cart to save for latter"});
    }
}
export {addToCart,getCartProducts,updateCartProduct,removeCartProduct,moveCartProductToSaveLatter};