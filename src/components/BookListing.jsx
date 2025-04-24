import React from 'react'
import Header from './Homepage/Header'
import ScreenHeading from './ScreenHeading'
import SearchBar from './SearchBar'
import ActionBar from './ActionBar'
import Filter from './Filters'
import BookGrid from './BookGrid'

const BookListing = () => {
  return (
    <div className='w-full h-fit space-y-3 bg-br-blue-light'>
      <ScreenHeading pageTitle="Book Listing" />
      <div className='h-fit space-y-1 overflow-hidden'>
        <ActionBar />
        <div className='flex space-x-1 h-full'>
        <Filter />
        <div className='space-y-1 w-full h-full'>
        <BookGrid />
        </div>
        </div>
      </div>
    </div>
  )
}

export default BookListing