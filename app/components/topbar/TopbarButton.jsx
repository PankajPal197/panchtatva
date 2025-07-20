import React from 'react'
import { FaBars } from "react-icons/fa";
const TopbarButton = () => {
  return (
    <div className='group'>
        <button type='button' className='text-white topbar-btn flex items-center'><FaBars size={22} className='mr-1 text-2xl font-bold transition-transform group-hover:rotate-y-180  duration-500 '/> Shop by Categories</button>
    </div>
  )
}

export default TopbarButton