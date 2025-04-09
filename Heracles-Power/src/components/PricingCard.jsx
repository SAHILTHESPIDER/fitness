import React from "react";

export const PricingCard = ({ plan, price, features, isHighlighted, className }) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-lg transition duration-300 
      ${isHighlighted ? "bg-black text-white" : "bg-white text-black"} 
      ${className}`}
    >
      <h3 className={`text-lg font-semibold mb-4 ${isHighlighted ? "text-yellow-400" : "text-black"}`}>
        {plan}
      </h3>

      <div className="flex items-baseline mb-4">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-lg ml-1">/ {price.length > 3 ? "Year" : "Month"}</span>
      </div>

      <p className="text-gray-600 font-bold mb-6">
        Suitable for newcomers starting their fitness journey
      </p>

      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <svg
              className={`w-5 h-5 mt-1 ${isHighlighted ? "text-white" : "text-green-600"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-2 rounded-full font-semibold transition 
        ${isHighlighted ? "bg-yellow-400 text-black" : "bg-black text-white"}`}
      >
        Choose Plan
      </button>
    </div>
  );
};
