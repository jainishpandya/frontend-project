import { Menu } from 'lucide-react'
import React from 'react'
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from 'react-icons/tb'

function Sidebar(props) {
    
  return (
    <div className={`${props.barstate ? "w-64 p-5" : "w-24 p-4"} bg-br-blue-medium h-screen gap-y-10 pt-8 relative duration-300 ease-in-out`}>
        {/* Toggle button section */}
        <div className={`absolute cursor-pointer -right-4 top-9 w-8 h-8 p-0.5 bg-zinc-50 border-zinc-50 border-2 rounded-full text-xl flex items-center justify-center ${!props.barstate && "rotate-180"} transition-transform transition-all ease-in-out duration-300`} onClick={() => {props.barstatechange(!props.barstate)}}>
            {props.barstate ? 
            <TbLayoutSidebarLeftExpand /> : <TbLayoutSidebarLeftCollapse />
            }
        </div>

        <div className='flex gap-x-4 items-center text-br-white p-4 '>
        <Menu />
        {
          props.barstate ? 
          <div className='font-bold duration-600 ease-in-out '>BookCircle</div> : <></> 
        } 
        </div>

        { props.barstate ? <div className='items-center'></div> : <div></div>}
        <div className='flex gap-x-4 items-center text-br-white p-4 '>
        <Menu />
        {
          props.barstate ? 
          <div className='font-bold duration-600 ease-in-out '>BookCircle</div> : <></> 
        } 
        </div>
        <div className='flex gap-x-4 items-center text-br-white p-4 '>
        <Menu />
        {
          props.barstate ? 
          <div className='font-bold duration-600 ease-in-out '>BookCircle</div> : <></> 
        } 
        </div>
        <div className='flex gap-x-4 items-center text-br-white p-4 '>
        <Menu />
        {
          props.barstate ? 
          <div className='font-bold duration-600 ease-in-out '>BookCircle</div> : <></> 
        } 
        </div>
        <div className='flex gap-x-4 items-center text-br-white p-4 '>
        <Menu />
        {
          props.barstate ? 
          <div className='font-bold duration-600 ease-in-out '>BookCircle</div> : <></> 
        } 
        </div>
        
    </div>
  )
}

export default Sidebar
