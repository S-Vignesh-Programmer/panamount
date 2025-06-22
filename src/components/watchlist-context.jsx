import React, { createContext, useContext, useState, useEffect } from "react";

const WatchlistContext = createContext();

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    console.error("useWatchlist must be used within a WatchlistProvider");
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};

// Enhanced storage service with consistent localStorage key
class WatchlistStorageService {
  constructor() {
    // Use consistent storage key across all components
    this.STORAGE_KEY = "movieWatchlist";
    this.storageData = this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      // Use localStorage for persistence across page reloads
      const storedData = localStorage.getItem(this.STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        // Ensure we return an array
        return Array.isArray(parsedData) ? parsedData : [];
      }
      return [];
    } catch (error) {
      console.warn("Failed to load watchlist from storage:", error);
      return [];
    }
  }

  saveToStorage(data) {
    try {
      // Ensure data is an array before saving
      const dataToSave = Array.isArray(data) ? data : [];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dataToSave));
      this.storageData = dataToSave;
      return true;
    } catch (error) {
      console.warn("Failed to save watchlist to storage:", error);
      // Keep data in memory even if storage fails
      this.storageData = Array.isArray(data) ? data : [];
      return false;
    }
  }

  getWatchlist() {
    return Array.isArray(this.storageData) ? this.storageData : [];
  }

  addMovie(movie) {
    const currentList = this.getWatchlist();
    const movieId = this.getMovieId(movie);

    if (!movieId) {
      console.warn("Movie ID not found, cannot add to watchlist:", movie);
      return currentList;
    }

    // Check if movie already exists to prevent duplicates
    const isAlreadyInWatchlist = currentList.some(
      (item) => this.getMovieId(item) === movieId
    );

    if (isAlreadyInWatchlist) {
      console.log("Movie already in watchlist:", movie.title || movie.Title);
      return currentList;
    }

    // Normalize the movie data
    const movieToAdd = this.normalizeMovieData(movie, movieId);
    const newWatchlist = [...currentList, movieToAdd];

    this.saveToStorage(newWatchlist);
    console.log("Added to watchlist:", movieToAdd.title);

    return newWatchlist;
  }

  removeMovie(movieId) {
    const currentList = this.getWatchlist();

    if (!movieId) {
      console.warn("Movie ID not provided for removal");
      return currentList;
    }

    const movieToRemove = currentList.find(
      (movie) => this.getMovieId(movie) === movieId
    );

    const newWatchlist = currentList.filter(
      (movie) => this.getMovieId(movie) !== movieId
    );

    this.saveToStorage(newWatchlist);

    if (movieToRemove) {
      console.log("Removed from watchlist:", movieToRemove.title);
    }

    return newWatchlist;
  }

  clearWatchlist() {
    this.saveToStorage([]);
    console.log("Watchlist cleared");
    return [];
  }

  isInWatchlist(movieId) {
    if (!movieId) return false;

    const currentList = this.getWatchlist();
    return currentList.some((movie) => this.getMovieId(movie) === movieId);
  }

  // Helper method to get consistent movie ID
  getMovieId(movie) {
    if (!movie) return null;
    return movie.id || movie.imdbID || movie.tmdbID || null;
  }

  // Helper method to normalize movie data
  normalizeMovieData(movie, movieId) {
    return {
      ...movie,
      id: movieId,
      title: movie.title || movie.Title || movie.name || "Unknown Title",
      poster_path: movie.poster_path || movie.poster || movie.Poster,
      poster: movie.poster || movie.Poster || movie.poster_path,
      release_date: movie.release_date || movie.Year,
      year:
        movie.year ||
        movie.Year ||
        (movie.release_date ? movie.release_date.substring(0, 4) : ""),
      // Add timestamp for sorting
      addedAt: new Date().toISOString(),
    };
  }
}

// Create singleton instance
const watchlistStorage = new WatchlistStorageService();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load watchlist from storage on component mount
  useEffect(() => {
    try {
      const storedWatchlist = watchlistStorage.getWatchlist();
      setWatchlist(storedWatchlist);
      setError(null);
    } catch (error) {
      console.error("Error loading watchlist:", error);
      setWatchlist([]);
      setError("Failed to load watchlist");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync with localStorage changes (in case of external updates)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === watchlistStorage.STORAGE_KEY) {
        try {
          const updatedWatchlist = watchlistStorage.loadFromStorage();
          setWatchlist(updatedWatchlist);
        } catch (error) {
          console.error("Error syncing watchlist from storage:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const addToWatchlist = (movie) => {
    try {
      const updatedWatchlist = watchlistStorage.addMovie(movie);
      setWatchlist(updatedWatchlist);
      setError(null);
      return true;
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      setError("Failed to add movie to watchlist");
      return false;
    }
  };

  const removeFromWatchlist = (movieId) => {
    try {
      const updatedWatchlist = watchlistStorage.removeMovie(movieId);
      setWatchlist(updatedWatchlist);
      setError(null);
      return true;
    } catch (error) {
      console.error("Error removing from watchlist:", error);
      setError("Failed to remove movie from watchlist");
      return false;
    }
  };

  const isInWatchlist = (movieId) => {
    try {
      return watchlistStorage.isInWatchlist(movieId);
    } catch (error) {
      console.error("Error checking watchlist:", error);
      return false;
    }
  };

  const toggleWatchlist = (movie) => {
    if (!movie) {
      console.warn("No movie provided to toggleWatchlist");
      return false;
    }

    const movieId = watchlistStorage.getMovieId(movie);
    if (!movieId) {
      console.warn("Movie ID not found, cannot toggle watchlist:", movie);
      return false;
    }

    if (isInWatchlist(movieId)) {
      return removeFromWatchlist(movieId);
    } else {
      return addToWatchlist(movie);
    }
  };

  const clearWatchlist = () => {
    try {
      const updatedWatchlist = watchlistStorage.clearWatchlist();
      setWatchlist(updatedWatchlist);
      setError(null);
      return true;
    } catch (error) {
      console.error("Error clearing watchlist:", error);
      setError("Failed to clear watchlist");
      return false;
    }
  };

  const getWatchlistCount = () => {
    return Array.isArray(watchlist) ? watchlist.length : 0;
  };

  // Get watchlist sorted by most recently added
  const getSortedWatchlist = () => {
    return [...watchlist].sort((a, b) => {
      const dateA = new Date(a.addedAt || 0);
      const dateB = new Date(b.addedAt || 0);
      return dateB - dateA; // Most recent first
    });
  };

  const value = {
    watchlist,
    watchlistItems: watchlist, // Alias for backward compatibility
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    toggleWatchlist,
    clearWatchlist,
    getWatchlistCount,
    getSortedWatchlist,
    isLoading,
    error,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};

// HOC for components that need watchlist functionality
export const withWatchlist = (Component) => {
  return function WrappedComponent(props) {
    return (
      <WatchlistProvider>
        <Component {...props} />
      </WatchlistProvider>
    );
  };
};

export default WatchlistProvider;
