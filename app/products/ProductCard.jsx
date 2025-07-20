"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiStar } from "react-icons/ci";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./product.min.css";
import FestProduct from "./FestProduct";
import BestSeller from "./BestSeller";
import NewProducts from "./NewProducts";
const products = [
  {
    id: 1,
    brand: "Trendyzone",
    name: "Lesh Sensation Wash",
    image: "/slider/slider1.jpg",
    link: "/product/product-details.html",
    rating: 5,
  },
  {
    id: 2,
    brand: "Trendyzone",
    name: "Aromatic Body Wash",
    image: "/slider/slider1.jpg",
    link: "/product/product-details.html",
    rating: 4,
  },
  {
    id: 3,
    brand: "Trendyzone",
    name: "Luxury Face Cream",
    image: "/slider/slider1.jpg",
    link: "/product/product-details.html",
    rating: 5,
  },
  {
    id: 4,
    brand: "Trendyzone",
    name: "Organic Hair Oil",
    image: "/slider/slider1.jpg",
    link: "/product/product-details.html",
    rating: 4,
  },
  {
    id: 5,
    brand: "Trendyzone",
    name: "Glow Night Serum",
    image: "/slider/slider1.jpg",
    link: "/product/product-details.html",
    rating: 5,
  },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1 },
    },
  ],
};
const cardsData = [
  { brand: "Hair Marks",name:"Shiny & Nourished",image:'/banner/sub-banner-01.jpg' },
  { brand: "New Arrivals",name:"Makeup Brush",image:'banner/sub-banner-02.jpg' },
  { brand: "Glow & Shine",name:'Nature Skil Glow',image:'banner/sub-banner-03.jpg' },
];

const productsData = [
  {
    brand: "Hair Marks",
    name: "Shampoo Pro",
    desc: "Best for silky smooth hair",
    rating: 4,
    price: 200,
    discountPrice: 249,
    stock: 10,
    totalStock: 50,
    images: ["/banner/sub-banner-01.jpg", "/banner/sub-banner-02.jpg"],
  },
  {
    brand: "Glow & Shine",
    name: "Face Cream",
    desc: "Brightening & Nourishing",
    rating: 5,
    price: 800,
    discountPrice: 350,
    stock: 100,
    totalStock: 500,
    images: ["/banner/sub-banner-03.jpg", "/slider/slider1.jpg"],
  },
  {
    brand: "Glow & Shine",
    name: "Face Cream",
    desc: "Brightening & Nourishing",
    rating: 5,
    price: 100,
    discountPrice: 350,
    stock: 50,
    totalStock: 500,
    images: ["/banner/sub-banner-03.jpg", "/slider/slider1.jpg"],
  },
];
const ProductCard = () => {
  return (
    <>
     <div className="bg-white rounded-2xl p-tb-60">
      <h2 className="text-xl">Featured Products</h2>
      <Slider {...settings} className="">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="p-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="rounded-lg hover:shadow-2xl product">
              <span className="text-gray-400">{product.brand}</span>
              <Link href={product.link}>
                <h3 className="fs-6 font-bold hover:text-red-950 transition">
                  {product.name}
                </h3>
              </Link>
              <ul className="flex items-center mt-1">
                {Array.from({ length: product.rating }, (_, i) => (
                  <li key={i} className="text-yellow-500">
                    <CiStar size={24} />
                  </li>
                ))}
              </ul>
              <div className="image mt-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-60 object-cover rounded-lg"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </Slider>
    </div>

<div>
<FestProduct cards={cardsData}/>
</div>

<div className="mb-3">
<BestSeller products={productsData}/>
</div>
<div className="mb-3">
<NewProducts/>
</div>

    </>
   

  );
};

export default ProductCard;
