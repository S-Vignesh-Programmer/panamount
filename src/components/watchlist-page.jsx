import React, { useState } from "react";
import { useWatchlist } from "./watchlist-context";
import { useNavigate } from "react-router-dom";

function WatchlistPage() {
  const { watchlist, removeFromWatchlist, clearWatchlist, isLoading } =
    useWatchlist();
  const [removingItems, setRemovingItems] = useState(new Set());
  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    // Replace with your navigation logic
    console.log("Navigate to movie:", movieId);
  };

  const handlePlayClick = (movieId, e) => {
    e.stopPropagation();
    // Replace with your navigation logic
    console.log("Play movie:", movieId);
  };

  const handleRemoveClick = async (movieId, e) => {
    e.stopPropagation();

    // Add visual feedback
    setRemovingItems((prev) => new Set([...prev, movieId]));

    try {
      const success = await removeFromWatchlist(movieId);
      if (success) {
        // Remove from removing set after successful removal
        setTimeout(() => {
          setRemovingItems((prev) => {
            const newSet = new Set(prev);
            newSet.delete(movieId);
            return newSet;
          });
        }, 300);
      } else {
        // Remove from removing set if removal failed
        setRemovingItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(movieId);
          return newSet;
        });
      }
    } catch (error) {
      console.error("Error removing from watchlist:", error);
      // Remove from removing set if there's an error
      setRemovingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(movieId);
        return newSet;
      });
    }
  };

  // Function to get proper poster URL
  const getPosterUrl = (movie) => {
    // Try different poster sources
    if (movie.poster_path) {
      // If it's already a full URL, use it
      if (movie.poster_path.startsWith("http")) {
        return movie.poster_path;
      }
      // If it's a path, build TMDb URL
      return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    }

    // Try poster field
    if (movie.poster && movie.poster.startsWith("http")) {
      return movie.poster;
    }

    // Try Poster field (OMDb format)
    if (movie.Poster && movie.Poster.startsWith("http")) {
      return movie.Poster;
    }

    // Fallback to placeholder
    return "https://via.placeholder.com/300x450/374151/9CA3AF?text=No+Image";
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-[12px] xs:text-sm font-bold mb-8">
            My Watchlist
          </h1>
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <span className="ml-2 text-gray-400">Loading watchlist...</span>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (watchlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-8">My Watchlist</h1>
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-6xl mb-4 opacity-50">📋</div>
            <h2 className="text-2xl font-semibold mb-4">
              Your watchlist is empty
            </h2>
            <p className="text-gray-400 text-center mb-8 max-w-md">
              Add movies and shows to your watchlist by clicking the plus icon
              on any movie card.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse Movies
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main watchlist display
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">My Watchlist</h1>
          <div className="text-gray-400">
            {watchlist.length} {watchlist.length === 1 ? "item" : "items"}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {watchlist.map((movie) => {
            const movieId = movie.id || movie.imdbID || movie.tmdbID;
            const isRemoving = removingItems.has(movieId);

            return (
              <div
                key={movieId}
                className={`group cursor-pointer transition-all duration-300 ${
                  isRemoving ? "opacity-50 scale-95" : "opacity-100 scale-100"
                }`}
                onClick={() => !isRemoving && handleMovieClick(movieId)}
              >
                <div className="relative overflow-hidden rounded-lg bg-gray-800">
                  <img
                    src={getPosterUrl(movie)}
                    alt={movie.title || movie.Title || movie.name}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x450/374151/9CA3AF?text=No+Image";
                    }}
                  />

                  {/* Remove button - top right */}
                  <div className="absolute top-2 right-2 z-10">
                    <button
                      onClick={(e) => handleRemoveClick(movieId, e)}
                      disabled={isRemoving}
                      className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white p-2 rounded-full transition-all duration-200 opacity-80 hover:opacity-100 shadow-lg"
                      title="Remove from Watchlist"
                    >
                      {isRemoving ? (
                        /* Loading spinner */
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      ) : (
                        /* Trash icon */
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Overlay with additional info on hover */}
                  {!isRemoving && (
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="text-center">
                        {/* Add any additional hover content here if needed */}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-2">
                  <h3 className="font-semibold text-sm truncate">
                    {movie.title || movie.Title || movie.name}
                  </h3>
                  {(movie.release_date || movie.year || movie.Year) && (
                    <p className="text-xs text-gray-400 mt-1">
                      {movie.year ||
                        movie.Year ||
                        (movie.release_date
                          ? new Date(movie.release_date).getFullYear()
                          : "")}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear watchlist button */}
        {watchlist.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to clear your entire watchlist?"
                  )
                ) {
                  clearWatchlist();
                }
              }}
              className="bg-indigo-700 hover:bg-indigo-900 text-white px-4 py-2 rounded-lg transition-colors text-sm"
            >
              Clear Watchlist
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WatchlistPage;
