import axios from "../../redux/axiosConfig";
import React, { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegCommentAlt } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CommentBox from "./CommentBox";
function Retweet({
  tweet,
  isLike,
  setIsLike,
  isOpenCom,
  setIsOpenCom,
  username,
}) {
  const [check, setCheck] = useState(false);
  const [isOpenComment, setIsOpenComment] = useState(false);
  const authUser = useSelector((state) => state.auth.userDetail);

  console.log("tweeted", tweet);
  const formatTimestamp = (timestamp) => {
    if (!timestamp) {
      return "Invalid timestamp";
    }
    console.log(typeof timestamp);
    const timestampDate = new Date(timestamp);
    const now = Date.now();
    const diffInSeconds = Math.floor((now - timestampDate) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} second${diffInSeconds !== 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  };

  const handleLike = async (event) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/tweet/likes/${tweet._id}`
      );
      if (data) {
        console.log(data);
        setIsLike(!isLike);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleunLike = async (event) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/tweet/unlikes/${tweet._id}`
      );
      if (data) {
        console.log(data);
        setIsLike(!isLike);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDelete = async (event) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/tweet/delete-tweets/${tweet._id}`
      );
      if (data.success) {
        console.log(data);
        setIsLike(!isLike);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handlelikeandunlike = async (event) => {
    try {
      console.log("liked", tweet);
      const { data } = await axios.get(
        `http://localhost:5000/api/tweet/check-like/${tweet._id}`
      );
      if (data) {
        console.log("likeunlikecheck", data);
        setCheck(data.success);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleRetweet = async (event) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/tweet/retweet/${tweet._id}`
      );
      if (data) {
        console.log(data);
        setIsLike(!isLike);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    handlelikeandunlike();
  }, [isLike]);
  return (
    <div className="w-full border border-gray-300 p-4 mb-4 rounded-md cursor-pointer">
      {username ? (
        <p className="ml-11 text-gray-500">Retweeted by @{username}</p>
      ) : (
        ""
      )}
      <div className="flex items-start">
        <Link to={`/tweetpage/${tweet._id}`}>
          <img
            src="https://static.vecteezy.com/system/resources/previews/011/675/382/original/man-avatar-image-for-profile-png.png"
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-3 cursor-pointer"
          />
        </Link>
        <div className="flex flex-col">
          <div className="flex">
            <p className="font-semibold">{tweet?.tweetedBy?.name}</p>
            <Link to={`/friendprofile/${tweet?.tweetedBy?._id}`}>
              <p className="text-gray-500 mx-2">
                @{tweet?.tweetedBy?.username}
              </p>
            </Link>

            <p className="text-primary-content">
              {formatTimestamp(tweet?.createdAt)}
            </p>
          </div>
          <Link to={`/tweetpage/${tweet._id}`}>
            <p>{tweet.content}</p>
          </Link>

          <div className={`${tweet.image ? "h-[200px]" : ""}`}>
            {tweet?.image ? (
              <Link to={`/tweetpage/${tweet._id}`}>
                <img
                  src={tweet.image}
                  className="h-[100%] rounded-md"
                  alt="..."
                />
              </Link>
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center mt-2">
            <CiHeart
              className={`mr-1 cursor-pointer ${check ? "text-error" : ""}`}
              onClick={(event) => {
                check ? handleunLike(event) : handleLike(event);
              }}
            />
            <span className="mr-4">{tweet?.likes?.length}</span>
            <FaRegCommentAlt
              className="mr-1 cursor-pointer text-primary"
              onClick={(event) => {
                setIsOpenComment(!isOpenComment);
              }}
            />
            <span className="mr-4">{tweet?.comments?.length}</span>
            {isOpenComment ? (
              <CommentBox
                isOpenComment={isOpenComment}
                setIsOpenComment={setIsOpenComment}
                tweetId={tweet._id}
                isOpenCom={isOpenCom}
                setIsOpenCom={setIsOpenCom}
              />
            ) : (
              ""
            )}
            <FaRetweet
              className="mr-1 cursor-pointer text-info"
              onClick={(event) => {
                handleRetweet(event);
              }}
            />
            <span>{tweet?.retweetBy?.length}</span>
          </div>
        </div>

        <div className="ml-auto">
          {authUser.username === tweet?.tweetedBy?.username ? (
            <MdDelete
              className="text-red-500 cursor-pointer"
              onClick={(event) => {
                handleDelete(event);
              }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Retweet;
