import { Book, LayoutDashboard, List, Menu } from 'lucide-react'
import React from 'react'
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'


function Sidebar(props) {
  return (
    <div className={`${props.barstate ? "w-64" : "w-18"} bg-br-blue-medium h-full pt-4 relative transition-all duration-300 ease-in-out`}>
        <div className='flex gap-x-4 items-center hover:cursor-pointer text-br-white px-5 py-5 h-16' onClick={() => {props.barstatechange(!props.barstate)}}>
          <Menu className="flex-shrink-0" />
          <div className={`whitespace-nowrap flex-shrink-0 text-md font-semibold overflow-hidden transition-all duration-300 ${props.barstate ? "w-32 opacity-100" : "w-0 opacity-0"}`}>
            BookCircle
          </div>
        </div>
        
        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

        <NavLink
          to={"/home"}
          className='flex gap-x-4 items-center text-br-white px-5 py-5 h-16'>
          <LayoutDashboard className="flex-shrink-0" />
          <div className={`whitespace-nowrap flex-shrink-0 text-md font-semibold overflow-hidden transition-all duration-300 ${props.barstate ? "w-32 opacity-100" : "w-0 opacity-0"}`}>
            Dashboard
          </div>
        </NavLink>

        <NavLink
          to={"/home/book-listing"}
          className='flex gap-x-4 items-center text-br-white px-5 py-5 h-16'>
          <List className="flex-shrink-0" />
          <div className={`whitespace-nowrap flex-shrink-0 text-md font-semibold overflow-hidden transition-all duration-300 ${props.barstate ? "w-32 opacity-100" : "w-0 opacity-0"}`}>
            Book List
          </div>
        </NavLink>

        <NavLink
          to={"/home/book-transactions"}
          className='flex gap-x-4 items-center text-br-white px-5 py-5 h-16'>
          <Book className="flex-shrink-0" />
          <div className={`whitespace-nowrap flex-shrink-0 text-md font-semibold overflow-hidden transition-all duration-300 ${props.barstate ? "w-32 opacity-100" : "w-0 opacity-0"}`}>
            My Books
          </div>
        </NavLink>
    </div>
  )
}

export default Sidebar