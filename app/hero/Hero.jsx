"use client";
import React, { useEffect } from "react";
import Carousel from "./Carousel";
import Card from "../card/Card";
import AnimatedCard from "./AnimatedCard";
import FeatureSlide from "./FeatureSlide";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanner } from "../store/slices/bannerSlice";
const Hero = () => {
  const dispatch = useDispatch();
  const { data: banners } = useSelector((state) => state.homeBanner);
  useEffect(() => {
    dispatch(fetchBanner());
  }, [dispatch]);
  const images = banners
    .filter((banner) => banner.status === "active")
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((banner) => ({
      url: `${banner.image_name}`,
    }));

  return (
    <>
      <div className="hero-section">
        <div className="p-tb-60">
          <div className="row">
            <div className="col-lg-3 d-none d-lg-block mt-3">
              <div className="w-full">
                <AnimatedCard
                  title="Radha Rani"
                  subTitle="Radha Rani"
                  image="/radhaRani.jpeg"
                />
              </div>
            </div>
            <div className="col-lg-6 mt-3 mb-3">
              <Carousel images={images} />
            </div>
            <div className="col-lg-3 mt-3 d-none d-lg-block">
              <div className="w-full">
                <AnimatedCard
                  title="kanha Shringer "
                  subTitle="Kanha Shringar"
                  image="/shringar.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <FeatureSlide />
      </section>
    </>
  );
};

export default Hero;
