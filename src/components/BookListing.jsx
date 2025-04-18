import React from 'react'
import Header from './Header'
import ScreenHeading from './ScreenHeading'
import SearchBar from './SearchBar'
import ActionBar from './ActionBar'
import Filter from './Filters'

const BookListing = () => {
  return (
    <div className='w-full h-full space-y-3 p-3 bg-br-blue-light'>
      <ScreenHeading pageTitle="Book Listing" />
      <div className='space-y-1'>
        <ActionBar />
        <Filter />
      </div>
    </div>
  )
}

export default BookListing