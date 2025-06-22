import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  Star,
  Zap,
  Shield,
  Download,
  Monitor,
  Smartphone,
  Tv,
  Users,
  Clock,
  Globe,
  Award,
  ArrowLeft,
  Home,
} from "lucide-react";

function PricingPage({ onPlanSelect }) {
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const navigate = useNavigate();

  const plans = [
    {
      id: "basic",
      name: "Basic",
      monthlyPrice: 749,
      yearlyPrice: 7499,
      description: "Perfect for casual viewers who want quality entertainment",
      quality: "Good",
      resolution: "720p HD",
      devices: "1",
      downloads: "1 device",
      features: [
        "Watch on 1 supported device",
        "720p HD streaming quality",
        "Download content on 1 device",
        "Ad-free experience",
        "Mobile streaming",
        "Basic customer support",
      ],
      limitations: [
        "No simultaneous streaming",
        "Limited to 720p resolution",
        "Single device downloads only",
      ],
      icon: Monitor,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "standard",
      name: "Standard",
      monthlyPrice: 1079,
      yearlyPrice: 10799,
      description: "Great for small families who want Full HD quality",
      quality: "Great",
      resolution: "1080p Full HD",
      devices: "2",
      downloads: "2 devices",
      features: [
        "Watch on 2 supported devices simultaneously",
        "1080p Full HD streaming",
        "Download content on 2 devices",
        "Ad-free experience",
        "All device types supported",
        "Standard customer support",
        "Profile management",
        "Parental controls",
      ],
      limitations: [
        "Limited to 2 simultaneous streams",
        "No 4K or HDR content",
      ],
      icon: Smartphone,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "premium",
      name: "Premium",
      monthlyPrice: 1329,
      yearlyPrice: 13299,
      description: "Ultimate experience for families who demand the best",
      quality: "Best",
      resolution: "4K Ultra HD + HDR",
      devices: "4",
      downloads: "4 devices",
      features: [
        "Watch on 4 supported devices simultaneously",
        "4K Ultra HD + HDR streaming",
        "Download content on 4 devices",
        "Spatial audio & Dolby Atmos",
        "All device types supported",
        "Priority customer support",
        "Advanced profile management",
        "Enhanced parental controls",
        "Offline viewing up to 30 days",
        "Early access to new releases",
      ],
      limitations: [],
      popular: true,
      icon: Tv,
      color: "from-purple-500 to-pink-500",
    },
  ];

  const additionalFeatures = [
    {
      icon: Globe,
      title: "Global Content Library",
      description:
        "Access thousands of movies, TV shows, and documentaries from around the world",
    },
    {
      icon: Download,
      title: "Offline Downloads",
      description:
        "Download your favorite content and watch anywhere, even without internet",
    },
    {
      icon: Shield,
      title: "Secure Streaming",
      description:
        "Industry-leading security with encrypted streaming and secure payments",
    },
    {
      icon: Users,
      title: "Multiple Profiles",
      description:
        "Create personalized profiles for each family member with custom recommendations",
    },
    {
      icon: Clock,
      title: "No Contracts",
      description:
        "Cancel anytime with no hidden fees or long-term commitments",
    },
    {
      icon: Award,
      title: "Award-Winning Content",
      description:
        "Exclusive originals and critically acclaimed series you won't find anywhere else",
    },
  ];

  const getPrice = (plan) => {
    const price =
      billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
    return billingCycle === "monthly" ? `₹${price}` : `₹${price}`;
  };

  const getSavings = (plan) => {
    const monthlyCost = plan.monthlyPrice * 12;
    const savings = monthlyCost - plan.yearlyPrice;
    return Math.round(savings);
  };

  const handleContinue = () => {
    if (onPlanSelect) {
      onPlanSelect({
        plan: selectedPlan,
        billing: billingCycle,
        price: getPrice(plans.find((p) => p.id === selectedPlan)),
      });
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation Header */}
      <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackToHome}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </button>
              <div className="text-white text-xl font-bold">Panamount</div>
            </div>

            <button
              onClick={handleBackToHome}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </button>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            {/* <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-semibold text-sm sm:text-base mb-4">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              STREAMING MADE SIMPLE
            </div> */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Choose Your Perfect
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                {" "}
                Plan
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Stream unlimited movies, TV shows, and exclusive content. No
              commitments, cancel anytime.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-slate-800/60 backdrop-blur-sm rounded-xl p-1 mb-12 border border-blue-500/20">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  billingCycle === "monthly"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 relative ${
                  billingCycle === "yearly"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Save 25%
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative group cursor-pointer transition-all duration-300 ${
                  selectedPlan === plan.id
                    ? "transform scale-105 lg:scale-110"
                    : "hover:transform hover:scale-105"
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      <Zap className="w-4 h-4 inline mr-1" />
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Card */}
                <div
                  className={`relative bg-slate-800/80 backdrop-blur-sm border-2 rounded-3xl p-6 lg:p-8 h-full ${
                    selectedPlan === plan.id
                      ? "border-blue-500 shadow-2xl shadow-blue-500/25"
                      : "border-slate-700/50 hover:border-blue-400/50"
                  } ${plan.popular ? "ring-2 ring-yellow-400/50" : ""}`}
                >
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} mb-4`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mb-4">
                      <div className="text-4xl font-bold text-white">
                        {getPrice(plan)}
                        <span className="text-lg font-normal text-gray-400">
                          /{billingCycle === "monthly" ? "mo" : "yr"}
                        </span>
                      </div>
                      {billingCycle === "yearly" && (
                        <div className="text-sm text-green-400 font-semibold">
                          Save ₹{getSavings(plan)} annually
                        </div>
                      )}
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-700/50 rounded-xl border border-blue-500/10">
                      <div className="text-center">
                        <div className="text-white font-bold">
                          {plan.resolution}
                        </div>
                        <div className="text-gray-400 text-xs">Quality</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold">
                          {plan.devices}
                        </div>
                        <div className="text-gray-400 text-xs">Devices</div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Limitations (if any) */}
                  {plan.limitations.length > 0 && (
                    <div className="border-t border-slate-700/50 pt-4">
                      <div className="text-gray-400 text-xs font-semibold mb-2">
                        LIMITATIONS:
                      </div>
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="text-gray-500 text-xs mb-1">
                          • {limitation}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Selection Indicator */}
                  {selectedPlan === plan.id && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Everything You Need for the Perfect Streaming Experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 mb-4 group-hover:scale-110 transition-transform duration-200">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-slate-800/60 to-blue-800/40 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-blue-500/20">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to start streaming?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join millions of satisfied customers who have made the switch to
            premium streaming. Start your journey today with our{" "}
            {plans.find((p) => p.id === selectedPlan)?.name} plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleContinue}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Continue with {plans.find((p) => p.id === selectedPlan)?.name}
            </button>
            <button
              onClick={handleBackToHome}
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
            >
              Back to Home
            </button>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            No commitment • Cancel anytime • 30-day money-back guarantee
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
