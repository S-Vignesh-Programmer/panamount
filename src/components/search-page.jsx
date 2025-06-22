import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useWatchlist } from "./watchlist-context";
import SearchService from "../services/search-service";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const navigate = useNavigate();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  // Get popular movies for initial display
  const popularMovies = useMemo(() => SearchService.getPopularMovies(), []);
  const trendingMovies = useMemo(() => SearchService.getTrendingMovies(), []);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.trim()) {
        setIsLoading(true);
        try {
          const results = SearchService.searchMovies(query);
          setSearchResults(results);
        } catch (error) {
          console.error("Search error:", error);
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
        setIsLoading(false);
      }
    }, 300),
    []
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Get suggestions
    if (query.length >= 2) {
      const newSuggestions = SearchService.getSearchSuggestions(query);
      setSuggestions(newSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    // Perform search
    debouncedSearch(query);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    debouncedSearch(suggestion);
  };

  // Handle movie click
  const handleMovieClick = (movie) => {
    setSelectedMovieId(movie.id);
    // Navigate to watch page or show movie details
    navigate(`/watch/${movie.id}`);
  };

  // Handle watchlist toggle
  const handleWatchlistToggle = (e, movie) => {
    e.stopPropagation();
    toggleWatchlist(movie);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Display movies based on search state
  const displayMovies = searchQuery.trim() ? searchResults : popularMovies;
  const displayTitle = searchQuery.trim()
    ? `Search Results for "${searchQuery}"`
    : "Popular Movies";

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16 sm:pt-20">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Search Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">
            Search Movies
          </h1>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
            Discover your next favorite movie
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for movies..."
              className="w-full px-3 sm:px-4 py-2 sm:py-3 pl-10 sm:pl-12 pr-10 sm:pr-12 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-100 text-white placeholder-gray-400 text-sm sm:text-base"
            />
            <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center text-gray-400 hover:text-white"
              >
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Search Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-gray-800 border border-gray-700 rounded-lg mt-1 shadow-lg z-10">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-3 sm:px-4 py-2 hover:bg-gray-700 text-white border-b border-gray-700 last:border-b-0 text-sm sm:text-base"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-6 sm:py-8">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-red-500 mx-auto mb-3 sm:mb-4"></div>
            <p className="text-gray-400 text-sm sm:text-base">Searching...</p>
          </div>
        )}

        {/* Search Results or Popular Movies */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
              {displayTitle}
            </h2>
            <span className="text-gray-400 text-xs sm:text-sm">
              {displayMovies.length} movie
              {displayMovies.length !== 1 ? "s" : ""}
            </span>
          </div>

          {displayMovies.length === 0 && searchQuery.trim() && !isLoading && (
            <div className="text-center py-8 sm:py-12">
              <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">
                🎬
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                No movies found
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Try searching with different keywords
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
            {displayMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isInWatchlist={isInWatchlist(movie.id)}
                onMovieClick={handleMovieClick}
                onWatchlistToggle={handleWatchlistToggle}
                isSelected={selectedMovieId === movie.id}
              />
            ))}
          </div>
        </div>

        {/* Trending Section - only show when not searching */}
        {!searchQuery.trim() && (
          <div className="mb-8 sm:mb-12">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6">
              Trending Now
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
              {trendingMovies.slice(0, 12).map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isInWatchlist={isInWatchlist(movie.id)}
                  onMovieClick={handleMovieClick}
                  onWatchlistToggle={handleWatchlistToggle}
                  isSelected={selectedMovieId === movie.id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Movie Card Component
const MovieCard = ({
  movie,
  isInWatchlist,
  onMovieClick,
  onWatchlistToggle,
  isSelected,
}) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : movie.poster ||
      "https://via.placeholder.com/300x450/2c3e50/ecf0f1?text=Movie+Poster";

  return (
    <div
      className={`group relative bg-gray-800 rounded-md sm:rounded-lg overflow-hidden shadow-lg transition-all duration-300 cursor-pointer ${
        isSelected
          ? "ring-2 ring-red-500 scale-105"
          : "hover:scale-105 hover:shadow-xl"
      }`}
      // onClick={() => onMovieClick(movie)}
    >
      <div className="aspect-w-2 aspect-h-3">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-2 sm:p-3 lg:p-4">
          <h3 className="text-white font-semibold text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2">
            {movie.title}
          </h3>
          {/* <p className="text-gray-300 text-xs mb-3 line-clamp-3">
            {movie.overview}
          </p> */}
          <div className="flex items-center justify-center space-x-2">
            <span className="text-yellow-400 text-xs">
              {movie.release_date?.substring(0, 4) || movie.year}
            </span>
          </div>
        </div>
      </div>

      {/* Watchlist Button */}
      <button
        onClick={(e) => onWatchlistToggle(e, movie)}
        className={`absolute top-1 right-1 sm:top-2 sm:right-2 p-1 sm:p-2 rounded-full transition-all duration-200 ${
          isInWatchlist
            ? "bg-indigo-900 text-white"
            : "bg-black bg-opacity-50 text-white hover:bg-indigo-800"
        }`}
      >
        <svg
          className="w-3 h-3 sm:w-4 sm:h-4"
          fill={isInWatchlist ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
};

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default SearchPage;
