import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { SquarePlus, Edit } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserBookList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();

  const getBookData = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      axios.defaults.baseURL = "http://localhost:3000/";

      const clubId = localStorage.getItem("clubId");
      if (!clubId) {
        setError("Club ID is not available in local storage.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token is not available in local storage.");
        return;
      }

      const { data } = await axios.get(`api/v1/book/myBooks/${clubId}`,{
        
        params:{
        token : token
        }
      });
      console.log(data);

      if (data.success) {
        // Check if response is an array or single object and handle accordingly
        if (Array.isArray(data.books)) {
          setBooks(data.books|| []);
        } else if (data.book) {
          // If it's a single book, put it in an array
          setBooks([data.books]);
        } else {
          setBooks([]);
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
  }, []);

  const handleEdit = (bookId) => {
    navigate(`/home/mybooks/edit-book/${bookId}`);
  };

  return (
    <Box className="bg-br-white rounded-xl p-0 w-full">
      <Box className="flex flex-row rounded-xl py-4 px-6 items-center">
        <div className="text-lg font-bold">My Books</div>
        <button
          className="bg-br-blue-regular text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center ml-auto font-bold"
          onClick={() => navigate("/home/mybooks/add-book")}
        >
          <SquarePlus className="mr-2" />
          Add Book
        </button>
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
        sx={{ borderBottom: 1, borderColor: "divider" }}
        className="w-full"
      ></Box>

      {loading ? (
        <Box className="p-4 text-center"><CircularProgress /></Box>
      ) : error ? (
        <Box className="p-4 text-center text-red-600">{error}</Box>
      ) : books.length === 0 ? (
        <Box className="p-4 text-center">No books found.</Box>
      ) : (
        books.map((book, index) => (
          <React.Fragment key={book._id || index}>
            <Box className="flex flex-row items-center py-3 px-4 text-sm hover:bg-gray-50">
              <div className="w-3/12 truncate">{book.title || "N/A"}</div>
              <div className="w-1/12 truncate">{book.author || "N/A"}</div>
              <div className="w-2/12 truncate">{book.ISBN || "N/A"}</div>
              <div className="w-1/12">{book.rating || 0}</div>
              <div className="w-1/12 truncate">{book.languageId || "N/A"}</div>
              <div className="w-2/12 truncate">{book.categoryId || "N/A"}</div>
              <div className="w-1/12">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    book.IsAvailable
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {book.IsAvailable ? "Availabe": "Not Available"}
                </span>
              </div>
              <div className="w-2/12 text-right">
                <button
                  onClick={() => handleEdit(book._id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={18} />
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

export default UserBookList;
