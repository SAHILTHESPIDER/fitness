import React, { useState } from "react";
import { PricingCard } from "./PricingCard";

export const JoinToday = () => {
  const [isYearly, setIsYearly] = useState(false);

//   pricingcard data 
  const plans = [
    {
      plan: "Beginner Plan",
      price: "05",
      features: [
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
      ],
      isHighlighted: false,
    },
    {
      plan: "Premium Plan",
      price: "15",
      features: [
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
      ],
      isHighlighted: true,
    },
     
  ];
  return (
    <>
      {/* main div  */}
      <div className="main w-screen my-11 px-4">
        {/* containing 2 div 1st is Join Today title div and 2nd div is toggle button  */}
        <div className="flex justify-between md:px-10">
          <div className="title">
            <h6>Pricing Plan</h6>
            <h1 className="md:text-4xl text-2xl font-bold">JOIN TODAY </h1>
          </div>
          {/* Monthly and Yearly Toggle button  */}
          <div>            
            <div className="inline-flex items-center bg-gray-200 rounded-full p-1">
              <button
                className={`px-2 py-1 rounded-full transition ${
                  !isYearly ? "bg-white text-black" : "text-gray-500"
                }`}
                onClick={() => setIsYearly(false)}
              >
                Monthly
              </button>
              <button
                className={`px-2 py-1 rounded-full transition ${
                  isYearly ? "bg-black text-white" : "text-gray-500"
                }`}
                onClick={() => setIsYearly(true)}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>
        {/* PricingCard section */}
        <div className="flex flex-wrap justify-center space-y-4 md:space-y-0 md:space-x-6 md:my-4">
      {plans.map((plan, index) => (
        <div className="w-full sm:w-full md:w-1/3 px-4" key={index}>
          <PricingCard {...plan} />
        </div>
      ))}
    </div>
      </div>
    </>
  );
};
