class MovieCacheService {
  constructor() {
    this.cache = new Map();
    this.cacheKey = "movieAppCache";
    this.timestampKey = "movieAppCacheTimestamp";
    this.cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    this.isInitialized = false;
    this.isFetching = false;
    this.fetchPromise = null;
  }

  // Initialize the cache service
  init() {
    if (this.isInitialized) return;

    try {
      this.loadFromStorage();
      this.isInitialized = true;
      console.log("Movie cache service initialized");
    } catch (error) {
      console.error("Error initializing movie cache service:", error);
      this.isInitialized = true; // Still mark as initialized to prevent infinite loops
    }
  }

  // Load cached data from localStorage
  loadFromStorage() {
    try {
      const cachedData = localStorage.getItem(this.cacheKey);
      const timestamp = localStorage.getItem(this.timestampKey);

      if (cachedData && timestamp) {
        const parsedData = JSON.parse(cachedData);
        const cacheTime = parseInt(timestamp);

        // Check if cache is still valid
        if (this.isCacheTimeValid(cacheTime)) {
          // Populate memory cache from localStorage
          Object.entries(parsedData).forEach(([key, value]) => {
            this.cache.set(key, value);
          });
          console.log("Loaded movie data from localStorage cache");
          return true;
        } else {
          // Cache expired, clear it
          this.clearStorage();
          console.log("Cache expired, cleared old data");
        }
      }
    } catch (error) {
      console.error("Error loading from storage:", error);
      this.clearStorage();
    }
    return false;
  }

  // Save cache to localStorage
  saveToStorage() {
    try {
      const dataToSave = Object.fromEntries(this.cache);
      localStorage.setItem(this.cacheKey, JSON.stringify(dataToSave));
      localStorage.setItem(this.timestampKey, Date.now().toString());
      console.log("Saved movie data to localStorage cache");
    } catch (error) {
      console.error("Error saving to storage:", error);
      // If localStorage is full or unavailable, we'll still keep data in memory
    }
  }

  // Clear localStorage
  clearStorage() {
    try {
      localStorage.removeItem(this.cacheKey);
      localStorage.removeItem(this.timestampKey);
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  }

  // Check if cache timestamp is valid
  isCacheTimeValid(timestamp) {
    return Date.now() - timestamp < this.cacheExpiry;
  }

  // Check if cache is valid
  isCacheValid() {
    if (this.cache.size === 0) return false;

    try {
      const timestamp = localStorage.getItem(this.timestampKey);
      if (!timestamp) return false;

      return this.isCacheTimeValid(parseInt(timestamp));
    } catch (error) {
      return false;
    }
  }

  // Get all cached data
  getCachedData() {
    if (!this.isInitialized) {
      this.init();
    }

    return Object.fromEntries(this.cache);
  }

  // Set cached data
  setCachedData(key, data) {
    this.cache.set(key, data);
    this.saveToStorage();
  }

  // Fetch movies from API and cache them
  async fetchAndCacheMovies() {
    // If already fetching, return the existing promise
    if (this.isFetching && this.fetchPromise) {
      console.log("API call already in progress, waiting for existing call...");
      return await this.fetchPromise;
    }

    // Check if we already have valid cached data
    if (this.cache.size > 0 && this.isCacheValid()) {
      console.log("Using existing valid cache, no API call needed");
      return this.getCachedData();
    }

    this.isFetching = true;

    // Create the fetch promise
    this.fetchPromise = this.performAPICall();

    try {
      const result = await this.fetchPromise;
      return result;
    } finally {
      this.isFetching = false;
      this.fetchPromise = null;
    }
  }

  // Perform the actual API call
  async performAPICall() {
    try {
      console.log("Making API call to fetch movie data...");

      // Replace this with your actual API endpoints
      const endpoints = {
        popular: "/api/movies/popular",
        trending: "/api/movies/trending",
        topRated: "/api/movies/top-rated",
        genres: "/api/movies/genres",
        // Add more endpoints as needed
      };

      // Make parallel API calls
      const promises = Object.entries(endpoints).map(
        async ([key, endpoint]) => {
          try {
            const response = await fetch(endpoint);
            if (!response.ok) {
              throw new Error(`Failed to fetch ${key}: ${response.statusText}`);
            }
            const data = await response.json();
            return { key, data };
          } catch (error) {
            console.error(`Error fetching ${key}:`, error);
            return { key, data: null };
          }
        }
      );

      const results = await Promise.allSettled(promises);
      const movieData = {};

      // Process results
      results.forEach((result) => {
        if (result.status === "fulfilled" && result.value.data) {
          movieData[result.value.key] = result.value.data;
        }
      });

      // Cache the data
      Object.entries(movieData).forEach(([key, data]) => {
        this.cache.set(key, data);
      });

      // Save to localStorage
      this.saveToStorage();

      console.log("Movie data fetched and cached successfully");
      return movieData;
    } catch (error) {
      console.error("Error fetching movie data:", error);
      throw error;
    }
  }

  // Get movie by ID from cache
  getMovieById(movieId) {
    const allData = this.getCachedData();

    // Search through all cached movie lists
    for (const [category, movies] of Object.entries(allData)) {
      if (Array.isArray(movies)) {
        const movie = movies.find((m) => m.id === movieId);
        if (movie) return movie;
      }
    }

    return null;
  }

  // Get movies for a specific genre
  getGenreMovies(genreId) {
    const genreKey = `genre_${genreId}`;
    return this.cache.get(genreKey) || [];
  }

  // Set movies for a specific genre
  setGenreMovies(genreId, movies) {
    const genreKey = `genre_${genreId}`;
    this.setCachedData(genreKey, movies);
  }

  // Search movies in cache
  searchMovies(query) {
    if (!query || query.trim().length === 0) return [];

    const searchTerm = query.toLowerCase().trim();
    const results = [];
    const allData = this.getCachedData();

    // Search through all cached movie lists
    for (const [category, movies] of Object.entries(allData)) {
      if (Array.isArray(movies)) {
        const matches = movies.filter(
          (movie) =>
            movie.title?.toLowerCase().includes(searchTerm) ||
            movie.overview?.toLowerCase().includes(searchTerm) ||
            movie.original_title?.toLowerCase().includes(searchTerm)
        );
        results.push(...matches);
      }
    }

    // Remove duplicates based on movie ID
    const uniqueResults = results.filter(
      (movie, index, self) => index === self.findIndex((m) => m.id === movie.id)
    );

    return uniqueResults;
  }

  // Clear all cache
  clearCache() {
    this.cache.clear();
    this.clearStorage();
    console.log("Movie cache cleared");
  }

  // Force refresh data (clear cache and fetch fresh)
  async forceRefresh() {
    this.clearCache();
    return await this.fetchAndCacheMovies();
  }

  // Get cache stats
  getCacheStats() {
    const timestamp = localStorage.getItem(this.timestampKey);
    return {
      cacheSize: this.cache.size,
      lastUpdated: timestamp ? new Date(parseInt(timestamp)) : null,
      isValid: this.isCacheValid(),
      expiresAt: timestamp
        ? new Date(parseInt(timestamp) + this.cacheExpiry)
        : null,
    };
  }
}

// Create and export a singleton instance
const movieCacheService = new MovieCacheService();
export default movieCacheService;
