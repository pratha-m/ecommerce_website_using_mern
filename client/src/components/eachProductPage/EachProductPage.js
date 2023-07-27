import React, { useEffect,useState } from 'react'
import "./eachProductPage.css"
import { useLocation,useNavigate} from 'react-router-dom';
import Axios from "axios"
// import {toast} from "react-toastify";

const EachProductPage = ({isLoggedIn,userId,errorToast,successToast,changeNo,setChangeNo,name,email}) => {

    // const [productQuantity,setProductQuantity]=useState(1)
    const location = useLocation();
    const productData=location.state;

    // managing product pictures 
    // useEffect(()=>{
    //     let productImage=document.getElementById("myimage");
    //     let galleryImg1Div=document.getElementById("galleryImg1Div");
    //     let galleryImg2Div=document.getElementById("galleryImg2Div");
    //     let galleryImg3Div=document.getElementById("galleryImg3Div");
    //     let galleryImg4Div=document.getElementById("galleryImg4Div");
    //     let galleryImg5Div=document.getElementById("galleryImg5Div");
    //     let galleryImg1=document.getElementById("galleryImg1")
    //     let galleryImg2=document.getElementById("galleryImg2")
    //     let galleryImg3=document.getElementById("galleryImg3")
    //     let galleryImg4=document.getElementById("galleryImg4")
    //     let galleryImg5=document.getElementById("galleryImg5")
    //     let result=document.getElementById("myresult");
    //     galleryImg1Div.addEventListener("mouseover",function(){
    //         productImage.src=galleryImg1.src;
    //         result.style.backgroundImage = "url('" + productImage.src + "')";
    //     })
    //     galleryImg2Div.addEventListener("mouseover",function(){
    //         productImage.src=galleryImg2.src;
    //         result.style.backgroundImage = "url('" + productImage.src + "')";
    //     })
    //     galleryImg3Div.addEventListener("mouseover",function(){
    //         productImage.src=galleryImg3.src;
    //         result.style.backgroundImage = "url('" + productImage.src + "')";
    //     })
    //     galleryImg4Div.addEventListener("mouseover",function(){
    //         productImage.src=galleryImg4.src;
    //         result.style.backgroundImage = "url('" + productImage.src + "')";
    //     })
    //     galleryImg5Div.addEventListener("mouseover",function(){
    //         productImage.src=galleryImg5.src;
    //         result.style.backgroundImage = "url('" + productImage.src + "')";
    //     })
    // })
    const [productList,setProductList]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
       Axios.get(`${process.env.REACT_APP_BASE_URL}/getproducts`)
       .then((result)=>{
        setProductList(result.data);
      },[])
       .catch((error)=>{console.log("error in geting products",error)})
       const imgitems=document.querySelectorAll(".img-select .img-item");
       let imgShowcase=document.getElementById("img-showcase");
       // console.log(imgitems)
       imgitems.forEach((imgItem,index)=>{
           imgItem.addEventListener("click",function(){
             imgShowcase.style.transform=`translateX(${-379*index}px)`
           })
       })
    })
    const handleClick=(id)=>{
      console.log(id)
      Axios.post(`${process.env.REACT_APP_BASE_URL}/geteachproduct`,{id:id})
      .then((result)=>{
        navigate("/eachproductpage",{state:result.data})
      })
      .catch((error)=>{console.log("error in getting product",error)})
    }
    const addToCart=(event,id)=>{
        if(isLoggedIn){
          event.target.disabled=true;
          event.target.style.backgroundColor="#a9a9aa"
          Axios.post(`${process.env.REACT_APP_BASE_URL}/addtocart`,{userId,productId:id,quantity:1})     
          .then((result)=>{
              if(result.data.success){
                setChangeNo(changeNo+1);
                successToast("Product Added To cart successfully")
                event.target.disabled=false;
                event.target.style.backgroundColor="green"
              }
              else{
                errorToast("Product Already in cart")
                event.target.disabled=false;
                event.target.style.backgroundColor="green"
              }
          })
          .catch(()=>{
            errorToast("Error In adding Product To Cart")
            event.target.disabled=false;
            event.target.style.backgroundColor="green";
          })
        }
        else{
          errorToast("Pls Login First");
        }
    }
    const buyNow=async(event,productprice)=>{
      if(isLoggedIn){
        event.target.disabled=true;
        event.target.style.backgroundColor="#a9a9aa"
        const response=await Axios.get(`${process.env.REACT_APP_BASE_URL}/order/${productprice*100}`);
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
                      successToast(data.message);
                      event.target.disabled=false;
                      event.target.style.backgroundColor="orange"
                    }
                    else{
                      errorToast(data.message);
                      event.target.disabled=false;
                      event.target.style.backgroundColor="orange"
                    }
                  })
                  .catch((err)=>{
                    errorToast("Sorry Error in verifying Payment");
                    event.target.disabled=false;
                    event.target.style.backgroundColor="orange"
                  })
              },
              "prefill": {
                  "name":name,
                  "email":email
              },
              "notes": {
                  "address": "Rajpura town punjab"
              },
              "theme": {
                  "color": "#3399cc"
              }
          };
          const rzp1=new window.Razorpay(options);
          rzp1.on('payment.failed', function (response){
            errorToast("Sorry Payment Failed");
            event.target.disabled=false;
            event.target.style.backgroundColor="orange"
          });
          rzp1.open();
        }
        else{
          errorToast("Sorry Error In Creating Order")
          event.target.disabled=false;
          event.target.style.backgroundColor="orange"
        }
      }
      else{
        errorToast("Pls Login First")
      }
      event.target.disabled=false;
      event.target.style.backgroundColor="orange"
    }
   
