import React from "react";

const Dropdown = ({ label, options, onChange }) => {
    return (
        <div>
            <select
                className="custom-select inline-flex w-full h-7 items-center justify-between rounded-md bg-white px-3 text-xs font-normal text-gray-500 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 "
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