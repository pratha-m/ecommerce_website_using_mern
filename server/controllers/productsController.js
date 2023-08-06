import product from "../models/Product.js";
import {v2 as cloudinary} from "cloudinary";

const createProduct=async(req,res)=>{
    try{
        cloudinary.config({ 
            cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
            api_key:process.env.CLOUDINARY_API_KEY, 
            api_secret:process.env.CLOUDINARY_API_SECRET
        });
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
            productcategory:req.body.productcategory,  
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

        const brands=[...new Set(products.map((product)=>product.productcompany.toLowerCase()))];

        const prices=products.map(product=>parseInt(product.productprice))

        const categories=[...new Set(products.map(product=>product.productcategory))];

        res.send({
            success:true,
            products:products,
            brands:brands,
            prices:{min:Math.min(...prices),max:Math.max(...prices)},
            categories:categories
        });
    }
    catch(error){
        console.log("sorry not fetching products ");
        res.send({success:false,message:"sorry not fetching products"});
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
        let {searchquery,price,brands,categories}=req.body;

        let totalProducts=await product.find();

        let filteredProducts=totalProducts;

        if(searchquery){
            filteredProducts=filteredProducts.filter(product=>product.productname.toLowerCase().includes(searchquery.toLowerCase()));
        }
        if(price){
            filteredProducts=filteredProducts.filter(product=>product.productprice<=parseInt(price))
        }
        if(brands && brands.length!=0){
            brands=brands.map((eachBrand)=>{
                return eachBrand.toLowerCase();
            })
            let filterBrand=function(product){
              return brands.includes(product.productcompany.toLowerCase());
            }
            filteredProducts=filteredProducts.filter(filterBrand)
        }
        if(categories && categories.length!=0){
            categories=categories.map((eachCategory)=>{
                return eachCategory.toLowerCase();
            })
            let filterCategory=function(product){
              return categories.includes(product.productcategory.toLowerCase());
            }
            filteredProducts=filteredProducts.filter(filterCategory);
        }

        res.status(200).send({success:true,message:"Filtered",product:filteredProducts});
    }
    catch(error){
        res.status(200).send({success:false,message:"Not Filtered",error:error.message});        
    }
}

export {createProduct,getProducts,getEachProduct,deleteProduct,editProduct,getFilteredProducts};