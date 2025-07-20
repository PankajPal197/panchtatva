
import React from 'react'
import { motion } from "framer-motion";
const Card = ({title, description, image}) => {
  return (
    <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="w-80 bg-white rounded-2xl shadow-lg p-5 cursor-pointer hover:shadow-2xl"
  >
    <img src={image} alt={title} className="w-full h-40 object-cover rounded-lg" />
    <h3 className="text-xl font-bold mt-3">{title}</h3>
    <p className="text-gray-600 mt-2">{description}</p>
  </motion.div>
  )
}

export default Card