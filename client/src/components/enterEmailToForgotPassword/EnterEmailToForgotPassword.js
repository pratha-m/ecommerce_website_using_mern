import React, { useState } from 'react'
import "./enterEmailToForgotPassword.css"
import { Link,useNavigate} from 'react-router-dom'
import Axios from "axios"
const EnterEmailToForgotPassword = ({errorToast,successToast}) => {
  const [email,setEmail]=useState("");
  const navigate=useNavigate();
  const fillEmailToForgotPassword=(event)=>{
    event.target.disabled=true;
    event.target.style.backgroundColor="gray"
    Axios.post(`${process.env.REACT_APP_BASE_URL}/sendemail`,{email:email})
    .then((result)=>{
      const {data}=result;
      const {success}=data;
      if(success){
        successToast(`Email Sent Successfuly to ${email}`)
        event.target.disabled=false;
        event.target.style.backgroundColor="#506a50"
        navigate("/getotponemail",{state:email}); 
      }
      else{
        event.target.disabled=false;
        event.target.style.backgroundColor="#506a50"
         errorToast(data.message);
      }
    })
    .catch(()=>{
      event.target.disabled=false;
        event.target.style.backgroundColor="#506a50"
      errorToast("some error occured email not sends")
    })
  }
  return (
    <div>
      <div className="ForgotPasswordEmailFormContainer">
        <div className="enterEmailFormDiv">
          <div className="forgotByEmailTextDiv">
            <div className="text0">Enter email to forgot password:</div>
            {/* <div className="text2EmailOfPerson"><a href="/">abcd123@gmail.com</a></div> */}
        </div>
        <div className="otpFormDiv0">
          <div className="otpForm0">
            <div className="otpInputDiv0"><div className="otpInput0"><input type="email" onChange={(event)=>{setEmail(event.target.value)}} placeholder="Enter Email" className="otpInputTag0" name="email"/></div></div>
            <div className="createAccountButtonDiv0"><Link to='' id="anchor" style={{color:"white",textDecoration:"none"}} className="createAccountButton0 custom-button"><input type="button" id="button" onClick={fillEmailToForgotPassword} value="Continue" className="createAccountButtonTag0"/></Link></div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default EnterEmailToForgotPassword