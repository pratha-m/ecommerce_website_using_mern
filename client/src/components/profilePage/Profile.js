import React, { useEffect, useState } from 'react'
import Axios from "axios";
import "./profile.css";

const Profile = ({name,email,userId,successToast,errorToast}) => {
  const [newName,setNewName]=useState("");  
  const [newEmail,setNewEmail]=useState("");  
  const [newPassword,setNewPassword]=useState("");
  const [runUseEffect,setRunUseEffect]=useState(0);

  const nameEdit=()=>{
     let inputName=document.getElementById("inputName");
     if(inputName.disabled){
        inputName.disabled=false;
        inputName.classList.remove("inputDisabledClass");
      }
      else{
         inputName.disabled=true;
         inputName.classList.add("inputDisabledClass");  
         if(newName && newName!==name){
            Axios.put(`${process.env.REACT_APP_BASE_URL}/profile`,{userId:userId,name:newName,password:newPassword})
            .then(()=>{
               setRunUseEffect(runUseEffect+1);
               successToast("name Updated Successfully")
            })
            .catch((err)=>{errorToast("Error in updating name")})
         }
     }
  }  
  const emailEdit=()=>{
     let inputEmail=document.getElementById("inputEmail");
     if(inputEmail.disabled){
        inputEmail.disabled=false;
        inputEmail.classList.remove("inputDisabledClass");
      }
      else{
         inputEmail.disabled=true;
         inputEmail.classList.add("inputDisabledClass");  
         if(newEmail && newEmail!==email){
            Axios.put(`${process.env.REACT_APP_BASE_URL}/profile`,{userId:userId,name:newName,email:newEmail,password:newPassword})
            .then(()=>{
               successToast("Email Updated Successfully")
               setRunUseEffect(runUseEffect+1);
            })
            .catch((err)=>{errorToast("Error in updating Email")})
         }
     }
  }  
  const passwordEdit=()=>{
    let inputPassword=document.getElementById("inputPassword");
    if(inputPassword.disabled){
        inputPassword.disabled=false;
        inputPassword.classList.remove("inputDisabledClass");
      }
      else{
         inputPassword.disabled=true;
         inputPassword.classList.add("inputDisabledClass");
         if(newPassword){
            Axios.put(`${process.env.REACT_APP_BASE_URL}/profile`,{userId:userId,name:newName,password:newPassword})
            .then(()=>{
               inputPassword.value=null;
               successToast("Password Updated successfully");
            })
            .catch((err)=>{errorToast("Error in updating password")})
         }
    }   
  }
  useEffect(()=>{
     Axios.get(`${process.env.REACT_APP_BASE_URL}/profile/${userId}`)
     .then((result)=>{
      const {data}=result;
      const {success}=data;
      if(success){
         let inputName=document.getElementById("inputName");
         const {name,email}=data.user;
         inputName.value=name;
         setNewName(name);
         setNewEmail(email);
      }
      else{
         return;
      }
     })
     .catch((result)=>{console.log("Error in getting user profile")});
  },[runUseEffect,userId]);

  return (
    <div className="profilePage">
       <div className="profileImage"><img src="/images/profile.png" alt="" /></div>        
       <div className="profileField profileName">
          <b>Name</b>
          <input type='text' className='inputDisabledClass' onChange={(e)=>setNewName(e.target.value)} id='inputName' defaultValue={newName} disabled ></input>
          <button className="editBtn" onClick={nameEdit}></button>
       </div>
       <div className="profileField profileEmail">
          <b>Email</b>
          <input type='text' className='inputDisabledClass' onChange={(e)=>setNewEmail(e.target.value)} id='inputEmail' defaultValue={newEmail} disabled></input>
          <button className='editBtn' onClick={emailEdit}></button>
       </div>
       <div className="profileField profilePassword">
           <b>Password</b>
           <input type="password" className='inputDisabledClass'  onChange={(e)=>setNewPassword(e.target.value)} id='inputPassword' disabled/>
           <button className='editBtn' onClick={passwordEdit}></button>
       </div>
       {/* <div className="profileField profileAddress">
            <b>Address</b>
            <div></div>
            <button className='editBtn'></button>
       </div> */}
    </div>
  )
}

export default Profile