import React from 'react'
import BookCard from './BookCard'

function BookGrid() {
  return (
    <div className='bg-white p-4 h-fit py-8'>
      <div className='grid grid-cols-5 gap-4 mb-4'>
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
      <div className='grid grid-cols-5 gap-4'>
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
    </div>
  )
}

export default BookGrid