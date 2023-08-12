import React from 'react'
import Skeleton from 'react-loading-skeleton'
import "../cartPage/cartPage.css";

const WishlistSkeleton = () => {
  return (
    <div className="item">
         <div className="buttons">
           <span className="delete-btn" style={{backgroundImage:"none"}}><Skeleton height={30} width={30}/></span>
         </div>
         <div className="image">
          <div className='placeImage'>
            <Skeleton/>
           </div> 
         </div>
       <div className="description">
           <span className='span'><Skeleton height={20}/></span>
         </div>
         <div className="total-price"><Skeleton height={30} width={90}/></div>
         </div>
  )
}

export default WishlistSkeleton