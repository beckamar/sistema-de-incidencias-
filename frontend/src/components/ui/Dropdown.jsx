import React from "react";

const Dropdown = ({ label, options, onChange }) => {
    return (
        <div>
            <select
                className="custom-select inline-flex w-full h-10 items-center justify-between rounded-md bg-white px-3 text-xs font-normal text-gray-500 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 h-9 sm:h-9 md:h-10 lg:h-11 xl:h-12 md:text-sm lg:h-12 lg:text-base"
                onChange={onChange} defaultValue=""
            >
                <option  value="" disabled hidden>{label}</option>
                {options.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.nombre}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;