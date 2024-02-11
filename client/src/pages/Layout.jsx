import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function Layout() {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let auth = localStorage.getItem("twitterclone");

    console.log(JSON.parse(auth));
    if (!auth) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="h-screen flex border-red-600 border-2">
      <div className=" h-[100%] md:w-[20%] w-0 border-black border-1 bg-black text-white">
        <Sidebar menu={menu} setMenu={setMenu} />
      </div>
      <div className="h-[100%] w-[100%] border-white-500 border-2 bg-slate-400 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
// Layout.jsx
// import React, { useEffect, useState } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// function Layout() {
//   const [menu, setMenu] = useState(false);
//   const navigate = useNavigate();
//   const token = useSelector((state) => state.auth.token);

//   useEffect(() => {
//     let auth = localStorage.getItem("twitterclone");

//     console.log(JSON.parse(auth));
//     if (!token) {
//       navigate("/login");
//     }
//   }, [navigate]);

//   return (
//     <div className="h-screen flex border-red-600 border-2">
//       {/* Button to toggle sidebar on small screens */}
//       <button
//         className="md:hidden p-2 text-white"
//         onClick={() => setMenu(!menu)}
//       >
//         Toggle Menu
//       </button>

//       {/* Sidebar with conditional styles */}
//       <div
//         className={`h-[100%] md:w-[20%] w-${
//           menu ? "full" : "0"
//         } border-black border-1 bg-black text-white transition-all duration-300`}
//       >
//         <Sidebar menu={menu} setMenu={setMenu} />
//       </div>

//       {/* Main content */}
//       <div className="h-[100%] w-[100%] border-white-500 border-2 bg-slate-400 overflow-auto">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default Layout;
