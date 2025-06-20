import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
  const { favorites } = useMovieContext();

  // Show empty message if no favorites
  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h1>Favorites Movies here</h1>
      </div>
    );
  }

  // Show favorite movies
  return (
    <div className="favorites">
      <h2>Your Favorites</h2>
      <div className="movies-grid">
        {favorites.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
