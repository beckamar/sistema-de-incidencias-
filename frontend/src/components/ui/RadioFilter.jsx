import React from 'react';
import { Radio } from "@material-tailwind/react";

const RadioFilter = ({ options, selectedValue, onChange, label }) => {
  return (
    <div className="flex flex-col min-w-min max-h-[80vh] overflow-y-auto border rounded-lg">
      {label && (
        <div className="text-sm font-medium mb-1 sticky top-0 bg-white py-1 z-10">
          {label}
        </div>
      )}
      <div className="flex flex-col space-y-0.5">
        {options.map((item) => (
          <label
            key={item.id}
            className={`flex items-center gap-1.5 px-1 py-0.5 rounded `}
          >
            <Radio
              color="blue"
              checked={selectedValue === item.id}
              onChange={() => onChange(item.id)}
              value={item.id}
              ripple={false}
              className="h-4 w-4"
              containerProps={{ className: "p-1" }}
            />
            <span className="text-xs truncate">{item.nombre}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioFilter;
