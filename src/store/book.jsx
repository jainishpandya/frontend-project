import React from "react";
import axios from "axios";

const book = () => {
  async function book(isbn) {
    const cleanISBN = isbn.replace(/[-\s]/g, "");

    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${cleanISBN}`;
    try {
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (data.totalItems === 0) {
        console.log("No books found for the given ISBN.");
        return null;
      }

      const book = data.items[0];

      const title = book.volumeInfo.title;
      const authors = book.volumeInfo.authors
        ? book.volumeInfo.authors.join(", ")
        : "Unknown Author";

      const coverLinks = {
        thumbnail: book.volumeInfo.imageLinks?.thumbnail || "Null",
        smallThumbnail: book.volumeInfo.imageLinks?.smallThumbnail || "Null",

        large:
          book.volumeInfo.imageLinks?.thumbnail?.replace("zoom=1", "zoom=3") ||
          "Null",
      };

      return {
        isbn: cleanISBN,
        title,
        authors,
        coverLinks,
      };
    } catch (error) {
      console.error("Error fetching book data:", error);

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else if (error.request) {
        console.error("No Response Recieved", error.request);
      } else {
        console.error("Error Message:", error.message);
      }
      return null;
    }
  }

  async function displayBookCover() {
    const isbn = "9780062316097"; // Example: "Sapiens" by Yuval Noah Harari
    const bookInfo = await book(isbn);

    if (bookInfo) {
      console.log(`Book: ${bookInfo.title} by ${bookInfo.authors}`);
      console.log("Cover images:");
      console.log(bookInfo.coverLinks);

      // If you want to display the image on a webpage:
      if (bookInfo.coverLinks.thumbnail) {
        const img = document.createElement("img");
        img.src = bookInfo.coverLinks.thumbnail;
        img.alt = `Cover of ${bookInfo.title}`;
        document.body.appendChild(img);
      }
    }
  }

  async function processBatchISBNs(isbnArray) {
    const results = [];

    for (const isbn of isbnArray) {
      console.log(`Processing ISBN: ${isbn}...`);
      const bookInfo = await book(isbn);
      if (bookInfo) {
        results.push(bookInfo);
      }
    }

    console.log(`Processed ${results.length} books`);
    return results;
  }

  displayBookCover();
};
export default book;
