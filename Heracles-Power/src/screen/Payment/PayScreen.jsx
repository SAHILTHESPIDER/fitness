import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pay from './Pay';
import { Footer } from '../../components/Footer';

export default function PayScreen() {
  const [sticky, setSticky] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
    <>
      <div
        className={`navbar h-16 top-0 z-40 w-screen shadow fixed ${
          sticky ? "shadow-md bg-base-300 duration-300 transition-all ease-in-out" : ""
        }`}
      >
        <div className="navbar-start">
          <Link to="/">
            Hercules Power
          </Link>
        </div>

        <div>
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/bmi">BMI</Link></li>
            <li><Link to="/diet">Diet chart</Link></li>
            <li><Link to="/Fitscreen">Workout</Link></li>
            <li><Link to="/About">About Us</Link></li>
          </ul>
        </div>

        {user && (
          <div className="navbar-end flex items-center space-x-4">
            <div className="relative flex items-center space-x-2">
              <img
                className="w-10 h-8 rounded-full"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="User Avatar"
              />
              <div className="text-gray-700">
                <p className="text-sm font-semibold text-blue-600">{user.name}</p>
                <Link to="/profile" className="text-blue-500 text-xs">View Profile</Link>
              </div>
            </div>

            <div className="dropdown dropdown-end">
              <button className="btn btn-ghost btn-circle text-red-300">
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

      <Pay />
      <Footer />
    </>
  );
}
