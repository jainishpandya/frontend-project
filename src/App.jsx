import { useState } from "react";
import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import { Route, Router, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import ClubSelection from "./components/ClubSelection";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" Component={LoginPage} />
        <Route path="/signin" Component={LoginPage} />
        <Route path="/home" Component={Homepage} />
        <Route path="/club-selection" Component={ClubSelection} />
      </Routes>
    </>
  );
}

export default App;
