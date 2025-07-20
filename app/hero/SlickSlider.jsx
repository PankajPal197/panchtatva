"use client";
import Image from 'next/image'
import React, { useState } from 'react'
import Slider from 'react-slick'

const SlickSlider = ({slides}) => {
    const [hoveredIndex, setHoveredIndex]=useState(null)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: true,
        responsive: [
          {
            breakpoint: 1024, // Large screens
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768, // Tablets
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480, // Mobile
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
  return (
    <div className="w-full mx-auto px-4">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="overflow-hidden rounded-lg m-3 shadow-2xl">
              <Image
                src={slide.image}
                alt={slide.title}
                width={400}
                height={150}
                className="rounded-lg transition-transform duration-300 group-hover:scale-105 w-full h-auto"
              />
            </div>
            {hoveredIndex === index && (
              <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center text-white text-xl font-bold rounded-lg transition-opacity duration-300">
                {slide.title}
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default SlickSlider