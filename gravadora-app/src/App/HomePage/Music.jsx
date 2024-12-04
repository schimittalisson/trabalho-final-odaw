import React, { useState } from "react";
import "./GlobalStyles.css";

const Music = () => {
  const [musicList, setMusicList] = useState([]);
  const [newMusic, setNewMusic] = useState({
    title: "",
    artist: "",
    duration: "",
  });

  const handleAddMusic = (e) => {
    e.preventDefault();
    setMusicList([...musicList, { ...newMusic, id: Date.now() }]);
    setNewMusic({ title: "", artist: "", duration: "" });
  };

  const handleDeleteMusic = (id) => {
    setMusicList(musicList.filter((music) => music.id !== id));
  };

  return (
    <div className="music-page">
      <h2>Gerenciar Músicas</h2>

      {/* Formulário para adicionar música */}
      <form onSubmit={handleAddMusic}>
        <label>
          Título:
          <input
            type="text"
            value={newMusic.title}
            onChange={(e) =>
              setNewMusic({ ...newMusic, title: e.target.value })
            }
            required
          />
        </label>
        <label>
          Artista:
          <input
            type="text"
            value={newMusic.artist}
            onChange={(e) =>
              setNewMusic({ ...newMusic, artist: e.target.value })
            }
            required
          />
        </label>
        <label>
          Duração:
          <input
            type="text"
            value={newMusic.duration}
            onChange={(e) =>
              setNewMusic({ ...newMusic, duration: e.target.value })
            }
            placeholder="Exemplo: 3:45"
          />
        </label>
        <button type="submit">Adicionar Música</button>
      </form>

      {/* Lista de músicas */}
      <div className="music-list">
        <h3>Lista de Músicas</h3>
        {musicList.length === 0 ? (
          <p>Nenhuma música adicionada ainda.</p>
        ) : (
          <ul>
            {musicList.map((music) => (
              <li key={music.id}>
                <strong>{music.title}</strong> - {music.artist} ({music.duration})
                <button onClick={() => handleDeleteMusic(music.id)}>
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

export default Music;
