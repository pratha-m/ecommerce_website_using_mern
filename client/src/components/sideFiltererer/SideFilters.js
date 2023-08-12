import React, { useEffect, useState } from 'react'
import Axios from "axios";
import "./sideFilterer.css";
import Skeleton from 'react-loading-skeleton';

const SideFilters = ({brands,categories,minPrice,maxPrice,refetchProducts,setRefetchProducts,setProductList,isLoadingProducts}) => {
  const [maxPriceVal,setMaxPriceVal]=useState(maxPrice);
  const [filteredBrands,setFilteredBrands]=useState([]);
  const [filteredCategories,setFilteredCategories]=useState([]);
  const [effectRun,setRunEffect]=useState(0);

  useEffect(()=>{
    applyFilters();
  },[effectRun])

  const closeSideFilter=()=>{
    const sideFilter=document.getElementById("sideFilter");
    const sideFilterBar=document.getElementById("sideFilterBar");
    const sideFilterBtns=document.getElementById("sideFilterBtns");
    const sideFilterOverlay=document.getElementById("sideFilterOverlay");
    const html=document.getElementsByTagName("html")[0];
    sideFilter.style.visibility="hidden";
    sideFilterBar.style.transform="translateX(-100%)";
    sideFilterBtns.style.transform="translateX(-100%)";
    sideFilterOverlay.style.transform="translateX(-100%)";
    html.style.overflow="visible";
  }
  const updateFilteredBrands=(eachBrand,index)=>{
    let brandInput=document.getElementById(eachBrand+index);
    if(brandInput.checked && !filteredBrands.includes(eachBrand)){
         filteredBrands.push(eachBrand);      
    }
    else if(filteredBrands.includes(eachBrand)){    
        filteredBrands.splice(filteredBrands.indexOf(eachBrand),1);
    }
  }
  const updateFilteredCategories=(eachCategory,index)=>{
    let categoryInput=document.getElementById(eachCategory+index+"category");
    if(categoryInput.checked && !filteredCategories.includes(eachCategory)){
        filteredCategories.push(eachCategory);      
    }
    else if(filteredCategories.includes(eachCategory)){    
        filteredCategories.splice(filteredCategories.indexOf(eachCategory),1);
    }
  }

  const applyFilters=()=>{
    Axios.post(`${process.env.REACT_APP_BASE_URL}/filterproducts`,{price:maxPriceVal,brands:filteredBrands,categories:filteredCategories})
    .then((res)=>{
      if(res.data.success){
        setProductList(res.data.product);
      }
      else{
        console.log("Eror in fitering");
      }
    })
    .catch(()=>console.log("Eror in filter products"))
  }
  const clearFilters=()=>{
    const allBrandsCheckboxs=document.querySelectorAll("#brandFilter input");
    allBrandsCheckboxs.forEach((eachBrandInput,index)=>{
        if(eachBrandInput.checked && filteredBrands.includes(eachBrandInput.value)){
           eachBrandInput.checked=false;
           filteredBrands.splice(filteredBrands.indexOf(eachBrandInput.value),1);
        }   
    })
    const allCategoriesCheckboxs=document.querySelectorAll("#categoryFilter input");
    allCategoriesCheckboxs.forEach((eachCategoryInput,index)=>{
        if(eachCategoryInput.checked && filteredCategories.includes(eachCategoryInput.value)){
          eachCategoryInput.checked=false;
          filteredCategories.splice(filteredCategories.indexOf(eachCategoryInput.value),1);
        }   
    })

    let price=document.getElementById("price");
    price.value=maxPrice;
    setMaxPriceVal(maxPrice);
    setRunEffect(effectRun+1);
  }

  return (
    <div className='sideFilter' id='sideFilter'>
      <div className="sideFilterBar" id='sideFilterBar'>
        <div className="sideFilterHead">Fitered By</div>
        <span className="closeFilterBtn" onClick={closeSideFilter}></span>
        <form className="sideFilterContent">
            <div className="eachFilter" id="brandFilter">
              <div className="filterHead">Brands</div>
              {
                isLoadingProducts &&
                <> 
                   <Skeleton height={20} width={170}/>
                   <Skeleton height={20} width={170}/>
                   <Skeleton height={20} width={170}/>
                   <Skeleton height={20} width={170}/>
                </>
              }
             
              {!isLoadingProducts && brands && brands.map((eachBrand,index)=>{
                return(
                <div key={index}>
                 <input type="checkbox" name={eachBrand+index} id={eachBrand+index} value={eachBrand} onChange={()=>{updateFilteredBrands(eachBrand,index)}}/> 
                 <label htmlFor={eachBrand+index}>{eachBrand}</label>
                </div>
                ) 
              })}
            </div>
            <div className="eachFilter priceFilter">
              <div className="filterHead">Price</div>
              {
                isLoadingProducts?
                <> 
                   <Skeleton height={20} width={200}/>
                </>:
                <div>
               <span className="minPrice">Rs.{minPrice}</span> 
               <input type="range" name="price" id="price" min={minPrice} max={maxPrice} defaultValue={maxPrice} onChange={(e)=>{setMaxPriceVal(e.target.value)}}/> 
               <span className="maxPrice">Rs.{maxPriceVal===0?maxPrice:maxPriceVal}</span> 
                </div>
              }
            </div>
            <div className="eachFilter" id="categoryFilter">
              <div className="filterHead">Category</div>
              {
                isLoadingProducts &&
                <> 
                   <Skeleton height={20} width={170}/>
                   <Skeleton height={20} width={170}/>
                   <Skeleton height={20} width={170}/>
                   <Skeleton height={20} width={170}/>
                </>
              }
              {!isLoadingProducts && categories && categories.map((eachCategory,index)=>{
                return (
                 <div key={index}>
                  <input type="checkbox" name={eachCategory+index+"category"} id={eachCategory+index+"category"} value={eachCategory} onChange={()=>{updateFilteredCategories(eachCategory,index)}}/> 
                  <label htmlFor={eachCategory+index+"category"}>{eachCategory}</label>
                 </div>
                )
              })}
            </div>
        </form>
      </div>
      <span className='sideFilterOverlay' id='sideFilterOverlay' onClick={closeSideFilter}></span>
      <div className="sideFilterBtns" id='sideFilterBtns'>
              <button className='eachFilterBtn' id='clearFilterBtn' type='button' onClick={clearFilters}>Clear All</button>
              <button className='eachFilterBtn' id='applyFilterBtn' type='button' onClick={applyFilters}>Apply Filters</button>
      </div>
    </div>
  )
}

export default SideFilters