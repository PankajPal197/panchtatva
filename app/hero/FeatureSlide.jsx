"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const featureProd = [
  { id: 1, offer: "Up To 20% Off", name: "Natural Spa", img: "/slider/slider1.jpg" },
  { id: 2, offer: "Up To 30% Off", name: "Herbal Care", img: "/slider/slider2.jpg" },
  {
    id: 3,
    offer: "Up To 15% Off",
    name: "Relax Therapy    ",
    img: "/slider/slider1.jpg",
  },
  {
    id: 4,
    offer: "Up To 25% Off",
    name: "Aroma Therapy",
    img: "/slider/slider1.jpg",
  },
];
const FeatureSlide = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="bg-gray-100 p-tb-60 mt-10">
      <Slider {...settings}>
        {featureProd.map((item) => (
          <div key={item.id} className="p-3">
            <div className="bg-white h-20 card hover:shadow-xl p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-white flex items-center justify-center">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-red-900 text-sm font-semibold">
                    BIG RANGE OF
                  </span>
                  <h3 className="fs-6 fw-bold font-bold">{item.name}</h3>
                  <span className="text-purple-500">{item.offer}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeatureSlide;
