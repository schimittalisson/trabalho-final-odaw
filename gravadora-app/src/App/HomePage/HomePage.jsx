import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <header>
        <h1>Bem-vindo à NossaBossa</h1>
        <p>Gerencie artistas, músicas, instrumentos e discos.</p>
      </header>

      <div className="homepage-actions">
        <Link to="../artists" className="action-button">Artistas</Link>
        <Link to="/music" className="action-button">Músicas</Link>
        <Link to="/instruments" className="action-button">Instrumentos</Link>
        <Link to="/albums" className="action-button">Discos</Link>
      </div>
    </div>
  );
};

export default HomePage;