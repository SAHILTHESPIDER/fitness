import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Profile from "./Profile";

export const Navbar = () => {
  const [toggle, setToggle] = useState(true);
  const [sticky, setSticky]=useState(false)
  const location = useLocation(); // Detect current route

  const authPaths = ["/login", "/signup"];

  // Check if the current route is either login or signup screen
  const isAuthScreen = authPaths.includes(location.pathname);
  
  useEffect(()=>{
    const handleScroll=()=>{
      if(window.scrollY>0){
        setSticky(true);
      }else{
        setSticky(false)
      }
    }
    window.addEventListener("scroll",handleScroll);
    return()=>{
      window.removeEventListener("scroll",handleScroll)
    }
  },[])
  return (
    <>
      <div className={`navbar h-12 top-0 z-40 w-screen shadow fixed ${sticky?"shadow-md bg-base-300 duration-300 transition-all ease-in-out":""} 
                          ${isAuthScreen?"bg-white bg-opacity-20":""} `}>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {/* small device navbar  */}
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow `}
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/bmi">BMI</Link>
              </li>
              <li>
                <Link to="/diet">Diet chart</Link>
              </li>
              <li>
                <Link to="/Fitscreen">Workout</Link>
              </li>
              <li>
                <Link to="/About">About Us</Link>
              </li>
            </ul>
          </div>
          <Link className={`btn btn-ghost text-xl ${isAuthScreen?"text-white":""}`} to="/">
            Fitness
          </Link>
        </div>
          {/* desktop view navbar  */}
        <div className={`navbar-center hidden lg:flex ${isAuthScreen?"text-white":""}`}>
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to='/bmi'>BMI</Link>
            </li>
            <li>
              <Link to="/diet">Diet chart</Link>
            </li>
            <li>
              <Link to="/Fitscreen">Workout</Link>
            </li>
            <li>
              <Link to="/About">About Us</Link>
            </li>
          </ul>
        </div>
        <div className={`navbar-end ${isAuthScreen?"hidden":""}`}>
          <Link to='/login' className="btn bg-black text-white">Join Now</Link>
        </div>
        {toggle ? (
          <div className={`dropdown dropdown-end ${isAuthScreen?"hidden":""} `}>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
               
                <Link className="justify-between" to="/profile">Profile
                  
                  <span className="badge">New</span>
                  </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
