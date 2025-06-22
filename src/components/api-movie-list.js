import axios from "axios";

// OMDb API Configuration
const OMDB_BASE_URL = "https://www.omdbapi.com/";
const API_KEY = "VITE_OMDB_API_KEY"; 

// Configuration for requests
const API_CONFIG = {
  timeout: 10000, // 10 seconds timeout
  retries: 100, 
  retryDelay: 1000, // 1 second delay
};

// Genre mapping with movie collections and working poster URLs from TMDB
const genreMapping = {
  1: {
    name: "Latest Releases",
    movies: [
      {
        title: "Oppenheimer",
        year: "2023",
        poster:
          "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        genre: "Biography, Drama, History",
        director: "Christopher Nolan",
      },
      {
        title: "Deadpool & Wolverine",
        year: "2024",
        poster:
          "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
        genre: "Action, Comedy, Sci-Fi",
        director: "Shawn Levy",
      },
      {
        title: "Extraction 2",
        year: "2023",
        poster:
          "https://image.tmdb.org/t/p/w500/7gKI9hpEMcZUQpNgKrkDzJpbnNS.jpg",
        genre: "Action, Thriller",
        description:
          "Tasked with extracting a family who is at the mercy of a Georgian gangster, Tyler Rake infiltrates one of the world's deadliest prisons.",
      },
      {
        title: "The Meg 2: The Trench",
        year: "2023",
        poster:
          "https://image.tmdb.org/t/p/w500/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg",
        genre: "Action, Horror, Sci-Fi",
        description:
          "A research team encounters multiple threats while exploring the deepest depths of the ocean.",
      },
      {
        title: "Dune: Part Two",
        year: "2024",
        poster:
          "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
        genre: "Action, Adventure, Sci-Fi",
        description:
          "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      },
      {
        title: "Barbie",
        year: "2023",
        poster:
          "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
        genre: "Adventure, Comedy, Fantasy",
        director: "Greta Gerwig",
      },
      {
        title: "Guardians of the Galaxy Vol. 3",
        year: "2023",
        poster:
          "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
        genre: "Action, Adventure, Comedy",
        director: "James Gunn",
      },
      {
        title: "Mission: Impossible – Dead Reckoning Part One",
        year: "2023",
        poster:
          "https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
        genre: "Action, Adventure, Thriller",
        director: "Christopher McQuarrie",
      },
      {
        title: "The Flash",
        year: "2023",
        poster:
          "https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
        genre: "Action, Adventure, Fantasy",
        director: "Andy Muschietti",
      },
      {
        title: "Indiana Jones and the Dial of Destiny",
        year: "2023",
        poster:
          "https://image.tmdb.org/t/p/w500/Af4bXE63pVsb2FtbW8uYIyPBadD.jpg",
        genre: "Action, Adventure",
        director: "James Mangold",
      },
      {
        title: "John Wick: Chapter 4",
        year: "2023",
        poster:
          "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
        genre: "Action, Crime, Thriller",
        director: "Chad Stahelski",
      },
      {
        title: "Spider-Man: Across the Spider-Verse",
        year: "2023",
        poster:
          "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        genre: "Action, Animation, Adventure",
        director: "Joaquim Dos Santos",
      },
      {
        title: "The Marvels",
        year: "2023",
        poster:
          "https://image.tmdb.org/t/p/w500/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg",
        genre: "Action, Adventure, Fantasy",
        director: "Nia DaCosta",
      },
      {
        title: "Wonka",
        year: "2023",
        poster:
          "https://image.tmdb.org/t/p/w500/qhb1qOilapbapxWQn9jtRCMwXJF.jpg",
        genre: "Adventure, Comedy, Family",
        director: "Paul King",
      },
      {
        title: "Scream VI",
        year: "2023",
        poster:
          "https://image.tmdb.org/t/p/w500/wDWwtvkRRlgTiUr6TyLSMX8FCuZ.jpg",
        genre: "Horror, Mystery, Thriller",
        director: "Matt Bettinelli-Olpin",
      },
      {
        title: "Black Adam",
        year: "2022",
        poster:
          "https://image.tmdb.org/t/p/w500/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg",
        genre: "Action, Adventure, Fantasy",
        description:
          "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods, Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
      },
      {
        title: "Uncharted",
        year: "2022",
        poster:
          "https://image.tmdb.org/t/p/w500/rJHC1RUORuUhtfNb4Npclx0xnOf.jpg",
        genre: "Action, Adventure",
        description:
          "Street-smart thief Nathan Drake is recruited by seasoned treasure hunter Victor 'Sully' Sullivan to recover a fortune lost by Ferdinand Magellan 500 years ago.",
      },
      {
        title: "Sonic the Hedgehog 2",
        year: "2022",
        poster:
          "https://image.tmdb.org/t/p/w500/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg",
        genre: "Action, Adventure, Comedy",
        description:
          "After settling in Green Hills, Sonic is eager to prove he has what it takes to be a true hero. His test comes when Dr. Robotnik returns, this time with a new partner, Knuckles.",
      },
      {
        title: "Doctor Strange in the Multiverse of Madness",
        year: "2022",
        poster:
          "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
        genre: "Action, Adventure, Fantasy",
        description:
          "Doctor Strange teams up with a mysterious teenage girl from his dreams who can travel across multiverses, to battle multiple threats, including other-universe versions of himself.",
      },
      {
        title: "Thor: Love and Thunder",
        year: "2022",
        poster:
          "https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
        genre: "Action, Adventure, Comedy",
        description:
          "After his retirement is interrupted by Gorr the God Butcher, a galactic killer who seeks the extinction of the gods, Thor enlists the help of King Valkyrie, Korg, and ex-girlfriend Jane Foster.",
      },
      {
        title: "Shazam! Fury of the Gods",
        year: "2023",
        poster:
          "https://image.tmdb.org/t/p/w500/2VK4d3mqqTc7LVZLnLPeRiPaJ71.jpg",
        genre: "Action, Adventure, Comedy",
        description:
          "Billy Batson and his foster siblings, who transform into superheroes by saying 'Shazam!', are forced to get back into action when the Daughters of Atlas seek revenge.",
      },
      {
        title: "The Equalizer 3",
        year: "2023",
        poster:
          "https://image.tmdb.org/t/p/w500/b0Ej6fnXAP8fK75hlyi2jKqdhHz.jpg",
        genre: "Action, Crime, Thriller",
        description:
          "Robert McCall finds himself at home in Southern Italy but he discovers his friends are under the control of local crime bosses.",
      },
      {
        title: "Blue Beetle",
        year: "2023",
        poster:
          "https://image.tmdb.org/t/p/w500/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg",
        genre: "Action, Adventure, Sci-Fi",
        description:
          "An alien scarab chooses Jaime Reyes to be its symbiotic host, bestowing the recent college graduate with a suit of armor.",
      },
    ],
  },
  2: {
    name: "Popular Movies",
    movies: [
      {
        title: "Avatar: The Way of Water",
        year: "2022",
        poster:
          "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
        genre: "Action, Adventure, Drama",
      },
      {
        title: "Top Gun: Maverick",
        year: "2022",
        poster:
          "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
        genre: "Action, Drama",
      },
      {
        title: "Black Panther: Wakanda Forever",
        year: "2022",
        poster:
          "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
        genre: "Action, Adventure, Drama",
      },
      {
        title: "The Batman",
        year: "2022",
        poster:
          "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
        genre: "Action, Crime, Drama",
      },
      {
        title: "Knives Out",
        year: "2019",
        poster:
          "https://image.tmdb.org/t/p/w500/pThyQovXQrw2m0s9x82twj48Jq4.jpg",
        genre: "Comedy, Crime, Drama",
      },
      {
        title: "The Dark Knight",
        year: "2008",
        poster:
          "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        genre: "Action, Crime, Drama",
      },
      {
        title: "Fast & Furious 9",
        year: "2021",
        poster:
          "https://image.tmdb.org/t/p/w500/bOFaAXmWWXC3Rbv4u4uM9ZSzRXP.jpg",
        genre: "Action, Crime, Thriller",
      },
      {
        title: "The Matrix Resurrections",
        year: "2021",
        poster:
          "https://image.tmdb.org/t/p/w500/8c4a8kE7PizaGQQnditMmI1xbRp.jpg",
        genre: "Action, Sci-Fi",
      },
      {
        title: "Eternals",
        year: "2021",
        poster:
          "https://image.tmdb.org/t/p/w500/lFByFSLV5WDJEv3KabbdAF959F2.jpg",
        genre: "Action, Adventure, Drama",
      },
      {
        title: "Spider-Man: No Way Home",
        year: "2021",
        poster:
          "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        genre: "Action, Adventure, Sci-Fi",
      },
      {
        title: "Venom: Let There Be Carnage",
        year: "2021",
        poster:
          "https://image.tmdb.org/t/p/w500/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg",
        genre: "Action, Sci-Fi, Thriller",
      },
      {
        title: "Free Guy",
        year: "2021",
        poster:
          "https://image.tmdb.org/t/p/w500/xmbU4JTUm8rsdtn7Y3Fcm30GpeT.jpg",
        genre: "Action, Adventure, Comedy",
      },
      {
        title: "The Suicide Squad",
        year: "2021",
        poster:
          "https://image.tmdb.org/t/p/w500/kb4s0ML0iVZlG6wAKbbs9NAm6X.jpg",
        genre: "Action, Adventure, Comedy",
      },
      {
        title: "Black Widow",
        year: "2021",
        poster:
          "https://image.tmdb.org/t/p/w500/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg",
        genre: "Action, Adventure, Sci-Fi",
      },
      {
        title: "Doctor Strange in the Multiverse of Madness",
        year: "2022",
        poster:
          "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
        genre: "Action, Adventure, Horror",
      },
      {
        title: "Thor: Love and Thunder",
        year: "2022",
        poster:
          "https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
        genre: "Action, Adventure, Comedy",
      },
      {
        title: "Jurassic World Dominion",
        year: "2022",
        poster:
          "https://image.tmdb.org/t/p/w500/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
        genre: "Action, Adventure, Sci-Fi",
      },
      {
        title: "Lightyear",
        year: "2022",
        poster:
          "https://image.tmdb.org/t/p/w500/ox4goZd956BxqJH6iLwhWPL9ct4.jpg",
        genre: "Action, Adventure, Animation",
      },
      {
        title: "Morbius",
        year: "2022",
        poster:
          "https://image.tmdb.org/t/p/w500/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg",
        genre: "Action, Adventure, Horror",
      },
      {
        title: "Sonic the Hedgehog 2",
        year: "2022",
        poster:
          "https://image.tmdb.org/t/p/w500/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg",
        genre: "Action, Adventure, Comedy",
      },
      {
        title: "The Northman",
        year: "2022",
        poster:
          "https://image.tmdb.org/t/p/w500/zhLKlUaF1SEpO58ppHIAyENkwgw.jpg",
        genre: "Action, Adventure, Drama",
      },
      {
        title: "Everything Everywhere All at Once",
        year: "2022",
        poster:
          "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
        genre: "Action, Adventure, Comedy",
      },
      {
        title: "M3GAN",
        year: "2023",
        poster:
          "https://image.tmdb.org/t/p/w500/d9nBoowhjiiYc4FBNtQkPY7c11H.jpg",
        genre: "Action, Horror, Sci-Fi",
        description:
          "A robotics engineer at a toy company builds a life-like doll that begins to take on a life of its own.",
      },
      {
        title: "Evil Dead Rise",
        year: "2023",
        poster:
          "https://image.tmdb.org/t/p/w500/5ik4ATKmNtmJU6AYD0bLm56BCVM.jpg",
        genre: "Action, Horror",
        description:
          "A twisted tale of two estranged sisters whose reunion is cut short by the rise of flesh-possessing demons, thrusting them into a primal battle for survival.",
      },
      {
        title: "The Nun II",
        year: "2023",
        poster:
          "https://image.tmdb.org/t/p/w500/5gzzkR7y3hnY8AD1wXjCnVlHba5.jpg",
        genre: "Action, Horror, Mystery",
        description:
          "1956 - France. A priest is murdered. An evil is spreading. The sequel to the worldwide smash hit follows Sister Irene as she once again comes face-to-face with Valak, the demon nun.",
      },
      {
        title: "Beast",
        year: "2022",
        poster:
          "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
        genre: "Action, Drama, Horror",
      },
    ],
  },
  3: {
    name: "Action Packed",
    movies: [
      {
        title: "Mad Max: Fury Road",
        year: "2015",
        poster:
          "https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        genre: "Action, Adventure, Sci-Fi",
        description:
          "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
      },
      {
        title: "John Wick",
        year: "2014",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_SX300.jpg",
        genre: "Action, Crime, Thriller",
        description:
          "An ex-hit-man comes out of retirement to track down the gangsters that took everything from him.",
      },
      {
        title: "Gladiator",
        year: "2000",
        poster:
          "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
        genre: "Action, Adventure, Drama",
        description:
          "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
      },
      {
        title: "Die Hard",
        year: "1988",
        poster:
          "https://image.tmdb.org/t/p/w500/yFihWxQcmqcaBR31QM6Y8gT6aYV.jpg",
        genre: "Action, Thriller",
        description:
          "An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.",
      },
      {
        title: "Wonder Woman",
        year: "2017",
        poster:
          "https://image.tmdb.org/t/p/w500/gfJGlDaHuWimErCr5Ql0I8x9QSy.jpg",
        genre: "Action, Adventure, Fantasy",
        description:
          "When a pilot crashes and tells of conflict in the outside world, Diana, an Amazonian warrior in training, leaves home to fight a war, discovering her full powers and true destiny.",
      },
      {
        title: "The Matrix",
        year: "1999",
        poster:
          "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        genre: "Action, Sci-Fi",
        description:
          "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
      },
      {
        title: "Gladiator",
        year: "2000",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        genre: "Action, Adventure, Drama",
        description:
          "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
      },
      {
        title: "Bad Boys",
        year: "1995",
        poster:
          "https://image.tmdb.org/t/p/w500/x1ygBecKHfXX4M2kRhmFKWfWbJc.jpg",
        genre: "Action, Comedy, Crime",
        description:
          "Two hip detectives protect a witness to a murder while investigating a case of stolen heroin from the evidence storage room from their police precinct.",
      },
      {
        title: "Casino Royale",
        year: "2006",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMDI5ZWJhOWItYTlhOC00YWNhLTlkNzctNDU5YTI1M2E1MWZhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
        genre: "Action, Adventure, Thriller",
        description:
          "After earning 00 status and a licence to kill, Secret Agent James Bond sets out on his first mission as 007. Bond must defeat a private banker funding terrorists in a high-stakes game of poker at Casino Royale, Montenegro.",
      },
      {
        title: "Nobody",
        year: "2021",
        poster:
          "https://image.tmdb.org/t/p/w500/oBgWY00bEFeZ9N25wWVyuQddbAo.jpg",
        genre: "Action, Crime, Drama",
        description:
          "A bystander who intervenes to help a woman being harassed by a group of men becomes the target of a vengeful drug lord after his family is threatened.",
      },
      {
        title: "Furiosa: A Mad Max Saga",
        year: "2024",
        poster:
          "https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
        genre: "Action, Adventure, Sci-Fi",
        description:
          "The origin story of renegade warrior Furiosa before her encounter and teamup with Mad Max.",
      },
      {
        title: "Mission: Impossible - Fallout",
        year: "2018",
        poster:
          "https://m.media-amazon.com/images/M/MV5BNjRlZmM0ODktY2RjNS00ZDdjLWJhZGYtNDljNWZkMGM5MTg0XkEyXkFqcGdeQXVyNjAwMjI5MDk@._V1_SX300.jpg",
        genre: "Action, Adventure, Thriller",
        description:
          "Ethan Hunt and his IMF team, along with some familiar allies, race against time after a mission gone wrong.",
      },
      {
        title: "Bad Boys: Ride or Die",
        year: "2024",
        poster:
          "https://image.tmdb.org/t/p/w500/oGythE98MYleE6mZlGs5oBGkux1.jpg",
        genre: "Action, Comedy, Crime",
        description:
          "Miami detectives Mike Lowrey and Marcus Burnett must face off against a mother-and-son pair of drug lords.",
      },
      {
        title: "Twisters",
        year: "2024",
        poster:
          "https://image.tmdb.org/t/p/w500/pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg",
        genre: "Action, Adventure, Thriller",
        description:
          "An update to the 1996 film 'Twister', which centered on a pair of storm chasers who risk their lives to test an experimental weather alert system.",
      },
      ,
      {
        title: "Top Gun: Maverick",
        year: "2022",
        poster:
          "https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX300.jpg",
        genre: "Action, Drama",
        description:
          "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it.",
      },
      {
        title: "Scream VI",
        year: "2023",
        poster:
          "https://image.tmdb.org/t/p/w500/wDWwtvkRRlgTiUr6TyLSMX8FCuZ.jpg",
        genre: "Action, Horror, Mystery",
        description:
          "Following the latest Ghostface killings, the four survivors leave Woodsboro behind and start a fresh chapter.",
      },
      {
        title: "The Bourne Identity",
        year: "2002",
        poster:
          "https://m.media-amazon.com/images/M/MV5BM2JkNGU0ZGMtZjVjNS00NjgyLWEyOWYtZmRmZGQyN2IxZjA2XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
        genre: "Action, Mystery, Thriller",
        description:
          "A man is picked up by a fishing boat, bullet-riddled and suffering from amnesia, before racing to elude assassins and attempting to regain his memory.",
      },
      {
        title: "Ant-Man and the Wasp: Quantumania",
        year: "2023",
        poster:
          "https://image.tmdb.org/t/p/w500/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg",
        genre: "Action, Adventure, Comedy",
        description:
          "Scott Lang and Hope Van Dyne are dragged into the Quantum Realm, along with Hope's parents and Scott's daughter Cassie.",
      },
      {
        title: "65",
        year: "2023",
        poster:
          "https://image.tmdb.org/t/p/w500/rzRb63TldOKdKydCvWJM8B6EkPM.jpg",
        genre: "Action, Adventure, Sci-Fi",
        description:
          "An astronaut crash lands on a mysterious planet only to discover he's not alone.",
      },
    ],
  },
  4: {
    name: "Crime & Mystery",
    movies: [
      {
        title: "The Godfather",
        year: "1972",
        poster:
          "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
        genre: "Crime, Drama",
        description:
          "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      },
      {
        title: "The Dark Knight",
        year: "2008",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
        genre: "Action, Crime, Drama",
        description:
          "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological tests.",
      },
      {
        title: "Pulp Fiction",
        year: "1994",
        poster:
          "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
        genre: "Crime, Drama",
        description:
          "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
      },
      {
        title: "Goodfellas",
        year: "1990",
        poster:
          "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
        genre: "Biography, Crime, Drama",
        description:
          "The story of Henry Hill and his life in the mob, covering his relationship with his wife and his mob partners.",
      },
      {
        title: "The Silence of the Lambs",
        year: "1991",
        poster:
          "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        genre: "Crime, Drama, Thriller",
        description:
          "A young FBI cadet must receive the help of Dr. Hannibal Lecter to catch a serial killer.",
      },
      {
        title: "Inception",
        year: "2010",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        genre: "Action, Sci-Fi, Thriller",
      },
      {
        title: "Forrest Gump",
        year: "1994",
        poster:
          "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        genre: "Drama, Romance",
      },
      {
        title: "Casino",
        year: "1995",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMTcxOWYzNDYtYmM4YS00N2NkLTk0NTAtNjg1ODgwZjAxYzI3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
        genre: "Crime, Drama",
        description:
          "A tale of greed, deception, money, power, and murder between a casino executive and a mafia enforcer.",
      },
      {
        title: "The Departed",
        year: "2006",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMTI1MTY2OTIxNV5BMl5BanBnXkFtZTYwNjQ4NjY3._V1_SX300.jpg",
        genre: "Crime, Drama, Thriller",
        description:
          "An undercover cop and a police informant play a cat-and-mouse game with each other.",
      },
      {
        title: "Scarface",
        year: "1983",
        poster:
          "https://m.media-amazon.com/images/M/MV5BNjdjNGQ4NDEtNTEwYS00MTgxLTliYzQtYzE2ZDRiZjFhZmNlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        genre: "Crime, Drama",
        description:
          "In Miami in 1980, a determined Cuban immigrant takes over a drug cartel and becomes a powerful drug lord.",
      },
      {
        title: "Joker",
        year: "2019",
        poster:
          "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
        genre: "Crime, Drama, Thriller",
      },
      {
        title: "The Shawshank Redemption",
        year: "1994",
        poster:
          "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg",
        genre: "Drama",
      },
      {
        title: "Top Gun: Maverick",
        year: "2022",
        poster:
          "https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX300.jpg",
        genre: "Action, Drama",
      },
      {
        title: "Shutter Island",
        year: "2010",
        poster:
          "https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        genre: "Mystery, Thriller",
        description:
          "A U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.",
      },
      {
        title: "Black Panther",
        year: "2018",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SX300.jpg",
        genre: "Action, Adventure, Sci-Fi",
      },
      {
        title: "Prisoners",
        year: "2013",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMTg0NTIzMjQ1NV5BMl5BanBnXkFtZTcwNDc3MzM5OQ@@._V1_SX300.jpg",
        genre: "Crime, Drama, Mystery",
        description:
          "A desperate father takes matters into his own hands when his daughter and her friend disappear.",
      },
      {
        title: "Goodfellas",
        year: "1990",
        poster:
          "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
        genre: "Biography, Crime, Drama",
      },
      {
        title: "Sicario",
        year: "2015",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMjA5NjM3NTk1M15BMl5BanBnXkFtZTgwMzg1MzU2NjE@._V1_SX300.jpg",
        genre: "Action, Crime, Drama",
        description:
          "An idealistic FBI agent is enlisted by a government task force to aid in the escalating war against drugs.",
      },
      {
        title: "No Country for Old Men",
        year: "2007",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMjA5Njk3MjM4OV5BMl5BanBnXkFtZTcwMTc5MTE1MQ@@._V1_SX300.jpg",
        genre: "Crime, Drama, Thriller",
        description:
          "Violence and mayhem ensue after a hunter stumbles upon some dead bodies and a drug deal gone wrong.",
      },
    ],
  },
  5: {
    name: "Sci-fi & Fantasy",
    movies: [
      {
        title: "Fast X",
        poster_path: "/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
        release_date: "2023-05-19",
        overview:
          "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path.",
      },
      {
        title: "Interstellar",
        year: "2014",
        poster:
          "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        genre: "Adventure, Drama, Sci-Fi",
        description:
          "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      },
      {
        title: "The Matrix",
        year: "1999",
        poster:
          "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        genre: "Action, Sci-Fi",
        description:
          "A computer programmer discovers reality as he knows it is a simulation.",
      },
      {
        title: "Blade Runner 2049",
        year: "2017",
        poster:
          "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg",
        genre: "Drama, Mystery, Sci-Fi",
        description:
          "A young blade runner discovers a secret that could plunge what's left of society into chaos.",
      },
      {
        title: "Avatar",
        year: "2009",
        poster:
          "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
        genre: "Action, Adventure, Fantasy",
        description:
          "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following orders and protecting an alien civilization.",
      },
      {
        title: "The Lord of the Rings: The Fellowship of the Ring",
        year: "2001",
        poster:
          "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg",
        genre: "Action, Adventure, Drama",
        description:
          "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring.",
      },
      {
        title: "Inception",
        year: "2010",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        genre: "Action, Sci-Fi, Thriller",
        description:
          "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
      },
      {
        title: "The Avengers",
        year: "2012",
        poster:
          "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        genre: "Action, Adventure, Sci-Fi",
        description:
          "Earth's mightiest heroes must come together and learn to fight as a team to stop the mischievous Loki.",
      },
      {
        title: "Guardians of the Galaxy",
        year: "2014",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMTAwMjU5OTgxNjZeQTJeQWpwZ15BbWU4MDUxNDYxODEx._V1_SX300.jpg",
        genre: "Action, Adventure, Comedy",
        description:
          "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.",
      },
      {
        title: "Mad Max: Fury Road",
        year: "2015",
        poster:
          "https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        genre: "Action, Adventure, Sci-Fi",
        description:
          "In a post-apocalyptic wasteland, Max teams up with a mysterious woman to escape a cult leader.",
      },
      {
        title: "Ex Machina",
        year: "2014",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMTUxNzc0OTIxMV5BMl5BanBnXkFtZTgwNDI3NzU2NDE@._V1_SX300.jpg",
        genre: "Drama, Sci-Fi, Thriller",
        description:
          "A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence.",
      },
      {
        title: "The Martian",
        year: "2015",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_SX300.jpg",
        genre: "Adventure, Drama, Sci-Fi",
        description:
          "An astronaut becomes stranded on Mars and must devise a way to survive until rescue.",
      },
      {
        title: "Pacific Rim",
        year: "2013",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMTY3MTI5NjQ4Nl5BMl5BanBnXkFtZTcwOTU1OTU0OQ@@._V1_SX300.jpg",
        genre: "Action, Adventure, Sci-Fi",
        description:
          "Humans pilot giant robots to fight enormous monsters rising from the ocean depths.",
      },
      {
        title: "Doctor Strange",
        year: "2016",
        poster:
          "https://m.media-amazon.com/images/M/MV5BNjgwNzAzNjk1Nl5BMl5BanBnXkFtZTgwMzQ2NjI1OTE@._V1_SX300.jpg",
        genre: "Action, Adventure, Fantasy",
        description:
          "A former neurosurgeon embarks on a journey of healing only to be drawn into the world of the mystic arts.",
      },
      {
        title: "Arrival",
        year: "2016",
        poster:
          "https://m.media-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI4MzAy._V1_SX300.jpg",
        genre: "Drama, Mystery, Sci-Fi",
        description:
          "A linguist works with the military to communicate with alien lifeforms after mysterious spacecraft appear.",
      },
      {
        title: "Gravity",
        year: "2013",
        poster:
          "https://m.media-amazon.com/images/M/MV5BNjE5MzYwMzYxMF5BMl5BanBnXkFtZTcwOTk4MTk0OQ@@._V1_SX300.jpg",
        genre: "Drama, Sci-Fi, Thriller",
        description:
          "Two astronauts work together to survive after an accident leaves them stranded in space.",
      },
    ],
  },
  6: {
    name: "Horror",
    movies: [
      {
        title: "Scream VI",
        year: "2023",
        poster:
          "https://image.tmdb.org/t/p/w500/wDWwtvkRRlgTiUr6TyLSMX8FCuZ.jpg",
        genre: "Horror, Mystery, Thriller",
      },
      {
        title: "Hereditary",
        year: "2018",
        poster:
          "https://image.tmdb.org/t/p/w500/p81a0dSuHWk8PGbgAu2cJnfvFGr.jpg",
        genre: "Drama, Horror, Mystery",
      },
      {
        title: "Get Out",
        year: "2017",
        poster:
          "https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg",
        genre: "Horror, Mystery, Thriller",
      },
    ],
  },
  7: {
    name: "Comedy",
    movies: [
      {
        title: "Everything Everywhere All at Once",
        year: "2022",
        poster:
          "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
        genre: "Action, Adventure, Comedy",
      },
      {
        title: "The Grand Budapest Hotel",
        year: "2014",
        poster:
          "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
        genre: "Adventure, Comedy, Crime",
      },
      {
        title: "Parasite",
        year: "2019",
        poster:
          "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        genre: "Comedy, Drama, Thriller",
      },
    ],
  },
  8: {
    name: "Drama",
    movies: [
      {
        title: "The Shawshank Redemption",
        year: "1994",
        poster:
          "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        genre: "Drama",
      },
      {
        title: "12 Years a Slave",
        year: "2013",
        poster:
          "https://image.tmdb.org/t/p/w500/xdANQijuNrJaw1HA61rDccME4Tm.jpg",
        genre: "Biography, Drama, History",
      },
      {
        title: "Moonlight",
        year: "2016",
        poster:
          "https://image.tmdb.org/t/p/w500/4911T5FbJ9eD2Faz5Z8cT3SUwUx.jpg",
        genre: "Drama",
      },
    ],
  },
};


// Utility functions
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const retryRequest = async (requestFn, retries = API_CONFIG.retries) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      if (i === retries - 1) throw error;
      const delayTime = API_CONFIG.retryDelay * Math.pow(2, i);
      console.warn(
        `Request failed, retrying in ${delayTime}ms... (${i + 1}/${retries})`
      );
      await delay(delayTime);
    }
  }
};

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: OMDB_BASE_URL,
  timeout: API_CONFIG.timeout,
});

