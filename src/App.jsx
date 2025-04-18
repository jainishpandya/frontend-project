/* eslint-disable no-unused-vars */
import { useState } from "react";
import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import { Route, Router, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ClubSelection from "./components/ClubSelection";
import BookListing from "./components/BookListing";
import ScreenHeading from "./components/ScreenHeading";
import ActionBar from "./components/ActionBar";
import Button from "./components/Button";
import book from "./store/book";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" Component={LoginPage} />
        <Route path="/signin" Component={LoginPage} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/club-selection" Component={ClubSelection} />
        <Route path="/book-listing" Component={BookListing} />
        <Route path="/book" Component={book} />
      </Routes>
    </>
  );
}

export default App;
