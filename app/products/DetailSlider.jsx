"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const DetailSlider = ({ product }) => {
  const images = [
    product.image_name_1,
    product.image_name_2,
    product.image_name_3,
    product.image_name_4,
  ].filter(Boolean); // null/undefined ko hata dega

  const [index, setIndex] = useState(0);

  // Auto slide (every 5 sec)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  if (!images.length) return null;

  return (
    <div className="row">
      {/* Left Thumbnails */}
      <div className="col-md-2">
        <div className="flex flex-col gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`border rounded overflow-hidden ${
                i === index ? "border-red-500" : "border-gray-300"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${i + 1}`}
                width={100}
                height={100}
                className="object-cover"
                style={{ height: "85px", width: "100%" }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Right Main Image */}
      <div className="col-md-10">
        <div className="p-2 rounded-lg shadow">
          <AnimatePresence mode="wait">
            <motion.div
              key={images[index]}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="w-full h-auto"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full h-auto cursor-zoom-in"
                style={{ originX: 0.5, originY: 0.5 }}
              >
                <Image
                  src={images[index]}
                  alt={product.product_name}
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="related top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100"
            >
              <BiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="related top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100"
            >
              <BiChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailSlider;
