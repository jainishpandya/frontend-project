/* eslint-disable no-unused-vars */
import { useState } from "react";
import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import { Route, Router, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ClubSelection from "./components/ClubSelection";
import BookListing from "./components/BookListing";
import ActionBar from "./components/ActionBar";
import Button from "./components/Button";
import Homepage from "./components/Homepage";
import MyBooks from "./components/MyBooks";
import ProfilePage from "./components/ProfilePage";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" Component={ClubSelection} />
        <Route path="/signin" Component={LoginPage} />
        <Route path="club-selection" Component={ClubSelection} />

        <Route path="/home" Component={Homepage}>
          <Route index element={<Dashboard />} />
          <Route path="book-listing" element={<BookListing />} />
          <Route path="book-transactions" element={<MyBooks />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
