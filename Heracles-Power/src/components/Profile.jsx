import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login"); // Redirect to login if no user found
    } else {
      const parsedUser = JSON.parse(storedUser);
      console.log("User Data in Local Storage:", parsedUser); // Debugging
      setUser(parsedUser);
    }
  }, [navigate]);

  if (!user) {
    return <p className="text-center mt-10 text-xl">Loading...</p>;
  }

  // Convert heightFeet + heightInches into a readable format
  const formattedHeight =
    user.heightFeet && user.heightInches
      ? `${user.heightFeet} ft ${user.heightInches} in`
      : "N/A";

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-5">
      <div className="bg-white shadow-lg rounded-lg w-90% max-w-6xl overflow-hidden relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 font-extrabold border-2 rounded-full p-3 text-2xl"
          onClick={() => navigate("/")}
        >
          X
        </button>
        <div className="flex flex-col md:flex-row w-full">
          {/* Left Section */}
          <div className="w-full md:w-1/2 bg-black text-white flex flex-col justify-center items-center p-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
              Welcome, {user.name}!
            </h2>
            <p className="text-lg text-center">
              "Your profile reflects your journey. Keep moving forward!"
            </p>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center md:text-left">
              Profile Info
            </h1>
            <div className="space-y-4">
              {[
                ["Name", `${user.name} ${user.lastname}`],
                ["Email", user.email],
                ["Phone", user.phone],
                ["Age", user.age !== undefined ? user.age : "Calculating..."],
                ["Gender", user.gender],
                ["Weight", user.weight ? `${user.weight} kg` : "N/A"],
                ["Height", formattedHeight], // Fixed height display
                ["Goal Weight", user.goalWeight ? `${user.goalWeight} kg` : "N/A"], // Fixed goal display
              ].map(([label, value]) => (
                <div className="flex flex-col md:flex-row md:items-center" key={label}>
                  <p className="text-xl md:text-2xl font-semibold text-gray-700 w-full md:w-32">
                    {label}:
                  </p>
                  <p className="text-lg md:text-xl font-medium text-gray-600">{value}</p>
                </div>
              ))}
            </div>

            {/* Logout Button */}
            <div className="flex justify-center md:justify-start">
              <button
                className="bg-red-500 text-white px-5 py-2 mt-5 rounded-md"
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
