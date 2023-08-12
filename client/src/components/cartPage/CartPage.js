import React, { useEffect, useState } from 'react'
import "./cartPage.css"
import Axios from "axios"
// import Loader from '../loader/Loader';
// import Skeleton from 'react-loading-skeleton';
import CartSkeletons from '../skeletons/CartSkeletons';

const CartPage=({userId,setCartSize,errorToast,successToast,name,email})=>{
  const [cartProductList,setCartProductList]=useState([]);
  const [isLoadingCart,setIsLoadingCart]=useState(true);
  const [saveForLatterProductList,setSaveForLatterProductList]=useState([]);
  const [isLoadingSavedLater,setIsLoadingSavedLater]=useState(true);
  const [totalPrice,setTotalPrice]=useState(0);

const checkout=async(event)=>{
  if(cartProductList.length!==0){
    event.target.disabled=true;
    event.target.style.backgroundColor="#a9a9aa"
    const response=await Axios.get(`${process.env.REACT_APP_BASE_URL}/order/${totalPrice*100}`);
    const {data}=response;
    const {success}=data;
    if(success){ 
      const {id,amount,currency}=data.order;
      var options = {
          "key":process.env.REACT_APP_RAZORPAY_KEY_ID,
          "amount":amount,
          "currency":currency,
          "name":"Ecommerce Website",
          "description":"This is very authenticated ecommerce site",
          "image":"https://static.vecteezy.com/system/resources/previews/016/016/817/non_2x/ecommerce-logo-free-png.png",
          "order_id":id,
          "handler":function(response){
               const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=response;
               Axios.post(`${process.env.REACT_APP_BASE_URL}/verifypayment`,{
                razorpayPaymentId:razorpay_payment_id,
                razorpayOrderId:razorpay_order_id,
                razorpaySignature:razorpay_signature
              }).then((res)=>{
                const {data}=res;
                if(data.success){
                  // console.log(data.message);
                  successToast(data.message);
                  event.target.disabled=false;
                  event.target.style.backgroundColor="green"
                }
                else{
                  // console.log(data.message);
                  errorToast(data.message)
                  event.target.disabled=false;
                  event.target.style.backgroundColor="green"
                }
              })
              .catch((err)=>{
                // console.log("Eror in verifying")
                errorToast("Error in verifying payment");
                event.target.disabled=false;
                event.target.style.backgroundColor="green"
              })
          },
          "prefill": {
              "name":name,
              "email":email
          },
          "notes": {
              "address": "punjab - india"
          },
          "theme": {
              "color": "#3399cc"
          }
      };
      const rzp1=new window.Razorpay(options);
      rzp1.on('payment.failed', function (response){
        // console.log("Sorry Payment Failed");
        // console.log(response);
        errorToast("Sorry Payment Failed");
        event.target.disabled=false;
        event.target.style.backgroundColor="green"
      });
      rzp1.open();
    }
    else{
      // console.log("Error in Creating Order");
      errorToast("Error in Creating Order");
      event.target.disabled=false;
      event.target.style.backgroundColor="green"
    }
  }
  else{
    errorToast("No products in cart")
  }
}  

  // const [quantityValue,setQuantityValue]=useState();
  const getRequest=()=>{
    setIsLoadingCart(true);
    Axios.get(`${process.env.REACT_APP_BASE_URL}/getcartproducts/${userId}`)
    .then((result)=>{
      setCartProductList(result.data.cart)
      setIsLoadingCart(false);
      setCartSize(result.data.cart.length)
      // console.log(result.data.cart)
      let priceSum=0;
      for(let i=0;i<result.data.cart.length;i++){
        priceSum+=(result.data.cart)[i].price;
      }
      setTotalPrice(priceSum);
    })
    .catch(()=>{
      console.log("error in fetching cart products")
      setIsLoadingCart(false);
    })
  }
  const saveForLatterGetRequest=()=>{
     setIsLoadingSavedLater(true)
     Axios.get(`${process.env.REACT_APP_BASE_URL}/getsaveforlaterproduct/${userId}`)
     .then((result)=>{
      // console.log(result.data.saveforlater)
      setSaveForLatterProductList(result.data.saveforlater)
      setIsLoadingSavedLater(false);
    })
     .catch(()=>{
      console.log("errror in fetching save for latter products")
      setIsLoadingSavedLater(false);
    })
  }
  useEffect(()=>{
    getRequest();
    saveForLatterGetRequest();
  },[])
  const increaseQuantity=(id,index)=>{
    const quantityInput=document.getElementById(`noOfProductInput${index}`);
    quantityInput.stepUp();
    Axios.put(`${process.env.REACT_APP_BASE_URL}/updatecart`,{cartQuatity:quantityInput.value,cartProductId:id,userId})
    .then((result)=>{
      getRequest()
      successToast("Updating quantity successfully !")
    })
    .catch(()=>{
      errorToast("Error in updating quantity !")
    });
  }
  const decreaseQuantity=(id,index)=>{
    const quantityInput=document.getElementById(`noOfProductInput${index}`);
    quantityInput.stepDown();
    Axios.put(`${process.env.REACT_APP_BASE_URL}/updatecart`,{cartQuatity:quantityInput.value,cartProductId:id,userId})
    .then((result)=>{
      getRequest()
      successToast("Updating quantity successfully !")
    })
    .catch(()=>{
      errorToast("Error in updating quantity !")
    });
  }
  const removeCartProduct=(cartProductId)=>{
    setIsLoadingCart(true);
    Axios.post(`${process.env.REACT_APP_BASE_URL}/removecartproduct`,{cartProductId,userId})
    .then(()=>{
      successToast("Removed cart item Successfully !")
      getRequest()
    })
    .catch((e)=>{
      errorToast("Error in removing cart item !");
    })
  }
  const addToSaveForLater=(id)=>{
    Axios.post(`${process.env.REACT_APP_BASE_URL}/carttosave`,{cartProductId:id,userId})
    .then(()=>{
      getRequest();
      saveForLatterGetRequest();
      successToast("Item Added To Save For Latter !");
    })
     .catch(()=>{
      errorToast("Error in adding item to save for latter !")
    })
  }
  const removeSaveLaterProduct=(id)=>{
    setIsLoadingSavedLater(true);
     Axios.post(`${process.env.REACT_APP_BASE_URL}/removesaveforlaterproduct`,{saveLaterProductId:id,userId})
     .then((result)=>{
      saveForLatterGetRequest();
      setIsLoadingSavedLater(false);
      successToast("Save later Item removed Successfully !")
     })
     .catch(()=>{
      errorToast("Error in removing saved later item !")
      setIsLoadingSavedLater(false);
    })
  }
  const addToCartSavedProduct=(id)=>{
      Axios.post(`${process.env.REACT_APP_BASE_URL}/savetocart`,{saveLaterProductId:id,userId})     
      .then(()=>{
        getRequest()
        saveForLatterGetRequest();
        successToast("save later item moved to cart successfully !");
      })
      .catch(()=>{
        errorToast("error in moving save later product to cart !")
      })
  }
  return (
    <div className="cartProductsContainer">
     <div className="shopping-cart">
       <div className="title">
         Shopping Cart
       </div>
       {isLoadingCart && 
        <>
         <CartSkeletons/><CartSkeletons/><CartSkeletons/><CartSkeletons/><CartSkeletons/>
        </> 
       }    
       {!isLoadingCart && cartProductList.length===0 && <div className='loader-wrapper'>Your Cart is Empty</div>}
       {!isLoadingCart && cartProductList.map((eachCartProduct,index)=>{
         return (
           <div className="item" key={index}>
             <div className="buttons">
               <span className="delete-btn" onClick={()=>{removeCartProduct(eachCartProduct.product)}}></span>
               <span className="like-btn" onClick={()=>{addToSaveForLater(eachCartProduct.product)}}></span>
             </div>
             <div className="image">
               <img src={`${eachCartProduct.image}`} alt="" />
             </div>
           <div className="description">
               <span>{eachCartProduct.name}</span>
             </div>
             <div className="quantity">
               <button className="plus-btn" onClick={()=>{increaseQuantity(eachCartProduct.product,index)}} id={`plusBtn${index}`} type="button" name="button">
                 <img src="/images/plus.png" alt="" />
               </button>
               <input type="number" name="name" min={1} defaultValue={eachCartProduct.quantity} id={`noOfProductInput${index}`}  disabled/>
               <button className="minus-btn" type="button" onClick={()=>{decreaseQuantity(eachCartProduct.product,index)}}  id={`minusBtn${index}`} name="button">
                 <img src="/images/minus.png" alt="" />
               </button>
             </div>
             <div className="total-price">Rs.{eachCartProduct.price}</div>
           </div>
         )
       })} 
       <div className="title totalPrice">
         Total : Rs.{totalPrice}
       </div>
       <div className="title checkoutDiv">
         <button onClick={checkout}>Checkout</button>
       </div>
     </div>
          {/* SAVE FOR LATTER PRODUCTS */}
    <div className="shopping-cart">
      {/* <!-- Title --> */}
      <div className="title">
        Saved For Latter
      </div>
      {isLoadingSavedLater && 
        <>
        <CartSkeletons/><CartSkeletons/><CartSkeletons/><CartSkeletons/><CartSkeletons/>
       </> 
      }    
      {!isLoadingSavedLater && saveForLatterProductList.length===0 && <div className='loader-wrapper'>No Save For Latter Products</div>}
      {!isLoadingSavedLater && saveForLatterProductList.map((eachCartProduct,index)=>{
        return (
          <div className="item" key={index}>
            <div className="buttons">
              <span className="delete-btn" onClick={()=>{removeSaveLaterProduct(eachCartProduct.product)}}></span>
              <span className="like-btn move-to-cart" onClick={()=>{addToCartSavedProduct(eachCartProduct.product)}}></span>
            </div>
            <div className="image">
              <img src={`${eachCartProduct.image}`} alt="" />
            </div>
            <div className="description">
              <span>{eachCartProduct.name}</span>
            </div>
            <div className="quantity">
              <button className="plus-btn" type="button" name="button" disabled>
                <img src="/images/plus.png" alt="" />
              </button>
              <input type="number" name="name" min={1} defaultValue={eachCartProduct.quantity} id={`noOfProductInput${index}`}  disabled/>
              <button className="minus-btn" type="button" disabled name="button">
                <img src="/images/minus.png" alt="" />
              </button>
            </div>
            <div className="total-price">Rs.{eachCartProduct.price}</div>
          </div>
        )
      })} 
      {/* <div className="title totalPrice">
        Total : Rs.{totalPrice}
      </div> */}
    </div>
    </div>  
  )
}

export default CartPage