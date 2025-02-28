import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse the user object
    }
  }, []);

  const authPaths = ["/login", "/signup"];
  const isAuthScreen = authPaths.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`navbar h-12 top-0 z-40 w-screen shadow fixed ${
        sticky ? "shadow-md bg-base-300 duration-300 transition-all ease-in-out" : ""
      } ${isAuthScreen ? "bg-white bg-opacity-20" : ""}`}
    >
      <div className="navbar-start">
        <Link className={`btn btn-ghost text-xl ${isAuthScreen ? "text-white" : ""}`} to="/">
          Fitness
        </Link>
      </div>

      <div className={`navbar-center hidden lg:flex ${isAuthScreen ? "text-white" : ""}`}>
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/bmi">BMI</Link></li>
          <li><Link to="/diet">Diet chart</Link></li>
          <li><Link to="/Fitscreen">Workout</Link></li>
          <li><Link to="/About">About Us</Link></li>
        </ul>
      </div>

      {/* Hide "Join Now" when user is logged in */}
      {!user && (
        <div className={`navbar-end ${isAuthScreen ? "hidden" : ""}`}>
          <Link to="/login" className="btn bg-black text-white">Join Now</Link>
        </div>
      )}

      {user && (
        <div className="navbar-end flex items-center space-x-4">
          {/* Profile Section - Always Visible */}
          <div className="relative flex items-center space-x-2">
            <img
              className="w-10 h-10 rounded-full"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="User Avatar"
            />
            <div className="text-gray-700">
              <p className="text-sm font-semibold text-blue-600">{user.name}</p>
              <Link to="/profile" className="text-blue-500 text-xs">View Profile</Link>
            </div>
          </div>

          {/* Dropdown for Logout */}
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-2 w-32 p-2 shadow">
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    setUser(null);
                  }}
                  className="text-red-500"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
