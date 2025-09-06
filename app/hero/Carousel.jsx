"use client";
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Carousel = ({images}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000, 
         adaptiveHeight: true,
        responsive:[
            {
                breakpoint:1024,
                settings:{
                    slidesToShow:2,
                    slidesToShow:1
                }
            },
            {
                breakpoint:600,
                settings:{
                    slidesToShow:1,
                    slidesToScroll:1
                }
            },
        ]   
       
      };
  return (
    <div className="w-full">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img src={img.url} alt={`Banner-${index + 1}`} className="w-full h-[480px]"/>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Carousel