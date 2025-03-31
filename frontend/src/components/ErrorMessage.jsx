import React from "react";

const ErrorMessage = ({error}) => {
    if (!error) return null;
    return (    
    <div className="mb-2 sm:mb-3 md:mb-4 pt-2 text-xs sm:text-sm md:text-base text-red-400">
        {error}
    </div>);
};
export default ErrorMessage;