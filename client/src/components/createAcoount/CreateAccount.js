import React, { useState } from 'react'
import Axios from "axios";
import "./createAccount.css"
import { Link, useNavigate } from "react-router-dom";
const CreateAccount = ({ changeNo, setChangeNo, errorToast, successToast }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const submitForm = (e) => {
    e.preventDefault();
    if (name && email && password && confirmpassword) {
      if (password === confirmpassword) {
        e.target.disabled = true;
        e.target.style.backgroundColor = "gray";
        Axios.post(`${process.env.REACT_APP_BASE_URL}/createaccount`, { name: name, email: email, password: password })
          .then((res) => {
            if (res.data.success) {
              const timestamp = new Date().getTime(); // current time
              const exp = timestamp + (60 * 60 * 24 * 1000 * 7);
              document.cookie = `ecommerce_token=${res.data.data};expires=${exp};Secure`;
              e.target.disabled = false;
              e.target.style.backgroundColor = "green";
              setChangeNo(changeNo + 1);
              successToast("Account Created Successfully !")
              navigate("/")
            }
            else {
              e.target.disabled = false;
              e.target.style.backgroundColor = "green";
              errorToast(res.data.message)
            }
          })
          .catch(() => {
            e.target.disabled = false;
            e.target.style.backgroundColor = "green";
            errorToast("Error in Creating Account !")
          })
      }
      else {
        errorToast("Password Not Matching !");
      }
    }
    else {
      errorToast("Enter All Credentials !")
    }
  }
  return (
    <form className="createaccount_createAccountFormContainer">
      <div className="createaccount_createAccountTextAndFormDiv">
        <div className="createaccount_createAccountText">Create Account</div>
        <div style={{ height: "100vh" }}>
          <div className="createaccount_createAccountFormDiv">
            <div className="createaccount_eachInfoDiv createaccount_nameDiv">
              {/* <div className="createaccount_inputTextDiv">Name:</div> */}
              <div className="createaccount_inputDiv">
                <div className="createaccount_input">
                  <input onChange={(event) => { setName(event.target.value) }} type="text" name="name" placeholder='Name' required={true} />
                </div>
              </div>
            </div>
            <div className="createaccount_eachInfoDiv createaccount_phoneNumberDiv">
              {/* <div className="createaccount_inputTextDiv">Email:</div> */}
              <div className="createaccount_inputDiv">
                <div className="createaccount_input"><input onChange={(event) => { setEmail(event.target.value) }} type="email" placeholder='Email' required={true} /></div></div></div>
            <div className="createaccount_eachInfoDiv createaccount_passwordDiv">
              {/* <div className="createaccount_inputTextDiv">Password:</div> */}
              <div className="createaccount_inputDiv">
                <div className="createaccount_input createaccount_passwordInput">
                  <input onChange={(event) => { setPassword(event.target.value) }} type="password" placeholder='Password' required={true} />
                  {/* <div className="createaccount_showPasswordIconDiv">
                  </div> */}
                </div></div></div>
            <div className="createaccount_eachInfoDiv createaccount_passwordDiv">
              {/* <div className="createaccount_inputTextDiv">Confirm Password:</div> */}
              <div className="createaccount_inputDiv"><div className="createaccount_input createaccount_passwordInput"><input onChange={(event) => { setConfirmPassword(event.target.value) }} type="password" placeholder='Confirm Password' required={true} />
              {/* <div className="createaccount_showPasswordIconDiv"></div> */}
              </div></div></div>
            <div className="createaccount_eachInfoDiv createaccount_continueButtonDiv">
              <div className="createaccount_ifAlreadyAccountExists">
                <div className="createaccount_ifAlreadyAccountExistsText">or If you already have account</div>
                <div className="createaccount_ifAlreadyAccountExistsLink"><Link to="/login">Sign In</Link></div>
              </div>
              <div className="createaccount_continueButtonOutDiv"><button type='submit' onClick={submitForm} className="createaccount_continueButton" id='continueButton'>Submit</button></div></div>
          </div>
        </div>
      </div>
    </form>
  )
}
export default CreateAccount