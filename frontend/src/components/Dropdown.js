import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";


const Dropdown = ({label, options, selected, onSelect,}) => {
    console.log("Options dentro de drop:", options);
    return (
        <Menu as="div" className="relative inline-block text-left w-full">

            <div>
                <MenuButton className="inline-flex w-full h-10 items-center justify-between rounded-md bg-white px-3 py-2 text-sm font-normal text-gray-600 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                    {selected || label}
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>
            </div>
        
            <MenuItems transition className="absolute right-0 z-10 mt-1 w-60 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                <div className="py-1"> {options.map((element) =>(
                    <MenuItem key={element.id_rol}>
                        <button type="button" onClick={()=> onSelect(element.id_rol)} className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                            {element.nombre_rol}
                        </button>
                    </MenuItem>
                ))}
                </div>
            </MenuItems>
        </Menu>
    ); 
};

export default Dropdown;