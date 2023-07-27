import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';
const PRoducts = ({userId,isLoggedIn,wishlistProducts,changeNo,setChangeNo}) => {
  const [productList,setProductList]=useState([]);
  const [isLoadingProducts,setIsLoadingProducts]=useState(true); 

  const navigate=useNavigate();
  useEffect(()=>{
     setIsLoadingProducts(true);
     Axios.get(`${process.env.REACT_APP_BASE_URL}/getproducts`)
     .then((result)=>{
         setProductList(result.data)
         setIsLoadingProducts(false);
      })
     .catch((error)=>{
        console.log("error in geting products",error)
        setIsLoadingProducts(false);
      })
  },[])
  const handleClick=(id)=>{
    Axios.post(`${process.env.REACT_APP_BASE_URL}/geteachproduct`,{id:id})
    .then((result)=>{
      navigate("/eachproductpage",{state:result.data})
    })
    .catch((error)=>{console.log("error in getting product",error)})
  }
  const addToWishlist=(e,id)=>{
    if(isLoggedIn){
      e.target.disabled=true;
      Axios.post(`${process.env.REACT_APP_BASE_URL}/addtowishlist`,{userId,productId:id})
      .then((result)=>{
        if(result.data.success){
           e.target.classList.remove("changeToNormalHeart"); 
           e.target.classList.add("changeToRedHeartImage"); 
          setChangeNo(changeNo+1);
        }
        else{
          Axios.post(`${process.env.REACT_APP_BASE_URL}/removewishlistproduct`,{userId,wishlistProductId:id})
          .then((result)=>{
             e.target.classList.remove("changeToRedHeartImage");   
             e.target.classList.add("changeToNormalHeart");
            setChangeNo(changeNo+1);
          })
          .catch(()=>{
            console.log("Eror in remove");
          })
        }
        e.target.disabled=false;
      })
      .catch((error)=>{
        console.log("error add wishlist")
        e.target.disabled=false;
      })
    }
    else{
      console.log("Login First");
    }
  }
  
  const matchWishlistAndProductId=(productId)=>{
       for(let i=0;i<wishlistProducts.length;i++){
          if(wishlistProducts[i].product===productId){
            return true;
          }
       }
       return false;
  }

  // const addToWishlist = (id,index) => {
  //   let addToWishlistBtn=document.getElementById(`addToWishlist${index}`)
  //   if(addToWishlistBtn.classList.contains("changeToNormalHeart")) {
  //     Axios.post("${process.env.REACT_APP_BASE_URL}/addtowishlist", {
  //       userId,
  //       productId:id,
  //       heart:"changeToRedHeartImage"
  //     }).then(() => {
  //       console.log("Add To Wishlist");
  //       Axios.post(`${process.env.REACT_APP_BASE_URL}/geteachwishlistproduct`, {wishlistProductId:id,userId })
  //         .then((result) => {
  //           addToWishlistBtn.classList.remove("changeToNormalHeart");
  //           addToWishlistBtn.classList.add(`${result.data.heart}`);
  //           console.log("change heart color");
  //         })
  //         .catch(() => { console.log("erorr in getting each wishlist product") })
  //     });
  //   }
  //   else {
  //     Axios.post("${process.env.REACT_APP_BASE_URL}/removewishlistproduct",{userId,wishlistProductId:id,heart:" "})
  //     .then((result)=>{
  //       addToWishlistBtn.classList.remove("changeToRedHeartImage");
  //       // addToWishlistBtn.classList.add(`${result.data.heart}`);
  //       addToWishlistBtn.classList.add(`changeToNormalHeart`);
  //     })
  //     .catch(()=>{console.log("error in updating product")})
  //   }
  // }


  return (
    <div>
      <div className="productsContainer">
        {isLoadingProducts && <div className='loader-wrapper'><Loader /></div>}
        {!isLoadingProducts && productList.length===0 && <div className='loader-wrapper'>Sorry No Products Found</div>}
        {!isLoadingProducts && productList.map((eachProduct,index)=>{
          return(
            <div key={index}  style={{ color: "black", textDecoration: "none" }} className="eachItem">
              <div className="eachItemInnerDiv">
                <div className="eachItemImageDiv" onClick={()=>{handleClick(eachProduct._id)}}><img src={`${eachProduct.productimage}`}  style={{height:"100%",width:"fitContent"}} alt="" /></div>
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
                  <div className="freeDeliveryDiv">Free Delivery</div>
                </div>
              </div>
              <div  className={`addToWishlistButtonDiv ${matchWishlistAndProductId(eachProduct._id)?"changeToRedHeartImage":"changeToNormalHeart"}`} id={`addToWishlist${index}`}  onClick={(e)=>{addToWishlist(e,eachProduct._id)}}></div>
              {/* "changeToNormalHeart":"changeToRedHeartImage" */}
            </div>
          )
        })}
      {/* <div className="gapContainer"></div> */}
    </div>
    </div>
)
}

export default PRoducts;