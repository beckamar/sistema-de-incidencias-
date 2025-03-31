import React from "react";
import { FaArrowLeft } from 'react-icons/fa'; 

const Header = (onBack) => {
    return(
        <header className="w-full bg-primary p-6 sticky top-0 z-10">
            <div className="flex items-center"> 
                <button onClick={onBack}  className="text-white mr-2"><FaArrowLeft /></button>
            </div>
        </header>
    );
};

export default Header;