import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
        setError(null);
        console.log(popularMovies);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;

    setError(null);
    setLoading(true);

    try {
      const searchResults = await searchMovies(trimmedQuery);
      setMovies(searchResults);
    } catch (err) {
      console.error(err);
      setError("Failed to search movies");
    } finally {
      setLoading(false);
      setSearchQuery("");
    }
  };

  return (
    <div className="home">
      <form
        onSubmit={handleSearch}
        className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="search-button"
          disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">Loading...</div>}

      {!loading && !error && (
        <div className="movies-grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard
                key={movie.id || movie.title}
                movie={movie}
              />
            ))
          ) : (
            <div className="no-results">No movies found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
