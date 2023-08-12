import React from 'react'
import Skeleton from 'react-loading-skeleton'
import "../cartPage/cartPage.css";

const CartSkeletons = () => {
  return (
    <div className="item">
         <div className="buttons">
           <span className="delete-btn" style={{backgroundImage:"none"}}><Skeleton height={30} width={30}/></span>
           <span className="like-btn" style={{backgroundImage:"none"}}><Skeleton height={30} width={30}/></span>
         </div>
         <div className="image">
          <div className='placeImage'>
            <Skeleton/>
           </div> 
         </div>
       <div className="description">
           <span className='span'><Skeleton height={20}/></span>
         </div>
         <div className="quantity">
           <button className="plus-btn" type="button" name="button">
             <Skeleton height={30} width={30}/>
           </button>
           <input type="number" name="name" min={1}  disabled/>
           <button className="minus-btn" type="button" name="button">
              <Skeleton height={30} width={30}/>
           </button>
         </div>
         <div className="total-price"><Skeleton height={30} width={90}/></div>
    </div>
  )
}

export default CartSkeletons