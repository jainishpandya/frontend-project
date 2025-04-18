import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClubSelection from "../ClubSelection/ClubSelection";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/user/userSlice";

function VerificationForm(props) {
  const [code, setCode] = useState();
  const [userId, setUserId] = useState(props.userId);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [codeError, setCodeError] = useState();

  const submitHandler = async () => {
    console.log("hellow");

    if (!userId) {
      console.log("no user id passed");
      return;
    }

    if (!code) {
      setCodeError("this field is empty");
      return;
    }

    try {
      axios.defaults.baseURL = await "http://localhost:3000/";
      const params = JSON.stringify({
        id: userId,
        token: code,
      });
      const config = {
        headers: { "content-type": "application/json" },
      };
      const { data } = await axios.post("/api/v1/auth/verify", params, config);

      if (data.success) {
        console.log(data);

        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (error) {
      console.log("error" + error);
    }
  };

  return (
    <div className="flex flex-col justify-center px-28 w-full h-screen rounded-2xl bg-br-blue-light mt-4">
      <p className="font-medium text-2xl text-br-blue-medium mt-4">
        Welcome back!
      </p>
      <p className="font-medium text-md text-br-blue-medium pe-5">
        Get access to the world of endless imagination.
      </p>
      <div className="mt-4">
        <div className="mt-4">
          <label className="text-md font-medium text-br-blue-medium">
            Verification Code
          </label>
          <div className="flex w-full bg-br-blue-light rounded-xl mt-2">
            <input
              className="bg-white w-full text-br-blue-medium rounded-xl p-4 mx-1"
              placeholder="6-digit Verification Code"
              type="text"
              maxLength={6}
              value={code ?? ""}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <p className="text-red-500 text-xs">{codeError}</p>
        </div>
        <div className="mt-4 flex flex-col gap-y-4">
          <button
            className="py-3 rounded-xl bg-br-blue-medium text-white text-md font-bold"
            onClick={submitHandler}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerificationForm;
