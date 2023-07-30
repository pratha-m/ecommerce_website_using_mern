import React from 'react'
import "./logout.css"
import { useNavigate } from 'react-router-dom'
const LOgout= ({changeNo,setChangeNo,getProducts}) => {
   const navigate=useNavigate();
   const LogoutFunction=()=>{
     document.cookie=`ecommerce_token=; path=/;expires=${new Date(0).toUTCString()}`
     setChangeNo(changeNo+1);
     navigate("/");
  }
  return (
    <div>
      <div className="_logout_createAccountOtpFormContainer">
        <div className="_logout_formDiv">
            <div className="_logout_otpTextDiv">
                <div className="_logout_text1">Log Out</div>
            </div>
            <div className="_logout_otpFormDiv">
               <div className="_logout_otpForm">
                      <div className="_logout_otpInputDiv">
                        <div className="_logout_otpInput">
                           Are You Sure You Want To Logout ?
                        </div>
                      </div>  
                       <div className="_logout_createAccountButtonDiv"><div className="_logout_createAccountButton"><input value="Log Out" onClick={LogoutFunction} type="button" className="_logout_createAccountButtonTag" /></div></div>
               </div>
            </div>
            {/* <div className="_logout_forgotPasswordOptionDiv">
                <div className="_logout_forgotPasswordOption"><Link to="/enteremailtoforgotpassword">Forgot Password</Link></div>    
            </div>
            <div className="_logout_signInFormOtherOptions">
                <div className="_logout_createAccountTextAndLink">    
                </div>
            </div>      */}
        </div>
      </div>
    </div>
  )
}
export default LOgout