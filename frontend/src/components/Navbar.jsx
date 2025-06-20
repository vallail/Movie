import "../css/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link
          className="nav-main"
          to="/">
          Movie App
        </Link>
      </div>
      <div className="navbar-links">
        <Link
          to="/"
          className="nav-link">
          Home
        </Link>
        <Link
          to="/favorites"
          className="nav-link">
          Favorites
        </Link>
        <Link
          to="/about"
          className="nav-link">
          About
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
