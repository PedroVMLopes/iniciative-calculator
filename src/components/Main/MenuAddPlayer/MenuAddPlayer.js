import "./MenuAddPlayer.css";
import React, { useState, useEffect } from "react";

// Função para obter os dados armazenados no localStorage
const getPlayers = () => {
  const playersSalvos = localStorage.getItem("players");
  return playersSalvos ? JSON.parse(playersSalvos) : []; // Se não houver dados, retorna um array vazio
};

// Função para salvar os dados no localStorage
const savePlayer = (players) => {
  localStorage.setItem("players", JSON.stringify(players));
};

export default function MenuAddPlayer() {
  const [fieldNome, setFieldNome] = useState("");
  const [fieldCa, setFieldCa] = useState("");
  const [fieldPv, setFieldPv] = useState("");
  const [fieldMod, setFieldMod] = useState("");
  const [fieldRolagem, setFieldRolagem] = useState("");
  const [players, setPlayers] = useState(getPlayers()); // Carregar dados do localStorage ao inicializar

  const clearPlayers = (event) => {
    localStorage.clear(); // Limpa todos os dados do localStorage
    setPlayers([]); // Atualiza o estado local para refletir a limpeza
    console.clear();
  };

  const clearConsole = (event) => {
    event.preventDefault();
    console.clear();
  };

  useEffect(() => {
    savePlayer(players); // Sincroniza o estado com o localStorage sempre que players mudar
  }, [players]);

  const handleSubmit = (event) => {
    if (!fieldNome || !fieldCa || !fieldPv || !fieldMod) {
      alert("Preencha todos os campos");
      return;
    }

    const novoPlayer = {
      id: Date.now(), // ID único baseado no timestamp
      nome: fieldNome,
      ca: fieldCa,
      pv: fieldPv,
      mod: fieldMod,
      rolagem: fieldRolagem,
    };

    console.log("Novo Player:", novoPlayer);

    const updatedPlayers = [...players, novoPlayer];
    setPlayers(updatedPlayers);

    setFieldNome("");
    setFieldCa("");
    setFieldPv("");
    setFieldMod("");
    setFieldRolagem("");
  };

  return (
    <div className="menu-add-player">
      <div className="menu-add-player menu-add-player-header">
        <h1>Adicione os dados do jogador</h1>
      </div>
      <div className="menu-add-player menu-add-player-corpo">
        <form>
          <label>Nome:</label>
          <input
            type="text"
            name="playerName"
            value={fieldNome}
            onChange={(e) => setFieldNome(e.target.value)}
          />
          <label>CA:</label>
          <input
            type="text"
            name="playerCa"
            value={fieldCa}
            onChange={(e) => setFieldCa(e.target.value)}
          />
          <label>PV:</label>
          <input
            type="text"
            name="playerPv"
            value={fieldPv}
            onChange={(e) => setFieldPv(e.target.value)}
          />
          <label>MOD:</label>
          <input
            type="text"
            name="playerMod"
            value={fieldMod}
            onChange={(e) => setFieldMod(e.target.value)}
          />
          <label>Rolagem:</label>
          <input
            type="text"
            name="playerRolagem"
            value={fieldRolagem}
            onChange={(e) => setFieldRolagem(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>
            Adicionar
          </button>

          <button onClick={clearPlayers} className="botao-limpar">
            Limpar localStorage
          </button>

          <button onClick={clearConsole} className="botao-limpar">
            Limpar console
          </button>
        </form>
      </div>
    </div>
  );
}
