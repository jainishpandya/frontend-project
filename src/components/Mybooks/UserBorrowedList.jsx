import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { SquarePlus, Edit, Redo2, CornerDownLeft, Undo2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserBorrowedList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [borrowingHistory, setBorrowingHistory] = useState([]);

  const navigate = useNavigate();

  const getBookData = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const token = await localStorage.getItem("token");

      axios.defaults.baseURL = "http://localhost:3000/";

      // console.log(token);

      const { data } = await axios.post(`api/v1/transaction/getborrowedlist/`, {
        token: token
      });

      console.log(data);

      if (data.success) {
        // Check if response is an array or single object and handle accordingly
        if (Array.isArray(data.list)) {
          setBorrowedBooks(data.list || []);
        } else if (data.list) {
          // If it's a single book, put it in an array
          setBorrowedBooks([data.list]);
        } else {
          setBorrowedBooks([]);
        }
      }
    } catch (error) {
      console.error("Error fetching book data:", error);
      setError("Failed to fetch book data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getBorrowingHistory = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const token = await localStorage.getItem("token");

      axios.defaults.baseURL = "http://localhost:3000/";


      console.log(token);

      const { data } = await axios.post(`api/v1/transaction/borrowinghistory/`, {
        token: token
      });

      console.log(data);

      if (data.success) {
        // Check if response is an array or single object and handle accordingly
        if (Array.isArray(data.list)) {
          setBorrowingHistory(data.list || []);
        } else if (data.list) {
          // If it's a single book, put it in an array
          setBorrowingHistory([data.list]);
        } else {
          setBorrowingHistory([]);
        }
      }
    } catch (error) {
      console.error("Error fetching book data:", error);
      setError("Failed to fetch book data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookData();
    getBorrowingHistory();
  }, []);

  const handleEdit = (bookId) => {
    navigate(`/home/mybooks/edit-book/${bookId}`);
  };


  const initiateReturn = async (transactionId) => {
    try {
      const token = await localStorage.getItem("token");

      axios.defaults.baseURL = "http://localhost:3000/"

      console.log(token)
      console.log(transactionId)

      const { data } = await axios.post(`api/v1/transaction/initiatereturn`, {
        transactionId,
        token
      });

      console.log(data);
      if (data.success) {
        console.log("Initiated the Return");
        getBookData();
        getBorrowingHistory();
      }
    } catch (error) {
      console.error("Error in initiating the return", error);
    }
  }

  const handleReturn = async (transactionId) => {
    try {
      const token = await localStorage.getItem("token");

      axios.defaults.baseURL = "http://localhost:3000/"

      console.log(token);
      console.log(transactionId);

      const { data } = await axios.post(`api/v1/transaction/return`, {
        transactionId,
        token
      });

      console.log(data);
      if (data.success) {
        console.log("Book Returned Successfully");
        getBookData();
        getBorrowingHistory();
      }
    } catch (error) {
      console.error("Error in returning Book", error);
    }
  }

  const renderActionButtonLender = (status, transactionId) => {
    switch (status) {
      case '5': // Requested
        return (
          <button
            className="text-blue-600 hover:bg-br-blue-dark flex flex-row items-center justify-end  bg-br-blue-medium gap-1 p-2 rounded-lg text-sm text-white"
            onClick={() => initiateReturn(transactionId)}
          >
            <CornerDownLeft size={18} />
            Initiate Return
          </button>
        );
      case '6': // Approved
        return (
          <button
            className="text-blue-600 hover:bg-br-blue-dark flex flex-row items-center justify-end  bg-br-blue-medium gap-1 p-2 rounded-lg text-sm text-white"
            onClick={() => handleReturn(transactionId)}
          >
            <Undo2 size={18} />
            Return
          </button>
        );
      default:
        return null;
    }
  };

  const calculateDueDate = (pickupDate) => {
    if (!pickupDate) return "N/A";

    const pickUp = new Date(pickupDate);
    const dueDate = new Date(pickUp);
    dueDate.setDate(pickUp.getDate() + 30); // Assuming a 7-day borrowing period

    const today = new Date();
    const isOverdue = today > dueDate;

    return {
      date: dueDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      isOverdue
    };
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };


  return (
    <Box className="bg-br-white rounded-xl p-0 w-full">
      <Box className="flex flex-row rounded-xl py-4 px-6 items-center">
        <div className="text-lg font-bold">Borrowed Books</div>
      </Box>
      <Box
        sx={{ borderBottom: 3, borderColor: "divider" }}
        className="w-full"
      ></Box>


      <Box className="flex flex-row items-center justify-center py-3 px-4 text-sm font-semibold text-br-gray-dark">
        <div className="w-3/12">Title</div>
        <div className="w-1/12">Author</div>
        <div className="w-2/12">ISBN</div>
        <div className="w-1/12">Rating</div>
        <div className="w-1/12">Language</div>
        <div className="w-2/12">Category</div>
        <div className="w-1/12">Due Date</div>
        <div className="w-2/12 text-right">Actions</div>
      </Box>

      <Box
        sx={{ borderBottom: 3, borderColor: "divider" }}
        className="w-full"
      ></Box>

      {loading ? (
        <Box className="p-4 text-center"><CircularProgress /></Box>
      ) : error ? (
        <Box className="p-4 text-center text-red-600">{error}</Box>
      ) : borrowedBooks.length === 0 ? (
        <Box className="p-4 text-center">No books found.</Box>
      ) : (
        borrowedBooks.map((book, index) => (
          <React.Fragment key={book._id || index}>
            <Box className="flex flex-row items-center py-3 px-4 text-sm hover:bg-gray-50">
              <div className="w-3/12 truncate">{book.book.title || "N/A"}</div>
              <div className="w-1/12 truncate">{book.book.author || "N/A"}</div>
              <div className="w-2/12 truncate">{book.book.ISBN || "N/A"}</div>
              <div className="w-1/12">{book.book.rating || 0}</div>
              <div className="w-1/12 truncate">{book.book.languageId || "N/A"}</div>
              <div className="w-2/12 truncate">{book.book.categoryId || "N/A"}</div>
              <div className="w-1/12">
                {book.pickupDate && (
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${calculateDueDate(book.pickupDate).isOverdue
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                      }`}
                  >
                    {calculateDueDate(book.pickupDate).date}
                  </span>
                )}
              </div>
              <div className="w-2/12 text-right justify-end flex flex-row items-center gap-2">
                {renderActionButtonLender(book.status, book.id)}
              </div>
            </Box>
            <Box
              sx={{ borderBottom: 1, borderColor: "divider" }}
              className="w-full"
            ></Box>
          </React.Fragment>
        ))
      )}





      <Box
        sx={{ borderBottom: 3, borderColor: "divider" }}
        className="w-full"
      ></Box>
      <Box className="flex flex-row rounded-xl py-4 px-6 items-center">
        <div className="text-lg font-bold">Borrowing History</div>
      </Box>
      <Box
        sx={{ borderBottom: 3, borderColor: "divider" }}
        className="w-full"
      ></Box>
      <Box className="flex flex-row items-center justify-center py-3 px-4 text-sm font-semibold text-br-gray-dark">
        <div className="w-3/12">Title</div>
        <div className="w-1/12">Author</div>
        <div className="w-2/12">ISBN</div>
        <div className="w-1/12">Rating</div>
        <div className="w-1/12">Language</div>
        <div className="w-2/12">Category</div>
        <div className="w-1/12">Return Date</div>
        <div className="w-2/12 text-right"></div>
      </Box>

      <Box
        sx={{ borderBottom: 3, borderColor: "divider" }}
        className="w-full"
      ></Box>

      {loading ? (
        <Box className="p-4 text-center"><CircularProgress /></Box>
      ) : error ? (
        <Box className="p-4 text-center text-red-600">{error}</Box>
      ) : borrowingHistory.length === 0 ? (
        <Box className="p-4 text-center">No books found.</Box>
      ) : (
        borrowingHistory.map((book, index) => (
          <React.Fragment key={book._id || index}>
            <Box className="flex flex-row items-center py-3 px-4 text-sm hover:bg-gray-50">
              <div className="w-3/12 truncate">{book.book.title || "N/A"}</div>
              <div className="w-1/12 truncate">{book.book.author || "N/A"}</div>
              <div className="w-2/12 truncate">{book.book.ISBN || "N/A"}</div>
              <div className="w-1/12">{book.book.rating || 0}</div>
              <div className="w-1/12 truncate">{book.book.language.LanguageName || "N/A"}</div>
              <div className="w-2/12 truncate">{book.book.category.CategoryName || "N/A"}</div>
              <div className="w-1/12">
                <span
                  className='px-2 py-1 rounded-full text-xs'
                >
                  {formatDate(book.returnDate)}
                </span>
              </div>
              <div className="w-2/12 text-right justify-end flex flex-row items-center gap-2">

              </div>
            </Box>
            <Box
              sx={{ borderBottom: 1, borderColor: "divider" }}
              className="w-full"
            ></Box>
          </React.Fragment>
        ))
      )}

    </Box>
  );
}

export default UserBorrowedList;
