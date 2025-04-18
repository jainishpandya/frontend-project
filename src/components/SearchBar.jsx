import React from 'react'
import Button from './Button'

const SearchBar =({placeholder}) => {
    return (
        <div className="flex items-center bg-white text-black  border border-br-gray-dark rounded-lg overflow-hidden text-xl font-bold w-full h-full">
            <input type="text" placeholder={placeholder} className="w-full px-3 focus:outline-none" />

            <Button className="bg-br-gray-dark px-3 py-1 transition duration-200">Search</Button>

        </div>

    )
}

export default SearchBar