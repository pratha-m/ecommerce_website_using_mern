import React from 'react'
import "./loginPopup.css";
import { Link } from 'react-router-dom';

const LoginPopup = ({heading,text}) => {
  return (
    <div className="loginPopupPage">
        <div className="loginPopupBox">
            <div className="loginPopupImage">
                <img src="/images/logo_black.png" alt="" />
            </div>
            <h2>{heading}</h2>
            <p>{text}</p>
            <Link to="/login">Login</Link>
        </div>
    </div>
  )
}

export default LoginPopup