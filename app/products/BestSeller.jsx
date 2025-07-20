"use client";
import Image from "next/image";
import React from "react";
import { CiStar } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { TbRefresh } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa";
import Slider from "react-slick";
import { motion } from "framer-motion";

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const innerSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
     autoplay: true,
    autoplaySpeed: 1500,
  };
const BestSeller = ({ products }) => {
  return (
    <div className="p-tb-60 mt-3 ">
      <div className="title mb-3">
        <h2>Best Seller</h2>
      </div>
      <Slider {...settings}>
        {products.map((product, index) => (
          <motion.div
            key={index}
            className="col-md-4 card p-3  mr-2 slider bg-white shadow-lg rounded-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div className="slider-image w-1/2">
                <Slider {...innerSliderSettings}>
                  {product.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Product ${idx}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  ))}
                </Slider>
              </div>

              <div className="prod-detail w-1/2 pl-4">
                <span className="text-dark font-bold">{product.brand}</span>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="desc text-gray-600">{product.desc}</p>
                
                <ul className="flex items-center justify-start mt-2 text-yellow-500">
                  {[...Array(5)].map((_, starIdx) => (
                    <li key={starIdx}>
                      <CiStar className={starIdx < product.rating ? "text-yellow-500" : "text-gray-300"} />
                    </li>
                  ))}
                </ul>

                <div className="mt-2">
                  <span className="text-green-600 font-bold">₹{product.price}</span>{" "}
                  <span className="text-gray-400 line-through">₹{product.discountPrice}</span>
                </div>

                <div className="mt-3">
                  <span>Available items: {product.stock}</span>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-2 bg-amber-400 rounded-full"
                      style={{ width: `${(product.stock / product.totalStock) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-4 flex items-center space-x-4 text-gray-600 text-lg">
                  <FaRegHeart className="cursor-pointer hover:text-red-500" />
                  <TbRefresh className="cursor-pointer hover:text-blue-500" />
                  <FaRegEye className="cursor-pointer hover:text-green-500" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
};

export default BestSeller;
