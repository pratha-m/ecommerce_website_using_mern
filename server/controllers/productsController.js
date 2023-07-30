import product from "../models/Product.js";
import {v2 as cloudinary} from "cloudinary";

cloudinary.config({ 
    cloud_name:"dxo3geefa", 
    api_key:"696747161855847", 
    api_secret:"fOWgRl6hulZWxWT1o14-F2ZuiOA"
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
        res.status(200).send({success:true,message:"Product Created"});
    }
    catch(error){
        console.log(error)
        res.status(200).send({success:false,message:"error in creating product"});
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

         if(!getEachProduct) return res.status(200).send({success:false,message:"no product found"});

         res.status(200).send({success:true,message:"Product get",product:getEachProduct});
    }
    catch(error){
        res.status(200).send({success:false,message:"erorr in fetch product"});
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
const getFilteredProducts=async(req,res)=>{
    try{
        if(!(req.body.query)) return res.status(200).send({success:true,product:[]});

        const filteredProducts=await product.find({"productname":{"$regex":req.body.query,"$options":"xi"}});

        res.status(200).send({success:true,message:"Filtered",product:filteredProducts});
    }
    catch(error){
        res.status(200).send({success:false,message:"Not Filtered"});        
    }
}

export {createProduct,getProducts,getEachProduct,deleteProduct,editProduct,getFilteredProducts};