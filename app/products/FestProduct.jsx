"use client";
import React from 'react'
import Button from '../components/Button'
import { motion } from "framer-motion";
const FestProduct = ({cards}) => {
  return (
    <div className="p-tb-60">
    <div className="row">
      {cards.map((item, index) => (
        <motion.div
          key={index}
          className="col-md-4 mt-3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="card shadow-2xl  rounded-3xl bg-sky-950 text-white"
            style={{
                backgroundImage: `url(${item.image_name_1})`,
                minHeight: "220px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                backgroundSize: "cover",
                backgroundRepeat:"no-repeat",
                backgroundPosition: "center",
              }}
          >
            <div className="absolute left-1 pl-1">
              <span >{item.brand}</span>
              <h3 className=''>{item.category_name}
              </h3>
              <Button />
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  </div>
  )
}

export default FestProduct