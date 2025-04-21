import React from 'react';
import { FaBell } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Header = ({ setActiveOption }) => {
  const profileImage = useSelector((state => state.user.profile_image))
  console.log(useSelector(state => state.club));
  console.log(useSelector((state) => state.user))
  
  const club_name  = useSelector(state => state.club.club_name)

  return (
    <div className="flex justify-between items-center bg-white text-black px-6 py-4 rounded-[var(--br-radius)]">
      <div className="text-2xl font-bold">{club_name || "Club Name"}</div>
      <div className="flex items-center space-x-6">
        <div className="cursor-pointer hover:text-gray-400"><FaBell /></div>
        <NavLink to="/home/profile" className="cursor-pointer hover:text-gray-400" onClick={() => setActiveOption(null)}>
        <div className="cursor-pointer hover:text-gray-400">
          <img 
            src={profileImage || "src/assets/profile.jpg"}
            alt="Profile" 
            className="w-8 h-8 rounded-full"
          /></div>
          </NavLink>
      </div>
    </div>
  );
};

export default Header;