import React, { useState, useEffect } from "react";
import { getMoviesByGenre } from "./api-movie-list";
import { useWatchlist } from "./watchlist-context";

function MovieList({ genreId }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const result = await getMoviesByGenre(genreId);

        if (result.success) {
          setMovies(result.data.movies);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (genreId) {
      fetchMovies();
    }
  }, [genreId]);

  if (loading) {
    return (
      <div className="text-white text-sm sm:text-base">Loading movies...</div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm sm:text-base">Error: {error}</div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="text-gray-400 text-sm sm:text-base">No movies found</div>
    );
  }

  // Handle watchlist toggle
  const handleWatchlistToggle = (e, movie) => {
    e.stopPropagation();
    toggleWatchlist(movie);
  };

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex space-x-3 sm:space-x-4 pb-4">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="flex-shrink-0 w-32 sm:w-40 md:w-48"
          >
            <MovieCard
              movie={movie}
              isInWatchlist={isInWatchlist(movie.imdbID)}
              onWatchlistToggle={handleWatchlistToggle}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Movie Card Component
const MovieCard = ({ movie, isInWatchlist, onWatchlistToggle }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : movie.poster ||
      "https://via.placeholder.com/300x450/374151/9CA3AF?text=No+Image";

  return (
    <div className="group relative bg-gray-800 rounded-md sm:rounded-lg 
                  overflow-hidden shadow-lg transition-all duration-300 cursor-pointer
                  hover:scale-105 hover:shadow-xl ms-1">
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
          <div className="flex items-center justify-center space-x-2">
            <span className="text-white text-xs">
              {movie.release_date?.substring(0, 4) || movie.year}
            </span>
            {/* {movie.rating && (
              <span className="text-yellow-400 text-xs">⭐ {movie.rating}</span>
            )} */}
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

export default MovieList;
