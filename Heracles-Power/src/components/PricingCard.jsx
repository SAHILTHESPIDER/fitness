import React from 'react'

export const PricingCard = ({ plan, price, features, isHighlighted }) => {
  return (
    <div
    className={`w-full sm:max-w-full md:max-w-sm p-6 rounded-lg shadow-lg transition ${
      isHighlighted ? "bg-black text-white" : "bg-white text-black"
    }`}
  >
    <h3 className={`text-lg font-semibold mb-4 ${isHighlighted?"text-golden":"text-black"} `}>{plan}</h3>
    <div className="flex items-baseline mb-4">
      <span className="text-4xl font-bold">${price}</span>
      <span className="text-lg"> / Month</span>
    </div>
    <p className="text-gray-600 mb-6">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
    </p>
    <ul className="space-y-2 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <svg
            className={`w-4 h-4 mr-2 ${
              isHighlighted ? "text-white" : "text-gray-500"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <button
      className={`w-full py-2 rounded-full font-semibold transition ${
        isHighlighted ? "bg-golden text-black " : "bg-black text-white"
      }`}
    >
      Choose Plan
    </button>
  </div>
  )
}

