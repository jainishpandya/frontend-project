import { useState } from "react";
import { ChevronDown } from "lucide-react"; // Optional icon

const ClubDropdown = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const options = [
    { label: "Helios Reading Club", role: "Member", value: " " },
    { label: "ISCON Heights Readers", role: "Club Admin", value: " " },
  ];

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <div className="relative w-full max-w-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border bg-white border-gray-300 rounded-lg px-4 py-3 text-left text-navyblue font-semibold flex justify-between items-center"
      >
        {selected ? selected.label : "Select a club"}
        <ChevronDown className="h-5 w-5 text-navyblue" />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className="px-4 py-3 cursor-pointer hover:bg-lightblue transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-navyblue">
                  {option.label}
                </span>
                <span className="text-sm text-gray-500">{option.role}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClubDropdown;
