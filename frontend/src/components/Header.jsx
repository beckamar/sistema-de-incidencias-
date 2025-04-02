import React from "react";
import { FaArrowLeft } from 'react-icons/fa'; 

const Header = ({onBack, label, showBackButton}) => {
    return(
        <header className="w-full bg-primary sticky top-0 z-10 p-3 flex justify-center items-center relative ">
            {showBackButton && (
                <button onClick={onBack}  className="text-white absolute left-5 sm:left-7"><FaArrowLeft /></button>
            )}
            <span className="text-white font-medium text-sm sm:text-base md:text-lg">{label}</span>
        </header>
    );
};

export default Header;