import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-white px-4 py-10">
      {/* Section: About Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-serif">About Us</h1>

        {/* Star Divider */}
        <div className="flex items-center justify-center mt-4">
          <hr className="w-24 border-gray-800" />
          <span className="mx-3 text-yellow-500 text-2xl">★</span>
          <hr className="w-24 border-gray-800" />
        </div>

        {/* About Text */}
        <p className="mt-6 max-w-2xl mx-auto text-gray-700 text-lg">
          I am passionate about development, design, and creativity, working
          towards improving the fitness industry. Our mission is to create
          innovative, user-friendly solutions across various sectors.
        </p>
      </div>

      {/* Section: Our Team */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold font-serif">Our Team</h2>

        <div className="mt-8 flex justify-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-md">
              <img
                src="../../../public/Screenshot 2025-04-09 115308.png"
                alt="Sahil Gupta"
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-xl font-medium">Sahil Gupta</h3>
            <p className="text-gray-500">Full Stack Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
