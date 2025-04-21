import React from 'react'
import Button from './Button'
import { FaStar } from 'react-icons/fa'

const BookCard = () => {
  return (
    <div className="bg-white rounded-[var(--br-radius)] p-4 hover:shadow-lg transition-shadow duration-300 h-fit border border-br-gray-light hover:cursor-pointer">
       <div className="aspect-[3/4] w-full mb-4 h-50 flex items-center justify-center">
        <img 
          src="https://m.media-amazon.com/images/I/51JpsvCaWTL._SY445_SX342_.jpg" 
          alt="Book Cover" 
          className="w-auto h-full object-contain rounded-sm" 
        />
      </div>
      
      <div className="space-y-2">
        <h1 className="font-bold text-lg ">Book Title That Might Be Long</h1>
        
        <p className="text-gray-600 text-sm">Author Name</p>
        
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, index) => (
            <FaStar 
              key={index}
              className="text-yellow-400 w-4 h-4"
            />
          ))}
            <span className="text-gray-500 text-sm">(4.5)</span>
        </div>

        <Button 
          className="w-full bg-br-blue-medium text-white py-2 rounded-lg hover:bg-br-blue-dark transition-colors duration-200"
        >
          Borrow Now
        </Button>
      </div>
    </div>
  )
}

export default BookCard