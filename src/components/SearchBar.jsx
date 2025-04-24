import React from 'react'
import Button from './Button'

const SearchBar = ({searchQuery, setSearchQuery }) => {
    return (
        <div className="flex items-center bg-white text-br-gray-dark border border-br-gray-dark rounded-lg overflow-hidden text-lg font-bold w-full h-full">
            <input
                type="text"
                placeholder='Search by Title, Author'
                value={searchQuery ?? ""}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 focus:outline-none text-sm" />

            <Button className="bg-br-gray-light px-3 py-1 transition duration-200 text-sm py-2">Search</Button>
        </div>

    )
}

export default SearchBar