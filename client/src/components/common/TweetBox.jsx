import React, { useState } from "react";
import Axios from "../../redux/axiosConfig";
import axios from "axios";
function TweetBox({ setIsOpen, isOpen }) {
  const [tweetContent, setTweetContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleTweet = async () => {
    try {
      //uploaded file in the backend file and find path od files
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await axios.post(
        "http://localhost:5000/api/uploads/upload",
        formData
      );
      console.log(response);
      const contentData = {
        content: tweetContent,
        image: response?.data?.file?.url,
      };
      const { data } = await Axios.post(
        "http://localhost:5000/api/tweet/tweets",
        contentData
      );
      console.log(data);
      setIsOpen((prev) => !prev);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);
  return (
    <div className="fixed inset-0 flex justify-center z-50">
      <div className="bg-white p-4 mt-3 rounded-lg w-96 h-[60%] border-2">
        <p className="text-2xl mb-2">New Tweet</p>
        <textarea
          type="text"
          placeholder="What's happening?"
          value={tweetContent}
          onChange={(e) => setTweetContent(e.target.value)}
          className="w-full border border-gray-300 p-2 mb-2"
        />
        <label className="w-full border border-gray-300 p-2 mb-2 flex items-center justify-between cursor-pointer">
          <span>{selectedFile ? selectedFile.name : "Select a file"}</span>
          <input type="file" onChange={handleFileChange} className="hidden" />
        </label>
        {selectedFile && (
          <div className="mb-2 h-[100px] w-[100%]">
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Selected File"
              className="max-w-full h-full"
            />
          </div>
        )}
        <button
          onClick={handleTweet}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Tweet
        </button>
      </div>
    </div>
  );
}

export default TweetBox;
