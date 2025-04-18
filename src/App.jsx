/* eslint-disable no-unused-vars */
import { useState } from "react";
import LoginPage from "./components/Authentication/LoginPage";
import { Route, Router, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import ClubSelection from "./components/ClubSelection/ClubSelection";
import BookListing from "./components/BookListing";
import Homepage from "./components/Homepage/Homepage";
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
