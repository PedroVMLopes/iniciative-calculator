import React, { useState, useEffect } from "react";
import { FaPencilRuler, FaHeart } from "react-icons/fa";
import { GiCheckedShield } from "react-icons/gi";
import "./CardPlayer.css";

const CardPlayer = ({ player }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const players = JSON.parse(localStorage.getItem("players")) || [];
  const playerObject = players.find((p) =>
    p.dados.some((dado) => player.dados.some((pd) => pd.id === dado.id))
  );
  const playerId = playerObject.dados.map((d) => d.id);

  // Chave única para o localStorage
  const storageKey = `playerData-${playerId}`;

  // Estado para armazenar os dados do jogador
  const [playerData, setPlayerData] = useState({
    ca: "",
    pv: "",
    mod: "",
    rolagem: "",
    condicao: "",
  });

  // Verifica se 'players' já foi salvo no localStorage
  useEffect(() => {
    const players = JSON.parse(localStorage.getItem("players")) || [];
    const playerObject = players.find((p) =>
      p.dados.some((dado) => player.dados.some((pd) => pd.id === dado.id))
    );

    if (playerObject) {
      const storedData = localStorage.getItem(storageKey);

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setPlayerData((prevData) => ({
          ...prevData,
          ...parsedData,
          nome: playerObject.dados[0]?.nome || "", // Exemplo para o primeiro item
          ca: playerObject.dados[0]?.ca || "",
          pv: playerObject.dados[0]?.pv || "",
          mod: playerObject.dados[0]?.mod || "",
          rolagem: playerObject.dados[0]?.rolagem || "",
        }));
      }
    }
  }, [storageKey, player.dados]);

  // Função para sincronizar dados com a lista geral no localStorage
  const updatePlayersList = (updatedPlayer) => {
    const players = JSON.parse(localStorage.getItem("players")) || [];
    const updatedPlayers = players.map((p) =>
      p.dados.some((dado) => player.dados.some((pd) => pd.id === dado.id))
        ? { ...p, ...updatedPlayer }
        : p
    );

    localStorage.setItem("players", JSON.stringify(updatedPlayers));
    console.log("Salvando lista atualizada de players:", updatedPlayers); // Depuração
  };

  // Altera se o card está expandido ou retraído
  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayerData((prevData) => {
      const newData = { ...prevData, [name]: value };
      updatePlayersList({ id: player.id, ...newData }); // Atualiza lista geral
      return newData;
    });
  };

  // Atualiza localStorage sempre que o estado playerData mudar
  useEffect(() => {
    if (playerData && Object.keys(playerData).length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(playerData));
    }
  }, [playerData, storageKey]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="card-player">
      <h1>{playerData.nome}</h1>
      <form onSubmit={handleSubmit} className="card-player-info">
        {/* Campos do card - expandido */}
        {isExpanded && (
          <div>
            <label>
              <p>
                <GiCheckedShield />
              </p>
              <input
                type="text"
                name="ca"
                value={playerData.ca}
                onChange={handleChange}
              />
            </label>
            <label>
              <p>
                <FaHeart />
              </p>
              <input
                type="text"
                name="pv"
                value={playerData.pv}
                onChange={handleChange}
              />
            </label>
            <label>
              <p>MOD: </p>
              <input
                type="text"
                name="mod"
                value={playerData.mod}
                onChange={handleChange}
              />
            </label>
            <label>
              <p>ROLAGEM: </p>
              <input
                type="text"
                name="rolagem"
                value={playerData.rolagem}
                onChange={handleChange}
              />
            </label>
            <label>
              <p>CONDICAO: </p>
              <input
                type="text"
                name="condicao"
                value={playerData.condicao}
                onChange={handleChange}
              />
            </label>
            <button type="button" onClick={toggleExpand}>
              <FaPencilRuler /> Concluir
            </button>
          </div>
        )}
      </form>

      {/* Campos do card - retraído */}
      {!isExpanded && (
        <div className="card-player-info-retraido">
          <label>
            <GiCheckedShield />
            <input
              type="text"
              name="ca"
              value={playerData.ca}
              onChange={handleChange}
            />
          </label>
          <label>
            <FaHeart />
            <input
              type="text"
              name="pv"
              value={playerData.pv}
              onChange={handleChange}
            />
          </label>
          <button type="button" onClick={toggleExpand}>
            <FaPencilRuler />
          </button>
        </div>
      )}
    </div>
  );
};

export default CardPlayer;
