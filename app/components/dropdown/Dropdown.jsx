import React from 'react'
import Link from "next/link";

const Dropdown = ({menuItems,menuName}) => {
  return (
    <>
    <div className="relative inline-block group">
            {menuName}
            <div className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            {menuItems.map((item,index)=>(
              <Link 
              key={index}
              href={item.link}
               className="text-gray-700 hover:bg-gray-200 px-4 py-2 block"
               >
                 {item.label}
               </Link>

            ))}
            </div>
          </div>
    </>
  )
}

export default Dropdown