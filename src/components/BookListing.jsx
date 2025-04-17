import React from 'react'
import Header from './Header'
import ScreenHeading from './ScreenHeading'
import SearchBar from './SearchBar'
import ActionBar from './ActionBar'

const BookListing = () => {
  return (
    <div className='w-full h-screen space-y-3 p-3 bg-br-blue-light'>
        <Header />
        <ScreenHeading pageTitle="Book Listing" />
        <ActionBar />
    </div>
  )
}

export default BookListing