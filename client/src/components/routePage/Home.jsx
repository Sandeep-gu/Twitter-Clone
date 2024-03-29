import React, { useEffect, useState } from "react";
import PostItem from "../common/PostItem";
import TweetBox from "../common/TweetBox";
import axios from "../../redux/axiosConfig";
import { Audio } from "react-loader-spinner";
function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCom, setIsOpenCom] = useState(false);
  const [multipledata, setMultipleData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isLike, setIsLike] = useState(false);
  //fetch all posts from the server
  useEffect(() => {
    handleMultipleTweets();
  }, [isOpen, isLike, isOpenCom]);

  const handleMultipleTweets = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(
        "http://localhost:5000/api/tweet/multiple-tweets"
      );
      setLoader(false);
      console.log(data.tweets);
      setMultipleData(data.tweets);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className=" border-2 border-red-200 bg-white">
      <div className="flex flex-row m-4 border-b-2 sticky top-0 bg-white z-10">
        <div className="text-2xl">Home</div>
        <button
          className=" bg-blue-600 text-white rounded-md
           px-7 py-2 ml-auto mb-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          Tweet
        </button>
        {isOpen && <TweetBox setIsOpen={setIsOpen} isOpen={isOpen} />}
      </div>
      <div className="m-4">
        {loader ? (
          <div className="h-screen flex justify-center items-center">
            <Audio
              height="80"
              width="80"
              radius="9"
              color="green"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          </div>
        ) : (
          multipledata &&
          multipledata.map((tweet) => {
            return (
              <PostItem
                key={tweet._id}
                tweet={tweet}
                isLike={isLike}
                setIsLike={setIsLike}
                isOpenCom={isOpenCom}
                setIsOpenCom={setIsOpenCom}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Home;
