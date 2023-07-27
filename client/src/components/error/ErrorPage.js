import React from 'react'
import "./errorPage.css"
import { Link } from 'react-router-dom'
const ErrorPage = () => {
  return (
    <div className='errorPage'>
        <div className="errorTextContainer">
            <h1>Page Not Found</h1>
            <div>Go Back To Home Page <Link to="/">click Here</Link></div>
        </div>
    </div>
  )
}

export default ErrorPage