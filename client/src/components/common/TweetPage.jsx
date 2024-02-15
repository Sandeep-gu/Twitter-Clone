import React from "react";
import { useState, useEffect } from "react";
import axios from "../../redux/axiosConfig";
import { useParams } from "react-router-dom";
import PostItem from "./PostItem";
function TweetPage() {
  const [singleTweet, setSingleTweet] = useState([]);
  const [tweeted, setTweeted] = useState([]);
  const [content, setContent] = useState("");
  const [isLike, setIsLike] = useState(false);
  const [isOpenCom, setIsOpenCom] = useState(false);
  const params = useParams();
  useEffect(() => {
    handleSingleData();
  }, [isLike, isOpenCom]);
  const handleSingleData = async () => {
    try {
      const id = params.id;
      console.log(id);
      const { data } = await axios.get(
        `http://localhost:5000/api/tweet/singletweet/${id}`
      );
      if (data) {
        console.log(data);
        setSingleTweet(data?.tweet?.replies);
        setTweeted(data.tweet);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleReply = async (e) => {
    try {
      e.preventDefault();
      const reply = {
        content: content,
      };
      console.log(reply);
      const { data } = await axios.put(
        `http://localhost:5000/api/tweet/reply/${params.id}`,
        reply
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-[100%] flex flex-col bg-white pl-3">
      <div className="h-[90%] overflow-auto">
        <div className="text-2xl text-black">Tweet</div>
        <PostItem
          tweet={tweeted}
          isLike={isLike}
          setIsLike={setIsLike}
          isOpenCom={isOpenCom}
          setIsOpenCom={setIsOpenCom}
        />
        <div className="text-1xl text-black">Reply</div>
        {singleTweet &&
          singleTweet?.map((tweet) => (
            <PostItem
              key={tweet._id}
              tweet={tweet}
              isLike={isLike}
              setIsLike={setIsLike}
              isOpenCom={isOpenCom}
              setIsOpenCom={setIsOpenCom}
            />
          ))}
      </div>

      <div className="flex h-[10%] items-center justify-between p-4 border-t border-black">
        <input
          className="w-full p-2 border border-gray-400 rounded-md"
          type="text"
          value={content}
          placeholder="Reply"
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={(e) => {
            handleReply(e);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default TweetPage;
