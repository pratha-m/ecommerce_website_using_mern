// import React, { useEffect,useState } from 'react'
// import "./eachProductPage.css"
// import { useLocation,useNavigate} from 'react-router-dom';
// import Axios from "axios"
// import {toast} from "react-toastify";

// const EachProductPage = ({isLoggedIn,userId,errorToast,successToast,changeNo,setChangeNo,name,email}) => {
//     const [productQuantity,setProductQuantity]=useState(1)
//     const location = useLocation();
//     const productData=location.state;

//     // managing product pictures 
//     useEffect(()=>{
//         let productImage=document.getElementById("myimage");
//         let galleryImg1Div=document.getElementById("galleryImg1Div");
//         let galleryImg2Div=document.getElementById("galleryImg2Div");
//         let galleryImg3Div=document.getElementById("galleryImg3Div");
//         let galleryImg4Div=document.getElementById("galleryImg4Div");
//         let galleryImg5Div=document.getElementById("galleryImg5Div");
//         let galleryImg1=document.getElementById("galleryImg1")
//         let galleryImg2=document.getElementById("galleryImg2")
//         let galleryImg3=document.getElementById("galleryImg3")
//         let galleryImg4=document.getElementById("galleryImg4")
//         let galleryImg5=document.getElementById("galleryImg5")
//         let result=document.getElementById("myresult");
//         galleryImg1Div.addEventListener("mouseover",function(){
//             productImage.src=galleryImg1.src;
//             result.style.backgroundImage = "url('" + productImage.src + "')";
//         })
//         galleryImg2Div.addEventListener("mouseover",function(){
//             productImage.src=galleryImg2.src;
//             result.style.backgroundImage = "url('" + productImage.src + "')";
//         })
//         galleryImg3Div.addEventListener("mouseover",function(){
//             productImage.src=galleryImg3.src;
//             result.style.backgroundImage = "url('" + productImage.src + "')";
//         })
//         galleryImg4Div.addEventListener("mouseover",function(){
//             productImage.src=galleryImg4.src;
//             result.style.backgroundImage = "url('" + productImage.src + "')";
//         })
//         galleryImg5Div.addEventListener("mouseover",function(){
//             productImage.src=galleryImg5.src;
//             result.style.backgroundImage = "url('" + productImage.src + "')";
//         })
//     })
//     const [productList,setProductList]=useState([]);
//     const navigate=useNavigate();
//     useEffect(()=>{
//        Axios.get("http://localhost:3001/getproducts")
//        .then((result)=>{
//         setProductList(result.data);
//       },[])
//        .catch((error)=>{console.log("error in geting products",error)})
//     })
//     const handleClick=(id)=>{
//       console.log(id)
//       Axios.post(`http://localhost:3001/geteachproduct`,{id:id})
//       .then((result)=>{
//         navigate("/eachproductpage",{state:result.data})
//       })
//       .catch((error)=>{console.log("error in getting product",error)})
//     }
//     const addToCart=(event,id)=>{
//         if(isLoggedIn){
//           event.target.disabled=true;
//           event.target.style.backgroundColor="#a9a9aa"
//           Axios.post("http://localhost:3001/addtocart",{userId,productId:id,quantity:1})     
//           .then((result)=>{
//               if(result.data.success){
//                 setChangeNo(changeNo+1);
//                 successToast("Product Added To cart successfully")
//                 event.target.disabled=false;
//                 event.target.style.backgroundColor="green"
//               }
//               else{
//                 errorToast("Product Already in cart")
//                 event.target.disabled=false;
//                 event.target.style.backgroundColor="green"
//               }
//           })
//           .catch(()=>{
//             errorToast("Error In adding Product To Cart")
//             event.target.disabled=false;
//             event.target.style.backgroundColor="green";
//           })
//         }
//         else{
//           errorToast("Pls Login First");
//         }
//     }
//     // const addToCart=(event,id,productname,productprice,productimage)=>{
//     //     if(isLoggedIn){
//     //       event.target.disabled=true;
//     //       event.target.style.backgroundColor="#a9a9aa"
//     //       Axios.post("http://localhost:3001/addtocart",{id:id,productname:productname,productprice:productprice,productimage:productimage,productquantity:productQuantity})     
//     //       .then(()=>{
//     //           Axios.get("http://localhost:3001/getcartproducts")
//     //           .then((result)=>{
//     //              event.target.disabled=false;
//     //              event.target.style.backgroundColor="green"
//     //              document.getElementById("cartNo").innerText=result.data.length
//     //              successToast("Product Added To Cart !")
//     //           })
//     //           .catch(()=>{
//     //             errorToast("Error In adding Product To Cart")
//     //             event.target.disabled=false;
//     //             event.target.style.backgroundColor="green"
//     //           })
//     //       })
//     //       .catch(()=>{
//     //         errorToast("Error In adding Product To Cart")
//     //         event.target.disabled=false;
//     //         event.target.style.backgroundColor="green";
//     //       })
//     //     }
//     //     else{
//     //       errorToast("Pls Login First")
//     //     }
//     // }
//     const buyNow=async(event,productprice)=>{
//       if(isLoggedIn){
//         event.target.disabled=true;
//         event.target.style.backgroundColor="#a9a9aa"
//         const response=await Axios.get(`http://localhost:3001/order/${productprice*100}`);
//         const {data}=response;
//         const {success}=data;
//         if(success){ 
//           const {id,amount,currency}=data.order;
//           var options = {
//               "key":"rzp_test_snWSRYhCKfQNs4",
//               "amount":amount,
//               "currency":currency,
//               "name":"Ecommerce Website",
//               "description":"This is very authenticated ecommerce site",
//               "image":"https://static.vecteezy.com/system/resources/previews/016/016/817/non_2x/ecommerce-logo-free-png.png",
//               "order_id":id,
//               "handler":function(response){
//                    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=response;
//                    Axios.post("http://localhost:3001/verifypayment",{
//                     razorpayPaymentId:razorpay_payment_id,
//                     razorpayOrderId:razorpay_order_id,
//                     razorpaySignature:razorpay_signature
//                   }).then((res)=>{
//                     const {data}=res;
//                     if(data.success){
//                       successToast(data.message);
//                       event.target.disabled=false;
//                       event.target.style.backgroundColor="green"
//                     }
//                     else{
//                       errorToast(data.message);
//                       event.target.disabled=false;
//                       event.target.style.backgroundColor="green"
//                     }
//                   })
//                   .catch((err)=>{
//                     errorToast("Sorry Error in verifying Payment");
//                     event.target.disabled=false;
//                     event.target.style.backgroundColor="green"
//                   })
//               },
//               "prefill": {
//                   "name":name,
//                   "email":email
//               },
//               "notes": {
//                   "address": "Rajpura town punjab"
//               },
//               "theme": {
//                   "color": "#3399cc"
//               }
//           };
//           const rzp1=new window.Razorpay(options);
//           rzp1.on('payment.failed', function (response){
//             errorToast("Sorry Payment Failed");
//             event.target.disabled=false;
//             event.target.style.backgroundColor="green"
//           });
//           rzp1.open();
//         }
//         else{
//           errorToast("Sorry Error In Creating Order")
//           event.target.disabled=false;
//           event.target.style.backgroundColor="green"
//         }
//       }
//       else{
//         errorToast("Pls Login First")
//       }
//     }

