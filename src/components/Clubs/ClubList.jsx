import React, { useState } from 'react'
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ClubActionBar from './ClubActionBar'
import Clubs from './Clubs';
import Pagination from '../Pagination';

function ClubListing() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOptions, setSortOptions] = useState({
    field: 'club_name',
    order: 'ASC'
  });
  const [currentSort, setCurrentSort] = useState({
    field: 'club_name',
    order: 'ASC'
  });
  const [currentFilters, setCurrentFilters] = useState({
    status: null,
    memberCount: null,
    bookCount: null
});

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1)
  }

  const handleSort = (sortOptions) => {
    setCurrentSort(sortOptions);
    setSortOptions(sortOptions);
    setCurrentPage(1)
  }

  const handleFilter = (filterOptions) => {
    setCurrentFilters(filterOptions);
    setCurrentPage(1)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  // Callback to update total results from Clubs component
  const handleTotalResults = (total) => {
    setTotalResults(total)
  }

  return (
    <div className=''>
      <div className="bg-white rounded-2xl p-3 px-6 flex flex-row justify-between items-center mb-4">
        <div>
          <h1 className='text-2xl font-bold'>Club List</h1>
        </div>
        <Button
          variant="contained"
          startIcon={<AddBoxIcon />}
          sx={{
            backgroundColor: 'var(--color-br-blue-dark)',
            '&:hover': {
              backgroundColor: 'var(--color-br-blue-regular)'
            },
            textTransform: 'none',
            borderRadius: '0.5rem',
            padding: '0.5rem 1rem'
          }}
        >
          Add Club
        </Button>
      </div>
      <div>
        <ClubActionBar
          onSearch={handleSearch}
          onSort={handleSort}
          onFilter={handleFilter}
          currentSort={currentSort}
          searchQuery={searchQuery}
          currentFilters={currentFilters}
        />
      </div>
      <div className='mt-1'>
        <Clubs
          currentPage={currentPage}
          onTotalResults={handleTotalResults}
          sortOptions={sortOptions}
          searchQuery={searchQuery}
          filters={currentFilters} />
      </div>
      <div className="mt-1 rounded-bl-2xl">
        <Pagination
          currentPage={currentPage}
          totalResults={totalResults}
          onPageChange={handlePageChange}
          className="rounded-bl-[var(--br-radius)]"
        />
      </div>
    </div>
  )
}

export default ClubListing