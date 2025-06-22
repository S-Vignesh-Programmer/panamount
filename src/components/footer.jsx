import React from "react";
import { Link } from "react-router-dom";


function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Panamount</h3>
            <p className="text-gray-400 text-sm mx-2 leading-relaxed">
              Your ultimate destination for streaming the latest movies and TV
              shows. Enjoy unlimited entertainment with high-quality streaming.
            </p>
            <div className="flex space-x-4 mx-2">
              {/* Social Media Icons */}

              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.085.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 mx-10">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 cursor-pointer ms-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Movies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  TV Shows
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Trending
                </a>
              </li>
              {/* <li>
                <Link
                  to="/watchlist"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  My Watchlist
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Genres */}
          <div className="space-y-4 mx-3">
            <h4 className="text-lg font-semibold text-white">Language</h4>
            <div className="text-gray-400 ms-2 hover:text-white transition-colors text-sm">
              English
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4 mx-9">
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <ul className="space-y-2">
              <li>
                <a
                  to="/help"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  to="/terms"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  to="/privacy"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              {/* <li>
                <a
                  to="/subscription"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Subscription Plans
                </a>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-8 pt-8 border-t border-gray-800 flex flex-col 
        sm:flex-row sm:items-center sm:justify-center"
        >
          <div className="text-gray-400 me-20 text-sm mb-4 sm:mb-0 sm:ms-28">
            <p>&copy; 2024 Panamount. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-10 text-sm ms-4">
            {/* <Link
              to="/cookies"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Cookie Settings
            </Link> */}
            {/* <Link
              to="/accessibility"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Accessibility
            </Link>
            <Link
              to="/legal"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Legal Notices
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
