import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import "./editProducts.css"
import Loader from '../../loader/Loader';
const EditProducts=()=>{
    const [productList,setProductList]=useState([]);
    const [isLoadingEditedProducts,setIsLoadingEditedProducts]=useState(true);

    const getProducts=()=>{
      Axios.get(`${process.env.REACT_APP_BASE_URL}/getproducts`)
      .then((result)=>{
         console.log(result)
         setProductList(result.data.products);
         setIsLoadingEditedProducts(false);
       })
      .catch((error)=>{
          // console.log("error in geting products",error)
          setIsLoadingEditedProducts(false);
       })
    }

    useEffect(()=>{
      getProducts();
    },[])  
    const deleteProduct=(id)=>{
      setIsLoadingEditedProducts(true);
      Axios.post(`${process.env.REACT_APP_BASE_URL}/deleteproduct`,{id:id})
      .then(()=>{
        // console.log("deleted product Successfully")
        getProducts();
      })
      .catch(()=>{
        // console.log("error in deleting product")
        setIsLoadingEditedProducts(false);
      })
    }
    const editProduct=(id,index)=>{
        const productName=document.getElementById(`productName${index}`);
        const showPrice=document.getElementById(`showPrice${index}`);
        // const eachItemImageDiv=document.getElementById(`eachItemImageDiv${index}`);
        // const imageRemoveBtn=document.getElementById(`imageRemoveBtn${index}`)
        // const productImage=document.getElementById(`productImage${index}`);
        // const imageUploadShow=document.getElementById(`imageUploadShow${index}`);
        if(productName.classList.contains("newproduct")){
          // imageRemoveBtn.style.display="flex";
          productName.contentEditable="true"; 
          showPrice.contentEditable="true"; 
          productName.style.border="1px solid blue"
          showPrice.style.border="1px solid blue"
          // eachItemImageDiv.style.border="1px solid blue"
          productName.style.outline="none"
          showPrice.style.outline="none"
          productName.classList.remove("newproduct");
          // eachItemImageDiv.style.outline="none"
          // imageRemoveBtn.addEventListener("click",function(){
          //       productImage.src="";         
          //       imageUploadShow.addEventListener("click",function(){      
          //         const imageUpload=document.getElementById(`imageUpload${index}`)
          //         imageUpload.click();
          //       })
          // })
        }
        else{
          // imageRemoveBtn.style.display="none";
          productName.contentEditable="false"; 
          showPrice.contentEditable="false"; 
          productName.style.border="none"
          showPrice.style.border="none"
          // eachItemImageDiv.style.border="none"
          // imageUploadShow.style.display="none";
          productName.classList.add("newproduct");
          const productNameVal=productName.innerText;
          const productPriceVal=showPrice.innerText;
          Axios.put(`${process.env.REACT_APP_BASE_URL}/editproduct`,{productid:id,productname:productNameVal,productprice:productPriceVal})
          .then((result)=>{
            console.log("Product Updated Successfully")
          })
          .catch(()=>{console.log("eror in updating product")})
        }
    }
  return (
    <div className="productsContainer updatedHeight">
      {isLoadingEditedProducts && <div className='loader-wrapper'><Loader/></div>}
      {!isLoadingEditedProducts && productList.length===0 && <div className='loader-wrapper'>No Products Found</div>}
      {!isLoadingEditedProducts && productList.map((eachProduct,index)=>{
        return(
          <div key={index} style={{ color: "black", textDecoration: "none" }} className="eachItem" >
            <div className="eachItemInnerDiv">
              <div className="eachItemImageDiv" id={`eachItemImageDiv${index}`}>
                <img src={`${eachProduct.productimage}`}   style={{height:"100%",width:"fitContent"}} id={`productImage${index}`} alt="" />
                <div className="imageRemoveBtn" id={`imageRemoveBtn${index}`}>Remove</div>
                <div className="imageUploadBtn" ><input type="file" id={`imageUpload${index}`} /></div>
                <div className="imageUploadShow" id={`imageUploadShow${index}`}>Upload</div>
              </div>
              <div className="eachItemOtherTextDiv">
                <div className="productName newproduct" id={`productName${index}`}>{eachProduct.productname}</div>
                {/* <div div className="stars">
                  <div className="eachStar star1"></div>
                  <div className="eachStar star2"></div>
                  <div className="eachStar star3"></div>
                  <div className="eachStar star4"></div>
                  <div className="eachStar star5"></div>
                </div> */}
                <div className="dealOfTheDayDiv">
                  {(eachProduct.productdeal==="true")?(<div className="dealOfTheDay">Deal Of The Day</div>):null}
                </div>
                <div className="pricesDiv">
                  <div className="showPrice" id={`showPrice${index}`}>{eachProduct.productprice}</div><span>Rs</span>
                  {/* <div className="cutPrice">Rs:1000</div>
                  <div className="savePrice">Save Rs:600</div> */}
                </div>
                {/* <div className="freeDeliveryDiv">Free Delivery</div> */}
              </div>
            </div>
            <div className="eachItemOptionsDiv">
              <button onClick={()=>{deleteProduct(eachProduct._id)}}>Delete</button>
              <button id='editProduct' onClick={()=>{editProduct(eachProduct._id,index)}}>Edit</button>
            </div>
          </div>
        )
      })}
    </div>  
  )
}

export default EditProducts