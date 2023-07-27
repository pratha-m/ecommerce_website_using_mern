import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetOtpOnEmail from './components/getOtpOnEmail/GetOtpOnEmail';
import CreateAccount from './components/createAcoount/CreateAccount';
import EnterEmailToForgotPassword from './components/enterEmailToForgotPassword/EnterEmailToForgotPassword';
import LoginForm from './components/loginForm/LoginForm';
import WIshlist from './components/wishlist/WIshlist';
import FOoter from './components/footer/FOoter';
import ImageSlider from './components/imageSlider/ImageSlider';
import PRoducts from './components/products/PRoducts';
import YourOrders from './components/yourOrders/YourOrders';
import CartPage from './components/cartPage/CartPage';
import Navbar from './components/navbar/Navbar';
import EachProductPage from './components/eachProductPage/EachProductPage';
import CreateNewPassword from './components/createNewPassword/CreateNewPassword';
import LOgout from './components/logout/LOgout';
import ErrorPage from './components/error/ErrorPage';
import CreateProduct from "./components/admin/createProduct/CreateProduct"
import EditProducts from "./components/admin/editProducts/EditProducts"
import CreateOwner from "./components/admin/createowner/CreateOwner";
import { useEffect, useState } from 'react';
import Axios from 'axios';
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './components/admin/adminHome/Home';
function App(){
   const [isLoggedIn,setIsLoggedIn]=useState(false);
   const [isAdmin,setIsAdmin]=useState(false);
   const [name,setName]=useState("");    
   const [email,setEmail]=useState("");    
   const [userId,setUserId]=useState("");
   const [changeNo,setChangeNo]=useState(0);
   const [cartSize,setCartSize]=useState(0);
   const [wishlistSize,setWishlistSize]=useState(0);
   const [wishlistProducts,setWishlistProducts]=useState([]);

  const getCartProducts=(userid)=>{
    Axios.get(`${process.env.REACT_APP_BASE_URL}/getcartproducts/${userid}`)
    .then((result)=>{
      setCartSize(result.data.cart.length);
    })
    .catch(()=>{console.log("error in fetching cart products")})
  }
  const getWishlistProducts=(userid)=>{
    Axios.get(`${process.env.REACT_APP_BASE_URL}/getallwishlistproducts/${userid}`)
    .then((result)=>{
      setWishlistProducts(result.data.wishlist);
    })
    .catch((error)=>{console.log("eror")});
  }
  useEffect(()=>{
    // console.log("Running UseEffect")
    const token=('; '+document.cookie).split(`; ecommerce_token=`).pop().split(';')[0];
    if(token){
      Axios.post(`${process.env.REACT_APP_BASE_URL}/verifytoken`,{token})
      .then((res)=>{
        const {data}=res;
        const {success}=data;
        if(success){
          setIsLoggedIn(true);
          const {admin,name,email,_id}=data.data;
          getCartProducts(_id);
          getWishlistProducts(_id);
          setName(name);
          setEmail(email);
          setUserId(_id);
          if(admin){
            setIsAdmin(true);
            // console.log("You are admin");
          }  
          else{
            setIsAdmin(false);
          }
        }
        else{
          setIsLoggedIn(false);
          setIsAdmin(false);
          setEmail("");
          setName("");
          setUserId("");
        }
      })
      .catch(()=>{
        setIsLoggedIn(false);
        setIsAdmin(false);
        setEmail("");
        setName("");
        setUserId("");
      })
    }
    else{
      setIsLoggedIn(false);
      setIsAdmin(false);
      setEmail("");
      setName("");
      setUserId("");
    }
  },[changeNo])
  
  const errorToast=(message)=>{
    toast.error(message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      toastId:"customId"
    });
  }
  const successToast=(message)=>{
    toast.success(message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      toastId:"customId"
    });
  }

  return (
    <div>
      <Router>
          <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} name={name} cartSize={cartSize} wishlistProducts={wishlistProducts}/>
          <Routes>
            <Route exact path='/' element={<><ImageSlider/><PRoducts userId={userId} isLoggedIn={isLoggedIn} wishlistProducts={wishlistProducts} changeNo={changeNo} setChangeNo={setChangeNo}/></>}/>
            {!isLoggedIn && <Route exact path='/createaccount' element={<CreateAccount changeNo={changeNo} setChangeNo={setChangeNo} errorToast={errorToast} successToast={successToast} />}/>}              
            {!isLoggedIn && <Route exact path='/login' element={<LoginForm changeNo={changeNo} setChangeNo={setChangeNo} errorToast={errorToast} successToast={successToast}/>}/>}
            <Route exact path='/cartpage' element={isLoggedIn?<CartPage userId={userId} setCartSize={setCartSize} cartSize={cartSize} errorToast={errorToast} successToast={successToast} name={name} email={email}/>:<LoginForm/>}/>
            <Route exact path='/yourorders' element={isLoggedIn?<YourOrders/>:<LoginForm/>}/>
            {!isLoggedIn && <Route exact path='/enteremailtoforgotpassword' element={<EnterEmailToForgotPassword errorToast={errorToast} successToast={successToast}/>}/>}
            {!isLoggedIn && <Route exact path='/getotponemail' element={<GetOtpOnEmail errorToast={errorToast} successToast={successToast}/>}/>}
            <Route exact path='/wishlist' element={isLoggedIn?<WIshlist userId={userId} changeNo={changeNo} setChangeNo={setChangeNo}/>:<LoginForm/>}/>
            <Route exact path='/eachproductpage' element={<EachProductPage isLoggedIn={isLoggedIn} userId={userId} errorToast={errorToast} successToast={successToast} changeNo={changeNo} setChangeNo={setChangeNo} name={name} email={email} /> }/>
            {!isLoggedIn && <Route exact path='/createnewpassword' element={<CreateNewPassword errorToast={errorToast} successToast={successToast} changeNo={changeNo} setChangeNo={setChangeNo}/>}/>}
            {isLoggedIn && <Route exact path='/logout' element={<LOgout changeNo={changeNo} setChangeNo={setChangeNo}/>}/>}
            {isAdmin && <Route exact path='/admin' element={<Home/>}/>}
            {isAdmin && <Route exact path='/admin/createowner' element={<CreateOwner/>}/>}
            {isAdmin && <Route exact path='/admin/createproduct' element={<CreateProduct/>}/>}
            {isAdmin && <Route exact path='/admin/editproducts' element={<EditProducts/>}/>}
            <Route exact path='*' element={<ErrorPage/>}/>
          </Routes>
          <FOoter/>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          limit={1}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="light"
        />
      </Router>
    </div>   
  );
}

export default App;
