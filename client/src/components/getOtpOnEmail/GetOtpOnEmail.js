import React,{useState} from 'react'
import "./getOtpOnEmail.css";
import Axios from "axios";
import { useNavigate,useLocation } from 'react-router-dom';
const GetOtpOnEmail = ({errorToast,successToast}) => {
  const {state}=useLocation();
  const [otp,setOtp]=useState("");
  const navigate=useNavigate();
  const manageOtpFunct=(event)=>{
    if(otp){
      event.target.disabled=true;
      event.target.style.backgroundColor="gray"
      Axios.post(`${process.env.REACT_APP_BASE_URL}/checkotp`,{email:state,otp:otp})
      .then((result)=>{
        const {data}=result;
        const {success}=data;
        if(success){
          successToast(data.message);
          event.target.disabled=false;
          event.target.style.backgroundColor="#506a50"
          navigate("/createnewpassword",{state:state})
        }
        else{
          event.target.disabled=false;
          event.target.style.backgroundColor="#506a50"
           errorToast(data.message);
        }
      })
      .catch((error)=>{
        event.target.disabled=false;
        event.target.style.backgroundColor="#506a50"
        errorToast(error.message);
      })
    }
    else{
      event.target.disabled=false;
      event.target.style.backgroundColor="#506a50"
      errorToast("Pls Enter Otp");
    }
  }
  return (
    <div>
      <div className="createAccountOtpFormContainer1">
        <div className="otpFormDiv1">
          <div className="otpTextDiv1">
            <div className="text11">You will get the otp on Email:</div>
            <div className="text2EmailOfPerson1"><a href="/">{state}</a></div>
          </div>
          <div className="otpInnerFormDiv">
            <div className="otpForm1">
              <div className="otpInputDiv1"><div className="otpInput1"><input onChange={(event)=>{setOtp(event.target.value)}} type="text" placeholder="Enter Otp" className="otpInputTag1"/></div></div>
              <div className="createAccountButtonDiv1"><div className="createAccountButton1"><input type="button" id='otpBtn' onClick={manageOtpFunct} value="Continue" className="createAccountButtonTag1"/></div></div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default GetOtpOnEmail