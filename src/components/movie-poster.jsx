import React, { useState } from "react";
import { HiPlay, HiHeart, HiPlus, HiStar } from "react-icons/hi2";
import api from "./ApiMovieList";

const MoviePoster = () => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Sample movie data - you can replace with props or API data
    
      useEffect(() => {
        const getMovieByGenreId = () => {
          setLoading(true);
          setError(null);
    
          api.getMovieByGenreId(geneId)
            .then((resp) => {
              console.log("API Response:", resp);
              setMovieData(resp.data.results || []);
            })
            .catch((err) => {
              console.error("API Error:", err);
              setError(err.message);
              setMovieData([]);
            })
            .finally(() => {
              setLoading(false);
            });
        };
    
        getMovieByGenreId();
      }, [geneId]);

  const toggleWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Movie Poster Section */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={movieData.poster}
                alt={`${movieData.title} poster`}
                className="w-full h-[500px] sm:h-[600px] lg:h-[700px] object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button className="bg-white/20 backdrop-blur-sm rounded-full p-4 sm:p-6 hover:bg-white/30 transition-all duration-300 transform hover:scale-110">
                  <HiPlay
                    className="w-8 h-8 sm:w-12 sm:h-12 text-white ml-1"
                    fill="white"
                  />
                </button>
              </div>

              {/* Action Buttons - Mobile */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2 lg:hidden">
                <button
                  onClick={toggleLike}
                  className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                    isLiked
                      ? "bg-red-600 text-white"
                      : "bg-black/30 text-white hover:bg-black/50"
                  }`}
                >
                  <HiHeart
                    className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                  />
                </button>

                <button
                  onClick={toggleWatchlist}
                  className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                    isInWatchlist
                      ? "bg-blue-600 text-white"
                      : "bg-black/30 text-white hover:bg-black/50"
                  }`}
                >
                  <HiPlus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Movie Details Section */}
          <div className="text-white space-y-6">
            {/* Title and Year */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 leading-tight">
                {movieData.title}
              </h1>
              <p className="text-gray-400 text-lg sm:text-xl">
                {movieData.year}
              </p>
            </div>

            {/* Rating and Genre */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center text-yellow-400">
                <HiStar className="w-5 h-5 mr-2 fill-current" />
                <span className="text-lg font-semibold">
                  {movieData.rating}
                </span>
              </div>
              <span className="text-gray-400">{movieData.duration}</span>
              <div className="flex flex-wrap gap-2">
                {movieData.genre.map((g, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                {movieData.description}
              </p>
            </div>

            {/* Action Buttons - Desktop */}
            <div className="hidden lg:flex items-center space-x-4 pt-4">
              <button
                onClick={toggleWatchlist}
                className={`flex items-center space-x-3 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  isInWatchlist
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                <HiPlus className="w-5 h-5" />
                <span>
                  {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
                </span>
              </button>

              <button
                onClick={toggleLike}
                className={`p-3 rounded-full transition-all duration-300 ${
                  isLiked
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                <HiHeart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Movie ID - Small text at bottom */}
            <div className="pt-4 border-t border-gray-700">
              <p className="text-gray-500 text-sm">
                Movie ID: <span className="font-mono">{movieData.id}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePoster;
