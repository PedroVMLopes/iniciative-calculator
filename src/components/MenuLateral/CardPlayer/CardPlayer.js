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
      className={`flex flex-col card-player w-[80%] rounded-md ${
        playerData[0].condicao ? "cardComCondicao" : ""
      }`}
    >
      <div className="flex relative flex-col w-[100%] justify-between font-bold text-lg text-[var(--bege)] ">
        <img
          src="../Decoracao_canto1.png"
          className="absolute -z-5 w-[20%] top-0 left-0 opacity-30"
        />
        <h1>{playerData[0].nome}</h1>
        <img
          src="../Decoracao_canto1.png"
          className="absolute -z-5 w-[20%] top-0 right-0 opacity-30 scale-x-[-1]"
        />
      </div>

      {/* Campos do card - expandido */}
      <form className="flex z-10 flex-col justify-between font-bold text-lg text-[var(--bege)] mt-4 ">
        {isExpanded && (
          <div>
            <div className="flex flex-row w-full justify-evenly">
              <label className="flex flex-row">
                <p>
                  <FaShieldAlt />
                </p>
                <input
                  className="w-20 ml-2 mb-2 rounded-lg shadow-xl text-black font-bold pl-2"
                  type="text"
                  name="ca"
                  value={playerData[0].ca}
                  onChange={handleChange}
                />
              </label>
              <label className="flex flex-row">
                <p>
                  <FaHeart />
                </p>
                <input
                  className="w-20 ml-2 mb-2 rounded-lg shadow-xl text-black font-bold pl-2"
                  type="text"
                  name="pv"
                  value={playerData[0].pv}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label className="flex flex-col mx-7">
              <p>Modificadores: </p>
              <input
                className="flex flex-col w-full rounded-lg shadow-xl text-black font-bold pl-2"
                type="text"
                name="mod"
                value={playerData[0].mod}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col mx-7 mb-2">
              <p>Condição: </p>
              <input
                className="flex flex-col w-full rounded-lg shadow-xl text-black font-bold pl-2"
                type="text"
                name="condicao"
                value={playerData[0].condicao}
                onChange={handleChange}
              />
            </label>
            {playerData[0].condicao && (
              <label className="flex flex-col mx-7 mb-2">
                <p>Duração: </p>
                <input
                  className="flex flex-col w-full rounded-lg shadow-xl text-black font-bold pl-2"
                  type="text"
                  name="duracao"
                  value={getDuracaoDaCondicao}
                  onChange={(e) => setSetDuracaoDaCondicao(e.target.value)}
                />
              </label>
            )}
            <div className="flex row pl-4">
              <button
                className="rounded-full px-3 py-1"
                type="submit"
                onClick={handleDelete}
              >
                <RiDeleteBin7Fill />
              </button>
              <button
                className="rounded-full px-3 py-1"
                type="button"
                onClick={toggleExpand}
              >
                Concluir
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Campos do card - retraído */}
      {!isExpanded && (
        <div className="flex z-10 flex-col w-full p-2 pr-0">
          <div className="flex flex-row items-center justify-evenly">
            <label className="flex row">
              <FaShieldAlt />
              <input
                className="flex flex-col w-12 rounded-md shadow-xl text-black font-bold ml-2 pl-2"
                type="text"
                name="ca"
                value={playerData[0].ca}
                onChange={handleChange}
              />
            </label>
            <label className="flex row">
              <FaHeart />
              <input
                className="flex flex-col w-12 rounded-md shadow-xl text-black font-bold ml-2 pl-2"
                type="text"
                name="pv"
                value={playerData[0].pv}
                onChange={handleChange}
              />
            </label>
            <button
              className="rounded-full px-3 py-2"
              type="button"
              onClick={toggleExpand}
            >
              <FaPencilRuler />
            </button>
          </div>
          {/* Campos do card retraído com condicao */}
          {playerData[0].condicao && (
            <div className="flex flex-row justify-evenly mx-7 mb-2">
              <div className="info">
                <h2>Condição: </h2>
                <label>
                  <input
                    className="flex flex-col w-[70%] rounded-lg shadow-xl text-black font-bold pl-2 mt-1"
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
                    className="flex flex-col w-[70%] rounded-lg shadow-xl text-black font-bold pl-2 mt-1"
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
