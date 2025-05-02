/* eslint-disable no-unused-vars */
import { useState } from "react";
import LoginPage from "./components/Authentication/LoginPage";
import { Route, Router, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import ClubSelection from "./components/ClubSelection/ClubSelection";
import BookListing from "./components/BookListing";
import Homepage from "./components/Homepage/Homepage";
import MyBooks from "./components/Mybooks/MyBooks";
import ProfilePage from "./components/ProfilePage";
import MemberList from "./components/Member/MemberList";
import TransactionList from "./components/Transactions/TransactionList";
import ReviewList from "./components/Review/ReviewList";
import ClubList from "./components/Clubs/ClubList";
import SetPassword from "./components/Authentication/SetPassword";
import BookDetails from "./components/BookDetails";
import AddBookModal from "./components/Mybooks/AddBookModal";
import EnterEmail from "./components/Authentication/EnterEmail";
import ResetPassword from "./components/Authentication/ResetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" Component={ClubSelection} />
        <Route path="/signin" Component={LoginPage} />
        <Route path="club-selection" Component={ClubSelection} />
        <Route path="/set-password" Component={SetPassword} />
        <Route path="/forgot-password" Component={EnterEmail} />
        <Route path="/reset-password" Component={ResetPassword} />

        <Route path="/home" Component={Homepage}>
          <Route index element={<Dashboard />} />
          <Route path="books" element={<BookListing />} />
          <Route path="books/book-details" element={<BookDetails />} />

          <Route path="mybooks" element={<MyBooks />} />
          <Route path="mybooks/add-book" element={<AddBookModal/>} />

          <Route path="members" element={<MemberList />} />
          <Route path="transactions" element={<TransactionList />} />
          <Route path="reviews" element={<ReviewList />} />
          <Route path="clubs" element={<ClubList />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
