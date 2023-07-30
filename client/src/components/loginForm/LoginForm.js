import React,{useState} from 'react'
import "./loginForm.css"
import Axios from 'axios';
import {Link,useNavigate} from "react-router-dom";

const LoginForm = ({changeNo,setChangeNo,errorToast,successToast}) => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  const checkEmail=(e)=>{
    const btn=e.target;
    if(email && password){
      btn.disabled=true;
      btn.style.backgroundColor="gray";
      Axios.post(`${process.env.REACT_APP_BASE_URL}/login`,{email:email,password:password})
      .then((result)=>{
        const {data}=result;
        const {success}=data;
        if(success){
          // console.log(data.data);
          const timestamp=new Date().getTime(); // current time
          const exp=timestamp+(60*60*24*1000*7);
          btn.disabled=false;
          btn.style.backgroundColor="#506a50";
          document.cookie=`ecommerce_token=${data.data};expires=${exp};Secure`;
          setChangeNo(changeNo+1);
          successToast("Login Successfully !");
          navigate("/");
        }
        else{
          btn.disabled=false;
          btn.style.backgroundColor="#506a50";
          console.log(data.message);
          errorToast(data.message);
        } 
      })
      .catch((err)=>{
        btn.disabled=false;
        btn.style.backgroundColor="#506a50";
        console.log("error in login",err.message);
        errorToast("Some Error In Login !")
      })
    }
    else{
      errorToast("Enter All Credentials")
    }
  }
  return (
        <div>
          <div className="_log_createAccountOtpFormContainer" id='loginFormContainer'> 
            <div className="_log_formDiv">
                <div className="_log_otpTextDiv">
                    <div className="_log_text1">Sign In</div>
                </div>
                <div className="_log_otpFormDiv">
                   <div className="_log_otpForm">
                           <div className="_log_otpInputDiv"><div className="_log_otpInput"><input type="email" onChange={(event)=>{setEmail(event.target.value)}} placeholder="Email" className="_log_otpInputTag otpInputTag1" name="email"/></div></div>  
                           <div className="_log_otpInputDiv _log_passwordInputDiv">
                                   <div className="_log_otpInput _log_passwordInput"><input type="password" onChange={(event)=>{setPassword(event.target.value)}} placeholder="Enter Password" className="_log_otpInputTag" name="password" id="passwordInput"/></div>
                                   {/* <div className="_log_showPasswordIcon" id="showPasswordIcon"></div> */}
                           </div>  
                           <div className="_log_createAccountButtonDiv"><div className="_log_createAccountButton"><input value="Sign In" type="button" className="_log_createAccountButtonTag" onClick={checkEmail}/></div></div>
                   </div>
                </div>
                <div className="_log_forgotPasswordOptionDiv">
                    <div className="_log_forgotPasswordOption"><Link to="/enteremailtoforgotpassword">Forgot Password</Link></div>    
                </div>
                <div className="_log_signInFormOtherOptions">
                    <div className="_log_createAccountTextAndLink">    
                    <div className="_log_createAccountText">If you not have Account</div>
                    <div className="_log_createAccountDiv"><div className="_log_createAccountLink"><Link to="/createaccount">Create Account</Link></div></div>
                    </div>
                </div>     
            </div>
          </div>
        </div>
      )
}
export default LoginForm