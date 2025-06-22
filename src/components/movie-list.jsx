import React, { useState, useEffect } from "react";
import { getMoviesByGenre } from "./api-movie-list";
import { useWatchlist } from "./watchlist-context";

function MovieList({ genreId }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isInWatchlist, toggleWatchlist, watchlist } = useWatchlist();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
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

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex space-x-3 sm:space-x-4 pb-4">
        {movies.map((movie, index) => {
          // Generate consistent unique ID for each movie
          const movieId =
            movie.id ||
            movie.imdbID ||
            movie.tmdbID ||
            `movie-${genreId}-${index}`;

          return (
            <div key={movieId} className="flex-shrink-0 w-32 sm:w-40 md:w-48">
              <MovieCard
                movie={movie}
                movieId={movieId}
                isInWatchlist={isInWatchlist(movieId)}
                onWatchlistToggle={toggleWatchlist}
                watchlist={watchlist}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Fixed MovieCard Component
const MovieCard = ({
  movie,
  movieId,
  isInWatchlist,
  onWatchlistToggle,
  watchlist,
}) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : movie.poster ||
      movie.Poster ||
      "https://via.placeholder.com/300x450/374151/9CA3AF?text=No+Image";

  // Simplified watchlist toggle handler
  const handleWatchlistClick = (e) => {
    // Prevent event bubbling
    e.preventDefault();
    e.stopPropagation();

    try {
      // Create a normalized movie object for the watchlist
      const movieToToggle = {
        ...movie,
        id: movieId,
        title: movie.title || movie.Title || movie.name,
        poster_path: movie.poster_path || movie.poster || movie.Poster,
        poster: movie.poster || movie.Poster || movie.poster_path,
        release_date: movie.release_date || movie.Year,
        year:
          movie.year ||
          movie.Year ||
          (movie.release_date ? movie.release_date.substring(0, 4) : ""),
      };

      // Call the toggle function from context
      onWatchlistToggle(movieToToggle);
    } catch (error) {
      console.error("Error toggling watchlist:", error);
    }
  };

  // Handle card click (separate from watchlist button)
  const handleCardClick = (e) => {
    // Only handle card click if it's not the watchlist button
    if (e.target.closest(".watchlist-button")) {
      return;
    }

    // Add your card click logic here (e.g., navigate to movie details)
    console.log("Card clicked:", movie.title || movie.Title);
  };

  return (
    <div
      className="group relative bg-gray-800 rounded-md sm:rounded-lg 
                  overflow-hidden shadow-lg transition-all duration-300 cursor-pointer
                  hover:scale-105 hover:shadow-xl ms-1"
      onClick={handleCardClick}
    >
      <div className="aspect-w-2 aspect-h-3">
        <img
          src={posterUrl}
          alt={movie.title || movie.Title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x450/374151/9CA3AF?text=No+Image";
          }}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-2 sm:p-3 lg:p-4">
          <h3 className="text-white font-semibold text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2">
            {movie.title || movie.Title}
          </h3>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-white text-xs">
              {movie.release_date?.substring(0, 4) ||
                movie.year ||
                movie.Year ||
                "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Fixed Watchlist Button */}
      <button
        className={`watchlist-button absolute top-1 right-1 sm:top-2 sm:right-2 p-1 sm:p-2 rounded-full 
                   transition-all duration-200 z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500
                   cursor-pointer hover:scale-110
                   ${
                     isInWatchlist
                       ? "bg-indigo-600 text-white shadow-lg hover:bg-indigo-700"
                       : "bg-black bg-opacity-60 text-white hover:bg-indigo-600 hover:bg-opacity-90"
                   }`}
        onClick={handleWatchlistClick}
        aria-label={
          isInWatchlist ? "Remove from watchlist" : "Add to watchlist"
        }
        title={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
      >
        <svg
          className="w-3 h-3 sm:w-4 sm:h-4"
          fill={isInWatchlist ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isInWatchlist ? (
            // Checkmark icon when in watchlist
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          ) : (
            // Plus icon when not in watchlist
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          )}
        </svg>
      </button>
    </div>
  );
};

export default MovieList;
