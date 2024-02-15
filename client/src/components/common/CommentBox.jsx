import React, { useState, useEffect } from "react";
import Axios from "../../redux/axiosConfig";
import axios from "axios";
function CommentBox({
  setIsOpenComment,
  isOpenComment,
  tweetId,
  setIsOpenCom,
  isOpenCom,
}) {
  const [comment, setComment] = useState("");

  const handleComment = async () => {
    try {
      const contentData = {
        comment: comment,
      };
      const { data } = await Axios.put(
        `http://localhost:5000/api/tweet/comments/${tweetId}`,
        contentData
      );
      console.log(data);
      setIsOpenCom(!isOpenCom);
      setIsOpenComment((prev) => !prev);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center z-50">
      <div className="bg-white p-4 mt-3 rounded-lg w-96 h-[50%] border-2">
        <p className="text-2xl mb-2">Comments</p>
        <textarea
          type="text"
          placeholder="Write Comments"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-gray-300 p-2 mb-2"
        />
        <button
          onClick={handleComment}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Comment
        </button>
        <button
          onClick={() => setIsOpenComment(!isOpenComment)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default CommentBox;
