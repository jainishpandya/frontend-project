import React from 'react'

function UserBookListRecord() {
  return (
    <Box className='flex flex-row items-center justify-center py-3 px-4 text-sm font-semibold text-br-gray-dark'>
        <div className='w-3/12'>Title</div>
        <div className='w-1/12'>Author</div>
        <div className='w-1/12'>ISBN</div>
        <div className='w-1/12'>Rating</div>
        <div className='w-1/12'>Language</div>
        <div className='w-2/12'>Category</div>
        <div className='w-1/12'>Status</div>
        <div className='w-2/12 text-right'>Actions</div>
      </Box>
  )
}

export default UserBookListRecord
