import React, { useState } from 'react'
import SearchBar from '../SearchBar'
import Button from '../Button'
import { FaSortAmountDown } from "react-icons/fa"
import TuneIcon from '@mui/icons-material/Tune';
import ClubSortBy from './ClubSortBy';

const ClubActionBar = () => {
  const [isSortByOpen, setIsSortByOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSortClick = () => {
    setIsSortByOpen(!isSortByOpen);
  };

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleClose = () => {
    setIsSortByOpen(false);
    setIsFilterOpen(false);
  };

  return (
    <div className='relative'>
      <div className='flex p-3 items-center space-x-3 bg-white rounded-t-[var(--br-radius)]'>
        {/* Search Bar */}
        <div className='flex-grow'>
          <SearchBar
            placeholder="Search by Club Name, Location"
          />
        </div>

        {/* Filter Button */}
        <div className='relative h-full'>
          <Button
            className="bg-br-gray-dark text-lg text-black font-bold px-3 py-1 rounded-lg transition duration-200 w-28 h-full flex items-center justify-between space-x-1"
            onClick={handleFilterClick}
          >
            <span className="flex-none">Filters</span>
            <TuneIcon />
          </Button>
        </div>

        {/* Sort Button */}
        <div className='relative h-full'>
          <Button
            className="bg-br-gray-dark text-lg text-black font-bold px-3 py-1 rounded-lg transition duration-200 w-28 h-full flex items-center justify-between space-x-1"
            onClick={handleSortClick}
          >
            <span className="flex-none">Sort By</span>
            <FaSortAmountDown className="flex-none" />
          </Button>
        </div>
      </div>

      {/* Sort Dropdown */}
      {isSortByOpen && (
        <>
          <div className="right-0 w-auto absolute top-full mt-4 z-50 bg-white shadow-lg rounded-lg">
            <ClubSortBy onClose={handleClose} />
          </div>
          {/* <div
            className="fixed inset-0 z-40"
            onClick={handleClose}
          ></div> */}
        </>
      )}

      {/* Filter Dropdown */}
      {isFilterOpen && (
        <>
          <div className="right-0 w-auto absolute top-full mt-4 z-50 bg-white shadow-lg rounded-lg">
            {/* Add your filter options here */}
          </div>
          <div
            className="fixed inset-0 z-40"
            onClick={handleClose}
          ></div>
        </>
      )}
    </div>
  )
}

export default ClubActionBar