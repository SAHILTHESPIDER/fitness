import React, { useState } from "react";
import exercises from "./Fit.json";

export default function Fit() {
  const [selectedCategory, setSelectedCategory] = useState("Gym");
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    typeof exercises["Gym"] === "object" ? Object.keys(exercises["Gym"])[0] : ""
  );
  const [searchTerm, setSearchTerm] = useState("");

  const getExercises = () => {
    const category = exercises[selectedCategory];
    if (typeof category === "object" && !Array.isArray(category)) {
      return category[selectedSubCategory] || [];
    }
    return category || [];
  };

  const filteredExercises = getExercises().filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gray-100 mt-[3%]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">{selectedCategory} Exercises</h1>
        <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search Exercise..."
            className="border p-2 rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Category Dropdown */}
          <select
            className="p-2 border rounded-md cursor-pointer bg-white"
            value={selectedCategory}
            onChange={(e) => {
              const newCategory = e.target.value;
              setSelectedCategory(newCategory);
              if (
                typeof exercises[newCategory] === "object" &&
                !Array.isArray(exercises[newCategory])
              ) {
                setSelectedSubCategory(Object.keys(exercises[newCategory])[0]);
              } else {
                setSelectedSubCategory("");
              }
            }}
          >
            {Object.keys(exercises).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Subcategory Dropdown (Gym, Yoga) */}
          {typeof exercises[selectedCategory] === "object" &&
            !Array.isArray(exercises[selectedCategory]) && (
              <select
                className="p-2 border rounded-md cursor-pointer bg-white"
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
              >
                {Object.keys(exercises[selectedCategory]).map((subCategory) => (
                  <option key={subCategory} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </select>
            )}
        </div>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {filteredExercises.length > 0 ? (
          filteredExercises.map((exercise, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              <img
                src={exercise.gif}
                alt={exercise.name}
                className="w-full h-60  object-contain rounded-md"
              />
              <h2 className="text-lg font-semibold text-center mt-2">{exercise.name}</h2>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No exercises found...
          </p>
        )}
      </div>
    </div>
  );
}
