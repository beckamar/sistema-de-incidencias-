import React from 'react';

const CheckBoxFilter = ({ options, selectedValue, onChange, label, disabled = false }) => {
  return (
    <div className={`flex flex-col min-w-min max-h-[80vh] overflow-y-auto border rounded-lg ${disabled ? 'opacity-60 pointer-events-none' : ''}`}>
      {label && (
        <div className="text-sm font-medium mb-1 sticky top-0 bg-white py-1 z-10">
          {label}
        </div>
      )}
      <div className="flex flex-col space-y-0.5">
        {options.map((item) => (
          <label
            key={item.id}
            className={`flex items-center gap-1.5 px-1 py-0.5 rounded cursor-pointer`}
          >
            <input
              type="checkbox"
              checked={selectedValue === item.id}
              onChange={() => {
                if (selectedValue === item.id) {
                  onChange(null);
                } else {
                  onChange(item.id);
                }
              }}
              className="form-checkbox text-blue-600 w-4 h-4"
              disabled={disabled}
            />
            <span className="text-sm truncate">{item.nombre}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckBoxFilter;