import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const products = [
    { id: 1, name: "Product 1", img: "/banner/sub-banner-01.jpg" },
    { id: 2, name: "Product 2", img: "/banner/sub-banner-02.jpg" },
    { id: 3, name: "Product 3", img: "/banner/sub-banner-03.jpg" },
    { id: 4, name: "Product 4", img: "/banner/sub-banner-03.jpg" },
    { id: 4, name: "Product 4", img: "/banner/sub-banner-03.jpg" },
  ];
const NewProducts = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow:3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow:2,
              slidesToScroll: 1,
            },
          },
        ],
      };
  return (
    <div className="p-tb-60 pt-3">
      <div className="title mb-3">
        <h2 className="text-2xl font-bold ">New Products</h2>
      </div>
      <Slider {...settings}>
        {products.map((item) => (
          <div key={item.id}>
            <div className="h-34 w-34  mb-2 transition-all duration-300">
              <div className="image overflow-hidden rounded-full">
                <img
                  src={item.img}
                  alt={item.name}
                  className="rounded-full w-32 h-32 object-cover transform hover:scale-110 transition-all duration-300"
                />
              </div>
              <div className="product-name mt-2 ml-6 font-semibold text-lg">
                {item.name}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default NewProducts