import React, { useState } from "react";
import "./GlobalStyles.css";

const Instruments = () => {
  const [instruments, setInstruments] = useState([]);
  const [newInstrument, setNewInstrument] = useState({ name: "", type: "" });

  const handleAddInstrument = (e) => {
    e.preventDefault();
    setInstruments([...instruments, { ...newInstrument, id: Date.now() }]);
    setNewInstrument({ name: "", type: "" });
  };

  const handleDeleteInstrument = (id) => {
    setInstruments(instruments.filter((instrument) => instrument.id !== id));
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
            placeholder="Exemplo: Cordas, Percussão"
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
              <li key={instrument.id}>
                <strong>{instrument.name}</strong> - {instrument.type}
                <button onClick={() => handleDeleteInstrument(instrument.id)}>
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
