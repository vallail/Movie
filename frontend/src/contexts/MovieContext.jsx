"use client"; // if in /app dir

import { createContext, useEffect, useState, useContext } from "react";

const MovieContext = createContext();
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return; // safety for SSR
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
      localStorage.removeItem("favorites");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") return;
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }, [favorites, isLoaded]);

  const addToFavorites = (movie) => {
    if (!movie?.id) return;
    setFavorites((prev) => (prev.some((fav) => fav.id === movie.id) ? prev : [...prev, movie]));
  };

  const removeFromFavorites = (movieId) => {
    if (!movieId) return;
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) => favorites.some((movie) => movie.id === movieId);
  const clearAllFavorites = () => setFavorites([]);

  return (
    <MovieContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, clearAllFavorites, isLoaded }}>
      {children}
    </MovieContext.Provider>
  );
};
