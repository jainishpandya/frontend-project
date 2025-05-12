import React from 'react'
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ClubActionBar from './ClubActionBar'

function ClubListing() {
  return (
    <div className="">
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
        <ClubActionBar />
      </div>
    </div>
  )
}

export default ClubListing