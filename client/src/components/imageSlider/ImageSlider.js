import React from 'react'
// import "../index.css"
import "./imageSlider.css";




const ImageSlider = () => {
  let marginLeft = 0;
  const nextImage = () => {
    let firstImg = document.getElementById("first-img");
    if (marginLeft === 0) {
      marginLeft = 400;
    }
    firstImg.style.marginLeft = `-${marginLeft - 100}%`;
    marginLeft = marginLeft - 100;
  }
  const prevImage = () => {
    let firstImg = document.getElementById("first-img");
    if (marginLeft === 300) {
      marginLeft = -100;
    }
    firstImg.style.marginLeft = `-${marginLeft + 100}%`
    marginLeft = marginLeft + 100;
  }

  const btn1Func = () => {
    let firstImg = document.getElementById("first-img");
    firstImg.style.marginLeft = "0%";
  }
  const btn2Func = () => {
    let firstImg = document.getElementById("first-img");
    firstImg.style.marginLeft = "-100%";
  }
  const btn3Func = () => {
    let firstImg = document.getElementById("first-img");
    firstImg.style.marginLeft = "-200%";
  }
  const btn4Func = () => {
    let firstImg = document.getElementById("first-img");
    firstImg.style.marginLeft = "-300%";
  }
  return (
    <div className="imageSlider">
        <div className="prenextBtns">
            <button id="prevBtn" onClick={nextImage}><i className="fa fa-chevron-left"></i></button>
            <button id="nextBtn" onClick={prevImage}><i className="fa fa-chevron-right"></i></button>
        </div>
        <div className="navBtns">
            <div id="navBtn1" onClick={btn1Func}></div>
            <div id="navBtn2" onClick={btn2Func}></div>
            <div id="navBtn3" onClick={btn3Func}></div>
            <div id="navBtn4" onClick={btn4Func}></div>
        </div>
        <div className="images">
            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/AugART/Acq/PEAdayof/PC_Hero_3000x1200_ft._CB599318118_.jpg" className="eachSlide" id="first-img" alt=""/>
            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/IN/OHL/GW/August/PC_hero_1_2x._CB599488352_.jpg" className="eachSlide" alt=""/>
            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Shreyansh/BAU/Unrexc/D70978891_INWLD_BAU_Unrec_Uber_PC_Hero_3000x1200._CB594707876_.jpg" className="eachSlide" alt=""/>
            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Toys/GW/0-PC_Hero_2x._CB594150943_.jpg" className="eachSlide" alt=""/>
        </div>
    </div>
  )
}

export default ImageSlider