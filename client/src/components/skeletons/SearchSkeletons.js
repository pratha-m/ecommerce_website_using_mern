import React from 'react'
import Skeleton from 'react-loading-skeleton'
import "../searchProducts/searchProducts.css";

const SearchSkeletons = () => {
  return (
    <div><div className="eachSearchItem" >
    <div className='eachSearchItemContent' >
      <div className="searchImage"></div>
      <div className="productImage"><Skeleton height={30} width={30}/></div>
      <div className="searchedText"><Skeleton height={20} width={200}/></div>
    </div>
    </div> 
    </div>
  )
}

export default SearchSkeletons