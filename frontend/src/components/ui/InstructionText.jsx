import React from 'react'

export const InstructionText = ({label, className}) => {
  return (
    <span className={`font-normal text-gray-900 text-xs md:text-sm mb-2 overflow-hidden text-ellipsis whitespace-nowrap ${className || ''}`}>
      {label}
    </span>
  )
}
