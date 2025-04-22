import React from 'react'
import Button from './Button'
import { FaStar } from 'react-icons/fa'
import BookDetails from './BookDetails'

const BookCard = ({ title, author, coverUrl, isAvailable, rating }) => {
  return (
    <div className="bg-white rounded-[var(--br-radius)] w-full p-4 hover:shadow-lg transition-shadow duration-300 border border-br-gray-light hover:cursor-pointer flex flex-col h-fit">
      <div className="w-full h-[218px] mb-2 flex items-center justify-center flex-shrink-0">
        <img 
          src={coverUrl || "https://via.placeholder.com/150"} 
          alt={`${title} cover`} 
          className="h-full w-auto object-contain rounded-sm" 
        />
      </div>
      
      <div className="flex flex-col justify-between h-[150px]">
        <div>
          <h1 className="font-bold text-lg h-[50px] overflow-hidden mb-2">{title}</h1>
          <p className="text-gray-600 text-sm h-[20px] overflow-hidden">{author}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => (
              <FaStar 
                key={index}
                className={`w-4 h-4 ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-gray-500 text-sm">({rating})</span>
          </div>

          <Button 
            className={`w-full bg-br-blue-medium hover:bg-br-blue-dark 
              text-white py-2 rounded-lg transition-colors duration-200`}
            disabled={!isAvailable} 
          >
            {isAvailable ? 'Borrow Now' : 'Request To Borrow'};
            onClick={BookDetails}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BookCard