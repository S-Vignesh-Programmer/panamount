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

// Enhanced storage service that persists across page reloads
class WatchlistStorageService {
  constructor() {
    this.STORAGE_KEY = "app_watchlist_data";
    this.storageData = this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      // Try to get data from sessionStorage first
      const sessionData = sessionStorage.getItem(this.STORAGE_KEY);
      if (sessionData) {
        return JSON.parse(sessionData);
      }

      // If no session data, return empty array
      return [];
    } catch (error) {
      console.warn("Failed to load watchlist from storage:", error);
      return [];
    }
  }

  saveToStorage(data) {
    try {
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      this.storageData = data;
    } catch (error) {
      console.warn("Failed to save watchlist to storage:", error);
      // Keep data in memory even if storage fails
      this.storageData = data;
    }
  }

  getWatchlist() {
    return this.storageData || [];
  }

  addMovie(movie) {
    const currentList = this.getWatchlist();
    const movieId = movie.id || movie.imdbID;

    // Check if movie already exists
    const isAlreadyInWatchlist = currentList.some(
      (item) => (item.id || item.imdbID) === movieId
    );

    if (isAlreadyInWatchlist) {
      console.log("Movie already in watchlist:", movie.title || movie.Title);
      return currentList;
    }

    // Normalize the movie data
    const movieToAdd = {
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

    const newWatchlist = [...currentList, movieToAdd];
    this.saveToStorage(newWatchlist);
    console.log("Added to watchlist:", movieToAdd.title);

    return newWatchlist;
  }

  removeMovie(movieId) {
    const currentList = this.getWatchlist();
    const movieToRemove = currentList.find(
      (movie) => (movie.id || movie.imdbID) === movieId
    );

    const newWatchlist = currentList.filter(
      (movie) => (movie.id || movie.imdbID) !== movieId
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
    const currentList = this.getWatchlist();
    return currentList.some((movie) => (movie.id || movie.imdbID) === movieId);
  }
}

// Create a singleton instance
const watchlistStorage = new WatchlistStorageService();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load watchlist from storage on component mount
  useEffect(() => {
    try {
      const storedWatchlist = watchlistStorage.getWatchlist();
      setWatchlist(storedWatchlist);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading watchlist:", error);
      setWatchlist([]);
      setIsLoading(false);
    }
  }, []);

  const addToWatchlist = (movie) => {
    try {
      const updatedWatchlist = watchlistStorage.addMovie(movie);
      setWatchlist(updatedWatchlist);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  const removeFromWatchlist = (movieId) => {
    try {
      const updatedWatchlist = watchlistStorage.removeMovie(movieId);
      setWatchlist(updatedWatchlist);
    } catch (error) {
      console.error("Error removing from watchlist:", error);
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
    const movieId = movie.id || movie.imdbID;
    if (isInWatchlist(movieId)) {
      removeFromWatchlist(movieId);
    } else {
      addToWatchlist(movie);
    }
  };

  const clearWatchlist = () => {
    try {
      const updatedWatchlist = watchlistStorage.clearWatchlist();
      setWatchlist(updatedWatchlist);
    } catch (error) {
      console.error("Error clearing watchlist:", error);
    }
  };

  const getWatchlistCount = () => {
    return watchlist.length;
  };

  const value = {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    toggleWatchlist,
    clearWatchlist,
    getWatchlistCount,
    isLoading,
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
