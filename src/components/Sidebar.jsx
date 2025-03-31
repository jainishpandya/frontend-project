import React from 'react'
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from 'react-icons/tb'

function Sidebar(props) {
    
  return (
    <div className={`${props.barstate ? "w-72 p-5" : "w-20 p-4"} bg-zinc-900 h-screen pt-8 relative duration-300 ease-in-out`}>
        {/* Toggle button section */}
        <div className={`absolute cursor-pointer -right-4 top-9 w-8 h-8 p-0.5 bg-zinc-50 border-zinc-50 border-2 rounded-full text-xl flex items-center justify-center ${!props.barstate && "rotate-180"} transition-transform transition-all ease-in-out duration-300`} onClick={() => {props.barstatechange(!props.barstate)}}>
            {props.barstate ? 
            <TbLayoutSidebarLeftExpand /> : <TbLayoutSidebarLeftCollapse />
            }
        </div>
    </div>
  )
}

export default Sidebar
