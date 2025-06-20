import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import "./css/App.css";
import { MovieProvider } from "./contexts/MovieContext";

const App = () => {
  return (
    <MovieProvider>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/favorites"
            element={<Favorites />}
          />
          <Route
            path="/about"
            element={<About />}
          />
        </Routes>
      </main>
    </MovieProvider>
  );
};

export default App;
