import React, { useState } from "react";
import { HiEye, HiEyeSlash, HiCheckCircle } from "react-icons/hi2";
import LoginPage from "./login-page";

function SubscribePage({ onLogin, onBackToLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [showLoginPage, setShowLoginPage] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);

      // Save user registration data to localStorage for persistence
      localStorage.setItem("userRegistered", "true");
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("registrationTimestamp", Date.now().toString());

      console.log("Form submitted:", formData);
    } else {
      setErrors(newErrors);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleContinueToHome = () => {
    // Save authentication state to localStorage for persistence
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userEmail", formData.email);
    localStorage.setItem("loginTimestamp", Date.now().toString());

    // Call onLogin to authenticate and go to HomePage
    onLogin();
  };

  const handleSignIn = () => {
    // Show the LoginPage component
    setShowLoginPage(true);
  };

  const handleBackToSubscribe = () => {
    // Go back to subscribe page from login page
    setShowLoginPage(false);
  };

  // Show LoginPage if user clicked "Sign In"
  if (showLoginPage) {
    return (
      <LoginPage onLogin={onLogin} onBackToSubscribe={handleBackToSubscribe} />
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B0B1A] via-[#1A1A2E] to-[#16213E] flex items-center justify-center p-4">
        <div className="bg-[#1A1A2E] border border-gray-700 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="flex justify-center mb-6">
            <HiCheckCircle className="text-green-500 text-6xl" />
          </div>
          <h2 className="text-white text-2xl font-bold mb-4">
            Welcome to Panamount!
          </h2>
          <p className="text-gray-300 mb-6">
            Your subscription is being processed. You'll receive a confirmation
            email shortly.
          </p>
          <button
            onClick={handleContinueToHome}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Continue to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B1A] via-[#1A1A2E] to-[#16213E]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6">
        <div className="text-white text-xl md:text-2xl font-bold cursor-pointer">
          Panamount
        </div>
        <div className="text-gray-400 text-sm">
          Already have an account?
          <span
            className="text-blue-400 hover:text-blue-300 cursor-pointer ml-1"
            onClick={handleSignIn}
          >
            Sign In
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-8">
        <div className="bg-[#1A1A2E] border border-gray-700 rounded-2xl p-8 max-w-md w-full shadow-2xl">
          <h2 className="text-white text-2xl font-bold text-center mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Join Panamount and start streaming today
          </p>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-[#0B0B1A] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#0B0B1A] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-12"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <HiEyeSlash className="w-5 h-5" />
                ) : (
                  <HiEye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-8">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#0B0B1A] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-12"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? (
                  <HiEyeSlash className="w-5 h-5" />
                ) : (
                  <HiEye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Subscribe Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-6"
          >
            Create Account
          </button>

          {/* Terms */}
          <p className="text-gray-400 text-xs text-center">
            By creating an account, you agree to our{" "}
            <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SubscribePage;
