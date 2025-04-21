import React, { useEffect, useState } from "react";
import axios from "axios";

function BookGrid() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clubuserId = 1;

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/book/bookDetails/${clubuserId}`
        );
        const data = response.data;

        if (data.success) {
          setBooks(data.books);

          // Add cover URLs to book objects
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
  }, []);

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-6">Book Collection</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book.id || book.ISBN}
              className="bg-gray-100 p-4 rounded-lg shadow-md"
            >
              {book.coverUrl && (
                <img
                  src={book.coverUrl}
                  alt="Book cover"
                  className="h-40 mx-auto mb-4"
                />
              )}
              <h2 className="font-bold mb-2">{book.title}</h2>
              <p className="text-gray-600 text-sm mb-1">By {book.author}</p>
              
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-8">
            <p className="text-gray-500">No books found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookGrid;
