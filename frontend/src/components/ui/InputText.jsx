import React, { useState } from 'react'

export const InputText = ({maxWords = 50, placeholder = "", onChange, value, className, ...props}) => {
  const [inputValueText, setInputValueText] = useState(value || "");
  const [showWarning, setShowWarning] = useState(false);

  const handleChange = (e) => {
    const text = e.target.value;
    setInputValueText(text);

    const words = text.trim().split(/\s+/).filter(Boolean).length;
    setShowWarning(words > maxWords);

    if (onChange) onChange(e);
  };
  const wordCount = inputValueText.trim().split(/\s+/).filter(Boolean).length;

  
return (

    <div className={`w-full ${className}`}>
    <textarea
    value={value || inputValueText}
    onChange={handleChange}
    placeholder={placeholder}
    className={`
        w-full min-h-[100px] 
        p-3 rounded-lg border-2
        text-xs font-normal text-gray-500
        md:text-sm focus:outline-none
          ${showWarning}`}{...props}
    />
      <div className={`mt-1 text-xs sm:text-sm ${
        showWarning ? "text-red-600" : "text-gray-500"
      }`}>
        {`Palabras: ${wordCount}/${maxWords}`} 
        {showWarning && (
          <span className="block font-medium">
            Límite excedido
          </span>
        )}
      </div>
    </div>
  );
};
