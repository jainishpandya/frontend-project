import React from 'react'
import Button from './Button'

const SearchBar =({placeholder}) => {
    return (
        <div className="flex items-center bg-white text-black  border border-br-gray-dark rounded-lg text-xl font-bold w-full h-full">
            <input type="text" placeholder={placeholder} className="w-full px-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-500" />

            <Button className="bg-br-gray-dark px-3 py-1 rounded-r-lg transition duration-200">Search</Button>

        </div>

    )
}

export default SearchBar