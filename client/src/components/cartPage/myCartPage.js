  // <div className="cartPage">
    //   <div className="cartPageContainer">
    //         <div className="shoppingCartProductsAndPlaceOrderBtn">
    //         <div className="shoppingCartProducts">
    //       {isLoadingCart && <div>Loading...</div>}    
    //       {!isLoadingCart && cartProductList.length===0 && <div>Your Cart is Empty</div>}
    //       {!isLoadingCart && cartProductList.map((eachCartProduct,index)=>{
    //         return(
    //           <div key={index} className="cartProductContainer">
    //         <div className="imageAndStaticText">
    //           <div className="imageContainer">
    //             <img src={`${eachCartProduct.productimage}`} alt="not found" className="productImage"/>
    //           </div>
    //           <div className="productDetailsTextContainer">
    //             <div className="productName">{eachCartProduct.productname}</div>
    //             <div className="productOtherDetails"></div>
    //             <div className="productPrice">₹{eachCartProduct.productprice}</div>
    //           </div>
    //         </div>
    //         <div className="cartProductAllButtons">
    //           <div className="increaseAndDecreaseProducts">
    //             <div className="minusBtnDiv"><button className="minusBtn" onClick={()=>{decreaseQuantity(eachCartProduct._id,index)}}  id={`minusBtn${index}`}><img src="images/minus.png" alt=""/></button></div>
    //             <div className="noOfProductsInputDiv"><input type="number"  min={1} max={10} defaultValue={eachCartProduct.productquantity} className="noOfProductInput" id={`noOfProductInput${index}`}/></div>
    //             <div className="plusBtnDiv"><button className="plusBtn" onClick={()=>{increaseQuantity(eachCartProduct._id,index)}} id={`plusBtn${index}`}><img src="images/plus.png" alt=""/></button></div>
    //             {/* onChange={(event)=>{setQuantityValue(event.target.value)}} */}
    //           </div>
    //           <div className="saveForLaterAndRemoveBtns">
    //             <div className="saveForLatter" onClick={()=>{addToSaveForLater(eachCartProduct._id,eachCartProduct.productname,eachCartProduct.productimage,eachCartProduct.productprice,eachCartProduct.productquantity)}}>Save For Later</div>
    //             <div className="Remove" onClick={()=>{removeCartProduct(eachCartProduct._id)}}>REMOVE</div>
    //           </div>
    //         </div>
    //           </div>
    //       )})}
    //         </div>
    //         <div className="placeOrderBtnDiv"><button>PLACEORDER</button></div>
    //         </div>
    //         <div className="billDetails"></div>        
    //   </div>  
    //   <div className="gapContainer"></div>
    //   <div className="shoppingCartProductsNew">
    //       {isLoadingSavedLater && <div>Loading...</div>}    
    //       {!isLoadingSavedLater && saveForLatterProductList.length===0 && <div>No Products In Save For Latter</div>} 
    //       {!isLoadingSavedLater && saveForLatterProductList.map((saveLatterProduct,newindex)=>{
    //         return(
    //           <div key={newindex} className="cartProductContainer">
    //         <div className="imageAndStaticText">
    //           <div className="imageContainer">
    //             <img src={`${saveLatterProduct.productimage}`} alt="not found" className="productImage"/>
    //           </div>
    //           <div className="productDetailsTextContainer">
    //             <div className="productName">{saveLatterProduct.productname}</div>
    //             <div className="productOtherDetails"></div>
    //             <div className="productPrice">₹{saveLatterProduct.productprice}</div>
    //           </div>
    //         </div>
    //         <div className="cartProductAllButtons">
    //           <div className="increaseAndDecreaseProducts">
    //             <div className="minusBtnDiv"><button className="minusBtn" style={{backgroundColor:"#d2d2d1"}} disabled><img src="images/minus.png" alt=""/></button></div>
    //             <div className="noOfProductsInputDiv"><input type="number" value={saveLatterProduct.productquantity} disabled  className="noOfProductInput" id={`noOfProductInput${newindex}`}/></div>
    //             <div className="plusBtnDiv"><button className="plusBtn" style={{backgroundColor:"#d2d2d1"}} disabled><img src="images/plus.png" alt=""/></button></div>
    //             {/* onChange={(event)=>{setQuantityValue(event.target.value)}} */}
    //           </div>
    //           <div className="saveForLaterAndRemoveBtns">
    //             <div className="saveForLatter" onClick={()=>{addToCartSavedProduct(saveLatterProduct._id,saveLatterProduct.productname,saveLatterProduct.productprice,saveLatterProduct.productimage,saveLatterProduct.productquantity)}} >ADD TO CART</div>
    //             <div className="Remove" onClick={()=>{removeSaveLaterProduct(saveLatterProduct._id)}} >REMOVE</div>
    //           </div>
    //         </div>
    //           </div>
    //       )})}
    //   </div>
    // </div>


