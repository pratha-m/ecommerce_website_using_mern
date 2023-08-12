import React from 'react'
import "../products/products.css";
import "../index.css";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const ProductSkeleton = () => {
  return (
    <div style={{ color: "black", textDecoration: "none" }} className="eachItem">
    <div className="eachItemInnerDiv" >
      <div className="eachItemImageDiv" >
        <div style={{height:"200px",width:"230px"}}>
          <Skeleton height={200}/>
        </div>
      </div>
      <div className="eachItemOtherTextDiv">
        <div className="productName">
          <div style={{width:"230px"}}><Skeleton/></div>
        </div>
        <div className="dealOfTheDayDiv">
           <div style={{width:"230px"}}><Skeleton/></div>
        </div>
        <div className="pricesDiv">
          <div className="showPrice">
            <div style={{width:"230px"}}><Skeleton/></div>
          </div>
        </div>
        <div className="freeDeliveryDiv">
          <div style={{width:"230px"}}><Skeleton/></div>
        </div>
      </div>
    </div>
  
</div>
  )
}

export default ProductSkeleton