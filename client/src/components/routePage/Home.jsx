import React, { useEffect, useState } from "react";
import PostItem from "../common/PostItem";
import TweetBox from "../common/TweetBox";
import axios from "../../redux/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { setMenu } from "../../redux/authSlice";
function Home() {
	const [isOpen, setIsOpen] = useState(false);
	const [multipledata, setMultipleData] = useState([]);
	const menu = useSelector((state) => state.auth.menu);
	const dispatch = useDispatch();
	//fetch all posts from the server
	useEffect(() => {
		handleMultipleTweets();
	}, []);

	const handleMultipleTweets = async () => {
		try {
			const { data } = await axios.get(
				"http://localhost:5000/api/tweet/multiple-tweets"
			);
			console.log(data.tweets);
			setMultipleData(data.tweets);
		} catch (error) {
			console.log(error.message);
		}
	};
	return (
		<div className="  bg-white">
			<div className="flex items-center flex-row p-4 border-b-2 sticky top-0 bg-white z-10">
				<div className="text-2xl">Home</div>

				<button
					onClick={() => dispatch(setMenu())}
					className="ml-2 block md:hidden bg-blue-600 text-white px-6 py-1 rounded-md"
				>
					Open
				</button>

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
				{multipledata &&
					multipledata.map((tweet) => {
						return <PostItem key={tweet._id} tweet={tweet} />;
					})}
			</div>
		</div>
	);
}

export default Home;
