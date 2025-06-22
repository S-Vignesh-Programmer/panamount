import React, { useRef } from "react";
import GOT from "../assets/images/GOT.jpg";
import BOYS from "../assets/images/HD1.jpeg";
import INTER from "../assets/images/interseteller.jpg";
import AVEN from "../assets/images/Avengers.jpg";
import MONEY from "../assets/images/money1.jpg"
import { HiChevronLeft, HiChevronRight, HiPlay } from "react-icons/hi2";

function Slider() {
  const elementRef = useRef(null);

  const slideList = [
    {
      id: 1,
      image: GOT,
      title: "Game of Thrones",
      description: "Epic fantasy drama series",
    },
    {
      id: 2,
      image: MONEY,
      title: "Money Heist",
      description: "Spanish heist crime drama series",
    },
    {
      id: 3,
      image: BOYS,
      title: "The Boys",
      description: "Dark superhero series",
    },
    {
      id: 4,
      image: INTER,
      title: "Interstellar",
      description: "Space exploration epic",
    },
    {
      id: 5,
      image: AVEN,
      title: "Avengers",
      description: "Marvel superhero ensemble",
    },
  ];


  const handlePlayClick = (item) => {
    console.log(`Playing: ${item.title}`);
  };

  // my small work to handle a API for using Json Server to create use
  // handle the API Best Practice My Life
  // useEffect(() => {
  //   fetch("http://localhost:3000/Slider")
  //     .then((res) => res.json())
  //     .then((data) => setSliderData(data))
  //     .catch((err) => console.error("Error fetching slider:", err));
  // }, []);

  // Slider Left Side of Image
  const sliderLeft = (element) => {
    if (element) element.scrollLeft -= element.offsetWidth;
  };

  // Slider Right Side of Image
  const sliderRight = (element) => {
    if (element) element.scrollLeft += element.offsetWidth;
  };

  return (
    <div className="relative select-none">
      {/* Left Arrow */}
      <HiChevronLeft
        className="hidden md:block text-white text-4xl absolute z-20 left-4 top-1/2
                   -translate-y-1/2 cursor-pointer rounded-full p-2 w-12 h-12
                   bg-black/50 backdrop-blur-sm border border-white/20
                   transition-all duration-300 hover:bg-white/20 hover:scale-110"
        onClick={() => sliderLeft(elementRef.current)}
      />

      {/* Right Arrow */}
      <HiChevronRight
        className="hidden md:block text-white text-4xl absolute z-20 right-4 top-1/2
                   -translate-y-1/2 cursor-pointer rounded-full p-2 w-12 h-12
                   bg-black/50 backdrop-blur-sm border border-white/20
                   transition-all duration-300 hover:bg-white/20 hover:scale-110"
        onClick={() => sliderRight(elementRef.current)}
      />

      {/* Slider Container */}
      <div className="w-full py-2 md:py-4">
        <div className="relative">
          <div
            className="flex items-center overflow-x-auto snap-x snap-mandatory
                       gap-2 md:gap-4 px-2 md:px-4 xl:mx-14 scroll-smooth
                       scrollbar-hide"
            ref={elementRef}
          >
            {slideList.map((item, index) => (
              <div
                key={item.id}
                className="snap-center flex-shrink-0 w-full max-w-[95vw] 
                           sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[75vw] 
                           xl:max-w-[85vw] mx-auto"
              >
                <div
                  className="relative group cursor-pointer overflow-hidden 
                rounded-lg shadow-2xl/30 border-[1px] shadow-white shadow-2xl/20"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[155px] sm:h-[280px] md:h-[400px] lg:h-[450px]
                               xl:h-[500px] object-cover mx-auto 
                               transition-transform duration-500 
                               group-hover:scale-105"
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-all duration-300" />

                  {/* Play button - always visible on first image, hover on others */}
                  <div>
                    <HiPlay
                      className="w-8 h-8 md:w-10 md:h-10 text-black ml-1
                                   group-hover/btn:scale-110 transition-transform duration-200"
                      fill="currentColor"
                    />
                  </div>

                  {/* Content overlay */}
                  {/* Content overlay */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6
                                  bg-gradient-to-t from-black via-black/80 to-transparent"
                  >
                    <h3 className="text-white text-sm sm:text-lg md:text-xl lg:text-2xl font-bold mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base">
                      {item.description}
                    </p>

                    {/* Action buttons */}
                    <div
                      className="flex gap-2 sm:gap-3 mt-2 sm:mt-3 md:mt-4
                                    transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                    >
                      <button
                        onClick={() => handlePlayClick(item)}
                        className="flex items-center gap-1 px-3 py-1 sm:px-4 sm:py-2 bg-white text-black
                                   rounded-md text-xs sm:text-sm font-semibold hover:bg-gray-200
                                   transition-colors duration-200"
                      >
                        <HiPlay
                          className="w-2 h-2 sm:w-3 sm:h-3"
                          fill="currentColor"
                        />
                        Play
                      </button>
                      <button
                        className="px-1 py-1 sm:px3 sm:py-2 border border-white/50 text-white
                                   rounded-md text-xs sm:text-sm hover:bg-white/10
                                   transition-colors duration-200"
                      >
                        More Info
                      </button>
                    </div>
                  </div>

                  {/* Shine effect on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100
                                  transition-opacity duration-500
                                  bg-gradient-to-r from-transparent via-white/10 to-transparent
                                  -skew-x-12 group-hover:animate-pulse"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollbar hide styles to download on online*/}
      <style jsx="true">
        {`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
}
export default Slider;
