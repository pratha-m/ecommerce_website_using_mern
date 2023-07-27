//<div className="myWishlistPage">
//<div className="left"></div>
//<div className="center">
//     <div className="myWishlistText">My Wishlist</div>
//     <div className="allMyWishlistsContainer">
//{!isLoadingWishlists && wishlistProducts.length===0 && <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>No Wishlist Products</div>}
//{isLoadingWishlists && <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>Loading...</div>} 
//{!isLoadingWishlists && wishlistProducts && wishlistProducts.map((eachWishlistProduct,index) => {
//return (
//  <div key={index} className="cartProductContainer">
//    <div className="imageAndStaticTextForWishlist">
//      <div className="imageContainer">
//        <img src={`${eachWishlistProduct.productimage}`} alt="not found" className="productImage" />
//      </div>
//      <div className="productDetailsTextContainer">
//        <div className="productName">{eachWishlistProduct.productname}</div>
//        <div className="productOtherDetails"></div>
//        <div className="productPrice">₹{eachWishlistProduct.productprice}</div>
//      </div>
//      <div className="cartProductAllButtonsForWishlist" onClick={()=>{deleteWishlistProduct(eachWishlistProduct._id)}}>
//      </div>
//    </div>
//  </div>
//)
//})}
//     </div> 
//</div>
//<div className="right"></div>
//</div>



// import React, { useEffect, useState } from 'react'
// import Axios from "axios"
// import "../cartPage/cartPage.css"
// import "./wishlist.css"
// import Loader from '../loader/Loader'
// // import "./wishlist.css"
// const WIshlist = ({userId}) => {
//   const [wishlistProducts,setWishlistProducts]=useState([]);
//   const [isLoadingWishlists,setIsLoadingWishlists]=useState(true);
//   const fetchWishlistProducts=()=>{
//     Axios.get(`http://localhost:3001/getallwishlistproducts/${userId}`)
//     .then((result)=>{
//      console.log(result.data); 
//      setIsLoadingWishlists(false);
//    })
//     .catch(()=>{
//       console.log("error in fetching wishlist")
//       setIsLoadingWishlists(false);
//     })
//   }
//   useEffect(()=>{
//       fetchWishlistProducts();
//   },[])
//   const deleteWishlistProduct=(id)=>{
//        setIsLoadingWishlists(true);
//        Axios.post("http://localhost:3001/removewishlistproduct",{userId,wishlistProductId:id,heart:" "})
//        .then(()=>{
//            console.log("deleted succcedde wisdhlist product")
//            fetchWishlistProducts();
//         })
//        .catch(()=>{
//            console.log("error in deleting wishlisyt product")
//            setIsLoadingWishlists(false);
//         })
//   }
//   return (
//     <div className="cartProductsContainer">
//        <div className="shopping-cart">
//       {/* <!-- Title --> */}
//       <div className="title">
//         Wishlist
//       </div>
//       {isLoadingWishlists && <div className='loader-wrapper'><Loader /></div>}
//       {!isLoadingWishlists && wishlistProducts.length === 0 && <div className='loader-wrapper'>No Save For Latter Products</div>}
//       {!isLoadingWishlists && wishlistProducts.map((eachWishlistProduct,index) => {
//         return (
//           <div className="item" key={index}>
//             <div className="buttons">
//               <span className="delete-btn" onClick={()=>{deleteWishlistProduct(eachWishlistProduct.product)}}></span>
//               {/* <span className="like-btn move-to-cart" onClick={() => { addToCartSavedProduct(eachCartProduct._id, eachCartProduct.productname, eachCartProduct.productprice, eachCartProduct.productimage, eachCartProduct.productquantity) }}></span> */}
//             </div>
//             <div className="image">
//               <img src={`${eachWishlistProduct.productimage}`}  alt="" />
//             </div>
//             <div className="description">
//               <span>{eachWishlistProduct.productname}</span>
//             </div>
//             <div className="total-price">Rs.{eachWishlistProduct.productprice}</div>
//           </div>
//         )
//       })}
//        </div> 
//     </div>
//   )
// }
// export default WIshlist