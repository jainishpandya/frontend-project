import { Box } from '@mui/material'
import { PlusIcon, SquarePlus } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function UserBookList() {

  const navigate = useNavigate();
  
  return (
    <Box  className='bg-br-white rounded-xl p-0 w-full'>
      <Box className='flex flex-row rounded-xl py-4 px-6 items-center'>
        <div className='text-lg font-bold'>My Books</div>
        <button className='bg-br-blue-regular text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center ml-auto font-bold'
          onClick={() => navigate('/home/mybooks/add-book')}>
        <SquarePlus className='mr-2' />
          Add Book
        </button>
      </Box>
      <Box sx={{ borderBottom: 3, borderColor: 'divider' }} className="w-full"></Box>

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

      

      <Box sx={{ borderBottom: 3, borderColor: 'divider' }} className="w-full"></Box>
    </Box>
  )
}

export default UserBookList
