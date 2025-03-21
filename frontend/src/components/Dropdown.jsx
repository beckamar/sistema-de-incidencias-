import React from "react";

const Dropdown = ({ label, options, onChange }) => {
    return (
        <div>
            <select
                className="custom-select inline-flex w-full h-10 items-center justify-between rounded-md bg-white px-3 py-2 text-sm font-normal text-gray-600 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                onChange={onChange}
            >
                <option>Selecciona un {label}</option>
                {options.map((item) => (
                    <option value={item.id}>
                        {item.nombre}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;