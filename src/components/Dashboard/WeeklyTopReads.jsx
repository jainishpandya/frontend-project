import React from 'react'

const WeeklyTopReads = () => {
  // Dummy data for 5 books
  const topBooks = [
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      coverUrl: "https://m.media-amazon.com/images/I/41JFqILaXyL.jpg",
      rating: 4.8,
      reviews: 458
    },
    {
      id: 2,
      title: "Tomorrow, and Tomorrow, and Tomorrow",
      coverUrl: "https://m.media-amazon.com/images/I/81dQwQlmAXL.jpg",
      rating: 4.5,
      reviews: 327
    },
    {
      id: 3,
      title: "Atomic Habits",
      coverUrl: "https://m.media-amazon.com/images/I/81wgcld4wxL.jpg",
      rating: 4.9,
      reviews: 567
    },
    {
      id: 4,
      title: "The Psychology of Money",
      coverUrl: "https://m.media-amazon.com/images/I/71TRUbzcvaL.jpg",
      rating: 4.6,
      reviews: 289
    },
    {
      id: 5,
      title: "It Starts with Us",
      coverUrl: "https://m.media-amazon.com/images/I/71PNGYHykrL.jpg",
      rating: 4.7,
      reviews: 433
    }
  ];

  return (
    <div className="bg-white rounded-xl p-3 w-full">
      <div className="mb-6">
        <h1 className='text-2xl font-bold'>Weekly Top Reads</h1>
      </div>

      {/* Book rows container */}
      <div className="space-y-4">
        {topBooks.map((book) => (
          <div key={book.id} className="flex items-center p-4 hover:bg-br-blue-light rounded-lg transition-colors duration-200">
            {/* Book logo/image */}
            <div className="w-16 h-24 overflow-hidden">
              <img
                src={book.coverUrl}
                alt={`${book.title} cover`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Book details */}
            <div className="flex-grow mx-4">
              <h3 className="font-semibold text-lg text-br-blue-dark">{book.title}</h3>
            </div>
           
            <div className="mr-5">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <div className='mr-5'>
              <span>({book.reviews})</span>
            </div>

            {/* Borrow button */}
            <button className="bg-br-blue-medium hover:bg-br-blue-dark text-white px-4 py-2 rounded-lg transition-colors duration-200">
              Request To Borrow
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeeklyTopReads