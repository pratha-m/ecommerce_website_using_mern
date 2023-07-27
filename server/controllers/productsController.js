import product from "../models/Product.js";
import {v2 as cloudinary} from "cloudinary";

cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const createProduct=async(req,res)=>{
    try{
        const productImages=req.files.productimage;
        let uploadedUrls=[];
        async function allImagesUpload(){
            for(let i=0;i<productImages.length;i++){
                let url=await eachImageUpload(i); 
                uploadedUrls.push(url);
            }
        }
        async function eachImageUpload(i){
            let result=await cloudinary.uploader.upload(productImages[i].tempFilePath)
            return result.url;
        }
        await allImagesUpload();
        const newProduct=await product.create({
            productname:req.body.productname,  
            productprice:req.body.productprice,  
            productdeal:req.body.productDeal,
            productcompany:req.body.productcompany,  
            heart:" ",
            productimage:uploadedUrls[0],
            productimage1:uploadedUrls[1],
            productimage2:uploadedUrls[2],
            productimage3:uploadedUrls[3],
            productimage4:uploadedUrls[4],
            productcompanylogo:uploadedUrls[5]
        })
        await newProduct.save();
        res.send(newProduct);
    }
    catch(error){
        console.log("error in creating product",error);
    }
}
const getProducts=async(req,res)=>{
    try{
        const products=await product.find();
        res.send(products);
    }
    catch(error){
        console.log("sorry not fetching products ");
        res.send("sorry not fetching products");
    }
}
const getEachProduct=async(req,res)=>{
    try{
         const id=req.body.id;
         const getEachProduct=await product.findById(id)
         res.send(getEachProduct);
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
}
const deleteProduct=async(req,res)=>{
    try{
       const id=req.body.id;
       const deleteProduct=await product.findByIdAndDelete(id);
       res.send(deleteProduct);
    }
    catch(error){
        console.log("error in deleting product");
        res.send(error);
    }
}
const editProduct=async(req,res)=>{
    try{
          const productid=req.body.productid;
          const productname=req.body.productname;
          const productprice=req.body.productprice;
          const updatedProduct=await product.findOneAndUpdate({_id:productid},{$set:{productname:productname,productprice:productprice}},{new:true});
          res.send(updatedProduct);
    }catch(error){
        console.log("error in update product");
        res.send(error);
    }
}
export {createProduct,getProducts,getEachProduct,deleteProduct,editProduct};