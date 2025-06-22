import React from "react";
// Try one of these import patterns based on how MovieList is exported:

// If MovieList has a default export:
import MovieList from "./movie-list";

// If MovieList has a named export:
// import { MovieList } from "./movie-list";

// If you're unsure, try importing everything and check:
// import * as MovieListModule from "./movie-list";
// console.log('MovieList module:', MovieListModule); // Add this temporarily to debug

function GeneralMovieList() {
  const generalList = [
    { id: 1, name: "Latest Releases" },
    { id: 2, name: "Popular Movies" },
    { id: 3, name: "Action Packed" },
    { id: 4, name: "Crime & Mystery" },
    { id: 5, name: "Sci-fi & Fantasy" },
  ];

  return (
    <div className="space-y-8">
      {generalList.map((item) => (
        <div key={item.id} className="px-8 md:px-14 md:pe-16">
          <h2 className="text-lg  sm:text-sm/3 md:text-2xl text-white font-bold mb-7 mt-9">
            {item.name}
          </h2>
          <MovieList genreId={item.id} />
        </div>
      ))}
    </div>
  );
}

export default GeneralMovieList;