//     window.onload=()=>{
//       const imgs = document.querySelectorAll('.img-select div');
//       const imgBtns = [...imgs];
//       let imgId = 1;       

//       imgBtns.forEach((imgItem) => {
//         imgItem.addEventListener('click', (event) => {
//              console.log(imgItem);
//                event.preventDefault();
//                imgId = imgItem.dataset.id;
//                slideImage();
//       });
// });

// function slideImage(){
//     const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
//     document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
// }

// window.addEventListener('resize', slideImage);
// }

//     transform: translateX(-379px);

    return (
    <div>
       <div className= "card-wrapper">
      <div className= "card">
        <div className= "product-imgs">
          <div className= "img-display">
            <div className= "img-showcase" id='img-showcase'>
              <img src ={productData.productimage} alt = "shoe imge"/>
              <img src ={productData.productimage1} alt = "shoe imge"/>
              <img src ={productData.productimage2} alt = "shoe imge"/>
              <img src ={productData.productimage3} alt = "shoe imge"/>
            </div>
          </div>
          <div className= "img-select">
            <div className= "img-item">
                <img src = {productData.productimage} alt = "shoe imag"/>
            </div>
            <div className= "img-item">
                <img src = {productData.productimage1} alt = "shoe imae"/>
            </div>
            <div className= "img-item">
                <img src = {productData.productimage2} alt = "shoe imae"/>
            </div>
            <div className= "img-item">
                <img src = {productData.productimage3} alt = "shoe imae"/>
            </div>
          </div>
          {/* <div className= "img-select">
            <div className= "img-item">
              <a href="#" data-id = "1">
                <img src = {productData.productimage} alt = "shoe image"/>
              </a>
            </div>
            <div className= "img-item">
              <a href="#" data-id = "2">
                <img src = {productData.productimage1} alt = "shoe image"/>
              </a>
            </div>
            <div className= "img-item">
              <a href="#" data-id = "3">
                <img src = {productData.productimage2} alt = "shoe image"/>
              </a>
            </div>
            <div className= "img-item">
              <a href="#" data-id = "4">
                <img src = {productData.productimage3} alt = "shoe image"/>
              </a>
            </div>
          </div> */}
        </div>
        {/* <!-- card right --> */}
        <div className= "product-content">
          <h2 className= "product-title">{productData.productname}</h2>
          <p href = "#" className="product-link">{productData.productcompany}</p>
          {/* <div className= "product-rating">
            <i className= "fas fa-star"></i>
            <i className= "fas fa-star"></i>
            <i className= "fas fa-star"></i>
            <i className= "fas fa-star"></i>
            <i className= "fas fa-star-half-alt"></i>
            <span>4.7(21)</span>
          </div> */}
          <div className= "product-price">
            {/* <p className= "last-price">Old Price: <span>$257.00</span></p> */}
            <p className= "new-price">Price: <span>Rs.{productData.productprice} </span></p>
          </div>

          <div className= "product-detail">
            {/* <h2>about this item: </h2> */}
            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet veniam tempora fuga tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi ipsa!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p> */}
            <ul>
              {/* <li>Color: <span>Black</span></li> */}
              <li>Available: <span>in stock</span></li>
              <li>Category: <span>Electronics</span></li>
              <li>Shipping Area: <span>All over the world</span></li>
              <li>Shipping Fee: <span>Free</span></li>
            </ul>
          </div>

          <div className= "purchase-info">
            {/* <input type = "number" min = "0" value = "1"/> */}
            <button type = "button" className= "btn" onClick={(e)=>{addToCart(e,productData._id,productData)}}>
              Add to Cart <i className= "fas fa-shopping-cart"></i>
            </button>
            <button type = "button" className= "btn" onClick={(e)=>{buyNow(e,productData.productprice)}}>Buy Now</button>
          </div>

          
        </div>
      </div>
    </div>

    {/* {{!-- related products container starts --}} */}
    <div className="relatedProductsContainer">
    <div>
      <div className='relatedProductsHead'>Related Products</div>
      <div className="productsContainer">
        {productList.map((eachProduct,index)=>{
          return( 
            <div key={index} onClick={()=>{handleClick(eachProduct._id)}} style={{ color: "black", textDecoration: "none",display:`${(eachProduct._id===productData._id)?"none":"flex"}` }} className="eachItem">
              <div className="eachItemInnerDiv">
                <div className="eachItemImageDiv"><img src={`${eachProduct.productimage}`}  style={{height:"100%",width:"fitContent"}} alt="" /></div>
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
    </div>
  )
}

export default EachProductPage