import React, { createContext, useContext, useState, useEffect } from "react";
import { getMoviesByGenre } from "./api-movie-list";
import movieCacheService from "../services/movie-cache-service";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};

export const AppContextProvider = ({ children }) => {
  const [homePageLoaded, setHomePageLoaded] = useState(false);
  const [homePageData, setHomePageData] = useState({
    slider: null,
    production: null,
    movieLists: {},
  });
  const [isInitialLoading, setIsInitialLoading] = useState(false);

  // Initialize cache service when provider mounts
  useEffect(() => {
    movieCacheService.init();

    // Check if we have cached data on mount
    const cachedData = movieCacheService.getCachedData();
    if (cachedData && Object.keys(cachedData).length > 0) {
      console.log("Found cached movie data on mount");
      setHomePageData((prev) => ({
        ...prev,
        movieLists: cachedData,
      }));
      setHomePageLoaded(true);
    }
  }, []);

  // Preload all home page data with caching
  const preloadHomePageData = async (forceFresh = false) => {
    // Prevent multiple simultaneous loads
    if (isInitialLoading) {
      console.log("Data loading already in progress...");
      return;
    }

    // If we already have data and not forcing fresh, skip
    if (homePageLoaded && !forceFresh) {
      console.log("Home page data already loaded");
      return;
    }

    setIsInitialLoading(true);
    console.log("Starting home page data preload...");

    try {
      // Check if we have valid cached data first (unless forcing fresh)
      if (!forceFresh) {
        const cachedData = movieCacheService.getCachedData();
        const isCacheValid = movieCacheService.isCacheValid();

        if (cachedData && Object.keys(cachedData).length > 0 && isCacheValid) {
          console.log("Using valid cached data, no API calls needed");
          setHomePageData((prev) => ({
            ...prev,
            movieLists: cachedData,
          }));
          setHomePageLoaded(true);
          setIsInitialLoading(false);
          return;
        }
      }

      // No valid cache or forcing fresh - make API calls
      console.log("Making API calls to fetch fresh data...");

      // Preload all movie genres that will be shown on home page
      const genreIds = [1, 2, 3, 4, 5]; // Latest, Popular, Action, Crime, Sci-fi

      // Load all genres in parallel
      const moviePromises = genreIds.map(async (genreId) => {
        try {
          // Check if this specific genre is cached and valid
          const cachedGenreData = movieCacheService.getGenreMovies(genreId);
          if (
            cachedGenreData &&
            cachedGenreData.length > 0 &&
            !forceFresh &&
            movieCacheService.isCacheValid()
          ) {
            console.log(`Using cached data for genre ${genreId}`);
            return { genreId, movies: cachedGenreData };
          }

          // Fetch fresh data for this genre
          console.log(`Fetching fresh data for genre ${genreId}`);
          const result = await getMoviesByGenre(genreId);
          const movies = result.data.results || [];

          // Cache this genre's data
          movieCacheService.setCachedData(`genre_${genreId}`, movies);

          return { genreId, movies };
        } catch (error) {
          console.error(`Failed to load genre ${genreId}:`, error);

          // Try to use cached data as fallback
          const fallbackData = movieCacheService.getGenreMovies(genreId);
          if (fallbackData && fallbackData.length > 0) {
            console.log(`Using cached fallback data for genre ${genreId}`);
            return { genreId, movies: fallbackData };
          }

          return { genreId, movies: [] };
        }
      });

      const movieResults = await Promise.all(moviePromises);

      // Store movie data by genre
      const movieLists = {};
      movieResults.forEach(({ genreId, movies }) => {
        movieLists[genreId] = movies;
      });

      // Update cache with all the data
      movieCacheService.setCachedData("all_genres", movieLists);

      setHomePageData((prev) => ({
        ...prev,
        movieLists,
      }));

      setHomePageLoaded(true);
      console.log("Home page data preload completed and cached!");
    } catch (error) {
      console.error("Error preloading home page data:", error);

      // Try to use any available cached data as fallback
      const fallbackData = movieCacheService.getCachedData();
      if (fallbackData && Object.keys(fallbackData).length > 0) {
        console.log("Using cached data as fallback after error");
        setHomePageData((prev) => ({
          ...prev,
          movieLists: fallbackData,
        }));
        setHomePageLoaded(true);
      }
    } finally {
      setIsInitialLoading(false);
    }
  };

  // Force refresh data (clear cache and reload)
  const refreshHomePageData = async () => {
    console.log("Force refreshing home page data...");
    movieCacheService.clearCache();
    setHomePageLoaded(false);
    setHomePageData({
      slider: null,
      production: null,
      movieLists: {},
    });
    await preloadHomePageData(true);
  };

  // Check if specific genre is loaded
  const isGenreLoaded = (genreId) => {
    // Check both in-memory state and cache
    const inMemory =
      homePageData.movieLists[genreId] &&
      homePageData.movieLists[genreId].length > 0;
    const inCache =
      movieCacheService.getGenreMovies(genreId) &&
      movieCacheService.getGenreMovies(genreId).length > 0;

    return inMemory || inCache;
  };

  // Get movies for a genre (from cache or memory)
  const getGenreMovies = (genreId) => {
    // First try to get from in-memory state
    const memoryData = homePageData.movieLists[genreId];
    if (memoryData && memoryData.length > 0) {
      return memoryData;
    }

    // Fallback to cache
    const cachedData = movieCacheService.getGenreMovies(genreId);
    if (cachedData && cachedData.length > 0) {
      return cachedData;
    }

    return [];
  };

  // Get movie by ID from any genre
  const getMovieById = (movieId) => {
    // First check in-memory data
    for (const genreMovies of Object.values(homePageData.movieLists)) {
      if (Array.isArray(genreMovies)) {
        const movie = genreMovies.find((m) => m.id === movieId);
        if (movie) return movie;
      }
    }

    // Fallback to cache
    return movieCacheService.getMovieById(movieId);
  };

  // Search movies across all genres
  const searchMovies = (query) => {
    if (!query || query.trim().length === 0) return [];

    const searchTerm = query.toLowerCase().trim();
    const results = [];

    // Search in-memory data first
    for (const genreMovies of Object.values(homePageData.movieLists)) {
      if (Array.isArray(genreMovies)) {
        const matches = genreMovies.filter(
          (movie) =>
            movie.title?.toLowerCase().includes(searchTerm) ||
            movie.overview?.toLowerCase().includes(searchTerm) ||
            movie.original_title?.toLowerCase().includes(searchTerm)
        );
        results.push(...matches);
      }
    }

    // If no results in memory, search cache
    if (results.length === 0) {
      const cacheResults = movieCacheService.searchMovies(query);
      results.push(...cacheResults);
    }

    // Remove duplicates based on movie ID
    const uniqueResults = results.filter(
      (movie, index, self) => index === self.findIndex((m) => m.id === movie.id)
    );

    return uniqueResults;
  };

  // Get cache statistics
  const getCacheStats = () => {
    return movieCacheService.getCacheStats();
  };

  // Check if cache is valid
  const isCacheValid = () => {
    return movieCacheService.isCacheValid();
  };

  const value = {
    // State
    homePageLoaded,
    homePageData,
    isInitialLoading,

    // Original Methods
    preloadHomePageData,
    isGenreLoaded,
    getGenreMovies,

    // Enhanced Methods
    refreshHomePageData,
    getMovieById,
    searchMovies,
    getCacheStats,
    isCacheValid,

    // Cache Control
    clearCache: movieCacheService.clearCache,
    forceRefresh: refreshHomePageData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
