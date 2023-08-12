import React, { useEffect, useState } from 'react'
import Axios from "axios"
import "../cartPage/cartPage.css"
import "./wishlist.css"
// import Loader from '../loader/Loader'
import WishlistSkeleton from '../skeletons/WishlistSkeleton'
const WIshlist = ({userId,changeNo,setChangeNo}) => {
  const [isLoadingWishlists,setIsLoadingWishlists]=useState(true);
  const [wishlistProducts,setWishlistProducts]=useState([]);
  const [useEffectNo,setUseEffectNo]=useState(0);

  const deleteWishlistProduct=(id)=>{
    setIsLoadingWishlists(true);
    Axios.post(`${process.env.REACT_APP_BASE_URL}/removewishlistproduct`,{userId,wishlistProductId:id})
    .then((result)=>{
      setIsLoadingWishlists(false);
      setChangeNo(changeNo+1);
      setUseEffectNo(useEffectNo+1);
    })
    .catch(()=>{
      setIsLoadingWishlists(false);
      console.log("Eror in remove");
    }) 
  }

  useEffect(()=>{
      getWishlistProducts();
  },[useEffectNo]);

  const getWishlistProducts=()=>{
    setIsLoadingWishlists(true);
    Axios.get(`${process.env.REACT_APP_BASE_URL}/getallwishlistproducts/${userId}`)
    .then((result)=>{
      setWishlistProducts(result.data.wishlist);
      setIsLoadingWishlists(false);
    })
    .catch((error)=>{
      setIsLoadingWishlists(false);
    });
  }

  return (
    <div className="cartProductsContainer">
       <div className="shopping-cart">
      {/* <!-- Title --> */}
      <div className="title">
        Wishlist
      </div>
      {isLoadingWishlists && 
      <>
        <WishlistSkeleton/>
        <WishlistSkeleton/>
        <WishlistSkeleton/>
        <WishlistSkeleton/>
        <WishlistSkeleton/>
      </>}
      {!isLoadingWishlists && wishlistProducts.length === 0 && <div className='loader-wrapper'>No Wishlists Products</div>}
      {!isLoadingWishlists && wishlistProducts.map((eachWishlistProduct,index) => {
        return (
          <div className="item" key={index}>
            <div className="buttons">
              <span className="delete-btn" onClick={()=>{deleteWishlistProduct(eachWishlistProduct.product)}}></span>
            </div>
            <div className="image">
              <img src={`${eachWishlistProduct.image}`}  alt="" />
            </div>
            <div className="description">
              <span className='span'>{eachWishlistProduct.name}</span>
            </div>
            <div className="total-price">Rs.{eachWishlistProduct.price}</div>
          </div>
        )
      })}
       </div> 
    </div>
  )
}
export default WIshlist