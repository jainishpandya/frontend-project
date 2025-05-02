import { CircularProgress } from "@mui/material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { SquarePlus, Edit } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditBook from "./EditBook";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { get } from "lodash";

function UserBookList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [ISBN, setIsbn] = useState("");

  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const [languages, setLanguages] = useState([]);
  const [categories, setCategories] = useState([]);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editSuccess, setEditSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const getBookData = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      axios.defaults.baseURL = "http://localhost:3000/";

      const clubId = await localStorage.getItem("clubId");
      if (!clubId) {
        setError("Club ID is not available in local storage.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token is not available in local storage.");
        return;
      }

      const { data } = await axios.get(`api/v1/book/myBooks/`, {
        params: {
          token: token,
          clubId: clubId,
        },
      });
      // console.log(data);

      if (data.success) {
        // Check if response is an array or single object and handle accordingly
        if (Array.isArray(data.books)) {
          setBooks(data.books || []);
          setBooks(data.books || []);
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

  const handleAddBook = async () => {
    try {
      const token = localStorage.getItem("token");
      const clubId = localStorage.getItem("clubId");

      const { data } = await axios.post(
        "http://localhost:3000/api/v1/book/addbook",
        {
          title,
          author,
          ISBN,
          clubId,
          token,
          categoryId: selectedCategory.id, // Replace with actual IDs
          languageId: selectedLanguage.id,
          isAvailable: true,
        }
      );

      if (data.success) {
        alert("Book added!");
        setOpenDialog(false);
        setTitle("");
        setAuthor("");
        setIsbn("");
        getBookData(); // Refresh list
      } else {
        alert("Failed to add book.");
      }
    } catch (error) {
      console.error("Add book error:", error);
      alert("Error adding book.");
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/category/getall"
      );
      if (data.success) {
        setCategories(data.categories.rows);
        // console.log("Categories:", data.categories.rows);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchLanguages = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/language/getall"
      );
      if (data.success) {
        setLanguages(data.languages.rows);
        // console.log("Languages:", data.languages.rows);
      }
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setEditDialogOpen(true);
  };

  const handleEditSuccess = () => {
    setEditSuccess(true);
    setTimeout(() => {
      setEditSuccess(false);
    }, 3000);
    getBookData(); 
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchCategories(), fetchLanguages()]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  return (
    <>
      <Box className="bg-br-white rounded-xl p-0 w-full">
        <Box className="flex flex-row rounded-xl py-4 px-6 items-center">
          <div className="text-lg font-bold">My Books</div>
          <button
            className="bg-br-blue-regular cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-br-blue-medium flex items-center ml-auto font-bold"
            onClick={() => setOpenDialog(true)}
          >
            <SquarePlus className="mr-2" />
            Add Book
          </button>
        </Box>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
          <DialogTitle>Add a New Book</DialogTitle>
          <DialogContent dividers>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-bold mb-2 text-br-blue-medium"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-white border border-br-gray-dark rounded-xl py-3 px-4 w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="author"
                className="block text-sm font-bold mb-2 text-br-blue-medium"
              >
                Author Name
              </label>
              <input
                id="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="bg-white border border-br-gray-dark rounded-xl py-3 px-4 w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="isbn"
                className="block text-sm font-bold mb-2 text-br-blue-medium"
              >
                ISBN Number
              </label>
              <input
                id="isbn"
                type="text"
                value={ISBN}
                onChange={(e) => setIsbn(e.target.value)}
                className="bg-white border border-br-gray-dark rounded-xl py-3 px-4 w-full"
              />
            </div>

            <div className="mb-4 flex gap-4 w-full">
              {/* Language Dropdown */}
              <div className="w-1/2 relative">
                <label className="block text-sm font-bold mb-2 text-br-blue-medium">
                  Language
                </label>
                <button
                  type="button"
                  className="bg-white border border-br-gray-dark rounded-xl py-3 px-4 w-full text-left flex justify-between items-center"
                  onClick={() => setLanguageDropdownOpen((prev) => !prev)}
                  onBlur={() =>
                    setTimeout(() => setLanguageDropdownOpen(false), 200)
                  }
                >
                  {selectedLanguage
                    ? selectedLanguage.LanguageName
                    : "Select a language"}
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {languageDropdownOpen && (
                  <div className="absolute top-full left-0 w-full border border-br-gray-light rounded-lg bg-white z-10 mt-1 max-h-48 overflow-y-auto">
                    {languages.length > 0 ? (
                      languages.map((language) => (
                        <div
                          key={language.LanguageName}
                          className="p-3 hover:bg-br-blue-light cursor-pointer"
                          onClick={() => {
                            setSelectedLanguage(language);
                            setLanguageDropdownOpen(false);
                          }}
                        >
                          {language.LanguageName}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-gray-500">
                        No languages available
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Category Dropdown */}
              <div className="w-1/2 relative">
                <label className="block text-sm font-bold mb-2 text-br-blue-medium">
                  Category
                </label>
                <button
                  type="button"
                  className="bg-white border border-br-gray-dark rounded-xl py-3 px-4 w-full text-left flex justify-between items-center"
                  onClick={() => setCategoryDropdownOpen((prev) => !prev)}
                  onBlur={() =>
                    setTimeout(() => setCategoryDropdownOpen(false), 200)
                  }
                >
                  {selectedCategory
                    ? selectedCategory.CategoryName
                    : "Select a category"}
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {categoryDropdownOpen && (
                  <div className="absolute top-full left-0 w-full border border-br-gray-light rounded-lg bg-white z-10 mt-1 max-h-48 overflow-y-auto">
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <div
                          key={category.id}
                          className="p-3 hover:bg-br-blue-light cursor-pointer"
                          onClick={() => {
                            setSelectedCategory(category);
                            setCategoryDropdownOpen(false);
                          }}
                        >
                          {category.CategoryName}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-gray-500">
                        No categories available
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* You can add dropdowns for category and language here later */}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleAddBook} variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          fullWidth
        >
          {selectedBook && (
            <EditBook
              onClose={() => {
                setEditDialogOpen(false);
              }}
              // getBookData(); 
              onSuccess={handleEditSuccess} 
              bookData={selectedBook}
            />
          )}
        </Dialog>

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
          <Box className="p-4 text-center">
            <CircularProgress />
          </Box>
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
                <div className="w-1/12 truncate">
                  {book.language.LanguageName || "N/A"}
                </div>
                <div className="w-2/12 truncate">
                  {book.category.CategoryName || "N/A"}
                </div>
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
                <div className="w-2/12 text-right">
                  <button
                    onClick={() => handleEdit(book)}
                    className="text-blue-600 cursor-pointer hover:text-blue-800"
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
      {editSuccess && (
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
          <Alert
            severity="success"
            className="h-30 justify-center shadow-2xl items-center"
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
            }}
          >
            <AlertTitle>Success</AlertTitle>
            Book has been updated successfully!
          </Alert>
        </div>
      )}
    </>
  );
}

export default UserBookList;
