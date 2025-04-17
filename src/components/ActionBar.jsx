import React from 'react'
import SearchBar from './SearchBar'
import SortBy from './SortBy'
import Button from './Button'
import { FaSortAmountDown } from "react-icons/fa";

const ActionBar = () => {
    return (
        <div className='flex p-3 items-center space-x-3 bg-white rounded-t-lg '>
            <SearchBar placeholder="Search by Title, Author"/>
            <div className='h-full flex'>
                <Button className="bg-br-gray-dark text-lg text-black font-bold px-3 py-1 rounded-lg transition duration-200 w-28 h-full flex items-center justify-between space-x-1">Sort By <FaSortAmountDown /></Button>
            </div>
        </div>
    )
}

export default ActionBar