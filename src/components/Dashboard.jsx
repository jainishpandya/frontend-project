import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import Databox from './Databox';

function Dashboard() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);


  return (
    <div className='w-full h-auto flex'>
      <div className='flex w-full items-center justify-between space-x-4'>
        <div className="flex-1">
          <Databox number={7} label="Books Read" />
        </div>
        <div className="flex-1">
          <Databox number={10} label="Books Listed" />
        </div>
        <div className="flex-1">
          <Databox number={3} label="Books Borrowed" />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
