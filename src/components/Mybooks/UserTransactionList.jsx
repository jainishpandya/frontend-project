import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { SquarePlus, Edit, Redo2, SquareArrowUp, ArrowUp, CircleX, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserTransactionList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [BorrowedBooks, setBorrowedBooks] = useState([]);
  const [LendedBooks, setLendedBooks] = useState([]);

  const navigate = useNavigate();

  const getBorrowingBookData = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const token = await localStorage.getItem("token");

      axios.defaults.baseURL = "http://localhost:3000/";


      console.log(token);

      const { data } = await axios.post(`api/v1/transaction/getrequestedlist/`, {
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

  
  const getLendingBookData = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const token = await localStorage.getItem("token");

      axios.defaults.baseURL = "http://localhost:3000/";


      console.log(token);

      const { data } = await axios.post(`api/v1/transaction/getlendinglist/`, {
        token: token
      });

      console.log(data);

      if (data.success) {
        // Check if response is an array or single object and handle accordingly
        if (Array.isArray(data.list)) {
          setLendedBooks(data.list || []);
        } else if (data.list) {
          // If it's a single book, put it in an array
          setLendedBooks([data.list]);
        } else {
          setLendedBooks([]);
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
    getBorrowingBookData();
    getLendingBookData();
  }, []);

  const handleEdit = (bookId) => {
    navigate(`/home/mybooks/edit-book/${bookId}`);
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case '1':
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
            Requested
          </span>
        );
      case '2':
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
            Approved
          </span>
        );
      case '4':
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
            Dropped
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
            Unknown
          </span>
        );
    }
  };
  



  const renderActionButton = (status) => {
    switch (status) {
      case '1': // Requested
        return (
          <button className="text-blue-600 hover:bg-br-blue-dark flex flex-row items-center justify-end  bg-br-blue-medium gap-1 p-2 rounded-lg text-sm text-white">
            <X  size={18} />
            Cancel
          </button>
        );
      case '2': // Approved
        return (
          <button className="text-white p-2" disabled>
            Approved
          </button>
        );
      case '4': // Dropped
        return (
          <button className="text-blue-600 hover:bg-br-blue-dark flex flex-row items-center justify-end  bg-br-blue-medium gap-1 p-2 rounded-lg text-sm text-white">
            <ArrowUp size={18} />
            Pickup
          </button>
        );
      default:
        return null;
    }
  };
  

  return (
    <Box className="bg-br-white rounded-xl p-0 w-full">
      <Box className="flex flex-row rounded-xl py-4 px-6 items-center">
        <div className="text-lg font-bold">Transaction - Borrowing</div>
        
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
        <div className="w-1/12">Status</div>
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
      ) : BorrowedBooks.length === 0 ? (
        <Box className="p-4 text-center">No Books found.</Box>
      ) : (
        BorrowedBooks.map((book, index) => (
          <React.Fragment key={book._id || index}>
            <Box className="flex flex-row items-center py-3 px-4 text-sm hover:bg-gray-50">
              <div className="w-3/12 truncate">{book.book.title || "N/A"}</div>
              <div className="w-1/12 truncate">{book.book.author || "N/A"}</div>
              <div className="w-2/12 truncate">{book.book.ISBN || "N/A"}</div>
              <div className="w-1/12">{book.book.rating || 0}</div>
              <div className="w-1/12 truncate">{book.book.languageId || "N/A"}</div>
              <div className="w-2/12 truncate">{book.book.categoryId || "N/A"}</div>
              <div className="w-1/12">
              {renderStatusBadge(book.status)}
              </div>
              <div className="w-2/12 text-right justify-end flex flex-row items-center gap-2">
                {renderActionButton(book.status)}
              </div>
            </Box>
            <Box
              sx={{ borderBottom: 1, borderColor: "divider" }}
              className="w-full"
            ></Box>
          </React.Fragment>
        ))
      )}







      {/* This is The second section */}
      <Box className="flex flex-row rounded-xl py-4 px-6 items-center">
        <div className="text-lg font-bold">Transaction - Lending</div>
        
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
        <div className="w-1/12">Status</div>
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
      ) : LendedBooks.length === 0 ? (
        <Box className="p-4 text-center">No Books found.</Box>
      ) : (
        LendedBooks.map((book, index) => (
          <React.Fragment key={book._id || index}>
            <Box className="flex flex-row items-center py-3 px-4 text-sm hover:bg-gray-50">
              <div className="w-3/12 truncate">{book.book.title || "N/A"}</div>
              <div className="w-1/12 truncate">{book.book.author || "N/A"}</div>
              <div className="w-2/12 truncate">{book.book.ISBN || "N/A"}</div>
              <div className="w-1/12">{book.book.rating || 0}</div>
              <div className="w-1/12 truncate">{book.book.languageId || "N/A"}</div>
              <div className="w-2/12 truncate">{book.book.categoryId || "N/A"}</div>
              <div className="w-1/12">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${book.IsAvailable
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                    }`}
                >
                  {book.IsAvailable ? "Availabe" : "Not Available"}
                </span>
              </div>
              <div className="w-2/12 text-right justify-end flex flex-row items-center gap-2">
                <button
                  onClick={() => handleEdit(book._id)}
                  className="text-blue-600 hover:bg-br-blue-dark flex flex-row items-center justify-end  bg-br-blue-medium gap-1 p-2 rounded-lg text-sm text-white"
                >
                  <Redo2 size={18} /> Return
                </button>
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

export default UserTransactionList;

