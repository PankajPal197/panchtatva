"use client";
import React from "react";
import { motion } from "framer-motion";
import "./hero.min.css";
const AnimatedCard = ({ title, subTitle, image }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full  rounded-2xl shadow-lg  cursor-pointer hover:shadow-2xl"
    >
      <div className="w-full max-h-88">
        <img
          src={image}
          alt={title}
          className="w-full h-89 object-cover rounded-lg z-10"
        />
        <div className="animation-card">
          <span className="text-white mt-2 ">{subTitle}</span>
          <h3 className="text-white text-xl-1 font-bold mt-1">{title}</h3>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedCard;