// Add request interceptor for better error handling
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Response error:", error);
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout");
    }
    return Promise.reject(error);
  }
);

// API Functions
export const movieAPI = {
  // Get movies by genre (using predefined collections)
  getMoviesByGenre: async (genreId) => {
    try {
      // Validate input
      if (!genreId) {
        throw new Error("Genre ID is required");
      }

      const genre = genreMapping[genreId];
      if (!genre) {
        throw new Error(`Genre with ID ${genreId} not found`);
      }

      return {
        success: true,
        data: {
          genreName: genre.name,
          movies: genre.movies,
          totalResults: genre.movies.length.toString(),
        },
      };
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  },

  // Search movies by title
  searchMovies: async (searchTerm, page = 1) => {
    try {
      // Validate input
      if (!searchTerm || searchTerm.trim() === "") {
        throw new Error("Search term is required");
      }

      if (!API_KEY || API_KEY === "YOUR_ACTUAL_API_KEY") {
        // Return mock data when no API key is provided
        const filteredMovies = Object.values(genreMapping)
          .flatMap((genre) => genre.movies)
          .filter((movie) => {
            if (!movie) return false;
            const searchLower = searchTerm.toLowerCase();
            return (
              movie.title?.toLowerCase().includes(searchLower) ||
              movie.genre?.toLowerCase().includes(searchLower) ||
              movie.director?.toLowerCase().includes(searchLower) ||
              movie.actors?.toLowerCase().includes(searchLower)
            );
          });

        const startIndex = (page - 1) * 10;
        const endIndex = page * 10;

        return {
          success: true,
          data: {
            Search: filteredMovies.slice(startIndex, endIndex),
            totalResults: filteredMovies.length.toString(),
            Response: "True",
          },
        };
      }

      const response = await retryRequest(() =>
        apiClient.get("", {
          params: {
            apikey: API_KEY,
            s: searchTerm,
            page: page,
            type: "movie",
          },
        })
      );

      if (response.data.Response === "False") {
        return {
          success: false,
          error: response.data.Error || "No movies found",
          data: null,
        };
      }

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error searching movies:", error);
      return {
        success: false,
        error: error.response?.data?.Error || error.message,
        data: null,
      };
    }
  },

  // Get movie details by IMDb ID
  getMovieDetails: async (imdbId) => {
    try {
      // Validate input
      if (!imdbId) {
        throw new Error("IMDb ID is required");
      }

      // First check if movie exists in our local data
      const localMovie = Object.values(genreMapping)
        .flatMap((genre) => genre.movies)
        .find((movie) => movie.imdbID === imdbId);

      if (localMovie) {
        return {
          success: true,
          data: {
            ...localMovie,
            Response: "True",
          },
        };
      }

      if (!API_KEY || API_KEY === "YOUR_ACTUAL_API_KEY") {
        return {
          success: false,
          error: "Movie not found in local database and no API key provided",
          data: null,
        };
      }

      const response = await retryRequest(() =>
        apiClient.get("", {
          params: {
            apikey: API_KEY,
            i: imdbId,
            plot: "full",
          },
        })
      );

      if (response.data.Response === "False") {
        return {
          success: false,
          error: response.data.Error || "Movie not found",
          data: null,
        };
      }

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return {
        success: false,
        error: error.response?.data?.Error || error.message,
        data: null,
      };
    }
  },

  // Get all available genres
  getAllGenres: () => {
    try {
      const genres = Object.entries(genreMapping).map(([id, genre]) => ({
        id: parseInt(id),
        name: genre.name,
        movieCount: genre.movies?.length || 0,
      }));

      return {
        success: true,
        data: genres,
      };
    } catch (error) {
      console.error("Error fetching genres:", error);
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  },

  // Get featured/trending movies (combines top movies from different genres)
  getFeaturedMovies: (limit = 12) => {
    try {
      const allMovies = Object.values(genreMapping)
        .flatMap((genre) => genre.movies)
        .filter((movie) => movie && movie.rating)
        .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
        .slice(0, limit);

      return {
        success: true,
        data: {
          movies: allMovies,
          totalResults: allMovies.length.toString(),
        },
      };
    } catch (error) {
      console.error("Error fetching featured movies:", error);
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  },

  // Get movies by year
  getMoviesByYear: (year) => {
    try {
      if (!year) {
        throw new Error("Year is required");
      }

      const moviesByYear = Object.values(genreMapping)
        .flatMap((genre) => genre.movies)
        .filter((movie) => movie && movie.year === year.toString());

      return {
        success: true,
        data: {
          movies: moviesByYear,
          totalResults: moviesByYear.length.toString(),
          year: year,
        },
      };
    } catch (error) {
      console.error("Error fetching movies by year:", error);
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  },

  // Get movie recommendations based on a movie ID
  getMovieRecommendations: (imdbId, limit = 6) => {
    try {
      if (!imdbId) {
        throw new Error("IMDb ID is required");
      }

      const sourceMovie = Object.values(genreMapping)
        .flatMap((genre) => genre.movies)
        .find((movie) => movie.imdbID === imdbId);

      if (!sourceMovie) {
        return {
          success: false,
          error: "Source movie not found",
          data: null,
        };
      }

      // Get movies from the same genre(s)
      const sourceGenres = sourceMovie.genre
        ? sourceMovie.genre
            .toLowerCase()
            .split(",")
            .map((g) => g.trim())
        : [];

      const recommendations = Object.values(genreMapping)
        .flatMap((genre) => genre.movies)
        .filter((movie) => {
          if (!movie || movie.imdbID === imdbId) return false;

          const movieGenres = movie.genre
            ? movie.genre
                .toLowerCase()
                .split(",")
                .map((g) => g.trim())
            : [];

          return sourceGenres.some((genre) =>
            movieGenres.some((mg) => mg.includes(genre) || genre.includes(mg))
          );
        })
        .sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0))
        .slice(0, limit);

      return {
        success: true,
        data: {
          sourceMovie: sourceMovie,
          recommendations: recommendations,
          totalResults: recommendations.length.toString(),
        },
      };
    } catch (error) {
      console.error("Error fetching movie recommendations:", error);
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  },
};

// Export individual functions for direct destructuring
export const getMoviesByGenre = movieAPI.getMoviesByGenre;
export const searchMovies = movieAPI.searchMovies;
export const getMovieDetails = movieAPI.getMovieDetails;
export const getAllGenres = movieAPI.getAllGenres;
export const getFeaturedMovies = movieAPI.getFeaturedMovies;
export const getMoviesByYear = movieAPI.getMoviesByYear;
export const getMovieRecommendations = movieAPI.getMovieRecommendations;

// Export default
export default movieAPI;
