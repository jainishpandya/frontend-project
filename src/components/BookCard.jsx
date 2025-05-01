import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Button from "./Button";
import { FaStar } from "react-icons/fa";
import DialogBox from "./DialogBox";
import axios from "axios";
import BookDetails from "./BookDetails";
import { useSelector } from "react-redux";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const BookCard = ({ id, title, author, coverUrl, isAvailable, rating, category, language }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const clubId = useSelector((state => state.club.id))

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirm = async () => {
    const token = await localStorage.getItem('token');

    if (!token) {
      console.error("Token not found");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/api/v1/transaction/request`, {
          bookId: id,
          clubId: clubId,
          token: token
      }
      );
      const data = response.data;

      if (data.success) {
        console.log("book has been added")
        setSuccess(true);
        // setTimeout(()=> setSuccess(false), 3000)
      } else {
        setError("Failed to add book");
      }
    } catch (error) {
      setError("Error Adding book");
      console.error(error);
    } finally{
      setIsDialogOpen(false);
    }
  };

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
          <div className="w-fit bg-gray-200 py-1 px-2 rounded-md text-black font-semibold">{category}</div>
          <div className="w-fit bg-gray-200 py-1 px-2 rounded-md text-black font-semibold">{language}</div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`w-4 h-4 ${index < Math.floor(rating)
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
            onClick={handleOpenDialog}
          >
            {isAvailable ? 'Borrow Now' : 'Request To Borrow'}
          </Button>
        </div>
      </div>

      <DialogBox
        open={isDialogOpen}
        onClose={handleCloseDialog}
        title={isAvailable ? "Borrow Book" : "Request to Borrow"}
        description={`Are you sure you want to ${isAvailable ? "borrow" : "request to borrow"} "${title}" ?`}
        onConfirm={handleConfirm}
      />

      {/* Success Alert */}
      {success && (
        <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "30%",
          zIndex: 1000, 
        }}
      >
        <Alert severity="success" className="h-30 justify-center shadow-2xl items-center"
        sx={{
          '& .MuiAlert-icon': {
            fontSize: '4rem'
          },
          '& .MuiAlert-message': {
            fontSize: '1.2rem'
          },
          '& .MuiAlert-action': {
            alignItems: 'center'
          },
          borderRadius: '16px',
          border: '1px solid #81C784',
          backgroundColor: '#FFF',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}>
          <AlertTitle>Success</AlertTitle>
          The book request has been successfully sent!
        </Alert>
      </div>
      )}

       {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default BookCard;
