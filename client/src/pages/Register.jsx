import React, { useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    username: "", // Corrected the spelling of 'usename' to 'username'
    email: "",
    password: "", // Corrected the spelling of 'pasword' to 'password'
    dob: "",
    location: "",
  });
  const navigate = useNavigate();

  const onChange = (e) => {
    e.preventDefault();
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value })); // Corrected the syntax
    console.log(userDetails);
  };

  const handleSubmitData = async (e) => {
    try {
      if (
        !userDetails.email ||
        !userDetails.password ||
        !userDetails.name ||
        !userDetails.username ||
        !userDetails.location ||
        !userDetails.dob
      ) {
        toast.error("Please fill all the fields");
      } else {
        const { data } = await axios.post(
          "http://localhost:5000/api/auth/register",
          userDetails
        );
        console.log(data);
        toast.success(data.message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="md:h-screen bg-slate-400  flex justify-center items-center border-2">
      <div className="md:w-[80%] w-full md:h-[90%] flex flex-col md:flex-row border-red-100 border-2 shadow-md bg-white  border-r-4">
        <div className="left-col rounded-s-lg h-[200px] md:w-[40%] flex justify-center items-center flex-col text-white w-full md:h-[100%] bg-blue-700 border">
          <p className="font-bold text-3xl">Twitter</p>
          <span>
            <AiFillMessage className="md:text-[100px] text-5xl" />
          </span>
        </div>
        <div className="right-body rounded-e-lg flex justify-center items-center md:w-[60%] h-full">
          <form
            action=""
            className="w-[90%] flex flex-col md:gap-5 gap-3 h-full"
          >
            <h1 className="font-bold text-3xl">Register</h1>
            <input
              type="text"
              placeholder="NAME"
              className="input input-bordered md:w-[50%] "
              value={userDetails.name}
              name="name"
              onChange={(e) => onChange(e)}
            />
            <input
              type="text"
              placeholder="USERNAME"
              className="input input-bordered md:w-[50%] "
              value={userDetails.username}
              name="username"
              onChange={(e) => onChange(e)}
            />
            <input
              type="email"
              placeholder="EMAIL_ADDRESS"
              className="input input-bordered md:w-[50%] "
              value={userDetails.email}
              name="email"
              onChange={(e) => onChange(e)}
            />
            <input
              type="password"
              placeholder="PASSWORD"
              className="input input-bordered md:w-[50%]"
              value={userDetails.password}
              name="password"
              onChange={(e) => onChange(e)}
            />
            <input
              type="date"
              placeholder="DATE OF BIRTH"
              className="input input-bordered md:w-[50%] text-1xl"
              value={userDetails.dob}
              name="dob"
              onChange={(e) => onChange(e)}
            />
            <input
              type="text"
              placeholder="LOCATION"
              className="input input-bordered md:w-[50%] "
              value={userDetails.location}
              name="location"
              onChange={(e) => onChange(e)}
            />
            <button
              type="button"
              onClick={handleSubmitData}
              className="btn self-start px-7 btn-neutral"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
