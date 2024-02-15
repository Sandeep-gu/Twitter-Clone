import React, { useState, useEffect } from "react";
import Axios from "../../redux/axiosConfig";
import { useDispatch } from "react-redux";
import { setUserDetail } from "../../redux/authSlice";
import axios from "axios";
import toast from "react-hot-toast";
function UpdateProfile({ setIsOpen, isOpen }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const [dob, setdob] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleTweet = async () => {
    try {
      //uploaded file in the backend file and find path od files
      if (!name || !dob || !location) {
        toast.error("Please Fill All Details");
      } else {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const response = await axios.post(
          "http://localhost:5000/api/uploads/upload",
          formData
        );
        console.log(response);

        const contentData = {
          name: name,
          dob: dob,
          location: location,
          image: response?.data?.file?.url,
        };
        const { data } = await Axios.put(
          "http://localhost:5000/api/user/edit-details",
          contentData
        );
        console.log(data);
        dispatch(setUserDetail(data.userData));
        toast.success("User details updated");
        setIsOpen((prev) => !prev);
      }
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
        <p className="text-2xl mb-2">Update Profile</p>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 p-2 mb-2"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-300 p-2 mb-2"
        />
        <input
          type="date"
          placeholder="DOB"
          value={dob}
          onChange={(e) => setdob(e.target.value)}
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
          EDIT
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default UpdateProfile;
