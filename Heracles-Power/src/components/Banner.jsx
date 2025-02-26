import React from "react";
import model from "../assets/model.png";
import { ReactTyped } from "react-typed";
import { FaGoogle, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";

export const Banner = () => {
  return (
    <>
      <div className="w-screen bg-slate-100 md:h-screen  ">
        {/* Banner body divided into 2 parts */}
        <div className="md:h-[80%] md:flex md:flex-row-reverse flex-col-reverse h-screen  ">
          {/* Right side image div */}
          <div className="md:w-1/2 md:h-full flex justify-end relative md:items-end pt-10    ">
            <div className="bg-custom-black md:w-64 w-full md:h-full absolute md:right-0 md:top-0"></div>
            <img
              src={model}
              className="md:h-96 px-5 relative z-10 md:bottom-0 "
              alt="Model"
            />
          </div>

          {/* Left sided information div */}
          <div className="md:w-1/2 h-1/2 md:h-full flex flex-col md:flex-col md:justify-center px-5 gap-5 pt-5  ">
            <ReactTyped
              className="text-4xl font-bold from-neutral-500 text-golden"
              strings={["ELEVATE YOUR WORKOUT"]}
              typeSpeed={60}
              loop
              backSpeed={50}
            />
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo
              laudantium recusandae dolor laborum autem minima labore molestiae
              explicabo blanditiis qui, odit ratione dolores quia omnis, aut
              facilis impedit. Praesentium, architecto.
            </p>
            <button className="bg-custom-black px-3 py-2 rounded-md text-white w-28">
              {" "}
              Get Started
            </button>
           
          </div>
        </div>

        {/* Bottom black strip */}
        <div className=" bg-custom-black w-full md:h-[20%] md:flex md:items-center text-white md:justify-evenly ">
          {[
            {
              count: "500+",
              label: "Happy Member",
              description: "Our community is growing fast",
            },
            {
              count: "5+",
              label: "Year Experience",
              description: "Experience in various workout",
            },
            {
              count: "13+",
              label: "Certified Trainers",
              description: "Guidance at every step",
            },
            {
              count: "90%",
              label: "Customers satisfaction",
              description: "We ensure your progress satisfaction",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-center">
              <ul className="list-none flex flex-col items-center">
                <li className="md:text-2xl font-sans font-bold">
                  {item.count}
                </li>
                <li className="text-sm">{item.label}</li>
                <li className="text-sm">{item.description}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
