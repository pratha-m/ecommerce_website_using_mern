import React, { useEffect, useState } from 'react'
import "../index.css"
import {Link,useNavigate } from 'react-router-dom'
import Axios from "axios"
const Navbar = ({isLoggedIn,isAdmin,name,cartSize,wishlistProducts}) => {
    const navigate=useNavigate();
    const loginFunc=()=>{
        navigate("/login");
    }
  return (
      <div className="navigationContainer">
          <div className="upperNavbar">
              <Link to="/"><div className="websiteLogoContainer"></div></Link>
              <div className="otherOptionsDiv">
                  <div className="moreOptionsAndSubmenu">
                      <div className="moreOptions">
                        {(!isLoggedIn)?<button onClick={loginFunc} id="loginBtn" className='loginBtnBackground'>Login</button>:<button>{name}</button>}
                      </div>
                      <div className="moreOptionsSubmenu" id='moreOptionsSubmenu'>
                          {/* {
                             (!isLoggedIn)?<div className="eachSubmenuOption submenuSecondOption"><img src="/images/createAccount.png" alt="" className="submenuIcons"/><Link to="/createaccount">Create Account</Link></div>
                             :<div className="eachSubmenuOption submenuSecondOption"><img src="/images/profile.png" alt="" className="submenuIcons"/><Link to="/createaccount">Profile</Link></div>
                          } */}
                          {
                            (!isLoggedIn) && <div className="eachSubmenuOption submenuSecondOption"><img src="/images/createAccount.png" alt="" className="submenuIcons"/><Link to="/createaccount">Create Account</Link></div>
                          }
                          {/* {
                            isLoggedIn && isAdmin && <div className="eachSubmenuOption submenuFourthOption"><img src="/images/admin.png" alt="" className="submenuIcons"/><Link to="/admin">Admin Panel</Link></div> 
                          } */}
                          {
                            isLoggedIn && <div className="eachSubmenuOption submenuFourthOption"><img src="/images/logout.png" alt="" className="submenuIcons"/><Link to="/logout">Logout</Link></div> 
                          }
                          {/* {
                             isLoggedIn && <div className="eachSubmenuOption submenuThirdOption"><img src="/images/yourorders.png" alt="" className="submenuIcons"/><Link to="/yourorders">Your Orders</Link></div>
                          }                           */}
                          {
                            isLoggedIn && <div className="eachSubmenuOption submenuFifthOption"><img src="/images/wishlist.png" alt="" className="submenuIcons"/><Link to="/wishlist">wishlist</Link>
                               <div className="wishlistNo"><div className="innerNoWishlist">{wishlistProducts.length}</div></div>
                            </div>
                          }
                      </div>
                  </div>
              </div>
          </div>
          <div className="lowerNavbar">
              <div className="searchAndCart">
                  <div className="searchContainer">
                      <div className="searchBar">
                          <div className="searchInputDiv"><input type="text" className="searchInput"/></div>
                          <div className="searchIconContainer"><img style={{height:"50%"}} src="images/search.png" alt=""/></div>
                      </div>
                  </div>
                  <div className="cartContainer">
                    <Link to="/cartpage" style={{textDecoration:"none",color:"white"}}>
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
          </div>
      </div>
  )
}

export default Navbar