import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./css/App.css";
import { MovieProvider } from "./contexts/MovieContext";
import Footer from "./components/Footer";

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
          <Route
            path="/contact"
            element={<Contact />}
          />
        </Routes>
      </main>
      <Footer />
    </MovieProvider>
  );
};

export default App;
