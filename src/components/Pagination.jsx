import React from 'react'
import IconButton from './IconButton'

const Pagination = () => {
    return (
        <div className='flex justify-between items-center p-5 py-8 rounded-br-[var(--br-radius)] bg-white h-fill'>
            <div className='flex items-center space-x-2'>
                <h1 className='font-semibold'>Showing 10 of 39 Results</h1>
                    </div>
                <div className='flex items-center space-x-2'>
                    <IconButton
                        iconType="left"
                        onClick={() => handleNotification()}
                        className="hover:text-gray-600 bg-br-gray-light rounded-lg p-2"
                    />
                    <button className="bg-br-blue-dark text-white p-1 px-3 rounded-lg">1</button>
                    <IconButton
                        iconType="right"
                        onClick={() => handleNotification()}
                        className="hover:text-gray-600 bg-br-gray-light rounded-lg p-2"
                    />
                </div>
        </div>
    )
}

export default Pagination