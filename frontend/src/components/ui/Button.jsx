import React from "react";

const Button = ({type = "button", children, className}) => {
    return (
        <button  type={type} className={`btn-primary w-full mt-4 sm:mt-5 h-9 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base font-semibold flex items-center justify-center active:bg-green-400 transition-colors duration-200 ${className}`}>
            {children}
        </button>
    );
};

export default Button;