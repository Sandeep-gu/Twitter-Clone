import React, { useEffect, useState } from "react";
import axios from "../../redux/axiosConfig";
import PostItem from "../common/PostItem";
import { MdDateRange } from "react-icons/md";
import { CgCalendarDates } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import { useSelector } from "react-redux";
import UpdateProfile from "../common/UpdateProfile";

function Profile() {
  const [singleTweet, setSingleTweet] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isOpenCom, setIsOpenCom] = useState(false);
  const userData = useSelector((state) => state.auth.userDetail);
  console.log(userData);
  useEffect(() => {
    handleSingleData();
  }, [isOpen, isLike, isOpenCom]);
  const handleSingleData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/tweet/profile-data"
      );
      if (data) {
        console.log(data);
        setSingleTweet(data.tweet);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="h-screen bg-white px-3 flex-start flex flex-col overflow-auto">
      <h4 className="my-2 text-2xl font-semibold">Profile</h4>
      <div className="bg-blue-500 h-[100px] relative"></div>
      <div className="flex ">
        <img
          src={
            userData?.profilepicture
              ? userData.profilepicture
              : "https://static.vecteezy.com/system/resources/previews/011/675/382/original/man-avatar-image-for-profile-png.png"
          }
          className="h-[100px] w-[100px] rounded-full z-50 absolute mt-[-45px]  ml-8 border-2 cursor-pointer"
        />
        {isOpen && <UpdateProfile isOpen={isOpen} setIsOpen={setIsOpen} />}
        <div
          className="ml-auto bg-blue-500 mt-2 mr-4 py-1 px-4 rounded-md cursor-pointer text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          EDIT
        </div>
      </div>

      <div className="flex flex-col mt-4 ml-4">
        <p className="text-2xl">{userData.name}</p>
        <p className="text-primary-gray">@{userData.username}</p>
        <div className="flex flex-wrap text-gray">
          <div className="flex items-center">
            <MdDateRange />
            <p className="ml-2">
              <span>{userData.DOB}</span>
            </p>
          </div>
          <div className="flex items-center ml-4">
            <CgCalendarDates />
            <p className="ml-2">
              <span>{userData.createdAt}</span>
            </p>
          </div>
          {/* <div className="flex flex-col mt-2">
            <FaLocationDot />
            <p className="ml-2">
              <span>{userData.location}</span>
            </p>
          </div> */}
        </div>
        <div className="flex items-center">
          <FaLocationDot />
          <p className="ml-2">
            <span>{userData.location}</span>
          </p>
        </div>
        {userData.followers && userData.following && (
          <div className="flex">
            <div>{`${userData.followers.length} Followers`}</div>
            <div className="ml-3">{`${userData.following.length} Following`}</div>
          </div>
        )}
      </div>
      <div className="h-[50%]  overflow-auto">
        <div className="m-4">
          {singleTweet &&
            singleTweet.map((tweet) => {
              return (
                <PostItem
                  key={tweet._id}
                  tweet={tweet}
                  isOpenCom={isOpenCom}
                  setIsOpenCom={setIsOpenCom}
                  isLike={isLike}
                  setIsLike={setIsLike}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
