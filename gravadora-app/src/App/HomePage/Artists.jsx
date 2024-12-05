import React, { useState, useEffect } from "react";
import "./GlobalStyles.css";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [newArtist, setNewArtist] = useState({
    name: "",
    type: "Solo",
    extraFields: {
      rua: "",
      cidade: "",
      estado: "",
      numero: "",
      telefone: "",
    },
  });

  // Função para buscar artistas do banco
  const fetchArtists = () => {
    fetch("/get-artists")
      .then((response) => response.json())
      .then((data) => {
        setArtists(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar artistas:", error);
      });
  };

  // UseEffect para buscar artistas ao carregar a página
  useEffect(() => {
    fetchArtists();
  }, []);

  const handleAddArtist = (e) => {
    e.preventDefault();

    // Enviar os dados para o backend
    fetch("http://localhost:3001/add-artist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newArtist),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao adicionar artista");
        }
        return response.text();
      })
      .then((message) => {
        alert(message);

        // Atualizar lista local com nova busca
        fetchArtists();

        // Resetar o formulário
        setNewArtist({
          name: "",
          type: "Solo",
          extraFields: {
            rua: "",
            cidade: "",
            estado: "",
            numero: "",
            telefone: "",
          },
        });
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao adicionar artista.");
      });
  };

  const handleDeleteArtist = (id) => {
    fetch(`http://localhost:3001/delete-artist/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao deletar artista");
        }
        return response.text();
      })
      .then((message) => {
        alert(message);

        // Atualizar lista local com nova busca
        fetchArtists();
      })
      .catch((error) => {
        console.error("Erro ao deletar artista:", error);
      });
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
              setNewArtist({
                ...newArtist,
                type: e.target.value,
                extraFields: {
                  rua: "",
                  cidade: "",
                  estado: "",
                  numero: "",
                  telefone: "",
                },
              })
            }
          >
            <option value="Solo">Solo</option>
            <option value="Banda">Banda</option>
          </select>
        </label>

        {/* Campos extras para "Solo" */}
        {newArtist.type === "Solo" && (
          <div className="extra-fields">
            <label>
              Rua:
              <input
                type="text"
                value={newArtist.extraFields.rua}
                onChange={(e) =>
                  setNewArtist({
                    ...newArtist,
                    extraFields: { ...newArtist.extraFields, rua: e.target.value },
                  })
                }
              />
            </label>
            <label>
              Cidade:
              <input
                type="text"
                value={newArtist.extraFields.cidade}
                onChange={(e) =>
                  setNewArtist({
                    ...newArtist,
                    extraFields: {
                      ...newArtist.extraFields,
                      cidade: e.target.value,
                    },
                  })
                }
              />
            </label>
            <label>
              Estado:
              <input
                type="text"
                value={newArtist.extraFields.estado}
                onChange={(e) =>
                  setNewArtist({
                    ...newArtist,
                    extraFields: {
                      ...newArtist.extraFields,
                      estado: e.target.value,
                    },
                  })
                }
              />
            </label>
            <label>
              Número:
              <input
                value={newArtist.extraFields.numero}
                onChange={(e) =>
                  setNewArtist({
                    ...newArtist,
                    extraFields: {
                      ...newArtist.extraFields,
                      numero: e.target.value,
                    },
                  })
                }
              />
            </label>
            <label>
              Telefone:
              <input
                type="text"
                value={newArtist.extraFields.telefone}
                onChange={(e) =>
                  setNewArtist({
                    ...newArtist,
                    extraFields: {
                      ...newArtist.extraFields,
                      telefone: e.target.value,
                    },
                  })
                }
              />
            </label>
          </div>
        )}

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
                <strong>{artist.name}</strong> {artist.type}
                {artist.type === "Solo" && (
                  <div>
                    <p>
                      <strong>Rua:</strong> {artist.extraFields.rua}
                    </p>
                    <p>
                      <strong>Cidade:</strong> {artist.extraFields.cidade}
                    </p>
                    <p>
                      <strong>Estado:</strong> {artist.extraFields.estado}
                    </p>
                    <p>
                      <strong>Número:</strong> {artist.extraFields.numero}
                    </p>
                    <p>
                      <strong>Telefone:</strong> {artist.extraFields.telefone}
                    </p>
                  </div>
                )}
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
