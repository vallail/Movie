import { useMovieContext } from "../contexts/MovieContext";
import "../css/MovieCard.css";

const MovieCard = ({ movie }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);
  
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).getFullYear();
  };

  const truncateText = (text, maxLength = 120) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          loading="lazy"
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={handleFavoriteClick}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            {favorite ? "♥" : "♡"}
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-date">{formatDate(movie.release_date)}</p>
        <p className="movie-overview">{truncateText(movie.overview)}</p>
        {movie.vote_average && (
          <div className="movie-rating">
            <span className="rating-star">★</span>
            <span className="rating-text">{movie.vote_average.toFixed(1)}/10</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
