import React, { useEffect, useState } from 'react'
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { login } from '../../redux/slices/user/userSlice';
import { clubin } from '../../redux/slices/club/clubSlice';

function Homepage() {
  
  // functions to handle the state of the sidebar and active option
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // state to handle the sidebar
  const [open, setOpen] = useState(false);

  // state to handle the active option in the sidebar
  const [activeOption, setActiveOption] = useState("Dashboard");  

  // function to fetch user data and dispatch it to the redux store
  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        console.log("Token:", token);

        axios.defaults.baseURL = "http://localhost:3000/";
        const params = JSON.stringify({
          token: token,
        });
        const config = {
          headers: { "content-type": "application/json" },
        };

        const { data } = await axios.post(
          "/api/v1/user/userdetail",
          params,
          config
        );

        // console.log(data);
        if (data.success) {
          console.log(data);

          dispatch(
            login({
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              phone_no: data.user.phone_no,
              profile_image: data.user.profile_image,
            })
          );
        }
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.log("Error fetching user Details:", error);
    }
  };

  // function to fetch club data and dispatch it to the redux store
  const getClubData = async () => {
    try {
      const clubId = localStorage.getItem("clubId");

      if (clubId) {
        console.log("Club ID:", clubId);

        axios.defaults.baseURL = "http://localhost:3000/";
        const params = JSON.stringify({
          clubId: clubId,
        });
        const config = {
          headers: { "content-type": "application/json" },
        };

        const { data } = await axios.post(
          "/api/v1/club/clubdetails",
          params,
          config
        );

        console.log(data);
        if (data.success) {
          console.log(data.club);

          dispatch(
            clubin({
              id: data.club.id,
              club_name: data.club.club_name,
              club_contact_email: data.club.club_contact_email,
              club_thumbnail_url: data.club.club_thumbnail_url,
              club_location: data.club.club_location,
              club_status: data.club.club_status,
              created_at: data.club.created_at,
            })
          );
        }
      } else {
        navigate("/signin");
      }
    } catch (error) {
      console.log("Error fetching user Details:", error);
    }
  }

  // useeffect to check if the user is logged in and fetch user and club data everytime the component mounts
  useEffect(() => {
    // fetch JWT token and clubId from local storage
    const token = localStorage.getItem("token");
    const clubId = localStorage.getItem("clubId");
    const Role = localStorage.getItem("Role");

    // check if token and clubId are not present at local storage
    if (!token || !clubId || !Role) {
      navigate("/");
    }

    // call the functions to fetch user and club data
    getUserData();
    getClubData();
    
  }, []);

  return (
    <div className='w-full h-fit flex overflow-hidden'>
      <div className={`${open ? "w-64" : "w-24"} flex-shrink-0 transition-all duration-300`}>
        <Sidebar barstate={open} barstatechange={setOpen} activeOption={activeOption} setActiveOption={setActiveOption} />
      </div>
      <div className={'w-full bg-br-blue-light overflow-y-auto'}>
        <div className={'w-full min-h-screen p-4 color space-y-4'}>
          <Header setActiveOption={setActiveOption} />
          <div className='main-content flex-grow'>
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Homepage
