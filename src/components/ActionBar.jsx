import React, { useState } from 'react'
import SearchBar from './SearchBar'
import SortBy from './SortBy'
import Button from './Button'
import { FaSortAmountDown } from "react-icons/fa";

const ActionBar = ({ onSearch ,onSort, currentSort}) => {
    const [isSortByOpen, setIsSortByOpen] = useState(false);

    const handleSortClick = () => {
        setIsSortByOpen(!isSortByOpen);
    };

    const handleSortClose = (sortValue) => {
        if (sortValue) {
            onSort(sortValue);
        }
        setIsSortByOpen(false);
    };

    return (
        <div className='relative'>
            <div className='flex p-3 items-center space-x-3 bg-white rounded-t-[var(--br-radius)]'>
                <SearchBar
                    placeholder="Search by Title, Author"
                    onSearch={onSearch}
                />
                <div className='relative h-full flex-none'>
                    <Button
                        className="bg-br-gray-dark text-lg text-black font-bold px-3 py-1 rounded-lg transition duration-200 w-28 h-full flex items-center justify-between space-x-1"
                        onClick={handleSortClick}
                    >
                        <span className="flex-none">Sort By</span>
                        <FaSortAmountDown className="flex-none" />
                    </Button>

                    {isSortByOpen && (
                        <>
                            <div className="right-0 w-auto absolute top-full mt-4 z-50 bg-white shadow-lg rounded-lg">
                                <SortBy onClose={handleSortClose} initialSort={currentSort} />
                            </div>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={handleSortClick}
                            ></div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActionBar