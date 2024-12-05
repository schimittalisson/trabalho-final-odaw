import React, { useState, useEffect } from "react";
import "./GlobalStyles.css";

const Albums = () => {
  const [albumList, setAlbumList] = useState([]);
  const [artistList, setArtistList] = useState([]);
  const [producerList, setProducerList] = useState([]);
  const [newAlbum, setNewAlbum] = useState({
    title: "",
    releaseDate: "",
    format: "",
    artistId: "",
    producerId: "",
  });

  // Função para buscar álbuns do banco
  const fetchAlbumList = () => {
    fetch("/get-albums")
      .then((response) => response.json())
      .then((data) => {
        setAlbumList(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar álbuns:", error);
      });
  };

  // Função para buscar artistas
  const fetchArtistList = () => {
    fetch("/get-artists-select")
      .then((response) => response.json())
      .then((data) => {
        setArtistList(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar artistas:", error);
      });
  };

  // Função para buscar produtores
  const fetchProducerList = () => {
    fetch("/get-producers-select")
      .then((response) => response.json())
      .then((data) => {
        setProducerList(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtores:", error);
      });
  };

  // UseEffect para carregar dados iniciais
  useEffect(() => {
    fetchAlbumList();
    fetchArtistList();
    fetchProducerList();
  }, []);

  const handleAddAlbum = (e) => {
    e.preventDefault();

    // Enviar os dados para o backend
    fetch("/add-album", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAlbum),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao adicionar álbum");
        }
        return response.json();
      })
      .then((album) => {
        alert("Álbum adicionado com sucesso!");
        fetchAlbumList(); // Atualiza a lista local
        setNewAlbum({ title: "", releaseDate: "", format: "", artistId: "", producerId: "" }); // Reseta o formulário
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao adicionar álbum.");
      });
  };

  const handleDeleteAlbum = (id) => {
    fetch(`/delete-album/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao deletar álbum");
        }
        return response.text();
      })
      .then((message) => {
        alert(message);
        fetchAlbumList(); // Atualiza a lista local
      })
      .catch((error) => {
        console.error("Erro ao deletar álbum:", error);
      });
  };

  return (
    <div className="albums-page">
      <h2>Gerenciar Álbuns</h2>

      {/* Formulário para adicionar álbum */}
      <form onSubmit={handleAddAlbum}>
        <label>
          Título:
          <input
            type="text"
            value={newAlbum.title}
            onChange={(e) =>
              setNewAlbum({ ...newAlbum, title: e.target.value })
            }
            required
          />
        </label>
        <label>
          Data de Lançamento:
          <input
            type="date"
            value={newAlbum.releaseDate}
            onChange={(e) =>
              setNewAlbum({ ...newAlbum, releaseDate: e.target.value })
            }
            required
          />
        </label>
        <label>
          Formato:
          <input
            type="text"
            value={newAlbum.format}
            onChange={(e) =>
              setNewAlbum({ ...newAlbum, format: e.target.value })
            }
          />
        </label>
        <label>
          Artista:
          <select
            value={newAlbum.artistId}
            onChange={(e) =>
              setNewAlbum({ ...newAlbum, artistId: e.target.value })
            }
            required
          >
            <option value="">Selecione um artista</option>
            {artistList.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Produtor:
          <select
            value={newAlbum.producerId}
            onChange={(e) =>
              setNewAlbum({ ...newAlbum, producerId: e.target.value })
            }
            required
          >
            <option value="">Selecione um produtor</option>
            {producerList.map((producer) => (
              <option key={producer.id_prod} value={producer.id_prod}>
                {producer.nome}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Adicionar Álbum</button>
      </form>

      {/* Lista de álbuns */}
      <div className="albums-list">
        <h3>Lista de Álbuns</h3>
        {albumList.length === 0 ? (
          <p>Nenhum álbum adicionado ainda.</p>
        ) : (
          <ul>
            {albumList.map((album) => (
              <li key={album.id_dis}>
                <strong>{album.titulo}</strong> - {album.data_lancamento} ({album.formato})<br />
                Artista ID: {album.id_artista}, Produtor ID: {album.id_prod}
                <button onClick={() => handleDeleteAlbum(album.id_dis)}>
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

export default Albums;
