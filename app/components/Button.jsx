import React from 'react'
import { BiRightArrowAlt } from "react-icons/bi";
const Button = () => {
  return (
    <div className='flex items-center button'>
        {/* <button className=' text-2xl  rounded-3xl  font-3xl  p-2  z-1  '>Shop Now </button> */}
        <button className="mt-3 px-4 py-2 bg-red-700 text-white font-bold ">
                Shop Now 
              </button><BiRightArrowAlt size={22} className='icons'/>
    </div>
  )
}

export default Button