import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LoginCard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [forgotPassword, setForgotPassword] = useState(false);


  const notify = (message, type = "error") => toast[type](message);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login submit
  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      notify("Email and Password are required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      const userData = response.data.user;
      localStorage.setItem("user", JSON.stringify(userData));
      notify("Login successful!", "success");

      setTimeout(() => navigate("/profile"), 1000);
    } catch (error) {
      notify(error.response?.data?.message || "Login failed!");
    }
  };

  


  return (
    <>
      <div className="w-screen h-screen flex md:justify-end justify-center items-center">
        <div className="bg-white bg-opacity-80 md:mx-20 py-7 flex flex-col gap-2 px-7 rounded-2xl">
          <div className="w-full flex justify-center items-center">
            <h1 className="text-5xl py-3">{forgotPassword ? "Reset Password" : "Login"}</h1>
          </div>

          {/* LOGIN FORM */}
          {!forgotPassword && (
            <>
              <h1 className="text-lg font-medium">Enter your Email</h1>
              <input
                className="rounded-md px-3 py-1 w-60 bg-none outline-1"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />

              <h1 className="text-lg font-medium">Enter your Password</h1>
              <input
                className="rounded-md px-3 py-1 w-60"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />

              <span className="text-xs text-blue-600 cursor-pointer" >
                Forgot Password?
              </span>

              <button
                className="bg-orange-600 rounded-md text-white block w-full py-1 shadow-sm shadow-orange-400"
                onClick={handleSubmit}
              >
                Login
              </button>

              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 ">
                  Signup
                </Link>
              </p>
            </>
          )}

         </div>
          {/* Forget password */}
          
         
             

         
       
      </div>
    </>
  );
};
