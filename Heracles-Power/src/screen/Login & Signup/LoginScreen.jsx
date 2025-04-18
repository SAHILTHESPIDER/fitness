import React from "react";
import { Navbar } from "../../components/Navbar";
import myImage from "../../assets/SignInBG.jpg";
import { LoginCard } from "./LoginCard";
import { useLocation } from "react-router-dom";
import { SignupCard } from "./SignupCard";
import Forget from "./Forget";

export const LoginScreen = () => {
  const location = useLocation(); // Detect current route

  // Check if the current route is the login screen
  const isLoginScreen = location.pathname === "/login";

  return (
    <div
      className="w-screen h-screen md:bg-cover  "
      style={{ backgroundImage: `url(${myImage}) ` }}
    >
      <Navbar />
      <div className={`${isLoginScreen?"block":"hidden"}`}>
      <LoginCard />        
      </div>
      <div className={`${isLoginScreen?"hidden":"block"}`}>
        <SignupCard/>

    </div>
    

    <div className={`${isLoginScreen?"hidden":"block"}`}>
        <Forget/>

    </div>
    </div>
  );
};
