import React, { useState } from 'react'
import Axios from "axios"
const CreateProduct = () => {  
  const [productImage,setProductImage]=useState("");
  const [productImage1,setProductImage1]=useState("");
  const [productImage2,setProductImage2]=useState("");
  const [productImage3,setProductImage3]=useState("");
  const [productImage4,setProductImage4]=useState("");
  const [productCompanyLogo,setProductCompanyLogo]=useState("");
  const [productName,setProductName]=useState("");
  const [productDeal,setProductDeal]=useState("false");
  const [productPrice,setProductPrice]=useState("");
  const [productCompany,setProductCompany]=useState("");
  const [productCategory,setProductCategory]=useState("");


  const fileSelectedHandler=(event)=>{
    setProductImage(event.target.files[0])
  }
  const fileSelectedHandler1=(event)=>{
    setProductImage1(event.target.files[0])
  }
  const fileSelectedHandler2=(event)=>{
    setProductImage2(event.target.files[0])
  }
  const fileSelectedHandler3=(event)=>{
    setProductImage3(event.target.files[0])
  }
  const fileSelectedHandler4=(event)=>{
    setProductImage4(event.target.files[0])
  }
  const fileSelectedHandler5=(event)=>{
    setProductCompanyLogo(event.target.files[0])
  }
  const manageProductDeal=()=>{
     if(productDeal==="false"){
       setProductDeal("true");
      }
     else if(productDeal==="true"){
       setProductDeal("false");
     }
  }
  const createNewProduct=(event)=>{
     let createProductBtn=document.getElementById("createProductBtn");
     createProductBtn.disabled=true;
     createProductBtn.innerText="Creating...."
     event.preventDefault();
     const formData=new FormData();
     formData.append("productimage",productImage)
     formData.append("productimage",productImage1)
     formData.append("productimage",productImage2)
     formData.append("productimage",productImage3)
     formData.append("productimage",productImage4)
     formData.append("productimage",productCompanyLogo)
     formData.append("productname",productName)
     formData.append("productprice",productPrice)
     formData.append("productDeal",productDeal)
     formData.append("productcompany",productCompany)
     formData.append("productcategory",productCategory)
     Axios({
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/createproduct`,
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
     })
    .then((result)=>{
      const {data}=result;
      const {success}=data;
      if(success){
        console.log("Product Created")
        createProductBtn.disabled=false;
        createProductBtn.innerText="Create Product";
      }
      else{
        console.log(data.message)
        createProductBtn.disabled=false;
        createProductBtn.innerText="Create Product";
      }
    })
    .catch((error)=>{
      console.log("error in creating product",error)
      createProductBtn.disabled=false;
      createProductBtn.innerText="Create Product";
    }) 
  }
  return (
    <form  onSubmit={createNewProduct} method="POST" action={`${process.env.REACT_APP_BASE_URL}/createproduct`} encType='multipart/form-data' style={{minHeight:"65vh"}}>
        <label>Select Front Product Image : </label><input type="file" name='productimage' onChange={fileSelectedHandler} />
        <br/><br/>
        <label>Select Product Image1 : </label><input type="file" name='productimage1' onChange={fileSelectedHandler1} alt="" />
        <br/><br/>
        <label>Select Product Image2 : </label><input type="file" name='productimage2'  onChange={fileSelectedHandler2} alt="" />
        <br/><br/>
        <label>Select Product Image3 : </label><input type="file" name='productimage3' onChange={fileSelectedHandler3} alt="" />
        <br/><br/>
        <label>Select Product Image4 : </label><input type="file" name='productimage4' onChange={fileSelectedHandler4} alt="" />
        <br/><br/>
        <label>Company Logo : </label><input type="file" name='productcompanylogo' onChange={fileSelectedHandler5} alt="" />
        <br/><br/>
        <label>Enter Product Name : </label><input type="text" name="productname" onChange={(event)=>{setProductName(event.target.value)}} />
        <br/><br/>
        <label>Enter Product Price : </label><input type="number" name="productprice" onChange={(event)=>{setProductPrice(event.target.value)}}/>
        <br/><br/>
        <label>Enter Product Company Name : </label><input type="text" name="productcompany" onChange={(event)=>{setProductCompany(event.target.value)}} />
        <br/><br/>
        <label>Enter Product Category Name : </label><input type="text" name="productcategory" onChange={(event)=>{setProductCategory(event.target.value)}} required/>
        <br/><br/>
        <label>Product Deal Of The Day : </label><input type="checkbox" name="productdeal" onClick={manageProductDeal}/>
        <br/><br/>
        <button type='submit' id="createProductBtn">Create Product</button>
    </form>
  )
}

export default CreateProduct