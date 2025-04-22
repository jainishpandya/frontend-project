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
import MemberList from "./components/Member/MemberList";
import TransactionList from "./components/Transactions/TransactionList";
import ReviewList from "./components/Review/ReviewList";
import ClubList from "./components/Clubs/ClubList";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" Component={ClubSelection} />
        <Route path="/signin" Component={LoginPage} />
        <Route path="club-selection" Component={ClubSelection} />

        <Route path="/home" Component={Homepage}>
          <Route index element={<Dashboard />} />
          <Route path="books" element={<BookListing />} />
          
          <Route path="mybooks" element={<MyBooks />} />

          <Route path="members" element={<MemberList />} />
          <Route path="transactions" element={<TransactionList />} />
          <Route path="reviews" element={<ReviewList />} />
          <Route path="clubs" element={<ClubList /> } />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
