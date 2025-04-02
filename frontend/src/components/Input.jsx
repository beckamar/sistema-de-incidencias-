import React from 'react'

export const Input = ({type = "text", placeholder = "", value, onChange, className="", ...props}) => {
  return (

    <input 
      type={type} 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`h-10 rounded-md bg-white px-3 text-xs font-normal text-gray-500 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:h-9 md:h-10 lg:h-11 xl:h-12 md:text-sm lg:h-12 lg:text-base focus:outline-none 
                ${className}`} {...props}/>
  );
}
