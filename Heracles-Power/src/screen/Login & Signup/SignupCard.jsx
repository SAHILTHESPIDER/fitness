import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SignupCard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    dob: '',
    gender: '',
    phone: '',
    password: '',
    confirmPassword: '',
    weight: 60,
    heightFeet: 5,
    heightInches: 6,
    goalWeight: 65,
  });

  const notify = (message, type = "error") => toast[type](message);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (Object.values(formData).some((value) => value === '')) {
      notify("All fields are required!");
      return;
    }

    if (formData.phone.length !== 10) {
      notify("Phone number must be 10 digits!");
      return;
    }

    if (formData.password.length < 6) {
      notify("Password must be at least 6 characters long!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      notify("Passwords do not match!");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!formData.weight || !formData.heightFeet || !formData.heightInches || !formData.goalWeight) {
      notify("Please enter weight, height, and goal weight!");
      return;
    }

    const requestBody = {
      ...formData,
      gender: formData.gender.toLowerCase(),
      phone: formData.phone.replace(/\D/g, ""),
      dob: new Date(formData.dob).toISOString(),
      weight: Number(formData.weight),
      heightFeet: Number(formData.heightFeet),
      heightInches: Number(formData.heightInches),
      goalWeight: Number(formData.goalWeight),
    };

    console.log("🚀 Request Body:", requestBody);

    try {
      const response = await axios.post("http://localhost:8080/auth/signup", requestBody, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        notify("Signup successful! Redirecting to login...", "success");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      console.error("❌ Signup Error:", error.response?.data);
      const errorMessage = error.response?.data?.message || JSON.stringify(error.response?.data) || "Signup failed!";
      notify(errorMessage);
    }
  };

  return (
    <> 
      <div className="w-screen h-screen flex justify-end items-center">
        <div className="bg-white bg-opacity-80 md:mx-20 pt-5 pb-3 flex flex-col gap-2 px-7 rounded-2xl">
          <div className="w-full flex justify-center items-center">
            <h1 className="text-5xl py-2">Signup</h1>
          </div>

          {step === 1 ? (
            <>
              <div className="flex gap-2">
                <input type="text" name="name" placeholder="First Name" value={formData.name} onChange={handleChange} className="rounded-md px-3 py-1 w-40"/>
                <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} className="rounded-md px-3 py-1 w-40"/>
              </div>
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="rounded-md px-3 py-1 w-60"/>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="rounded-md px-3 py-1 w-40"/>
              <div className="flex gap-4">
                <label><input type="radio" name="gender" value="male" onChange={handleChange} checked={formData.gender === "male"} className="mr-1"/> Male</label>
                <label><input type="radio" name="gender" value="female" onChange={handleChange} checked={formData.gender === "female"} className="mr-1"/> Female</label>
              </div>
              <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="rounded-md px-3 py-1 w-60"/>
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="rounded-md px-3 py-1 w-60"/>
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="rounded-md px-3 py-1 w-60"/>
              <button className="bg-orange-600 rounded-md text-white block w-full py-1 mt-3" onClick={handleNext}>Next</button>
            </>
          ) : (
            <>
              <label>Weight (kg)</label>
              <input type="range" name="weight" min="30" max="200" value={formData.weight} onChange={handleChange} className="w-full"/>
              <p>{formData.weight} kg</p>

              <label>Height</label>
              <div className="flex gap-2">
                <input type="range" name="heightFeet" min="4" max="7" value={formData.heightFeet} onChange={handleChange} className="w-28"/>
                <input type="range" name="heightInches" min="0" max="11" value={formData.heightInches} onChange={handleChange} className="w-28"/>
              </div>
              <p>{formData.heightFeet} ft {formData.heightInches} in</p>

              <label>Goal Weight (kg)</label>
              <input type="range" name="goalWeight" min="30" max="200" value={formData.goalWeight} onChange={handleChange} className="w-full"/>
              <p>{formData.goalWeight} kg</p>

              <button className="bg-orange-600 rounded-md text-white block w-full py-1 mt-3" onClick={handleSubmit}>Register</button>
            </>
          )}

          <ToastContainer />
          <p>Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
        </div>
      </div>
    </>
  );
};
