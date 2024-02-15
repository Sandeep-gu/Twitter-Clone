import React, { useEffect, useState } from "react";
import axios from "../../redux/axiosConfig";
import PostItem from "../common/PostItem";
import { MdDateRange } from "react-icons/md";
import { CgCalendarDates } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import { useSelector } from "react-redux";
import UpdateProfile from "../common/UpdateProfile";
import { useParams } from "react-router-dom";

function FriendProfile() {
  const [singleTweet, setSingleTweet] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const [auto, setAuto] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isOpenCom, setIsOpenCom] = useState(false);

  const params = useParams();
  console.log(userData);
  useEffect(() => {
    handleSingleData();
  }, [isOpen, auto, isLike, isOpenCom]);
  const handleSingleData = async () => {
    try {
      const id = params.id;
      console.log(id);
      const { data } = await axios.get(
        `http://localhost:5000/api/tweet/single-tweet/${id}`
      );
      if (data) {
        setSingleTweet(data.tweet);
        setUserData(data.tweetedUser);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFollow = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/user/follow/${params.id}`
      );
      if (data) {
        setAuto(!auto);
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCheckFollow = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/user/check-follow/${params.id}`
      );
      setIsFollow(data.success);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUnFollow = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/user/unfollow/${params.id}`
      );
      if (data) {
        setAuto(!auto);
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    handleCheckFollow();
  }, [auto]);
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
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && <UpdateProfile isOpen={isOpen} setIsOpen={setIsOpen} />}
        <div
          className="ml-auto bg-blue-500 mt-2 mr-4 py-1 px-4 rounded-md cursor-pointer text-white"
          onClick={isFollow ? handleUnFollow : handleFollow}
        >
          {isFollow ? "Unfollow" : "follow"}
        </div>
      </div>

      <div className="flex flex-col mt-4 ml-4">
        <p className="text-2xl">{userData.name}</p>
        <p className="text-neutral-content">@{userData.username}</p>
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

export default FriendProfile;
