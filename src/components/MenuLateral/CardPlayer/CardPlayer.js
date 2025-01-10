import React, { useState, useEffect } from "react";
import { FaPencilRuler, FaHeart } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { RiDeleteBin7Fill } from "react-icons/ri";
import "./CardPlayer.css";

const CardPlayer = ({ player }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [getDuracaoDaCondicao, setSetDuracaoDaCondicao] = useState("");
  const players = JSON.parse(localStorage.getItem("players")) || [];
  const playerObject = players.find((p) =>
    p.dados.some((dado) => player.dados.some((pd) => pd.id === dado.id))
  );
  const playerId = playerObject.dados.map((d) => d.id);

  // Chave única para o localStorage
  const storageKey = `playerData-${playerId}`;

  // Estado para armazenar os dados do jogador
  const [playerData, setPlayerData] = useState(playerObject.dados);

  // Verifica se 'players' já foi salvo no localStorage
  useEffect(() => {
    if (playerObject?.dados) {
      setPlayerData(playerObject.dados);
    }
  }, [player.dados[0].id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayerData((prevData) => {
      // Atualiza apenas o dado do jogador no array de dados (não cria um array de novo).
      const updatedPlayerData = prevData.map((player) => {
        if (player.id === prevData[0].id) {
          return { ...player, [name]: value }; // Atualiza o valor específico do campo
        }
        return player; // Retorna o restante dos jogadores sem alteração
      });

      // Atualiza a lista geral de jogadores
      updatePlayersList(updatedPlayerData);

      return updatedPlayerData;
    });
  };

  // Função para sincronizar dados com a lista geral no localStorage
  const updatePlayersList = (updatedPlayer) => {
    const players = JSON.parse(localStorage.getItem("players")) || [];

    // Atualiza a lista de jogadores apenas no objeto correto
    const updatedPlayers = players.map((p) => {
      // Verifica se o jogador da lista é o mesmo jogador a ser atualizado
      if (p.dados.some((dado) => dado.id === updatedPlayer[0].id)) {
        return { ...p, dados: updatedPlayer }; // Atualiza o array 'dados' do jogador correto
      }
      return p; // Retorna o restante dos jogadores sem alteração
    });

    // Salva a lista de jogadores atualizada no localStorage
    localStorage.setItem("players", JSON.stringify(updatedPlayers));
  };

  // Altera se o card está expandido ou retraído
  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  // Atualiza localStorage sempre que o estado playerData mudar
  useEffect(() => {
    if (playerData && Object.keys(playerData).length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(playerData));
    }
  }, [playerData, storageKey]);

  const handleDelete = (e) => {
    const players = JSON.parse(localStorage.getItem("players")) || [];
    const updatedPlayers = players.filter(
      (p) => p.dados[0].id !== Number(playerId)
    );
    localStorage.setItem("players", JSON.stringify(updatedPlayers));
  };

  /* Deleta a duração da condição caso a condição seja removida */
  useEffect(() => {
    if (!playerData[0].condicao) {
      setSetDuracaoDaCondicao("");
    }
  }, [playerData[0].condicao]);

  /* card-player cardComIniciativa */
  return (
    <div
      key={storageKey}
      className={`card-player ${
        playerData[0].condicao ? "cardComCondicao" : ""
      }`}
    >
      <h1>{playerData[0].nome}</h1>
      <form className="card-player-info">
        {/* Campos do card - expandido */}
        {isExpanded && (
          <div>
            <label>
              <p>
                <FaShieldAlt />
              </p>
              <input
                type="text"
                name="ca"
                value={playerData[0].ca}
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
                value={playerData[0].pv}
                onChange={handleChange}
              />
            </label>
            <label>
              <p>Modificadores: </p>
              <input
                type="text"
                name="mod"
                value={playerData[0].mod}
                onChange={handleChange}
              />
            </label>
            <label>
              <p>Condição: </p>
              <input
                type="text"
                name="condicao"
                value={playerData[0].condicao}
                onChange={handleChange}
              />
            </label>
            {playerData[0].condicao && (
              <label>
                <p>Duração: </p>
                <input
                  type="text"
                  name="duracao"
                  value={getDuracaoDaCondicao}
                  onChange={(e) => setSetDuracaoDaCondicao(e.target.value)}
                />
              </label>
            )}
            <div className="flex row">
              <button type="submit" onClick={handleDelete}>
                <RiDeleteBin7Fill />
              </button>
              <button type="button" onClick={toggleExpand}>
                Concluir
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Campos do card - retraído */}
      {!isExpanded && (
        <div className="card-player-info-retraido">
          <div className="card-player-info-retraido-top">
            <label>
              <FaShieldAlt />
              <input
                type="text"
                name="ca"
                value={playerData[0].ca}
                onChange={handleChange}
              />
            </label>
            <label>
              <FaHeart />
              <input
                type="text"
                name="pv"
                value={playerData[0].pv}
                onChange={handleChange}
              />
            </label>
            <button type="button" onClick={toggleExpand}>
              <FaPencilRuler />
            </button>
          </div>
          {/* Campos do card retraído com condicao */}
          {playerData[0].condicao && (
            <div className="card-player-info-retraido-bottom">
              <div className="info">
                <h2>Condição: </h2>
                <label>
                  <input
                    type="text"
                    name="condicao"
                    value={playerData[0].condicao}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="info">
                <h2>Duração: </h2>
                <label>
                  <input
                    type="text"
                    name="duracao"
                    value={getDuracaoDaCondicao}
                    onChange={(e) => setSetDuracaoDaCondicao(e.target.value)}
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CardPlayer;
