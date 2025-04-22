import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ClubDropdown from "../ClubSelection/ClubDropdown";
import { useDispatch } from "react-redux";
import axios from "axios";

function ClubSelection() {
  const navigate = useNavigate();
  const [club, setClub] = useState(0);

  useEffect(() => {
    console.log( "this is use effect on club selection page line 16", club);
  }, [club]);


  

  const handleSubmit = async () => {
    console.log("Selected Club ID:", club.clubId);
    if (club) {
      await localStorage.setItem("clubId", club.clubId);
      await localStorage.setItem("Role", club.roleCode);
      navigate("/home");
    }
  };

  const handleClubselect = (selectedClub) => {
    console.log("Selected Club:", selectedClub);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center w-full h-screen p-3">
      {/* Left Side */}
      <div className="w-full lg:w-full h-full flex flex-col items-center bg-white py-3 px-2">
        <div
          className="bg-br-blue-light items-center w-full py-6 px-4 text-2xl font-bold text-br-blue-medium rounded-2xl mb-4"
          style={{ height: "auto" }}
        >
          BookCircle
        </div>  

        <div className=" flex items-center justify-center bg-br-blue-light w-full h-screen mt-4py-4 px-2 rounded-2xl">
          <div className="items-center text-br-blue-medium  w-full max-w-md">
            <p className="font-bold text-lg">Select Club</p>
            <p className="text-br-blue-medium text-base">
              Get access to a world where imagination never stops
            </p>

            <ClubDropdown onSelect={handleClubselect} setClub={setClub} />

            <button
              onClick={handleSubmit}
              className="w-full bg-br-blue-medium text-white  mt-2 rounded-lg p-3 hover:bg-opacity-90 transition "
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubSelection;
