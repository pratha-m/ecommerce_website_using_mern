import React from 'react'
import "./footer.css";
import { Link } from 'react-router-dom';

const FOoter = () => {
  return (
    <footer>
        <div className="detailsSection">
           <div className="companySummary">
                <div>
                 <h2>esmart</h2>
                 <p>In esmart you can find the latest products.</p>
                </div>
           </div>
           <div className="quickLinks">
               <div>
                  <h2>Quick Links</h2>
                  <ul>
                     <li className='custom-button'><Link className='custom-button' to={"/"}><i className="fa fa-solid fa-chevron-up fa-rotate-90"></i>Home</Link></li>
                     <li className='custom-button'><Link className='custom-button' to={"/login"}><i className="fa fa-solid fa-chevron-up fa-rotate-90"></i>Login</Link></li>
                     <li className='custom-button'><Link className='custom-button' to={"/profile"}><i className="fa fa-solid fa-chevron-up fa-rotate-90"></i>Profile</Link></li>
                     <li className='custom-button'><Link className='custom-button' to={"/logout"}><i className="fa fa-solid fa-chevron-up fa-rotate-90"></i>Logout</Link></li>
                     <li className='custom-button'><Link className='custom-button' to={"/cartpage"}><i className="fa fa-solid fa-chevron-up fa-rotate-90"></i>Cart</Link></li>
                     <li className='custom-button'><Link className='custom-button' to={"/wishlist"}><i className="fa fa-solid fa-chevron-up fa-rotate-90"></i>Wishlist</Link></li>
                  </ul> 
               </div>
           </div>
           <div className="contactDetails">
                <div>
                   <h2>Contact Info</h2>
                   <span><i className="fa fa-solid fa-phone"></i>91+XXXXXXX</span>
                   <span><i className="fa fa-solid fa-envelope"></i>prathamchhabra85@gmail.com</span>
                   <span><i className="fa fa-solid fa-globe"></i>punjab,India-140401</span>
                   <span className="socialLinks">
                    <ul>
                        <li><a href="/" className="eachSocialLink"><img src="/images/github.png" alt="" /></a></li>
                        <li><a href="/" className="eachSocialLink"><img src="/images/linkedin.png" alt="" /></a></li>
                        <li><a href="/" className="eachSocialLink"><img src="/images/codepen.png" alt="" /></a></li>
                    </ul>
                   </span>
                </div>
           </div>
        </div>
        <div className="copyrightSection">
            <p>&copy;copyright2023</p>
        </div>
    </footer>
  )
}

export default FOoter