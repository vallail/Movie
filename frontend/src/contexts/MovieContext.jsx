import { createContext, useEffect, useState, useContext } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem("favorites");
      if (storedFavs) {
        const parsedFavs = JSON.parse(storedFavs);
        if (Array.isArray(parsedFavs)) {
          setFavorites(parsedFavs);
        }
      }
    } catch (error) {
      console.error("Error loading favorites from localStorage:", error);
      // Clear corrupted data
      localStorage.removeItem("favorites");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("favorites", JSON.stringify(favorites));
      } catch (error) {
        console.error("Error saving favorites to localStorage:", error);
      }
    }
  }, [favorites, isLoaded]);

  const addToFavorites = (movie) => {
    if (!movie || !movie.id) {
      console.error("Invalid movie data:", movie);
      return;
    }
    
    setFavorites((prev) => {
      // Check if movie is already in favorites
      const isAlreadyFavorite = prev.some((fav) => fav.id === movie.id);
      if (isAlreadyFavorite) {
        return prev; // Don't add if already exists
      }
      return [...prev, movie];
    });
  };

  const removeFromFavorites = (movieId) => {
    if (!movieId) {
      console.error("Invalid movie ID:", movieId);
      return;
    }
    
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    if (!movieId) return false;
    return favorites.some((movie) => movie.id === movieId);
  };

  const clearAllFavorites = () => {
    setFavorites([]);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearAllFavorites,
    isLoaded,
  };
  
  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
