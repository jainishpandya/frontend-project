import React, { useEffect, useState } from 'react'
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Databox from './Databox';
import Footer from './Footer';
import Dashboard from './Dashboard'
import BookListing from './BookListing';

function Homepage() {
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
  
  
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      console.log(localStorage.getItem('token'));
      
      console.log(token);
      
      if (!token) {
        navigate("/");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);
  
    return (
      <div className='w-full flex'>
        <div>
          <Sidebar barstate={open} barstatechange={setOpen} />
        </div>
        <div className={'w-full bg-br-blue-light'}>
          <div className={'w-full h-screen p-3 color space-y-3'}>
            <Header />
            <div className='main-content'>
                <Outlet />
            </div>
          <Footer />
        </div>
      </div>
      </div>
    )
  }

export default Homepage
