import React, { useState } from "react";
import { FaMale, FaFemale } from "react-icons/fa";
import ReactSpeedometer from "react-d3-speedometer";

export const BmiScreen = () => {
  const [Gender, setGender] = useState("");
  const [Age, setAge] = useState("");
  const [Weight, setWeight] = useState("");
  const [Height, setHeight] = useState("");
  const [Bmi, setBmi] = useState(null);
  const [Messages, setMessages] = useState("");

  const CalculateBmi = (e) => {
    e.preventDefault();

    if (!Age || !Weight || !Height || !Gender) {
      setMessages("Please fill all the fields.");
      return;
    }

    if (Age <= 0 || Weight <= 0 || Height <= 0) {
      setMessages("Please enter positive values for age, weight, and height.");
      return;
    }

    const heightInMeters = Height / 100;
    const bmiValue = (Weight / heightInMeters ** 2).toFixed(2);
    setBmi(bmiValue);

    let bmiMessage = "";
    if (bmiValue < 18.5) {
      bmiMessage = "Underweight";
    } else if (bmiValue < 25) {
      bmiMessage = "Normal Weight";
    } else if (bmiValue < 30) {
      bmiMessage = "Overweight";
    } else {
      bmiMessage = "Obese";
    }

    if (Gender === "female") {
      bmiMessage += " (Women)";
    } else if (Gender === "male") {
      bmiMessage += " (Men)";
    }

    setMessages(bmiMessage);
  };

  const ResetForm = () => {
    setGender("");
    setAge("");
    setWeight("");
    setHeight("");
    setBmi(null);
    setMessages("");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold my-16">BMI Calculator</h1>
      </div>

      {/* Form */}
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <div className="w-full md:w-1/2 border p-5 rounded shadow-lg">
          <p className="text-gray-600 mb-4">
            BMI (Body Mass Index) is a measure of body fat based on height and
            weight. It's not a precise indicator of health but provides a
            general guideline.
          </p>

          {/* Gender Selection */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Gender:</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <FaMale className="text-xl" />
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={Gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <span>Male</span>
              </label>
              <label className="flex items-center space-x-2">
                <FaFemale className="text-xl" />
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={Gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <span>Female</span>
              </label>
            </div>
          </div>

          {/* Age, Weight, and Height */}
          <div className="flex flex-col space-y-4">
            <input
              className="p-2 border rounded"
              type="text"
              placeholder="Enter your Age"
              onChange={(e) => setAge(e.target.value)}
              value={Age}
            />
            <input
              className="p-2 border rounded"
              type="text"
              placeholder="Enter weight in kg"
              onChange={(e) => setWeight(e.target.value)}
              value={Weight}
            />
            <input
              className="p-2 border rounded"
              type="text"
              placeholder="Enter height in cm"
              onChange={(e) => setHeight(e.target.value)}
              value={Height}
            />
          </div>

          {/* Buttons */}
          <div className="mt-5 flex space-x-4">
            <button
              onClick={CalculateBmi}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Calculate
            </button>
            <button
              onClick={ResetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Speedometer */}
        <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
          <ReactSpeedometer
            value={Bmi ? parseFloat(Bmi) : 0}
            minValue={0}
            maxValue={50}
            customSegmentStops={[0, 18.5, 25, 30, 50]}
            segmentColors={["firebrick", "tomato", "gold", "limegreen"]}
            needleColor="steelblue"
            currentValueText={`BMI: ${Bmi ? Bmi : "N/A"}`}
          />
        </div>
      </div>

      {/* Results */}
      {Bmi && (
        <div className="mt-5 mb-2 text-center">
          <p className="text-xl">Your BMI: {Bmi}</p>
          <p className="text-xl">Status: {Messages}</p>
        </div>
      )}
      {Messages && !Bmi && (
        <div className="mt-5 text-center text-red-600">
          <p className="text-lg">{Messages}</p>
        </div>
      )}
    </div>
  );
};
