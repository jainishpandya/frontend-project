import React from 'react';
import { FaBell } from "react-icons/fa";

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-white text-black px-6 py-4 rounded-[var(--br-radius)]">
      <div className="text-2xl font-bold">Helios Reading Club</div>
      <div className="flex items-center space-x-6">
        <div className="cursor-pointer hover:text-gray-400"><FaBell /></div>
        <div className="cursor-pointer hover:text-gray-400"><img 
            src="src\assets\profile.jpg"
            alt="Profile" 
            className="w-8 h-8 rounded-full"
          /></div>
      </div>
    </div>
  );
};

export default Header;