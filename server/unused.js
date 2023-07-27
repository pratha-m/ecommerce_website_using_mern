

// app.post("/enter_email_to_forgot_password",async(request,response)=>{
//     const userEmail=request.body.email;
//     const databaseToFindEmail=await student.findOne({email:userEmail});
//     if(databaseToFindEmail!=null){
//         const nodemailer=require("nodemailer")
//         response.render("get_otp_on_email")
//         const otpOnEmail=Math.round(Math.random()*(192356-123457)+123457);
//         const subject=`Forgot password`
//         const html=
//         `
//         <!doctype html>
//         <html lang="en">
//           <head>
//             <meta charset="utf-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1">
//             <title>Bootstrap demo</title>
//             <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
//           </head>
//           <body>
//           <div class="card">
//           <div class="card-body">
//             <h5 class="card-title">Forgot Password</h5>
//             <p class="card-text">Otp to forgot the password is :</p>
//             <button type="button" class="btn btn-primary" style="background-color:green;color:white;border-radius:20px;border:none">${otpOnEmail}</button>
//             </div>
//             </div>
//             <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
//           </body>
//         </html> 
//         `
//         let mailTransporter=nodemailer.createTransport({
//             service:"gmail",
//             auth:{
//                 user:"jsnode02@gmail.com",
//                 pass:process.env.password
//             }
//         })
//         let details={
//             from:"jsnode02@gmail.com",
//             to:`${userEmail}`,
//             subject:subject,
//             html:html
//         }
//         mailTransporter.sendMail(details,(error)=>{
//             if(error){
//                 console.log("error in sending message");
//             }
//             else{
//                 console.log("email has send successfully")
//                 app.post("/get_otp_on_email",async(request,response)=>{
//                     const userTypedOtp=request.body.otp;
//                     if(userTypedOtp==otpOnEmail){
//                         response.render("create_new_password")
//                         app.post("/create_new_password",async(request,response)=>{
//                             try{
//                                 let userPassword=request.body.password;
//                                 let userConfirmPassword=request.body.confirmpassword;
//                                 let hashedUserPassword=await bcrypt.hash(userPassword,10)
//                                 let hashedUserConfirmPassword=await bcrypt.hash(userConfirmPassword,10)
//                                 let updateStudentData=await student.findOneAndUpdate({email:userEmail},{$set:{password:hashedUserPassword,confirmpassword:hashedUserConfirmPassword}},{new:true})
//                                 response.send("password updated successfully");
//                             }
//                             catch(error){
//                                 console.log(error)
//                                 response.send(error)
//                             }
//                         })
//                     }
//                     else{
//                         console.log("you entered invalid otp")
//                     }
//                 })
//             }
//         })
// }
// else{
//     response.send("email is not valid pls enter correct email")
// }
// })




// <div className="shoppingCartProducts">
//           {saveForLatterProductList.map((saveLatterProduct,newindex)=>{
//             return(
//               <div key={newindex} className="cartProductContainer">
//             <div className="imageAndStaticText">
//               <div className="imageContainer">
//                 <img src={`uploads/${saveLatterProduct.productimage}`} alt="not found" className="productImage"/>
//               </div>
//               <div className="productDetailsTextContainer">
//                 <div className="productName">{saveLatterProduct.productname}</div>
//                 <div className="productOtherDetails"></div>
//                 <div className="productPrice">₹{saveLatterProduct.productprice}</div>
//               </div>
//             </div>
//             <div className="cartProductAllButtons">
//               <div className="increaseAndDecreaseProducts">
//                 <div className="minusBtnDiv"><button className="minusBtn" onClick={()=>{decreaseQuantity(saveLatterProduct._id,newindex)}}  id={`minusBtn${newindex}`}><img src="images/minus.png" alt=""/></button></div>
//                 <div className="noOfProductsInputDiv"><input type="number"  min={1} max={10} defaultValue={saveLatterProduct.productquantity} className="noOfProductInput" id={`noOfProductInput${newindex}`}/></div>
//                 <div className="plusBtnDiv"><button className="plusBtn" onClick={()=>{increaseQuantity(saveLatterProduct._id,newindex)}} id={`plusBtn${newindex}`}><img src="images/plus.png" alt=""/></button></div>
//                 {/* onChange={(event)=>{setQuantityValue(event.target.value)}} */}
//               </div>
//               <div className="saveForLaterAndRemoveBtns">
//                 <div className="saveForLatter" >Save For Later</div>
//                 <div className="Remove" >REMOVE</div>
//               </div>
//             </div>
//               </div>
//           )})}
//       </div>




 


// .shoppingCartProducts::-webkit-scrollbar {
//     display: none;
//   }
//   .shoppingCartProducts{
//     -ms-overflow-style: none;  /* IE and Edge */
//     scrollbar-width: none;  /* Firefox */
//   }