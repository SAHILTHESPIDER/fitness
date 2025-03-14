import React, { useState } from "react";

const exercises = {
  Gym: [
    { name: "Bench Press", gif: "bench_press.gif" },
    { name: "Deadlift", gif: "deadlift.gif" },
  ],
  Yoga: [
    { name: "Downward Dog", gif: "downward_dog.gif" },
    { name: "Warrior Pose", gif: "warrior_pose.gif" },
  ],
  Home: [
    { name: "Push-ups", gif: "push_ups.gif" },
    { name: "Squats", gif: "squats.gif" },
  ],
};

export default function Fit() {
  const [selectedCategory, setSelectedCategory] = useState("Gym");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExercises = exercises[selectedCategory].filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-5 bg-gray-100">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-5">
        <h1 className="text-3xl font-bold text-gray-800 mb-3 md:mt-[5%]">
          {selectedCategory} Exercises
        </h1>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Search Exercise..."
            className="border p-2 rounded-md w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-2">
            {Object.keys(exercises).map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-md font-semibold ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Exercises List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredExercises.map((exercise, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={exercise.gif}
              alt={exercise.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold text-center mt-2">
              {exercise.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
