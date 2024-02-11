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
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Sidebar({ menu, setMenu }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("twitterclone");
    navigate("/login");
  };

  return (
    <div
      className={`flex flex-col w-full gap-5 h-full ${
        !menu ? "md:flex" : "md:hidden"
      }`}
    >
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
