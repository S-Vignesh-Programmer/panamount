import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import SubscribePage from "./subscribe-page";

function LoginPage({ onLogin, userEmail = "", selectedPlan = "" }) {
  const [loginData, setLoginData] = useState({
    email: userEmail || "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showDemo, setShowDemo] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Update loginData when userEmail prop changes
  useEffect(() => {
    if (userEmail && userEmail !== loginData.email) {
      setLoginData((prev) => ({ ...prev, email: userEmail }));
    }
  }, [userEmail]);

  const handleLogin = async () => {
    const newErrors = {};
    setIsLoading(true);

    if (!loginData.email) {
      newErrors.email = "Email is required";
    } else if (loginData.email !== "demo@panamount.com") {
      newErrors.email = "Please use the demo email: demo@panamount.com";
    }

    if (!loginData.password) {
      newErrors.password = "Password is required";
    } else if (loginData.password !== "demo123") {
      newErrors.password = "Please use the demo password: demo123";
    }

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);

    if (Object.keys(newErrors).length === 0) {
      // Clear any existing errors
      setErrors({});

      // Save authentication state to sessionStorage for session persistence
      sessionStorage.setItem("isAuthenticated", "true");
      sessionStorage.setItem("userEmail", loginData.email);
      sessionStorage.setItem("loginTimestamp", Date.now().toString());
      if (selectedPlan) {
        sessionStorage.setItem("selectedPlan", selectedPlan);
      }

      // Call onLogin to authenticate and go to HomePage
      console.log("Login successful, calling onLogin...");
      onLogin();
    } else {
      setErrors(newErrors);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const fillDemoCredentials = () => {
    setLoginData({ email: "demo@panamount.com", password: "demo123" });
    setErrors({});
  };

  const handleCreateAccount = () => {
    setCurrentPage("subscribe");
  };

  const handleBackToLogin = () => {
    setCurrentPage("login");
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  // Handle subscription completion from SubscribePage
  const handleSubscribeComplete = () => {
    // Save authentication state
    sessionStorage.setItem("isAuthenticated", "true");
    sessionStorage.setItem(
      "userEmail",
      loginData.email || "demo@panamount.com"
    );
    sessionStorage.setItem("loginTimestamp", Date.now().toString());

    // Call onLogin to authenticate and go to HomePage
    onLogin();
  };

  // If user is on subscribe page, show SubscribePage
  if (currentPage === "subscribe") {
    return (
      <SubscribePage
        onLogin={onLogin}
        onBackToLogin={handleBackToLogin}
        onSubscribeComplete={handleSubscribeComplete}
        userEmail={loginData.email || userEmail}
        selectedPlan={selectedPlan}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white rounded-full opacity-20 animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Brand/Marketing Content */}
        <div className="lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
          <div
            className={`max-w-md lg:max-w-lg text-center lg:text-left transform transition-all duration-1000 ${
              animationComplete
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-white">
                Panamount
              </h1>
            </div>

            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 ml-3 leading-tight">
              Welcome to the
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                Future
              </span>
            </h2>

            <p className="text-gray-300 text-lg mb-8 ml-6 leading-relaxed">
              Experience cutting-edge entertainment with our revolutionary
              platform. Join millions of users worldwide in the next generation
              of streaming.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
          <div
            className={`w-full max-w-md transform transition-all duration-1000 ${
              animationComplete
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            {/* Demo Credentials Banner */}
            {showDemo && (
              <div className="mb-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-pulse"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-blue-400 mr-2" />
                      <h3 className="text-blue-200 font-semibold">
                        Demo Access
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowDemo(false)}
                      className="text-blue-400 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-white/10"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-blue-300/80 text-sm mb-3">
                    Quick access credentials:
                  </p>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex items-center justify-between bg-black/20 rounded-lg p-2">
                      <span className="text-blue-200">Email:</span>
                      <code className="text-blue-300 font-mono text-xs">
                        demo@panamount.com
                      </code>
                    </div>
                    <div className="flex items-center justify-between bg-black/20 rounded-lg p-2">
                      <span className="text-blue-200">Password:</span>
                      <code className="text-blue-300 font-mono text-xs">
                        demo123
                      </code>
                    </div>
                  </div>
                  <button
                    onClick={fillDemoCredentials}
                    className="w-full mt-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    Auto-fill credentials
                  </button>
                </div>
              </div>
            )}

            {/* Login Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                    Sign In
                  </h2>
                  <p className="text-gray-400">
                    Enter your credentials to continue
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="block text-white text-sm font-medium">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail
                        className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                          focusedField === "email"
                            ? "text-purple-400"
                            : "text-gray-400"
                        }`}
                      />
                      <input
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full pl-12 pr-4 py-4 bg-black/20 border rounded-2xl text-white placeholder-gray-400 
                          transition-all duration-200 focus:outline-none focus:ring-2 focus:scale-[1.02] backdrop-blur-sm
                          ${
                            errors.email
                              ? "border-red-500 focus:ring-red-500/50"
                              : focusedField === "email"
                              ? "border-purple-500 focus:ring-purple-500/50"
                              : "border-white/20 hover:border-white/30"
                          }`}
                        placeholder="Enter your email address"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-sm flex items-center">
                        <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="block text-white text-sm font-medium">
                      Password
                    </label>
                    <div className="relative group">
                      <Lock
                        className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                          focusedField === "password"
                            ? "text-purple-400"
                            : "text-gray-400"
                        }`}
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={loginData.password}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full pl-12 pr-14 py-4 bg-black/20 border rounded-2xl text-white placeholder-gray-400 
                          transition-all duration-200 focus:outline-none focus:ring-2 focus:scale-[1.02] backdrop-blur-sm
                          ${
                            errors.password
                              ? "border-red-500 focus:ring-red-500/50"
                              : focusedField === "password"
                              ? "border-purple-500 focus:ring-purple-500/50"
                              : "border-white/20 hover:border-white/30"
                          }`}
                        placeholder="Enter your password"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-white/10"
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-400 text-sm flex items-center">
                        <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Login Button */}
                  <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
                      text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] 
                      hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed 
                      disabled:transform-none relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="relative z-10 flex items-center justify-center">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          Signing In...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                        </>
                      )}
                    </span>
                  </button>

                  {/* Additional Options */}
                  <div className="text-center pt-4">
                    <p className="text-gray-400 text-sm">
                      New to Panamount?{" "}
                      <button
                        onClick={handleCreateAccount}
                        className="text-purple-400 hover:text-purple-300 transition-colors duration-200 font-medium"
                        disabled={isLoading}
                      >
                        Create Account
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default LoginPage;
