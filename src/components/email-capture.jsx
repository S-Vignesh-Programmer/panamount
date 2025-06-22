import React, { useState, useEffect } from "react";
import { ChevronDown, Plus, X, Mail } from "lucide-react";

function EmailCapture({ onEmailSubmit, initialEmail = "" }) {
  const [email, setEmail] = useState(initialEmail);
  const [emailError, setEmailError] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showDemoAlert, setShowDemoAlert] = useState(false);

  // Demo email alert after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDemoAlert(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleDemoEmail = () => {
    setEmail("demo@panamount.com");
    setShowDemoAlert(false);
  };

  const closeDemoAlert = () => {
    setShowDemoAlert(false);
  };

  const handleEmailSubmit = () => {
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    // Call the parent's onEmailSubmit function
    onEmailSubmit(email);
  };

  const faqData = [
    {
      question: "What is Panamount?",
      answer:
        "Panamount is a streaming service that offers a wide variety of award-winning TV shows, movies and documentaries on thousands of internet-connected devices.",
    },
    {
      question: "How much does Panamount cost?",
      answer:
        "Watch Panamount on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹799 to ₹1499 a month.",
    },
    {
      question: "Where can I watch?",
      answer:
        "Watch anywhere, anytime. Sign in with your Panamount account to watch instantly on the web or on any internet-connected device.",
    },
    {
      question: "How do I cancel?",
      answer:
        "Panamount is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks.",
    },
    {
      question: "What can I watch on Panamount?",
      answer:
        "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Panamount originals, and more.",
    },
    {
      question: "Is Panamount good for kids?",
      answer:
        "The Panamount Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies.",
    },
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E] text-white">
      {/* Demo Email Alert Modal */}
      {showDemoAlert && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4 relative animate-pulse">
            <button
              onClick={closeDemoAlert}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <div className="bg-gray-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-bold mb-2">Try Demo Email!</h3>
              <p className="text-gray-300 mb-6">
                Want to see how it works? Use our demo email to get started
                instantly.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDemoEmail}
                  className="flex-1 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded font-semibold transition-colors duration-200"
                >
                  Use Demo Email
                </button>
                <button
                  onClick={closeDemoAlert}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded font-semibold transition-colors duration-200"
                >
                  No Thanks
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Demo email: demo@panamount.com
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-4 md:px-12 py-6">
        <div className=" text-2xl md:text-3xl font-bold">Panamount</div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t bg-[#1A1A2E] via-black/80 to-black/60"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            Unlimited movies, TV shows and more
          </h1>
          <p className="text-base md:text-lg mb-8 text-gray-300">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>

          {/* Email Form */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  className={`w-full px-4 py-4 md:py bg-black/50 border ${
                    emailError ? "border-red-500" : "border-gray-500"
                  } rounded text-white placeholder-gray-400 focus:outline-none focus:border-white text-base md:text-lg backdrop-blur-sm`}
                  placeholder="Email address"
                />
                {emailError && (
                  <p className="text-red-400 text-sm mt-2 text-left">
                    {emailError}
                  </p>
                )}
              </div>
              <button
                onClick={handleEmailSubmit}
                className="bg-blue-800 w-[170px] h-[55px] hover:bg-blue-950 text-white px-6 py-3 md:py-2 rounded font-semibold text-base md:text-lg transition-colors duration-200 whitespace-nowrap flex items-center justify-center gap-2"
              >
                Get Started <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* More Reasons to Join Section */}
      <section className="py-1 px-4 md:px-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          More reasons to join
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          <div className="bg-gradient-to-br from-purple-900 to-purple-700 p-6 rounded-2xl hover:border-gray-50 hover:border-2 transition-all duration-200">
            <h3 className="text-xl font-semibold mb-3">Enjoy on your TV</h3>
            <p className="text-gray-300 text-sm mb-6">
              Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players and more.
            </p>
            <div className="text-6xl">📺</div>
          </div>

          <div className="bg-gradient-to-br from-pink-900 to-pink-700 p-6 rounded-2xl hover:border-gray-50 hover:border-2 transition-all duration-200">
            <h3 className="text-xl font-semibold mb-3">
              Download your shows to watch offline
            </h3>
            <p className="text-gray-300 text-sm mb-6">
              Save your favourites easily and always have something to watch.
            </p>
            <div className="text-6xl">⬇️</div>
          </div>

          <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-6 rounded-2xl hover:border-gray-50 hover:border-2 transition-all duration-200">
            <h3 className="text-xl font-semibold mb-3">Watch everywhere</h3>
            <p className="text-gray-300 text-sm mb-6">
              Stream unlimited movies and TV shows on your phone, tablet, laptop
              and TV.
            </p>
            <div className="text-6xl">🚀</div>
          </div>

          <div className="bg-gradient-to-br from-orange-900 to-orange-700 p-6 rounded-2xl hover:border-gray-50 hover:border-2 transition-all duration-200">
            <h3 className="text-xl font-semibold mb-3">
              Create profiles for kids
            </h3>
            <p className="text-gray-300 text-sm mb-6">
              Send kids on adventures with their favourite characters in a space
              made just for them — free with your membership.
            </p>
            <div className="text-6xl">👨‍👩‍👧‍👦</div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 md:px-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto">
          {faqData.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full bg-gray-800 hover:bg-gray-700 text-left px-6 py-6 text-lg md:text-xl font-medium transition-colors duration-200 flex justify-between items-center"
              >
                <span>{faq.question}</span>
                <Plus
                  className={`w-6 h-6 transition-transform duration-200 ${
                    expandedFaq === index ? "rotate-45" : ""
                  }`}
                />
              </button>
              {expandedFaq === index && (
                <div className="bg-gray-800 px-6 py-6 text-lg md:text-xl border-t border-gray-700">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-400 mb-8">Questions? Call 5104-2110-6057</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400">
            <div className="space-y-3">
              <a href="#" className="block hover:underline">
                FAQ
              </a>
              <a href="#" className="block hover:underline">
                Investor Relations
              </a>
              <a href="#" className="block hover:underline">
                Privacy
              </a>
              <a href="#" className="block hover:underline">
                Speed Test
              </a>
            </div>
            <div className="space-y-3">
              <a href="#" className="block hover:underline">
                Help Centre
              </a>
              <a href="#" className="block hover:underline">
                Jobs
              </a>
              <a href="#" className="block hover:underline">
                Cookie Preferences
              </a>
              <a href="#" className="block hover:underline">
                Legal Notices
              </a>
            </div>
            <div className="space-y-3">
              <a href="#" className="block hover:underline">
                Account
              </a>
              <a href="#" className="block hover:underline">
                Ways to Watch
              </a>
              <a href="#" className="block hover:underline">
                Corporate Information
              </a>
            </div>
            <div className="space-y-3">
              <a href="#" className="block hover:underline">
                Media Centre
              </a>
              <a href="#" className="block hover:underline">
                Terms of Use
              </a>
              <a href="#" className="block hover:underline">
                Contact Us
              </a>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-8">Panamount</p>
        </div>
      </footer>
    </div>
  );
}

export default EmailCapture;
