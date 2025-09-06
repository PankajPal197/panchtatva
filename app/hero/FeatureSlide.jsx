"use client";
import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { fetchCategory } from "../store/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const FeatureSlide = () => {
  const dispatch = useDispatch();
  const { data: featureCategory, loading } = useSelector(
    (state) => state.category
  );
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);
  const featureProd = featureCategory.filter(
    (cat) =>
      cat.status === "active" &&
      cat.sort_order > 1 &&
      cat.delete_status === "active"
  );
  if (loading || !featureProd) return <div>Loading...</div>;
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
            <Link href={item.page_url}>
            <div className="bg-white h-20 card hover:shadow-xl p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-white flex items-center justify-center">
                  <img
                    src={item.image_name_1}
                    alt={item.category_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-red-900 text-sm font-semibold">
                    BIG RANGE OF
                  </span>
                  <h3 className="fs-6 fw-bold font-bold">
                    {item.category_name}
                  </h3>
                  {/* <span className="text-purple-500">{item.offer}</span> */}
                </div>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeatureSlide;
