import React from "react";
import { TiMessages } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetail } from "../redux/authSlice";
import { useSelector } from "react-redux";

function Sidebar({ menu, setMenu }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.auth.userDetail);

  const handleLogout = () => {
    localStorage.removeItem("twitterclone");
    dispatch(setUserDetail(null));
    navigate("/login");
  };

  return (
    <div className="flex flex-col active justify-between md:w-[100%] bg-blue-500 h-full p-4 text-white">
      <TiMessages className="md:text-[50px] mr-autotext-3xl" />

      <div className="flex flex-col items-center hover:text-indigo-600 gap-4 mt-4">
        <Link className="btn w-[100%] text-1xl" to="/home">
          Home
        </Link>
        <Link className="btn w-[100%] text-1xl" to="/profile">
          Profile
        </Link>
        <button className="btn w-[100%] text-1xl" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="flex flex-col items-center mt-auto">
        <img
          src={
            profileData?.profilepicture
              ? profileData.profilepicture
              : "https://static.vecteezy.com/system/resources/previews/011/675/382/original/man-avatar-image-for-profile-png.png"
          }
          className="h-12 w-12 rounded-full border-2 cursor-pointer"
          alt="Profile"
        />
        <p className="text-xs">{profileData.name}</p>
      </div>
    </div>
  );
}

export default Sidebar;
