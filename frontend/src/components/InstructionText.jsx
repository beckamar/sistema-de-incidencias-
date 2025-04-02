import React from 'react'

export const InstructionText = ({label, className}) => {
  return (
    <span className={`font-normal text-gray-900 text-xs sm:text-sm md:text-base mb-2 sm:mb-3 md:mb-4 overflow-hidden text-ellipsis whitespace-nowrap ${className || ''}`}>
      {label}
    </span>
  )
}
