import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api"; // ✅ use centralized API
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SignupCard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    dob: "",
    gender: "",
    phone: "",
    password: "",
    confirmPassword: "",
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
    if (
      !formData.name ||
      !formData.lastname ||
      !formData.email ||
      !formData.dob ||
      !formData.gender ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
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

    try {
      const response = await API.post("/auth/signup", requestBody);

      if (response.data.success) {
        notify("Signup successful! Redirecting to login...", "success");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (error) {
      notify(
        error.response?.data?.message || "Signup failed!"
      );
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-screen h-screen flex justify-end items-center">
        <div className="bg-white bg-opacity-80 md:mx-20 pt-5 pb-3 flex flex-col gap-2 px-7 rounded-2xl">
          <h1 className="text-5xl py-2 text-center">Signup</h1>

          {step === 1 ? (
            <>
              <div className="flex gap-2">
                <input name="name" placeholder="First Name" onChange={handleChange} className="rounded-md px-3 py-1 w-40" />
                <input name="lastname" placeholder="Last Name" onChange={handleChange} className="rounded-md px-3 py-1 w-40" />
              </div>

              <input name="email" type="email" placeholder="Email" onChange={handleChange} className="rounded-md px-3 py-1 w-60" />
              <input name="dob" type="date" onChange={handleChange} className="rounded-md px-3 py-1 w-40" />

              <div className="flex gap-4">
                <label>
                  <input type="radio" name="gender" value="male" onChange={handleChange} /> Male
                </label>
                <label>
                  <input type="radio" name="gender" value="female" onChange={handleChange} /> Female
                </label>
              </div>

              <input name="phone" placeholder="Phone" onChange={handleChange} className="rounded-md px-3 py-1 w-60" />
              <input name="password" type="password" placeholder="Password" onChange={handleChange} className="rounded-md px-3 py-1 w-60" />
              <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} className="rounded-md px-3 py-1 w-60" />

              <button className="bg-orange-600 text-white py-1 mt-3 rounded-md" onClick={handleNext}>
                Next
              </button>
            </>
          ) : (
            <>
              <label>Weight (kg)</label>
              <input type="range" name="weight" min="30" max="200" value={formData.weight} onChange={handleChange} />
              <p>{formData.weight} kg</p>

              <label>Height</label>
              <div className="flex gap-2">
                <input type="range" name="heightFeet" min="4" max="7" value={formData.heightFeet} onChange={handleChange} />
                <input type="range" name="heightInches" min="0" max="11" value={formData.heightInches} onChange={handleChange} />
              </div>

              <label>Goal Weight (kg)</label>
              <input type="range" name="goalWeight" min="30" max="200" value={formData.goalWeight} onChange={handleChange} />
              <p>{formData.goalWeight} kg</p>

              <button className="bg-orange-600 text-white py-1 mt-3 rounded-md" onClick={handleSubmit}>
                Register
              </button>
            </>
          )}

          <p className="mt-2 text-sm">
            Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};
