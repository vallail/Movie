import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        setLoading(true);
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies. Please try again later.");
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
    setIsSearching(true);

    try {
      const searchResults = await searchMovies(trimmedQuery);
      setMovies(searchResults);
      if (searchResults.length === 0) {
        setError("No movies found for your search. Try different keywords.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to search movies. Please try again.");
    } finally {
      setIsSearching(false);
      setSearchQuery("");
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setError(null);
    // Reload popular movies
    const loadPopularMovies = async () => {
      try {
        setLoading(true);
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  };

  return (
    <div className="home">
      <div className="home-container">
        <div className="home-header">
          <h1 className="home-title">Discover Amazing Films</h1>
          <p className="home-subtitle">
            Explore the latest movies and find your next favorite film
          </p>
        </div>

        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search for movies..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="search-button"
              disabled={loading || isSearching || !searchQuery.trim()}>
              {isSearching ? (
                <>
                  <span>🔍</span>
                  Searching...
                </>
              ) : (
                <>
                  <span>🔍</span>
                  Search
                </>
              )}
            </button>
          </form>
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="search-button"
              style={{ 
                marginTop: '1rem', 
                background: 'transparent', 
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)'
              }}>
              <span>↺</span>
              Clear Search
            </button>
          )}
        </div>

        <div className="movies-section">
          {error && (
            <div className="error-message">
              <span>⚠️</span> {error}
            </div>
          )}

          {loading && (
            <div className="loading">
              Loading amazing movies for you...
            </div>
          )}

          {!loading && !error && movies.length > 0 && (
            <>
              <div className="movies-header">
                <h2 className="movies-title">
                  {isSearching ? "Search Results" : "Popular Movies"}
                </h2>
                <span className="movies-count">
                  {movies.length} {movies.length === 1 ? 'movie' : 'movies'}
                </span>
              </div>
              <div className="movies-grid">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id || movie.title}
                    movie={movie}
                  />
                ))}
              </div>
            </>
          )}

          {!loading && !error && movies.length === 0 && !isSearching && (
            <div className="no-results">
              <div className="no-results-icon">🎬</div>
              <h3>No movies found</h3>
              <p>Try searching for a different movie or browse our popular selections.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
