import React, { useState } from "react";
import { PricingCard } from "./PricingCard";

export const JoinToday = () => {
  const [isYearly, setIsYearly] = useState(false);

  // Pricing data with monthly and yearly toggle logic
  const plans = [
    {
      plan: "Beginner Plan",
      monthly: "05",
      yearly: "5",
      features: [
        "Includes basic gym or workout access",
        "Access to standard features (e.g., limited equipment, beginner workouts)"
      ],
      isHighlighted: false,
    },
    {
      plan: "Premium Plan",
      monthly: "15",
      yearly: "150",
      features: [
        "Best for serious fitness enthusiasts",
        "Full access to all gym facilities",
        "Advanced training plans & personalized coaching",
        "Priority booking, exclusive classes, and more"
      ],
      isHighlighted: true,
    },
  ];

  return (
    <div className="main w-screen my-11 px-4">
      {/* Header & Toggle */}
      <div className="flex justify-between items-center md:px-10 mb-6 flex-wrap gap-4">
        <div className="title">
          <h6>Pricing Plan</h6>
          <h1 className="md:text-4xl text-2xl font-bold">JOIN TODAY</h1>
        </div>

        {/* Toggle */}
        <div className="inline-flex items-center bg-gray-200 rounded-full p-1">
          <button
            className={`px-3 py-1 rounded-full transition font-medium ${
              !isYearly ? "bg-white text-black" : "text-gray-600"
            }`}
            onClick={() => setIsYearly(false)}
          >
            Monthly
          </button>
          <button
            className={`px-3 py-1 rounded-full transition font-medium ${
              isYearly ? "bg-black text-white" : "text-gray-600"
            }`}
            onClick={() => setIsYearly(true)}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {plans.map((plan, index) => (
          <div className="w-full md:w-1/3 flex" key={index}
          onClick={() =>
            localStorage.setItem("selectedAmount", isYearly ? plan.yearly : plan.monthly)
          }
          >
            <PricingCard
              plan={plan.plan}
              price={isYearly ? plan.yearly : plan.monthly}
              features={plan.features}
              isHighlighted={plan.isHighlighted}
              className="flex flex-col h-full w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
