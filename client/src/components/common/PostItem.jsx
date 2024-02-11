import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegCommentAlt } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

function PostItem({ tweet }) {
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
  return (
    <div className="w-full border border-gray-300 p-4 mb-4 rounded-md">
      <div className="flex items-start">
        <img
          src="https://static.vecteezy.com/system/resources/previews/011/675/382/original/man-avatar-image-for-profile-png.png"
          alt="User Avatar"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div className="flex flex-col">
          <div className="flex">
            <p className="font-semibold">{tweet?.tweetedBy?.name}</p>
            <p className="text-primary-content mx-2">
              @{tweet?.tweetedBy?.username}
            </p>
            <p className="text-primary-content">
              {formatTimestamp(tweet?.createdAt)}
            </p>
          </div>
          <p>{tweet.content}</p>
          <div className="h-[200px]">
            {tweet?.image ? (
              <img
                src={tweet.image}
                className="h-[100%] rounded-md"
                alt="..."
              />
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center mt-2">
            <CiHeart className="mr-1 cursor-pointer" />
            <span className="mr-4">{tweet?.likes?.length} Likes</span>
            <FaRegCommentAlt className="mr-1 cursor-pointer" />
            <span className="mr-4">{tweet?.comments?.length} Comments</span>
            <FaRetweet className="mr-1 cursor-pointer" />
            <span>{tweet?.retweetBy?.length} Retweets</span>
          </div>
        </div>

        <div className="ml-auto">
          <MdDelete className="text-red-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default PostItem;
