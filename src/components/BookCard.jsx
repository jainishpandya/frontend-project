import { useNavigate } from "react-router-dom";
import React from "react";
import Button from "./Button";
import { FaStar } from "react-icons/fa";
import BookDetails from "./BookDetails";

const BookCard = ({ title, author, coverUrl, isAvailable, rating }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-[var(--br-radius)] w-full p-4 hover:shadow-lg transition-shadow duration-300 border border-br-gray-light hover:cursor-pointer flex flex-col ">
      <div className="w-full h-[204px] 2xl:mb-0 xl:mb-4 lg:mb-4 md:mb-4  flex items-center justify-center flex-shrink-0">
        <img
          src={coverUrl || "https://via.placeholder.com/150"}
          alt={`${title} cover`}
          className="h-full w-auto object-contain rounded-sm"
        />
      </div>

      <div className="flex flex-col justify-between h-fit flex-grow">
        <div>
          <h1 className="font-bold 2xl:text-lg xl:text-sm lg:text-sm  overflow-hidden 2xl:mb-1 mb-2">
            {title}
          </h1>
          <p className="text-gray-600 2xl:text-sm xl:text-xs lg:text-xs overflow-hidden 2xl:mb-1 mb-2">
            {author}
          </p>
        </div>

        <div className="flex flex-row 2xl:text-sm xl:text-xs lg:text-xs items-start space-x-2">
          <div className="w-fit bg-br-blue-light p-1 rounded-md text-blue-400 font-semibold">Category</div>
          <div className="w-fit bg-br-blue-light p-1 rounded-md text-blue-400 font-semibold">Language</div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`w-4 h-4 ${
                  index < Math.floor(rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-gray-500 text-sm">({rating})</span>
          </div>

          <Button
            className={`w-full bg-br-blue-medium 2xl:text-base xl:text-sm lg:text-sm hover:bg-br-blue-dark 
              text-white py-2 rounded-lg transition-colors duration-200`}
            disabled={!isAvailable}
            onClick={() => navigate("/home/books/book-details",{
            state : {
              title,
              author,
              coverUrl,
              isAvailable,
              rating
            }
            })}
          >
            {isAvailable ? 'Borrow Now' : 'Request To Borrow'}
            {/* onClick={BookDetails} */}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
