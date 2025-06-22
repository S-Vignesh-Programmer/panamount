import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HiHome,
  HiMagnifyingGlass,
  HiStar,
  HiPlayCircle,
  HiTv,
} from "react-icons/hi2";
import { HiPlus, HiDotsVertical } from "react-icons/hi";
import { FiLogOut, FiCreditCard } from "react-icons/fi";
import HeaderItem from "./header-item";
import SubscribePage from "./subscribe-page";

function Header({ onScrollToMovieList, onLogout }) {
  const [toggle, setToggle] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "HOME", icon: HiHome, path: "/" },
    { name: "SEARCH", icon: HiMagnifyingGlass, path: "/search" },
    { name: "WATCH LIST", icon: HiPlus, path: "/watchlist" },
    // { name: "ORIGINALS", icon: HiStar, path: "/originals" },
    {
      name: "MOVIES",
      icon: HiPlayCircle,
      path: "/movies",
      scrollToMovieList: true,
    },
    { name: "SERIES", icon: HiTv, path: "/series", scrollToMovieList: true },
  ];

  const profileOptions = [
    {
      name: "Subscription",
      icon: FiCreditCard,
      action: () => {
        navigate("/subscription");
        setShowProfileDropdown(false);
      },
    },
    {
      name: "Logout",
      icon: FiLogOut,
      action: () => {
        if (onLogout) {
          onLogout();
        }
        setShowProfileDropdown(false);
      },
    },
  ];

  const handleMenuClick = (item) => {
    if (item.scrollToMovieList && onScrollToMovieList) {
      // For MOVIES and SERIES, scroll to movie list instead of navigating
      onScrollToMovieList();
    } else {
      // For other menu items, navigate normally
      navigate(item.path);
    }
    setToggle(false);
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  // Close dropdown when clicking outside
  const handleDocumentClick = (e) => {
    if (!e.target.closest(".profile-dropdown-container")) {
      setShowProfileDropdown(false);
    }
  };

  React.useEffect(() => {
    if (showProfileDropdown) {
      document.addEventListener("click", handleDocumentClick);
      return () => document.removeEventListener("click", handleDocumentClick);
    }
  }, [showProfileDropdown]);

  // Hide header on subscribe page for cleaner look
  if (
    location.pathname === "/subscribe" ||
    location.pathname === "/subscription"
  ) {
    return null;
  }

  return (
    <div className="flex items-center justify-between bg-[#131321] p-2 sm:p-3 md:p-4 lg:p-5 xl:p-5 relative z-50 min-h-[50px] sm:min-h-[60px] md:min-h-[70px] lg:min-h-[76px] mb-4 sm:mb-6">
      <div className="flex gap-1 sm:gap-2 md:gap-4 lg:gap-6 xl:gap-8 items-center min-w-0 flex-1">
        {/* Logo */}
        <div
          className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold cursor-pointer flex-shrink-0 hover:opacity-80 transition-opacity"
          // onClick={() => navigate("/")}
        >
          Panamount
        </div>

        {/* Navigation Menu Container */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-6">
          {/* Desktop Navigation (1200px+) - Show all items with text */}
          <div className="hidden min-[1200px]:flex gap-4 xl:gap-6">
            {menu.map((item, index) => (
              <div
                key={index}
                onClick={() => handleMenuClick(item)}
                className="hover:scale-105 transition-transform cursor-pointer"
              >
                <HeaderItem name={item.name} Icon={item.icon} />
              </div>
            ))}
          </div>

          {/* Large Screen Navigation (900px - 1199px) - Icons only for all items */}
          <div className="hidden min-[900px]:flex min-[1200px]:hidden gap-3">
            {menu.map((item, index) => (
              <div
                key={index}
                onClick={() => handleMenuClick(item)}
                className="hover:scale-105 transition-transform cursor-pointer"
                title={item.name}
              >
                <HeaderItem name="" Icon={item.icon} />
              </div>
            ))}
          </div>

          {/* Medium Screen Navigation (640px - 899px) - Icons only for first 3, rest in dropdown */}
          <div className="hidden min-[640px]:flex min-[900px]:hidden gap-2">
            {menu.slice(0, 3).map((item, index) => (
              <div
                key={index}
                onClick={() => handleMenuClick(item)}
                className="hover:scale-105 transition-transform cursor-pointer"
                title={item.name}
              >
                <HeaderItem name="" Icon={item.icon} />
              </div>
            ))}
            <div className="relative">
              <div
                onClick={() => setToggle(!toggle)}
                className="hover:scale-105 transition-transform cursor-pointer"
                title="More"
              >
                <HeaderItem name="" Icon={HiDotsVertical} />
              </div>
              {toggle && (
                <div className="absolute right-0 top-10 bg-[#1A1A2E] border border-gray-700 rounded-lg z-50 shadow-xl min-w-[130px] py-2">
                  {menu.slice(3).map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleMenuClick(item)}
                      className="hover:bg-gray-700 rounded-md px-3 py-2 mx-1 transition-colors cursor-pointer"
                      title={item.name}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="w-4 h-4 text-white" />
                        <span className="text-sm text-white">{item.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Small Screen Navigation (480px - 639px) - Icons only for first 3, rest in dropdown */}
          <div className="hidden min-[480px]:flex min-[640px]:hidden gap-2">
            {menu.slice(0, 3).map((item, index) => (
              <div
                key={index}
                onClick={() => handleMenuClick(item)}
                className="hover:scale-105 transition-transform cursor-pointer"
                title={item.name}
              >
                <HeaderItem name="" Icon={item.icon} />
              </div>
            ))}
            <div className="relative">
              <div
                onClick={() => setToggle(!toggle)}
                className="hover:scale-105 transition-transform cursor-pointer"
                title="More"
              >
                <HeaderItem name="" Icon={HiDotsVertical} />
              </div>
              {toggle && (
                <div className="absolute right-0 top-9 bg-[#1A1A2E] border border-gray-700 rounded-lg z-50 shadow-xl w-12 py-2">
                  {menu.slice(3).map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleMenuClick(item)}
                      className="hover:bg-gray-700 rounded-md p-2 mx-1 transition-colors cursor-pointer flex justify-center"
                      title={item.name}
                    >
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation (320px - 479px) - Icons only for first 2, rest in dropdown */}
          <div className="flex min-[480px]:hidden gap-1">
            {menu.slice(0, 2).map((item, index) => (
              <div
                key={index}
                onClick={() => handleMenuClick(item)}
                className="hover:scale-105 transition-transform cursor-pointer"
                title={item.name}
              >
                <HeaderItem name="" Icon={item.icon} />
              </div>
            ))}
            <div className="relative">
              <div
                onClick={() => setToggle(!toggle)}
                className="hover:scale-105 transition-transform cursor-pointer"
                title="More"
              >
                <HeaderItem name="" Icon={HiDotsVertical} />
              </div>
              {toggle && (
                <div className="absolute right-0 top-8 bg-[#1A1A2E] border border-gray-700 rounded-lg z-50 shadow-xl w-10 py-2">
                  {menu.slice(2).map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleMenuClick(item)}
                      className="hover:bg-gray-700 rounded-md p-2 mx-1 transition-colors cursor-pointer flex justify-center"
                      title={item.name}
                    >
                      <item.icon className="w-3 h-3 text-white" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Image with Dropdown */}
      <div className="relative profile-dropdown-container ml-2 sm:ml-3 md:ml-4">
        <img
          src="https://images.indianexpress.com/2022/05/henry-cavill-superman-1200.jpg"
          className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-11 xl:h-11 2xl:w-12 2xl:h-12 rounded-full object-cover flex-shrink-0 hover:ring-2 hover:ring-white/30 transition-all cursor-pointer"
          alt="Profile"
          onClick={handleProfileClick}
        />

        {/* Profile Dropdown Menu */}
        {showProfileDropdown && (
          <div
            className="absolute right-0 top-full mt-2 bg-[#1A1A2E] border border-gray-700 
          rounded-lg z-50 shadow-xl w-[150px] py-2 animate-fadeIn select-none"
          >
            {profileOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <div
                  key={index}
                  onClick={option.action}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 
                  transition-colors cursor-pointer text-white"
                >
                  <IconComponent className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium">{option.name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style jsx="true">{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Custom responsive utilities */
        @media (max-width: 480px) {
          .mobile-compact {
            gap: 4px;
          }
        }
      `}</style>
    </div>
  );
}

export default Header;
