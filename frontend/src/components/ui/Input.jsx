import React from 'react'

export const Input = ({type = "text", placeholder = "", value, onChange, className="", ...props}) => {
  return (

    <input 
      type={type} 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`h-10 rounded-md bg-white px-3 text-xs font-normal text-gray-500 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 md:text-sm focus:outline-none 
                ${className}`} {...props}/>
  );
}
