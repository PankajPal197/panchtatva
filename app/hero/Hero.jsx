"use client";
import React from "react";
import Carousel from "./Carousel";
import Card from "../card/Card";                                                                                                                                                      
import AnimatedCard from "./AnimatedCard";
import FeatureSlide from "./FeatureSlide";
// import SlickSlider from "./SlickSlider";
const Hero = () => {
  const images = [
    { url: "/slider/slider1.jpg" },
    { url: "/slider/slider2.jpg" },
    { url: "/slider/slider2.jpg" },
    { url: "/slider/slider2.jpg" },
  ];
  const slideData = [
    { title: "Slide 1", image: "/slider/slider1.jpg" },
    { title: "Slide 2", image: "/slider/slider2.jpg" },
    { title: "Slide 3", image: "/slider/slider1.jpg" },
    { title: "Slide 4", image: "/slider/slider2.jpg" },
    { title: "Slide 5", image: "/slider/slider1.jpg" },
  ];
  return (
    <>
      <div className="hero-section">
      <div className="p-tb-60">
        <div className="row">
          <div className="col-lg-3 d-none d-lg-block mt-3"><div className="w-full">
              <AnimatedCard
                title="Almay Lipstick"
                subTitle="New Arrivals"
                image="/slider/lipstick.jpg"
              />
            </div>
            </div>
          <div className="col-lg-6 mt-3 mb-3">
            <Carousel images={images} width={100} />
          </div>
          <div className="col-lg-3 mt-3">
            <div className="w-full">
              <AnimatedCard
                title="Almay Lipstick1 "
                subTitle="New Arrivals"
                image="/slider/lipstick.jpg"
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
