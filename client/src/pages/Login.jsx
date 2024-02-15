import { TiMessages } from "react-icons/ti";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUserDetail } from "../redux/authSlice";
const Login = () => {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    e.preventDefault();
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value })); // Corrected the syntax
    console.log(userDetails);
  };

  const handleSubmitData = async (e) => {
    try {
      if (!userDetails.email || !userDetails.password) {
        toast.error("Please fill all the fields");
      } else {
        const { data } = await axios.post(
          "http://localhost:5000/api/auth/login",
          userDetails
        );
        console.log(data);
        console.log(data.data.token);
        dispatch(setToken(data.data.token));
        dispatch(setUserDetail(data.data));
        localStorage.setItem("twitterclone", JSON.stringify(data));
        toast.success(data.message);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center border-red-600 border-2">
      <div className="md:w-[70%] w-[90%] border flex flex-col md:flex-row rounded-lg shadow-md md:h-[70%] h-full">
        <div className="left-body rounded-s-lg h-[200px] md:w-[40%] flex justify-center items-center flex-col text-white w-full md:h-full bg-blue-700 border">
          <div className="text-3xl">Welcome Back</div>
          <TiMessages className="md:text-[100px] text-5xl" />
        </div>
        <div className="right-body rounded-e-lg flex justify-center items-center md:w-[60%] h-full">
          <form
            action=""
            className="w-[90%] flex flex-col md:gap-3 gap-3 h-[60%]"
          >
            <h1 className="font-bold text-4xl">Log In</h1>
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full"
              value={userDetails.email}
              name="email"
              onChange={(e) => onChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={userDetails.password}
              name="password"
              onChange={(e) => onChange(e)}
            />
            <button
              type="button"
              onClick={handleSubmitData}
              className="btn self-start px-7 btn-neutral"
            >
              Login
            </button>
            <div>
              <span>
                Create account here?{" "}
                <Link to="/Register" className="text-blue-600 underline">
                  Register Here
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
