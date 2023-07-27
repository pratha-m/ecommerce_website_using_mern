// import React, { useState } from 'react'
// import "./logout.css"
// import {Link} from "react-router-dom";
// import Axios from "axios";

// const LOgout= () => {
//   const [email,setEmail]=useState("");
//   const [password,setPassword]=useState("");
//   const LogoutFunction=()=>{
//       Axios.delete("http://localhost:3001/logout",{data:{email:email,password:password}})
//       .then((result)=>{
//         console.log("form logout request")
//         console.log(result);
//         if(result.data!==""){
//           console.log("logout successfully")
//         }
//         else{
//            console.log("logout not succeded")
//         }
//       })
//       .catch(()=>{console.log("logout unsuccessfull")})
//   }
//   return (
//     <div>
//       <div className="_logout_createAccountOtpFormContainer">
//         <div className="_logout_formDiv">
//             <div className="_logout_otpTextDiv">
//                 <div className="_logout_text1">Log Out</div>
//             </div>
//             <div className="_logout_otpFormDiv">
//                <div className="_logout_otpForm">
//                        <div className="_logout_otpInputDiv"><div className="_logout_otpInput"><input type="email" onChange={(event)=>{setEmail(event.target.value)}} placeholder="Email" className="_logout_otpInputTag otpInputTag1" name="email"/></div></div>  
//                        <div className="_logout_otpInputDiv _logout_passwordInputDiv">
//                                <div className="_logout_otpInput _logout_passwordInput"><input type="password" onChange={(event)=>{setPassword(event.target.value)}} placeholder="Enter Password" className="_logout_otpInputTag" name="password" id="passwordInput"/></div>
//                                <div className="_logout_showPasswordIcon" id="showPasswordIcon"></div>
//                        </div>  
//                        <div className="_logout_createAccountButtonDiv"><div className="_logout_createAccountButton"><input value="Log Out" onClick={LogoutFunction} type="button" className="_logout_createAccountButtonTag" /></div></div>
//                </div>
//             </div>
//             <div className="_logout_forgotPasswordOptionDiv">
//                 <div className="_logout_forgotPasswordOption"><Link to="/enteremailtoforgotpassword">Forgot Password</Link></div>    
//             </div>
//             <div className="_logout_signInFormOtherOptions">
//                 <div className="_logout_createAccountTextAndLink">    
//                 </div>
//             </div>     
//         </div>
//       </div>
//     </div>
//   )
// }
// export default LOgout