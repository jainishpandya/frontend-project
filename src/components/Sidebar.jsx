import { Book, LayoutDashboard, List, Menu } from 'lucide-react'
import React from 'react'
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'


function Sidebar(props) {
    
  return (
    <div className={`${props.barstate ? "w-64 p-5" : "w-24 p-4"} bg-br-blue-medium h-full  pt-4 relative duration-900 ease-in-out`}>

        <div className='flex gap-x-4 items-center text-br-white px-5 py-5' onClick={() => {props.barstatechange(!props.barstate)}}>
        <Menu  />
        {props.barstate ? <div className={`text-md font-semibold transition-all duration-300 ease-in-out`}>BookCircle</div> : <></>}
        </div>
        <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          
        { props.barstate ? <div className='items-center'></div> : <div></div>}

        
        <NavLink
        to={"/home"}
        className='flex gap-x-4 items-center text-br-white px-5 py-5'>
        <LayoutDashboard />
          {props.barstate ? <div className={`text-md font-semibold`}>Dashboard</div> : <></>}
        </NavLink>

        <NavLink
        to={"/home/book-listing"}
        className='flex gap-x-4 items-center text-br-white px-5 py-5'>
        <List />
          {props.barstate ? <div className={`text-md font-semibold`}>Book List</div> : <></>}
        </NavLink>

        <NavLink
        to={"/home/book-transactions"}
        className='flex gap-x-4 items-center text-br-white px-5 py-5'>
        <Book />
        {props.barstate ? <div className={`text-md font-semibold transition-all duration-300 ease-in-out`}>My Books</div> : <></>}
        </NavLink>
        
    </div>
  )
}

export default Sidebar
