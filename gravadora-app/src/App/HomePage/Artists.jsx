import React, { useState } from "react";
import "./GlobalStyles.css";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [newArtist, setNewArtist] = useState({ name: "", type: "Solo" });

  const handleAddArtist = (e) => {
    e.preventDefault();
    setArtists([...artists, { ...newArtist, id: Date.now() }]);
    setNewArtist({ name: "", type: "Solo" });
  };

  const handleDeleteArtist = (id) => {
    setArtists(artists.filter((artist) => artist.id !== id));
  };

  return (
    <div className="artists-page">
      <h2>Gerenciar Artistas</h2>

      {/* Formulário para adicionar artista */}
      <form onSubmit={handleAddArtist}>
        <label>
          Nome:
          <input
            type="text"
            value={newArtist.name}
            onChange={(e) =>
              setNewArtist({ ...newArtist, name: e.target.value })
            }
            required
          />
        </label>
        <label>
          Tipo:
          <select
            value={newArtist.type}
            onChange={(e) =>
              setNewArtist({ ...newArtist, type: e.target.value })
            }
          >
            <option value="Solo">Solo</option>
            <option value="Banda">Banda</option>
          </select>
        </label>
        <button type="submit">Adicionar Artista</button>
      </form>

      {/* Lista de artistas */}
      <div className="artist-list">
        <h3>Lista de Artistas</h3>
        {artists.length === 0 ? (
          <p>Nenhum artista adicionado ainda.</p>
        ) : (
          <ul>
            {artists.map((artist) => (
              <li key={artist.id}>
                <strong>{artist.name}</strong> - {artist.type}
                <button onClick={() => handleDeleteArtist(artist.id)}>
                  Deletar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Artists;