//     return (
//     <div>
//     <div className="productAndItsInfoContainer">
//         <div className="productContainer">
//             <div className="productImageAndGallery">
//                 <div className="productGallery">
//                     <div className="eachImagePositionContainer" id="galleryImg1Div"><img id="galleryImg1" src={`${productData.productimage}`} alt="..."/></div>
//                     <div className="eachImagePositionContainer" id="galleryImg2Div"><img id="galleryImg2" src={`${productData.productimage1}`} alt="..."/></div>
//                     <div className="eachImagePositionContainer" id="galleryImg3Div"><img id="galleryImg3" src={`${productData.productimage2}`} alt="..."/></div>
//                     <div className="eachImagePositionContainer" id="galleryImg4Div"><img id="galleryImg4" src={`${productData.productimage3}`} alt="..."/></div>
//                     <div className="eachImagePositionContainer" id="galleryImg5Div"><img id="galleryImg5" src={`${productData.productimage4}`} alt="..."/></div>
//                 </div>
//                 <div className="productImage img-zoom-container" id="productImageDiv" >
//                     {/* <img  id="myimage" alt="..." /> */}
//                     {/* <div id="myresult" className="img-zoom-result"></div>     */}
                    
//                     <div className="img-zoom-container" id='imgZoomContainer' style={{"height":"100%"}}>
//                      <img src={`${productData.productimage}`} id="myimage" style={{"height":"100%","width":"100%"}} alt=""/>
//                      <div id="myresult" className="img-zoom-result hideZommer"></div>
//                    </div>
//                 </div>
//             </div>
//             <div className="buyAndAddToCartButtonContainer">
//                 <div className="buttonContainer"><button className="buyNowButton button" onClick={(e)=>{buyNow(e,productData.productprice)}}>Buy Now</button></div>
//                 <div className="buttonContainer"><button  onClick={(e)=>{addToCart(e,productData._id,productData)}} className="addToCartButton button">Add To Cart</button></div>
//             </div>
//         </div>
//         <div className="productInfoContainer">
//             <div className="infoProductCompany">{productData.productcompany}</div>
//             <div className="infoProductName">{productData.productname}</div>
//             <div className="infoProductPrice">Rs {productData.productprice}</div>
//             <div className="infoProductCompanyLogo"><img src={`${productData.productcompanylogo}`} alt="" /></div>
           
