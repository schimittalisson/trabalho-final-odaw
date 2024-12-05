import React, { useState, useEffect } from "react";
import "./GlobalStyles.css";

const Music = () => {
  const [musicList, setMusicList] = useState([]);
  const [newMusic, setNewMusic] = useState({
    title: "",
    artist: "",
  });

  // Função para buscar músicas do banco
  const fetchMusicList = () => {
    fetch("/get-music")
      .then((response) => response.json())
      .then((data) => {
        setMusicList(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar músicas:", error);
      });
  };

  // UseEffect para buscar músicas ao carregar a página
  useEffect(() => {
    fetchMusicList();
  }, []);

  const handleAddMusic = (e) => {
    e.preventDefault();

    // Enviar os dados para o backend
    fetch("/add-music", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMusic),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao adicionar música");
        }
        return response.json();
      })
      .then((music) => {
        alert("Música adicionada com sucesso!");
        fetchMusicList(); // Atualiza a lista local
        setNewMusic({ title: "", artist: "" }); // Reseta o formulário
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao adicionar música.");
      });
  };

  const handleDeleteMusic = (id) => {
    fetch(`/delete-music/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao deletar música");
        }
        return response.text();
      })
      .then((message) => {
        alert(message);
        fetchMusicList(); // Atualiza a lista local
      })
      .catch((error) => {
        console.error("Erro ao deletar música:", error);
      });
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
              <li key={music.id_musica}>
                <strong>{music.titulo}</strong> {music.autores || "Desconhecido"}
                <button onClick={() => handleDeleteMusic(music.id_musica)}>
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
