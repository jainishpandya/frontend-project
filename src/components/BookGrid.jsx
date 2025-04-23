import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from './BookCard'
import Pagination from "./Pagination";
import { useSelector } from "react-redux";

function BookGrid() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState("");
  const resultsPerPage = 10; 

  const clubId = useSelector((state => state.club.id));

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/book/bookDetails/${clubId}`,{
            params: {
              page: currentPage,
              limit: resultsPerPage,
            }
          }
        );
        const data = response.data;
        console.log(data);

        if (data.success) {
          setTotalCount(data.total); // Save total count from backend
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
      } catch (error) {
        setError("Error fetching books");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [currentPage, clubId]); 

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setLoading(true); // Reset loading state when page changes
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

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8">Error: {error}</div>;

  return (
    <>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 px-4 py-8 w-full bg-white">
        {books.length > 0 ? (
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
            <p className="text-gray-500 text-lg">{data?.message || "No books found"}</p>
          </div>
        )}
      </div>
      <Pagination 
      currentPage={currentPage}
      totalResults={totalCount}
      onPageChange={handlePageChange}
    />
    </>
  );
}

export default BookGrid;