//             <div className="infoProductDeliveryDetails">
//                 {/* <div className="noOfItemsAndTextDiv">
//                     <div className="noOfItemsText">Products :</div>
//                     <div className="noOfItemsDiv"><input  type="number" min={1} defaultValue="1" max={10} onChange={(event)=>{setProductQuantity(event.target.value)}} className="noOfItemsInput"/></div>
//                 </div> */}
               
//             </div>
//         </div>
//     </div>
//     {/* {{!-- related products container starts --}} */}
//     <div className="relatedProductsContainer">
//     <div>
//       <div className='relatedProductsHead'>Related Products</div>
//       <div className="productsContainer">
//         {productList.map((eachProduct,index)=>{
//           return( 
//             <div key={index} onClick={()=>{handleClick(eachProduct._id)}} style={{ color: "black", textDecoration: "none",display:`${(eachProduct._id===productData._id)?"none":"flex"}` }} className="eachItem">
//               <div className="eachItemInnerDiv">
//                 <div className="eachItemImageDiv"><img src={`${eachProduct.productimage}`}  style={{height:"100%",width:"fitContent"}} alt="" /></div>
//                 <div className="eachItemOtherTextDiv">
//                   <div className="productName">{eachProduct.productname}</div>
//                   {/* <div div className="stars">
//                     <div className="eachStar star1"></div>
//                     <div className="eachStar star2"></div>
//                     <div className="eachStar star3"></div>
//                     <div className="eachStar star4"></div>
//                     <div className="eachStar star5"></div>
//                   </div> */}
//                   <div className="dealOfTheDayDiv">
//                     {(eachProduct.productdeal==="true")?(<div className="dealOfTheDay">Deal Of The Day</div>):null}
//                   </div>
//                   <div className="pricesDiv">
//                     <div className="showPrice">{eachProduct.productprice}Rs</div>
//                     {/* <div className="cutPrice">Rs:1000</div>
//                     <div className="savePrice">Save Rs:600</div> */}
//                   </div>
//                   {/* <div className="freeDeliveryDiv">Free Delivery</div> */}
//                 </div>
//               </div>
//             </div> 
//           )
//         })}
//       <div className="gapContainer"></div>
//     </div>
//     </div>
//     </div>
//     {/* {{!-- related products container starts --}} */}
//     </div>
//   )
// }

// export default EachProductPage








{/* {{!-- related products container starts --}} */}
<div className="relatedProductsContainer">
<div>
  <div className='relatedProductsHead'>Related Products</div>
  <div className="productsContainer">
    {productList.map((eachProduct,index)=>{
      return( 
        <div key={index} onClick={()=>{handleClick(eachProduct._id)}} style={{ color: "black", textDecoration: "none",display:`${(eachProduct._id===productData._id)?"none":"flex"}` }} className="eachItem">
          <div className="eachItemInnerDiv">
            <div className="eachItemImageDiv"><img src={`${eachProduct.productimage}`}  style={{height:"90%",width:"fitContent"}} alt="" /></div>
            <div className="eachItemOtherTextDiv">
              <div className="productName">{eachProduct.productname}</div>
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
                <div className="showPrice">{eachProduct.productprice}Rs</div>
                {/* <div className="cutPrice">Rs:1000</div>
                <div className="savePrice">Save Rs:600</div> */}
              </div>
              {/* <div className="freeDeliveryDiv">Free Delivery</div> */}
            </div>
          </div>
        </div> 
      )
    })}
  <div className="gapContainer"></div>
</div>
</div>
</div>
{/* {{!-- related products container starts --}} */}