import React, {useState, useCallback} from 'react'
import Button from './Button'
import debounce from 'lodash/debounce';

const SearchBar = ({ placeholder, onSearch }) => {
    const [input, setInput] = useState("");

    // Debounce search to avoid too many API calls
    const debouncedSearch = useCallback(
        debounce((searchValue) => {
            onSearch(searchValue);
        }, 500),
        [onSearch]
    );

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);
        debouncedSearch(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(input); 
    };

    return (
        <form onSubmit={handleSubmit}
        className="flex items-center bg-white text-black  border border-br-gray-dark rounded-lg overflow-hidden text-lg font-bold w-full h-full">
            <input
                type="text"
                placeholder={placeholder}
                value={input}
                onChange={handleChange}
                className="w-full px-3 focus:outline-none"
            />
            <Button type="submit" className="bg-br-gray-dark px-3 py-1 transition duration-200">Search</Button>
        </form>

    )
}

export default SearchBar