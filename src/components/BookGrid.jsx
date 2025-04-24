import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from './BookCard'
import Pagination from "./Pagination";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import { Box } from "lucide-react";

function BookGrid() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState("");
  const resultsPerPage = 10;

  const clubId = useSelector((state => state.club.id));

  async function fetchBooks() {
    try {

      if (!clubId) {
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/api/v1/book/bookDetails/${clubId}`, {
        params: {
          page: currentPage,
          limit: resultsPerPage,
        }
      }
      );
      const data = response.data;

      if (data.success) {
        setTotalCount(data.total); 
        setMessage(data.message || "");
        if (data.books?.length) {
          const booksWithCovers = await Promise.all(
            data.books.map(async (book) => {
              const coverUrl = await getBookCoverUrl(book.ISBN);
              return { ...book, coverUrl };
            })
          );
          setBooks(booksWithCovers);
        }
      } else {
        setError(data.message || "Failed to fetch books");
      }
      setLoading(false);
    } catch (error) {
      setError("Error fetching books");
      console.error(error);
    } 
  }


  useEffect(() => {
    fetchBooks();
    setLoading(true); // Set loading state
  }, [currentPage, clubId]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  async function getBookCoverUrl(isbn) {
    if (!isbn) return null;

    try {
      const cleanIsbn = isbn.replace(/-/g, "");
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${cleanIsbn}`
      );

      return (
        response.data?.items?.[0]?.volumeInfo?.imageLinks?.thumbnail || null
      );
    } catch (error) {
      console.error("Error fetching cover:", error);
      return null;
    }
  }

  if (error) return <div className="text-center py-8">Error: {error}</div>;

  return (
    <div className="w-full h-screen bg-br-blue-light flex flex-col space-y-1">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-4 base:py-10 px-4 py-8 w-full flex-grow bg-white">
        {loading ? (
          // Skeleton loader when loading is true
          [...Array(resultsPerPage)].map((_, i) => (
            <div className="p-4 rounded-xl border border-br-gray-light shadow-sm w-full bg-white" style={{ minHeight: "410px" }}>
            {/* Image placeholder */}
            <Skeleton variant="rectangular" height={210} className="w-full rounded-md" />
      
            {/* Title */}
            <Skeleton variant="text" height={28} width="80%" className="mt-4" />
      
            {/* Author */}
            <Skeleton variant="text" height={20} width="60%" />
      
            {/* Rating */}
            <Skeleton variant="text" height={20} width="40%" />
      
            {/* Button */}
            <Skeleton variant="rectangular" height={36} className="mt-4 rounded-md w-full" />
          </div>
          ))
        ) : books.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              coverUrl={book.coverUrl}
              isAvailable={book.IsAvailable}
              rating={4.5}
            />
          ))
        ) : (
          <div className="col-span-5 text-center py-8">
            <p className="text-gray-500 text-lg">{"No books found in this club. Start adding books to build your collection!"}</p>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalResults={totalCount}
        onPageChange={handlePageChange}
      />
    </div>

  );
}

export default BookGrid;
