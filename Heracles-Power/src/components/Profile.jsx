import React from 'react';

export default function Profile() {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-5">
      {/* Main container */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl overflow-hidden">
        <div className="md:flex">
          {/* Left Section */}
          <div className="md:w-1/2 bg-black text-white flex flex-col justify-center items-center p-8">
            <h2 className="text-[3rem]  font-bold mb-2">Welcome, Sahil!</h2>
            <p className="text-lg">
              "Your profile reflects your journey. Keep moving forward!"
            </p>
          </div>

          {/* Right Section */}
          <div className="md:w-1/2 p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Profile Info</h1>
            <div className="space-y-4">
              {/* Info Item */}
              <div className="flex items-center">
                <p className="text-2xl font-semibold text-gray-700 w-32">Name:</p>
                <p className="text-xl font-medium text-gray-600">Sahil Gupta</p>
              </div>
              <div className="flex items-center">
                <p className="text-2xl font-semibold text-gray-700 w-32">Email:</p>
                <p className="text-xl font-medium text-gray-600">abc@gmail.com</p>
              </div>
              <div className="flex items-center">
                <p className="text-2xl font-semibold text-gray-700 w-32">Phone:</p>
                <p className="text-xl font-medium text-gray-600">8097759738</p>
              </div>
              <div className="flex items-center">
                <p className="text-2xl font-semibold text-gray-700 w-32">Age:</p>
                <p className="text-xl font-medium text-gray-600">21</p>
              </div>
              <div className="flex items-center">
                <p className="text-2xl font-semibold text-gray-700 w-32">Gender:</p>
                <p className="text-xl font-medium text-gray-600">Male</p>
              </div>
              <div className="flex items-center">
                <p className="text-2xl font-semibold text-gray-700 w-32">Weight:</p>
                <p className="text-xl font-medium text-gray-600">65 kg</p>
              </div>
              <div className="flex items-center">
                <p className="text-2xl font-semibold text-gray-700 w-32">Height:</p>
                <p className="text-xl font-medium text-gray-600">5.6</p>
              </div>
              <div className="flex items-center">
                <p className="text-2xl font-semibold text-gray-700 w-32">Goal:</p>
                <p className="text-xl font-medium text-gray-600">70 kg</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
