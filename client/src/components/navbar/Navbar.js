import React, { useState } from 'react'
import "../index.css"
import {Link, useNavigate } from 'react-router-dom'
import Axios from "axios";
import "../searchProducts/searchProducts.css";
// import Skeleton from 'react-loading-skeleton';
// import SearchSkeletons from '../skeletons/SearchSkeletons';

const Navbar = ({isLoggedIn,isAdmin,name,cartSize,wishlistProducts}) => {
  const [productSearchList,setProductSearchList]=useState([]);
  // const [isLoadingSearch,setIsLoadingSearch]=useState(false);
  const navigate=useNavigate();


  const changeSearchQuery=(e)=>{  
      showSearchResults()
      // setIsLoadingSearch(true);
      Axios.post(`${process.env.REACT_APP_BASE_URL}/filterproducts`,{searchquery:e.target.value})
        .then((result)=>{
           const {data}=result;
           const {success}=data;
           if(success){
             setProductSearchList(data.product);
            //  setIsLoadingSearch(false);
           }
         })
        .catch(()=>{
          // setIsLoadingSearch(false);
          console.log("Erorr in fetch")
        })
  }
  const removeSearchResults=()=>{
      let elements=document.querySelectorAll(".searchedItemsContainer");
      elements.forEach((ele)=>{
         ele.style.display="none";
      })
  }
  const showSearchResults=()=>{
    let elements=document.querySelectorAll(".searchedItemsContainer");
    elements.forEach((ele)=>{
       ele.style.display="block";
    })
  }
  const showProductPage=(productId)=>{
    navigate(`/eachproductpage/?product=${productId}`)
    document.querySelector(".searchedItemsContainer").style.display="none";
  }
  
  document.onclick=(event)=>{
    let searchContainerUpper=document.getElementById("searchContainerUpper");
    let lowerNavbar=document.getElementById("lowerNavbar");

    if(getComputedStyle(lowerNavbar).display==="none"){
      const outsideClick=!searchContainerUpper.contains(event.target);
      if(outsideClick){
        document.getElementById("searchedItemsContainer").style.display="none";
      }
    }
    if(getComputedStyle(searchContainerUpper).display==="none"){
      const searchContainerLower=document.getElementById("searchContainerLower");      
      const outsideClick=!searchContainerLower.contains(event.target);
      if(outsideClick){
        removeSearchResults();
      }
    }
  }

  return (
      <div className="navigationContainer">
          <div className="upperNavbar">
              <Link to="/" className='custom-button aTagLogo'><div className="websiteLogoContainer custom-button"></div></Link>
              <div className="searchAndCart">
                  <div className="searchContainerUpper" id='searchContainerUpper' >
                      <div className="searchBar">
                          <div className="searchInputDiv"><input type="text" placeholder='Search Products' className="searchInput" onChange={changeSearchQuery} onFocus={showSearchResults}/></div>
                          <div className="searchIconContainer"><img style={{height:"50%"}} src="/images/search.png" alt=""/></div>
                      </div>
                     <div className='searchedItemsContainer' id='searchedItemsContainer'>
                       {productSearchList && productSearchList.map((eachItem, index) => {
                         return (
                           <div onClick={()=>{showProductPage(eachItem._id)}} className="eachSearchItem" key={index} >
                             <div className='eachSearchItemContent' >
                               <div className="searchImage"></div>
                               <div className="productImage"><img src={eachItem.productimage} alt="" /></div>
                               <div className="searchedText">{eachItem.productname}</div>
                             </div>
                           </div>
                         )
                       })}
                     </div>
                  </div>
                  <div className="cartContainer">
                    <Link to="/cartpage" className='custom-button' style={{textDecoration:"none",color:"white"}}>
                      <div className="cartDiv">
                         {isLoggedIn && <div className="zeroDiv"><div className="zero" id='cartNo'>{cartSize}</div></div>}
                          <div className="cartTextAndImageDiv">
                              <div className="imageDiv">
                                  <img src="/images/cart.png" alt='not found' height="40px" width="40px" />
                              </div>
                              <div className="cartTextDiv">Cart</div>
                          </div>
                      </div>
                    </Link>  
                  </div>
              </div>
              <div className="otherOptionsDiv">
                  <div className="moreOptionsAndSubmenu">
                      <div className="moreOptions">
                        {(!isLoggedIn)?<button id="loginBtn" className='loginBtnBackground custom-button'>More</button>:<button className='custom-button'>{(name.includes(" "))?(name.substring(0,name.indexOf(" "))+".."):name.substring(0,7)+".."}</button>}
                      </div>
                      <div className="moreOptionsSubmenu" id='moreOptionsSubmenu'>
                          {
                            (!isLoggedIn) && <div className="eachSubmenuOption submenuSecondOption"><img src="/images/login.png" alt="" className="submenuIcons"/><Link to="/login">Login</Link></div>
                          }
                          {
                            (!isLoggedIn) && <div className="eachSubmenuOption submenuSecondOption"><img src="/images/createAccount.png" alt="" className="submenuIcons"/><Link to="/createaccount">Create Account</Link></div>
                          }
                          {
                            isLoggedIn && <div className="eachSubmenuOption submenuFourthOption"><img src="/images/logout.png" alt="" className="submenuIcons"/><Link to="/logout">Logout</Link></div> 
                          }                           
                          <div className="eachSubmenuOption submenuSecondOption"><img src="/images/profile.png" alt="" className="submenuIcons"/><Link to="/profile">Profile</Link></div>
                          <div className="eachSubmenuOption submenuFifthOption"><img src="/images/wishlist.png" alt="" className="submenuIcons"/><Link to="/wishlist">wishlist</Link>
                               <div className="wishlistNo"><div className="innerNoWishlist">{isLoggedIn?wishlistProducts.length:"0"}</div></div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="lowerNavbar" id='lowerNavbar'>
            <div className="searchContainerLower" id='searchContainerLower'>
               <div className="searchBar">
                   <div className="searchInputDiv"><input type="text" placeholder='Search Products' className="searchInput" onChange={changeSearchQuery}/></div>
                   <div className="searchIconContainer"><img style={{height:"50%"}} src="images/search.png" alt=""/></div>
               </div>
          <div className='searchedItemsContainer' id='searchedItemsContainer'>
            {productSearchList && productSearchList.map((eachItem, index) => {
              return (
                <div onClick={() => { showProductPage(eachItem._id) }} className="eachSearchItem" key={index} >
                  <div className='eachSearchItemContent' >
                    <div className="searchImage"></div>
                    <div className="productImage"><img src={eachItem.productimage} alt="" /></div>
                    <div className="searchedText">{eachItem.productname}</div>
                  </div>
                </div>
              )
            })}
          </div>
            </div>
          </div>
      </div>
  )
}

export default Navbar