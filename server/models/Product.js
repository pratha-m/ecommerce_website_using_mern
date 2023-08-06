import mongoose from "mongoose";
const productsSchema=new mongoose.Schema({
    productimage:{
        type:String
    },
    productimage1:{
        type:String
    },
    productimage2:{
        type:String
    },
    productimage3:{
        type:String
    },
    productimage4:{
        type:String
    },
    productcompanylogo:{
        type:String
    },
    productname:{
        type:String
    },
    productprice:{
        type:Number
    },
    productdeal:{
        type:String
    },
    productcompany:{
        type:String
    },    
    productcategory:{
         type:String,
         default:"mobile"
    },
    availablequantity:{
        type:Number,
        default:10
    }
})
const product=new mongoose.model("product",productsSchema)
export default product;