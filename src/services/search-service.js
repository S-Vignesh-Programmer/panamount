import React from 'react'

const mockMovieData = {
  1: [
    // Latest Releases
    {
      id: 1001,
      title: "Guardians of the Galaxy Vol. 3",
      poster_path: "/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
      release_date: "2023-05-05",
      overview:
        "Peter Quill, still reeling from the loss of Gamora, must rally his team around him to defend the universe along with protecting one of their own.",
    },
    {
      id: 1002,
      title: "Spider-Man: Across the Spider-Verse",
      poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
      release_date: "2023-06-02",
      overview:
        "After reuniting with Gwen Stacy, Brooklyn's full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse.",
    },
    {
      id: 1003,
      title: "The Little Mermaid",
      poster_path: "/ym1dxyOk4jFcSl4Q2zmRrA5BEEN.jpg",
      release_date: "2023-05-26",
      overview:
        "The youngest of King Triton's daughters, Ariel is a beautiful and spirited young mermaid with a thirst for adventure.",
    },
    {
      id: 1004,
      title: "Fast X",
      poster_path: "/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
      release_date: "2023-05-19",
      overview:
        "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path.",
    },
    {
      id: 1005,
      title: "John Wick: Chapter 4",
      poster_path: "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
      release_date: "2023-03-24",
      overview:
        "With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table.",
    },
    {
      id: 1006,
      title: "Ant-Man and the Wasp: Quantumania",
      poster_path: "/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg",
      release_date: "2023-02-17",
      overview:
        "Scott Lang and Hope Van Dyne find themselves exploring the Quantum Realm, interacting with strange new creatures and embarking on an adventure that pushes them beyond the limits.",
    },
    {
      id: 1007,
      title: "Transformers: Rise of the Beasts",
      poster_path: "/gPbM0MK8CP8A174rmUwGsADNYKD.jpg",
      release_date: "2023-06-09",
      overview:
        "A '90s globetrotting adventure that introduces the Maximals, Predacons, and Terrorcons to the battle between the Autobots and Decepticons on Earth.",
    },
    {
      id: 1008,
      title: "The Flash",
      poster_path: "/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
      release_date: "2023-06-16",
      overview:
        "When Barry uses his super speed to change the past, he creates a world without superheroes, forcing him to race for his life to save the future.",
    },
    {
      id: 1009,
      title: "Indiana Jones and the Dial of Destiny",
      poster_path: "/Af4bXE63pVsb2FtbW8uYIyPBadD.jpg",
      release_date: "2023-06-30",
      overview:
        "Archaeologist Indiana Jones races against time to retrieve a legendary artifact that can change the course of history.",
    },
    {
      id: 1010,
      title: "Mission: Impossible – Dead Reckoning Part One",
      poster_path: "/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
      release_date: "2023-07-12",
      overview:
        "Ethan Hunt and his IMF team embark on their most dangerous mission yet: to track down a terrifying new weapon that threatens all of humanity.",
    },
    {
      id: 1011,
      title: "Oppenheimer",
      poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
      release_date: "2023-07-21",
      overview:
        "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    },
    {
      id: 1012,
      title: "Barbie",
      poster_path: "/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
      release_date: "2023-07-21",
      overview:
        "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.",
    },
    {
      id: 1013,
      title: "Scream VI",
      poster_path: "/wDWwtvkRRlgTiUr6TyLSMX8FCuZ.jpg",
      release_date: "2023-03-10",
      overview:
        "The survivors of the Ghostface killings leave Woodsboro behind and start a fresh chapter in New York City.",
    },
    {
      id: 1014,
      title: "The Super Mario Bros. Movie",
      poster_path: "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
      release_date: "2023-04-07",
      overview:
        "A plumber named Mario travels through an underground labyrinth with his brother, Luigi, trying to save a captured princess.",
    },
    {
      id: 1015,
      title: "Creed III",
      poster_path: "/cvsXj3I9Q2iyyIo95AecSd1tad7.jpg",
      release_date: "2023-03-03",
      overview:
        "After dominating the boxing world, Adonis Creed has been thriving in both his career and family life.",
    },
  ],
  2: [
    // Popular Movies
    {
      id: 2001,
      title: "Avatar: The Way of Water",
      poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
      release_date: "2022-12-16",
      overview:
        "Set more than a decade after the events of the first film, learn the story of the Sully family.",
    },
    {
      id: 2002,
      title: "Top Gun: Maverick",
      poster_path: "/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
      release_date: "2022-05-27",
      overview:
        "After more than thirty years of service as one of the Navy's top aviators, Pete 'Maverick' Mitchell is where he belongs.",
    },
    {
      id: 2003,
      title: "Black Panther: Wakanda Forever",
      poster_path: "/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
      release_date: "2022-11-11",
      overview:
        "Queen Ramonda, Shuri, M'Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers.",
    },
    {
      id: 2004,
      title: "The Batman",
      poster_path: "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
      release_date: "2022-03-04",
      overview:
        "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family.",
    },
    {
      id: 2005,
      title: "Doctor Strange in the Multiverse of Madness",
      poster_path: "/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
      release_date: "2022-05-06",
      overview:
        "Doctor Strange, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities.",
    },
    {
      id: 2006,
      title: "Jurassic World Dominion",
      poster_path: "/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
      release_date: "2022-06-10",
      overview:
        "Four years after the destruction of Isla Nublar, dinosaurs now live alongside humans all over the world.",
    },
    {
      id: 2007,
      title: "Minions: The Rise of Gru",
      poster_path: "/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg",
      release_date: "2022-07-01",
      overview:
        "A fanboy of a supervillain supergroup known as the Vicious 6, Gru hatches a plan to become evil enough to join them.",
    },
    {
      id: 2008,
      title: "Thor: Love and Thunder",
      poster_path: "/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
      release_date: "2022-07-08",
      overview:
        "After his retirement is interrupted by Gorr the God Butcher, Thor enlists the help of King Valkyrie, Korg, and ex-girlfriend Jane Foster.",
    },
    {
      id: 2009,
      title: "Lightyear",
      poster_path: "/ox4goZd956BxqJH6iLwhWPL9ct4.jpg",
      release_date: "2022-06-17",
      overview:
        "Legendary Space Ranger Buzz Lightyear embarks on an intergalactic adventure alongside a group of ambitious recruits.",
    },
    {
      id: 2010,
      title: "The Northman",
      poster_path: "/zhLKlUaF1SEpO58ppHIAyENkwgw.jpg",
      release_date: "2022-04-22",
      overview:
        "From visionary director Robert Eggers comes The Northman, an action-filled epic that follows a young Viking prince on his quest to avenge his father's murder.",
    },
    {
      id: 2011,
      title: "Sonic the Hedgehog 2",
      poster_path: "/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg",
      release_date: "2022-04-08",
      overview:
        "After settling in Green Hills, Sonic is eager to prove he has what it takes to be a true hero.",
    },
    {
      id: 2012,
      title: "The Bad Guys",
      poster_path: "/7qop80YfuO0BwJa1uXk1DXUUEwv.jpg",
      release_date: "2022-04-22",
      overview:
        "Several reformed yet misunderstood criminal animals attempt to become good, with some disastrous results along the way.",
    },
    {
      id: 2013,
      title: "Uncharted",
      poster_path: "/rJHC1RUORuUhtfNb4Npclx0xnOf.jpg",
      release_date: "2022-02-18",
      overview:
        "A young street-smart Nathan Drake and his wisecracking partner Victor Sullivan embark on a dangerous pursuit of 'the greatest treasure never found'.",
    },
    {
      id: 2014,
      title: "Everything Everywhere All at Once",
      poster_path: "/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
      release_date: "2022-03-25",
      overview:
        "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes.",
    },
    {
      id: 2015,
      title: "Morbius",
      poster_path: "/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg",
      release_date: "2022-04-01",
      overview:
        "Biochemist Michael Morbius tries to cure himself of a rare blood disease, but inadvertently infects himself with vampirism.",
    },
    {
      id: 2016,
      title: "Scream VI",
      poster_path: "/wDWwtvkRRlgTiUr6TyLSMX8FCuZ.jpg",
      release_date: "2023-03-10",
      overview:
        "The survivors of the Ghostface killings leave Woodsboro behind and start a fresh chapter in New York City.",
    },
    {
      id: 2017,
      title: "The Super Mario Bros. Movie",
      poster_path: "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
      release_date: "2023-04-07",
      overview:
        "A plumber named Mario travels through an underground labyrinth with his brother, Luigi, trying to save a captured princess.",
    },
    {
      id: 201,
      title: "Creed III",
      poster_path: "/cvsXj3I9Q2iyyIo95AecSd1tad7.jpg",
      release_date: "2023-03-03",
      overview:
        "After dominating the boxing world, Adonis Creed has been thriving in both his career and family life.",
    },
  ],
};
 
class SearchService {
    // Get all movies from mock data
    getAllMovies() {
      const allMovies = [];
      Object.keys(mockMovieData).forEach(categoryId => {
        allMovies.push(...mockMovieData[categoryId]);
      });
      return allMovies;
    }
  
    // Search movies by query
    searchMovies(query) {
      if (!query || query.trim() === '') {
        return this.getAllMovies();
      }
  
      const searchTerm = query.toLowerCase().trim();
      const allMovies = this.getAllMovies();
      
      return allMovies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm) ||
        movie.overview.toLowerCase().includes(searchTerm) ||
        (movie.genre && movie.genre.toLowerCase().includes(searchTerm))
      );
    }
  
    // Get popular search suggestions
    getPopularMovies() {
      return mockMovieData[2] || []; // Popular movies category
    }
  
    // Get trending movies
    getTrendingMovies() {
      return mockMovieData[1] || []; // Latest releases category
    }
  
    // Get movies by category
    getMoviesByCategory(categoryId) {
      return mockMovieData[categoryId] || [];
    }
  
    // Get search suggestions based on partial query
    getSearchSuggestions(query) {
      if (!query || query.length < 2) return [];
      
      const searchTerm = query.toLowerCase();
      const allMovies = this.getAllMovies();
      
      return allMovies
        .filter(movie => movie.title.toLowerCase().startsWith(searchTerm))
        .slice(0, 5)
        .map(movie => movie.title);
    }
  } 
export default new SearchService();


