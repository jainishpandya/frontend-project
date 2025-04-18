import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import ClubDropdown from "../ClubSelection/ClubDropdown";
import { login } from "../../redux/slices/user/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

function ClubSelection() {
  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      
      const token = localStorage.getItem("token");

      if(token){
        console.log("Token:", token);

        axios.defaults.baseURL = "http://localhost:3000/";
        const params = JSON.stringify({
          "token": token,
        });
        const config = {
            headers: { 'content-type': 'application/json' }
        };

        const { data } = await axios.post("/api/v1/user/userdetail", params, config);

        console.log(data)
        if (data.success) {
                console.log(data);
        
                dispatch(login({
                  id: data.user.id,
                  name: data.user.name,
                  email: data.user.email,
                  phone_no: data.user.phone_no,
                  profile_image: data.user.profile_image,
                }))
        }
      } else {
        navigate("/signin");
      }
      
    } catch (error) {
      console.log("Error fetching user Details:", error);
    }
  }

  useEffect(() => {
      getUserData();
    }, [navigate]);

  const handleClubselect = (selectedClub) => {
    console.log("Selected Club:", selectedClub);
  };

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

            <ClubDropdown onSelect={handleClubselect} />

            <button
              onClick={() => navigate("/home")}
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
