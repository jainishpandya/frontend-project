import React, { useState } from 'react'
import ScreenHeading from './ScreenHeading'
import ActionBar from './ActionBar'
import Filter from './Filters'
import BookGrid from './BookGrid'

const BookListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOptions, setSortOptions] = useState({
    field: 'title',
    order: 'ASC'
  });
  const [filters, setFilters] = useState({
    status: "",
    categories: [],
    languages: []
  });

  const handleFilterChange = (newFilters) => {
    // console.log("Filters changed:", newFilters);
    setFilters(newFilters);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  const handleSort = (newSortOptions) => {
    setSortOptions(newSortOptions);
  };

  return (
    <div className='w-full h-fit space-y-3 bg-br-blue-light'>
      <ScreenHeading pageTitle="Book Listing" />
      <div className='h-fit space-y-1 overflow-hidden'>
        <ActionBar onSearch={handleSearch} onSort={handleSort} currentSort={sortOptions} />
        <div className='flex space-x-1 h-full'>
          <Filter onFilterChange={handleFilterChange} />
          <div className='space-y-1 w-full h-full'>
            <BookGrid
              searchQuery={searchQuery}
              filters={filters}
              sortOptions={sortOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookListing