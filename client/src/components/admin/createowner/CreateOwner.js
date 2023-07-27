import React, { useState } from 'react'
import Axios from "axios"
const CreateOwner = () => {
  const [ownerName,setOwnerName]=useState('');
  const [ownerEmail,setOwnerEmail]=useState('');
  const [ownerPassword,setOwnerPassword]=useState('');
  const createOwner=(e)=>{
     if(ownerName && ownerEmail && ownerPassword){
       e.target.disabled=true;
       e.target.innerText="Creating..."
       Axios.post(`${process.env.REACT_APP_BASE_URL}/createadmin`,{name:ownerName,email:ownerEmail,password:ownerPassword})
       .then((result)=>{
        console.log(result);
          console.log("Owner Created");
          e.target.innerText="Create Owner";
          e.target.disabled=false;
       })
       .catch((error)=>{
          e.target.innerText="Create Owner";
          e.target.disabled=false;
          console.log("error in creating owner",error.message)
        });
     }
     else{
      console.log("Enter All credentials");
     }
  }
  return (
    <div style={{"minHeight":"65vh"}}>
        <form>
            <label htmlFor="name">Name:</label>
            <input type="text" name='name' onChange={(e)=>{setOwnerName(e.target.value)}}/>
            <br/><br/> 
            <label htmlFor="email">Email:</label>
            <input type="text" name='email' onChange={(e)=>{setOwnerEmail(e.target.value)}}/>
            <br/><br/>
            <label htmlFor="password">Password:</label>
            <input type="password" name='password' onChange={(e)=>{setOwnerPassword(e.target.value)}}/>
            <br/><br/> 
            <button type='button' onClick={createOwner}>Create Owner</button>
        </form>
    </div>
  )
}

export default CreateOwner