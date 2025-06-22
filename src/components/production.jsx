import React from "react";
import WB from "../assets/images/wb2.png";
import MARVEl from "../assets/images/marvel.png";
import HBO from "../assets/images/hbo.png";
import PARAMOUNT from "../assets/images/paramount1.jpg";



function Production() {
  // Production studio data with placeholder images
  const productionLists = [
    {
      id: 1,
      name: "Warner Bros",
      image: WB
    },
    {
      id: 2,
      name: "Marvel",
      image: MARVEl
    },  
    {
      id: 3,
      name: "HBO",
      image: HBO
    },
    {
      id: 4,
      name: "Paramount",
      image: PARAMOUNT
    },
  ];

  return (
    <div className="w-full py-2 bg-gray-900">
      <div className="flex justify-center items-center gap-1 sm:gap-2 md:gap-3 lg:gap-5 p-1 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-24 overflow-x-auto">
        {productionLists.map((item) => (
          <div
            key={item.id}
            className="group flex-shrink-0 flex items-center justify-center gap-3
                       w-[60px] h-[55px]
                       sm:w-[80px] sm:h-[55px]
                       md:w-[120px] md:h-[80px]
                       lg:w-[150px] lg:h-[100px]
                       xl:w-[190px] xl:h-[110px]
                       border-2 border-gray-600 rounded-lg
                       bg-gradient-to-br from-gray-800 to-gray-900
                       hover:border-blue-500 hover:scale-95
                       transition-all duration-300 ease-in-out
                       cursor-pointer shadow-xl shadow-black/50
                       hover:shadow-blue-500/20"
          >
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-md">
              <img
                src={item.image}
                className="w-[85%] h-[85%] object-contain mx-auto
                          transition-transform duration-300 ease-in-out
                          group-hover:scale-110 opacity-80 group-hover:opacity-100"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Custom scrollbar styles */}
      <style jsx="true">{`
        .overflow-x-auto::-webkit-scrollbar {
          height: 4px;
        }

        .overflow-x-auto::-webkit-scrollbar-track {
          background: rgba(55, 65, 81, 0.3);
          border-radius: 2px;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 2px;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.8);
        }
      `}</style>
    </div>
  );
}

export default Production;