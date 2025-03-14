import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import myImage from "../../assets/SignInBG.jpg";
export default function Forget() {
  const [otp, setOtp] = useState(null);
  const [email, setEmail] = useState("");
  const [userOtp, setUserOtp] = useState(["", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Generate a 4-digit OTP
  const generateOtp = () => {
    const newOtp = Math.floor(1000 + Math.random() * 9000);
    setOtp(newOtp);
    setOtpSent(true);
    toast.success("OTP sent successfully!"); // Toast notification
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    let newOtp = [...userOtp];
    newOtp[index] = value.substring(0, 1);
    setUserOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Verify OTP
  const verifyOtp = () => {
    if (parseInt(userOtp.join("")) === otp) {
      toast.success("OTP Verified! Proceed to reset password.");
      setOtpVerified(true);
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  // Handle password reset
  const handlePasswordReset = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    toast.success("Password changed successfully!");
    // Redirect to login after success (optional)
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };

  return (
    <div className="w-screen h-screen md:bg-cover  ">
  

      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-10 w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-4">
            Forgot Password?
          </h2>

          {!otpSent && !otpVerified && (
            <>
              <p className="text-gray-600 text-center mb-6">
                Enter your email, and we'll send you an OTP to reset your password.
              </p>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  generateOtp();
                }}
              >
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition duration-300"
                >
                  Send OTP
                </button>
              </form>
            </>
          )}

          {otpSent && !otpVerified && (
            <>
              <p className="text-center text-gray-700 mb-4">
                Enter the 4-digit OTP sent to <strong>{email}</strong>
              </p>

              <div className="flex justify-center space-x-3 mb-4">
                {userOtp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    maxLength="1"
                    className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                  />
                ))}
              </div>

              <button
                onClick={verifyOtp}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition duration-300"
              >
                Verify OTP
              </button>
            </>
          )}

          {otpVerified && (
            <>
              <p className="text-gray-700 text-center mb-4">Set a new password</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                  />
                </div>

                <button
                  onClick={handlePasswordReset}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition duration-300"
                >
                  Change Password
                </button>
              </div>
            </>
          )}

          <div className="text-center mt-4">
            <Link to="/login" className="text-blue-500 hover:underline text-sm">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
