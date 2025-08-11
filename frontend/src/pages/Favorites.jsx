import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";
import { useState } from "react";

const Favorites = () => {
  const { favorites, removeFromFavorites } = useMovieContext();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearAll = () => {
    favorites.forEach(movie => removeFromFavorites(movie.id));
    setShowClearConfirm(false);
  };

  const handleRemoveAll = () => {
    setShowClearConfirm(true);
  };

  const cancelClear = () => {
    setShowClearConfirm(false);
  };

  // Show empty message if no favorites
  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorites">
        <div className="favorites-container">
          <div className="favorites-empty">
            <div className="favorites-empty-icon">🎬</div>
            <h2>Your Favorites Collection</h2>
            <p>
              Start building your personal movie collection by adding your favorite films. 
              Browse movies on the home page and click the heart icon to save them here.
            </p>
            <Link to="/" className="favorites-empty-btn">
              Browse Movies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show favorite movies
  return (
    <div className="favorites">
      <div className="favorites-container">
        <div className="favorites-header">
          <h1 className="favorites-title">Your Favorites</h1>
          <p className="favorites-subtitle">
            Your personal collection of beloved films
          </p>
          <div className="favorites-count">
            <span>♥</span>
            <span>{favorites.length} {favorites.length === 1 ? 'movie' : 'movies'}</span>
          </div>
        </div>

        {favorites.length > 0 && (
          <div className="favorites-actions">
            {!showClearConfirm ? (
              <button 
                className="favorites-action-btn danger"
                onClick={handleRemoveAll}
              >
                <span>🗑️</span>
                Clear All Favorites
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button 
                  className="favorites-action-btn danger"
                  onClick={handleClearAll}
                >
                  <span>⚠️</span>
                  Confirm Clear All
                </button>
                <button 
                  className="favorites-action-btn"
                  onClick={cancelClear}
                >
                  <span>✕</span>
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}

        <div className="favorites-grid">
          {favorites.map((movie, index) => (
            <div key={movie.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