//     import React, { useEffect, useState } from 'react'
// import "./cartPage.css"
// import Axios from "axios"
// import Loader from '../loader/Loader';
// const CartPage=()=>{
//   const [cartProductList,setCartProductList]=useState([]);
//   const [isLoadingCart,setIsLoadingCart]=useState(true);
//   const [quantity,setQuantity]=useState(1);
//   const [saveForLatterProductList,setSaveForLatterProductList]=useState([]);
//   const [isLoadingSavedLater,setIsLoadingSavedLater]=useState(true);
//   const [totalPrice,setTotalPrice]=useState(0);
  
//   // const [quantityValue,setQuantityValue]=useState();
//   const getRequest=()=>{
//     setIsLoadingCart(true);
//     Axios.get("http://localhost:3001/getcartproducts")
//     .then((result)=>{
//       setCartProductList(result.data)
//       setIsLoadingCart(false);
//       let priceSum=0;
//       for(let i=0;i<result.data.length;i++){
//         let productPrice=(result.data)[i].productprice;
//         let productQuantity=(result.data)[i].productquantity;
//         priceSum=priceSum+productPrice*productQuantity;
//       }
//       setTotalPrice(priceSum);
//     })
//     .catch(()=>{
//       console.log("error in fetching cart products")
//       setIsLoadingCart(false);
//     })
//   }
//   const saveForLatterGetRequest=()=>{
//      setIsLoadingSavedLater(true)
//      Axios.get("http://localhost:3001/getsaveforlaterproduct")
//      .then((result)=>{
//       // console.log(result.data)
//       setSaveForLatterProductList(result.data)
//       setIsLoadingSavedLater(false);
//     })
//      .catch(()=>{
//       console.log("errror in fetching save for latter products")
//       setIsLoadingSavedLater(false);
//     })
//   }
//   useEffect(()=>{
//     getRequest();
//     saveForLatterGetRequest();
//   },[])
//   const increaseQuantity=(id,index)=>{
//     const quantityInput=document.getElementById(`noOfProductInput${index}`);
//     quantityInput.stepUp();
//     Axios.put("http://localhost:3001/updatecart",{quatityvalue:quantityInput.value,id:id})
//     .then(()=>getRequest())
//     .catch(()=>console.log("Eror in increase"));
//   }
//   const decreaseQuantity=(id,index)=>{
//     const quantityInput=document.getElementById(`noOfProductInput${index}`);
//     quantityInput.stepDown();
//     Axios.put("http://localhost:3001/updatecart",{quatityvalue:quantityInput.value,id:id})
//     .then(()=>{
//       getRequest()
//     })
//     .catch(()=>console.log("Eror"));
//   }
//   const removeCartProduct=(id)=>{
//     setIsLoadingCart(true);
//     Axios.post("http://localhost:3001/removecartproduct",{id:id})
//     .then(()=>{getRequest()})
//     .catch((e)=>{console.log("Error In Deleting Cart Product")})
//   }
//   const addToSaveForLater=(id,name,image,price,quantity)=>{
//     setIsLoadingSavedLater(true);
//     Axios.post("http://localhost:3001/addsaveforlaterproduct",{id:id,productname:name,productimage:image,productprice:price,productquantity:quantity})
//     .then(()=>{
//       removeCartProduct(id);
//       saveForLatterGetRequest();
//       getRequest();
//     })
//     .catch(()=>{console.log("error in add to savelater product")})
//   }
//   const removeSaveLaterProduct=(id)=>{
//      setIsLoadingSavedLater(true);
//      Axios.post("http://localhost:3001/removesaveforlaterproduct",{id:id})
//      .then(()=>{
//       saveForLatterGetRequest();
//       getRequest();
//      })
//      .catch(()=>{console.log("error in removing product from save later")})
//   }
//   // window.addEventListener("blur",function(){
//   //     saveForLatterGetRequest();
//   //     getRequest();
//   // })
//   const addToCartSavedProduct=(id,name,price,image,quantity)=>{
//       Axios.post("http://localhost:3001/addtocart",{id:id,productname:name,productprice:price,productimage:image,productquantity:quantity})     
//       .then(()=>{
//         removeSaveLaterProduct(id);
//       })
//       .catch(()=>{console.log("erreor in adding product from save later to cart")})
//   }
//   return (
//     <div className="cartProductsContainer">
//     {/*  SHOPPING CART PRODUCTS  */}
//     <div className="shopping-cart">
//       {/* <!-- Title --> */}
//       <div className="title">
//         Shopping Cart
//       </div>
//       {isLoadingCart && <div className='loader-wrapper'><Loader/></div>}    
//       {!isLoadingCart && cartProductList.length===0 && <div className='loader-wrapper'>Your Cart is Empty</div>}
//       {!isLoadingCart && cartProductList.map((eachCartProduct,index)=>{
//         return (
//           <div className="item" key={index}>
//             <div className="buttons">
//               <span className="delete-btn" onClick={()=>{removeCartProduct(eachCartProduct._id)}}></span>
//               <span className="like-btn" onClick={()=>{addToSaveForLater(eachCartProduct._id,eachCartProduct.productname,eachCartProduct.productimage,eachCartProduct.productprice,eachCartProduct.productquantity)}}></span>
//             </div>
//             <div className="image">
//               <img src={`${eachCartProduct.productimage}`} alt="" />
//             </div>
//             <div className="description">
//               <span>{eachCartProduct.productname}</span>
//             </div>
//             <div className="quantity">
//               <button className="plus-btn" onClick={()=>{increaseQuantity(eachCartProduct._id,index)}} id={`plusBtn${index}`} type="button" name="button">
//                 <img src="/images/plus.png" alt="" />
//               </button>
//               <input type="number" name="name" min={1} defaultValue={eachCartProduct.productquantity} id={`noOfProductInput${index}`}  disabled/>
//               <button className="minus-btn" type="button" onClick={()=>{decreaseQuantity(eachCartProduct._id,index)}}  id={`minusBtn${index}`} name="button">
//                 <img src="/images/minus.png" alt="" />
//               </button>
//             </div>
//             <div className="total-price">Rs.{eachCartProduct.productprice}</div>
//           </div>
//         )
//       })} 
//       <div className="title totalPrice">
//         Total : Rs.{totalPrice}
//       </div>
//       <div className="title checkoutDiv">
//         <button>Checkout</button>
//       </div>
//     </div>
    // {/* SAVE FOR LATTER PRODUCTS */}
    // <div className="shopping-cart">
    //   {/* <!-- Title --> */}
    //   <div className="title">
    //     Saved For Latter
    //   </div>
    //   {isLoadingSavedLater && <div className='loader-wrapper'><Loader/></div>}    
    //   {!isLoadingSavedLater && saveForLatterProductList.length===0 && <div className='loader-wrapper'>No Save For Latter Products</div>}
    //   {!isLoadingSavedLater && saveForLatterProductList.map((eachCartProduct,index)=>{
    //     return (
    //       <div className="item" key={index}>
    //         <div className="buttons">
    //           <span className="delete-btn" onClick={()=>{removeSaveLaterProduct(eachCartProduct._id)}}></span>
    //           <span className="like-btn move-to-cart" onClick={()=>{addToCartSavedProduct(eachCartProduct._id,eachCartProduct.productname,eachCartProduct.productprice,eachCartProduct.productimage,eachCartProduct.productquantity)}}></span>
    //         </div>
    //         <div className="image">
    //           <img src={`${eachCartProduct.productimage}`} alt="" />
    //         </div>
    //         <div className="description">
    //           <span>{eachCartProduct.productname}</span>
    //         </div>
    //         <div className="quantity">
    //           <button className="plus-btn" type="button" name="button" disabled>
    //             <img src="/images/plus.png" alt="" />
    //           </button>
    //           <input type="number" name="name" min={1} defaultValue={eachCartProduct.productquantity} id={`noOfProductInput${index}`}  disabled/>
    //           <button className="minus-btn" type="button" disabled name="button">
    //             <img src="/images/minus.png" alt="" />
    //           </button>
    //         </div>
    //         <div className="total-price">Rs.{eachCartProduct.productprice}</div>
    //       </div>
    //     )
    //   })} 
    //   {/* <div className="title totalPrice">
    //     Total : Rs.{totalPrice}
    //   </div> */}
    // </div> 
//   </div>  
//   )
// }

// export default CartPage

