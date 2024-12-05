import React, { useState, useEffect } from "react";
import "./GlobalStyles.css";

const Instruments = () => {
  const [instruments, setInstruments] = useState([]);
  const [newInstrument, setNewInstrument] = useState({
    name: "",
    type: "",
    brand: "",
  });

  // Função para buscar instrumentos do banco
  const fetchInstruments = () => {
    fetch("/get-instruments")
      .then((response) => response.json())
      .then((data) => {
        setInstruments(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar instrumentos:", error);
      });
  };

  // UseEffect para buscar instrumentos ao carregar a página
  useEffect(() => {
    fetchInstruments();
  }, []);

  const handleAddInstrument = (e) => {
    e.preventDefault();

    // Enviar os dados para o backend
    fetch("http://localhost:3001/add-instrument", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newInstrument),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao adicionar instrumento");
        }
        return response.text();
      })
      .then((message) => {
        alert("Instrumento adicionado com sucesso!");

        // Atualizar lista local com nova busca
        fetchInstruments();

        // Resetar o formulário
        setNewInstrument({
          name: "",
          type: "",
          brand: "",
        });
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao adicionar instrumento.");
      });
  };

  const handleDeleteInstrument = (id) => {
    fetch(`http://localhost:3001/delete-instrument/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao deletar instrumento");
        }
        return response.text();
      })
      .then((message) => {
        alert(message);

        // Atualizar lista local com nova busca
        fetchInstruments();
      })
      .catch((error) => {
        console.error("Erro ao deletar instrumento:", error);
      });
  };

  return (
    <div className="instruments-page">
      <h2>Gerenciar Instrumentos</h2>

      {/* Formulário para adicionar instrumento */}
      <form onSubmit={handleAddInstrument}>
        <label>
          Nome:
          <input
            type="text"
            value={newInstrument.name}
            onChange={(e) =>
              setNewInstrument({ ...newInstrument, name: e.target.value })
            }
            required
          />
        </label>
        <label>
          Tipo:
          <input
            type="text"
            value={newInstrument.type}
            onChange={(e) =>
              setNewInstrument({ ...newInstrument, type: e.target.value })
            }
            required
          />
        </label>
        <label>
          Marca:
          <input
            type="text"
            value={newInstrument.brand}
            onChange={(e) =>
              setNewInstrument({ ...newInstrument, brand: e.target.value })
            }
            required
          />
        </label>
        <button type="submit">Adicionar Instrumento</button>
      </form>

      {/* Lista de instrumentos */}
      <div className="instrument-list">
        <h3>Lista de Instrumentos</h3>
        {instruments.length === 0 ? (
          <p>Nenhum instrumento adicionado ainda.</p>
        ) : (
          <ul>
            {instruments.map((instrument) => (
              <li key={instrument.id_inst}>
                <strong>{instrument.nome}</strong> {instrument.tipo} - {instrument.marca}
                <button onClick={() => handleDeleteInstrument(instrument.id_inst)}>
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

export default Instruments;
