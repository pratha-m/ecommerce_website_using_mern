import React, { useState } from 'react'
import "./createNewPassword.css"
import Axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
const CreateNewPassword = ({errorToast,successToast,changeNo,setChangeNo}) => {
  const [newPassword,setNewPassword]=useState("");
  const [confirmNewPassword,setconfirmNewPassword]=useState("");
  const {state}=useLocation();
  const navigate=useNavigate();
  const manageNewPassword=(event)=>{
    if(newPassword && confirmNewPassword){
      if(newPassword.length>3 && confirmNewPassword.length>3){
        if(newPassword!==confirmNewPassword){
          errorToast("password and confirm password must be same");
        }
        else{
            event.target.disabled=true;
            event.target.style.backgroundColor="gray"
            Axios.put(`${process.env.REACT_APP_BASE_URL}/changepassword`,{email:state,password:newPassword})
            .then((result)=>{
              const {data}=result;
              const {success}=data;
              if(success){
                successToast(data.message);
                const timestamp=new Date().getTime(); // current time
                const exp=timestamp+(60*60*24*1000*7);
                document.cookie=`ecommerce_token=${data.user};expires=${exp};Secure`;
                event.target.disabled=false;
                event.target.style.backgroundColor="#506a50"
                setChangeNo(changeNo+1);
                navigate("/");
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
              errorToast("some error in updating password")
            })
        }
      }
      else{
        event.target.disabled=false;
          event.target.style.backgroundColor="#506a50"
        errorToast("Password Length must be greater than 3");
      }
    }
    else{
      event.target.disabled=false;
      event.target.style.backgroundColor="#506a50"
      errorToast("Pls Enter the password")
    }
  }
  return (
    <div>
      <div className="createNewPasswordFormContainer">
        <div className="createNewPasswordFormAndHeadingDiv">
          <div className="createNewPasswordHeadingDiv">Create New Password</div>
          <div className="createNewPasswordFormDiv">
            <form className="createNewPasswordForm">
              <div className="createNewPassswordInputContainer">
                <div className="createNewPasswordInputAndIconDiv">
                  <div className="createNewPasswordInputDiv"><input type="password" onChange={(event)=>{setNewPassword(event.target.value)}} name="password" className="createNewPasswordInput" placeholder="new password" id="passwordInput"/></div>
                  {/* <div className="showPasswordIconDiv" id="showPasswordIcon"></div> */}
                </div>
              </div>
              <div className="retypePassswordInputContainer">
                <div className="retypePasswordInputAndIconDiv">
                  <div className="retypePasswordInputDiv"><input type="password" onChange={(event)=>{setconfirmNewPassword(event.target.value)}} name="confirmpassword" className="retypePasswordInput" placeholder="retype password" id="confirmPasswordInput"/></div>
                  {/* <div className="showRetypePasswordIconDiv" id="showRetypePasswordIcon"></div> */}
                </div>
              </div>
              <div className="signInButtonContainer">
                <div className="signInButtonDiv"><input type="button" value="Sign In" className="signInButton" onClick={manageNewPassword}/></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNewPassword