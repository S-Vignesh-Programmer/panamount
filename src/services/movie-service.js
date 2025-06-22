// movie-service.js
export const normalizeMovieData = (movie) => {
  return {
    id: movie.imdbID || movie.id,
    title: movie.title || movie.Title,
    year: movie.year || movie.Year,
    poster: movie.poster || movie.Poster,
    rating: movie.rating || movie.imdbRating,
    genre: movie.genre || movie.Genre,
    plot: movie.plot || movie.Plot,
    director: movie.director || movie.Director,
    actors: movie.actors || movie.Actors,
    runtime: movie.runtime || movie.Runtime,
  };
};

export const getPosterUrl = (movie) => {
  // Priority order for poster URLs:
  if (
    movie.poster &&
    typeof movie.poster === "string" &&
    movie.poster.startsWith("http")
  ) {
    return movie.poster;
  }
  if (
    movie.Poster &&
    typeof movie.Poster === "string" &&
    movie.Poster !== "N/A"
  ) {
    return movie.Poster;
  }
  return "https://via.placeholder.com/500x750/374151/9ca3af?text=No+Poster+Available";
};

export const validateMovieData = (movie) => {
  return movie && movie.id && movie.title;
};
