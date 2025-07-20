import Link from "next/link";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO & Founder",
    image: "/slider/slider1.jpg",
    feedback:
      "Duis faucibus enim vitae nunc molestie, arcu facilisis arcu. Nullam mattis bibendum nec arcu.",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Marketing Head",
    image: "/slider/slider2.jpg",
    feedback:
      "Vestibulum nec diam nisl. Sed bibendum, odio ac consequat commodo, dui libero tempor.",
  },
  {
    id: 3,
    name: "David Williams",
    role: "Lead Developer",
    image: "/slider/slider2.jpg",
    feedback:
      "Integer bibendum odio ac sapien tincidunt, at sagittis lacus gravida. Duis faucibus enim vitae.",
  },
];

const Testimonial = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    vertical: true, 
    verticalSwiping: true,
    fade: false,
    cssEase: "ease-in-out",
  };
  return (
    <div className="p-tb-60 pt-3 mb-3">
      <div className="mb-6">
        <h2 className="text-lg font-semibold uppercase">Testimonials</h2>
      </div>
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="lg:w-3/4">
          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-3">
                <div className="flex items-center gap-4 bg-white shadow-lg rounded-xl p-3 hover:shadow-2xl transition-all duration-500">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 hover:scale-110 transition-all duration-500"
                  />
                  <div>
                    <h3 className="text-md font-semibold">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                  <div className="mt-2 p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-500">
                  <p className="text-sm text-gray-600">
                    {testimonial.feedback}
                  </p>
                </div>
                </div>
               
              </div>
            ))}
          </Slider>
        </div>
        <div className="lg:w-1/4 flex flex-col items-center justify-center mt-6 lg:mt-0">
          <div className="bg-blue-600 text-white p-4 w-full text-center rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-500 cursor-pointer">
            Contact Us
          </div>
          <div className="bg-green-500 text-white p-4 w-full text-center rounded-lg shadow-lg hover:bg-green-600 transition-all duration-500 cursor-pointer mt-3">
            WhatsApp
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
