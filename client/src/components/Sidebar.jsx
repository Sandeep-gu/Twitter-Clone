// import React from "react";
// import { TiMessages } from "react-icons/ti";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// function Sidebar({ menu, setMenu }) {
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     localStorage.removeItem("twitterclone");
//     navigate("/login");
//   };
//   return (
//     <div className="flex flex-col w-full gap-5 h-full">
//       <TiMessages className="md:text-[50px] text-3xl" />
//       <Link className="btn w-[90%] text-1xl" to="/home">
//         Home
//       </Link>
//       <Link className="btn w-[90%] text-1xl" to="/profile">
//         Profile
//       </Link>
//       <button className="btn w-[90%] text-1xl" onClick={handleLogout}>
//         logout
//       </button>

//       <button className="btn w-[90%] text-1xl mt-auto">Profile Image</button>
//     </div>
//   );
// }

// export default Sidebar;
// Sidebar.jsx
import React from "react";
import { TiMessages } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { setMenu } from "../redux/authSlice";

function Sidebar({}) {
	const navigate = useNavigate();
	const menu = useSelector((state) => state.auth.menu);
	const dispatch = useDispatch();

	const handleLogout = () => {
		localStorage.removeItem("twitterclone");
		navigate("/login");
	};

	return (
		<div
			className={`flex flex-col bg-black justify-center items-center pb-10 pt-10 z-50 w-full gap-5 h-full   ${
				menu ? "inset-0 fixed " : ""
			}`}
		>
			{menu && (
				<button
					onClick={() => dispatch(setMenu())}
					className="absolute block md:hidden right-4 top-4 bg-red-600 px-6 rounded-md py-1"
				>
					Close
				</button>
			)}
			<TiMessages className="md:text-[50px] text-3xl" />
			<Link className="btn w-[90%] text-1xl" to="/home">
				Home
			</Link>
			<Link className="btn w-[90%] text-1xl" to="/profile">
				Profile
			</Link>
			<button className="btn w-[90%] text-1xl" onClick={handleLogout}>
				Logout
			</button>
			<button className="btn w-[90%] text-1xl mt-auto">Profile Image</button>
		</div>
	);
}

export default Sidebar;
